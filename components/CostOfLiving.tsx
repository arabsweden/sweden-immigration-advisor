import React, { useState } from 'react';
import { translations } from '../translations';
import { MapPin, Home, Zap, Coffee, Bus, Activity, Ticket, Info } from 'lucide-react';

interface Props {
  lang: 'ar' | 'en' | 'sv';
}

const CostOfLiving: React.FC<Props> = ({ lang }) => {
  const isAr = lang === 'ar';
  
  const cities = [
    {
      id: 'stockholm',
      name: { ar: 'ستوكهولم', en: 'Stockholm', sv: 'Stockholm' },
      info: { ar: 'العاصمة والمدينة الأغلى.', en: 'Capital and most expensive.', sv: 'Huvudstad och dyrast.' },
      costs: { rent: '12,000 - 20,000', utilities: '1,500 - 2,500', food: '3,000 - 4,500', transport: '970', health: '200 - 400', leisure: '1,500 - 3,000' }
    },
    {
      id: 'gothenburg',
      name: { ar: 'غوتنبرغ', en: 'Gothenburg', sv: 'Göteborg' },
      info: { ar: 'مدينة صناعية كبرى، تكلفة أقل قليلاً من العاصمة.', en: 'Major industrial city, slightly cheaper.', sv: 'Stor industristad, något billigare.' },
      costs: { rent: '9,000 - 15,000', utilities: '1,200 - 2,000', food: '2,800 - 4,000', transport: '820', health: '200 - 400', leisure: '1,200 - 2,500' }
    },
    {
      id: 'malmo',
      name: { ar: 'مالمو', en: 'Malmö', sv: 'Malmö' },
      info: { ar: 'في الجنوب، متصلة بالدنمارك، تكلفة سكن معقولة.', en: 'In the south, connected to Denmark, reasonable housing.', sv: 'I söder, ansluten till Danmark, rimligt boende.' },
      costs: { rent: '8,000 - 13,000', utilities: '1,000 - 1,800', food: '2,500 - 3,500', transport: '600', health: '200 - 400', leisure: '1,000 - 2,000' }
    },
    {
      id: 'uppsala',
      name: { ar: 'أوبسالا', en: 'Uppsala', sv: 'Uppsala' },
      info: { ar: 'مدينة طلابية، إيجار السكن الطلابي أقل بكثير.', en: 'Student city, student housing is much cheaper.', sv: 'Studentstad, studentbostäder mycket billigare.' },
      costs: { rent: '6,000 - 12,000', utilities: '1,000 - 1,500', food: '2,500 - 3,500', transport: '950', health: '200 - 300', leisure: '800 - 1,500' }
    }
  ];

  const categories = [
    { key: 'rent', icon: Home, label: { ar: 'الإيجار (شقة غرفة/غرفتين)', en: 'Rent (1/2 Bed)', sv: 'Hyra (1/2 rum)' } },
    { key: 'utilities', icon: Zap, label: { ar: 'الخدمات (كهرباء، ماء، إنترنت)', en: 'Utilities (Elec, Water, Net)', sv: 'Tjänster (El, Vatten, Nät)' } },
    { key: 'food', icon: Coffee, label: { ar: 'الطعام والمقاضي', en: 'Groceries', sv: 'Matvaror' } },
    { key: 'transport', icon: Bus, label: { ar: 'المواصلات (بطاقة شهرية)', en: 'Transport (Monthly pass)', sv: 'Transport (Månadskort)' } },
    { key: 'health', icon: Activity, label: { ar: 'الرعاية الصحية (زيارة طبيب)', en: 'Healthcare (Doctor visit)', sv: 'Sjukvård (Lälkarbesök)' } },
    { key: 'leisure', icon: Ticket, label: { ar: 'الأنشطة الترفيهية', en: 'Leisure', sv: 'Fritid' } }
  ];

  const [selectedCity, setSelectedCity] = useState(cities[0]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          {isAr ? 'تكاليف المعيشة في السويد' : lang === 'sv' ? 'Levnadskostnader i Sverige' : 'Cost of Living in Sweden'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {isAr ? 'تقدير شهري للتكاليف بالكرونة السويدية (SEK).' : lang === 'sv' ? 'Månatlig uppskattning i Svenska Kronor (SEK).' : 'Monthly estimate in Swedish Krona (SEK).'}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {cities.map(city => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-sm ${
                selectedCity.id === city.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <MapPin size={16} />
              {city.name[lang as 'ar' | 'en' | 'sv']}
            </button>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-xl mb-6 flex items-start gap-3">
          <Info size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm">
            <span className="font-bold">{selectedCity.name[lang as 'ar' | 'en' | 'sv']}: </span>
            {selectedCity.info[lang as 'ar' | 'en' | 'sv']}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center p-4 bg-slate-50 dark:bg-slate-700/30 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <div className="bg-white dark:bg-slate-700 p-3 rounded-xl shadow-sm mr-4 ml-4 text-blue-600 dark:text-blue-400">
                <cat.icon size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">
                  {cat.label[lang as 'ar' | 'en' | 'sv']}
                </p>
                <p className="text-lg font-bold text-slate-800 dark:text-white">
                  {selectedCity.costs[cat.key as keyof typeof selectedCity.costs]} <span className="text-sm font-normal text-slate-400">SEK</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CostOfLiving;
