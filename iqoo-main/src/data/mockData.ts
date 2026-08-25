import { UserPersona, Transaction, OndcProduct, ChitFundGroup, InvestmentAsset, ShikshaLesson, FraudAlert } from '../types';

export const personas: UserPersona[] = [
  {
    id: 'ramesh',
    name: 'Ramesh Gupta',
    role: 'Kirana Store Owner',
    location: 'Indore, Madhya Pradesh',
    avatar: '👨🏽‍💼',
    income: '₹35,000 / month',
    device: 'Redmi 12C (₹9,999)',
    language: 'hi',
    walletBalance: 42850,
    upiLiteBalance: 450,
    creditScore: 742,
    creditLimit: 150000,
    savingsGoal: 'Kirana Inventory Wholesale Expansion',
    bio: 'Accepts 120+ UPI QR payments daily. Needs fast merchant credit without balance sheet paperwork and Hindi voice inventory ordering.',
    painPoints: ['Complex English apps', 'High merchant MDR fees on other apps', 'Lack of formal collateral for bank loans']
  },
  {
    id: 'priya',
    name: 'Priya Sundaram',
    role: 'Software Engineer',
    location: 'Indiranagar, Bengaluru',
    avatar: '👩🏻‍💻',
    income: '₹1,15,000 / month',
    device: 'iPhone 15 Pro',
    language: 'en',
    walletBalance: 88400,
    upiLiteBalance: 1200,
    creditScore: 810,
    creditLimit: 500000,
    savingsGoal: 'First Home Downpayment & Nifty ETF',
    bio: 'Power user wanting unified wealth management across Direct Mutual Funds, Sovereign Gold, NPS, and automated tax 80C optimization.',
    painPoints: ['Too many disconnected apps', 'Lack of proactive AI financial advice', 'Complex tax filing']
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi Ammal',
    role: 'Organic Farmer & SHG Lead',
    location: 'Pollachi, Tamil Nadu',
    avatar: '👩🏽‍🌾',
    income: '₹18,000 / month',
    device: 'Nokia Feature Phone + JioBharat',
    language: 'ta',
    walletBalance: 9600,
    upiLiteBalance: 300,
    creditScore: 680,
    creditLimit: 40000,
    savingsGoal: 'Drip Irrigation & Monsoon Crop Insurance',
    bio: 'Relies on voice commands in Tamil and IVR 1800 banking. Direct DBT subsidy recipient and Community Chit Fund leader.',
    painPoints: ['Cannot read small English text', 'Afraid of online scam calls', 'Nearest bank branch is 14 km away']
  },
  {
    id: 'amit',
    name: 'Amit Patel',
    role: 'Civil Project Manager (NRI)',
    location: 'Deira, Dubai (UAE) ⇄ Ahmedabad',
    avatar: '👨🏻‍💼',
    income: 'AED 18,500 (~₹4.2L / mo)',
    device: 'Samsung Galaxy S24 Ultra',
    language: 'gu',
    walletBalance: 320000,
    upiLiteBalance: 2000,
    creditScore: 840,
    creditLimit: 1200000,
    savingsGoal: 'Parents Health Shield & Gujarat Real Estate',
    bio: 'Sends low-fee cross-border remittances to elderly parents in Gujarat and invests in Indian Direct Equity & NRE/NRO fixed deposits.',
    painPoints: ['High wire transfer fees', 'Slow remittance tracking', 'Double taxation & KYC compliance hurdles']
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: 'TXN-98214',
    title: 'Kirana Wholesale Order (ONDC)',
    subtitle: 'Shree Krishna Wholesalers • 10 Bags Atta & Oil',
    amount: 8450,
    type: 'debit',
    category: 'commerce',
    timestamp: 'Today, 2:15 PM',
    status: 'SUCCESS',
    iconName: 'ShoppingBag',
    vpa: 'krishnatraders@bharatpay',
    txnRef: 'ONDC-99281-IND'
  },
  {
    id: 'TXN-98213',
    title: 'Received from Customer (Soundbox)',
    subtitle: 'Table QR • Rahul Sharma (UPI: rahul@okaxis)',
    amount: 200,
    type: 'credit',
    category: 'upi',
    timestamp: 'Today, 1:40 PM',
    status: 'SUCCESS',
    iconName: 'QrCode',
    vpa: 'rahul@okaxis',
    txnRef: 'NPCI-4819208491'
  },
  {
    id: 'TXN-98212',
    title: 'Mohalla Vyapar Chit Fund',
    subtitle: 'Round 4 Monthly Contribution • Digital Trust Pool',
    amount: 5000,
    type: 'debit',
    category: 'chit_fund',
    timestamp: 'Yesterday, 6:00 PM',
    status: 'SUCCESS',
    iconName: 'Users',
    vpa: 'chitpool.mohalla@bharatpay',
    txnRef: 'CHIT-BLKC-00481'
  },
  {
    id: 'TXN-98211',
    title: 'AI Smart Auto-Save SIP',
    subtitle: 'Nifty 50 Index Fund Direct • ₹100 Daily Micro-SIP',
    amount: 100,
    type: 'debit',
    category: 'investment',
    timestamp: '23 Aug, 09:00 AM',
    status: 'SUCCESS',
    iconName: 'TrendingUp',
    vpa: 'amfi.groww@bharatpay',
    txnRef: 'AMFI-88392019'
  },
  {
    id: 'TXN-98210',
    title: 'BharatPay Welcome Cashback',
    subtitle: 'UPI First Voice Transaction Reward',
    amount: 50,
    type: 'credit',
    category: 'cashback',
    timestamp: '22 Aug, 03:20 PM',
    status: 'SUCCESS',
    iconName: 'Gift',
    txnRef: 'CASHBACK-RW-101'
  }
];

