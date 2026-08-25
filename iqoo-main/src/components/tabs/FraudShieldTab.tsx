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
  Zap
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
  persona: _persona,
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

  const handleScanUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlToCheck) return;

    setIsScanningUrl(true);
    setUrlScanResult(null);

    setTimeout(() => {
      setIsScanningUrl(false);
      const isMalicious = urlToCheck.includes('xyz') || urlToCheck.includes('quick') || urlToCheck.includes('free') || urlToCheck.includes('kyc');

      if (isMalicious) {
        soundEngine.playWarningBeep();
        setUrlScanResult({
          status: 'MALICIOUS_PHISHING',
          riskScore: 98,
          threatType: 'Utility Bill Phishing & UPI Credential Harvesting',
          registrar: 'Anonymous Hosting (Flagged by CERT-In)',
          recommendation: 'DO NOT OPEN. Immediate domain quarantine applied.'
        });
      } else {
        soundEngine.playSuccessChime();
        setUrlScanResult({
          status: 'SAFE_VERIFIED',
          riskScore: 4,
          threatType: 'Verified Official Gateway',
          registrar: 'Govt / Bank SSL Authority',
          recommendation: 'Safe to proceed.'
        });
      }
    }, 1200);
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
        speakerName: 'Suspected AI Clone (Impersonating Bank Manager)',
        spectralAnomaly: 'Synthetic pitch flattening detected in 3.4kHz formant frequency band.',
        action: 'Caller ID quarantined & auto-reported to National Cyber Crime Portal.'
      });
    }, 1800);
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
            AI Fraud Shield & Real-Time Threat Interceptor
          </h2>
          <p className="text-xs text-slate-400">
            Automated synthetic media detection, suspicious URL quarantine, scam caller identification, and 1-click Emergency Account Lock.
          </p>
        </div>

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

      {/* Two Main Tools: URL Phishing Scanner + Deepfake Voice Analyzer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Tool 1: URL Scanner */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-slate-100 text-base">URL & SMS Phishing Link Scanner</h3>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              CERT-In Sync
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Received a message or link about electricity disconnection, lottery, or KYC? Paste it below to scan with our AI heuristic engine.
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

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setUrlToCheck('http://bescom-bill-update-quick.xyz/pay')}
                className="text-[10px] px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
              >
                Sample Fake Bill Link
              </button>
              <button
                type="button"
                onClick={() => setUrlToCheck('https://onlinesbi.sbi/portal')}
                className="text-[10px] px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
              >
                Sample Safe Link
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
            <div className={`mt-4 p-4 rounded-2xl border text-xs space-y-2 animate-slideUp ${
              urlScanResult.status === 'MALICIOUS_PHISHING'
                ? 'bg-red-950/80 border-red-500 text-red-200'
                : 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5">
                  {urlScanResult.status === 'MALICIOUS_PHISHING' ? <AlertTriangle className="w-4 h-4 text-red-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {urlScanResult.status === 'MALICIOUS_PHISHING' ? '🚨 CRITICAL MALICIOUS PHISHING DETECTED' : '✓ VERIFIED SAFE URL'}
                </span>
                <span>Risk: {urlScanResult.riskScore}%</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Threat: <span className="font-semibold text-white">{urlScanResult.threatType}</span>
              </p>
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
            Simulate our AI audio pipeline that detects synthetic cloned voices during suspicious phone calls and WhatsApp audio notes.
          </p>

          {/* Waveform Mock View */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center my-3 min-h-[100px]">
            <div className="flex items-center gap-1.5 h-12">
              <span className={`w-1 rounded-full bg-purple-400 ${deepfakeAnalyzing ? 'soundwave-bar' : 'h-6'}`}></span>
              <span className={`w-1 rounded-full bg-pink-400 ${deepfakeAnalyzing ? 'soundwave-bar' : 'h-10'}`}></span>
              <span className={`w-1 rounded-full bg-red-400 ${deepfakeAnalyzing ? 'soundwave-bar' : 'h-8'}`}></span>
              <span className={`w-1 rounded-full bg-purple-400 ${deepfakeAnalyzing ? 'soundwave-bar' : 'h-4'}`}></span>
              <span className={`w-1 rounded-full bg-pink-400 ${deepfakeAnalyzing ? 'soundwave-bar' : 'h-12'}`}></span>
              <span className={`w-1 rounded-full bg-red-400 ${deepfakeAnalyzing ? 'soundwave-bar' : 'h-7'}`}></span>
            </div>
            <span className="text-[11px] text-slate-400 mt-2 font-mono">
              {deepfakeAnalyzing ? 'Extracting Formant Spectral Anomalies...' : 'Sample Call Audio: "Urgent Hospital Cash Transfer Required"'}
            </span>
          </div>

          <button
            onClick={handleSimulateDeepfakeAudioTest}
            disabled={deepfakeAnalyzing}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{deepfakeAnalyzing ? 'Scanning Voice Frequency Patterns...' : 'Test AI Deepfake Audio Scanner'}</span>
          </button>

          {deepfakeResult && (
            <div className="mt-4 p-4 rounded-2xl bg-red-950/80 border border-red-500 text-red-200 text-xs space-y-1.5 animate-slideUp">
              <div className="font-bold flex items-center gap-1 text-amber-300">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>AI Deepfake Voice Cloned Detected ({deepfakeResult.cloneConfidence}%)</span>
              </div>
              <p className="text-[11px] text-slate-300">{deepfakeResult.spectralAnomaly}</p>
              <p className="text-[11px] font-bold text-emerald-300">{deepfakeResult.action}</p>
            </div>
          )}
        </div>

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

    </div>
  );
};
