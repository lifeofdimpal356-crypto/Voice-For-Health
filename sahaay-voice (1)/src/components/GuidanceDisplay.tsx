import {
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  HelpCircle,
  Loader2,
  ShieldAlert,
  Square,
  Volume2,
} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import type {TranslationCopy} from '../data/translations';
import {synthesizeVoiceSpeech} from '../services/api';
import type {HealthGuidance, Language} from '../types/health';

interface GuidanceDisplayProps {
  guidance: HealthGuidance | null;
  question: string;
  language: Language;
  copy: TranslationCopy;
  isLoading: boolean;
  error: string | null;
  isLargeText: boolean;
  autoSpeak: boolean;
  isSaved: boolean;
  onSaveNote: () => void;
}

export function GuidanceDisplay({
  guidance,
  question,
  language,
  copy,
  isLoading,
  error,
  isLargeText,
  autoSpeak,
  isSaved,
  onSaveNote,
}: GuidanceDisplayProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoadingVoice, setIsLoadingVoice] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastAutoSpokenTitleRef = useRef<string | null>(null);

  const stopSpeech = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsLoadingVoice(false);
  };

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const speakGuidance = async (item: HealthGuidance) => {
    stopSpeech();
    setSpeechError(null);
    const scriptToRead = item.spokenScript || item.simpleSummary;
    if (!scriptToRead) return;

    setIsLoadingVoice(true);
    try {
      const {audioBase64, mimeType} = await synthesizeVoiceSpeech(scriptToRead, language);
      const audio = new Audio(`data:${mimeType};base64,${audioBase64}`);
      audioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };

      setIsLoadingVoice(false);
      setIsSpeaking(true);
      await audio.play();
    } catch {
      setIsLoadingVoice(false);
      // Graceful fallback to browser speech synthesis if available
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          const utterance = new SpeechSynthesisUtterance(scriptToRead);
          utterance.lang = language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : 'en-IN';
          utterance.rate = 0.92;
          utterance.onend = () => setIsSpeaking(false);
          utterance.onerror = () => setIsSpeaking(false);
          setIsSpeaking(true);
          window.speechSynthesis.speak(utterance);
          return;
        } catch {
          // fall through
        }
      }
      setSpeechError('Voice playback is currently unavailable on this device.');
    }
  };

  useEffect(() => {
    if (guidance && autoSpeak) {
      const key = `${guidance.title}:${guidance.simpleSummary}`;
      if (lastAutoSpokenTitleRef.current !== key) {
        lastAutoSpokenTitleRef.current = key;
        void speakGuidance(guidance);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guidance, autoSpeak]);

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-teal-700" aria-hidden="true" />
          <p className="font-display mt-4 text-lg font-semibold text-slate-900">
            {copy.gettingAnswer}
          </p>
          {question && (
            <p className="mt-2 max-w-md text-sm text-slate-600">
              {question}
            </p>
          )}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        role="alert"
        className="rounded-2xl border border-rose-200 bg-rose-50 p-6 sm:p-8"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-rose-700" aria-hidden="true" />
          <div>
            <h2 className="font-display text-lg font-semibold text-rose-950">
              Unable to load guidance
            </h2>
            <p className="mt-1 text-base text-rose-900">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!guidance) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className={`font-display font-bold text-slate-900 ${isLargeText ? 'text-2xl' : 'text-xl'}`}>
          {copy.emptyHeading}
        </h2>
        <p className={`mt-2 max-w-2xl text-slate-600 ${isLargeText ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'}`}>
          {copy.emptyDescription}
        </p>

        <div className="mt-6 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-display text-base font-semibold text-slate-900">
              {copy.step1Title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              {copy.step1Desc}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-display text-base font-semibold text-slate-900">
              {copy.step2Title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              {copy.step2Desc}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-display text-base font-semibold text-slate-900">
              {copy.step3Title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              {copy.step3Desc}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const urgencyMeta = {
    routine: {
      label: copy.urgencyRoutine,
      icon: CheckCircle2,
      containerClass: 'border-teal-200 bg-teal-50 text-teal-900',
    },
    consult_soon: {
      label: copy.urgencyConsultSoon,
      icon: AlertTriangle,
      containerClass: 'border-amber-300 bg-amber-50 text-amber-950',
    },
    urgent: {
      label: copy.urgencyUrgent,
      icon: ShieldAlert,
      containerClass: 'border-rose-300 bg-rose-50 text-rose-950',
    },
  }[guidance.urgencyLevel];

  const UrgencyIcon = urgencyMeta.icon;
  const bodySize = isLargeText ? 'text-lg leading-relaxed' : 'text-base leading-relaxed';

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold ${urgencyMeta.containerClass}`}>
        <UrgencyIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{urgencyMeta.label}</span>
      </div>

      <h2 className={`font-display mt-4 font-bold text-slate-900 ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
        {guidance.title}
      </h2>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => (isSpeaking ? stopSpeech() : void speakGuidance(guidance))}
          disabled={isLoadingVoice}
          className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
            isSpeaking
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-teal-700 text-white hover:bg-teal-800'
          }`}
        >
          {isLoadingVoice ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>{copy.loadingVoice}</span>
            </>
          ) : isSpeaking ? (
            <>
              <Square className="h-4 w-4 fill-current" aria-hidden="true" />
              <span>{copy.stopVoiceButton}</span>
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4" aria-hidden="true" />
              <span>{copy.listenButton}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onSaveNote}
          disabled={isSaved}
          className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-teal-700 ${
            isSaved
              ? 'border-teal-200 bg-teal-50 text-teal-900'
              : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
          }`}
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
              <span>{copy.savedNoteButton}</span>
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4" aria-hidden="true" />
              <span>{copy.saveNoteButton}</span>
            </>
          )}
        </button>
      </div>

      {speechError && (
        <p className="mt-3 text-sm text-amber-800">{speechError}</p>
      )}

      <div className="mt-6 border-t border-slate-200 pt-6">
        <h3 className="font-display text-lg font-semibold text-slate-900">
          {copy.summaryHeading}
        </h3>
        <p className={`mt-2 text-slate-800 ${bodySize}`}>
          {guidance.simpleSummary}
        </p>
      </div>

      {guidance.homeCareSteps.length > 0 && (
        <div className="mt-6 border-t border-slate-200 pt-6">
          <h3 className="font-display text-lg font-semibold text-slate-900">
            {copy.homeCareHeading}
          </h3>
          <ol className="mt-3 space-y-3">
            {guidance.homeCareSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="tabular-nums mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-sm font-bold text-teal-800">
                  {index + 1}
                </span>
                <span className={`text-slate-800 ${bodySize}`}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {guidance.warningSigns.length > 0 && (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50/70 p-5">
          <div className="flex items-center gap-2 text-rose-950">
            <ShieldAlert className="h-5 w-5 shrink-0 text-rose-700" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold">
              {copy.warningSignsHeading}
            </h3>
          </div>
          <ul className="mt-3 space-y-2.5">
            {guidance.warningSigns.map((sign) => (
              <li key={sign} className={`flex items-start gap-2.5 text-rose-950 ${bodySize}`}>
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-700" aria-hidden="true" />
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {guidance.doctorQuestions.length > 0 && (
        <div className="mt-6 border-t border-slate-200 pt-6">
          <div className="flex items-center gap-2 text-slate-900">
            <HelpCircle className="h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold">
              {copy.doctorQuestionsHeading}
            </h3>
          </div>
          <ul className="mt-3 space-y-2">
            {guidance.doctorQuestions.map((q) => (
              <li key={q} className={`text-slate-700 ${bodySize}`}>
                • {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-600">
        {copy.disclaimerText}
      </p>
    </article>
  );
}
