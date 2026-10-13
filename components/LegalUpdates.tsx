
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Clock, Wallet, ShieldAlert, Calendar, History, ArrowRightCircle } from 'lucide-react';

interface Props {
  lang?: 'ar' | 'en' | 'sv';
}

export const getTimelineChanges = (lang: 'ar' | 'en' | 'sv') => {
  return [
    {
      date: lang === 'ar' ? '1 أبريل 2025' : lang === 'sv' ? '1 april 2025' : 'April 1, 2025',
      title: lang === 'ar' ? 'إيقاف تغيير المسار (Spårbyte)' : lang === 'sv' ? 'Spårbyte stoppas' : 'Spårbyte discontinued',
      summary: lang === 'ar' 
        ? 'تم إلغاء إمكانية تحويل طلب اللجوء المرفوض إلى تصريح عمل من داخل السويد. يجب الآن مغادرة البلاد والتقديم من الخارج.'
        : lang === 'sv'
        ? 'Möjligheten att byta från asylsökande till arbetstillstånd i Sverige avskaffas. Du måste ansöka från hemlandet.'
        : 'The possibility to change from asylum seeker to work permit from within Sweden is abolished. You must apply from abroad.',
      type: 'critical'
    },
    {
      date: lang === 'ar' ? 'أكتوبر 2025' : lang === 'sv' ? 'Oktober 2025' : 'October 2025',
      title: lang === 'ar' ? 'تحديث متطلبات السكن' : lang === 'sv' ? 'Uppdaterade boendekrav' : 'Updated housing requirements',
      summary: lang === 'ar'
        ? 'تشديد الرقابة على شروط المساحة الكافية في لم الشمل؛ حيث يتم التدقيق في عقود الإيجار والتأكد من عدم وجود "سكن من الباطن" غير مرخص.'
        : lang === 'sv'
        ? 'Hårdare kontroller av boendekraven för familjeåterförening; hyreskontrakt granskas noggrant.'
        : 'Stricter controls on housing requirements for family reunification; rental contracts are carefully scrutinized.',
      type: 'info'
    },
    {
      date: lang === 'ar' ? '1 يناير 2026' : lang === 'sv' ? '1 januari 2026' : 'January 1, 2026',
      title: lang === 'ar' ? 'رفع سقف الأجور الماهرة' : lang === 'sv' ? 'Höjt inkomstkrav' : 'Increased income requirement',
      summary: lang === 'ar'
        ? 'رفع الحد الأدنى للراتب المطلوب للإقامة الدائمة إلى 33,390 كرون سويدي (ما يعادل 90% من متوسط الأجور الوطني).'
        : lang === 'sv'
        ? 'Lönekravet för permanent uppehållstillstånd höjs till 33 390 SEK (90 % av medianlönen).'
        : 'The salary requirement for permanent residence is raised to 33,390 SEK (90% of the median wage).',
      type: 'critical'
    },
    {
      date: lang === 'ar' ? 'مارس 2026' : lang === 'sv' ? 'Mars 2026' : 'March 2026',
      title: lang === 'ar' ? 'تمديد فترة انتظار الجنسية' : lang === 'sv' ? 'Förlängd tid för medborgarskap' : 'Extended wait for citizenship',
      summary: lang === 'ar'
        ? 'اعتماد القانون الجديد الذي يرفع مدة الإقامة المطلوبة للحصول على الجنسية السويدية من 5 سنوات إلى 8 سنوات لمعظم المهاجرين.'
        : lang === 'sv'
        ? 'Ny lag som höjer kravet på vistelsetid för svenskt medborgarskap från 5 till 8 år för de flesta invandrare.'
        : 'New law raising the residence time requirement for Swedish citizenship from 5 to 8 years for most immigrants.',
      type: 'critical'
    },
    {
      date: lang === 'ar' ? 'يونيو 2026' : lang === 'sv' ? 'Juni 2026' : 'June 2026',
      title: lang === 'ar' ? 'اختبارات اللغة والثقافة' : lang === 'sv' ? 'Språk- och samhällstester' : 'Language and civics tests',
      summary: lang === 'ar'
        ? 'دخول متطلبات إثبات معرفة اللغة السويدية (مستوى A2/B1) واختبار المعرفة المجتمعية حيز التنفيذ لطلبات الإقامة الدائمة.'
        : lang === 'sv'
        ? 'Krav på bevisad kunskap i svenska språket (nivå A2/B1) och samhällskunskap träder i kraft för permanent uppehållstillstånd.'
        : 'Requirements for proven knowledge of the Swedish language (level A2/B1) and civics come into force for permanent residence permits.',
      type: 'info'
    },
    {
      date: lang === 'ar' ? 'أغسطس 2026' : lang === 'sv' ? 'Augusti 2026' : 'August 2026',
      title: lang === 'ar' ? 'برنامج العودة الطوعية المطوّر' : lang === 'sv' ? 'Utvecklat program för frivillig återvandring' : 'Expanded voluntary return program',
      summary: lang === 'ar'
        ? 'تفعيل الحزمة المالية الكبرى (حتى 350,000 كرون) للأفراد الذين يقررون العودة طوعياً إلى بلدانهم الأصلية وإلغاء إقامتهم السويدية.'
        : lang === 'sv'
        ? 'Aktivering av det stora ekonomiska paketet (upp till 350 000 SEK) för personer som frivilligt återvänder till sina hemländer.'
        : 'Activation of the major financial package (up to 350,000 SEK) for individuals who voluntarily return to their home countries.',
      type: 'info'
    }
  ];
};

