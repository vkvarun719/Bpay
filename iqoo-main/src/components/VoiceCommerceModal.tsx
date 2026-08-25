import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, CheckCircle2, ArrowRight, Sparkles, X, ShoppingCart, Send, ShieldAlert, Award } from 'lucide-react';
import { Language, OndcProduct } from '../types';
import { parseFinancialSpeech, ParsedVoiceIntent } from '../utils/voiceRecognition';
import { soundEngine } from '../utils/audio';

interface VoiceCommerceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onExecuteSendMoney: (recipient: string, amount: number) => void;
  onExecuteBuyProduct: (productName: string) => void;
  onExecuteInvestGold: (amount: number) => void;
  allProducts: OndcProduct[];
}

export const VoiceCommerceModal: React.FC<VoiceCommerceModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onExecuteSendMoney,
  onExecuteBuyProduct,
  onExecuteInvestGold,
  allProducts: _allProducts
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [parsedResult, setParsedResult] = useState<ParsedVoiceIntent | null>(null);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const sampleVoicePhrases: { text: string; label: string; icon: string }[] = [
    { text: 'Rahul ko ₹200 bhejo UPI se', label: 'Send ₹200 to Rahul', icon: '💸' },
    { text: 'Mujhe 5kg Aashirvaad Atta chahiye', label: 'Buy 5kg Atta (ONDC)', icon: '🌾' },
    { text: 'Fortune Mustard Oil 1L order karo', label: 'Order Mustard Oil', icon: '🛢️' },
    { text: '₹500 ka 24K Digital Gold khareedo', label: 'Invest ₹500 in Gold', icon: '🪙' },
    { text: 'Mera loan application status aur credit score kya hai?', label: 'Check Credit & Loans', icon: '📊' },
    { text: 'Priya ko ₹1000 transfer karo', label: 'Send ₹1000 to Priya', icon: '👩🏻' },
  ];

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript('');
      setParsedResult(null);
      setFeedbackMessage('');
    }
  }, [isOpen]);

  const handleSimulatePhrase = (phrase: string) => {
    setTranscript(phrase);
    setIsListening(false);
    const parsed = parseFinancialSpeech(phrase, currentLang);
    setParsedResult(parsed);
    soundEngine.speakText(parsed.confirmationPrompt, currentLang);
  };

  const startListening = () => {
    if (typeof window === 'undefined') return;

    // Check Web Speech API
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      handleSimulatePhrase('₹200 bhejo Rahul ko');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      
      const langCodes: Record<Language, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        hinglish: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        kn: 'kn-IN',
        bn: 'bn-IN',
        mr: 'mr-IN',
        gu: 'gu-IN',
        pa: 'pa-IN',
        ml: 'ml-IN',
        or: 'or-IN'
      };

      recognition.lang = langCodes[currentLang] || 'hi-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('Listening... Speak now in your language...');
        setParsedResult(null);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
        if (event.results[current].isFinal) {
          const parsed = parseFinancialSpeech(text, currentLang);
          setParsedResult(parsed);
          soundEngine.speakText(parsed.confirmationPrompt, currentLang);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        // If microphone error or permission denied, fallback gracefully to preset
        handleSimulatePhrase('5kg Aashirvaad Atta chahiye');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      handleSimulatePhrase('₹200 bhejo Rahul ko');
    }
  };

  const handleConfirmAction = () => {
    if (!parsedResult) return;

    if (parsedResult.intent === 'SEND_MONEY') {
      const recipient = parsedResult.entities.recipient || 'Rahul Sharma';
      const amount = parsedResult.entities.amount || 200;
      onExecuteSendMoney(recipient, amount);
      setFeedbackMessage(`✅ Success! ₹${amount} sent to ${recipient} via NPCI UPI.`);
      soundEngine.playSuccessChime();
      setTimeout(() => {
        onClose();
      }, 1400);
    } else if (parsedResult.intent === 'BUY_PRODUCT') {
      const prodName = parsedResult.entities.productName || 'Aashirvaad Shudh Chakki Atta (5 kg)';
      onExecuteBuyProduct(prodName);
      setFeedbackMessage(`✅ ONDC Order placed! ${prodName} added from local Kirana store.`);
      soundEngine.playSuccessChime();
      setTimeout(() => {
        onClose();
      }, 1400);
    } else if (parsedResult.intent === 'INVEST_GOLD') {
      const amount = parsedResult.entities.amount || 500;
      onExecuteInvestGold(amount);
      setFeedbackMessage(`✅ Success! ₹${amount} 24K MMTC-PAMP Digital Gold credited to IDBI Vault.`);
      soundEngine.playSuccessChime();
      setTimeout(() => {
        onClose();
      }, 1400);
    } else {
      setFeedbackMessage(`✅ Command processed! Information updated in your dashboard.`);
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel-glow bg-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Glow ambient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>Bolo aur Kharido</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Voice AI 12+ Langs
                </span>
              </h2>
              <p className="text-xs text-slate-400">Zero typing required — Speak in Hindi, Tamil, Telugu, Hinglish, etc.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Mic & Audio Visualizer */}
        <div className="my-6 flex flex-col items-center justify-center text-center">
          <div className="relative flex items-center justify-center">
            {isListening && (
              <>
                <div className="absolute w-28 h-28 rounded-full bg-amber-500/20 animate-ping"></div>
                <div className="absolute w-24 h-24 rounded-full bg-orange-500/30 animate-pulse"></div>
              </>
            )}
            <button
              onClick={isListening ? () => setIsListening(false) : startListening}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-transform active:scale-95 ${
                isListening 
                  ? 'bg-gradient-to-tr from-red-500 to-orange-500 shadow-red-500/40' 
                  : 'bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-600 shadow-amber-500/40 hover:scale-105'
              }`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 animate-bounce" />
              ) : (
                <Mic className="w-8 h-8 text-slate-950" />
              )}
            </button>
          </div>

          {/* Soundwave bars */}
          {isListening ? (
            <div className="flex items-center gap-1.5 mt-4 h-8">
              <span className="w-1.5 bg-amber-400 rounded-full soundwave-bar"></span>
              <span className="w-1.5 bg-orange-400 rounded-full soundwave-bar"></span>
              <span className="w-1.5 bg-emerald-400 rounded-full soundwave-bar"></span>
              <span className="w-1.5 bg-amber-400 rounded-full soundwave-bar"></span>
              <span className="w-1.5 bg-orange-400 rounded-full soundwave-bar"></span>
            </div>
          ) : (
            <p className="text-xs text-amber-300/90 font-medium mt-4">
              Tap mic to speak or click any phrase below
            </p>
          )}

          {/* Live Transcript Display */}
          <div className="w-full mt-4 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm min-h-[56px] flex items-center justify-center text-center">
            {transcript ? (
              <p className="font-semibold text-slate-200 italic">
                "{transcript}"
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                Listening for commands like "Send ₹200 to Rahul" or "Buy 5kg Atta"...
              </p>
            )}
          </div>
        </div>

        {/* Parsed Intent & Confirmation Card */}
        {parsedResult && !feedbackMessage && (
          <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-amber-500/40 animate-slideUp">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                {parsedResult.intent === 'SEND_MONEY' && <Send className="w-5 h-5 text-amber-400" />}
                {parsedResult.intent === 'BUY_PRODUCT' && <ShoppingCart className="w-5 h-5 text-emerald-400" />}
                {parsedResult.intent === 'INVEST_GOLD' && <Award className="w-5 h-5 text-yellow-400" />}
                {parsedResult.intent === 'CHECK_LOAN' && <ShieldAlert className="w-5 h-5 text-blue-400" />}
                <span className="font-bold text-xs uppercase tracking-wider text-amber-400">
                  AI Intent Detected ({Math.round(parsedResult.confidence * 100)}% Confidence)
                </span>
              </div>
              <button 
                onClick={() => soundEngine.speakText(parsedResult.confirmationPrompt, currentLang)}
                className="p-1 text-slate-400 hover:text-amber-400 transition"
                title="Replay Voice Prompt"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm font-medium text-slate-200 mt-2">
              {parsedResult.confirmationPrompt}
            </p>

            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => setParsedResult(null)}
                className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20 transition active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Feedback Success Toast */}
        {feedbackMessage && (
          <div className="mb-4 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-sm font-semibold text-center animate-bounce">
            {feedbackMessage}
          </div>
        )}

        {/* Quick Sample Prompts Carousel / Chips */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Popular Voice Commands (1-Tap Demo)
            </span>
            <span className="text-[10px] text-amber-400">Bhashini NLU Ready</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleVoicePhrases.map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulatePhrase(phrase.text)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 text-left transition group"
              >
                <span className="text-base">{phrase.icon}</span>
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-slate-200 group-hover:text-amber-300 truncate">
                    "{phrase.text}"
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">{phrase.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
