import {Bookmark, BookOpen, Mic, PhoneCall} from 'lucide-react';
import type {TranslationCopy} from '../data/translations';
import type {ActiveTab} from '../types/health';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  copy: TranslationCopy;
  savedCount: number;
}

export function Header({activeTab, onSelectTab, copy, savedCount}: HeaderProps) {
  const navItems: Array<{id: ActiveTab; label: string; icon: typeof Mic}> = [
    {id: 'ask', label: copy.navAsk, icon: Mic},
    {id: 'topics', label: copy.navTopics, icon: BookOpen},
    {
      id: 'saved',
      label: savedCount > 0 ? `${copy.navSaved} (${savedCount})` : copy.navSaved,
      icon: Bookmark,
    },
    {id: 'emergency', label: copy.navEmergency, icon: PhoneCall},
  ];

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={() => onSelectTab('ask')}
            className="font-display min-h-[44px] shrink-0 whitespace-nowrap text-left text-xl font-bold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            {copy.brandName}
          </button>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 md:flex"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`min-h-[44px] shrink-0 whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
                    isActive
                      ? 'border-teal-700 text-teal-800'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onSelectTab('emergency')}
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-rose-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
            >
              <PhoneCall className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{copy.headerAction}</span>
            </button>
          </div>
        </div>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="fixed right-0 bottom-0 left-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden"
      >
        <div className="grid grid-cols-4 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`flex min-h-[56px] flex-col items-center justify-center gap-1 px-2 py-2 text-[11px] font-medium transition-colors ${
                  isActive
                    ? 'text-teal-800'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${isActive ? 'text-teal-700' : 'text-slate-500'}`}
                  aria-hidden="true"
                />
                <span className="max-w-full truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
