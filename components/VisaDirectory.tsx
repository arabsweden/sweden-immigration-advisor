
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Wallet, 
  FileCheck,
  BookOpen,
  Info,
  MessageSquareText,
  Sparkles,
  Share2,
  Check,
  HelpCircle,
  ArrowLeft,
  Search,
  X,
  Calculator,
  Plus,
  Minus,
  ExternalLink,
  Coins,
  ShieldCheck,
  ArrowRight,
  ListChecks,
  MessageCircleQuestion,
  CircleHelp
} from 'lucide-react';
import { getVisaData } from '../constants';
import { translations } from '../translations';

interface Props {
  onAskExpert: (query: string) => void;
  initialVisaId?: string | null;
  onVisaOpened?: () => void;
  lang: 'ar' | 'en' | 'sv';
}

const VisaDirectory: React.FC<Props> = ({ onAskExpert, initialVisaId, onVisaOpened, lang }) => {
  const [openId, setOpenId] = useState<string | null>('work');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [calculatingId, setCalculatingId] = useState<string | null>(null);
  const [familySize, setFamilySize] = useState({ adults: 1, children: 0 });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const t = translations[lang];
  const visaData = getVisaData(lang);

  const filteredVisas = useMemo(() => {
    if (!searchTerm.trim()) return visaData;
    const term = searchTerm.toLowerCase();
    return visaData.filter(visa => 
      visa.title.toLowerCase().includes(term) || 
      visa.description.toLowerCase().includes(term)
    );
  }, [searchTerm, visaData]);

  useEffect(() => {
    if (initialVisaId) {
      setOpenId(initialVisaId);
      const timer = setTimeout(() => {
        const element = document.getElementById(`visa-${initialVisaId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (onVisaOpened) onVisaOpened();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [initialVisaId, onVisaOpened]);

  const calculateTotalFees = (visaId: string) => {
    const { adults, children } = familySize;
    let total = 0;
    
    switch(visaId) {
      case 'work':
        total = 2200 + (Math.max(0, adults - 1) * 1500) + (children * 750);
        break;
      case 'family':
        total = (adults * 2000) + (children * 1000);
        break;
      case 'study':
        total = 1500 + (Math.max(0, adults - 1) * 1500) + (children * 750);
        break;
      case 'investor':
        total = 2200 + (Math.max(0, adults - 1) * 1500) + (children * 750);
        break;
      case 'religious':
        total = 2200 + (Math.max(0, adults - 1) * 1500) + (children * 750);
        break;
      case 'self-employed':
        total = 2200 + (Math.max(0, adults - 1) * 1500) + (children * 750);
        break;
      case 'asylum':
        total = 0;
        break;
      default:
        total = 0;
    }
    return total;
  };

  const handleShare = async (visaId: string, title: string) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?visa=${visaId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: lang === 'ar' ? `دليل الهجرة إلى السويد: ${title}` : `Sweden Migration Guide: ${title}`,
          text: lang === 'ar' ? `اكتشف تفاصيل وشروط ${title} في السويد لعام 2026.` : `Explore terms and requirements for ${title} in Sweden for 2026.`,
          url: shareUrl,
        });
      } catch (err) { console.error('Error sharing:', err); }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedId(visaId);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) { console.error('Failed to copy:', err); }
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getAskExpertQuery = (visaTitle: string, question: string) => {
    if (lang === 'ar') return `بصفتي مهتماً بـ ${visaTitle}، لدي استفسار محدد: ${question}`;
    if (lang === 'sv') return `Som intresserad av ${visaTitle} har jag en specifik fråga: ${question}`;
    return `As someone interested in ${visaTitle}, I have a specific question: ${question}`;
  };

  const getDeepConsultationQuery = (visaTitle: string) => {
    if (lang === 'ar') return `بصفتك خبيراً قانونياً، أريد تفاصيل دقيقة وشرحاً وافياً حول شروط ومتطلبات ${visaTitle} في السويد لعام 2026، وما هي النصائح لتجنب رفض الطلب؟`;
    if (lang === 'sv') return `Som juridisk expert, jag vill ha exakta detaljer och en fullständig förklaring om villkoren och kraven för ${visaTitle} i Sverige för 2026. Vad är tipsen för att undvika avslag?`;
    return `As a legal expert, I want precise details and a full explanation about the terms and requirements for ${visaTitle} in Sweden for 2026. What are the tips to avoid rejection?`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center relative overflow-hidden">
        <div className={`absolute top-0 ${lang === 'en' ? 'left-0' : 'right-0'} w-32 h-32 bg-blue-50 rounded-full ${lang === 'en' ? '-ml-16' : '-mr-16'} -mt-16 opacity-50 blur-2xl`}></div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 relative z-10">
          {lang === 'ar' ? 'دليل التأشيرات التفصيلي 2026' : lang === 'sv' ? 'Detaljerad visumguide 2026' : 'Detailed Visa Guide 2026'}
        </h2>
        <p className="text-slate-600 max-w-3xl mx-auto relative z-10 mb-8">
          {lang === 'ar' 
            ? 'بصفتي خبيراً قانونياً، قمت بتنظيم هذه المعلومات لمساعدتك في فهم المسار الأنسب لك. يتم تحديث هذه البيانات بناءً على القرارات الأخيرة لمصلحة الهجرة السويدية.'
            : lang === 'sv'
            ? 'Som juridisk expert har jag organiserat denna information för att hjälpa dig att förstå den mest lämpliga vägen för dig. Dessa data uppdateras baserat på nyligen fattade beslut av Migrationsverket.'
            : 'As a legal expert, I have organized this information to help you understand the most suitable path for you. This data is updated based on recent decisions by the Swedish Migration Agency.'}
        </p>

        <div className="max-w-xl mx-auto relative z-10">
          <div className="relative group">
            <div className={`absolute inset-y-0 ${lang === 'ar' ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
              <Search className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث عن نوع التأشيرة (مثلاً: عمل، دراسة)...' : lang === 'sv' ? 'Sök efter visumtyp (t.ex. arbete, studier)...' : 'Search for visa type (e.g., work, study)...'}
              className={`w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 ${lang === 'ar' ? 'pr-12 pl-12' : 'pl-12 pr-12'} focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all shadow-inner`}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className={`absolute inset-y-0 ${lang === 'ar' ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center text-slate-400 hover:text-slate-600`}>
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredVisas.length > 0 ? (
          filteredVisas.map((visa) => (
            <div key={visa.id} id={`visa-${visa.id}`} className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 ${openId === visa.id ? 'border-blue-400 ring-4 ring-blue-50' : 'border-slate-200 hover:border-blue-300'}`}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
                <button 
                  onClick={() => {
                    setOpenId(openId === visa.id ? null : visa.id);
                    setOpenFaqIndex(null); // Reset FAQ state when changing visa
                  }}
                  className={`flex-1 flex items-center justify-between p-6 outline-none ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      visa.color === 'rose' ? 'bg-rose-50' : 
                      visa.color === 'emerald' ? 'bg-emerald-50' : 
                      visa.color === 'amber' ? 'bg-amber-50' : 
                      visa.color === 'indigo' ? 'bg-indigo-50' : 
                      visa.color === 'purple' ? 'bg-purple-50' : 
                      visa.color === 'cyan' ? 'bg-cyan-50' : 'bg-blue-50'
                    }`}>
                      {visa.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{visa.title}</h3>
                      <p className="text-slate-500 text-sm mt-1">{visa.description}</p>
                    </div>
                  </div>
                  <div className={`${lang === 'ar' ? 'mr-4' : 'ml-4'} flex items-center gap-4`}>
                    {openId === visa.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                  </div>
                </button>
                <div className={`px-6 pb-6 sm:pb-0 ${lang === 'ar' ? 'sm:pl-6' : 'sm:pr-6'} flex items-center gap-2`}>
                  <button onClick={(e) => { e.stopPropagation(); handleShare(visa.id, visa.title); }} className={`flex items-center justify-center p-2.5 rounded-xl border transition-all ${copiedId === visa.id ? 'bg-green-50 border-green-200 text-green-600' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}>
                    {copiedId === visa.id ? <Check size={18} /> : <Share2 size={18} />}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onAskExpert(lang === 'ar' ? `أريد استشارة سريعة حول ${visa.title}، ما هي أهم التغييرات في متطلباتها لعام 2026؟` : lang === 'sv' ? `Jag vill ha en snabb konsultation om ${visa.title}, vilka är de viktigaste ändringarna i kraven för 2026?` : `I want a quick consultation on ${visa.title}, what are the key requirement changes for 2026?`); }} className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-xs text-blue-600 font-bold bg-blue-50 px-4 py-2.5 rounded-xl hover:bg-blue-100 transition-colors border border-blue-100 shadow-sm whitespace-nowrap">
                    <MessageSquareText size={16} />
                    <span>{t.common.askExpert}</span>
                  </button>
                </div>
              </div>

              {openId === visa.id && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-50 bg-slate-50/30">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3"><FileCheck size={18} className="text-blue-500" />{t.common.requirements}</h4>
                        <ul className="space-y-2">{visa.requirements.map((req, i) => (<li key={i} className="text-sm text-slate-600 flex gap-2"><span className="text-blue-500">•</span> {req}</li>))}</ul>
                      </div>
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3"><BookOpen size={18} className="text-blue-500" />{t.common.documents}</h4>
                        <ul className="space-y-2">{visa.documents.map((doc, i) => (<li key={i} className="text-sm text-slate-600 flex gap-2"><span className="text-blue-500">✓</span> {doc}</li>))}</ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4 shadow-inner relative overflow-hidden">
                        <div className={`absolute bottom-0 ${lang === 'ar' ? 'left-0' : 'right-0'} w-24 h-24 bg-slate-50 rounded-full ${lang === 'ar' ? '-ml-12' : '-mr-12'} -mb-12 opacity-50`}></div>
                        <div className="flex items-start gap-3 relative z-10"><Clock className="text-slate-400 mt-1" size={18} /><div><p className="text-xs font-bold text-slate-400 uppercase">{t.common.processingTime}</p><p className="text-sm font-medium text-slate-700">{visa.processingTime}</p></div></div>
                        <div className="flex items-start gap-3 relative z-10"><Wallet className="text-slate-400 mt-1" size={18} /><div><p className="text-xs font-bold text-slate-400 uppercase">{t.common.fees}</p><p className="text-sm font-medium text-slate-700">{visa.fees}</p></div></div>
                        <div className="flex items-start gap-3 border-t pt-4 relative z-10"><div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0"><Info size={16} /></div><div><p className="text-xs font-bold text-blue-400 uppercase">{t.common.maintenance}</p><p className="text-sm font-medium text-slate-700">{visa.maintenance}</p></div></div>
                      </div>

                      {/* Detailed Maintenance Breakdown Section */}
                      <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 space-y-4 shadow-sm relative overflow-hidden group">
                        <div className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} p-4 opacity-10 group-hover:scale-110 transition-transform`}>
                          <Coins size={48} />
                        </div>
                        <h4 className="text-sm font-bold text-indigo-800 flex items-center gap-2 relative z-10">
                          <ShieldCheck size={18} className="text-indigo-600" />
                          {t.common.maintenanceBreakdown}
                        </h4>
                        
                        <div className="space-y-4 relative z-10">
                          <div className="bg-white p-3 rounded-xl border border-indigo-50 shadow-sm">
                            <p className="text-[10px] font-bold text-indigo-400 uppercase mb-1">{t.common.monthlyThreshold}</p>
                            <p className="text-lg font-black text-indigo-900 leading-tight">
                              {visa.maintenanceDetails.monthlyAmount}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-indigo-400 uppercase">{t.common.specialConditions}</p>
                            <ul className="space-y-1.5">
                              {visa.maintenanceDetails.conditions.map((condition, idx) => (
                                <li key={idx} className="text-xs text-indigo-700 flex gap-2 items-start leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-1 shrink-0"></span>
                                  <span>{condition}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative">
                        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-6">
                          <ListChecks size={20} className="text-blue-600" />
                          {t.common.applicationProcess}
                        </h4>
                        
                        <div className="space-y-0 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                          {visa.applicationSteps.map((step, idx) => (
                            <div key={idx} className="relative pl-8 pb-6 last:pb-0">
                              <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center z-10">
                                <span className="text-[10px] font-bold text-blue-600">{idx + 1}</span>
                              </div>
                              <h5 className="text-sm font-bold text-slate-800 mb-1">{step.title}</h5>
                              <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                            </div>
                          ))}
                        </div>

                        {/* Cost Estimation Toggle */}
                        <div className="mt-8">
                          {calculatingId === visa.id ? (
                            <div className="space-y-4 animate-in fade-in zoom-in-95 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
                              <h5 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                <Calculator size={16} className="text-blue-600" />
                                {t.common.totalEstimate}
                              </h5>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-slate-400 font-bold uppercase">{t.common.adults}</label>
                                  <div className="flex items-center gap-3">
                                    <button onClick={() => setFamilySize(p => ({...p, adults: Math.max(1, p.adults-1)}))} className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-600"><Minus size={14}/></button>
                                    <span className="font-bold text-slate-700">{familySize.adults}</span>
                                    <button onClick={() => setFamilySize(p => ({...p, adults: p.adults+1}))} className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-600"><Plus size={14}/></button>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] text-slate-400 font-bold uppercase">{t.common.children}</label>
                                  <div className="flex items-center gap-3">
                                    <button onClick={() => setFamilySize(p => ({...p, children: Math.max(0, p.children-1)}))} className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-600"><Minus size={14}/></button>
                                    <span className="font-bold text-slate-700">{familySize.children}</span>
                                    <button onClick={() => setFamilySize(p => ({...p, children: p.children+1}))} className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-600"><Plus size={14}/></button>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-blue-600 text-white p-4 rounded-xl text-center shadow-lg shadow-blue-100">
                                <p className="text-[10px] opacity-80 uppercase font-bold mb-1 tracking-wider">{t.common.totalEstimate}</p>
                                <p className="text-2xl font-black">{calculateTotalFees(visa.id).toLocaleString()} SEK</p>
                              </div>
                              <button onClick={() => setCalculatingId(null)} className="w-full text-[10px] text-slate-400 hover:text-slate-600 font-bold py-1 underline uppercase tracking-widest">{t.common.close}</button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => setCalculatingId(visa.id)}
                              className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-blue-200 text-blue-600 rounded-2xl hover:bg-blue-50 transition-colors text-xs font-bold uppercase tracking-wider"
                            >
                              <Calculator size={18} />
                              {t.common.estimateCosts}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Section */}
                  <div className="mt-8 bg-slate-100/50 rounded-3xl p-6 border border-slate-200">
                    <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-6 px-2">
                      <MessageCircleQuestion size={22} className="text-blue-600" />
                      {t.common.faqs}
                    </h4>
                    <div className="space-y-3">
                      {visa.faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-blue-300 transition-all">
                          <button 
                            onClick={() => toggleFaq(index)}
                            className={`w-full flex items-center justify-between p-4 ${lang === 'ar' ? 'text-right' : 'text-left'} group outline-none`}
                          >
                            <span className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors flex items-start gap-3">
                              <CircleHelp size={18} className="text-blue-400 mt-0.5 shrink-0" />
                              {faq.q}
                            </span>
                            {openFaqIndex === index ? (
                              <Minus size={16} className="text-slate-400 shrink-0 ml-2" />
                            ) : (
                              <Plus size={16} className="text-slate-400 shrink-0 ml-2" />
                            )}
                          </button>
                          {openFaqIndex === index && (
                            <div className={`px-11 pb-4 animate-in fade-in slide-in-from-top-2 duration-300`}>
                              <p className={`text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                                {faq.a}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-3 lg:col-span-2">
                        <h4 className={`text-sm font-bold text-slate-700 flex items-center gap-2 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}><HelpCircle size={16} className="text-slate-400" />{t.common.relatedQuestions}</h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {visa.relatedQuestions.map((question, i) => (
                            <button 
                              key={i} 
                              onClick={() => onAskExpert(getAskExpertQuery(visa.title, question))} 
                              className={`p-3 bg-white border border-slate-100 rounded-xl text-xs text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all flex items-center justify-between group ${lang === 'ar' ? 'text-right flex-row-reverse' : 'text-left'}`}
                            >
                              <span>{question}</span>
                              <ArrowLeft size={14} className={`text-slate-300 group-hover:text-blue-500 transition-colors ${lang === 'ar' ? '' : 'rotate-180'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 justify-end">
                         <button 
                          onClick={() => onAskExpert(getDeepConsultationQuery(visa.title))} 
                          className="w-full flex items-center justify-center gap-2 text-sm bg-gradient-to-l from-blue-600 to-indigo-700 text-white px-6 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all font-bold shadow-lg shadow-blue-200 group"
                         >
                           <Sparkles size={18} className="group-hover:animate-pulse" />
                           {t.common.askSpecific}
                         </button>
                         <a 
                          href={visa.officialLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-full flex items-center justify-center gap-2 text-sm bg-white text-slate-700 border border-slate-200 px-6 py-4 rounded-2xl hover:bg-slate-50 transition-colors font-bold"
                         >
                           <ExternalLink size={18} />
                           {t.common.officialApply}
                         </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto"><Search size={32} /></div>
            <h3 className="text-xl font-bold text-slate-800">{lang === 'ar' ? 'لا توجد نتائج مطابقة' : lang === 'sv' ? 'Inga matchande resultat' : 'No matching results'}</h3>
            <p className="text-slate-500 max-w-sm mx-auto">{lang === 'ar' ? `لم نجد أي تأشيرة تطابق "${searchTerm}". حاول استخدام كلمات مختلفة أو ابدأ من جديد.` : lang === 'sv' ? `Vi hittade inget visum som matchar "${searchTerm}". Försök med andra sökord eller börja om.` : `We couldn't find any visa matching "${searchTerm}". Try different keywords or start over.`}</p>
            <button onClick={() => setSearchTerm('')} className="text-blue-600 font-bold hover:underline">{lang === 'ar' ? 'عرض كل التأشيرات' : lang === 'sv' ? 'Visa alla visum' : 'Show all visas'}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisaDirectory;
