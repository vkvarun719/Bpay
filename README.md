# 🇮🇳 BharatPay SuperApp (Bpay)

> **"Apka Paisa, Apka Bhasha, Apka Bharat"** (Your Money, Your Language, Your India)

**BharatPay SuperApp** is India's first voice-first, vernacular-native FinTech and Commerce SuperApp designed specifically for the 600M+ users across Tier 2, 3, 4 cities and rural India. It allows users to speak, pay, shop locally, learn financial literacy, and grow wealth in **12+ Indian languages** via smartphone and feature phone simulators.

---

## 🔒 Security Statement (No API Keys Found)
* **API Key Check**: **100% Browser-Safe**. There are **no active, sensitive, or paid API keys, passwords, or connection strings** hardcoded in this codebase.
* **Architecture**: The application is built to run 100% client-side (in-browser) using simulated algorithms, mock data engines, and native web APIs (like the Web Speech API and Web Audio API).
* **Safe to Share**: It is completely safe to upload this folder directly to public GitHub repositories or deploy it to Vercel/Netlify for hackathon judging without worrying about credit burn or key leakage.

---

## 🌟 10 Standout Features (All Built & Fully Interactive)

1. **Voice-First Vernacular Commerce** — *"Bolo aur kharido"* using the Web Speech API + Bhashini NLU parser. Supports Hinglish, Tamil, Telugu, and Hindi code-switching (e.g., `"₹200 bhejo Rahul ko"`).
2. **AI Financial Saathi** — A conversational AI financial advisor (jAI-style) providing expense tracking, budget planning, and localized Text-To-Speech (TTS) advice.
3. **Gamified Financial Literacy (Shiksha)** — 50+ bite-sized interactive modules, live quiz engine with coin rewards, confetti animations, daily streaks, and shareable certificates.
4. **ONDC Local Commerce Network** — 2km hyperlocal Kirana store directory with 0% platform commission widgets, voice checkout, and real-time GPS delivery rider tracker simulation.
5. **Community Chit Funds 2.0** — Digitizes the ₹10L+ Crore traditional chit fund market on a transparent blockchain simulator ledger, featuring a live reverse auction bidding engine with hammer sound effects.
6. **Unified Multi-Asset Wealth** — SEBI TechSprint-aligned dashboard for Direct Mutual Funds (0% distributor commission), 24K MMTC-PAMP Digital Gold, ETFs, NPS, and goal-based portfolios (*"Shaadi ka fund"*, *"Ghar khareedna"*).
7. **Instant Micro-Credit & Bharat Score** — Alternative data credit scoring using a simulated XGBoost ML engine with interactive sliders (UPI velocity, utility bills, psychometric trust badge) + 30-sec loan disbursal.
8. **AI Fraud Shield** — SEBI TechSprint Problem Statement #1 aligned: live phishing URL link scanner, Neural Deepfake Voice Analyzer (vishing protection), and 1-Click Emergency Account Freeze.
9. **Phygital Merchant Network** — 3,750+ physical Saathi touchpoints directory + BharatPay IoT Soundbox Simulator with multi-lingual audio broadcasts (*"BharatPay par ₹200 prapt hue!"*).
10. **Feature Phone Parity Simulator** — Serving 400M+ basic phone users with USSD `*99#` keypad dialer, IVR 1800 voice phone caller, SMS Banking, and WhatsApp Bot simulators.

---

## 👥 4 Built-In Target Personas

Toggle personas in the app's top navigation bar to see customized UI experiences:
* **Ramesh Gupta (Indore)**: Kirana store owner needing business loans, UPI QR history, and voice inventory ordering.
* **Priya Sundaram (Bengaluru)**: Urban software engineer managing Direct MFs, 24K Gold, and Section 80C tax optimization.
* **Lakshmi Ammal (Tamil Nadu)**: Rural farmer using IVR 1800 voice banking, crop loans, and Community Chit Funds in Tamil.
* **Amit Patel (Dubai)**: NRI managing family remittances, NRE fixed deposits, and home-state investments.

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 19 + TypeScript + Tailwind CSS
* **Build System**: Vite
* **Voice AI**: In-Browser Web Speech API + Bhashini NLU Regex Intent Parser
* **Audio & Soundbox**: Web Audio API Synthesizer + SpeechSynthesis TTS
* **Visual Effects**: `lucide-react`, `canvas-confetti`
* **Hosting Parity**: 100% static compilation (zero backend required for static deploy)

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Install Dependencies & Start App
Navigate to the directory containing the source code (e.g. `iqoo-main`) and run:
```bash
cd iqoo-main
npm install
npm run dev
```

### 2. Open Localhost
Open your browser and navigate to:
```
http://localhost:5173/
```

---

## 📦 How to Upload to GitHub (For Hackathon Judges)

Follow these steps to upload this project securely to GitHub:

1. **Open PowerShell/Terminal** in this directory (`Bpay` root).
2. **Initialize Git & Add Files**:
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "🇮🇳 Initial Commit: BharatPay SuperApp - Voice-First FinTech Platform"
   ```
3. **Link to GitHub**:
   * Go to [github.com/new](https://github.com/new) and create a repository named `bharatpay-superapp`.
   * Run the commands provided by GitHub:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/bharatpay-superapp.git
     git push -u origin main
     ```

---

## 🌐 Deploy to Vercel (1-Minute Hosting)

Since the app is client-side, you can host it for free on Vercel instantly:
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run `vercel` in the `iqoo-main` directory:
   ```bash
   cd iqoo-main
   vercel
   ```
3. Follow the CLI prompt instructions, select default settings, and get your live website URL!
