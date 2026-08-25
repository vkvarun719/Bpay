import React, { useState } from 'react';
import { 
  Store, 
  Volume2, 
  MapPin, 
  Users, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  Radio, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { UserPersona, Language } from '../../types';
import { phygitalKiosks } from '../../data/mockData';
import { soundEngine } from '../../utils/audio';

interface PhygitalNetworkTabProps {
  persona: UserPersona;
  currentLang: Language;
}

export const PhygitalNetworkTab: React.FC<PhygitalNetworkTabProps> = ({
  persona: _persona,
  currentLang
}) => {
  const [soundboxAmount, setSoundboxAmount] = useState<number>(200);
  const [selectedVoiceLang, setSelectedVoiceLang] = useState<Language>(currentLang || 'hi');
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [lastAnnouncement, setLastAnnouncement] = useState<string>('');

  const handleTestSoundbox = () => {
    setIsBroadcasting(true);
    soundEngine.speakSoundboxAnnouncement(soundboxAmount, selectedVoiceLang);
    setLastAnnouncement(`Announced: "BharatPay par ₹${soundboxAmount} prapt hue!" in ${selectedVoiceLang.toUpperCase()}`);

    setTimeout(() => {
      setIsBroadcasting(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
              3,750+ Physical Touchpoints
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              ✓ "BharatPay Saathi" Local Ambassador Network
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-100">
            Phygital Trust: Merging Digital App with Neighborhood Kirana
          </h2>
          <p className="text-xs text-slate-400">
            Assisted banking for first-time rural users, cash-in / cash-out, instant e-KYC onboarding, and smart voice soundbox.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-slate-900 border border-amber-500/40 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Active Saathi Agents</span>
          <div className="text-xl font-black text-amber-400">500+ Ambassadors</div>
        </div>
      </div>

      {/* Interactive Smart Merchant Soundbox Simulator */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/40 bg-slate-950/85 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-base">
              BharatPay IoT Soundbox Simulator (Live Voice Broadcast)
            </h3>
          </div>
          <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Hardware 4G Sim Sync
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Soundbox Hardware Device Mock */}
          <div className="relative mx-auto w-64 p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-4 border-amber-500/60 shadow-2xl flex flex-col items-center text-center">
            {/* LED Status light */}
            <div className="flex items-center justify-between w-full mb-3 px-2">
              <span className="text-[10px] font-black text-amber-400 tracking-wider">BHARATPAY</span>
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${isBroadcasting ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`}></span>
                <span className="text-[9px] text-emerald-400 font-mono">4G ONLINE</span>
              </div>
            </div>

            {/* Speaker Grille with dynamic audio wave pulses */}
            <div className={`w-36 h-36 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center relative my-2 ${
              isBroadcasting ? 'border-amber-400 shadow-lg shadow-amber-500/30' : ''
            }`}>
              <div className="absolute inset-4 rounded-full border border-dashed border-slate-700"></div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-md">
                <Volume2 className={`w-8 h-8 ${isBroadcasting ? 'animate-bounce' : ''}`} />
              </div>
            </div>

            <div className="mt-2 text-xs font-black text-slate-100">
              ₹{soundboxAmount} Received
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Voice: {selectedVoiceLang.toUpperCase()} Regional Speech
            </div>
          </div>

          {/* Controls to test different languages & amounts */}
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Broadcast Language (12+ Supported)
              </label>
              <select
                value={selectedVoiceLang}
                onChange={(e) => setSelectedVoiceLang(e.target.value as Language)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="hi">हिन्दी (Hindi) — "भारतपे पर ₹200 प्राप्त हुए"</option>
                <option value="ta">தமிழ் (Tamil) — "பாரத்பேவில் ₹200 பெறப்பட்டது"</option>
                <option value="te">తెలుగు (Telugu) — "భారత్‌పే లో ₹200 వచ్చాయి"</option>
                <option value="gu">ગુજરાતી (Gujarati) — "ભારતપે પર ₹200 મળ્યા"</option>
                <option value="mr">मराठी (Marathi) — "भारतपे वर ₹200 मिळाले"</option>
                <option value="bn">বাংলা (Bengali) — "ভারতপে তে ₹200 পেয়েছেন"</option>
                <option value="en">English — "Received ₹200 on BharatPay"</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Transaction Amount (₹)
              </label>
              <div className="flex gap-2">
                {[50, 200, 500, 1250, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSoundboxAmount(amt)}
                    className={`px-3 py-1.5 rounded-xl border font-bold transition ${
                      soundboxAmount === amt 
                        ? 'bg-amber-500 text-slate-950 border-amber-400' 
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleTestSoundbox}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:brightness-110 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Play Live Soundbox Voice Announcement</span>
            </button>

            {lastAnnouncement && (
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold text-center animate-fadeIn">
                ✓ {lastAnnouncement}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Nearby BharatPay Saathi Kiosks Directory */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-400" />
            <span>Nearby BharatPay Saathi Kiosks & Agent Touchpoints</span>
          </h3>
          <span className="text-xs text-slate-400">Assisted digital services within walking distance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phygitalKiosks.map((kiosk) => (
            <div key={kiosk.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{kiosk.name}</h4>
                  <p className="text-xs text-slate-400">👤 {kiosk.agentName}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">📍 {kiosk.address} ({kiosk.distanceKm} km)</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {kiosk.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Available Services:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {kiosk.services.map((srv, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800">
                      ✓ {srv}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Rating: ⭐ {kiosk.rating}</span>
                <a href={`tel:${kiosk.phone}`} className="text-amber-400 hover:underline flex items-center gap-1 font-semibold">
                  <Phone className="w-3 h-3" /> {kiosk.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
