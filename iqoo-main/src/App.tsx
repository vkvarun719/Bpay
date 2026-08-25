import React, { useState } from 'react';
import { 
  Send, 
  Store, 
  CreditCard, 
  Users, 
  TrendingUp, 
  BookOpen, 
  ShieldAlert, 
  Radio, 
  FileText, 
  PhoneCall,
  Lock,
  Sparkles,
  Bot
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { VoiceCommerceModal } from './components/VoiceCommerceModal';
import { SaathiChatDrawer } from './components/tabs/SaathiChatDrawer';

// Tabs
import { PaymentsTab } from './components/tabs/PaymentsTab';
import { OndcCommerceTab } from './components/tabs/OndcCommerceTab';
import { LendingCreditTab } from './components/tabs/LendingCreditTab';
import { ChitFundsTab } from './components/tabs/ChitFundsTab';
import { InvestmentsTab } from './components/tabs/InvestmentsTab';
import { ShikshaLiteracyTab } from './components/tabs/ShikshaLiteracyTab';
import { FraudShieldTab } from './components/tabs/FraudShieldTab';
import { PhygitalNetworkTab } from './components/tabs/PhygitalNetworkTab';
import { FeaturePhoneParityModal } from './components/tabs/FeaturePhoneParityModal';
import { PrdPitchDeckTab } from './components/tabs/PrdPitchDeckTab';

// Mock Data & Types
import { 
  Language, 
  AppMode, 
  UserPersona, 
  Transaction, 
  CartItem, 
  OndcProduct 
} from './types';
import { 
  personas, 
  initialTransactions, 
  ondcProducts, 
  chitFundGroups, 
  investmentAssets, 
  shikshaLessons, 
  mockFraudAlerts 
} from './data/mockData';
import { translations } from './data/translations';

export const App: React.FC = () => {
  // App State
  const [currentLang, setCurrentLang] = useState<Language>('hi');
  const [currentMode, setCurrentMode] = useState<AppMode>('smartphone');
  const [activePersona, setActivePersona] = useState<UserPersona>(personas[0]); // Ramesh
  const [activeTab, setActiveTab] = useState<string>('payments');
  const [isAccountFrozen, setIsAccountFrozen] = useState<boolean>(false);

  // Modals
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isSaathiOpen, setIsSaathiOpen] = useState<boolean>(false);

  // Dynamic Data State
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [cart, setCart] = useState<CartItem[]>([
    { product: ondcProducts[0], quantity: 1 },
    { product: ondcProducts[1], quantity: 1 }
  ]);

  const t = translations[currentLang] || translations.en;

  // Handle Cart Operations
  const handleAddToCart = (product: OndcProduct) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddTransaction = (txn: Transaction) => {
    setTransactions((prev) => [txn, ...prev]);
    // Adjust persona balance
    if (txn.type === 'debit') {
      setActivePersona(p => ({ ...p, walletBalance: Math.max(0, p.walletBalance - txn.amount) }));
    } else {
      setActivePersona(p => ({ ...p, walletBalance: p.walletBalance + txn.amount }));
    }
  };

  // Voice commerce executions
  const handleVoiceSendMoney = (recipient: string, amount: number) => {
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      title: `Voice Sent to ${recipient}`,
      subtitle: `Bolo aur Kharido AI • NPCI UPI Transfer`,
      amount,
      type: 'debit',
      category: 'upi',
      timestamp: 'Just now',
      status: 'SUCCESS',
      iconName: 'Send',
      vpa: `${recipient.toLowerCase().replace(/\s+/g, '')}@upi`,
      txnRef: `NPCI-VOICE-${Date.now().toString().slice(-6)}`
    };
    handleAddTransaction(newTxn);
  };

  const handleVoiceBuyProduct = (productName: string) => {
    const matched = ondcProducts.find(p => p.name.toLowerCase().includes(productName.toLowerCase().slice(0, 5))) || ondcProducts[0];
    handleAddToCart(matched);
    setActiveTab('ondc');
  };

  const handleVoiceInvestGold = (amount: number) => {
    const goldAsset = investmentAssets.find(a => a.type === 'digital_gold') || investmentAssets[0];
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      title: `Voice SIP • ${goldAsset.name}`,
      subtitle: `24K Pure Gold in IDBI Vault • ₹${amount}`,
      amount,
      type: 'debit',
      category: 'investment',
      timestamp: 'Just now',
      status: 'SUCCESS',
      iconName: 'TrendingUp',
      txnRef: `AMFI-GOLD-${Date.now().toString().slice(-6)}`
    };
    handleAddTransaction(newTxn);
    setActiveTab('investments');
  };

  const navItems = [
    { id: 'payments', label: t.sendMoney, icon: Send, badge: 'UPI 2.0' },
    { id: 'ondc', label: t.ondcCommerce, icon: Store, badge: '2km' },
    { id: 'credit', label: t.instantCredit, icon: CreditCard, badge: '30s' },
    { id: 'chits', label: t.chitFunds, icon: Users, badge: 'Auction' },
    { id: 'investments', label: t.investments, icon: TrendingUp, badge: 'Gold' },
    { id: 'shiksha', label: t.shikshaLiteracy, icon: BookOpen, badge: 'Coins' },
    { id: 'fraud', label: t.fraudShield, icon: ShieldAlert, badge: 'Shield' },
    { id: 'phygital', label: t.phygitalNetwork, icon: Radio, badge: 'Soundbox' },
    { id: 'pitch_deck', label: 'PRD Hub', icon: FileText, badge: 'Deck' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Outfit',sans-serif]">
      
      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        activePersona={activePersona}
        onPersonaChange={setActivePersona}
        isAccountFrozen={isAccountFrozen}
        onToggleFreeze={() => setIsAccountFrozen(!isAccountFrozen)}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        onOpenSaathi={() => setIsSaathiOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pb-24">
        
        {/* Mode: Feature Phone Parity Simulator */}
        {currentMode === 'feature_phone' && (
          <div className="pt-6">
            <FeaturePhoneParityModal
              persona={activePersona}
              currentLang={currentLang}
            />
          </div>
        )}

        {/* Mode: Soundbox Kirana POS Mode */}
        {currentMode === 'soundbox_pos' && (
          <div className="pt-6">
            <PhygitalNetworkTab
              persona={activePersona}
              currentLang={currentLang}
            />
          </div>
        )}

        {/* Mode: PRD & Startup Pitch Deck */}
        {currentMode === 'pitch_deck' && (
          <div className="pt-6">
            <PrdPitchDeckTab />
          </div>
        )}

        {/* Mode: Default Smartphone SuperApp Experience */}
        {currentMode === 'smartphone' && (
          <>
            {/* Hero Banner & Live Balances */}
            <HeroBanner
              persona={activePersona}
              currentLang={currentLang}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              onOpenSendMoney={() => setActiveTab('payments')}
              onOpenScanQr={() => setActiveTab('payments')}
              onOpenBills={() => setActiveTab('payments')}
              onNavigateTab={setActiveTab}
            />

            {/* Feature Tabs Navigation Bar */}
            <div className="sticky top-[68px] z-40 bg-slate-950/90 backdrop-blur-md py-2 border-b border-slate-800/80 mb-6">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                          : 'bg-slate-900/90 text-slate-300 hover:bg-slate-850 hover:text-white border border-slate-800'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold ${
                          isActive ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Tab View */}
            <div>
              {activeTab === 'payments' && (
                <PaymentsTab
                  persona={activePersona}
                  currentLang={currentLang}
                  transactions={transactions}
                  onAddTransaction={handleAddTransaction}
                  onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
                />
              )}

              {activeTab === 'ondc' && (
                <OndcCommerceTab
                  persona={activePersona}
                  currentLang={currentLang}
                  products={ondcProducts}
                  cart={cart}
                  onAddToCart={handleAddToCart}
                  onUpdateCartQty={handleUpdateCartQty}
                  onClearCart={handleClearCart}
                  onAddTransaction={handleAddTransaction}
                  onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
                />
              )}

              {activeTab === 'credit' && (
                <LendingCreditTab
                  persona={activePersona}
                  currentLang={currentLang}
                  onAddTransaction={handleAddTransaction}
                />
              )}

              {activeTab === 'chits' && (
                <ChitFundsTab
                  persona={activePersona}
                  currentLang={currentLang}
                  groups={chitFundGroups}
                  onAddTransaction={handleAddTransaction}
                />
              )}

              {activeTab === 'investments' && (
                <InvestmentsTab
                  persona={activePersona}
                  currentLang={currentLang}
                  assets={investmentAssets}
                  onAddTransaction={handleAddTransaction}
                />
              )}

              {activeTab === 'shiksha' && (
                <ShikshaLiteracyTab
                  persona={activePersona}
                  currentLang={currentLang}
                  lessons={shikshaLessons}
                />
              )}

              {activeTab === 'fraud' && (
                <FraudShieldTab
                  persona={activePersona}
                  currentLang={currentLang}
                  alerts={mockFraudAlerts}
                  isAccountFrozen={isAccountFrozen}
                  onToggleFreeze={() => setIsAccountFrozen(!isAccountFrozen)}
                />
              )}

              {activeTab === 'phygital' && (
                <PhygitalNetworkTab
                  persona={activePersona}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'pitch_deck' && (
                <PrdPitchDeckTab />
              )}
            </div>
          </>
        )}

      </main>

      {/* Voice Commerce Modal ("Bolo aur Kharido") */}
      <VoiceCommerceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        currentLang={currentLang}
        onExecuteSendMoney={handleVoiceSendMoney}
        onExecuteBuyProduct={handleVoiceBuyProduct}
        onExecuteInvestGold={handleVoiceInvestGold}
        allProducts={ondcProducts}
      />

      {/* AI Financial Saathi Chat Drawer */}
      <SaathiChatDrawer
        isOpen={isSaathiOpen}
        onClose={() => setIsSaathiOpen(false)}
        persona={activePersona}
        currentLang={currentLang}
      />

      {/* Floating Bottom Quick Voice Mic for Smartphone Mode */}
      {currentMode === 'smartphone' && (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 hover:brightness-110 text-slate-950 font-black px-4 py-3 rounded-full shadow-2xl shadow-amber-500/40 active:scale-95 transition"
            title="Bolo aur Kharido (Speak & Transact)"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
            </span>
            <span className="text-sm">Bolo & Pay 🎙️</span>
          </button>
        </div>
      )}

      {/* Bottom Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">🇮🇳 BharatPay SuperApp</span>
            <span>• "Apka Paisa, Apka Bhasha, Apka Bharat"</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>NPCI UPI 2.0</span>
            <span>ONDC Protocol</span>
            <span>RBI NBFC Partners</span>
            <span>SEBI TechSprint Aligned</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
