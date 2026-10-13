import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Briefcase, GraduationCap, Users, Shield, Info, ClipboardList, RotateCcw } from 'lucide-react';

interface Props {
  lang: 'ar' | 'en' | 'sv';
}

export const checklistsData = [
  {
    id: 'work',
    title: { ar: 'تصريح العمل 2026', en: 'Work Permit 2026', sv: 'Arbetstillstånd 2026' },
    items: [
      { id: 'w1', text: { ar: 'جواز سفر ساري المفعول', en: 'Valid Passport', sv: 'Giltigt pass' } },
      { id: 'w2', text: { ar: 'عرض عمل مؤكد من صاحب عمل سويدي', en: 'Confirmed job offer from a Swedish employer', sv: 'Bekräftat jobberbjudande från en svensk arbetsgivare' } },
      { id: 'w3', text: { ar: 'راتب لا يقل عن 33,390 كرون سويدي (90% من متوسط الراتب السويدي)', en: 'Salary of at least 33,390 SEK (90% of Swedish median salary)', sv: 'Lön på minst 33 390 SEK (90 % av svensk medianlön)' } },
      { id: 'w4', text: { ar: 'تأمين صحي شامل وتأمين على الحياة/التقاعد', en: 'Comprehensive health, life and pension insurance', sv: 'Omfattande sjuk-, liv- och pensionsförsäkring' } },
      { id: 'w5', text: { ar: 'عقد نقابي أو شروط تتوافق مع الاتفاقية الجماعية السويدية', en: 'Union contract or terms equalling a Swedish collective agreement', sv: 'Fackligt avtal eller villkor motsvarande svenskt kollektivavtal' } }
    ]
  },
  {
    id: 'student',
    title: { ar: 'تأشيرة الدراسة 2026', en: 'Student Visa 2026', sv: 'Studentvisum 2026' },
    items: [
      { id: 's1', text: { ar: 'جواز سفر ساري المفعول', en: 'Valid Passport', sv: 'Giltigt pass' } },
      { id: 's2', text: { ar: 'رسالة قبول لبرنامج دراسي بدوام كامل', en: 'Letter of admission for a full-time study program', sv: 'Antagningsbesked för ett heltidsstudieprogram' } },
      { id: 's3', text: { ar: 'إثبات دفع القسط الأول من الرسوم الدراسية', en: 'Proof of payment for the first installment of tuition fees', sv: 'Bevis på betalning för första delen av studieavgiften' } },
      { id: 's4', text: { ar: 'إثبات القدرة المالية (9,450 كرون شهرياً للفترة كاملة)', en: 'Proof of financial capacity (9,450 SEK/month for the entire period)', sv: 'Bevis på ekonomisk förmåga (9 450 SEK/månad för hela perioden)' } },
      { id: 's5', text: { ar: 'تأمين صحي شامل (إذا كانت الدراسة أقل من عام)', en: 'Comprehensive health insurance (if studying less than a year)', sv: 'Omfattande sjukförsäkring (om du studerar mindre än ett år)' } }
    ]
  },
  {
    id: 'citizenship',
    title: { ar: 'الجنسية السويدية 2026', en: 'Swedish Citizenship 2026', sv: 'Svenskt medborgarskap 2026' },
    items: [
      { id: 'c1', text: { ar: 'فترة إقامة لا تقل عن 8 سنوات (القانون الجديد)', en: 'Residence period of at least 8 years (New law)', sv: 'Vistelseperiod på minst 8 år (Ny lag)' } },
      { id: 'c2', text: { ar: 'دخل ثابت لضمان الإعالة الذاتية (حوالي 20,000 كرون شهرياً)', en: 'Stable income to ensure self-support (around 20,000 SEK/month)', sv: 'Stabil inkomst för att säkerställa självförsörjning (ca 20 000 SEK/månad)' } },
      { id: 'c3', text: { ar: 'اجتياز اختبار اللغة السويدية', en: 'Passing the Swedish language test', sv: 'Godkänt svenskt språktest' } },
      { id: 'c4', text: { ar: 'اجتياز اختبار المعرفة بالمجتمع السويدي', en: 'Passing the Swedish society knowledge test', sv: 'Godkänt test i svensk samhällskunskap' } },
      { id: 'c5', text: { ar: 'سجل جنائي نظيف وخالٍ من الديون (Kronofogden)', en: 'Clean criminal and debt record (Kronofogden)', sv: 'Rent belastnings- och skuldregister (Kronofogden)' } },
      { id: 'c6', text: { ar: 'دفع رسوم التقديم الجديدة (2,900 كرون سويدي)', en: 'Payment of the new application fee (2,900 SEK)', sv: 'Betalning av den nya ansökningsavgiften (2 900 SEK)' } }
    ]
  },
  {
    id: 'family',
    title: { ar: 'لم شمل الأسرة 2026', en: 'Family Reunification 2026', sv: 'Familjeåterförening 2026' },
    items: [
      { id: 'f1', text: { ar: 'جواز سفر ساري المفعول لأفراد الأسرة', en: 'Valid passports for family members', sv: 'Giltiga pass för familjemedlemmar' } },
      { id: 'f2', text: { ar: 'وثائق تثبت صلة القرابة (عقد زواج، شهادات ميلاد) مصدقة أو مترجمة', en: 'Documents proving relation (marriage cert, birth certs) legalized/translated', sv: 'Dokument som styrker relation (vigselbevis, födelsebevis) legaliserade/översatta' } },
      { id: 'f3', text: { ar: 'إثبات دخل كافٍ للمرجعية في السويد لتغطية التكاليف (شرط الإعالة)', en: 'Proof of sufficient income for the sponsor in Sweden (maintenance requirement)', sv: 'Bevis på tillräcklig inkomst för referenspersonen i Sverige (försörjningskrav)' } },
      { id: 'f4', text: { ar: 'إثبات مسكن بحجم مناسب للمرجعية في السويد', en: 'Proof of adquate housing size for the sponsor in Sweden', sv: 'Bevis på bostad av lämplig storlek för referenspersonen i Sverige' } }
    ]
  }
];

