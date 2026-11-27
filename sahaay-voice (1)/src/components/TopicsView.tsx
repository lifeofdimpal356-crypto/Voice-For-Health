import {ArrowRight} from 'lucide-react';
import type {TranslationCopy} from '../data/translations';
import type {CommonTopic} from '../types/health';

interface TopicsViewProps {
  topics: CommonTopic[];
  copy: TranslationCopy;
  onSelectTopic: (topic: CommonTopic) => void;
  isLargeText: boolean;
}

export function TopicsView({
  topics,
  copy,
  onSelectTopic,
  isLargeText,
}: TopicsViewProps) {
  return (
    <section>
      <div className="mb-6">
        <h2 className={`font-display font-bold text-slate-900 ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
          {copy.topicsTitle}
        </h2>
        <p className={`mt-1.5 text-slate-600 ${isLargeText ? 'text-lg' : 'text-base'}`}>
          {copy.topicsSubtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => onSelectTopic(topic)}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left transition-colors hover:border-teal-600 hover:bg-teal-50/30 focus-visible:outline-2 focus-visible:outline-teal-700"
          >
            <div>
              <p className="text-xs font-medium text-teal-800">{topic.category}</p>
              <h3 className={`font-display mt-1.5 font-semibold text-slate-900 ${isLargeText ? 'text-xl' : 'text-lg'}`}>
                {topic.title}
              </h3>
              <p className={`mt-2 text-slate-600 ${isLargeText ? 'text-base leading-relaxed' : 'text-sm leading-relaxed'}`}>
                {topic.summary}
              </p>
            </div>

            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800">
              <span>{copy.askThisTopic}</span>
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