export const ondcProducts: OndcProduct[] = [
  {
    id: 'PRD-1',
    name: 'Aashirvaad Shudh Chakki Atta (5 kg)',
    nameVernacular: {
      hi: 'आशीर्वाद शुद्ध चक्की आटा (5 किग्रा)',
      ta: 'ஆசிர்வாத் சுத்த சக்கி கோதுமை மாவு (5 கிலோ)',
      te: 'ఆశీర్వాద్ స్వచ్ఛమైన చక్కి పిండి (5 కిలోలు)',
      gu: 'આશીર્વાદ શુદ્ધ ચક્કી લોટ (૫ કિલો)'
    },
    category: 'groceries',
    price: 245,
    originalPrice: 285,
    unit: '5 kg pack',
    rating: 4.8,
    merchantName: 'Indore Central Kirana (Ramesh Store)',
    merchantDistanceKm: 0.6,
    merchantType: 'Kirana',
    inStock: true,
    image: '🌾',
    description: '100% whole wheat grains, zero maida, fresh from local Indore mandi.'
  },
  {
    id: 'PRD-2',
    name: 'Fortune Kachi Ghani Mustard Oil (1L)',
    nameVernacular: {
      hi: 'फॉर्च्यून कच्ची घानी सरसों का तेल (1 ली)',
      ta: 'பார்ச்சூன் கடுகு எண்ணெய் (1 லிட்டர்)',
      te: 'ఫార్చ్యూన్ ఆవ నూనె (1 లీటరు)',
      gu: 'ફોર્ચ્યુન સરસવનું તેલ (૧ લી)'
    },
    category: 'essentials',
    price: 148,
    originalPrice: 175,
    unit: '1 Litre Pouch',
    rating: 4.7,
    merchantName: 'Sharma Oil Depo (1.2 km)',
    merchantDistanceKm: 1.2,
    merchantType: 'Kirana',
    inStock: true,
    image: '🛢️',
    description: 'Cold pressed, pungent flavor, rich in natural Omega 3.'
  },
  {
    id: 'PRD-3',
    name: 'Organic Farm Fresh Tomatoes (1 kg)',
    nameVernacular: {
      hi: 'खेत से ताज़ा देसी टमाटर (1 किग्रा)',
      ta: 'இயற்கை முறையில் விளைந்த தக்காளி (1 கிலோ)',
      te: 'తాజా టమాటాలు (1 కేజీ)',
      gu: 'તાજા દેશી ટામેટા (૧ કિલો)'
    },
    category: 'farm_fresh',
    price: 35,
    originalPrice: 50,
    unit: '1 kg fresh harvest',
    rating: 4.9,
    merchantName: 'Malwa Kisan Producer Group',
    merchantDistanceKm: 2.1,
    merchantType: 'Local Farm',
    inStock: true,
    image: '🍅',
    description: 'Directly harvested this morning. 0% middleman commission on ONDC.'
  },
  {
    id: 'PRD-4',
    name: 'Amul Taaza Fresh Toned Milk (1L)',
    nameVernacular: {
      hi: 'अमूल ताज़ा टोन्ड दूध (1 ली)',
      ta: 'அமுல் புதிய பால் (1 லிட்டர்)',
      te: 'అముల్ తాజా పాలు (1 లీటరు)',
      gu: 'અમૂલ તાઝા દૂધ (૧ લી)'
    },
    category: 'dairy',
    price: 56,
    originalPrice: 58,
    unit: '1 Litre tetra',
    rating: 4.9,
    merchantName: 'Gupta Dairy & Sweets',
    merchantDistanceKm: 0.4,
    merchantType: 'Kirana',
    inStock: true,
    image: '🥛',
    description: 'Pasteurised homogenized toned milk, delivered within 15 minutes.'
  },
  {
    id: 'PRD-5',
    name: 'Tata Sampann Unpolished Toor Dal (1 kg)',
    nameVernacular: {
      hi: 'टाटा सम्पन्न अनपॉलिश अरहर दाल (1 किग्रा)',
      ta: 'டாட்டா சம்பன் துவரம் பருப்பு (1 கிலோ)',
      te: 'టాటా సంపన్ కందిపప్పు (1 కేజీ)',
      gu: 'ટાટા સંપન્ન તુવેર દાળ (૧ કિલો)'
    },
    category: 'groceries',
    price: 165,
    originalPrice: 195,
    unit: '1 kg zipper bag',
    rating: 4.6,
    merchantName: 'Indore Central Kirana',
    merchantDistanceKm: 0.6,
    merchantType: 'Kirana',
    inStock: true,
    image: '🥣',
    description: 'High protein, unpolished, retaining natural dietary fibre.'
  },
  {
    id: 'PRD-6',
    name: 'MDH Deggi Mirch Powder (100g)',
    nameVernacular: {
      hi: 'एमडीएच देगी मिर्च पाउडर (100 ग्रा)',
      ta: 'எம்டிஹெச் மிளகாய் தூள் (100 கிராம்)',
      te: 'ఎండీహెచ్ మిరప పొడి (100 గ్రా)',
      gu: 'એમડીએચ મરચું પાવડર (૧૦૦ ગ્રા)'
    },
    category: 'spices',
    price: 82,
    originalPrice: 90,
    unit: '100g box',
    rating: 4.8,
    merchantName: 'Mahalaxmi Spices',
    merchantDistanceKm: 1.5,
    merchantType: 'Wholesale Trader',
    inStock: true,
    image: '🌶️',
    description: 'Gives rich red color and balanced mild spice.'
  }
];

