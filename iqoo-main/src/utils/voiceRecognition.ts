import { Language } from '../types';

export interface ParsedVoiceIntent {
  intent: 'SEND_MONEY' | 'BUY_PRODUCT' | 'CHECK_BALANCE' | 'CHECK_LOAN' | 'INVEST_GOLD' | 'PAY_BILL' | 'UNKNOWN';
  rawTranscript: string;
  entities: {
    amount?: number;
    recipient?: string;
    productName?: string;
    quantity?: string;
    billerName?: string;
  };
  confidence: number;
  confirmationPrompt: string;
}

export function parseFinancialSpeech(transcript: string, _lang: Language = 'en'): ParsedVoiceIntent {
  const text = transcript.toLowerCase().trim();
  const isEn = _lang === 'en';

  // Pattern 1: Send Money (e.g., "₹200 bhejo Rahul ko", "send 500 to priya", "rahul ku 200 anupu", "500 bhejna hai ram ko")
  const amountMatch = text.match(/(?:rs\.?|inr|₹|rupaye|rupees)?\s*(\d+)\s*(?:rs\.?|inr|₹|rupaye|rupees)?/i);
  const amount = amountMatch ? parseInt(amountMatch[1], 10) : undefined;

  const isSendMoney = 
    text.includes('bhej') || 
    text.includes('send') || 
    text.includes('transfer') || 
    text.includes('pay') ||
    text.includes('anupu') || 
    text.includes('pampu') || 
    text.includes('moklo') ||
    text.includes('pathao');

  if (isSendMoney && amount) {
    let recipient = 'Rahul Sharma';
    if (text.includes('priya')) recipient = 'Priya Sundaram';
    else if (text.includes('ramesh')) recipient = 'Ramesh Kirana';
    else if (text.includes('lakshmi') || text.includes('laxmi')) recipient = 'Lakshmi Ammal';
    else if (text.includes('amit')) recipient = 'Amit Patel';
    else if (text.includes('rahul')) recipient = 'Rahul Sharma';
    else if (text.includes('mummy') || text.includes('mom')) recipient = 'Maa (Home)';
    else if (text.includes('sharma')) recipient = 'Sharma Kirana Store';

    return {
      intent: 'SEND_MONEY',
      rawTranscript: transcript,
      entities: {
        amount,
        recipient
      },
      confidence: 0.96,
      confirmationPrompt: isEn 
        ? `Send ₹${amount} to ${recipient}? Tap Confirm to proceed with instant UPI.` 
        : `${recipient} ko ₹${amount} bhejna hai? Kya aap confirm karte hain?`
    };
  }

  // Pattern 2: Buy Product (e.g., "5kg Atta chahiye", "buy mustard oil", "doodh mangwao", "atta kharido")
  const isBuyCommerce = 
    text.includes('atta') || 
    text.includes('oil') || 
    text.includes('tel') || 
    text.includes('milk') || 
    text.includes('doodh') || 
    text.includes('tamatar') || 
    text.includes('tomato') || 
    text.includes('dal') || 
    text.includes('buy') || 
    text.includes('kharid') || 
    text.includes('chahiye') || 
    text.includes('order');

  if (isBuyCommerce) {
    let productName = 'Aashirvaad Shudh Chakki Atta (5 kg)';
    let quantity = '1 Pack';

    if (text.includes('oil') || text.includes('tel') || text.includes('mustard')) {
      productName = 'Fortune Kachi Ghani Mustard Oil (1L)';
    } else if (text.includes('milk') || text.includes('doodh')) {
      productName = 'Amul Taaza Fresh Toned Milk (1L)';
    } else if (text.includes('tamatar') || text.includes('tomato')) {
      productName = 'Organic Farm Fresh Tomatoes (1 kg)';
    } else if (text.includes('dal') || text.includes('toor')) {
      productName = 'Tata Sampann Unpolished Toor Dal (1 kg)';
    }

    return {
      intent: 'BUY_PRODUCT',
      rawTranscript: transcript,
      entities: {
        productName,
        quantity
      },
      confidence: 0.94,
      confirmationPrompt: isEn 
        ? `Order ${productName} via ONDC? Hyperlocal 15-min delivery from local kirana!`
        : `ONDC se ${productName} order karein? Local kirana se 15 min me delivery!`
    };
  }

  // Pattern 3: Invest in Gold (e.g., "100 rupaye ka gold kharido", "invest 500 in digital gold")
  if (text.includes('gold') || text.includes('sona') || text.includes('silver') || text.includes('chandi')) {
    return {
      intent: 'INVEST_GOLD',
      rawTranscript: transcript,
      entities: {
        amount: amount || 500,
        productName: text.includes('silver') ? '99.9% Digital Silver' : '24K 99.99% Digital Gold'
      },
      confidence: 0.95,
      confirmationPrompt: isEn
        ? `Invest ₹${amount || 500} in 24K Digital Gold? Safely stored in insured IDBI Trustee vaults.`
        : `₹${amount || 500} ka 24K Digital Gold purchase karein? IDBI Trust Vault me store hoga.`
    };
  }

  // Pattern 4: Check Loan / Credit
  if (text.includes('loan') || text.includes('credit') || text.includes('karz') || text.includes('limit')) {
    return {
      intent: 'CHECK_LOAN',
      rawTranscript: transcript,
      entities: {},
      confidence: 0.98,
      confirmationPrompt: isEn
        ? 'Your Bharat Credit Score is 742 (Good). Pre-approved collateral-free loan up to ₹1,50,000 available.'
        : 'Aapka Bharat Credit Score 742 hai. Instant ₹1,50,000 pre-approved loan available hai bina collateral ke.'
    };
  }

  // Pattern 5: Check Balance
  if (text.includes('balance') || text.includes('paisa') || text.includes('kitna') || text.includes('status')) {
    return {
      intent: 'CHECK_BALANCE',
      rawTranscript: transcript,
      entities: {},
      confidence: 0.97,
      confirmationPrompt: isEn
        ? 'Your Total Bharat Wallet Balance is ₹42,850, and UPI Lite offline balance is ₹450.'
        : 'Aapke Bharat Wallet me kul ₹42,850 aur UPI Lite me ₹450 available hai.'
    };
  }

  return {
    intent: 'UNKNOWN',
    rawTranscript: transcript,
    entities: {},
    confidence: 0.70,
    confirmationPrompt: isEn
      ? `You said: "${transcript}". Would you like to ask AI Financial Saathi about this?`
      : `Aapne bola: "${transcript}". Kya aap iske baare me AI Saathi se poochna chahte hain?`
  };
}
