import React, { useState } from 'react';
import { CheckCircle, AlertCircle, XCircle, ArrowRight, RefreshCcw, ArrowLeft, BookOpen, Info } from 'lucide-react';

interface Props {
  lang: 'ar' | 'en' | 'sv';
  onBack: () => void;
}

const CitizenshipTest: React.FC<Props> = ({ lang, onBack }) => {
  const isAr = lang === 'ar';
  
  const questions = [
    {
      id: 1,
      type: 'society',
      q: { ar: 'وفقاً لقوانين 2026، ما هي مدة الإقامة المطلوبة للتقديم على الجنسية؟', en: 'According to the 2026 rules, what is the residence time required to apply for citizenship?', sv: 'Enligt reglerna från 2026, vad är den nödvändiga boendetiden för att ansöka om medborgarskap?' },
      options: [
        { id: 'a', text: { ar: '5 سنوات', en: '5 years', sv: '5 år' }, isCorrect: false },
        { id: 'b', text: { ar: '8 سنوات', en: '8 years', sv: '8 år' }, isCorrect: true },
        { id: 'c', text: { ar: '10 سنوات', en: '10 years', sv: '10 år' }, isCorrect: false }
      ],
      explanation: { ar: 'اعتباراً من 6 يونيو 2026، تم رفع شرط الإقامة للحصول على الجنسية إلى 8 سنوات כقاعدة عامة.', en: 'As of June 6, 2026, the residence requirement for citizenship was increased to 8 years as a general rule.', sv: 'Från och med den 6 juni 2026 höjdes boendekravet för medborgarskap till 8 år som huvudregel.' }
    },
    {
      id: 2,
      type: 'society',
      q: { ar: 'ما هو متطلب الإعالة الذاتية (الدخل) للتقديم على الجنسية حسب لوائح 2026؟', en: 'What is the self-support (income) requirement to apply for citizenship according to the 2026 regulations?', sv: 'Vad är kravet på självförsörjning (inkomst) för att ansöka om medborgarskap enligt reglerna för 2026?' },
      options: [
        { id: 'a', text: { ar: '10,000 كرون/شهر', en: '10,000 SEK/month', sv: '10 000 SEK/månad' }, isCorrect: false },
        { id: 'b', text: { ar: '15,000 كرون/شهر', en: '15,000 SEK/month', sv: '15 000 SEK/månad' }, isCorrect: false },
        { id: 'c', text: { ar: '20,000 كرون/شهر', en: '20,000 SEK/month', sv: '20 000 SEK/månad' }, isCorrect: true }
      ],
      explanation: { ar: 'تنص القواعد الجديدة على أن يكون لدى المتقدم دخل ثابت لا يقل عن 20,000 كرون شهرياً لضمان الإعالة الذاتية.', en: 'The new rules state that the applicant must have a stable income of at least 20,000 SEK per month to ensure self-support.', sv: 'De nya reglerna anger att sökanden måste ha en stabil inkomst på minst 20 000 SEK per månad för att säkerställa självförsörjning.' }
    },
    {
      id: 3,
      type: 'society',
      q: { ar: 'أي من الجهات التالية مسؤولة عن إصدار تصاريح الإقامة والجنسية في السويد؟', en: 'Which of the following authorities is responsible for issuing residence permits and citizenship in Sweden?', sv: 'Vilken av följande myndigheter ansvarar för att utfärda uppehållstillstånd och medborgarskap i Sverige?' },
      options: [
        { id: 'a', text: { ar: 'مصلحة الضرائب (Skatteverket)', en: 'Tax Agency (Skatteverket)', sv: 'Skatteverket' }, isCorrect: false },
        { id: 'b', text: { ar: 'مصلحة الهجرة (Migrationsverket)', en: 'Migration Agency (Migrationsverket)', sv: 'Migrationsverket' }, isCorrect: true },
        { id: 'c', text: { ar: 'الشرطة (Polisen)', en: 'Police (Polisen)', sv: 'Polisen' }, isCorrect: false }
      ],
      explanation: { ar: 'مصلحة الهجرة (Migrationsverket) هي الهيئة الحكومية المسؤولة عن قضايا الهجرة واللجوء والجنسية.', en: 'The Migration Agency (Migrationsverket) is the government body responsible for immigration, asylum, and citizenship matters.', sv: 'Migrationsverket är den statliga myndighet som ansvarar för migrations-, asyl- och medborgarskapsfrågor.' }
    },
    {
      id: 4,
      type: 'language',
      q: { ar: 'ما هي الترجمة الصحيحة لكلمة "عمل" باللغة السويدية؟', en: 'What is the correct translation for the word "Work" in Swedish?', sv: 'Vad är den korrekta översättningen för ordet "Work" (Arbete) på svenska?' },
      options: [
        { id: 'a', text: { ar: 'Studier', en: 'Studier', sv: 'Studier' }, isCorrect: false },
        { id: 'b', text: { ar: 'Arbete', en: 'Arbete', sv: 'Arbete' }, isCorrect: true },
        { id: 'c', text: { ar: 'Bostad', en: 'Bostad', sv: 'Bostad' }, isCorrect: false }
      ],
      explanation: { ar: 'كلمة Arbete تعني عمل، بينما Studier تعني دراسة، و Bostad تعني سكن.', en: 'The word Arbete means work, while Studier means studies, and Bostad means housing.', sv: 'Ordet Arbete betyder jobb, medan Studier betyder studier och Bostad betyder boende.' }
    },
    {
      id: 5,
      type: 'language',
      q: { ar: 'اختر الجملة السويدية الصحيحة التي تعني "أريد التقديم على الجنسية":', en: 'Choose the correct Swedish sentence representing "I want to apply for citizenship":', sv: 'Välj den korrekta svenska meningen som betyder "Jag vill ansöka om medborgarskap":' },
      options: [
        { id: 'a', text: { ar: 'Jag vill ansöka om uppehållstillstånd.', en: 'Jag vill ansöka om uppehållstillstånd.', sv: 'Jag vill ansöka om uppehållstillstånd.' }, isCorrect: false },
        { id: 'b', text: { ar: 'Jag vill arbeta i Sverige.', en: 'Jag vill arbeta i Sverige.', sv: 'Jag vill arbeta i Sverige.' }, isCorrect: false },
        { id: 'c', text: { ar: 'Jag vill ansöka om medborgarskap.', en: 'Jag vill ansöka om medborgarskap.', sv: 'Jag vill ansöka om medborgarskap.' }, isCorrect: true }
      ],
      explanation: { ar: '"Ansöka om medborgarskap" تعني التقديم على الجنسية، بينما "uppehållstillstånd" تعني التقديم على تصريح إقامة.', en: '"Ansöka om medborgarskap" means apply for citizenship, while "uppehållstillstånd" means residence permit.', sv: '"Ansöka om medborgarskap" betyder att man ansöker om medborgarskap, medan "uppehållstillstånd" betyder uppehållstillstånd.' }
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (optId: string, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOpt(optId);
    setIsAnswered(true);
    if (isCorrect) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    const passed = score >= 4;
    return (
      <div className="space-y-6 text-center animate-in fade-in duration-300 relative z-10">
        <button onClick={onBack} className="absolute -top-4 -left-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <ArrowLeft size={24} className={isAr ? 'rotate-180' : ''} />
        </button>
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'}`}>
          {passed ? <CheckCircle size={40} /> : <AlertCircle size={40} />}
        </div>
        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
          {passed ? (isAr ? 'نجاح!' : lang === 'sv' ? 'Godkänd!' : 'Passed!') : (isAr ? 'تحتاج للمزيد من التدريب' : lang === 'sv' ? 'Du behöver mer övning' : 'Needs More Practice')}
        </h3>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {isAr ? 'لقد أجبت بشكل صحيح على' : lang === 'sv' ? 'Du svarade rätt på' : 'You answered correctly on'} <span className="font-bold text-slate-800 dark:text-white">{score}</span> {isAr ? 'من أصل' : lang === 'sv' ? 'av' : 'out of'} <span className="font-bold text-slate-800 dark:text-white">{questions.length}</span> {isAr ? 'أسئلة' : lang === 'sv' ? 'frågor' : 'questions'}.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
          <button onClick={handleRetry} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">
            <RefreshCcw size={18} />
            {isAr ? 'إعادة الإختبار' : lang === 'sv' ? 'Gör om testet' : 'Retake Test'}
          </button>
          <button onClick={onBack} className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-bold transition-colors">
            {isAr ? 'العودة' : lang === 'sv' ? 'Tillbaka' : 'Go Back'}
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative z-10 w-full">
      <div className="flex items-center justify-between mb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft size={24} className={isAr ? 'rotate-180' : ''} />
        </button>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`h-2 w-8 rounded-full ${i <= currentIdx ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full uppercase tracking-wider">
            {q.type === 'society' ? (isAr ? 'أسئلة المجتمع' : lang === 'sv' ? 'Samhällsfrågor' : 'Society Questions') : (isAr ? 'اللغة السويدية' : lang === 'sv' ? 'Svenska språket' : 'Swedish Language')}
          </span>
          <span className="text-slate-400 text-sm font-medium">Question {currentIdx + 1}/{questions.length}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white leading-relaxed">
          {q.q[lang as 'ar' | 'en' | 'sv']}
        </h3>
      </div>

      <div className="space-y-3">
        {q.options.map((opt) => {
          const isSelected = selectedOpt === opt.id;
          let btnClass = "bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600";
          
          if (isAnswered) {
             if (opt.isCorrect) {
               btnClass = "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700";
             } else if (isSelected && !opt.isCorrect) {
               btnClass = "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700";
             } else {
               btnClass = "bg-slate-50 dark:bg-slate-800/30 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800 opacity-50";
             }
          }

          return (
            <button
              key={opt.id}
              disabled={isAnswered}
              onClick={() => handleSelect(opt.id, opt.isCorrect)}
              className={`w-full text-start px-4 py-4 rounded-2xl border-2 transition-all font-bold flex items-center justify-between ${btnClass}`}
            >
              <span>{opt.text[lang as 'ar' | 'en' | 'sv']}</span>
              {isAnswered && opt.isCorrect && <CheckCircle size={20} className="text-green-500 shrink-0" />}
              {isAnswered && isSelected && !opt.isCorrect && <XCircle size={20} className="text-red-500 shrink-0" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-6 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start gap-3">
            <Info size={24} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="text-blue-900 dark:text-blue-200 font-medium leading-relaxed">
              {q.explanation[lang as 'ar' | 'en' | 'sv']}
            </div>
          </div>
          <button 
            onClick={handleNext}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all"
          >
            {isAr ? 'التالي' : lang === 'sv' ? 'Nästa' : 'Next'}
            <ArrowRight size={18} className={isAr ? 'rotate-180' : ''} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CitizenshipTest;