export const chitFundGroups: ChitFundGroup[] = [
  {
    id: 'CHIT-MOHALLA-50K',
    name: 'Mohalla Vyapar Mandal Trust Group',
    totalCorpus: 50000,
    membersCount: 10,
    maxMembers: 10,
    monthlyContribution: 5000,
    durationMonths: 10,
    currentMonth: 4,
    status: 'bidding_open',
    nextAuctionDate: 'Live Bidding Now',
    lastBidWinner: 'Mahesh Cloth Store (Bid: ₹44,200)',
    lastDividendAmount: 580,
    mutualFundYieldEarned: 1450,
    isMember: true,
    category: 'Mohalla Vyapar'
  },
  {
    id: 'CHIT-KIRANA-1L',
    name: 'Indore Kirana Union Chit Fund 2.0',
    totalCorpus: 100000,
    membersCount: 20,
    maxMembers: 20,
    monthlyContribution: 5000,
    durationMonths: 20,
    currentMonth: 8,
    status: 'active',
    nextAuctionDate: '28 August 2026',
    lastBidWinner: 'Ramesh Gupta (Bid: ₹91,000)',
    lastDividendAmount: 450,
    mutualFundYieldEarned: 3820,
    isMember: true,
    category: 'Kirana Union'
  },
  {
    id: 'CHIT-SHAADI-2L',
    name: 'Mahila Bachat & Shaadi Gold Fund',
    totalCorpus: 200000,
    membersCount: 20,
    maxMembers: 20,
    monthlyContribution: 10000,
    durationMonths: 20,
    currentMonth: 2,
    status: 'active',
    nextAuctionDate: '01 September 2026',
    lastBidWinner: 'Sangeeta Ben (Bid: ₹1,82,000)',
    lastDividendAmount: 900,
    mutualFundYieldEarned: 2100,
    isMember: false,
    category: 'Shaadi Fund'
  }
];

