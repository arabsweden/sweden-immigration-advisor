
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Scale, 
  MessageSquare, 
  Info, 
  BookOpen,
  Languages,
  Home,
  Sun,
  Moon,
  Wallet,
  HelpCircle,
  AlertTriangle,
  X,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import { AppTab } from './types';
import Overview from './components/Overview';
import Analyzer from './components/Analyzer';
import LegalUpdates from './components/LegalUpdates';
import LegalChat from './components/LegalChat';
import VisaDirectory from './components/VisaDirectory';
import CostOfLiving from './components/CostOfLiving';
import FAQSection from './components/FAQSection';
import Checklists from './components/Checklists';
import { GlobalSearch } from './components/GlobalSearch';
import { translations } from './translations';

const App: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en' | 'sv'>('ar');
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.OVERVIEW);
  const [prefilledChatQuery, setPrefilledChatQuery] = useState<string | null>(null);
  const [selectedVisaId, setSelectedVisaId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [showAlert, setShowAlert] = useState<boolean>(() => {
    const closed = localStorage.getItem('hideLegalAlert2026');
    return !closed;
  });

  const dismissAlert = () => {
    localStorage.setItem('hideLegalAlert2026', 'true');
    setShowAlert(false);
  };

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const checkUrlParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const visaId = params.get('visa');
    if (visaId) {
      setSelectedVisaId(visaId);
      setActiveTab(AppTab.VISAS);
    }
  }, []);

  useEffect(() => {
    checkUrlParams();
    window.addEventListener('popstate', checkUrlParams);
    return () => window.removeEventListener('popstate', checkUrlParams);
  }, [checkUrlParams]);

  const handleAskExpert = (query: string) => {
    setPrefilledChatQuery(query);
    setActiveTab(AppTab.CHAT);
  };

  const handleShowVisa = (visaId: string) => {
    setSelectedVisaId(visaId);
    setActiveTab(AppTab.VISAS);
  };

  const cycleLanguage = () => {
    if (lang === 'ar') setLang('en');
    else if (lang === 'en') setLang('sv');
    else setLang('ar');
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const tabColors = {
    [AppTab.OVERVIEW]: { 
      text: 'text-blue-600 dark:text-blue-400', 
      bg: 'bg-blue-50 dark:bg-blue-900/20', 
      solid: 'bg-blue-600' 
    },
    [AppTab.VISAS]: { 
      text: 'text-emerald-600 dark:text-emerald-400', 
      bg: 'bg-emerald-50 dark:bg-emerald-900/20', 
      solid: 'bg-emerald-600' 
    },
    [AppTab.ANALYZER]: { 
      text: 'text-amber-600 dark:text-amber-400', 
      bg: 'bg-amber-50 dark:bg-amber-900/20', 
      solid: 'bg-amber-600' 
    },
    [AppTab.LEGAL_UPDATES]: { 
      text: 'text-rose-600 dark:text-rose-400', 
      bg: 'bg-rose-50 dark:bg-rose-900/20', 
      solid: 'bg-rose-600' 
    },
    [AppTab.CHAT]: { 
      text: 'text-indigo-600 dark:text-indigo-400', 
      bg: 'bg-indigo-50 dark:bg-indigo-900/20', 
      solid: 'bg-indigo-600' 
    },
    [AppTab.COST_OF_LIVING]: { 
      text: 'text-teal-600 dark:text-teal-400', 
      bg: 'bg-teal-50 dark:bg-teal-900/20', 
      solid: 'bg-teal-600' 
    },
    [AppTab.FAQ]: { 
      text: 'text-purple-600 dark:text-purple-400', 
      bg: 'bg-purple-50 dark:bg-purple-900/20', 
      solid: 'bg-purple-600' 
    },
    [AppTab.CHECKLISTS]: { 
      text: 'text-fuchsia-600 dark:text-fuchsia-400', 
      bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20', 
      solid: 'bg-fuchsia-600' 
    }
  };

  const tabs = [
    { id: AppTab.OVERVIEW, icon: Home, label: t.nav.overview, colors: tabColors[AppTab.OVERVIEW] },
    { id: AppTab.VISAS, icon: BookOpen, label: t.nav.visas, colors: tabColors[AppTab.VISAS] },
    { id: AppTab.CHECKLISTS, icon: ClipboardList, label: t.nav.checklists, colors: tabColors[AppTab.CHECKLISTS] },
    { id: AppTab.ANALYZER, icon: Search, label: t.nav.analyzer, colors: tabColors[AppTab.ANALYZER] },
    { id: AppTab.COST_OF_LIVING, icon: Wallet, label: t.nav.costOfLiving, colors: tabColors[AppTab.COST_OF_LIVING] },
    { id: AppTab.FAQ, icon: HelpCircle, label: t.nav.faq, colors: tabColors[AppTab.FAQ] },
    { id: AppTab.LEGAL_UPDATES, icon: Scale, label: t.nav.updates, colors: tabColors[AppTab.LEGAL_UPDATES] },
    { id: AppTab.CHAT, icon: MessageSquare, label: t.nav.chat, colors: tabColors[AppTab.CHAT] }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.OVERVIEW: return <Overview />;
      case AppTab.VISAS: return (
        <VisaDirectory 
          lang={lang}
          onAskExpert={handleAskExpert} 
          initialVisaId={selectedVisaId} 
          onVisaOpened={() => setSelectedVisaId(null)}
        />
      );
      case AppTab.ANALYZER: return <Analyzer lang={lang} onShowVisa={handleShowVisa} />;
      case AppTab.CHECKLISTS: return <Checklists lang={lang} />;
      case AppTab.COST_OF_LIVING: return <CostOfLiving lang={lang} />;
      case AppTab.FAQ: return <FAQSection lang={lang} />;
      case AppTab.LEGAL_UPDATES: return <LegalUpdates lang={lang} />;
      case AppTab.CHAT: 
        return (
          <LegalChat 
            lang={lang}
            initialQuery={prefilledChatQuery} 
            onClearQuery={() => setPrefilledChatQuery(null)} 
          />
        );
      default: return <Overview />;
    }
  };

  const activeColor = tabColors[activeTab];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${darkMode ? 'dark bg-slate-900' : 'bg-slate-50'} ${lang === 'ar' ? 'font-tajawal' : 'font-sans'}`}>
      {/* Top Header & Navigation */}
      <header className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 sticky top-0 z-50 shadow-sm transition-colors duration-500">
        {/* Logo and Language Row */}
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between border-b border-slate-50 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className={`${activeColor.solid} p-1.5 rounded-lg text-white transition-colors duration-500`}>
              <ShieldCheck size={18} />
            </div>
            <span className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest hidden sm:inline-block">Expert Law</span>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <GlobalSearch 
              lang={lang} 
              onSelectResult={(tab, payload) => {
                setActiveTab(tab);
                if (tab === AppTab.VISAS && payload) {
                  setSelectedVisaId(payload);
                } else if (tab === AppTab.CHAT) {
                  setPrefilledChatQuery(payload || null);
                } else {
                  setSelectedVisaId(null);
                  setPrefilledChatQuery(null);
                }
              }} 
            />
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={cycleLanguage}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-bold text-[10px] uppercase"
            >
              <Languages size={14} />
              <span>{lang}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Navigation Row (Visible on all devices at top) */}
        <nav className="max-w-6xl mx-auto px-2 overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-around md:justify-center md:gap-4 h-16 min-w-max md:min-w-0 px-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id !== AppTab.CHAT) setPrefilledChatQuery(null);
                  if (tab.id !== AppTab.VISAS) setSelectedVisaId(null);
                }}
                className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-xl transition-all ${
                  activeTab === tab.id 
                  ? `${tab.colors.bg} ${tab.colors.text} font-bold shadow-sm border border-current/10` 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                <span className="text-[10px] md:text-sm whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 md:py-8">
        <div role="status" className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {lang === 'ar' ? 'نسخة إرشادية: المستشار الذكي غير مفعّل حالياً. تحقّق من المعلومات القانونية لدى الجهات الرسمية قبل الاعتماد عليها.' : lang === 'sv' ? 'Informationsversion: AI-rådgivaren är inte aktiverad. Kontrollera juridisk information hos ansvariga myndigheter innan du förlitar dig på den.' : 'Information version: the AI advisor is not enabled. Verify legal information with the responsible authorities before relying on it.'}
        </div>
        {showAlert && (
          <div className="mb-8 bg-indigo-600 dark:bg-indigo-900 text-white rounded-2xl shadow-lg border border-indigo-500/50 relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <AlertTriangle size={120} />
            </div>
            <div className="p-6 relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="bg-white/20 p-3 rounded-2xl shrink-0">
                <AlertTriangle size={28} className="text-indigo-50" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1 text-white">{t.alert?.title || 'New Updates'}</h3>
                <p className="text-indigo-100 text-sm leading-relaxed max-w-3xl">
                  {t.alert?.message || 'Important changes have been made to the immigration rules.'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
                <button 
                  onClick={() => {
                    dismissAlert();
                    setActiveTab(AppTab.LEGAL_UPDATES);
                  }}
                  className="bg-white text-indigo-700 hover:bg-indigo-50 px-5 py-2.5 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                >
                  {t.alert?.viewUpdates || 'View Updates'}
                  <ChevronRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
                </button>
                <button 
                  onClick={dismissAlert}
                  className="bg-indigo-700/50 hover:bg-indigo-700/80 text-white px-5 py-2.5 rounded-xl font-bold transition-colors whitespace-nowrap border border-white/10 flex items-center justify-center gap-2"
                >
                  <X size={16} />
                  {t.alert?.dismiss || 'Dismiss'}
                </button>
              </div>
            </div>
          </div>
        )}
        {renderContent()}
      </main>

      {/* Simplified Footer with Name */}
      <footer className="bg-white dark:bg-slate-800 border-t dark:border-slate-700 py-12 mt-12 bg-slate-50/50 dark:bg-slate-800/50 transition-colors duration-500">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
          <div className="space-y-1">
            <p className="text-slate-900 dark:text-slate-100 text-3xl md:text-5xl font-black tracking-tighter uppercase">
              RAED SHIHAB
            </p>
            <div className="h-1.5 w-24 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto font-bold">
            {t.footer.disclaimer}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
