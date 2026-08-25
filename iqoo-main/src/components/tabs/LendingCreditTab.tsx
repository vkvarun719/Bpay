import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  Zap, 
  CheckCircle2, 
  Sliders, 
  ArrowRight, 
  AlertCircle, 
  TrendingUp, 
  FileText, 
  Lock, 
  Sparkles,
  Download,
  Copy,
  Check,
  Award,
  Building
} from 'lucide-react';
import { UserPersona, Language, Transaction } from '../../types';
import { soundEngine } from '../../utils/audio';

interface LendingCreditTabProps {
  persona: UserPersona;
  currentLang: Language;
  onAddTransaction: (txn: Transaction) => void;
}

export const LendingCreditTab: React.FC<LendingCreditTabProps> = ({
  persona,
  currentLang: _currentLang,
  onAddTransaction
}) => {
  // XGBoost ML Model Simulator Sliders
  const [upiMonthlyCount, setUpiMonthlyCount] = useState<number>(85);
  const [avgMonthlyBalance, setAvgMonthlyBalance] = useState<number>(35000);
  const [billOnTimeRate, setBillOnTimeRate] = useState<number>(98);
  const [psychometricScore, setPsychometricScore] = useState<number>(90);

  // Dynamic Score Calculation
  const computedScore = Math.min(
    890,
    Math.max(
      350,
      Math.round(
        350 +
        (upiMonthlyCount / 150) * 190 +
        (avgMonthlyBalance / 120000) * 165 +
        (billOnTimeRate / 100) * 135 +
        (psychometricScore / 100) * 50
      )
    )
  );

  const approvalProbability = computedScore >= 750 ? 98 : computedScore >= 650 ? 84 : 52;
  const maxApprovedLoan = Math.round((computedScore / 800) * persona.creditLimit);

  // Disbursal State
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [tenureMonths, setTenureMonths] = useState<number>(12);
  const [disbursalStep, setDisbursalStep] = useState<'config' | 'kyc' | 'mandate' | 'success'>('config');
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [showSanctionLetter, setShowSanctionLetter] = useState<boolean>(false);
  const [sanctionRefId, setSanctionRefId] = useState<string>('');

  const creditProducts = [
    {
      id: 'pay_later',
      title: 'Bharat Pay Later (30 Days)',
      subtitle: '0% Interest everyday credit for Kirana groceries & bills',
      limit: 'Up to ₹25,000',
      tag: '0% Interest',
      icon: '🛍️',
      interestRate: '0% for 30 days',
      approvalTime: 'Instant'
    },
    {
      id: 'pay_in_3',
      title: 'Pay in 3 Easy EMIs',
      subtitle: 'Split purchases into 3 monthly installments at 0 cost',
      limit: 'Up to ₹60,000',
      tag: 'No Cost EMI',
      icon: '➗',
      interestRate: '0% No-Cost',
      approvalTime: 'Instant'
    },
    {
      id: 'merchant_loan',
      title: 'Kirana QR Business Growth Loan',
      subtitle: 'Collateral-free inventory financing based on UPI sales history',
      limit: '₹50,000 - ₹5,00,000',
      tag: 'For Merchants',
      icon: '🏪',
      interestRate: '1.25% / month',
      approvalTime: '3 Minutes'
    },
    {
      id: 'emergency_cash',
      title: '30-Second Emergency Cash Loan',
      subtitle: 'Instant direct bank disbursal for urgent medical or crop needs',
      limit: '₹500 - ₹15,000',
      tag: 'Instant 30s Disbursal',
      icon: '🚨',
      interestRate: '1.5% / month',
      approvalTime: '30 Seconds'
    }
  ];

  const handleStartApply = (prod: any) => {
    setSelectedProduct(prod);
    setLoanAmount(Math.min(prod.id === 'emergency_cash' ? 15000 : 50000, maxApprovedLoan));
    setDisbursalStep('config');
  };

  const handleExecuteDisbursal = () => {
    setIsApplying(true);
    setDisbursalStep('kyc');

    setTimeout(() => {
      setDisbursalStep('mandate');
      setTimeout(() => {
        setIsApplying(false);
        setDisbursalStep('success');
        const refId = `NBFC-RBI-${Date.now().toString().slice(-8)}`;
        setSanctionRefId(refId);
        soundEngine.playSuccessChime();
        soundEngine.playCashRegister();

        const newTxn: Transaction = {
          id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
          title: `Loan Disbursed (${selectedProduct?.title || 'Micro-Credit'})`,
          subtitle: `₹${loanAmount.toLocaleString('en-IN')} credited to Bank A/c • 30-Sec Disbursal`,
          amount: loanAmount,
          type: 'credit',
          category: 'loan',
          timestamp: 'Just now',
          status: 'SUCCESS',
          iconName: 'CreditCard',
          txnRef: refId
        };

        onAddTransaction(newTxn);
      }, 1200);
    }, 1100);
  };

  // Speedometer needle angle: 350 -> -90 deg, 890 -> +90 deg
  const needleAngle = -90 + ((computedScore - 350) / (890 - 350)) * 180;

  const scoreRating = 
    computedScore >= 780 ? { label: 'Excellent', color: 'text-emerald-400', bg: 'bg-emerald-500/20' } :
    computedScore >= 680 ? { label: 'Good', color: 'text-blue-400', bg: 'bg-blue-500/20' } :
    computedScore >= 550 ? { label: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-500/20' } :
    { label: 'Building Score', color: 'text-orange-400', bg: 'bg-orange-500/20' };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 font-bold text-xs border border-blue-500/30">
              Alternative Data AI Underwriting
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              ✓ RBI NBFC Partner Network • 0 Paperwork
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-100">
            Bharat Credit Score & 30-Second Micro-Loans
          </h2>
          <p className="text-xs text-slate-400">
            Serving 40% of India with no previous CIBIL history through UPI transaction velocity & utility consistency.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-2xl bg-blue-950 border border-blue-500/50 text-center">
            <div className="text-[10px] text-blue-300 uppercase font-bold tracking-wider">Bharat Score</div>
            <div className="text-xl font-black text-blue-400">{computedScore} / 900</div>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-center">
            <div className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider">Approval Prob.</div>
            <div className="text-xl font-black text-emerald-400">{approvalProbability}%</div>
          </div>
        </div>
      </div>

      {/* Speedometer Gauge & ML Feature Weights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SVG Speedometer Gauge */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Real-Time Credit Health Speedometer
          </span>

          <div className="relative w-56 h-32 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 200 110" className="w-full h-full">
              {/* Arc gradients */}
              <defs>
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="35%" stopColor="#F59E0B" />
                  <stop offset="70%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>

              {/* Background Arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#1E293B"
                strokeWidth="16"
                strokeLinecap="round"
              />

              {/* Value Arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gaugeGrad)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - (computedScore - 350) / 540)}
                className="transition-all duration-500 ease-out"
              />

              {/* Needle pivot */}
              <circle cx="100" cy="100" r="7" fill="#F8FAFC" />
              
              {/* Dynamic Needle */}
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="30"
                stroke="#F8FAFC"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{
                  transformOrigin: '100px 100px',
                  transform: `rotate(${needleAngle}deg)`,
                  transition: 'transform 0.5s ease-out'
                }}
              />
            </svg>
          </div>

          <div className="mt-2">
            <div className="text-3xl font-black text-white font-mono">{computedScore}</div>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${scoreRating.bg} ${scoreRating.color} border border-current/30`}>
              {scoreRating.label} Tier
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            350 Min ⇄ 900 Max (Updated Live)
          </p>
        </div>

        {/* Feature Importance Breakdown */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>XGBoost ML Feature Weights & Underwriting Pillars</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              AUC-ROC: 0.942
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-1">
                <span>1. Daily UPI QR Velocity & Merchant Cash Flow (32% Weight)</span>
                <span className="text-amber-400 font-bold">{upiMonthlyCount} txns/mo (+{Math.round((upiMonthlyCount/150)*190)} pts)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div style={{ width: `${(upiMonthlyCount / 150) * 100}%` }} className="h-full bg-amber-500 rounded-full transition-all duration-300"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-1">
                <span>2. Account Aggregator Balance Stability (28% Weight)</span>
                <span className="text-emerald-400 font-bold">₹{avgMonthlyBalance.toLocaleString('en-IN')} (+{Math.round((avgMonthlyBalance/120000)*165)} pts)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div style={{ width: `${(avgMonthlyBalance / 120000) * 100}%` }} className="h-full bg-emerald-500 rounded-full transition-all duration-300"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-1">
                <span>3. Utility & Electricity On-Time Payment Discipline (25% Weight)</span>
                <span className="text-blue-400 font-bold">{billOnTimeRate}% (+{Math.round((billOnTimeRate/100)*135)} pts)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div style={{ width: `${billOnTimeRate}%` }} className="h-full bg-blue-500 rounded-full transition-all duration-300"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-1">
                <span>4. Psychometric Honesty & Shiksha Badge (15% Weight)</span>
                <span className="text-purple-400 font-bold">{psychometricScore}% (+{Math.round((psychometricScore/100)*50)} pts)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div style={{ width: `${psychometricScore}%` }} className="h-full bg-purple-500 rounded-full transition-all duration-300"></div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Pre-Approved Max Limit: <strong className="text-emerald-400 text-sm font-black">₹{maxApprovedLoan.toLocaleString('en-IN')}</strong></span>
            <span>Zero Physical Collateral Needed</span>
          </div>
        </div>

      </div>

      {/* Alternative Credit Score Model Simulator Sliders */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-slate-100">
              Interactive Parameter Sliders
            </h3>
          </div>
          <span className="text-xs text-slate-400">Adjust sliders to see live AI underwriting impact</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slider 1 */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">UPI Monthly Transactions (Last 90 Days)</span>
              <span className="text-amber-400 font-bold">{upiMonthlyCount} txns/mo</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="150" 
              value={upiMonthlyCount} 
              onChange={(e) => setUpiMonthlyCount(Number(e.target.value))}
              aria-label="UPI Monthly Transactions"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <p className="text-[10px] text-slate-500">Measures daily business activity and cash-flow regularity.</p>
          </div>

          {/* Slider 2 */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Average Monthly Bank Balance</span>
              <span className="text-emerald-400 font-bold">₹{avgMonthlyBalance.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" 
              min="5000" 
              max="120000" 
              step="5000"
              value={avgMonthlyBalance} 
              onChange={(e) => setAvgMonthlyBalance(Number(e.target.value))}
              aria-label="Average Monthly Bank Balance"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-[10px] text-slate-500">Fetched via RBI Account Aggregator (AA) consent framework.</p>
          </div>

          {/* Slider 3 */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Utility Bill & FASTag On-Time Payment Rate</span>
              <span className="text-blue-400 font-bold">{billOnTimeRate}%</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="100" 
              value={billOnTimeRate} 
              onChange={(e) => setBillOnTimeRate(Number(e.target.value))}
              aria-label="Utility Bill and FASTag On-Time Payment Rate"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <p className="text-[10px] text-slate-500">Electricity, mobile recharge & municipal water payment discipline.</p>
          </div>

          {/* Slider 4 */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Financial Literacy & Psychometric Trust Badge</span>
              <span className="text-purple-400 font-bold">{psychometricScore}% Complete</span>
            </div>
            <input 
              type="range" 
              min="30" 
              max="100" 
              value={psychometricScore} 
              onChange={(e) => setPsychometricScore(Number(e.target.value))}
              aria-label="Financial Literacy and Psychometric Trust Badge"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <p className="text-[10px] text-slate-500">Earned by completing Shiksha literacy modules & fraud quizzes.</p>
          </div>
        </div>
      </div>

      {/* Credit Products Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {creditProducts.map((prod) => (
          <div 
            key={prod.id}
            className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-blue-500/40 bg-slate-950/85 transition flex flex-col justify-between shadow-lg group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-3xl">{prod.icon}</span>
                <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {prod.tag}
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-100 group-hover:text-blue-300 transition">
                {prod.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {prod.subtitle}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-850">
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span className="text-[10px] text-slate-500">Max Limit</span>
                  <div className="font-bold text-slate-200">{prod.limit}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Rate & Speed</span>
                  <div className="font-bold text-emerald-400">{prod.interestRate}</div>
                </div>
              </div>

              <button
                onClick={() => handleStartApply(prod)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>Apply in 30 Seconds</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4-Step Disbursal Flow Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg glass-panel bg-slate-950 border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedProduct.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{selectedProduct.title}</h3>
                  <span className="text-[10px] text-emerald-400 font-mono">Disbursal Gateway • RBI NBFC Reg.</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Stepper indicator */}
            <div className="grid grid-cols-4 gap-1.5 my-4 text-center">
              {[
                { key: 'config', label: '1. Configure' },
                { key: 'kyc', label: '2. e-KYC' },
                { key: 'mandate', label: '3. AutoPay' },
                { key: 'success', label: '4. Disbursed' }
              ].map((st, i) => (
                <div 
                  key={i} 
                  className={`py-1 rounded-lg text-[10px] font-bold border transition ${
                    disbursalStep === st.key 
                      ? 'bg-blue-500 text-white border-blue-400'
                      : (disbursalStep === 'success' || (disbursalStep === 'mandate' && i < 2) || (disbursalStep === 'kyc' && i === 0))
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                >
                  {st.label}
                </div>
              ))}
            </div>

            {disbursalStep === 'config' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Select Loan Amount (₹)
                  </label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="range" 
                      min="5000" 
                      max={maxApprovedLoan || 100000} 
                      step="5000"
                      value={loanAmount} 
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      aria-label="Select Loan Amount"
                      className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <span className="font-extrabold text-base text-blue-400 min-w-[90px] text-right">
                      ₹{loanAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Repayment Tenure
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[3, 6, 12].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTenureMonths(m)}
                        className={`py-2 rounded-xl border text-xs font-bold transition ${
                          tenureMonths === m 
                            ? 'bg-blue-600 text-white border-blue-400 shadow' 
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        {m} Months
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Estimated Monthly EMI:</span>
                    <span className="font-bold text-slate-200">₹{Math.round((loanAmount / tenureMonths) * 1.015)} / mo</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Processing Fee:</span>
                    <span className="text-emerald-400 font-bold">₹0 (Zero Promo)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Disbursal Method:</span>
                    <span className="text-slate-200">Instant IMPS / UPI 2.0</span>
                  </div>
                </div>

                <button
                  onClick={handleExecuteDisbursal}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-blue-500/25 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>E-Sign & Disburse ₹{loanAmount.toLocaleString('en-IN')} in 30s</span>
                </button>
              </div>
            )}

            {(disbursalStep === 'kyc' || disbursalStep === 'mandate') && (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-blue-500/20 border-2 border-blue-500 animate-spin flex items-center justify-center text-blue-400">
                  ⚡
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">
                    {disbursalStep === 'kyc' ? 'Verifying DigiLocker Paperless e-KYC...' : 'Registering NPCI e-Mandate Auto-Debit...'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Connecting to RBI Account Aggregator & CKYC Registry
                  </p>
                </div>
              </div>
            )}

            {disbursalStep === 'success' && (
              <div className="py-6 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-3xl">
                  ✓
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-100">
                    ₹{loanAmount.toLocaleString('en-IN')} Disbursed Successfully!
                  </h4>
                  <p className="text-xs text-emerald-300 font-semibold mt-1">
                    Funds transferred to {persona.name}'s linked bank account via IMPS/UPI.
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-1">
                    Sanction Ref: {sanctionRefId}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Borrower:</span>
                    <span className="font-bold text-white">{persona.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Monthly EMI:</span>
                    <span className="font-bold text-emerald-400">₹{Math.round((loanAmount / tenureMonths) * 1.015)} / mo</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tenure:</span>
                    <span className="text-slate-200">{tenureMonths} Months (Auto-Debit Linked)</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setShowSanctionLetter(true)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center justify-center gap-1.5 transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Sanction Letter</span>
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Printable Sanction Letter Modal */}
      {showSanctionLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] font-sans">
            
            {/* Sanction Letter Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-200 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Building className="w-6 h-6 text-blue-700" />
                  <span className="font-black text-lg tracking-tight text-blue-950">BHARATPAY NBFC PARTNERS</span>
                </div>
                <p className="text-[10px] text-slate-500">RBI Reg. Digital Lending Application • Certificate of Sanction</p>
              </div>
              <button 
                onClick={() => setShowSanctionLetter(false)}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-900 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Sanction Details */}
            <div className="space-y-3 text-xs">
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Loan Sanction ID</span>
                  <div className="font-mono font-black text-blue-900 text-sm">{sanctionRefId || 'NBFC-RBI-8920194'}</div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  APPROVED & DISBURSED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                <div><span className="text-slate-500">Borrower:</span> <strong className="block text-slate-900">{persona.name}</strong></div>
                <div><span className="text-slate-500">Location:</span> <span className="block text-slate-900">{persona.location}</span></div>
                <div><span className="text-slate-500">Sanctioned Amount:</span> <strong className="block text-emerald-700 text-sm">₹{loanAmount.toLocaleString('en-IN')}</strong></div>
                <div><span className="text-slate-500">Tenure:</span> <span className="block text-slate-900">{tenureMonths} Months</span></div>
                <div><span className="text-slate-500">Monthly EMI:</span> <strong className="block text-blue-900">₹{Math.round((loanAmount / tenureMonths) * 1.015)}</strong></div>
                <div><span className="text-slate-500">Interest Rate:</span> <span className="block text-slate-900">1.25% p.m. (Reducing)</span></div>
              </div>

              <div className="border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600 space-y-1">
                <p>✓ Digitally signed via Aadhaar e-Sign under IT Act 2000 Section 3A.</p>
                <p>✓ NPCI NACH Auto-Debit mandate registered against primary UPI account.</p>
                <p>✓ Compliant with RBI Digital Lending Guidelines 2022 (Key Fact Statement KFS provided).</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 flex justify-between items-center">
              <span className="text-[10px] text-slate-400">Date: {new Date().toLocaleDateString('en-IN')}</span>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-xs shadow flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