export const investmentAssets: InvestmentAsset[] = [
  {
    id: 'INV-GOLD-24K',
    name: '99.99% Pure 24K Digital Gold (MMTC-PAMP)',
    type: 'digital_gold',
    currentPrice: 7480,
    cagr3Yr: 18.4,
    risk: 'Low',
    minInvestment: 100,
    returns1Yr: 21.2,
    isin: 'INF999GOLD01',
    description: 'Insured in secure IDBI vaults. Instant 100% liquidity or convert to physical coin anytime.',
    icon: '🪙'
  },
  {
    id: 'INV-NIFTY-DIR',
    name: 'Nippon India Nifty 50 Direct Index Plan',
    type: 'mutual_fund',
    currentPrice: 284.5,
    cagr3Yr: 16.8,
    risk: 'Moderate',
    minInvestment: 100,
    returns1Yr: 19.4,
    isin: 'INF204K01UN6',
    description: '0% distributor commission. India’s top 50 bluechip companies basket.',
    icon: '📈'
  },
  {
    id: 'INV-PARAG-FLEXI',
    name: 'Parag Parikh Flexi Cap Direct Growth',
    type: 'mutual_fund',
    currentPrice: 88.2,
    cagr3Yr: 22.1,
    risk: 'Moderate',
    minInvestment: 500,
    returns1Yr: 25.6,
    isin: 'INF879O01019',
    description: 'Diversified across large, mid-cap, and global tech leaders.',
    icon: '📊'
  },
  {
    id: 'INV-SILVER-DIR',
    name: 'Digital Silver 99.9% Vaulted',
    type: 'silver',
    currentPrice: 88.5,
    cagr3Yr: 19.2,
    risk: 'Moderate',
    minInvestment: 100,
    returns1Yr: 24.1,
    isin: 'INF999SLVR02',
    description: 'Backed by physical silver bars in secured vaults.',
    icon: '🥈'
  },
  {
    id: 'INV-NPS-TIER1',
    name: 'National Pension System (NPS Tier 1 Auto)',
    type: 'nps',
    currentPrice: 54.1,
    cagr3Yr: 12.8,
    risk: 'Low',
    minInvestment: 500,
    returns1Yr: 13.9,
    isin: 'INFNPS000101',
    description: 'Government backed retirement corpus with additional ₹50,000 tax deduction under 80CCD(1B).',
    icon: '🏛️'
  }
];

