export type Language = 
  | 'en' // English
  | 'hi' // Hindi
  | 'ta' // Tamil
  | 'te' // Telugu
  | 'kn' // Kannada
  | 'bn' // Bengali
  | 'mr' // Marathi
  | 'gu' // Gujarati
  | 'pa' // Punjabi
  | 'ml' // Malayalam
  | 'or' // Odia
  | 'hinglish'; // Hinglish

export type AppMode = 'smartphone' | 'feature_phone' | 'soundbox_pos' | 'pitch_deck';

export interface UserPersona {
  id: 'ramesh' | 'priya' | 'lakshmi' | 'amit';
  name: string;
  role: string;
  location: string;
  avatar: string;
  income: string;
  device: string;
  language: Language;
  walletBalance: number;
  upiLiteBalance: number;
  creditScore: number;
  creditLimit: number;
  savingsGoal: string;
  bio: string;
  painPoints: string[];
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: 'debit' | 'credit';
  category: 'upi' | 'commerce' | 'chit_fund' | 'investment' | 'loan' | 'cashback' | 'bill';
  timestamp: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  iconName: string;
  vpa?: string;
  txnRef?: string;
}

export interface OndcProduct {
  id: string;
  name: string;
  nameVernacular: Record<string, string>;
  category: 'groceries' | 'dairy' | 'spices' | 'essentials' | 'farm_fresh';
  price: number;
  originalPrice: number;
  unit: string;
  rating: number;
  merchantName: string;
  merchantDistanceKm: number;
  merchantType: 'Kirana' | 'Local Farm' | 'Wholesale Trader';
  inStock: boolean;
  image: string;
  description: string;
}

export interface CartItem {
  product: OndcProduct;
  quantity: number;
}

export interface ChitFundGroup {
  id: string;
  name: string;
  totalCorpus: number;
  membersCount: number;
  maxMembers: number;
  monthlyContribution: number;
  durationMonths: number;
  currentMonth: number;
  status: 'active' | 'bidding_open' | 'completed';
  nextAuctionDate: string;
  lastBidWinner: string;
  lastDividendAmount: number;
  mutualFundYieldEarned: number;
  isMember: boolean;
  category: 'Mohalla Vyapar' | 'Kirana Union' | 'Mahila Bachat' | 'Shaadi Fund';
}

export interface InvestmentAsset {
  id: string;
  name: string;
  type: 'mutual_fund' | 'digital_gold' | 'silver' | 'etf' | 'nps' | 'fd';
  currentPrice: number;
  cagr3Yr: number;
  risk: 'Low' | 'Moderate' | 'High';
  minInvestment: number;
  returns1Yr: number;
  isin: string;
  description: string;
  icon: string;
}

export interface ShikshaLesson {
  id: string;
  title: string;
  titleVernacular: Record<string, string>;
  category: 'UPI Basics' | 'Credit & Loans' | 'Investments' | 'Fraud Protection' | 'Chit Funds';
  durationMins: number;
  coinsReward: number;
  completed: boolean;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface FraudAlert {
  id: string;
  type: 'phishing_link' | 'deepfake_voice' | 'suspicious_qr' | 'unknown_call';
  title: string;
  description: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SAFE';
  timestamp: string;
  details: string;
  actionTaken?: string;
}
