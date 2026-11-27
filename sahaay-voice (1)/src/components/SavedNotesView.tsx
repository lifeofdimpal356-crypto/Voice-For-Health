import {BookOpen, Trash2} from 'lucide-react';
import type {TranslationCopy} from '../data/translations';
import type {SavedNote} from '../types/health';

interface SavedNotesViewProps {
  notes: SavedNote[];
  copy: TranslationCopy;
  onOpenNote: (note: SavedNote) => void;
  onDeleteNote: (id: string) => void;
  isLargeText: boolean;
}

export function SavedNotesView({
  notes,
  copy,
  onOpenNote,
  onDeleteNote,
  isLargeText,
}: SavedNotesViewProps) {
  return (
    <section>
      <div className="mb-6">
        <h2 className={`font-display font-bold text-slate-900 ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
          {copy.savedTitle}
        </h2>
        <p className={`mt-1.5 text-slate-600 ${isLargeText ? 'text-lg' : 'text-base'}`}>
          {copy.savedSubtitle}
        </p>
      </div>

      {notes.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className={`text-slate-600 ${isLargeText ? 'text-lg' : 'text-base'}`}>
            {copy.savedEmpty}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {notes.map((note) => {
            const formattedDate = new Date(note.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <article
                key={note.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="uppercase">{note.language}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{formattedDate}</span>
                  </div>
                  <h3 className={`font-display mt-1.5 font-semibold text-slate-900 ${isLargeText ? 'text-xl' : 'text-lg'}`}>
                    {note.guidance.title}
                  </h3>
                  <p className={`mt-2 line-clamp-3 text-slate-600 ${isLargeText ? 'text-base' : 'text-sm'}`}>
                    {note.guidance.simpleSummary}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => onOpenNote(note)}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    <span>{copy.openNote}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteNote(note.id)}
                    aria-label={copy.deleteNote}
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    <span>{copy.deleteNote}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