export const shikshaLessons: ShikshaLesson[] = [
  {
    id: 'SHK-1',
    title: 'UPI Kya Hai Aur Surakshit Kaise Use Karein?',
    titleVernacular: {
      hi: 'UPI क्या है और सुरक्षित कैसे उपयोग करें?',
      ta: 'UPI என்றால் என்ன? பாதுகாப்பாக பயன்படுத்துவது எப்படி?',
      te: 'UPI అంటే ఏమిటి? సురక్షితంగా ఎలా ఉపయోగించాలి?',
      gu: 'UPI શું છે અને સુરક્ષિત રીતે કેવી રીતે વાપરવું?'
    },
    category: 'UPI Basics',
    durationMins: 2,
    coinsReward: 50,
    completed: true,
    quiz: {
      question: 'Kya kisi se paise RECEIVE karne ke liye UPI PIN daalna padta hai?',
      options: ['Haan, PIN zaroori hai', 'Nahi! PIN sirf paise BHEJNE ke liye hota hai', 'Bank par depend karta hai', 'Sirf Sunday ko'],
      correctIndex: 1,
      explanation: 'Sahi Jawab! UPI PIN sirf aapke account se paise katne (send karne) ke liye lagta hai. Paise paane ke liye PIN kabhi na daalein!'
    }
  },
  {
    id: 'SHK-2',
    title: 'Credit Score Kya Hota Hai Aur Loan Kaise Milta Hai?',
    titleVernacular: {
      hi: 'क्रेडिट स्कोर क्या है और 30 सेकंड में लोन कैसे मिलता है?',
      ta: 'கிரெடிட் ஸ்கோர் என்றால் என்ன? கடன் பெறுவது எப்படி?',
      te: 'క్రెడిట్ స్కోర్ అంటే ఏమిటి? లోన్ ఎలా పొందాలి?',
      gu: 'ક્રેડિટ સ્કોર શું છે અને લોન કેવી રીતે મળે?'
    },
    category: 'Credit & Loans',
    durationMins: 3,
    coinsReward: 75,
    completed: false,
    quiz: {
      question: 'Bharat Credit Score me aapka score kis cheez se badhta hai?',
      options: ['Time par UPI bill payments aur QR business se', 'Phone band rakhne se', 'Loans default karne se', 'Sirf cash use karne se'],
      correctIndex: 0,
      explanation: 'Sahi! Regular UPI transactions aur time par bill bharne se Bharat Credit Score 750+ ho jata hai aur bina paper ke loan milta hai.'
    }
  },
  {
    id: 'SHK-3',
    title: 'Digital Gold vs Physical Gold: Kaunsa Behtar Hai?',
    titleVernacular: {
      hi: 'डिजिटल सोना बनाम फिजिकल सोना: कौन सा बेहतर है?',
      ta: 'டிஜிட்டல் தங்கம் vs நேரடி தங்கம்: எது சிறந்தது?',
      te: 'డిజిటల్ గోల్డ్ vs సాధారణ బంగారం: ఏది మంచిది?',
      gu: 'ડિજિટલ સોનું વિરુદ્ધ ફિઝિકલ સોનું: કયું શ્રેષ્ઠ છે?'
    },
    category: 'Investments',
    durationMins: 3,
    coinsReward: 100,
    completed: false,
    quiz: {
      question: 'BharatPay me Digital Gold lene ka sabse bada fayda kya hai?',
      options: ['Sirf ₹100 se shuru kar sakte hain aur 0% making charges', 'Ghar me chori ka darr nahi', '24K 99.99% certified purity', 'Ye sabhi fayde hain (All of the above)'],
      correctIndex: 3,
      explanation: 'Bilkul sahi! Digital Gold me 0% making charge hota hai, safe vault storage milta hai aur ₹100 se SIP shuru ho sakti hai.'
    }
  },
  {
    id: 'SHK-4',
    title: 'AI Deepfake Call aur Fake SMS Scams se Kaise Bachein?',
    titleVernacular: {
      hi: 'AI डीपफेक आवाज और फर्जी SMS फ्रॉड से कैसे बचें?',
      ta: 'AI போலி அழைப்புகள் மற்றும் SMS மோசடிகளிலிருந்து தப்பிப்பது எப்படி?',
      te: 'AI డీప్‌ఫేక్ కాల్స్ మరియు నకిలీ SMS స్కామ్‌ల నుండి రక్షణ ఎలా?',
      gu: 'AI ડીપફેક કોલ અને નકલી SMS થી કેવી રીતે બચવું?'
    },
    category: 'Fraud Protection',
    durationMins: 4,
    coinsReward: 150,
    completed: false,
    quiz: {
      question: 'Agar koi call karke bole "Aapka relative hospital me hai, turant paise bhejo" toh kya karein?',
      options: ['Bina check kiye turant bhej do', 'Call kaat kar seedhe relative ko direct number par call karke verify karein', 'Bank details share karein', 'OTP bol do'],
      correctIndex: 1,
      explanation: 'Smart move! Scammers AI se relative ki aawaz clone kar sakte hain. Hamesha pehle call cut karke apne relative ko direct call karein.'
    }
  }
];

