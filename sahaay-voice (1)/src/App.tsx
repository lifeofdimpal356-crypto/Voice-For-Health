import {Volume2} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import {EmergencyView} from './components/EmergencyView';
import {GuidanceDisplay} from './components/GuidanceDisplay';
import {Header} from './components/Header';
import {SavedNotesView} from './components/SavedNotesView';
import {TopicsView} from './components/TopicsView';
import {VoiceInputPanel} from './components/VoiceInputPanel';
import {COMMON_TOPICS, TRANSLATIONS} from './data/translations';
import {fetchHealthGuidance} from './services/api';
import type {
  ActiveTab,
  CommonTopic,
  HealthGuidance,
  Language,
  SavedNote,
} from './types/health';

const SAVED_NOTES_KEY = 'sahaay_voice_saved_notes_v1';
const LANGUAGE_PREF_KEY = 'sahaay_voice_lang_v1';

const LANGUAGE_OPTIONS: Array<{id: Language; label: string}> = [
  {id: 'en', label: 'English'},
  {id: 'hi', label: 'हिन्दी'},
  {id: 'gu', label: 'ગુજરાતી'},
];

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_PREF_KEY);
      if (stored === 'en' || stored === 'hi' || stored === 'gu') {
        return stored;
      }
    } catch {
      // ignore storage errors
    }
    return 'en';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('ask');
  const [question, setQuestion] = useState('');
  const [guidance, setGuidance] = useState<HealthGuidance | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLargeText, setIsLargeText] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);

  const [savedNotes, setSavedNotes] = useState<SavedNote[]>(() => {
    try {
      const raw = localStorage.getItem(SAVED_NOTES_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as SavedNote[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_PREF_KEY, language);
      document.documentElement.lang = language;
    } catch {
      // ignore storage errors
    }
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_NOTES_KEY, JSON.stringify(savedNotes));
    } catch {
      // ignore storage errors
    }
  }, [savedNotes]);

  const copy = TRANSLATIONS[language];
  const topics = COMMON_TOPICS[language];

  const isCurrentGuidanceSaved = useMemo(() => {
    if (!guidance) return false;
    return savedNotes.some(
      (n) =>
        n.guidance.title === guidance.title &&
        n.guidance.simpleSummary === guidance.simpleSummary,
    );
  }, [guidance, savedNotes]);

  const handleAskQuestion = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) return;

    setActiveTab('ask');
    setQuestion(trimmed);
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchHealthGuidance(trimmed, language);
      setGuidance(result);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Unable to fetch healthcare guidance right now.';
      setError(msg);
      setGuidance(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTopic = (topic: CommonTopic) => {
    void handleAskQuestion(topic.prompt);
  };

  const handleSaveCurrentNote = () => {
    if (!guidance || isCurrentGuidanceSaved) return;
    const newNote: SavedNote = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      question: question || guidance.title,
      language,
      createdAt: new Date().toISOString(),
      guidance,
    };
    setSavedNotes((prev) => [newNote, ...prev]);
  };

  const handleOpenSavedNote = (note: SavedNote) => {
    setLanguage(note.language);
    setQuestion(note.question);
    setGuidance(note.guidance);
    setError(null);
    setActiveTab('ask');
  };

  const handleDeleteSavedNote = (id: string) => {
    setSavedNotes((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-900 md:pb-12">
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        copy={copy}
        savedCount={savedNotes.length}
      />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <section className="mb-6 border-b border-slate-200 pb-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1
                className={`font-display font-bold tracking-tight text-slate-900 text-balance ${
                  isLargeText
                    ? 'text-3xl sm:text-4xl'
                    : 'text-2xl sm:text-3xl'
                }`}
              >
                {copy.heroTitle}
              </h1>
              <p
                className={`mt-2 text-slate-600 ${
                  isLargeText ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'
                }`}
              >
                {copy.heroSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div
                role="group"
                aria-label={copy.languageLabel}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1"
              >
                {LANGUAGE_OPTIONS.map((opt) => {
                  const active = language === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLanguage(opt.id)}
                      className={`min-h-[40px] whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-teal-700 text-white'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div
                role="group"
                aria-label={copy.textSizeLabel}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1"
              >
                <button
                  type="button"
                  onClick={() => setIsLargeText(false)}
                  className={`min-h-[40px] whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    !isLargeText
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {copy.textNormal}
                </button>
                <button
                  type="button"
                  onClick={() => setIsLargeText(true)}
                  className={`min-h-[40px] whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isLargeText
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {copy.textLarge}
                </button>
              </div>

              <button
                type="button"
                aria-pressed={autoSpeak}
                onClick={() => setAutoSpeak((prev) => !prev)}
                className={`inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors ${
                  autoSpeak
                    ? 'border-teal-700 bg-teal-50 text-teal-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Volume2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{copy.autoSpeakLabel}</span>
              </button>
            </div>
          </div>
        </section>

        {activeTab === 'ask' && (
          <div className="grid items-start gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <VoiceInputPanel
                language={language}
                copy={copy}
                question={question}
                onQuestionChange={setQuestion}
                onSubmitQuestion={(text) => void handleAskQuestion(text)}
                isLoading={isLoading}
                isLargeText={isLargeText}
              />
            </div>

            <div className="lg:col-span-7">
              <GuidanceDisplay
                guidance={guidance}
                question={question}
                language={language}
                copy={copy}
                isLoading={isLoading}
                error={error}
                isLargeText={isLargeText}
                autoSpeak={autoSpeak}
                isSaved={isCurrentGuidanceSaved}
                onSaveNote={handleSaveCurrentNote}
              />
            </div>
          </div>
        )}

        {activeTab === 'topics' && (
          <TopicsView
            topics={topics}
            copy={copy}
            onSelectTopic={handleSelectTopic}
            isLargeText={isLargeText}
          />
        )}

        {activeTab === 'saved' && (
          <SavedNotesView
            notes={savedNotes}
            copy={copy}
            onOpenNote={handleOpenSavedNote}
            onDeleteNote={handleDeleteSavedNote}
            isLargeText={isLargeText}
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencyView copy={copy} isLargeText={isLargeText} />
        )}
      </main>
    </div>
  );
}
