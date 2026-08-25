import React, { useState } from 'react';
import { 
  Store, 
  ShoppingCart, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  Search, 
  Plus, 
  Minus, 
  ArrowRight,
  TrendingDown,
  Navigation,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { OndcProduct, CartItem, Language, UserPersona, Transaction } from '../../types';
import { translations } from '../../data/translations';
import { soundEngine } from '../../utils/audio';

interface OndcCommerceTabProps {
  persona: UserPersona;
  currentLang: Language;
  products: OndcProduct[];
  cart: CartItem[];
  onAddToCart: (product: OndcProduct) => void;
  onUpdateCartQty: (productId: string, delta: number) => void;
  onClearCart: () => void;
  onAddTransaction: (txn: Transaction) => void;
  onOpenVoiceModal: () => void;
}

export const OndcCommerceTab: React.FC<OndcCommerceTabProps> = ({
  persona,
  currentLang,
  products,
  cart,
  onAddToCart,
  onUpdateCartQty,
  onClearCart,
  onAddTransaction,
  onOpenVoiceModal
}) => {
  const t = translations[currentLang] || translations.en;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<any | null>(null);
  const [deliveryStep, setDeliveryStep] = useState<number>(1); // 1: Placed, 2: Packing, 3: On The Way, 4: Delivered

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'groceries', label: '🌾 Atta, Rice & Dal' },
    { id: 'dairy', label: '🥛 Milk & Dairy' },
    { id: 'farm_fresh', label: '🍅 Farm Fresh Veggies' },
    { id: 'essentials', label: '🛢️ Oils & Ghee' },
    { id: 'spices', label: '🌶️ Desi Masale' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const nameLocalized = p.nameVernacular[currentLang] || p.name;
    const matchesSearch = nameLocalized.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartSavings = cart.reduce((acc, item) => acc + (item.product.originalPrice - item.product.price) * item.quantity, 0);
  const ondcDeliveryFee = cartSubtotal > 300 ? 0 : 25;
  const grandTotal = cartSubtotal + ondcDeliveryFee;

  const handlePlaceOrder = (paymentMethod: 'UPI' | 'PAY_LATER') => {
    const orderId = `ONDC-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      title: `ONDC Kirana Order (${cart.length} items)`,
      subtitle: `${cart.map(c => c.product.name.split(' ')[0]).join(', ')} • ${paymentMethod}`,
      amount: grandTotal,
      type: 'debit',
      category: 'commerce',
      timestamp: 'Just now',
      status: 'SUCCESS',
      iconName: 'ShoppingBag',
      txnRef: orderId
    };

    onAddTransaction(newTxn);
    soundEngine.playSuccessChime();
    soundEngine.speakSoundboxAnnouncement(grandTotal, currentLang);

    setActiveTrackingOrder({
      id: orderId,
      itemsCount: cart.reduce((a, b) => a + b.quantity, 0),
      total: grandTotal,
      kiranaName: 'Indore Central Kirana (Ramesh Store)',
      etaMinutes: 12,
      deliveryBoy: 'Sanjay Verma (+91 98261 44556)'
    });

    setDeliveryStep(1);
    setIsCheckoutOpen(false);
    onClearCart();

    // Simulate real-time delivery GPS progression
    setTimeout(() => setDeliveryStep(2), 3000);
    setTimeout(() => setDeliveryStep(3), 7000);
    setTimeout(() => setDeliveryStep(4), 14000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* ONDC Government Protocol Value Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
              Government-Backed ONDC Network
            </span>
            <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Hyperlocal 2km Radius • Supporting Kirana
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-100">
            Direct from Local Shops — 0% Platform Commission
          </h2>
          <p className="text-xs text-slate-400">
            Why pay 25% extra markups on Quick Commerce apps? Buy straight from your neighborhood kirana store.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={onOpenVoiceModal}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>"Bolo aur Kharido" (Voice Search)</span>
          </button>
          
          {cart.length > 0 && (
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart ({cart.reduce((a, b) => a + b.quantity, 0)}) • ₹{grandTotal}</span>
            </button>
          )}
        </div>
      </div>

      {/* 0% Commission Comparison Widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-300">0% Commission to Kirana</div>
            <div className="text-[11px] text-slate-400">100% of your money goes to local shopkeeper</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300">15-Minute Local Delivery</div>
            <div className="text-[11px] text-slate-400">Hyperlocal dispatch from within 1.5 km radius</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-blue-300">Merchant Credit Scoring</div>
            <div className="text-[11px] text-slate-400">Every order boosts merchant's loan eligibility</div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Atta, Mustard Oil, Milk, Fresh Farm Veggies..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((prod) => {
          const inCartItem = cart.find(c => c.product.id === prod.id);
          const localizedName = prod.nameVernacular[currentLang] || prod.name;

          return (
            <div 
              key={prod.id} 
              className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-amber-500/40 bg-slate-950/85 transition flex flex-col justify-between shadow-lg group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl shadow-inner">
                    {prod.image}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                    📍 {prod.merchantDistanceKm} km • {prod.merchantType}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition line-clamp-1">
                  {localizedName}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  {prod.description}
                </p>
                <div className="text-[11px] text-slate-500 font-medium mt-1">
                  Sold by: <span className="text-slate-300 font-semibold">{prod.merchantName}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-slate-100">₹{prod.price}</span>
                    <span className="text-xs text-slate-500 line-through">₹{prod.originalPrice}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    Save ₹{prod.originalPrice - prod.price} ({Math.round(((prod.originalPrice - prod.price)/prod.originalPrice)*100)}% off)
                  </span>
                </div>

                {inCartItem ? (
                  <div className="flex items-center gap-2 bg-slate-900 border border-amber-500/40 rounded-xl px-2 py-1">
                    <button 
                      onClick={() => onUpdateCartQty(prod.id, -1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-amber-300 px-1">{inCartItem.quantity}</span>
                    <button 
                      onClick={() => onUpdateCartQty(prod.id, 1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddToCart(prod)}
                    className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/10 active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Active Delivery Tracker Card */}
      {activeTrackingOrder && (
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 bg-slate-950/90 shadow-2xl animate-slideUp">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live ONDC Hyperlocal Tracking
              </span>
              <h3 className="font-extrabold text-base text-slate-100 mt-1">
                Order #{activeTrackingOrder.id} • Arriving in ~{deliveryStep === 4 ? '0' : activeTrackingOrder.etaMinutes} mins
              </h3>
              <p className="text-xs text-slate-400">
                Kirana: {activeTrackingOrder.kiranaName} • Rider: {activeTrackingOrder.deliveryBoy}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Total Paid</span>
              <div className="text-base font-black text-emerald-400">₹{activeTrackingOrder.total}</div>
            </div>
          </div>

          {/* Stepper Progression */}
          <div className="grid grid-cols-4 gap-2 my-5 text-center text-xs">
            <div className={`p-2.5 rounded-xl border ${deliveryStep >= 1 ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              ✓ 1. Placed
            </div>
            <div className={`p-2.5 rounded-xl border ${deliveryStep >= 2 ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              📦 2. Packing
            </div>
            <div className={`p-2.5 rounded-xl border ${deliveryStep >= 3 ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-bold animate-pulse' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              🛵 3. On Way
            </div>
            <div className={`p-2.5 rounded-xl border ${deliveryStep >= 4 ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              🎉 4. Delivered
            </div>
          </div>

          {/* Mock GPS Map View */}
          <div className="relative h-28 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 flex items-center gap-6 text-xs font-bold text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-slate-700">
                <span>🏪 Indore Kirana</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 animate-pulse">
                <span>- - - 🛵 - - -</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-emerald-500/50 text-emerald-300">
                <span>📍 Your Home ({persona.name.split(' ')[0]})</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart & Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg glass-panel bg-slate-950 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-base">ONDC Local Kirana Cart</h3>
              </div>
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-slate-850 my-4 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.product.image}</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{item.product.name}</h4>
                      <p className="text-[10px] text-slate-400">₹{item.product.price} × {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">₹{item.product.price * item.quantity}</span>
                    <button 
                      onClick={() => onUpdateCartQty(item.product.id, -item.quantity)}
                      className="text-[10px] text-red-400 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2 mb-4">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal:</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Kirana Direct Savings:</span>
                <span>-₹{cartSavings}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Hyperlocal Delivery Fee:</span>
                <span>{ondcDeliveryFee === 0 ? 'FREE (Orders > ₹300)' : `₹${ondcDeliveryFee}`}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-slate-100">
                <span>To Pay:</span>
                <span className="text-amber-400">₹{grandTotal}</span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-2">
              <button
                onClick={() => handlePlaceOrder('UPI')}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span>Pay ₹{grandTotal} with Bharat UPI (Instant)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handlePlaceOrder('PAY_LATER')}
                className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-blue-400 border border-blue-500/30 font-semibold text-xs transition"
              >
                Buy Now, Pay in 30 Days (Bharat Pay Later - 0% Interest)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
