import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, BookOpen, Layers, HelpCircle, Briefcase, FileText } from 'lucide-react';
import Fuse from 'fuse.js';
import { AppTab } from '../types';
import { getVisaData } from '../constants';
import { checklistsData } from './Checklists';
import { faqData } from './FAQSection';
import { getTimelineChanges } from './LegalUpdates';
import { translations } from '../translations';

interface Props {
  lang: 'ar' | 'en' | 'sv';
  onSelectResult: (tab: AppTab, payload?: string) => void;
}

export const GlobalSearch: React.FC<Props> = ({ lang, onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const isAr = lang === 'ar';
  const t = translations[lang];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    // Build the search index dynamically based on language
    const data: any[] = [];
    const visas = getVisaData(lang);
    
    // Add visas
    visas.forEach(v => {
      data.push({
        type: 'visa',
        title: v.title,
        description: v.description,
        tab: AppTab.VISAS,
        payload: v.id,
        icon: <BookOpen size={16} />
      });
      // Add FAQs for visas
      v.faqs.forEach(faq => {
        data.push({
          type: 'faq',
          title: faq.q,
          description: faq.a,
          tab: AppTab.VISAS,
          payload: v.id,
          icon: <HelpCircle size={16} />
        });
      });
    });

    // Add Checklists
    checklistsData.forEach(c => {
      const title = typeof c.title === 'string' ? c.title : c.title[lang];
      data.push({
        type: 'checklist',
        title: title || '',
        description: isAr ? 'قائمة المتطلبات' : lang === 'sv' ? 'Kravkontrollista' : 'Requirement checklist',
        tab: AppTab.CHECKLISTS,
        icon: <FileText size={16} />
      });
    });

    // Add Global FAQs
    faqData.forEach(faq => {
      data.push({
        type: 'global_faq',
        title: faq.q[lang],
        description: faq.a[lang],
        tab: AppTab.FAQ,
        icon: <HelpCircle size={16} />
      });
    });

    // Add Timeline Changes (Legal Updates)
    const timelineChanges = getTimelineChanges(lang);
    timelineChanges.forEach(tc => {
      data.push({
        type: 'legal_update',
        title: tc.title,
        description: tc.summary,
        tab: AppTab.LEGAL_UPDATES,
        icon: <Layers size={16} />
      });
    });

    // Add generalized Search links
    data.push({
      type: 'page',
      title: t.nav.overview,
      description: '',
      tab: AppTab.OVERVIEW,
      icon: <Layers size={16} />
    });
    data.push({
      type: 'page',
      title: t.nav.analyzer,
      description: '',
      tab: AppTab.ANALYZER,
      icon: <Layers size={16} />
    });
    data.push({
      type: 'page',
      title: t.nav.costOfLiving,
      description: '',
      tab: AppTab.COST_OF_LIVING,
      icon: <Layers size={16} />
    });
    data.push({
      type: 'page',
      title: t.nav.faq,
      description: '',
      tab: AppTab.FAQ,
      icon: <HelpCircle size={16} />
    });
    data.push({
      type: 'page',
      title: t.nav.updates,
      description: t.alert.title,
      tab: AppTab.LEGAL_UPDATES,
      icon: <Layers size={16} />
    });

    const fuse = new Fuse(data, {
      keys: ['title', 'description'],
      threshold: 0.3,
      ignoreLocation: true
    });

    const searchResults = fuse.search(query).map(r => r.item);
    setResults(searchResults.slice(0, 6)); // limit to top 6
  }, [query, lang, isAr, t]);

  const handleSelect = (item: any) => {
    setQuery('');
    setIsOpen(false);
    onSelectResult(item.tab, item.payload);
  };

  return (
    <div className="relative z-50 w-full max-w-sm" ref={searchRef}>
      <div className="relative">
        <div className={`absolute inset-y-0 flex items-center pointer-events-none ${isAr ? 'right-3' : 'left-3'}`}>
          <Search size={16} className="text-slate-400" />
        </div>
        <input 
          type="text"
          className={`w-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-sm rounded-xl py-2 ${isAr ? 'pr-9 pl-3' : 'pl-9 pr-3'} outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all border border-transparent focus:border-indigo-500/30 placeholder-slate-400`}
          placeholder={t.common.searchTasks}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          dir={isAr ? 'rtl' : 'ltr'}
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className={`absolute inset-y-0 flex items-center justify-center p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 ${isAr ? 'left-1' : 'right-1'}`}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {isOpen && query && (
        <div className={`absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden ${isAr ? 'right-0' : 'left-0'}`}>
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {results.length > 0 ? (
              results.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(item)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-start ${isAr ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
                >
                  <div className="mt-0.5 p-1.5 shrink-0 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{item.title}</h4>
                    {item.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                {t.common.noResults}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
