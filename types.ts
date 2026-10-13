
export enum AppTab {
  OVERVIEW = 'overview',
  VISAS = 'visas',
  ANALYZER = 'analyzer',
  LEGAL_UPDATES = 'legal_updates',
  CHAT = 'chat',
  COST_OF_LIVING = 'cost_of_living',
  FAQ = 'faq',
  CHECKLISTS = 'checklists'
}

export interface LegalUpdate {
  aspect: string;
  before: string;
  after: string;
  impact: string;
}

export interface QuizState {
  hasJobOffer: boolean | null;
  isStudent: boolean | null;
  hasFamilyInSweden: boolean | null;
  isThreatened: boolean | null;
  budget: number;
}
