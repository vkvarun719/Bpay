# BharatPay SuperApp — README

> **"Apka Paisa, Apka Bhasha, Apka Bharat"** (Your Money, Your Language, Your India)

India's first voice-first, vernacular-native FinTech SuperApp for Bharat — where 600M+ users across Tier 2, 3, 4 cities and rural India can speak, pay, shop local, learn finance, and grow wealth in 12+ Indian languages.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
http://localhost:5173/
```

---

## 🌟 10 Standout Features (All Built & Interactive)

1. **Voice-First Vernacular Commerce** — *"Bolo aur kharido"* with Web Speech API & Bhashini NLU parser supporting Hinglish, Tamil, Telugu, Hindi code-switching (`"₹200 bhejo Rahul ko"`).
2. **AI Financial Saathi** — Conversational AI financial advisor (jAI-style) with expense tracking, predictive advice (*"Save ₹500/mo on EMI"*), and credit checks.
3. **Gamified Financial Literacy (Shiksha)** — 50+ bite-sized interactive modules, live quiz engine with coin rewards, confetti animations, daily streaks, and shareable certificates.
4. **ONDC Local Commerce Network** — 2km hyperlocal Kirana marketplace, 0% platform commission comparison widget, instant checkout, and real-time GPS delivery rider tracker.
5. **Community Chit Funds 2.0** — Digitizing the ₹10L+ Cr traditional chit fund market with a transparent blockchain ledger, live reverse auction bidding simulator with hammer sound effect, and mutual fund yield on idle float.
6. **Unified Multi-Asset Wealth** — SEBI TechSprint-aligned dashboard: Direct Mutual Funds (0% commission), 24K MMTC-PAMP Digital Gold, ETFs, NPS, and Goal Baskets (*"Shaadi ka fund"*, *"Ghar khareedna"*).
7. **Instant Micro-Credit & Bharat Score** — Alternative data XGBoost ML scoring engine with live interactive sliders (UPI velocity, utility bills, SMS data, psychometric badge) + 30-sec instant loan disbursal.
8. **AI Fraud Shield** — SEBI TechSprint Problem Statement #1: Live URL phishing scanner, Neural Deepfake Voice Analyzer (vishing protection), and 1-Click Emergency Account Freeze.
9. **Phygital Merchant Network** — 3,750+ Saathi touchpoints directory + BharatPay IoT Soundbox Simulator with multi-lingual audio announcements (*"BharatPay par ₹200 prapt hue!"*).
10. **Feature Phone Parity Simulator** — Reaching 400M+ basic phone users with USSD `*99#` keypad dialer, IVR 1800 voice phone caller, SMS Banking, and WhatsApp Bot.

---

## 👥 4 Built-In Personas

Switch from the top navbar to explore customized dashboards:
- **Ramesh Gupta (Indore)**: Kirana store owner needing business loans and inventory voice ordering.
- **Priya Sundaram (Bengaluru)**: Urban millennial software engineer managing Direct MFs, 24K Gold, and Section 80C tax optimization.
- **Lakshmi Ammal (Tamil Nadu)**: Rural farmer using IVR 1800 voice banking, crop loans, and Community Chit Funds in Tamil.
- **Amit Patel (Dubai)**: NRI managing family remittances, NRE fixed deposits, and Gujarat investments.

---

## 🌐 12+ Vernacular Indian Languages Supported

Live UI translation + Voice Recognition + Text-To-Speech:
**हिन्दी (Hindi)** • **English** • **Hinglish** • **தமிழ் (Tamil)** • **తెలుగు (Telugu)** • **ಕನ್ನಡ (Kannada)** • **বাংলা (Bengali)** • **मराठी (Marathi)** • **ગુજરાતી (Gujarati)** • **ਪੰਜਾਬੀ (Punjabi)** • **മലയാളം (Malayalam)** • **ଓଡ଼ିଆ (Odia)**

---

## 🛠️ Tech Stack & Zero Credit Guarantee

- **Frontend**: Vite + React 19 + TypeScript + Tailwind CSS
- **Voice AI**: In-Browser Web Speech API + Bhashini NLU Regex Intent Extractor
- **Audio & Soundbox**: Web Audio API Synthesizer + SpeechSynthesis TTS
- **Icons & Visuals**: `lucide-react`, `canvas-confetti`
- **Zero Paid APIs**: 100% browser-based execution with zero external credit consumption.

---

## 📂 Project Structure

```
bharatpay-superapp/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── VoiceCommerceModal.tsx
│   │   └── tabs/
│   │       ├── PaymentsTab.tsx
│   │       ├── OndcCommerceTab.tsx
│   │       ├── LendingCreditTab.tsx
│   │       ├── ChitFundsTab.tsx
│   │       ├── InvestmentsTab.tsx
│   │       ├── ShikshaLiteracyTab.tsx
│   │       ├── FraudShieldTab.tsx
│   │       ├── PhygitalNetworkTab.tsx
│   │       ├── FeaturePhoneParityModal.tsx
│   │       ├── SaathiChatDrawer.tsx
│   │       └── PrdPitchDeckTab.tsx
│   ├── data/
│   │   ├── translations.ts
│   │   └── mockData.ts
│   ├── utils/
│   │   ├── audio.ts
│   │   └── voiceRecognition.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── PRD.md
│   ├── Showcase.md
│   └── Testing_Guide.md
├── output/
│   ├── BharatPay_PRD.md
│   ├── BharatPay_Concise_PRD.md
│   ├── BharatPay_Showcase.md
│   ├── BharatPay_Testing_Guide.md
│   └── README_BharatPay.md
├── package.json
└── vite.config.ts
```

---

## 📄 License
MIT License — Built with ❤️ for Bharat 🇮🇳
