export type Language = 'en' | 'hi' | 'gu';

export type ActiveTab = 'ask' | 'topics' | 'saved' | 'emergency';

export type UrgencyLevel = 'routine' | 'consult_soon' | 'urgent';

export interface HealthGuidance {
  title: string;
  simpleSummary: string;
  homeCareSteps: string[];
  warningSigns: string[];
  doctorQuestions: string[];
  urgencyLevel: UrgencyLevel;
  spokenScript: string;
}

export interface SavedNote {
  id: string;
  question: string;
  language: Language;
  createdAt: string;
  guidance: HealthGuidance;
}

export interface CommonTopic {
  id: string;
  category: string;
  title: string;
  summary: string;
  prompt: string;
}
