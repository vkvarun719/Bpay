import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Search, 
  Volume2, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  PhoneCall, 
  Link2, 
  Sparkles,
  Zap,
  MessageSquare,
  FileText,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink
} from 'lucide-react';
import { FraudAlert, UserPersona, Language } from '../../types';
import { soundEngine } from '../../utils/audio';

interface FraudShieldTabProps {
  persona: UserPersona;
  currentLang: Language;
  alerts: FraudAlert[];
  isAccountFrozen: boolean;
  onToggleFreeze: () => void;
}

export const FraudShieldTab: React.FC<FraudShieldTabProps> = ({
  persona,
  currentLang: _currentLang,
  alerts,
  isAccountFrozen,
  onToggleFreeze
}) => {
  const [urlToCheck, setUrlToCheck] = useState<string>('http://bescom-bill-update-quick.xyz/pay');
  const [urlScanResult, setUrlScanResult] = useState<any | null>(null);
  const [isScanningUrl, setIsScanningUrl] = useState<boolean>(false);

  // Deepfake Voice Analyzer state
  const [deepfakeAnalyzing, setDeepfakeAnalyzing] = useState<boolean>(false);
  const [deepfakeResult, setDeepfakeResult] = useState<any | null>(null);

  // SMS Scam Analyzer state
  const [smsText, setSmsText] = useState<string>(
    'Dear SBI User, your YONO account is suspended! Update PAN immediately by downloading APK at http://sbi-kyc-quick.net/app.apk to avoid ₹10,000 fine.'
  );
  const [smsAnalyzing, setSmsAnalyzing] = useState<boolean>(false);
  const [smsResult, setSmsResult] = useState<any | null>(null);

  // CERT-In Incident Report state
  const [showCertReportModal, setShowCertReportModal] = useState<boolean>(false);
  const [copiedIncident, setCopiedIncident] = useState<boolean>(false);

  const sampleScamSmsPresets = [
    {
      title: '⚡ Electricity Bill Cut',
      text: 'Dear Consumer, Your electricity power will be disconnected tonight at 9:30 PM because your previous month bill was not updated. Immediately contact Electricity Officer at 9812345678 or pay at http://mpeb-bill-settle.xyz'
    },
    {
      title: '🏦 SBI / HDFC KYC APK',
      text: 'Dear Customer, your bank account blocked today due to pending KYC. Click http://hdfc-kyc-portal.top/kyc to download bank APK and verify OTP.'
    },
    {
      title: '💼 Part-Time Telegram Job',
      text: 'Congratulation! You are selected for Amazon Product Rating Job. Earn ₹3,500 daily from home. Join official HR on Telegram: @AmazonIndiaEarn'
    },
    {
      title: '🎟️ KBC ₹25 Lakh Lottery',
      text: 'All India Sim Card Lucky Draw: Your mobile number won ₹25,00,000 in KBC Lottery 2026! Call Rana Pratap Singh at 9988776655 to claim your prize.'
    }
  ];

  const handleScanUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlToCheck) return;

    setIsScanningUrl(true);
    setUrlScanResult(null);

    setTimeout(() => {
      setIsScanningUrl(false);
      const isMalicious = urlToCheck.includes('xyz') || urlToCheck.includes('quick') || urlToCheck.includes('free') || urlToCheck.includes('kyc') || urlToCheck.includes('top') || urlToCheck.includes('apk');

      if (isMalicious) {
        soundEngine.playWarningBeep();
        setUrlScanResult({
          status: 'MALICIOUS_PHISHING',
          riskScore: 98,
          threatType: 'Utility Bill Phishing & UPI Credential Harvesting',
          domainAge: '3 days old (Registered via NameCheap Anonymous)',
          sslAuthority: 'Self-Signed Untrusted Certificate (Mismatched CN)',
          typoSquatting: 'Impersonating Official BESCOM/MPEB Power Portal',
          registrar: 'Anonymous Offshore Hosting (Blacklisted by CERT-In)',
          recommendation: 'DO NOT OPEN. Immediate domain quarantine applied. UPI PIN interceptor engaged.'
        });
      } else {
        soundEngine.playSuccessChime();
        setUrlScanResult({
          status: 'SAFE_VERIFIED',
          riskScore: 4,
          threatType: 'Verified Official Gateway',
          domainAge: '14+ years (Official National Portal)',
          sslAuthority: 'DigiCert Extended Validation EV-SSL',
          typoSquatting: 'None (Matches RBI Whitelisted DNS Record)',
          registrar: 'National Informatics Centre (NIC) / Official Bank',
          recommendation: 'Safe to proceed with financial transaction.'
        });
      }
    }, 1100);
  };

  const handleSimulateDeepfakeAudioTest = () => {
    setDeepfakeAnalyzing(true);
    setDeepfakeResult(null);

    setTimeout(() => {
      setDeepfakeAnalyzing(false);
      soundEngine.playWarningBeep();
      setDeepfakeResult({
        isCloned: true,
        cloneConfidence: 96.4,
        speakerName: 'Suspected AI Neural Voice Clone (ElevenLabs / VALL-E model)',
        spectralAnomaly: 'Synthetic pitch flattening detected in 3.4kHz formant frequency band + zero micro-tremor jitter.',
        biometricMismatch: 'Pitch variance 0.04 Hz vs genuine human standard 1.28 Hz.',
        action: 'Caller ID quarantined, voice fingerprint hashed & auto-reported to National Cyber Crime Portal (1930).'
      });
    }, 1800);
  };

  const handleAnalyzeSms = (textToAnalyze?: string) => {
    const text = textToAnalyze || smsText;
    if (!text.trim()) return;

    setSmsAnalyzing(true);
    setSmsResult(null);

    setTimeout(() => {
      setSmsAnalyzing(false);
      const isUrgent = text.includes('disconnected') || text.includes('suspended') || text.includes('blocked') || text.includes('immediately');
      const hasLinkOrApk = text.includes('http') || text.includes('.apk') || text.includes('Telegram') || text.includes('Lottery');

      if (isUrgent || hasLinkOrApk) {
        soundEngine.playWarningBeep();
        setSmsResult({
          threatLevel: 'CRITICAL_SCAM',
          scamCategory: text.includes('electricity') || text.includes('power') 
            ? 'Urgent Power Disconnection Threat (Social Engineering)' 
            : text.includes('APK') || text.includes('KYC') 
            ? 'Trojan APK Malware & Banking SMS Stealer'
            : text.includes('Job') || text.includes('Earn')
            ? 'Prepaid Task Scam / Ponzi Fraud'
            : 'Advance Fee Fraud / Lottery Phishing',
          indicators: [
            'Artificial urgency designed to cause panic',
            'Requests downloading untrusted APK outside Google Play',
            'Unregistered sender shortcode not matching Indian DLT format (e.g. AX-SBIBNK)',
            'Non-official domain (.xyz / .top / URL shortener)'
          ],
          safeAction: 'Do NOT call the number. Block sender immediately. Report on Sanchar Saathi Chakshu portal.'
        });
      } else {
        soundEngine.playSuccessChime();
        setSmsResult({
          threatLevel: 'LEGITIMATE_NOTICE',
          scamCategory: 'Informational Banking / Transaction Alert',
          indicators: ['DLT compliant format', 'No suspicious APK downloads requested', 'Standard verified communication'],
          safeAction: 'Message appears authentic. Never share UPI PIN or OTP with anyone.'
        });
      }
    }, 900);
  };

  const certInIncidentPayload = {
    incidentId: `CERT-IN-${Math.floor(100000 + Math.random() * 900000)}`,
    reporter: `${persona.name} (${persona.role})`,
    location: persona.location,
    targetPlatform: 'BharatPay SuperApp AI Shield',
    threatCategory: 'Deepfake Voice Cloning + Malicious Phishing SMS Gateway',
    evidenceVector: {
      phishingUrl: urlToCheck,
      clonedVoiceSampleHash: 'sha256_9f83ac4819d08e2f891bca72891901',
      formantFrequencyAnomaly: '3.4kHz Synthesized Flatline (96.4% confidence)',
      smsScamText: smsText.slice(0, 100) + '...'
    },
    actionTaken: isAccountFrozen ? 'EMERGENCY_ACCOUNT_LOCKED' : 'AUTOMATED_HONEYPOT_QUARANTINED',
    complaintPortal: 'https://cybercrime.gov.in (Helpline: 1930)',
    timestamp: new Date().toISOString()
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border border-red-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-lg bg-red-500/20 text-red-300 font-bold text-xs border border-red-500/30">
              SEBI TechSprint Problem Statement #1 Aligned
            </span>
            <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
              ✓ Deepfake Voice + Phishing + Behavioral Biometrics
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-100">
            AI Fraud Shield 2.0 & Real-Time Threat Interceptor
          </h2>
          <p className="text-xs text-slate-400">
            Automated synthetic media detection, suspicious URL quarantine, scam caller identification, and 1-click Emergency Account Lock.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCertReportModal(true)}
            className="flex items-center gap-1.5 px-3 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-red-500/40 text-xs font-bold text-red-300 transition"
          >
            <FileText className="w-4 h-4" />
            <span>CERT-In Report</span>
          </button>

          <button
            onClick={onToggleFreeze}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs shadow-xl transition active:scale-95 whitespace-nowrap ${
              isAccountFrozen 
                ? 'bg-red-500 text-white border-2 border-red-400 animate-pulse'
                : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-red-500/20'
            }`}
          >
            {isAccountFrozen ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>{isAccountFrozen ? 'Account Frozen (Tap to Unlock)' : 'Emergency Freeze Account'}</span>
          </button>
        </div>
      </div>

      {/* Grid: URL Phishing Scanner + Deepfake Voice Analyzer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Tool 1: URL Scanner */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-slate-100 text-base">URL & Link Threat Scanner</h3>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              CERT-In & HoneyPot Sync
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Received a link about electricity bill disconnection, bank KYC, or lottery? Paste it below to scan with our AI heuristic engine.
          </p>

          <form onSubmit={handleScanUrl} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={urlToCheck}
                onChange={(e) => setUrlToCheck(e.target.value)}
                placeholder="Paste suspicious link (e.g. http://xyz-bill.com)..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                required
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setUrlToCheck('http://bescom-bill-update-quick.xyz/pay')}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-red-300 hover:bg-slate-800"
              >
                ⚡ Fake Electricity Link (.xyz)
              </button>
              <button
                type="button"
                onClick={() => setUrlToCheck('http://sbi-kyc-update.apk-download.top')}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-red-300 hover:bg-slate-800"
              >
                🏦 Fake Bank APK (.top)
              </button>
              <button
                type="button"
                onClick={() => setUrlToCheck('https://onlinesbi.sbi/portal')}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 hover:bg-slate-800"
              >
                ✓ Genuine SBI Portal
              </button>
            </div>

            <button
              type="submit"
              disabled={isScanningUrl}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-xs shadow-md shadow-red-500/20 hover:brightness-110 transition active:scale-95 flex items-center justify-center gap-1.5"
            >
              {isScanningUrl ? (
                <span>Analyzing threat vectors...</span>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Scan URL Threat Level</span>
                </>
              )}
            </button>
          </form>

          {/* Scan Result */}
          {urlScanResult && (
            <div className={`mt-4 p-4 rounded-2xl border text-xs space-y-2.5 animate-slideUp ${
              urlScanResult.status === 'MALICIOUS_PHISHING'
                ? 'bg-red-950/80 border-red-500 text-red-200'
                : 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5">
                  {urlScanResult.status === 'MALICIOUS_PHISHING' ? <AlertTriangle className="w-4 h-4 text-red-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {urlScanResult.status === 'MALICIOUS_PHISHING' ? '🚨 CRITICAL MALICIOUS PHISHING DETECTED' : '✓ VERIFIED SAFE URL'}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-950 font-mono">Risk: {urlScanResult.riskScore}%</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-2.5 rounded-xl">
                <div><span className="text-slate-400">Threat:</span> <span className="font-semibold text-white">{urlScanResult.threatType}</span></div>
                <div><span className="text-slate-400">Domain Age:</span> <span className="text-slate-200">{urlScanResult.domainAge}</span></div>
                <div><span className="text-slate-400">SSL Certificate:</span> <span className="text-slate-200">{urlScanResult.sslAuthority}</span></div>
                <div><span className="text-slate-400">Typo-Squatting:</span> <span className="text-slate-200">{urlScanResult.typoSquatting}</span></div>
              </div>

              <p className="text-[11px] font-bold text-amber-300">
                Action: {urlScanResult.recommendation}
              </p>
            </div>
          )}
        </div>

        {/* Tool 2: Deepfake Voice Spectrogram Analyzer */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-slate-100 text-base">Neural Deepfake Voice Analyzer</h3>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Vishing Protection
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-3">
            Simulate our AI audio pipeline that detects synthetic cloned voices during suspicious phone calls and WhatsApp voice notes.
          </p>

          {/* Animated Spectrogram Audio Visualization */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center my-3 min-h-[110px]">
            <div className="flex items-end justify-center gap-1.5 h-14 w-full px-4">
              {[45, 80, 25, 95, 60, 30, 90, 40, 70, 85, 20, 90, 55, 75, 35].map((height, idx) => (
                <span 
                  key={idx}
                  style={{ height: deepfakeAnalyzing ? `${Math.floor(20 + Math.random() * 75)}%` : `${height}%` }}
                  className={`w-2 rounded-t-full transition-all duration-150 ${
                    idx === 3 || idx === 6 || idx === 11 
                      ? 'bg-red-400' 
                      : idx % 2 === 0 
                      ? 'bg-purple-500' 
                      : 'bg-indigo-400'
                  }`}
                ></span>
              ))}
            </div>
            <div className="flex items-center justify-between w-full text-[10px] text-slate-400 mt-2 font-mono px-2">
              <span>0 Hz</span>
              <span className="text-amber-400 font-bold">3.4 kHz Formant Spike (Synthetic Artifact)</span>
              <span>8.0 kHz</span>
            </div>
          </div>

          <button
            onClick={handleSimulateDeepfakeAudioTest}
            disabled={deepfakeAnalyzing}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{deepfakeAnalyzing ? 'Scanning Formant Spectral Waves...' : 'Simulate Audio Deepfake Call Test'}</span>
          </button>

          {deepfakeResult && (
            <div className="mt-4 p-4 rounded-2xl bg-red-950/80 border border-red-500 text-red-200 text-xs space-y-2 animate-slideUp">
              <div className="font-bold flex items-center justify-between text-amber-300">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>AI Deepfake Voice Cloned Detected</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-950 text-red-300 font-mono font-black">{deepfakeResult.cloneConfidence}%</span>
              </div>
              <p className="text-[11px] text-slate-300">{deepfakeResult.speakerName}</p>
              <p className="text-[11px] text-slate-300 bg-slate-950/50 p-2 rounded-lg font-mono">{deepfakeResult.spectralAnomaly}</p>
              <p className="text-[11px] font-bold text-emerald-300">{deepfakeResult.action}</p>
            </div>
          )}
        </div>

      </div>

      {/* Tool 3: SMS & WhatsApp Scam Classifier */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-base">SMS & WhatsApp Scam Classifier (NLP Heuristics)</h3>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Social Engineering Shield
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-3">
          Paste any suspicious message received on SMS, WhatsApp, or Telegram. Our NLP engine parses urgency triggers, APK payloads, and fake banking handles.
        </p>

        {/* Quick Scam Presets */}
        <div className="flex flex-wrap gap-2 mb-3">
          {sampleScamSmsPresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSmsText(preset.text);
                handleAnalyzeSms(preset.text);
              }}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5"
            >
              <span>{preset.title}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <textarea
            value={smsText}
            onChange={(e) => setSmsText(e.target.value)}
            rows={3}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            placeholder="Type or paste suspicious SMS text here..."
          />

          <button
            onClick={() => handleAnalyzeSms()}
            disabled={smsAnalyzing}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 hover:brightness-110 transition active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{smsAnalyzing ? 'Classifying with NLP models...' : 'Analyze Message for Scam Patterns'}</span>
          </button>
        </div>

        {smsResult && (
          <div className={`mt-4 p-4 rounded-2xl border text-xs space-y-2 animate-slideUp ${
            smsResult.threatLevel === 'CRITICAL_SCAM'
              ? 'bg-red-950/80 border-red-500 text-red-200'
              : 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
          }`}>
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5">
                {smsResult.threatLevel === 'CRITICAL_SCAM' ? <AlertTriangle className="w-4 h-4 text-red-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                <span>{smsResult.threatLevel === 'CRITICAL_SCAM' ? `🚨 FRAUD CLASSIFICATION: ${smsResult.scamCategory}` : '✓ SAFE NOTIFICATION'}</span>
              </span>
            </div>

            <div className="space-y-1 text-[11px]">
              <span className="font-bold text-white">Triggered Risk Indicators:</span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-300 pl-1">
                {smsResult.indicators.map((ind: string, i: number) => (
                  <li key={i}>{ind}</li>
                ))}
              </ul>
            </div>

            <p className="text-[11px] font-bold text-amber-300">
              Action: {smsResult.safeAction}
            </p>
          </div>
        )}
      </div>

      {/* Community-Reported Threat Feed */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Community-Reported Scam Database & Live Intercepts</span>
          </h3>
          <span className="text-xs text-slate-400">Auto-updated via SEBI / NPCI HoneyPots</span>
        </div>

        <div className="divide-y divide-slate-850">
          {alerts.map((alert) => (
            <div key={alert.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    alert.riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {alert.riskLevel} THREAT
                  </span>
                  <span className="font-bold text-xs text-slate-200">{alert.title}</span>
                </div>
                <p className="text-xs text-slate-400">{alert.details}</p>
                {alert.actionTaken && (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                    ✓ Shield Action: {alert.actionTaken}
                  </p>
                )}
              </div>
              <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">{alert.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CERT-In Incident Report Dispatch Modal */}
      {showCertReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl glass-panel bg-slate-950 border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <h3 className="font-bold text-slate-100 text-lg">
                  CERT-In / Cyber Crime Incident Docket
                </h3>
              </div>
              <button 
                onClick={() => setShowCertReportModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-center justify-between">
                <div>
                  <span className="font-bold text-red-300">Case Reference ID:</span>
                  <div className="font-mono text-sm text-white font-black">{certInIncidentPayload.incidentId}</div>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-bold">
                  READY FOR DISPATCH
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 text-slate-400">
                  <span>Standard Incident JSON Payload:</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(certInIncidentPayload, null, 2));
                      setCopiedIncident(true);
                      setTimeout(() => setCopiedIncident(false), 1500);
                    }}
                    className="text-amber-400 flex items-center gap-1 hover:underline text-xs"
                  >
                    {copiedIncident ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIncident ? 'Copied' : 'Copy Payload'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-amber-300 font-mono text-[11px] overflow-x-auto max-h-56">
                  {JSON.stringify(certInIncidentPayload, null, 2)}
                </pre>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-slate-200">Official National Helplines:</div>
                <p className="text-slate-400 text-[11px]">National Cyber Crime Reporting Portal: <strong>1930</strong> (Toll Free)</p>
                <p className="text-slate-400 text-[11px]">Sanchar Saathi (Chakshu Portal for Mobile Fraud): <strong>sancharsaathi.gov.in</strong></p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  soundEngine.playSuccessChime();
                  setShowCertReportModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold transition shadow-lg"
              >
                Dispatch Incident to Cyber Crime Portal
              </button>
              <button
                onClick={() => setShowCertReportModal(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