const LegalUpdates: React.FC<Props> = ({ lang = 'ar' }) => {
  const isAr = lang === 'ar';
  const timelineChanges = getTimelineChanges(lang);

  const dataSalary = [
    { name: isAr ? 'الحد الأدنى للراتب' : lang === 'sv' ? 'Minimilön' : 'Minimum Salary', 'قبل 2026': 29680, 'من 2026': 33390 },
  ];

  const dataYears = [
    { name: isAr ? 'سنوات الإقامة للجنسية' : lang === 'sv' ? 'År för medborgarskap' : 'Years for Citizenship', 'قبل 2026': 5, 'من 2026': 8 },
  ];

  return (
    <div className="space-y-10">
      {/* Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
        <AlertTriangle className="text-amber-600 shrink-0" size={28} />
        <div>
          <h3 className="text-xl font-bold text-amber-800 mb-1">تنبيه قانوني هام</h3>
          <p className="text-amber-700">
            شهدت قوانين الهجرة السويدية في 2025 و2026 تشديداً كبيراً بهدف جذب العمالة الماهرة فقط وتقليل الهجرة القائمة على اللجوء.
          </p>
        </div>
      </div>

      {/* Comparison Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="flex items-center gap-2 font-bold mb-6 text-lg">
            <Clock className="text-blue-600" size={20} />
            مدة الإقامة المطلوبة للجنسية (بالسنوات)
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataYears}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="قبل 2026" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="من 2026" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="flex items-center gap-2 font-bold mb-6 text-lg">
            <Wallet className="text-green-600" size={20} />
            الحد الأدنى للراتب للإقامة الدائمة (كرون)
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataSalary}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="قبل 2026" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="من 2026" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* NEW: Timeline Section */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <History className="text-blue-600" size={28} />
            سجل التغييرات القانونية (2025 - 2026)
          </h3>
          <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-medium">جدول زمني تفصيلي</span>
        </div>
        
        <div className="space-y-0 relative before:absolute before:right-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
          {timelineChanges.map((change, idx) => (
            <div key={idx} className="relative pr-12 pb-10 last:pb-0 group">
              {/* Dot */}
              <div className={`absolute right-0 top-1.5 w-9 h-9 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-colors ${
                change.type === 'critical' ? 'bg-red-500' : 'bg-blue-500'
              }`}>
                <Calendar size={16} className="text-white" />
              </div>
              
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 group-hover:border-blue-200 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="font-extrabold text-slate-900 text-lg">{change.title}</h4>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase ${
                    change.type === 'critical' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {change.date}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {change.summary}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-blue-600 font-bold cursor-pointer hover:gap-3 transition-all">
                  <span>اقرأ المزيد في مصلحة الهجرة</span>
                  <ArrowRightCircle size={14} className="rotate-180" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Changes Cards */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ShieldAlert className="text-red-500" size={24} />
          نقاط جوهرية إضافية
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <UpdateCard 
            title="الجنسية والولاء" 
            desc="هناك نقاشات جارية حول فرض 'قسم الولاء' للسويد كجزء من مراسم الحصول على الجنسية." 
          />
          <UpdateCard 
            title="الإقامة الدائمة" 
            desc="تزايد صعوبة الحصول على الدائمة، حيث أصبحت المؤقتة هي القاعدة والاستثناء هو الدائم." 
          />
          <UpdateCard 
            title="التأمين الصحي" 
            desc="إلزام أصحاب العمل بتقديم حزم تأمين صحي شاملة تتجاوز المعايير السابقة لتخفيف الضغط على القطاع العام." 
          />
          <UpdateCard 
            title="التفتيش والتدقيق" 
            desc="زيادة صلاحيات مصلحة الهجرة في تفتيش أماكن العمل للتأكد من مطابقة الرواتب والظروف الفعلية لما تم التصريح به." 
          />
        </div>
      </div>
    </div>
  );
};

const UpdateCard = ({ title, desc }: { title: string, desc: string }) => (
  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors cursor-default">
    <h4 className="font-bold text-blue-700 mb-2">{title}</h4>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default LegalUpdates;
