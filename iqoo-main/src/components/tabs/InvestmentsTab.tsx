import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  Sparkles, 
  Target, 
  PieChart, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  ShieldCheck,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InvestmentAsset, UserPersona, Language, Transaction } from '../../types';
import { soundEngine } from '../../utils/audio';

interface InvestmentsTabProps {
  persona: UserPersona;
  currentLang: Language;
  assets: InvestmentAsset[];
  onAddTransaction: (txn: Transaction) => void;
}

export const InvestmentsTab: React.FC<InvestmentsTabProps> = ({
  persona,
  currentLang: _currentLang,
  assets,
  onAddTransaction
}) => {
  const [selectedAsset, setSelectedAsset] = useState<InvestmentAsset | null>(null);
  const [investAmount, setInvestAmount] = useState<number>(500);
  const [isSip, setIsSip] = useState<boolean>(true);
  const [investSuccess, setInvestSuccess] = useState<boolean>(false);
  const [selectedGoal, setSelectedGoal] = useState<string>('all');

  const goalBaskets = [
    { id: 'all', title: 'All Multi-Assets', icon: '🌐' },
    { id: 'shaadi', title: 'Shaadi Ka Fund (Gold + MFs)', icon: '💍', target: '₹5,00,000', timeline: '3 Years' },
    { id: 'ghar', title: 'Ghar Khareedna (Downpayment)', icon: '🏡', target: '₹12,00,000', timeline: '5 Years' },
    { id: 'padhai', title: 'Bachhe Ki Padhai (Education)', icon: '🎓', target: '₹8,00,000', timeline: '7 Years' },
    { id: 'nps', title: 'Retirement (80C + 80CCD)', icon: '🏖️', target: '₹50,00,000', timeline: '15 Years' },
  ];

  const handleExecuteInvest = () => {
    if (!selectedAsset) return;

    soundEngine.playSuccessChime();
    setInvestSuccess(true);

    try {
      confetti({ particleCount: 60, spread: 55 });
    } catch {}

    const newTxn: Transaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      title: `${isSip ? 'Monthly SIP' : 'Lump Sum'} • ${selectedAsset.name.split('(')[0]}`,
      subtitle: `0% Commission Direct Plan • ₹${investAmount} via UPI AutoPay`,
      amount: investAmount,
      type: 'debit',
      category: 'investment',
      timestamp: 'Just now',
      status: 'SUCCESS',
      iconName: 'TrendingUp',
      txnRef: `AMFI-SEBI-${Date.now().toString().slice(-6)}`
    };

    onAddTransaction(newTxn);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
              SEBI TechSprint-Aligned Super App
            </span>
            <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
              ✓ Direct Mutual Funds • 0% Commission
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-100">
            Unified Multi-Asset Wealth & 24K Digital Gold
          </h2>
          <p className="text-xs text-slate-400">
            Equities, Direct MFs, 99.99% Vaulted Gold, Silver, Government NPS, and Goal-based Baskets from ₹100.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400">Current Portfolio Value</span>
          <div className="text-xl font-black text-emerald-400">₹{(persona.walletBalance * 2.8).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          <div className="text-[10px] text-emerald-300 font-medium">+19.4% Overall Return</div>
        </div>
      </div>

      {/* Goal-Based Investing Baskets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            <span>Goal-Based Investment Baskets</span>
          </h3>
          <span className="text-xs text-slate-400">AI-Curated Asset Allocation</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {goalBaskets.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGoal(g.id)}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                selectedGoal === g.id
                  ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900 hover:bg-slate-850 border-slate-800'
              }`}
            >
              <div className="text-2xl mb-1">{g.icon}</div>
              <div>
                <h4 className="text-xs font-bold text-slate-100 line-clamp-2">{g.title}</h4>
                {g.target && (
                  <p className="text-[10px] text-emerald-400 font-semibold mt-1">
                    Goal: {g.target} ({g.timeline})
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Portfolio Rebalancer & Tax Saver Alert */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-100">AI Portfolio Health & Tax Shield Suggestion</div>
            <div className="text-[11px] text-slate-400">
              You can save up to ₹46,800 in taxes under Section 80C and 80CCD(1B) by starting a ₹4,000/mo NPS + ELSS SIP.
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            const goldAsset = assets.find(a => a.type === 'digital_gold') || assets[0];
            setSelectedAsset(goldAsset);
            setInvestAmount(1000);
            setInvestSuccess(false);
          }}
          className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs whitespace-nowrap transition active:scale-95"
        >
          1-Click Rebalance & Save Tax
        </button>
      </div>

      {/* Assets Catalog */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-100 text-sm">
          Available Multi-Asset Investment Schemes ({assets.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-emerald-500/40 bg-slate-950/85 transition flex flex-col justify-between shadow-xl group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-3xl">{asset.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    asset.risk === 'Low' 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {asset.risk} Risk • {asset.type.toUpperCase().replace('_', ' ')}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition">
                  {asset.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {asset.description}
                </p>

                <div className="my-3 p-3 rounded-2xl bg-slate-900 border border-slate-850 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>1-Year Return:</span>
                    <span className="font-bold text-emerald-400">+{asset.returns1Yr}%</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>3-Year CAGR:</span>
                    <span className="font-bold text-emerald-300">+{asset.cagr3Yr}% p.a.</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Min. Investment:</span>
                    <span className="font-semibold text-slate-200">Start with ₹{asset.minInvestment}</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-3 border-t border-slate-850">
                <button
                  onClick={() => {
                    setSelectedAsset(asset);
                    setInvestAmount(asset.minInvestment || 500);
                    setInvestSuccess(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Start SIP / Invest ₹{asset.minInvestment}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Execution Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md glass-panel bg-slate-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedAsset.icon}</span>
                <h3 className="font-bold text-slate-100 text-base">{selectedAsset.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedAsset(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {investSuccess ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-3xl">
                  ✓
                </div>
                <h4 className="text-lg font-black text-slate-100">
                  Investment Successful!
                </h4>
                <p className="text-xs text-emerald-300 font-semibold">
                  ₹{investAmount} allocated to {selectedAsset.name} via UPI AutoPay.
                </p>
                <p className="text-[11px] text-slate-400">
                  ISIN: {selectedAsset.isin} • Zero Brokerage & Zero AMC
                </p>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="my-4 space-y-4 text-xs">
                
                {/* SIP vs Lump sum toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSip(true)}
                    className={`py-2 rounded-xl border font-bold text-xs transition ${
                      isSip ? 'bg-emerald-600 text-white border-emerald-400 shadow' : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    Monthly SIP (AutoPay)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSip(false)}
                    className={`py-2 rounded-xl border font-bold text-xs transition ${
                      !isSip ? 'bg-emerald-600 text-white border-emerald-400 shadow' : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    One-Time Lump Sum
                  </button>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Investment Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-base font-bold text-emerald-400">₹</span>
                    <input
                      type="number"
                      min={selectedAsset.minInvestment}
                      step="100"
                      value={investAmount}
                      onChange={(e) => setInvestAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-base font-bold text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Quick Chips */}
                <div className="flex gap-2">
                  {[100, 500, 1000, 2500, 5000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setInvestAmount(amt)}
                      className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-300"
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-slate-400">
                  <div className="flex justify-between">
                    <span>Commission / Brokerage:</span>
                    <span className="text-emerald-400 font-bold">₹0 (Direct Scheme)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vault / Custody Partner:</span>
                    <span className="text-slate-200">IDBI Trusteeship & BSE StarMF</span>
                  </div>
                </div>

                <button
                  onClick={handleExecuteInvest}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm shadow-xl shadow-emerald-500/25 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm ₹{investAmount} Investment via UPI</span>
                </button>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
