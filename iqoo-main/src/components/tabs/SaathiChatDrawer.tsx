import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  Volume2, 
  TrendingUp, 
  ShieldCheck, 
  CreditCard, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { UserPersona, Language } from '../../types';
import { soundEngine } from '../../utils/audio';

interface SaathiChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  persona: UserPersona;
  currentLang: Language;
}

export const SaathiChatDrawer: React.FC<SaathiChatDrawerProps> = ({
  isOpen,
  onClose,
  persona,
  currentLang
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'saathi'; text: string; time: string }>>([
    {
      sender: 'saathi',
      text: currentLang === 'en'
        ? `Hello ${persona.name}! 👋 I am your AI Financial Advisor. Ask me anything about your expenses, loan eligibility, investments, or chit funds.`
        : `Namaste ${persona.name}! 🙏 Main aapka AI Financial Saathi hoon. Aapke kharche, loan eligibility, ya chit funds ke baare me kuch bhi poochhein.`,
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');

  const quickQuestions = [
    { label: '💡 Save ₹500 on EMI?', query: 'How can I save ₹500/month on my loan EMI?' },
    { label: '📊 Check my Loan Limit', query: 'What is my maximum pre-approved loan limit?' },
    { label: '🪙 Best Investment today', query: 'Suggest the safest investment for ₹500 monthly SIP.' },
    { label: '🛡️ Check if link is safe', query: 'How does AI Fraud Shield protect against vishing?' },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMessage = { sender: 'user' as const, text, time: 'Just now' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Generate smart context-aware AI response based on Persona
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('emi') || lower.includes('save') || lower.includes('kharch')) {
        reply = `Based on your UPI expense analysis: By prepaying ₹2,000 on your active loan and shifting Kirana procurement to ONDC direct farmers, you save ₹500/month on interest & markups!`;
      } else if (lower.includes('loan') || lower.includes('limit') || lower.includes('credit')) {
        reply = `Your Bharat Credit Score is ${persona.creditScore} (Alternative ML Tier 1). You have a pre-approved collateral-free limit of ₹${persona.creditLimit.toLocaleString('en-IN')} with instant 30-sec bank disbursal!`;
      } else if (lower.includes('invest') || lower.includes('gold') || lower.includes('sip')) {
        reply = `Recommended Basket for ${persona.name}: Start a ₹500/mo SIP in 24K Digital Gold (MMTC-PAMP) + Nippon Nifty 50 Direct Index Plan for zero commission & 18.4% 3Y CAGR!`;
      } else {
        reply = currentLang === 'en'
          ? `Got it! BharatPay AI Financial Advisor keeps your data 100% encrypted. I can assist you with instant credit disbursal, ONDC mandi orders, or Chit Funds 2.0.`
          : `Aapka question samajh aa gaya. BharatPay AI Saathi aapke data ko 100% encrypted rakhta hai. Main aapko lending, ONDC shopping, ya chit funds me madad kar sakta hoon.`;
      }

      const saathiMessage = { sender: 'saathi' as const, text: reply, time: 'Just now' };
      setMessages(prev => [...prev, saathiMessage]);
      soundEngine.playSuccessChime();
      soundEngine.speakText(reply, currentLang);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-950 border-l border-indigo-500/40 shadow-2xl flex flex-col h-full">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <span>AI Financial Saathi</span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  jAI Smart Engine
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Personalized advisor for {persona.name}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div 
              key={i}
              className={`flex items-start gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'saathi' && (
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-0.5">
                  🤖
                </div>
              )}
              <div className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                <p>{m.text}</p>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="text-[9px] opacity-60 font-mono">{m.time}</span>
                  {m.sender === 'saathi' && (
                    <button
                      onClick={() => soundEngine.speakText(m.text, currentLang)}
                      className="text-slate-400 hover:text-indigo-300 p-0.5"
                      title="Speak Message"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Question Chips */}
        <div className="p-2.5 border-t border-slate-800/80 bg-slate-900/50">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.query)}
                className="px-2.5 py-1 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 text-[11px] text-indigo-300 font-medium whitespace-nowrap transition"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything in your language..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md active:scale-95 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
