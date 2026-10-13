
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Info } from 'lucide-react';
import { getLegalAdvice } from '../geminiService';
import Markdown from 'react-markdown';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface Props {
  initialQuery?: string | null;
  onClearQuery?: () => void;
  lang: 'ar' | 'en' | 'sv';
}

const LegalChat: React.FC<Props> = ({ initialQuery, onClearQuery, lang }) => {
  const getInitialMessage = () => {
    if (lang === 'ar') return 'مرحباً بك! أنا مستشارك القانوني الذكي. يمكنني إجابتك على أي استفسار بخصوص الهجرة إلى السويد وقوانين عام 2026. كيف يمكنني مساعدتك اليوم؟';
    if (lang === 'sv') return 'Välkommen! Jag är din smarta juridiska rådgivare. Jag kan svara på frågor om migration till Sverige och lagarna för 2026. Hur kan jag hjälpa dig idag?';
    return 'Welcome! I am your smart legal advisor. I can answer any inquiry regarding migration to Sweden and the 2026 laws. How can I help you today?';
  };

  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: getInitialMessage() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const performSend = async (query: string) => {
    if (!query.trim() || loading) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setLoading(true);

    const advice = await getLegalAdvice(query, lang);
    
    setMessages(prev => [...prev, { role: 'bot', text: advice }]);
    setLoading(false);
  };

  useEffect(() => {
    if (initialQuery) {
      performSend(initialQuery);
      if (onClearQuery) onClearQuery();
    }
  }, [initialQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = () => {
    const query = input;
    setInput('');
    performSend(query);
  };

  const getPlaceholder = () => {
    if (lang === 'ar') return "اسأل عن أي تفاصيل قانونية (مثلاً: شروط إقامة العمل أو رسوم الجنسية)...";
    if (lang === 'sv') return "Fråga om juridiska detaljer (t.ex. arbetstillstånd eller medborgarskapsavgifter)...";
    return "Ask about any legal details (e.g., work permit conditions or citizenship fees)...";
  };

  const getThinkingText = () => {
    if (lang === 'ar') return "جاري التفكير قانونياً...";
    if (lang === 'sv') return "Tänker juridiskt...";
    return "Thinking legally...";
  };

  const getDisclaimer = () => {
    if (lang === 'ar') return "* ملاحظة: الإجابات آلية بناءً على البيانات المتوفرة، يرجى استشارة محامٍ في القضايا المعقدة.";
    if (lang === 'sv') return "* Obs: Svaren är automatiserade baserat på tillgänglig data, vänligen rådgör med en advokat i komplexa ärenden.";
    return "* Note: Answers are automated based on available data, please consult a lawyer for complex cases.";
  };

  return (
    <div className="max-w-4xl mx-auto h-[700px] flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Chat Header */}
      <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">{lang === 'ar' ? 'المستشار القانوني (Gemini AI)' : lang === 'sv' ? 'Juridisk rådgivare (Gemini AI)' : 'Legal Advisor (Gemini AI)'}</h3>
            <p className="text-blue-100 text-xs">{lang === 'ar' ? 'خبير في تحديثات قوانين السويد 2026' : lang === 'sv' ? 'Expert på Sveriges laguppdateringar 2026' : 'Expert in Sweden\'s 2026 legal updates'}</p>
          </div>
        </div>
        <div className="bg-blue-500/50 p-2 rounded-lg cursor-help">
          <Info size={18} />
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-slate-100 text-slate-500' : 'bg-blue-600 text-white'
              }`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div 
                className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' ? 'bg-slate-100 text-slate-800' : 'bg-blue-50 text-slate-800 border border-blue-100'
                }`}
              >
                {msg.role === 'bot' ? (
                  <div className="markdown-body">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex flex-row gap-3 max-w-[85%] items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Bot size={20} />
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-2">
                <Loader2 className="animate-spin text-blue-600" size={18} />
                <span className="text-slate-500 text-xs">{getThinkingText()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-50 border-t">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={getPlaceholder()}
            className={`w-full bg-white border border-slate-200 rounded-2xl p-4 ${lang === 'ar' ? 'pr-4 pl-14' : 'pl-4 pr-14'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm`}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className={`absolute ${lang === 'ar' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 disabled:bg-slate-300 transition-colors`}
          >
            <Send size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3 italic">
          {getDisclaimer()}
        </p>
      </div>
    </div>
  );
};

export default LegalChat;
