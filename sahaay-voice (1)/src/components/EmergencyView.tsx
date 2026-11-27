import {PhoneCall, ShieldAlert} from 'lucide-react';
import type {TranslationCopy} from '../data/translations';

interface EmergencyViewProps {
  copy: TranslationCopy;
  isLargeText: boolean;
}

export function EmergencyView({copy, isLargeText}: EmergencyViewProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className={`font-display font-bold text-slate-900 ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
          {copy.emergencyTitle}
        </h2>
        <p className={`mt-1.5 max-w-3xl text-slate-600 ${isLargeText ? 'text-lg' : 'text-base'}`}>
          {copy.emergencySubtitle}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {copy.helplines.map((line) => (
          <div
            key={line.number}
            className="flex flex-col justify-between rounded-2xl border border-rose-200 bg-white p-5"
          >
            <div>
              <p className="font-display tabular-nums text-3xl font-bold text-rose-700">
                {line.number}
              </p>
              <h3 className={`font-display mt-2 font-semibold text-slate-900 ${isLargeText ? 'text-xl' : 'text-lg'}`}>
                {line.name}
              </h3>
              <p className={`mt-1.5 text-slate-600 ${isLargeText ? 'text-base' : 'text-sm'}`}>
                {line.description}
              </p>
            </div>

            <a
              href={`tel:${line.number}`}
              className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-rose-700 px-4 py-2.5 text-base font-semibold text-white transition-colors hover:bg-rose-800"
            >
              <PhoneCall className="h-5 w-5" aria-hidden="true" />
              <span>
                {copy.callNow} {line.number}
              </span>
            </a>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-6">
        <div className="flex items-center gap-2 text-rose-950">
          <ShieldAlert className="h-6 w-6 shrink-0 text-rose-700" aria-hidden="true" />
          <h3 className={`font-display font-bold ${isLargeText ? 'text-xl' : 'text-lg'}`}>
            {copy.redFlagsTitle}
          </h3>
        </div>
        <ul className="mt-4 space-y-3">
          {copy.redFlagsList.map((item) => (
            <li
              key={item}
              className={`flex items-start gap-3 text-rose-950 ${isLargeText ? 'text-lg' : 'text-base'}`}
            >
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-rose-700" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
