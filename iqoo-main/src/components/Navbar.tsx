import React from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Smartphone, 
  PhoneCall, 
  Store, 
  FileText, 
  Lock, 
  Unlock, 
  Volume2,
  Sparkles,
  Bot
} from 'lucide-react';
import { Language, AppMode, UserPersona } from '../types';
import { translations } from '../data/translations';
import { personas } from '../data/mockData';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  activePersona: UserPersona;
  onPersonaChange: (persona: UserPersona) => void;
  isAccountFrozen: boolean;
  onToggleFreeze: () => void;
  onOpenVoiceModal: () => void;
  onOpenSaathi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentMode,
  onModeChange,
  activePersona,
  onPersonaChange,
  isAccountFrozen,
  onToggleFreeze,
  onOpenVoiceModal,
  onOpenSaathi
}) => {
  const t = translations[currentLang] || translations.en;

  const languageOptions: { code: Language; label: string; native: string }[] = [
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hinglish', label: 'Hinglish', native: 'Hinglish' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
    { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-amber-500/20 bg-slate-950/90 backdrop-blur-xl">
      {/* Top emergency / compliance banner */}
      {isAccountFrozen && (
        <div className="bg-red-600/90 text-white px-4 py-1.5 text-xs font-semibold flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>{t.accountFrozen} — All UPI auto-debits & outward transfers paused by AI Fraud Shield</span>
          </div>
          <button 
            onClick={onToggleFreeze}
            className="bg-white text-red-700 px-2.5 py-0.5 rounded text-[11px] font-bold hover:bg-slate-100 transition shadow"
          >
            {t.unfreeze}
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-600 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-lg text-amber-400 tracking-tighter">
                🇮🇳 ₹
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">
                BharatPay
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                SuperApp
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Quick Mode Switcher */}
        <div className="hidden lg:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => onModeChange('smartphone')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              currentMode === 'smartphone'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Smartphone</span>
          </button>

          <button
            onClick={() => onModeChange('feature_phone')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              currentMode === 'feature_phone'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Feature Phone (USSD/IVR)</span>
          </button>

          <button
            onClick={() => onModeChange('soundbox_pos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              currentMode === 'soundbox_pos'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Kirana Soundbox POS</span>
          </button>

          <button
            onClick={() => onModeChange('pitch_deck')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              currentMode === 'pitch_deck'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PRD Pitch Hub</span>
          </button>
        </div>

        {/* Action Controls & Vernacular Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Voice AI Trigger Button */}
          <button
            onClick={onOpenVoiceModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-amber-500/25 transition-transform active:scale-95 text-xs sm:text-sm"
            title="Bolo aur Kharido - Voice Commerce"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
            </span>
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">Bolo & Buy</span>
          </button>

          {/* AI Financial Saathi Chatbot */}
          <button
            onClick={onOpenSaathi}
            className="flex items-center gap-1.5 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/30 font-medium px-2.5 py-1.5 rounded-xl text-xs transition"
            title="AI Financial Saathi"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">AI Saathi</span>
          </button>

          {/* Persona Switcher Dropdown */}
          <div className="relative group">
            <select
              value={activePersona.id}
              onChange={(e) => {
                const selected = personas.find(p => p.id === e.target.value);
                if (selected) onPersonaChange(selected);
              }}
              aria-label="Switch User Persona"
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-500 appearance-none pr-7 cursor-pointer hover:bg-slate-850"
            >
              {personas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.avatar} {p.name.split(' ')[0]} ({p.role.split(' ')[0]})
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-2.5 pointer-events-none text-slate-400 text-[10px]">▼</div>
          </div>

          {/* 12-Language Vernacular Selector */}
          <div className="relative">
            <div className="flex items-center gap-1 bg-slate-900 border border-amber-500/30 rounded-xl px-2.5 py-1.5 text-xs text-amber-300">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                aria-label="Select Language"
                className="bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer text-xs"
              >
                {languageOptions.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-100">
                    {lang.native} ({lang.label})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Emergency Account Freeze Trigger */}
          <button
            onClick={onToggleFreeze}
            title={isAccountFrozen ? "Unfreeze Account" : "1-Click Emergency AI Fraud Freeze"}
            className={`p-2 rounded-xl border transition ${
              isAccountFrozen 
                ? 'bg-red-500 text-white border-red-400 animate-pulse'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-red-400 hover:border-red-500/40'
            }`}
          >
            {isAccountFrozen ? <Lock className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Mode Switcher Bar */}
      <div className="lg:hidden flex items-center justify-around bg-slate-900/90 border-t border-slate-800/80 px-2 py-1 text-[11px]">
        <button
          onClick={() => onModeChange('smartphone')}
          className={`px-2 py-1 rounded font-medium ${currentMode === 'smartphone' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          📱 Smartphone
        </button>
        <button
          onClick={() => onModeChange('feature_phone')}
          className={`px-2 py-1 rounded font-medium ${currentMode === 'feature_phone' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          📞 Feature Phone
        </button>
        <button
          onClick={() => onModeChange('soundbox_pos')}
          className={`px-2 py-1 rounded font-medium ${currentMode === 'soundbox_pos' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          🔊 Soundbox POS
        </button>
        <button
          onClick={() => onModeChange('pitch_deck')}
          className={`px-2 py-1 rounded font-medium ${currentMode === 'pitch_deck' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          📊 PRD Hub
        </button>
      </div>
    </header>
  );
};
