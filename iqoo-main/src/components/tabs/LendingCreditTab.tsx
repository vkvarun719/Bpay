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
  Sparkles
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
    880,
    Math.max(
      350,
      Math.round(
        350 +
        (upiMonthlyCount / 120) * 180 +
        (avgMonthlyBalance / 100000) * 160 +
        (billOnTimeRate / 100) * 140 +
        (psychometricScore / 100) * 80
      )
    )
  );

  const approvalProbability = computedScore >= 750 ? 98 : computedScore >= 650 ? 82 : 55;
  const maxApprovedLoan = Math.round((computedScore / 800) * persona.creditLimit);

  // Disbursal State
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [tenureMonths, setTenureMonths] = useState<number>(12);
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [disbursalSuccess, setDisbursalSuccess] = useState<boolean>(false);

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

  const handleApplyDisbursal = () => {
    setIsApplying(true);

    setTimeout(() => {
      setIsApplying(false);
      setDisbursalSuccess(true);
      soundEngine.playSuccessChime();

      const newTxn: Transaction = {
        id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
        title: `Instant Loan Disbursal (${selectedProduct?.title || 'Micro-Credit'})`,
        subtitle: `₹${loanAmount} credited to Bank A/c • 30-Sec Disbursal`,
        amount: loanAmount,
        type: 'credit',
        category: 'loan',
        timestamp: 'Just now',
        status: 'SUCCESS',
        iconName: 'CreditCard',
        txnRef: `NBFC-RBI-${Date.now().toString().slice(-8)}`
      };

      onAddTransaction(newTxn);
    }, 2200);
  };

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

      {/* Alternative Credit Score Model Simulator */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-slate-100">
              Interactive XGBoost Alternative Scoring Engine
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

        <div className="mt-5 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="font-bold text-slate-200">Calculated Pre-Approved Credit Limit: </span>
              <span className="font-black text-emerald-400 text-sm">₹{maxApprovedLoan.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Underwritten by: RBI Registered NBFC Partners</span>
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
                onClick={() => {
                  setSelectedProduct(prod);
                  setDisbursalSuccess(false);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>Apply in 30 Seconds</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Disbursal Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg glass-panel bg-slate-950 border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedProduct.icon}</span>
                <h3 className="font-bold text-slate-100 text-base">{selectedProduct.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {disbursalSuccess ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-3xl">
                  ✓
                </div>
                <h4 className="text-lg font-black text-slate-100">
                  Loan Disbursed Successfully!
                </h4>
                <p className="text-xs text-emerald-300 font-semibold">
                  ₹{loanAmount.toLocaleString('en-IN')} has been transferred to your linked bank account via IMPS/UPI.
                </p>
                <p className="text-[11px] text-slate-400">
                  Ref: NBFC-RBI-SANCTION-{Date.now().toString().slice(-6)} • Monthly EMI: ₹{Math.round((loanAmount / tenureMonths) * 1.015)}
                </p>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="my-4 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Select Loan Amount (₹)
                  </label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="range" 
                      min="10000" 
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
                    <span>e-KYC & Aadhaar OTP:</span>
                    <span className="text-slate-200">Auto-Verified ✓</span>
                  </div>
                </div>

                <button
                  onClick={handleApplyDisbursal}
                  disabled={isApplying}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-blue-500/25 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  {isApplying ? (
                    <span>Disbursing to Bank in 30s...</span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>E-Sign & Disburse ₹{loanAmount.toLocaleString('en-IN')} Instantly</span>
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
