import React, { useState } from 'react';
import { 
  PhoneCall, 
  MessageSquare, 
  Hash, 
  Send, 
  Bot, 
  Volume2, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  PhoneOff,
  Radio,
  RotateCcw
} from 'lucide-react';
import { UserPersona, Language } from '../../types';
import { soundEngine } from '../../utils/audio';

interface FeaturePhoneParityModalProps {
  persona: UserPersona;
  currentLang: Language;
}

export const FeaturePhoneParityModal: React.FC<FeaturePhoneParityModalProps> = ({
  persona,
  currentLang
}) => {
  const [selectedChannel, setSelectedChannel] = useState<'ussd' | 'ivr' | 'sms' | 'whatsapp'>('ussd');

  // USSD State
  const [ussdStep, setUssdStep] = useState<number>(0); // 0: Idle, 1: Main Menu, 2: Send Money, 3: Success, 4: Mini Statement
  const [ussdInput, setUssdInput] = useState<string>('*99#');
  const [ussdScreenText, setUssdScreenText] = useState<string>('Press [CALL] or [OK] to connect to *99# NUUP gateway');

  // IVR State
  const [isCallingIvr, setIsCallingIvr] = useState<boolean>(false);
  const [ivrPromptText, setIvrPromptText] = useState<string>('Calling 1800-BHARAT (1800-242-728)...');
  const [ivrStage, setIvrStage] = useState<number>(0);

  // SMS State
  const [smsCommand, setSmsCommand] = useState<string>('BAL');
  const [smsFeed, setSmsFeed] = useState<Array<{ sender: 'user' | 'bank'; text: string; time: string }>>([
    { sender: 'bank', text: 'Welcome to BharatPay SMS Banking. Send BAL for balance or PAY <amt> <mobile> to transfer.', time: '10:00 AM' }
  ]);

  // WhatsApp Bot State
  const [waInput, setWaInput] = useState<string>('Hi BharatPay');
  const [waMessages, setWaMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    { sender: 'bot', text: 'Namaste! 🙏 Welcome to BharatPay WhatsApp Saathi. How can I help you today?', time: '12:00 PM' },
    { sender: 'bot', text: 'You can check your ONDC Kirana order status, get a ₹50,000 instant loan, or send money.', time: '12:00 PM' }
  ]);

  const handleKeypadPress = (key: string) => {
    soundEngine.playDtmfTone(key);
    if (selectedChannel === 'ussd') {
      if (ussdStep === 0 && key === '#') {
        setUssdInput('*99#');
      } else {
        setUssdInput(prev => prev + key);
      }
    } else if (selectedChannel === 'ivr' && isCallingIvr) {
      if (key === '1') {
        const text = currentLang === 'en'
          ? `Your Bharat Credit limit is ₹${persona.creditLimit.toLocaleString('en-IN')}. Press 9 to disburse loan immediately.`
          : `Aapka Bharat Credit limit ₹${persona.creditLimit.toLocaleString('en-IN')} hai. Instant loan sanction karne ke liye 9 dabayein.`;
        setIvrPromptText(text);
        soundEngine.speakText(text, currentLang);
      } else if (key === '2') {
        const text = currentLang === 'en'
          ? `Your recent Kirana order (Aashirvaad Atta) is with delivery rider Sanjay and will arrive in 10 minutes.`
          : `Aapka pichla Kirana order (Aashirvaad Atta) Sanjay delivery rider ke paas hai aur 10 minute me deliver hoga.`;
        setIvrPromptText(text);
        soundEngine.speakText(text, currentLang);
      } else if (key === '3') {
        const text = currentLang === 'en'
          ? `Your current account balance is ₹${persona.walletBalance.toLocaleString('en-IN')} and UPI Lite balance is ₹${persona.upiLiteBalance}.`
          : `Aapka current account balance ₹${persona.walletBalance.toLocaleString('en-IN')} hai aur UPI Lite me ₹${persona.upiLiteBalance} hai.`;
        setIvrPromptText(text);
        soundEngine.speakText(text, currentLang);
      }
    }
  };

  const handleUssdSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (ussdStep === 0 && (ussdInput.trim() === '*99#' || ussdInput === '')) {
      soundEngine.playSuccessChime();
      setUssdStep(1);
      setUssdScreenText(`BharatPay *99# Menu:\n1. Send Money\n2. Check Balance\n3. UPI Lite Balance\n4. Mini Statement\n0. Exit\n\nEnter option (1-4):`);
      setUssdInput('');
    } else if (ussdStep === 1) {
      if (ussdInput === '1') {
        setUssdStep(2);
        setUssdScreenText(`Enter Mobile No or UPI VPA to send ₹200:`);
        setUssdInput('');
      } else if (ussdInput === '2') {
        soundEngine.playSuccessChime();
        setUssdScreenText(`Bharat Wallet Balance: ₹${persona.walletBalance.toLocaleString('en-IN')}\nUPI Lite Balance: ₹${persona.upiLiteBalance}\n\nPress 00 for Main Menu.`);
        setUssdInput('');
      } else if (ussdInput === '3') {
        soundEngine.playSuccessChime();
        setUssdScreenText(`UPI Lite Offline Balance: ₹${persona.upiLiteBalance}\nInstant Wallet Reserve: ₹500\n\nPress 00 for Main Menu.`);
        setUssdInput('');
      } else if (ussdInput === '4') {
        soundEngine.playSuccessChime();
        setUssdScreenText(`Mini Statement (Last 2 Txns):\n1. -₹200 (Kirana Store)\n2. +₹8,450 (Chit Fund Payout)\n\nPress 00 for Main Menu.`);
        setUssdInput('');
      } else if (ussdInput === '00') {
        setUssdStep(1);
        setUssdScreenText(`BharatPay *99# Menu:\n1. Send Money\n2. Check Balance\n3. UPI Lite Balance\n4. Mini Statement\n0. Exit`);
        setUssdInput('');
      } else {
        setUssdScreenText(`Invalid option.\nEnter 1 (Send), 2 (Balance), 3 (Lite), 4 (Statement):`);
        setUssdInput('');
      }
    } else if (ussdStep === 2) {
      soundEngine.playSuccessChime();
      setUssdStep(3);
      setUssdScreenText(`✓ ₹200 Sent to ${ussdInput || '9876543210'}!\nRef: NPCI-NUUP-${Date.now().toString().slice(-6)}\nBalance: ₹${(persona.walletBalance - 200).toLocaleString('en-IN')}\n\nPress 00 for Main Menu.`);
      setUssdInput('');
    }
  };

  const handleStartIvr = () => {
    setIsCallingIvr(true);
    soundEngine.playSuccessChime();
    setIvrStage(1);
    setIvrPromptText(currentLang === 'en' ? 'Connecting to BharatPay IVR Voice Gateway in English...' : 'Connecting to BharatPay IVR Speech Gateway in your language...');

    setTimeout(() => {
      const speechPrompt = currentLang === 'en'
        ? `Hello ${persona.name}! Welcome to BharatPay voice banking. Press 1 for Instant Micro-Loans, Press 2 for Kirana Order Status, or Press 3 for Account Balance.`
        : `Namaste ${persona.name}! BharatPay IVR banking me swagat hai. Naye loan ke liye 1 dabayein, Kirana order status ke liye 2 dabayein, ya account balance ke liye 3 dabayein.`;
      setIvrPromptText(speechPrompt);
      soundEngine.speakText(speechPrompt, currentLang);
    }, 1200);
  };

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsCommand.trim()) return;

    const userMsg = { sender: 'user' as const, text: smsCommand, time: 'Just now' };
    let replyText = '';

    if (smsCommand.toUpperCase().startsWith('BAL')) {
      replyText = `BharatPay: Your available balance is ₹${persona.walletBalance.toLocaleString('en-IN')}. UPI Lite: ₹${persona.upiLiteBalance}.`;
    } else if (smsCommand.toUpperCase().startsWith('PAY')) {
      replyText = `BharatPay: ₹200 successfully transferred to recipient. Txn ID: SMS-${Date.now().toString().slice(-6)}.`;
    } else if (smsCommand.toUpperCase().startsWith('MINI')) {
      replyText = `BharatPay Mini-Statement: Txn 1: -₹200 (Kirana), Txn 2: +₹8,450 (Chit Fund).`;
    } else {
      replyText = `BharatPay: Valid commands are BAL, MINI, PAY <amt> <mobile>.`;
    }

    setSmsFeed([...smsFeed, userMsg, { sender: 'bank', text: replyText, time: 'Just now' }]);
    setSmsCommand('');
    soundEngine.playSuccessChime();
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waInput.trim()) return;

    const userMsg = { sender: 'user' as const, text: waInput, time: 'Just now' };
    let botReply = '';

    if (waInput.toLowerCase().includes('loan') || waInput.toLowerCase().includes('credit')) {
      botReply = `🎉 You are pre-approved for a ₹${(persona.creditLimit / 1000).toFixed(0)}k Instant Loan at 1.25%/mo. Tap to disburse: https://bharatpay.in/claim-loan`;
    } else if (waInput.toLowerCase().includes('order') || waInput.toLowerCase().includes('atta') || waInput.toLowerCase().includes('kirana')) {
      botReply = `📦 Your ONDC Kirana order (Aashirvaad Atta) is packed and arriving in 12 mins from Ramesh Kirana Store!`;
    } else {
      botReply = `👍 Got it! Your BharatPay account is linked. Reply '1' for Balance, '2' for Instant Loan, '3' for Kirana order.`;
    }

    setWaMessages([...waMessages, userMsg, { sender: 'bot', text: botReply, time: 'Just now' }]);
    setWaInput('');
    soundEngine.playSuccessChime();
  };

  const keypadRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
              400M+ Feature Phone Users (No Smartphone Required)
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              ✓ Full Feature Parity via USSD, IVR, SMS & WhatsApp
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-100">
            Feature Phone Parity Simulator (PRD Feature 10)
          </h2>
          <p className="text-xs text-slate-400">
            Enabling unbanked and rural Indians to transact seamlessly on basic Nokia & JioBharat devices.
          </p>
        </div>

        {/* Channel Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedChannel('ussd')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${selectedChannel === 'ussd' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            *99# USSD
          </button>
          <button
            onClick={() => setSelectedChannel('ivr')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${selectedChannel === 'ivr' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            1800 IVR Voice
          </button>
          <button
            onClick={() => setSelectedChannel('sms')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${selectedChannel === 'sms' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            SMS Banking
          </button>
          <button
            onClick={() => setSelectedChannel('whatsapp')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${selectedChannel === 'whatsapp' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            WhatsApp Bot
          </button>
        </div>
      </div>

      {/* Main Channel Simulators & Physical Keypad Device */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-4xl mx-auto">
        
        {/* Left 2 Cols: Screen & Channel Feed */}
        <div className="md:col-span-2 space-y-4">
          
          {/* CHANNEL 1: USSD *99# */}
          {selectedChannel === 'ussd' && (
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-4 border-slate-700 shadow-2xl space-y-4">
              <div className="text-center pb-2 border-b border-slate-800 flex justify-between items-center">
                <span className="text-[10px] uppercase font-black text-amber-400 tracking-widest">
                  NOKIA 105 • USSD *99# NUUP
                </span>
                <span className="text-[9px] text-emerald-400 font-mono">SIM 1: AIRTEL 4G</span>
              </div>

              {/* Retro Monochrome LCD Screen */}
              <div className="p-4 rounded-2xl bg-[#5c7a52] text-slate-950 font-mono text-xs font-bold min-h-[160px] flex flex-col justify-between shadow-inner border border-[#3e5636]">
                <pre className="whitespace-pre-wrap leading-relaxed">{ussdScreenText}</pre>
                <div className="flex justify-between items-center text-[10px] text-slate-800 pt-2 border-t border-[#4a6341]">
                  <span>Input: [{ussdInput || '_'}]</span>
                  <span>NPCI-NUUP</span>
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleUssdSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ussdInput}
                    onChange={(e) => setUssdInput(e.target.value)}
                    placeholder="Enter choice (e.g. 1, 2, *99#)..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-amber-300 font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition active:scale-95 shadow"
                  >
                    SEND / OK
                  </button>
                </div>
              </form>

              <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setUssdStep(0);
                    setUssdInput('*99#');
                    setUssdScreenText('Press [CALL] or [OK] to connect to *99# NUUP gateway');
                  }}
                  className="text-amber-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset *99# Session</span>
                </button>
                <span className="text-[10px]">Works 100% Offline with Zero Mobile Data</span>
              </div>
            </div>
          )}

          {/* CHANNEL 2: IVR Toll-Free Phone Call Simulator */}
          {selectedChannel === 'ivr' && (
            <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/40 shadow-2xl text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400">
                <PhoneCall className={`w-8 h-8 ${isCallingIvr ? 'animate-bounce' : ''}`} />
              </div>

              <div>
                <h3 className="font-extrabold text-slate-100 text-lg">
                  1800-BHARAT (1800-242-728)
                </h3>
                <p className="text-xs text-slate-400">Toll-Free Multilingual Voice Banking in 12+ Dialects</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-200 min-h-[90px] flex items-center justify-center">
                {isCallingIvr ? (
                  <p className="font-medium italic text-amber-300">
                    "{ivrPromptText}"
                  </p>
                ) : (
                  <p className="text-slate-500">
                    Tap "Call IVR Hotline" or press CALL button to start listening to voice prompts.
                  </p>
                )}
              </div>

              <div className="flex justify-center gap-3">
                {!isCallingIvr ? (
                  <button
                    onClick={handleStartIvr}
                    className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95 flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call IVR Hotline (Free)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsCallingIvr(false);
                      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                      }
                    }}
                    className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg shadow-red-500/20 transition active:scale-95 flex items-center gap-2"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>End Call</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* CHANNEL 3: SMS Banking Terminal */}
          {selectedChannel === 'sms' && (
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-4">
              <div className="pb-2 border-b border-slate-800 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200">SMS Gateway: +91 92233 44556</span>
                <span className="text-[10px] text-emerald-400">Offline Ready</span>
              </div>

              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {smsFeed.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-2xl max-w-[85%] text-xs ${
                      msg.sender === 'user'
                        ? 'ml-auto bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 border border-slate-800 text-slate-200'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[9px] mt-1 opacity-75 font-mono">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendSms} className="flex gap-2">
                <input
                  type="text"
                  value={smsCommand}
                  onChange={(e) => setSmsCommand(e.target.value)}
                  placeholder="Type BAL or PAY 200 9876543210..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Send SMS
                </button>
              </form>
            </div>
          )}

          {/* CHANNEL 4: WhatsApp Conversational Bot */}
          {selectedChannel === 'whatsapp' && (
            <div className="p-6 rounded-3xl bg-slate-950 border border-emerald-500/40 shadow-2xl space-y-4">
              <div className="pb-2 border-b border-slate-800 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="font-bold text-slate-200">BharatPay WhatsApp Verified Official</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">✓ Official Green Tick</span>
              </div>

              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {waMessages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-2xl max-w-[85%] text-xs ${
                      msg.sender === 'user'
                        ? 'ml-auto bg-emerald-700 text-white font-medium'
                        : 'bg-slate-900 border border-slate-800 text-slate-200'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[9px] mt-1 opacity-75 font-mono">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendWhatsApp} className="flex gap-2">
                <input
                  type="text"
                  value={waInput}
                  onChange={(e) => setWaInput(e.target.value)}
                  placeholder="Ask about loans, ONDC orders, or balance..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  Send
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Right Col: Interactive Hardware Keypad Bezel */}
        <div className="glass-panel p-5 rounded-3xl border-2 border-slate-700 bg-slate-950 shadow-2xl flex flex-col items-center">
          <div className="w-full text-center pb-3 mb-3 border-b border-slate-800">
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
              Physical Keypad (DTMF Sound)
            </span>
          </div>

          {/* Action buttons (Call / End) */}
          <div className="grid grid-cols-2 gap-3 w-full mb-3">
            <button
              onClick={() => {
                if (selectedChannel === 'ussd') {
                  handleUssdSubmit();
                } else if (selectedChannel === 'ivr') {
                  handleStartIvr();
                }
              }}
              className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow transition active:scale-90 flex items-center justify-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>CALL / OK</span>
            </button>
            <button
              onClick={() => {
                if (isCallingIvr) {
                  setIsCallingIvr(false);
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                }
                setUssdStep(0);
                setUssdInput('');
                setUssdScreenText('Press [CALL] or [OK] to connect to *99# NUUP gateway');
              }}
              className="py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow transition active:scale-90 flex items-center justify-center gap-1"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span>END</span>
            </button>
          </div>

          {/* 12-Key Mechanical Matrix */}
          <div className="grid grid-cols-3 gap-2 w-full">
            {keypadRows.map((row, rIdx) => (
              <React.Fragment key={rIdx}>
                {row.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => handleKeypadPress(k)}
                    className="p-3 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-slate-700 active:border-amber-400 text-slate-100 font-bold text-sm shadow-md active:scale-90 transition flex flex-col items-center justify-center"
                  >
                    <span>{k}</span>
                    <span className="text-[8px] text-slate-500 tracking-tighter">
                      {k === '2' ? 'ABC' : k === '3' ? 'DEF' : k === '4' ? 'GHI' : k === '5' ? 'JKL' : k === '6' ? 'MNO' : k === '7' ? 'PQRS' : k === '8' ? 'TUV' : k === '9' ? 'WXYZ' : ''}
                    </span>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={() => setUssdInput(prev => prev.slice(0, -1))}
            className="w-full mt-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-400 transition"
          >
            ⌫ Clear / Backspace
          </button>
        </div>

      </div>

    </div>
  );
};