export const mockFraudAlerts: FraudAlert[] = [
  {
    id: 'FRD-101',
    type: 'phishing_link',
    title: 'Suspicious Electricity Bill SMS Blocked',
    description: 'Blocked URL: "http://bescom-bill-update-quick.xyz/pay"',
    riskLevel: 'CRITICAL',
    timestamp: '10 mins ago',
    details: 'AI URL Scanner detected unverified domain posing as BESCOM state utility. Automated SMS quarantine applied.',
    actionTaken: 'Link neutralized and added to SEBI/NPCI Community Threat DB.'
  },
  {
    id: 'FRD-102',
    type: 'deepfake_voice',
    title: 'Vishing Voice Cloned Anomaly Alert',
    description: 'Synthetic frequency pattern detected on incoming call from +91-98102XXXXX',
    riskLevel: 'HIGH',
    timestamp: '2 hours ago',
    details: 'SEBI TechSprint AI Neural Voice Analyzer flagged 94.2% probability of synthetic TTS voice clone pretending to be bank manager.',
    actionTaken: 'Caller ID flagged with red alert badge "Suspected AI Voice Scam".'
  },
  {
    id: 'FRD-103',
    type: 'suspicious_qr',
    title: 'Tampered QR Code Intercepted',
    description: 'QR payload attempted to invoke Collect Request instead of Merchant Pay',
    riskLevel: 'CRITICAL',
    timestamp: 'Yesterday',
    details: 'Smart UPI Engine detected malicious auto-debit trigger payload. User shielded from ₹4,999 unauthorized debit.',
    actionTaken: 'Transaction blocked before PIN prompt.'
  }
];

export const phygitalKiosks = [
  {
    id: 'KIOSK-IND-01',
    name: 'Indore Sarafa Bazaar Saathi Kiosk',
    agentName: 'Vikram Choudhary (Certified Ambassador #442)',
    address: 'Shop 14, Sarafa Chowk, Indore (MP)',
    distanceKm: 0.8,
    services: ['Aadhaar eKYC Onboarding', 'Assisted Voice Commerce', 'Cash-In / Cash-Out', 'Digital Gold Delivery'],
    rating: 4.9,
    phone: '+91 98260 11234',
    status: 'Open Now'
  },
  {
    id: 'KIOSK-IND-02',
    name: 'Rajwada Kirana Micro-Branch',
    agentName: 'Sunita Sharma (Mahila SHG Lead)',
    address: 'Near Old Post Office, Rajwada, Indore',
    distanceKm: 1.4,
    services: ['Chit Fund Assistance', 'Crop Insurance Signup', 'Feature Phone IVR Setup', 'Micro-Loan Documentation'],
    rating: 4.8,
    phone: '+91 94250 88231',
    status: 'Open Now'
  }
];
