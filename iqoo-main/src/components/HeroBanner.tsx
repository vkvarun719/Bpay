import React, { useState } from 'react';
import { 
  Send, 
  QrCode, 
  Mic, 
  Receipt, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  WifiOff, 
  ChevronRight,
  Gift,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserPersona, Language } from '../types';
import { translations } from '../data/translations';
import { soundEngine } from '../utils/audio';

interface HeroBannerProps {
  persona: UserPersona;
  currentLang: Language;
  onOpenVoiceModal: () => void;
  onOpenSendMoney: () => void;
  onOpenScanQr: () => void;
  onOpenBills: () => void;
  onNavigateTab: (tabId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  persona,
  currentLang,
  onOpenVoiceModal,
  onOpenSendMoney,
  onOpenScanQr,
  onOpenBills,
  onNavigateTab
}) => {
  const t = translations[currentLang] || translations.en;
  const [hasScratched, setHasScratched] = useState<boolean>(false);
  const [scratchReward, setScratchReward] = useState<number>(0);
  const [showScratchModal, setShowScratchModal] = useState<boolean>(false);

  const handleClaimScratchCard = () => {
    if (!hasScratched) {
      const reward = Math.floor(Math.random() * 40) + 15; // ₹15 - ₹55
      setScratchReward(reward);
      setHasScratched(true);
      soundEngine.playSuccessChime();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // confetti error fallback
      }
    }
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-6">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Persona Welcome Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800/80 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-2xl">
                {persona.avatar}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-slate-100">
                  Namaste, {persona.name}
                </h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {persona.role}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                📍 {persona.location} • Device: {persona.device}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setShowScratchModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition"
            >
              <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>Daily Scratch Card</span>
            </button>
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <Coins className="w-3.5 h-3.5" />
              <span>350 Coins</span>
            </div>
          </div>
        </div>

        {/* 4 Multi-Dimension Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          {/* Card 1: Bharat Wallet & UPI Lite */}
          <div 
            onClick={() => onNavigateTab('payments')}
            className="p-4 rounded-2xl glass-panel bg-slate-900/80 border border-amber-500/30 hover:border-amber-500/60 transition group cursor-pointer shadow-md"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>{t.wallet} & Balance</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] flex items-center gap-1">
                <WifiOff className="w-2.5 h-2.5" /> UPI Lite Ready
              </span>
            </div>
            <div className="text-2xl font-black text-slate-100 tracking-tight flex items-baseline gap-1">
              <span>₹{persona.walletBalance.toLocaleString('en-IN')}</span>
              <span className="text-xs font-normal text-slate-400">(Lite: ₹{persona.upiLiteBalance})</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-amber-400 group-hover:translate-x-0.5 transition">
              <span>Send P2P or Scan QR</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Bharat Credit Score */}
          <div 
            onClick={() => onNavigateTab('credit')}
            className="p-4 rounded-2xl glass-panel bg-slate-900/80 border border-blue-500/30 hover:border-blue-500/60 transition group cursor-pointer shadow-md"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>{t.bharatScore}</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px]">
                XGBoost AI
              </span>
            </div>
            <div className="text-2xl font-black text-blue-400 tracking-tight flex items-baseline gap-2">
              <span>{persona.creditScore}</span>
              <span className="text-xs font-medium text-emerald-400">Excellent</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-blue-300 group-hover:translate-x-0.5 transition">
              <span>Pre-approved Limit: ₹{(persona.creditLimit / 100000).toFixed(1)}L</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Chit Funds 2.0 Pool */}
          <div 
            onClick={() => onNavigateTab('chits')}
            className="p-4 rounded-2xl glass-panel bg-slate-900/80 border border-purple-500/30 hover:border-purple-500/60 transition group cursor-pointer shadow-md"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>{t.chitFunds}</span>
              <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px]">
                Blockchain Trust
              </span>
            </div>
            <div className="text-2xl font-black text-purple-300 tracking-tight">
              ₹50,000 Pool
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-purple-300 group-hover:translate-x-0.5 transition">
              <span>Live Bidding Round • ₹580 Dividend</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Multi-Asset Wealth & Gold */}
          <div 
            onClick={() => onNavigateTab('investments')}
            className="p-4 rounded-2xl glass-panel bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500/60 transition group cursor-pointer shadow-md"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>24K Gold & Direct MFs</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                SEBI Aligned
              </span>
            </div>
            <div className="text-2xl font-black text-amber-400 tracking-tight flex items-baseline gap-1">
              <span>₹7,480/g</span>
              <span className="text-xs font-semibold text-emerald-400">(+21.2% 1Y)</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-400 group-hover:translate-x-0.5 transition">
              <span>0% Commission • Start with ₹100</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        {/* 4 Primary High-Impact Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <button
            onClick={onOpenSendMoney}
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition"
          >
            <Send className="w-5 h-5" />
            <span className="text-sm">{t.sendMoney}</span>
          </button>

          <button
            onClick={onOpenScanQr}
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-100 font-semibold border border-slate-700 shadow-md active:scale-95 transition"
          >
            <QrCode className="w-5 h-5 text-amber-400" />
            <span className="text-sm">{t.scanQr}</span>
          </button>

          <button
            onClick={onOpenVoiceModal}
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-lg shadow-emerald-600/20 hover:brightness-110 active:scale-95 transition"
          >
            <Mic className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="text-sm">{t.boloAurKharido}</span>
          </button>

          <button
            onClick={onOpenBills}
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-100 font-semibold border border-slate-700 shadow-md active:scale-95 transition"
          >
            <Receipt className="w-5 h-5 text-orange-400" />
            <span className="text-sm">{t.billPay}</span>
          </button>

        </div>

      </div>

      {/* Daily Scratch Card Modal */}
      {showScratchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm glass-panel bg-slate-950 border border-amber-500/40 rounded-3xl p-6 text-center shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-1 flex items-center justify-center mb-4">
              <Gift className="w-8 h-8 text-slate-950" />
            </div>

            <h3 className="text-lg font-bold text-slate-100">
              BharatPay Daily Cashback Reward
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Exclusive reward for transacting on UPI & ONDC today!
            </p>

            <div 
              onClick={handleClaimScratchCard}
              className={`w-full h-36 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-2 border-dashed ${
                hasScratched 
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' 
                  : 'bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-700 border-amber-400 hover:scale-102 text-slate-950 font-black shadow-xl shadow-amber-500/20'
              }`}
            >
              {hasScratched ? (
                <div>
                  <div className="text-3xl font-black text-amber-400">🎉 ₹{scratchReward}</div>
                  <div className="text-xs font-bold text-emerald-400 mt-1">Cashback added to Bharat Wallet!</div>
                  <div className="text-[10px] text-slate-400 mt-1">+50 Bharat Shiksha Coins</div>
                </div>
              ) : (
                <div className="p-4 text-center">
                  <Sparkles className="w-8 h-8 mx-auto mb-1 animate-spin" />
                  <span className="text-sm uppercase tracking-wider font-extrabold">Tap to Scratch & Reveal</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowScratchModal(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
