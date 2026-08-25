import React, { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  Layers, 
  DollarSign, 
  CheckCircle2, 
  Award, 
  Globe, 
  Server, 
  ShieldCheck, 
  Sparkles,
  Zap
} from 'lucide-react';

export const PrdPitchDeckTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'matrix' | 'architecture' | 'economics' | 'roadmap'>('overview');

  const competitiveFeatures = [
    { name: 'Voice Payments (12+ Vernacular Langs)', bharat: '✅ Full', paytm: '❌', phonepe: '❌', gpay: '❌', mobikwik: '❌' },
    { name: 'Feature Phone Parity (USSD *99# / IVR)', bharat: '✅ Full', paytm: '❌', phonepe: '❌', gpay: '❌', mobikwik: '❌' },
    { name: 'AI Financial Saathi (Smart Advisor)', bharat: '✅ Full', paytm: '⚠️ Basic', phonepe: '❌', gpay: '⚠️ Basic', mobikwik: '⚠️ Credit-only' },
    { name: 'Gamified Literacy (Shiksha Mode)', bharat: '✅ Full', paytm: '❌', phonepe: '❌', gpay: '❌', mobikwik: '❌' },
    { name: 'ONDC Local Kirana Marketplace', bharat: '✅ Full (2km)', paytm: '⚠️ Limited', phonepe: '❌', gpay: '❌', mobikwik: '❌' },
    { name: 'Community Chit Funds 2.0 (Blockchain)', bharat: '✅ Full', paytm: '❌', phonepe: '❌', gpay: '❌', mobikwik: '❌' },
    { name: 'Unified Multi-Asset Wealth (Gold/MFs)', bharat: '✅ Full', paytm: '✅ Full', phonepe: '✅ Full', gpay: '❌', mobikwik: '❌' },
    { name: 'AI Deepfake & Phishing Fraud Shield', bharat: '✅ Full', paytm: '❌', phonepe: '❌', gpay: '⚠️ Basic', mobikwik: '❌' },
    { name: 'Phygital 3,750+ Saathi Agent Network', bharat: '✅ Full', paytm: '✅ Full', phonepe: '❌', gpay: '❌', mobikwik: '❌' },
    { name: 'Alternative Data Bharat Credit Scoring', bharat: '✅ Full', paytm: '✅ Partner', phonepe: '✅ Partner', gpay: '⚠️ Partner', mobikwik: '✅ Full' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Pitch Deck Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-black text-xs border border-amber-500/30">
              PRD & Startup Pitch Deck v1.0
            </span>
            <span className="text-xs text-emerald-400 font-semibold">
              FinTech Hackathon / Series Pre-Seed Pitch
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-100">
            BharatPay SuperApp: "Apka Paisa, Apka Bhasha, Apka Bharat"
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            India's most inclusive AI-powered FinTech & Commerce platform for 600M+ Bharat users across Tier 2, 3, 4 cities & rural India.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs overflow-x-auto">
          {[
            { id: 'overview', label: 'Executive Summary' },
            { id: 'matrix', label: 'Competitive Matrix' },
            { id: 'architecture', label: 'Tech Stack & APIs' },
            { id: 'economics', label: 'Unit Economics' },
            { id: 'roadmap', label: '18M Roadmap' }
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                activeSection === sec.id 
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: Executive Overview */}
      {activeSection === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Key Market Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400">FinTech Market 2026</span>
              <div className="text-2xl font-black text-amber-400">$150B+</div>
              <span className="text-[10px] text-emerald-400">Growing 20%+ YoY</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400">Monthly UPI Trans.</span>
              <div className="text-2xl font-black text-slate-100">13+ Billion</div>
              <span className="text-[10px] text-emerald-400">60M+ QR Merchants</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400">Financial Inclusion</span>
              <div className="text-2xl font-black text-emerald-400">67.0 Index</div>
              <span className="text-[10px] text-slate-400">Unbanked &lt;10%</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400">Feature Phone Users</span>
              <div className="text-2xl font-black text-blue-400">400M+</div>
              <span className="text-[10px] text-amber-400">Zero Smartphone Barrier</span>
            </div>
          </div>

          {/* Core Vision & Problem Statement */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl space-y-4">
            <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>The Problem vs BharatPay Solution</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-2">
                <h4 className="font-bold text-red-300">❌ Current Market Failures:</h4>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  <li>English-first complex UI excludes 600M+ Tier 2/3/4 users</li>
                  <li>Fragmented apps for UPI, Kirana shopping, chit funds, and loans</li>
                  <li>No alternative credit scoring for users without CIBIL history</li>
                  <li>Quick Commerce charges 20-30% markups destroying local Kiranas</li>
                  <li>Surging AI deepfake audio scams and vishing targeting vulnerable elders</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <h4 className="font-bold text-emerald-300">✅ The BharatPay Solution:</h4>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  <li><strong>Voice-First Vernacular:</strong> "Bolo aur kharido" in 12+ Indian languages</li>
                  <li><strong>Feature Phone Parity:</strong> Full banking on basic phones via *99# USSD & IVR</li>
                  <li><strong>ONDC Kirana Commerce:</strong> 0% platform commission with 2km hyperlocal delivery</li>
                  <li><strong>Chit Funds 2.0:</strong> Digitizing ₹10L+ Cr chit market on blockchain ledger</li>
                  <li><strong>SEBI AI Fraud Shield:</strong> Real-time synthetic deepfake voice detection</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: Competitive Matrix */}
      {activeSection === 'matrix' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl overflow-x-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <h3 className="font-bold text-slate-100 text-base">
              Competitive Feature Matrix (PRD Section 12.1)
            </h3>
            <span className="text-xs text-amber-400">BharatPay vs Tier 1 Competitors</span>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Core Capability</th>
                <th className="pb-3 font-bold text-amber-400">BharatPay</th>
                <th className="pb-3 font-semibold">Paytm</th>
                <th className="pb-3 font-semibold">PhonePe</th>
                <th className="pb-3 font-semibold">Google Pay</th>
                <th className="pb-3 font-semibold">MobiKwik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {competitiveFeatures.map((f, i) => (
                <tr key={i} className="hover:bg-slate-900/50 transition">
                  <td className="py-3 font-medium text-slate-200">{f.name}</td>
                  <td className="py-3 font-black text-amber-300">{f.bharat}</td>
                  <td className="py-3 text-slate-400">{f.paytm}</td>
                  <td className="py-3 text-slate-400">{f.phonepe}</td>
                  <td className="py-3 text-slate-400">{f.gpay}</td>
                  <td className="py-3 text-slate-400">{f.mobikwik}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SECTION 3: Technical Architecture */}
      {activeSection === 'architecture' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-400" />
              <span>Full-Stack Technical Architecture (PRD Section 4)</span>
            </h3>
            <span className="text-xs text-emerald-400">AWS India (Mumbai / Hyd)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">Frontend & Channels</h4>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong>Mobile App:</strong> React Native (iOS + Android)</li>
                <li>• <strong>Web App:</strong> Next.js (SSR + Vite SEO)</li>
                <li>• <strong>Feature Phone:</strong> USSD Gateway, Asterisk IVR</li>
                <li>• <strong>WhatsApp:</strong> Twilio / 360dialog Official API</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-blue-400 uppercase tracking-wider text-[11px]">Backend Microservices</h4>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong>API Gateway:</strong> Kong / AWS API Gateway</li>
                <li>• <strong>Services:</strong> Node.js + Python FastAPI</li>
                <li>• <strong>Databases:</strong> PostgreSQL + MongoDB + Redis</li>
                <li>• <strong>Event Streaming:</strong> Apache Kafka</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-purple-400 uppercase tracking-wider text-[11px]">AI / ML Engines</h4>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong>Voice AI:</strong> Bhashini API (12+ Langs)</li>
                <li>• <strong>NLU:</strong> Transformers Indian Financial Corpus</li>
                <li>• <strong>Credit Scoring:</strong> XGBoost & LightGBM</li>
                <li>• <strong>Deepfake Shield:</strong> Audio Spectral Anomaly Detect</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: Unit Economics */}
      {activeSection === 'economics' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span>Revenue Streams & Unit Economics (PRD Section 6)</span>
            </h3>
            <span className="text-xs text-amber-400">High Margin Diversified Model</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-300 text-sm">Year 1 Unit Economics (Per User)</h4>
              <div className="space-y-1 text-slate-300">
                <div className="flex justify-between"><span>CAC (Acquisition Cost):</span> <span className="font-bold">₹150</span></div>
                <div className="flex justify-between"><span>Year 1 Revenue:</span> <span className="font-bold">₹200</span></div>
                <div className="flex justify-between"><span>Customer Lifetime Value (LTV):</span> <span className="font-bold text-emerald-400">₹600</span></div>
                <div className="flex justify-between pt-1 border-t border-slate-800 font-extrabold text-amber-400">
                  <span>LTV : CAC Ratio:</span> <span>4 : 1</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-300 text-sm">Year 3 Unit Economics (At Scale)</h4>
              <div className="space-y-1 text-slate-300">
                <div className="flex justify-between"><span>CAC (Word of Mouth / Brand):</span> <span className="font-bold">₹100</span></div>
                <div className="flex justify-between"><span>Year 3 Revenue / User:</span> <span className="font-bold">₹800</span></div>
                <div className="flex justify-between"><span>Customer Lifetime Value (LTV):</span> <span className="font-bold text-emerald-400">₹2,400</span></div>
                <div className="flex justify-between pt-1 border-t border-slate-800 font-extrabold text-emerald-400">
                  <span>LTV : CAC Ratio:</span> <span>24 : 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: 18-Month Roadmap */}
      {activeSection === 'roadmap' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/85 shadow-xl space-y-4">
          <h3 className="font-bold text-slate-100 text-base">
            18-Month Phased Rollout Roadmap (PRD Section 10)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Q1 2026 (Months 1-3)</span>
              <h4 className="font-bold text-slate-100">Phase 1: MVP Launch</h4>
              <p className="text-slate-400">10k users in Indore, Coimbatore, Jaipur. UPI payments, wallet & Hindi/English UI.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-blue-400 uppercase">Q2 2026 (Months 4-6)</span>
              <h4 className="font-bold text-slate-100">Phase 2: Tier 2 Expansion</h4>
              <p className="text-slate-400">100k users in 20 cities. Voice payments, ONDC marketplace & 500 Saathi agents.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-purple-400 uppercase">Q3-Q4 2026 (Months 7-12)</span>
              <h4 className="font-bold text-slate-100">Phase 3: Pan-India Scale</h4>
              <p className="text-slate-400">1M+ users, 12 languages, Direct MFs, 24K Gold, Chit Funds 2.0 & IVR parity.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">2027 (Year 2)</span>
              <h4 className="font-bold text-emerald-300">Phase 4: Ecosystem & IPO</h4>
              <p className="text-slate-400">10M+ users, ₹100 Cr ARR, White-label banking SaaS, NRI Dubai corridor.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
