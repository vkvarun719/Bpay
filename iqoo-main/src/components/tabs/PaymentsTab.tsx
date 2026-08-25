import React, { useState } from 'react';
import { 
  Send, 
  QrCode, 
  WifiOff, 
  Zap, 
  Smartphone, 
  Car, 
  Droplet, 
  Flame, 
  CheckCircle2, 
  Code2, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Sparkles,
  Search,
  Copy,
  Check
} from 'lucide-react';
import { Transaction, UserPersona, Language } from '../../types';
import { translations } from '../../data/translations';
import { soundEngine } from '../../utils/audio';

interface PaymentsTabProps {
  persona: UserPersona;
  currentLang: Language;
  transactions: Transaction[];
  onAddTransaction: (txn: Transaction) => void;
  onOpenVoiceModal: () => void;
}

export const PaymentsTab: React.FC<PaymentsTabProps> = ({
  persona,
  currentLang,
  transactions,
  onAddTransaction,
  onOpenVoiceModal
}) => {
  const t = translations[currentLang] || translations.en;

  // State
  const [recipientInput, setRecipientInput] = useState<string>('9876543210');
  const [amountInput, setAmountInput] = useState<string>('200');
  const [noteInput, setNoteInput] = useState<string>('Kirana purchase');
  const [useUpiLite, setUseUpiLite] = useState<boolean>(false);
  const [showQrScanner, setShowQrScanner] = useState<boolean>(false);
  const [showNpciModal, setShowNpciModal] = useState<boolean>(false);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string>('');

  const sampleContacts = [
    { name: 'Rahul Sharma', vpa: 'rahul@okaxis', phone: '98765 43210', avatar: '👨🏻' },
    { name: 'Priya Sundaram', vpa: 'priya@okhdfcbank', phone: '98450 11223', avatar: '👩🏻' },
    { name: 'Ramesh Kirana Store', vpa: 'rameshkirana@bharatpay', phone: '98260 99887', avatar: '🏪' },
    { name: 'Lakshmi Ammal (SHG)', vpa: 'lakshmi@oksbi', phone: '94432 55667', avatar: '👩🏽' },
  ];

  const quickBillers = [
    { id: 'elec', name: 'Electricity (Bescom / MPPKVVCL)', icon: Zap, color: 'text-amber-400 bg-amber-500/10' },
    { id: 'mobile', name: 'Mobile Recharge (Jio / Airtel)', icon: Smartphone, color: 'text-blue-400 bg-blue-500/10' },
    { id: 'fastag', name: 'FASTag Toll AutoPay', icon: Car, color: 'text-emerald-400 bg-emerald-500/10' },
    { id: 'gas', name: 'Gas Cylinder (Indane / BharatGas)', icon: Flame, color: 'text-red-400 bg-red-500/10' },
    { id: 'water', name: 'Water Board Supply', icon: Droplet, color: 'text-cyan-400 bg-cyan-500/10' },
  ];

  const handleSendPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amountInput);
    if (!amountNum || amountNum <= 0) return;

    const newTxn: Transaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      title: `Sent to ${recipientInput}`,
      subtitle: `${noteInput || 'UPI Transfer'} • ${useUpiLite ? 'UPI Lite Offline' : 'UPI PIN Verified'}`,
      amount: amountNum,
      type: 'debit',
      category: 'upi',
      timestamp: 'Just now',
      status: 'SUCCESS',
      iconName: 'Send',
      vpa: recipientInput.includes('@') ? recipientInput : `${recipientInput}@bharatpay`,
      txnRef: `NPCI-${Date.now().toString().slice(-8)}`
    };

    onAddTransaction(newTxn);
    soundEngine.playSuccessChime();
    soundEngine.speakSoundboxAnnouncement(amountNum, currentLang);
    setFeedbackSuccess(`₹${amountNum} successfully transferred via NPCI UPI!`);

    setTimeout(() => {
      setFeedbackSuccess('');
      setAmountInput('');
    }, 2800);
  };

  const handleQuickPayContact = (contact: typeof sampleContacts[0]) => {
    setRecipientInput(contact.vpa);
    setAmountInput('500');
    setNoteInput(`Payment to ${contact.name}`);
  };

  const npciSpecPayload = {
    payerVpa: `${persona.name.toLowerCase().replace(/\s+/g, '')}@bharatpay`,
    payeeVpa: recipientInput.includes('@') ? recipientInput : `${recipientInput}@upi`,
    amount: parseFloat(amountInput) || 200,
    currency: "INR",
    note: noteInput || "Kirana purchase",
    upiMode: useUpiLite ? "LITE_OFFLINE" : "ONLINE_2FA_PIN",
    channel: "NPCI_UNIFIED_API_v1",
    timestamp: new Date().toISOString()
  };

  const npciSpecResponse = {
    txnId: `UPI${Math.floor(100000000 + Math.random() * 900000000)}`,
    status: "SUCCESS",
    rrn: "623819203912",
    responseCode: "00",
    bankRef: "SBIN0029104",
    timestamp: new Date().toISOString()
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner with UPI Lite & NPCI Specs trigger */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs">
              NPCI UPI 2.0
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              ● 13+ Billion Monthly Transactions
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-100">
            Instant Zero-Fee UPI & Vernacular Voice Payments
          </h2>
          <p className="text-xs text-slate-400">
            Supports P2P, P2M, UPI Lite offline (&lt;₹500), AutoPay, and 12+ Indian languages.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setUseUpiLite(!useUpiLite)}
            className={`flex-1 md:flex-none flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition border ${
              useUpiLite 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
          >
            <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
            <span>UPI Lite (Offline): {useUpiLite ? 'ACTIVE' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setShowNpciModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-semibold transition"
            title="Inspect NPCI API Payloads"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>NPCI API Inspector</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Send Money Form + QR Code Scanner Mock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Send Money Form */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-slate-100">Send Money Instantly</h3>
            </div>
            <button
              onClick={onOpenVoiceModal}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Or speak: "₹200 bhejo Rahul ko"</span>
            </button>
          </div>

          <form onSubmit={handleSendPayment} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Payee UPI ID / Mobile Number / Bank Account
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={recipientInput}
                  onChange={(e) => setRecipientInput(e.target.value)}
                  placeholder="e.g. rahul@okaxis or 9876543210"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowQrScanner(true)}
                  className="absolute right-2.5 top-2.5 px-2.5 py-1 rounded-xl bg-slate-800 text-amber-400 text-xs font-medium hover:bg-slate-750 flex items-center gap-1 border border-slate-700"
                >
                  <QrCode className="w-3.5 h-3.5" /> Scan QR
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Amount (₹ INR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-base font-bold text-amber-400">₹</span>
                  <input
                    type="number"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    placeholder="200"
                    min="1"
                    max="100000"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-2xl pl-9 pr-4 py-3 text-lg font-bold text-slate-100 placeholder-slate-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Add a note (Optional)
                </label>
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="e.g. Kirana groceries, lunch share"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Amount Chips */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400 font-medium">Quick:</span>
              {[100, 200, 500, 1000, 2000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmountInput(amt.toString())}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition"
                >
                  +₹{amt}
                </button>
              ))}
            </div>

            {/* Success Feedback message */}
            {feedbackSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{feedbackSuccess}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Proceed to Pay ₹{amountInput || '0'} via NPCI UPI</span>
            </button>
          </form>

          {/* Frequent Contacts */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Frequent Payees & Kirana Merchants
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {sampleContacts.map((contact, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickPayContact(contact)}
                  className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 text-left transition group"
                >
                  <div className="text-2xl mb-1">{contact.avatar}</div>
                  <p className="text-xs font-bold text-slate-200 group-hover:text-amber-300 truncate">
                    {contact.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">{contact.vpa}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: BharatPay Smart Merchant QR & UPI Details */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="font-bold text-slate-100 flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Dynamic BharatPay Merchant QR</span>
              </h3>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Dynamic VPA
              </span>
            </div>

            {/* Dynamic Amount Configuration */}
            <div className="mb-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Set Custom QR Request (₹):</span>
                <span className="font-bold text-amber-400 font-mono">₹{amountInput || '0'}</span>
              </div>
              <input
                type="number"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                placeholder="Enter amount to embed in QR..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* QR Mock Card */}
            <div className="p-4 rounded-2xl bg-white text-slate-950 text-center shadow-lg my-2">
              <div className="text-[11px] font-black tracking-wider uppercase text-amber-600 mb-1">
                🇮🇳 BharatPay Smart QR
              </div>
              <div className="text-[10px] font-bold text-slate-700 mb-2">
                {amountInput && Number(amountInput) > 0 ? `Requested Amount: ₹${amountInput}` : 'Accept Any Amount'}
              </div>
              <div className="w-36 h-36 mx-auto bg-slate-900 rounded-xl p-2 flex items-center justify-center shadow-inner">
                {/* SVG QR Code Simulation with Dynamic Center Pill */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                  <rect width="30" height="30" fill="white" />
                  <rect x="5" y="5" width="20" height="20" fill="black" />
                  <rect x="10" y="10" width="10" height="10" fill="white" />
                  
                  <rect x="70" width="30" height="30" fill="white" />
                  <rect x="75" y="5" width="20" height="20" fill="black" />
                  <rect x="80" y="10" width="10" height="10" fill="white" />

                  <rect y="70" width="30" height="30" fill="white" />
                  <rect x="5" y="75" width="20" height="20" fill="black" />
                  <rect x="10" y="80" width="10" height="10" fill="white" />

                  <circle cx="50" cy="50" r="13" fill="#FF9933" />
                  <circle cx="50" cy="50" r="6" fill="#000080" />
                  
                  <rect x="35" y="10" width="8" height="8" fill="white" />
                  <rect x="55" y="15" width="8" height="8" fill="white" />
                  <rect x="35" y="75" width="8" height="8" fill="white" />
                  <rect x="55" y="80" width="8" height="8" fill="white" />
                  <rect x="15" y="45" width="8" height="8" fill="white" />
                  <rect x="75" y="45" width="8" height="8" fill="white" />
                </svg>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-2">{persona.name}</p>
              <p className="text-[10px] text-slate-600 font-mono">
                upi://pay?pa={persona.name.toLowerCase().replace(/\s+/g, '')}@bharatpay&am={amountInput || '0'}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
            <div className="flex justify-between">
              <span>Account Aggregator:</span>
              <span className="text-slate-200 font-semibold">Live (RBI AA Linked)</span>
            </div>
            <div className="flex justify-between">
              <span>Settlement:</span>
              <span className="text-emerald-400 font-semibold">T+0 Real-time (0% MDR)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Utility Bill Payments Section */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-xl">
        <h3 className="font-bold text-slate-100 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Bharat Bill Payment System (BBPS) & Utility Recharges</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {quickBillers.map((biller) => {
            const Icon = biller.icon;
            return (
              <button
                key={biller.id}
                onClick={() => {
                  setRecipientInput(`${biller.id}.bbps@npci`);
                  setAmountInput('850');
                  setNoteInput(`${biller.name} Payment`);
                }}
                className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 text-center transition flex flex-col items-center group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${biller.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 line-clamp-2">
                  {biller.name}
                </span>
                <span className="text-[10px] text-emerald-400 font-medium mt-1">₹0 Convenience Fee</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Transaction Ledger */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <span>{t.recentTxns}</span>
            <span className="text-xs font-normal text-slate-400">({transactions.length} records)</span>
          </h3>
          <span className="text-xs font-semibold text-amber-400">Immutable Audit Trail</span>
        </div>

        <div className="divide-y divide-slate-850">
          {transactions.map((txn) => (
            <div key={txn.id} className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-900/40 px-2 rounded-xl transition">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  txn.type === 'credit' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-slate-850 text-amber-400 border border-slate-700'
                }`}>
                  {txn.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{txn.title}</h4>
                  <p className="text-xs text-slate-400">{txn.subtitle}</p>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-sm font-extrabold ${txn.type === 'credit' ? 'text-emerald-400' : 'text-slate-100'}`}>
                  {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">{txn.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NPCI API Specification Inspector Modal (PRD Page 21) */}
      {showNpciModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl glass-panel bg-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-slate-100 text-lg">
                  NPCI UPI 2.0 API Specification (PRD Section 12.3)
                </h3>
              </div>
              <button 
                onClick={() => setShowNpciModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">POST</span> <span className="text-slate-300">https://api.npci.org.in/upi/v1/payment</span>
                <div className="text-[10px] text-slate-400 mt-1">Auth: OAuth 2.0 Token • Content-Type: application/json</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 text-slate-400 font-sans text-xs">
                  <span>Live Outgoing Request Payload (JSON):</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(npciSpecPayload, null, 2));
                      setCopiedPayload(true);
                      setTimeout(() => setCopiedPayload(false), 1500);
                    }}
                    className="text-amber-400 flex items-center gap-1 hover:underline"
                  >
                    {copiedPayload ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPayload ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-amber-300 overflow-x-auto">
                  {JSON.stringify(npciSpecPayload, null, 2)}
                </pre>
              </div>

              <div>
                <div className="mb-1 text-slate-400 font-sans text-xs">NPCI Live Gateway Response:</div>
                <pre className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-emerald-300 overflow-x-auto">
                  {JSON.stringify(npciSpecResponse, null, 2)}
                </pre>
              </div>
            </div>

            <button
              onClick={() => setShowNpciModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition mt-2"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}

      {/* QR Scanner Mock Modal */}
      {showQrScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm glass-panel bg-slate-950 border border-amber-500/40 rounded-3xl p-6 text-center shadow-2xl">
            <h3 className="font-bold text-slate-100 text-base mb-1">Scan Any Merchant QR</h3>
            <p className="text-xs text-slate-400 mb-4">Point your camera at any BharatPay / Paytm / GPay / PhonePe QR</p>
            
            <div className="relative w-64 h-64 mx-auto rounded-2xl bg-slate-900 border-2 border-amber-400 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-x-0 h-1 bg-amber-400 shadow-lg shadow-amber-400 animate-pulse-ring top-1/2"></div>
              <QrCode className="w-32 h-32 text-slate-700" />
            </div>

            <div className="mt-5 space-y-2">
              <button
                onClick={() => {
                  setRecipientInput('indorekirana@bharatpay');
                  setAmountInput('340');
                  setNoteInput('Kirana QR Scan');
                  setShowQrScanner(false);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition"
              >
                Simulate Scan: Indore Kirana (₹340)
              </button>
              <button
                onClick={() => setShowQrScanner(false)}
                className="w-full py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