const Checklists: React.FC<Props> = ({ lang }) => {
  const isAr = lang === 'ar';

  const lists = checklistsData.map(list => ({
    ...list,
    icon: list.id === 'work' ? Briefcase : list.id === 'student' ? GraduationCap : list.id === 'citizenship' ? Shield : Users
  }));

  const [activeTab, setActiveTab] = useState(lists[0].id);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('sweden_visas_checklists');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('sweden_visas_checklists', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const activeList = lists.find(l => l.id === activeTab) || lists[0];
  const progress = activeList.items.filter(item => checkedItems[item.id]).length;
  const progressPercent = Math.round((progress / activeList.items.length) * 100);

  const resetChecklist = () => {
    if (window.confirm(isAr ? 'هل أنت متأكد من مسح تقدم هذه القائمة؟' : lang === 'sv' ? 'Är du säker på att du vill rensa framsteget för denna lista?' : 'Are you sure you want to clear the progress for this list?')) {
      const newCheckedItems = { ...checkedItems };
      activeList.items.forEach(item => {
        delete newCheckedItems[item.id];
      });
      setCheckedItems(newCheckedItems);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-3 mb-8">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <ClipboardList size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
          {isAr ? 'قوائم المتطلبات' : lang === 'sv' ? 'Kravkontrollistor' : 'Requirement Checklists'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          {isAr 
            ? 'حدد نوع التصريح للتحقق من جميع المستندات والشروط المطلوبة لتطابق قوانين 2026. الملاحظات يتم حفظها محلياً.'
            : lang === 'sv' 
              ? 'Välj tillståndstyp för att kontrollera alla nödvändiga dokument. Data sparas lokalt.'
              : 'Select a permit type to verify all required documents. Progress is saved locally.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {lists.map(list => (
          <button
            key={list.id}
            onClick={() => setActiveTab(list.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl transition-all font-bold text-sm border-2 ${
              activeTab === list.id 
                ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300 shadow-sm' 
                : 'border-transparent bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            <list.icon size={18} />
            <span className="whitespace-nowrap">{list.title[lang as 'ar' | 'en' | 'sv']}</span>
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <activeList.icon size={28} className="text-blue-600 dark:text-blue-400" />
              {activeList.title[lang as 'ar' | 'en' | 'sv']}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={resetChecklist}
              className="text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-900/20 p-2.5 rounded-xl transition-colors border border-slate-100 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800"
              title={isAr ? 'مسح التقدم' : lang === 'sv' ? 'Återställ' : 'Reset progress'}
            >
              <RotateCcw size={18} />
            </button>
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="w-24 md:w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {activeList.items.map(item => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div 
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 md:p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                  isChecked 
                    ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/50' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <div className={`mt-0.5 transition-colors ${isChecked ? 'text-blue-600 dark:text-blue-400' : 'text-slate-300 dark:text-slate-600'}`}>
                  {isChecked ? <CheckSquare size={24} /> : <Square size={24} />}
                </div>
                <div className={`flex-1 font-medium transition-all ${isChecked ? 'text-slate-500 dark:text-slate-400 line-through decoration-slate-300 dark:decoration-slate-600' : 'text-slate-800 dark:text-slate-200'}`}>
                  {item.text[lang as 'ar' | 'en' | 'sv']}
                </div>
              </div>
            );
          })}
        </div>
        
        {progressPercent === 100 && (
           <div className="mt-8 p-5 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-2xl flex items-start gap-3 animate-in slide-in-from-bottom-4 border border-green-200 dark:border-green-800">
             <Info size={24} className="shrink-0 mt-0.5" />
             <div>
               <h4 className="font-bold mb-1">
                 {isAr ? 'اكتملت القائمة!' : lang === 'sv' ? 'Listan är komplett!' : 'List Complete!'}
               </h4>
               <p className="text-sm opacity-90 leading-relaxed">
                 {isAr ? 'لقد تحققت من كافة المتطلبات الأساسية لهذا التصريح بما يوافق قوانين 2026. تذكر دائماً أخذ المعلومات من المواقع الرسمية.' 
                       : lang === 'sv' ? 'Du har verifierat alla grundläggande krav. Kom ihåg att alltid kontrollera officiella webbplatser.' 
                       : 'You have verified all basic requirements for this permit according to the 2026 laws. Remember to always consult official websites.'}
               </p>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default Checklists;
