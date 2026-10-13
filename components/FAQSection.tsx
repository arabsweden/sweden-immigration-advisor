import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface Props {
  lang: 'ar' | 'en' | 'sv';
}

export const faqData = [
    {
      id: 'q1',
      category: 'work',
      q: {
        ar: 'ما هي متطلبات تصريح العمل في السويد لعام 2026؟',
        en: 'What are the work permit requirements in Sweden for 2026?',
        sv: 'Vad är kraven för arbetstillstånd i Sverige för 2026?'
      },
      a: {
        ar: 'يجب أن يكون لديك عرض عمل حقيقي من صاحب عمل سويدي، وأن يكون الراتب على الأقل 33,390 كرون سويدي شهرياً، مع توفر تأمينات طبية وتأمينات على الحياة.',
        en: 'You must have a genuine job offer from a Swedish employer, with a salary of at least 33,390 SEK per month, along with medical and life insurance.',
        sv: 'Du måste ha ett verkligt jobberbjudande från en svensk arbetsgivare, med en lön på minst 33 390 SEK per månad, samt sjuk- och livförsäkring.'
      }
    },
    {
      id: 'q2',
      category: 'study',
      q: {
        ar: 'كيف أتقدم بطلب للحصول على تصريح إقامة للدراسة؟',
        en: 'How do I apply for a residence permit for studies?',
        sv: 'Hur ansöker jag om uppehållstillstånd för studier?'
      },
      a: {
        ar: 'يجب أن يتم قبولك في برنامج دراسي بدوام كامل، وأن تدفع القسط الأول من الرسوم الجامعية، وتثبت امتلاكك لـ 9,450 كرون سويدي شهرياً طوال فترة الدراسة.',
        en: 'You must be admitted to a full-time study program, pay the first installment of tuition fees, and prove you have 9,450 SEK per month for the duration of the studies.',
        sv: 'Du måste vara antagen till ett heltidsstudieprogram, betala den första delen av studieavgiften och bevisa att du har 9 450 SEK per månad under studietiden.'
      }
    },
    {
      id: 'q3',
      category: 'family',
      q: {
        ar: 'ما هي شروط لم شمل الأسرة؟',
        en: 'What are the conditions for family reunification?',
        sv: 'Vad är villkoren för familjeåterförening?'
      },
      a: {
        ar: 'يجب أن يكون القريب في السويد قادراً على إعالة نفسه وإعالتك. يجب أن يمتلك سكناً بحجم مناسب وأن يحصل على دخل كافٍ لتغطية التكاليف (يحدد بعد خصم الإيجار).',
        en: 'The relative in Sweden must be able to support themselves and you. They must have housing of adequate size and sufficient income to cover costs (determined after deducting rent).',
        sv: 'Släktingen i Sverige måste kunna försörja sig själv och dig. De måste ha en bostad av lämplig storlek och tillräcklig inkomst för att täcka kostnaderna (bestäms efter avdrag för hyra).'
      }
    },
    {
      id: 'q4',
      category: 'visas',
      q: {
        ar: 'ما الفرق بين تأشيرة شنغن وتصريح الإقامة؟',
        en: 'What is the difference between a Schengen visa and a residence permit?',
        sv: 'Vad är skillnaden mellan ett Schengenvisum och ett uppehållstillstånd?'
      },
      a: {
        ar: 'تأشيرة شنغن مخصصة للزيارات القصيرة (حتى 90 يوماً). أما تصريح الإقامة فهو للبقاء في السويد لمدة تزيد عن 90 يوماً للعمل، أو الدراسة، أو العيش مع العائلة.',
        en: 'A Schengen visa is for short visits (up to 90 days). A residence permit is for staying in Sweden for more than 90 days to work, study, or live with family.',
        sv: 'Ett Schengenvisum är för korta besök (upp till 90 dagar). Ett uppehållstillstånd är för att stanna i Sverige i mer än 90 dagar för att arbeta, studera eller bo med familjen.'
      }
    },
    {
      id: 'q5',
      category: 'residence',
      q: {
        ar: 'هل يمكنني الحصول على إقامة دائمة (PUT/PR) مباشرة؟',
        en: 'Can I get a permanent residence permit (PUT/PR) directly?',
        sv: 'Kan jag få ett permanent uppehållstillstånd (PUT/PR) direkt?'
      },
      a: {
        ar: 'في معظم الحالات لا، ستبدأ بتصريح إقامة مؤقتة. بعد 3 أو 4 سنوات، يمكنك التقدم للحصول على الإقامة الدائمة إذا استوفيت شروط الإعالة والمعرفة اللغوية.',
        en: 'In most cases, no. You will start with a temporary permit. After 3 or 4 years, you can apply for permanent residence if you meet maintenance and language requirements.',
        sv: 'I de flesta fall nej, du börjar med ett tillfälligt tillstånd. Efter 3 eller 4 år kan du ansöka om permanent uppehållstillstånd om du uppfyller försörjnings- och språkkrav.'
      }
    }
  ];

const FAQSection: React.FC<Props> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-3 mb-8">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
          {isAr ? 'الأسئلة الشائعة' : lang === 'sv' ? 'Vanliga frågor' : 'Frequently Asked Questions'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          {isAr 
            ? 'إجابات على أكثر الأسئلة شيوعاً حول تصاريح العمل والدراسة ولم الشمل.'
            : lang === 'sv' 
              ? 'Svar på de vanligaste frågorna om arbets- och studietillstånd.'
              : 'Answers to the most common questions about work, study, and family permits.'}
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq) => (
          <div 
            key={faq.id} 
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden transition-all shadow-sm hover:shadow-md"
          >
            <button
              onClick={() => toggleAccordion(faq.id)}
              className="w-full text-start p-5 flex items-center justify-between focus:outline-none"
            >
              <h3 className="font-bold text-slate-800 dark:text-slate-200 pr-4">
                {faq.q[lang as 'ar' | 'en' | 'sv']}
              </h3>
              <div className={`p-2 rounded-full transition-transform ${openId === faq.id ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 rotate-180' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`}>
                <ChevronDown size={18} />
              </div>
            </button>
            
            {openId === faq.id && (
              <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 mt-2 bg-slate-50/50 dark:bg-slate-800/50">
                {faq.a[lang as 'ar' | 'en' | 'sv']}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
