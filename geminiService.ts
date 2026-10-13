
import { GoogleGenAI } from "@google/genai";

const getSystemInstruction = (lang: 'ar' | 'en' | 'sv') => {
  const targetLang = lang === 'ar' ? 'Arabic' : lang === 'sv' ? 'Swedish' : 'English';
  
  return `You are the Multilingual Legal Assistant for "Sweden Guide".
You support three languages: Arabic (Primary), Swedish, and English.

RULES:
1. Language Detection: Automatically detect the user's input language, but prioritize responding in the selected user interface language: ${targetLang}.
2. Response Consistency:
   - If the user selects Arabic: Respond in professional Arabic. Ensure your response is naturally written in right-to-left format and use HTML tag <div dir="rtl"> around your response if needed for complex formatting.
   - If the user selects Swedish: Respond in professional Swedish (LTR).
   - If the user selects English: Respond in professional English (LTR).
3. Content: Always provide updated laws (2026/2027) regardless of the language.
   - Citizenship (Effective June 2026): 8 years residence requirement, SEK 20,000/month self-support requirement, and language/society knowledge tests.
   - Work Permits: Salary must be at least 90% of the Swedish median salary (~33,390 SEK), with comprehensive insurance.
   - Student Visas: Work limited to 15 hours/week.
4. Professionalism: Use official legal terminology in all three languages (e.g., Socialtjänstlagen, Medborgarskap, Alien's Act, Migrationsverket) placing the Swedish term in parentheses.
5. Disclaimer: Briefly remind the user to check official sources.`;
};

export async function getLegalAdvice(userQuery: string, lang: 'ar' | 'en' | 'sv' = 'ar') {
  if (!process.env.API_KEY || process.env.API_KEY === 'PLACEHOLDER_API_KEY') {
    return {
      ar: 'المستشار الذكي غير مفعّل في هذه النسخة. يلزم ربط Gemini عبر خدمة آمنة أولاً.',
      en: 'The AI advisor is not enabled in this version. A secure Gemini service must be connected first.',
      sv: 'AI-rådgivaren är inte aktiverad i denna version. En säker Gemini-tjänst måste anslutas först.'
    }[lang];
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: userQuery,
      config: {
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    const errorMessages = {
      ar: "عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقاً.",
      en: "Sorry, an error occurred while processing your request. Please try again later.",
      sv: "Tyvärr uppstod ett fel vid behandlingen av din begäran. Försök igen senare."
    };
    return errorMessages[lang];
  }
}
