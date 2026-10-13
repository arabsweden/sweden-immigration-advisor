import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  RefreshCcw, 
  Search, 
  Info,
  User,
  GraduationCap,
  Briefcase,
  Wallet,
  Users,
  BookOpen,
  Copy,
  Mail,
  Check,
  Download
} from 'lucide-react';
import CitizenshipTest from './CitizenshipTest';
import { jsPDF } from 'jspdf';
import { checklistsData } from './Checklists';

interface Props {
  onShowVisa: (visaId: string) => void;
  lang: 'ar' | 'en' | 'sv';
}

const Analyzer: React.FC<Props> = ({ onShowVisa, lang }) => {
  const [step, setStep] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [copied, setCopied] = useState(false);
  const [answers, setAnswers] = useState({
    age: '',
    education: '',
    experience: '',
    family: '',
    financial: ''
  });

  const isAr = lang === 'ar';

  const reset = () => {
    setStep(0);
    setAnswers({ age: '', education: '', experience: '', family: '', financial: '' });
  };

  const nextStep = (key: string, val: string) => {
    setAnswers(prev => ({ ...prev, [key]: val }));
    setStep(step + 1);
  };

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="space-y-6 text-center animate-in slide-in-from-left-4 duration-300">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <User size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {isAr ? 'ما هي فئتك العمرية؟' : lang === 'sv' ? 'Vad är din åldersgrupp?' : 'What is your age group?'}
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { val: '18_30', ar: '18 - 30 سنة', en: '18 - 30 years', sv: '18 - 30 år' },
                { val: '31_45', ar: '31 - 45 سنة', en: '31 - 45 years', sv: '31 - 45 år' },
                { val: '46+', ar: 'أكبر من 46 سنة', en: 'Over 46 years', sv: 'Över 46 år' }
              ].map(opt => (
                <button key={opt.val} onClick={() => nextStep('age', opt.val)} className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-all font-bold">
                  {opt[lang as 'ar' | 'en' | 'sv']}
                </button>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 text-center animate-in slide-in-from-left-4 duration-300">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {isAr ? 'ما هو أعلى مستوى تعليمي لديك؟' : lang === 'sv' ? 'Vad är din högsta utbildningsnivå?' : 'What is your highest level of education?'}
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { val: 'highschool', ar: 'ثانوية عامة / دبلوم', en: 'High School / Diploma', sv: 'Gymnasium / Diplom' },
                { val: 'bachelor', ar: 'بكالوريوس', en: 'Bachelor\'s Degree', sv: 'Kandidatexamen' },
                { val: 'master', ar: 'ماجستير / دكتوراه', en: 'Master / PhD', sv: 'Master / Doktorsexamen' }
              ].map(opt => (
                <button key={opt.val} onClick={() => nextStep('education', opt.val)} className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-all font-bold">
                  {opt[lang as 'ar' | 'en' | 'sv']}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 text-center animate-in slide-in-from-left-4 duration-300">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {isAr ? 'سنوات الخبرة العملية المهنية؟' : lang === 'sv' ? 'År av arbetslivserfarenhet?' : 'Years of professional work experience?'}
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { val: '0_2', ar: 'أقل من 3 سنوات', en: 'Less than 3 years', sv: 'Mindre än 3 år' },
                { val: '3_5', ar: '3 - 5 سنوات', en: '3 - 5 years', sv: '3 - 5 år' },
                { val: '5+', ar: 'أكثر من 5 سنوات', en: 'More than 5 years', sv: 'Mer än 5 år' }
              ].map(opt => (
                <button key={opt.val} onClick={() => nextStep('experience', opt.val)} className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-all font-bold">
                  {opt[lang as 'ar' | 'en' | 'sv']}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 text-center animate-in slide-in-from-left-4 duration-300">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {isAr ? 'هل لديك روابط عائلية وثيقة في السويد؟' : lang === 'sv' ? 'Har du nära familjeband i Sverige?' : 'Do you have close family ties in Sweden?'}
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { val: 'yes', ar: 'نعم (زوج/زوجة، أطفال، والدين)', en: 'Yes (Spouse, children, parents)', sv: 'Ja (Maka/make, barn, föräldrar)' },
                { val: 'no', ar: 'لا', en: 'No', sv: 'Nej' }
              ].map(opt => (
                <button key={opt.val} onClick={() => nextStep('family', opt.val)} className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-all font-bold">
                  {opt[lang as 'ar' | 'en' | 'sv']}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 text-center animate-in slide-in-from-left-4 duration-300">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {isAr ? 'ما هو وضعك المالي أو القدرة المالية؟' : lang === 'sv' ? 'Hur ser din ekonomiska situation ut?' : 'What is your financial capacity?'}
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { val: 'job_offer', ar: 'لدي عرض عمل جاهز', en: 'I have a job offer', sv: 'Jag har ett jobberbjudande' },
                { val: 'high', ar: 'قدرة استثمار أو تمويل دراسة متوفرة', en: 'Funds for study or investment available', sv: 'Medel för studier eller investeringar tillgängliga' },
                { val: 'low', ar: 'مدخرات محدودة / أبحث عن عمل', en: 'Limited savings / Looking for work', sv: 'Begränsat sparande / Söker jobb' }
              ].map(opt => (
                <button key={opt.val} onClick={() => setAnswers(prev => {
                  const current = {...prev, financial: opt.val};
                  setStep(5);
                  return current;
                })} className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-all font-bold">
                  {opt[lang as 'ar' | 'en' | 'sv']}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return renderResult();
    }
  };

  const renderResult = () => {
    let score = 0;
    
    // Points logic
    if (answers.age === '18_30') score += 20;
    else if (answers.age === '31_45') score += 15;
    else score += 5;

    if (answers.education === 'master') score += 30;
    else if (answers.education === 'bachelor') score += 20;
    else score += 10;

    if (answers.experience === '5+') score += 20;
    else if (answers.experience === '3_5') score += 15;
    else score += 5;

    if (answers.family === 'yes') score += 20;

    if (answers.financial === 'job_offer') score += 30;
    else if (answers.financial === 'high') score += 20;
    else score += 5;

    // Assessment Logic
    let status: 'success' | 'warning' | 'error' = 'error';
    let label = "";
    let description = "";

    if (score >= 80 || answers.financial === 'job_offer') {
      status = 'success';
      label = isAr ? 'فرص ممتازة للهجرة' : lang === 'sv' ? 'Mycket goda möjligheter' : 'Excellent Migration Prospects';
      description = isAr 
        ? 'بناءً على ملفك، أهليتك عالية جدًا. يفضل مسار تأشيرة العمل، أو لم الشمل.' 
        : lang === 'sv' ? 'Utifrån din profil är dina förutsättningar mycket goda.' 
        : 'Based on your profile, eligibility is high. Work visa or family track is recommended.';
    } else if (score >= 50) {
      status = 'warning';
      label = isAr ? 'فرص متوسطة للهجرة' : lang === 'sv' ? 'Goda möjligheter' : 'Moderate Migration Prospects';
      description = isAr 
        ? 'لديك فرص جيدة، خصوصاً كطالب أو إذا قمت بتأمين عرض عمل وتطوير مهاراتك.' 
        : lang === 'sv' ? 'Dina chanser är bra, särskilt vid studier eller vid ett jobberbjudande.' 
        : 'You have decent prospects, especially as a student or if you secure a job offer.';
    } else {
      status = 'error';
      label = isAr ? 'فرص ضعيفة حالياً' : lang === 'sv' ? 'Låga möjligheter' : 'Low Migration Prospects';
      description = isAr 
        ? 'قد تواجه تحديات لدخول السويد إلا في حال تعديل وضعك الأكاديمي، أو وجود عرض عمل.' 
        : lang === 'sv' ? 'Det kan bli utmanande att migrera såvida inte din status förändras.' 
        : 'It might be challenging to migrate unless your status improves or you get a job offer.';
    }

    const resultText = `
${isAr ? 'نتائج تقييم الهجرة إلى السويد (تحديثات 2026)' : lang === 'sv' ? 'Behörighetsanalys för svensk migration (2026 uppdateringar)' : 'Sweden Migration Eligibility Analysis (2026 Updates)'}
--------------------------------------------------
${isAr ? 'النتيجة المبدئية:' : lang === 'sv' ? 'Preliminärt resultat:' : 'Initial Assessment:'} ${label}
${description}

${isAr ? 'البيانات المدخلة:' : lang === 'sv' ? 'Inmatad data:' : 'Input Data:'}
- ${isAr ? 'العمر' : lang === 'sv' ? 'Ålder' : 'Age'}: ${answers.age}
- ${isAr ? 'التعليم' : lang === 'sv' ? 'Utbildning' : 'Education'}: ${answers.education}
- ${isAr ? 'الخبرة' : lang === 'sv' ? 'Erfarenhet' : 'Experience'}: ${answers.experience}
- ${isAr ? 'روابط عائلية' : lang === 'sv' ? 'Familj' : 'Family'}: ${answers.family}
- ${isAr ? 'الوضع المالي' : lang === 'sv' ? 'Ekonomisk situation' : 'Financial'}: ${answers.financial}
`.trim();

    const handleCopy = () => {
      navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const handleEmail = () => {
      const subject = encodeURIComponent(isAr ? 'نتيجة تقييم الهجرة إلى السويد' : lang === 'sv' ? 'Sveriges migrationsbedömningsresultat' : 'Sweden Migration Assessment Result');
      const body = encodeURIComponent(resultText);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    const handleExportPDF = () => {
      const doc = new jsPDF();
      let y = 20;

      // Ensure English fallback for PDF texts since jsPDF standard doesn't support Arabic script natively
      const enLabel = score >= 80 || answers.financial === 'job_offer' ? 'Excellent Migration Prospects' : score >= 50 ? 'Moderate Migration Prospects' : 'Low Migration Prospects';
      const enDesc = score >= 80 || answers.financial === 'job_offer' ? 'Based on your profile, eligibility is high. Work visa or family track is recommended.' : score >= 50 ? 'You have decent prospects, especially as a student or if you secure a job offer.' : 'It might be challenging to migrate unless your status improves or you get a job offer.';

      doc.setFontSize(22);
      doc.text("Sweden Migration Assessment (2026)", 20, y);
      y += 15;

      doc.setFontSize(14);
      doc.text("Assessment Outcome:", 20, y);
      doc.setFontSize(12);
      doc.text(enLabel, 20, y + 8);
      y += 20;

      const splitDesc = doc.splitTextToSize(enDesc, 170);
      doc.text(splitDesc, 20, y);
      y += 10 + (splitDesc.length * 6);

      doc.setFontSize(14);
      doc.text("Input Data:", 20, y);
      y += 10;

      const getVal = (val: string) => {
        const mapping: Record<string, string> = {
          '18_30': '18 - 30 years',
          '31_45': '31 - 45 years',
          '46+': 'Over 46 years',
          'highschool': 'High School / Diploma',
          'bachelor': "Bachelor's Degree",
          'master': 'Master / PhD',
          '0_2': 'Less than 3 years',
          '3_5': '3 - 5 years',
          '5+': 'More than 5 years',
          'yes': 'Yes (Spouse, children, parents)',
          'no': 'No',
          'job_offer': 'I have a job offer',
          'high': 'Funds for study/investment available',
          'low': 'Limited savings / Looking for work'
        };
        return mapping[val] || val;
      };

      doc.setFontSize(12);
      doc.text(`- Age: ${getVal(answers.age)}`, 25, y);
      y += 8;
      doc.text(`- Education: ${getVal(answers.education)}`, 25, y);
      y += 8;
      doc.text(`- Experience: ${getVal(answers.experience)}`, 25, y);
      y += 8;
      doc.text(`- Family Ties: ${getVal(answers.family)}`, 25, y);
      y += 8;
      doc.text(`- Financial: ${getVal(answers.financial)}`, 25, y);
      y += 15;

      const saved = localStorage.getItem('sweden_visas_checklists');
      if (saved) {
        try {
            const checkedItems = JSON.parse(saved);
            doc.setFontSize(14);
            doc.text("Completed Requirements (Checklists):", 20, y);
            y += 10;

            doc.setFontSize(11);
            let hasChecklists = false;
            checklistsData.forEach(list => {
                const listItems = list.items.filter(item => checkedItems[item.id]);
                if (listItems.length > 0) {
                    hasChecklists = true;
                    if (y > 270) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.setFont("helvetica", "bold");
                    doc.text(list.title.en, 20, y);
                    doc.setFont("helvetica", "normal");
                    y += 8;

                    listItems.forEach(item => {
                        if (y > 280) {
                            doc.addPage();
                            y = 20;
                        }
                        const itemText = doc.splitTextToSize(`- [X] ${item.text.en}`, 160);
                        doc.text(itemText, 25, y);
                        y += (itemText.length * 6);
                    });
                    y += 5;
                }
            });
            if (!hasChecklists) {
               doc.text("No items checked yet.", 25, y);
            }
        } catch(e) {}
      }

      doc.save("Sweden_Migration_Assessment.pdf");
    };

    return (
      <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className={`p-8 rounded-3xl border-2 ${
          status === 'success' ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 
          status === 'warning' ? 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800' : 'bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-2xl bg-white dark:bg-slate-700 shadow-sm transition-colors ${status === 'success' ? 'text-green-600 dark:text-green-400' : status === 'warning' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
              {status === 'success' ? <CheckCircle size={32} /> : <AlertCircle size={32} />}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                {isAr ? 'النتيجة المبدئية' : lang === 'sv' ? 'Preliminärt resultat' : 'Initial Assessment'}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{label}</h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6 transition-colors">
            <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => onShowVisa(answers.family === 'yes' ? 'family' : answers.financial === 'job_offer' ? 'work' : 'study')}
              className="flex-1 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white px-6 py-4 rounded-2xl hover:bg-black dark:hover:bg-white transition-all font-bold flex items-center justify-center gap-2"
            >
              <Info size={18} />
              {isAr ? 'عرض أفضل تأشيرة ملائمة' : lang === 'sv' ? 'Visa bästa visum' : 'View Best Visa Option'}
            </button>
            <button 
              onClick={reset} 
              className="flex-1 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-slate-600 px-6 py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-600 transition-all font-bold flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} />
              {isAr ? 'إعادة الحساب' : lang === 'sv' ? 'Beräkna om' : 'Recalculate'}
            </button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => setShowTest(true)}
              className="w-full flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-6 py-4 rounded-2xl transition-all font-bold border border-blue-200 dark:border-blue-800/50 mb-3"
            >
              <BookOpen size={20} />
              {isAr ? 'تجربة اختبار الجنسية (أسئلة 2026)' : lang === 'sv' ? 'Prova medborgarskapstestet (2026 frågor)' : 'Try Citizenship Test (2026 Questions)'}
            </button>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-2xl transition-all font-bold text-sm"
              >
                {copied ? <Check size={18} className="text-green-600 dark:text-green-400" /> : <Copy size={18} />}
                {copied ? (isAr ? 'تم النسخ!' : lang === 'sv' ? 'Kopierad!' : 'Copied!') : (isAr ? 'نسخ' : lang === 'sv' ? 'Kopiera' : 'Copy')}
              </button>
              <button 
                onClick={handleExportPDF}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-2xl transition-all font-bold text-sm"
              >
                <Download size={18} />
                {isAr ? 'تصدير PDF' : lang === 'sv' ? 'Exportera PDF' : 'Export PDF'}
              </button>
              <button 
                onClick={handleEmail}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-2xl transition-all font-bold text-sm"
              >
                <Mail size={18} />
                {isAr ? 'ايميل' : lang === 'sv' ? 'E-post' : 'Email'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (showTest) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col justify-center relative overflow-hidden transition-colors min-h-[480px]">
        <CitizenshipTest lang={lang} onBack={() => setShowTest(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col justify-center relative overflow-hidden transition-colors min-h-[480px]">
      <div className={`absolute top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} p-8 opacity-5 dark:opacity-10 text-slate-900 dark:text-white`}>
        <Search size={120} />
      </div>
      {renderStep()}
    </div>
  );
};

export default Analyzer;
