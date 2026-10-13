
import React from 'react';
import { Briefcase, GraduationCap, Heart, Shield, Landmark, BarChart as BarChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const statsData = [
  { name: 'العمل', count: 45200, color: '#2563eb' },
  { name: 'الدراسة', count: 18500, color: '#10b981' },
  { name: 'لم الشمل', count: 26100, color: '#f43f5e' },
  { name: 'اللجوء', count: 11400, color: '#f59e0b' },
  { name: 'الحر', count: 2800, color: '#6366f1' },
];

const Overview: React.FC = () => {
  return (
    <div className="space-y-12 md:space-y-16 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-6">
        <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
          اكتشف مستقبلك في السويد
        </h2>
        <p className="text-xl md:text-3xl text-slate-800 dark:text-slate-200 max-w-4xl mx-auto px-4 leading-relaxed font-bold">
          نقدم لك الدليل القانوني الأحدث والأكثر تفصيلاً لعام 2026، لتفهم حقوقك ومسارك نحو الاستقرار والجنسية.
        </p>
      </div>

      {/* Main Stats/Highlight - Fokusområden */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <HighlightCard 
          icon={<Landmark size={40} />} 
          title="الجنسية السويدية" 
          desc="تتطلب الآن إقامة لمدة 8 سنوات متواصلة مع ضرورة إثبات المعرفة باللغة والمجتمع، والرسوم الجديدة هي 2,900 كرون."
          bgColor="bg-blue-100 dark:bg-blue-900/40"
          textColor="text-blue-700 dark:text-blue-300"
        />
        <HighlightCard 
          icon={<Briefcase size={40} />} 
          title="إقامة العمل" 
          desc="الحد الأدنى للراتب المطلوب للإقامة الدائمة ارتفع إلى 33,390 كرون شهرياً، مع تشديد الرقابة على التأمينات المهنية."
          bgColor="bg-emerald-100 dark:bg-emerald-900/40"
          textColor="text-emerald-700 dark:text-emerald-300"
        />
        <HighlightCard 
          icon={<Shield size={40} />} 
          title="اللجوء والحماية" 
          desc="السياسة الحالية تركز على الإقامات المؤقتة لمدة 3 سنوات فقط، مع برامج دعم مالي كبرى لمن يختار العودة الطوعية."
          bgColor="bg-rose-100 dark:bg-rose-900/40"
          textColor="text-rose-700 dark:text-rose-300"
        />
      </div>

      {/* Statistics Section */}
      <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 md:p-14 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="space-y-3">
            <h3 className="text-3xl md:text-4xl font-black flex items-center gap-4 text-slate-900 dark:text-white">
              <BarChartIcon className="text-blue-600 dark:text-blue-400" size={40} />
              أرقام الهجرة لعام 2025
            </h3>
            <p className="text-slate-800 dark:text-slate-300 text-xl font-medium">توزيع التصاريح الممنوحة يوضح توجه السويد نحو العمالة الماهرة.</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 px-8 py-6 rounded-[2rem] border border-blue-100 dark:border-blue-800 w-fit">
            <span className="text-xs font-black text-blue-400 dark:text-blue-500 uppercase block mb-1 tracking-widest">الإجمالي التقريبي</span>
            <span className="text-4xl font-black text-blue-800 dark:text-blue-200 tracking-tighter">104,000+</span>
          </div>
        </div>
        
        <div className="h-[350px] md:h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={statsData}
              margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:opacity-10" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'currentColor', fontSize: 18, fontWeight: 800 }}
                className="text-slate-900 dark:text-slate-100"
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 14 }}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc', opacity: 0.05 }}
                contentStyle={{ 
                  borderRadius: '24px', 
                  border: 'none', 
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  padding: '16px',
                  backgroundColor: 'var(--tw-prose-invert)' 
                }}
              />
              <Bar 
                dataKey="count" 
                radius={[12, 12, 0, 0]} 
                barSize={60}
              >
                {statsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pathways Section */}
      <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-10 md:p-16 border border-slate-200 dark:border-slate-700 shadow-lg transition-colors">
        <h3 className="text-4xl md:text-5xl font-black mb-16 text-center text-slate-900 dark:text-white">مسارات الإقامة المتاحة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <PathwayItem 
            icon={<Briefcase size={36} />} 
            title="إقامة العمل والتوظيف" 
            desc="هذا المسار مخصص للمهنيين الحاصلين على عرض عمل. يتطلب العمل لمدة 4 سنوات قبل التأهل للإقامة الدائمة، مع استيفاء سقف الرواتب الجديد." 
          />
          <PathwayItem 
            icon={<Heart size={36} />} 
            title="لم الشمل العائلي" 
            desc="للانضمام إلى شريك الحياة أو الوالدين. تشترط القوانين الجديدة وجود سكن بمساحة كافية ودخل يغطي تكاليف إعالة جميع أفراد الأسرة." 
          />
          <PathwayItem 
            icon={<GraduationCap size={36} />} 
            title="الدراسة والبحث العلمي" 
            desc="للطلاب المقبولين في الجامعات السويدية. يمنحك هذا التصريح حق العمل، وإمكانية تمديد الإقامة للبحث عن عمل بعد إنهاء دراستك." 
          />
          <PathwayItem 
            icon={<Shield size={36} />} 
            title="الحماية الإنسانية واللجوء" 
            desc="تقدم السويد حماية مؤقتة للأشخاص المعرضين للخطر. يتم الآن التدقيق بشكل أكبر في أسباب الحماية مع خيارات للعودة المدعومة مالياً." 
          />
        </div>
      </div>
    </div>
  );
};

const HighlightCard = ({ icon, title, desc, bgColor, textColor }: any) => (
  <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border-2 border-slate-100 dark:border-slate-700 flex flex-col gap-6 transition-all hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-2">
    <div className={`shrink-0 w-20 h-20 ${bgColor} ${textColor} rounded-3xl flex items-center justify-center shadow-inner`}>
      {icon}
    </div>
    <div className="space-y-4">
      <h3 className="text-3xl font-black text-slate-900 dark:text-white">{title}</h3>
      <p className="text-slate-900 dark:text-slate-200 text-xl md:text-2xl leading-relaxed font-bold opacity-90">{desc}</p>
    </div>
  </div>
);

const PathwayItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex items-start gap-8 p-8 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-[2.5rem] border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all group">
    <div className="shrink-0 mt-1 text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 p-6 rounded-3xl group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-all shadow-md group-hover:scale-110">
      {icon}
    </div>
    <div className="space-y-3">
      <h4 className="font-black text-3xl text-slate-900 dark:text-white">{title}</h4>
      <p className="text-slate-900 dark:text-slate-300 text-xl md:text-2xl leading-relaxed font-bold opacity-80">{desc}</p>
    </div>
  </div>
);

export default Overview;
