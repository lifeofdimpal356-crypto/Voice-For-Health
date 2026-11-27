import {Loader2, Mic, Send, Square, X} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import type {TranslationCopy} from '../data/translations';
import {transcribeVoiceAudio} from '../services/api';
import type {Language} from '../types/health';

interface VoiceInputPanelProps {
  language: Language;
  copy: TranslationCopy;
  question: string;
  onQuestionChange: (value: string) => void;
  onSubmitQuestion: (text: string) => void;
  isLoading: boolean;
  isLargeText: boolean;
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: {results: ArrayLike<ArrayLike<{transcript: string}>>}) => void) | null;
  onerror: ((event: {error: string}) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === 'undefined') return null;
  const win = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  };
  return win.SpeechRecognition || win.webkitSpeechRecognition || null;
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const commaIndex = result.indexOf(',');
      resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
    };
    reader.onerror = () => reject(new Error('Could not read audio recording.'));
    reader.readAsDataURL(blob);
  });
}

export function VoiceInputPanel({
  language,
  copy,
  question,
  onQuestionChange,
  onSubmitQuestion,
  isLoading,
  isLargeText,
}: VoiceInputPanelProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const speechRecRef = useRef<SpeechRecognitionInstance | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (speechRecRef.current) {
        try {
          speechRecRef.current.stop();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  const stopTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopRecording = () => {
    stopTimer();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (speechRecRef.current) {
      try {
        speechRecRef.current.stop();
      } catch {
        // ignore stop errors
      }
    }
    setIsRecording(false);
  };

  const startVoiceCapture = async () => {
    setVoiceError(null);

    if (isRecording) {
      stopRecording();
      return;
    }

    // Prefer MediaRecorder + server-side Gemini transcription for accurate EN/HI/GU recognition
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        mediaStreamRef.current = stream;
        audioChunksRef.current = [];

        const preferredMime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : MediaRecorder.isTypeSupported('audio/webm')
            ? 'audio/webm'
            : '';

        const recorder = preferredMime
          ? new MediaRecorder(stream, {mimeType: preferredMime})
          : new MediaRecorder(stream);

        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = async () => {
          stopTimer();
          stream.getTracks().forEach((t) => t.stop());
          mediaStreamRef.current = null;

          const mimeType = recorder.mimeType || 'audio/webm';
          const blob = new Blob(audioChunksRef.current, {type: mimeType});
          if (blob.size < 400) {
            setIsRecording(false);
            return;
          }

          setIsTranscribing(true);
          try {
            const base64 = await blobToBase64(blob);
            const cleanMime = mimeType.split(';')[0] || 'audio/webm';
            const transcript = await transcribeVoiceAudio(base64, cleanMime, language);
            if (transcript) {
              onQuestionChange(transcript);
              onSubmitQuestion(transcript);
            }
          } catch (err) {
            const msg = err instanceof Error ? err.message : copy.micPermissionError;
            setVoiceError(msg);
          } finally {
            setIsTranscribing(false);
            setRecordingSeconds(0);
          }
        };

        recorder.start();
        setRecordingSeconds(0);
        setIsRecording(true);
        timerRef.current = window.setInterval(() => {
          setRecordingSeconds((prev) => prev + 1);
        }, 1000);
        return;
      } catch (err) {
        const errorName = err instanceof Error ? err.name : '';
        if (errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError') {
          setVoiceError(copy.micPermissionError);
          return;
        }
        // Fall through to browser SpeechRecognition if MediaRecorder fails
      }
    }

    const SpeechRecCtor = getSpeechRecognitionCtor();
    if (!SpeechRecCtor) {
      setVoiceError(copy.micUnsupportedError);
      return;
    }

    const recognition = new SpeechRecCtor();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim() || '';
      if (transcript) {
        onQuestionChange(transcript);
        onSubmitQuestion(transcript);
      }
    };
    recognition.onerror = () => {
      setVoiceError(copy.micPermissionError);
      setIsRecording(false);
    };
    recognition.onend = () => {
      setIsRecording(false);
    };

    speechRecRef.current = recognition;
    setIsRecording(true);
    recognition.start();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
    onSubmitQuestion(question);
  };

  const formattedTimer = `0:${String(recordingSeconds).padStart(2, '0')}`;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center">
        <button
          type="button"
          onClick={startVoiceCapture}
          disabled={isTranscribing || isLoading}
          aria-pressed={isRecording}
          className={`flex h-24 w-24 items-center justify-center rounded-full shadow-sm transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-60 ${
            isRecording
              ? 'bg-rose-700 text-white hover:bg-rose-800'
              : 'bg-teal-700 text-white hover:bg-teal-800'
          }`}
        >
          {isTranscribing ? (
            <Loader2 className="h-9 w-9 animate-spin" aria-hidden="true" />
          ) : isRecording ? (
            <Square className="h-8 w-8 fill-current" aria-hidden="true" />
          ) : (
            <Mic className="h-10 w-10" aria-hidden="true" />
          )}
        </button>

        <div className="mt-4">
          <p className={`font-display font-semibold text-slate-900 ${isLargeText ? 'text-xl' : 'text-lg'}`}>
            {isTranscribing
              ? copy.transcribingAudio
              : isRecording
                ? `${copy.listeningNow} (${formattedTimer})`
                : copy.tapToSpeak}
          </p>
          {isRecording && (
            <button
              type="button"
              onClick={stopRecording}
              className="mt-2 inline-flex min-h-[44px] items-center rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-800 hover:bg-rose-100"
            >
              {copy.tapToStop}
            </button>
          )}
        </div>

        {voiceError && (
          <p
            role="alert"
            className="mt-3 max-w-md rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-950"
          >
            {voiceError}
          </p>
        )}
      </div>

      <form onSubmit={handleFormSubmit} className="mt-5">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="health-question-input"
            className={`font-medium text-slate-700 ${isLargeText ? 'text-base' : 'text-sm'}`}
          >
            {copy.orTypeBelow}
          </label>
          {question && (
            <button
              type="button"
              onClick={() => onQuestionChange('')}
              className="inline-flex min-h-[40px] items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span>{copy.clearButton}</span>
            </button>
          )}
        </div>

        <textarea
          id="health-question-input"
          rows={3}
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          placeholder={copy.questionPlaceholder}
          className={`mt-2 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20 ${
            isLargeText ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'
          }`}
        />

        <button
          type="submit"
          disabled={!question.trim() || isLoading || isTranscribing}
          className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              <span>{copy.gettingAnswer}</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" aria-hidden="true" />
              <span>{copy.askButton}</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <p className="text-sm font-medium text-slate-600">
          {copy.quickPromptsHeading}
        </p>
        <div className="mt-3 flex flex-col gap-2">
          {copy.quickQuestions.map((sample) => (
            <button
              key={sample}
              type="button"
              disabled={isLoading || isTranscribing}
              onClick={() => {
                onQuestionChange(sample);
                onSubmitQuestion(sample);
              }}
              className={`min-h-[44px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-left font-medium text-slate-800 transition-colors hover:border-teal-600 hover:bg-teal-50/50 focus-visible:outline-2 focus-visible:outline-teal-700 disabled:opacity-60 ${
                isLargeText ? 'text-base' : 'text-sm'
              }`}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
