import React, { useState } from 'react';
import { 
  Users, 
  Gavel, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  HelpCircle,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChitFundGroup, UserPersona, Language, Transaction } from '../../types';
import { soundEngine } from '../../utils/audio';

interface ChitFundsTabProps {
  persona: UserPersona;
  currentLang: Language;
  groups: ChitFundGroup[];
  onAddTransaction: (txn: Transaction) => void;
}

export const ChitFundsTab: React.FC<ChitFundsTabProps> = ({
  persona,
  currentLang: _currentLang,
  groups,
  onAddTransaction
}) => {
  const [activeTab, setActiveTab] = useState<'my_groups' | 'explore' | 'create'>('my_groups');
  const [biddingGroup, setBiddingGroup] = useState<ChitFundGroup | null>(null);
  const [myBidAmount, setMyBidAmount] = useState<number>(44500);
  const [biddingLiveTimer, setBiddingLiveTimer] = useState<number>(45);
  const [liveBids, setLiveBids] = useState<Array<{ name: string; amount: number; time: string }>>([
    { name: 'Mahesh Cloth Store', amount: 46000, time: '2m ago' },
    { name: 'Suresh Electric Works', amount: 45200, time: '1m ago' },
    { name: 'Ramesh Gupta (Kirana)', amount: 44500, time: 'Just now' },
  ]);
  const [auctionWon, setAuctionWon] = useState<boolean>(false);

  // New Group Form State
  const [newGroupName, setNewGroupName] = useState<string>('Bhopal Traders Chit Group');
  const [newGroupCorpus, setNewGroupCorpus] = useState<number>(50000);
  const [newGroupMembers, setNewGroupMembers] = useState<number>(10);
  const [newGroupSuccess, setNewGroupSuccess] = useState<boolean>(false);

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biddingGroup) return;

    soundEngine.playAuctionHammer();
    const newBid = {
      name: `${persona.name} (${persona.role.split(' ')[0]})`,
      amount: myBidAmount,
      time: 'Just now'
    };

    setLiveBids([newBid, ...liveBids]);

    // Simulate winning if lowest discount bid
    if (myBidAmount <= 44000) {
      setTimeout(() => {
        setAuctionWon(true);
        soundEngine.playSuccessChime();
        try {
          confetti({ particleCount: 70, spread: 60 });
        } catch {}

        const dividendPerMember = Math.round((biddingGroup.totalCorpus - myBidAmount) / biddingGroup.membersCount);
        const newTxn: Transaction = {
          id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
          title: `Chit Fund Auction Payout (${biddingGroup.name})`,
          subtitle: `Winning Bid: ₹${myBidAmount} • Dividend Distributed: ₹${dividendPerMember}/member`,
          amount: myBidAmount,
          type: 'credit',
          category: 'chit_fund',
          timestamp: 'Just now',
          status: 'SUCCESS',
          iconName: 'Award',
          txnRef: `CHIT-BLKC-${Date.now().toString().slice(-6)}`
        };
        onAddTransaction(newTxn);
      }, 1500);
    }
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    setNewGroupSuccess(true);
    soundEngine.playSuccessChime();

    setTimeout(() => {
      setNewGroupSuccess(false);
      setActiveTab('my_groups');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/30">
              Chit Funds 2.0 Digitization
            </span>
            <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
              ✓ Smart Contract Trust • ₹10L+ Cr Market
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-100">
            Community Vyapar Groups & Reverse Auction Bidding
          </h2>
          <p className="text-xs text-slate-400">
            Save together with trusted mohalla peers, borrow at transparent auction rates, and earn mutual fund yield on idle float.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('create')}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Start Mohalla Chit Group</span>
        </button>
      </div>

      {/* 3 Core Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-purple-300">Blockchain Trust Ledger</div>
            <div className="text-[11px] text-slate-400">100% transparent audit of all bids & payouts</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-300">Float Yield in Liquid MFs</div>
            <div className="text-[11px] text-slate-400">Earn +7.2% extra returns on idle monthly corpus</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300">Auto-UPI AutoPay</div>
            <div className="text-[11px] text-slate-400">Zero default hassle, automated monthly collection</div>
          </div>
        </div>
      </div>

      {/* Group Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-100 text-sm">
            Active Community Chit Groups ({groups.length})
          </h3>
          <span className="text-xs text-purple-400 font-semibold">Registered under Chit Funds Act</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((grp) => (
            <div 
              key={grp.id}
              className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-purple-500/40 bg-slate-950/85 transition flex flex-col justify-between shadow-xl group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {grp.category}
                  </span>
                  {grp.status === 'bidding_open' ? (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                      🔴 Live Bidding Open
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400">
                      Month {grp.currentMonth} / {grp.durationMonths}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-base text-slate-100 group-hover:text-purple-300 transition">
                  {grp.name}
                </h4>

                <div className="my-3 p-3 rounded-2xl bg-slate-900 border border-slate-850 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Total Group Corpus:</span>
                    <span className="font-black text-slate-100">₹{grp.totalCorpus.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Monthly Contribution:</span>
                    <span className="font-bold text-purple-300">₹{grp.monthlyContribution.toLocaleString('en-IN')} / mo</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Extra MF Yield Earned:</span>
                    <span className="font-bold text-emerald-400">+₹{grp.mutualFundYieldEarned}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  Last Winner: <span className="text-slate-300 font-semibold">{grp.lastBidWinner}</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-850">
                {grp.status === 'bidding_open' ? (
                  <button
                    onClick={() => {
                      setBiddingGroup(grp);
                      setAuctionWon(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 transition active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Gavel className="w-4 h-4" />
                    <span>Enter Live Reverse Auction</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setBiddingGroup(grp);
                      setAuctionWon(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-purple-300 border border-purple-500/30 font-bold text-xs transition"
                  >
                    View Group Ledger & Trust Score
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Auction Bidding Modal */}
      {biddingGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl glass-panel bg-slate-950 border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-slate-100 text-base">
                  Live Reverse Auction: {biddingGroup.name}
                </h3>
              </div>
              <button 
                onClick={() => setBiddingGroup(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {auctionWon ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-3xl">
                  🏆
                </div>
                <h4 className="text-lg font-black text-slate-100">
                  Congratulations! You Won the Auction!
                </h4>
                <p className="text-xs text-emerald-300 font-semibold">
                  Winning Bid: ₹{myBidAmount.toLocaleString('en-IN')} payout disbursed to your linked bank account!
                </p>
                <p className="text-[11px] text-slate-400">
                  Total Dividend Saved for Group: ₹{(biddingGroup.totalCorpus - myBidAmount).toLocaleString('en-IN')} (Distributed to 10 members)
                </p>
                <button
                  onClick={() => setBiddingGroup(null)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
                >
                  Close Auction
                </button>
              </div>
            ) : (
              <div className="my-4 space-y-4 text-xs">
                
                {/* Live Auction Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400">Total Corpus</span>
                    <div className="font-bold text-slate-100 text-sm">₹{biddingGroup.totalCorpus.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400">Lowest Bid So Far</span>
                    <div className="font-bold text-purple-300 text-sm">₹44,500</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400">Time Left</span>
                    <div className="font-bold text-red-400 text-sm">{biddingLiveTimer}s</div>
                  </div>
                </div>

                {/* Place Reverse Bid Form */}
                <form onSubmit={handlePlaceBid} className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Your Reverse Auction Bid Amount (₹)
                    </label>
                    <p className="text-[10px] text-slate-400 mb-2">
                      In a reverse auction, the member accepting the lowest payout gets the immediate cash, and the discount becomes the dividend for everyone else.
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="35000"
                        max={biddingGroup.totalCorpus}
                        step="500"
                        value={myBidAmount}
                        onChange={(e) => setMyBidAmount(Number(e.target.value))}
                        className="flex-1 bg-slate-950 border border-slate-700 focus:border-purple-500 rounded-xl px-3 py-2 text-base font-bold text-purple-300 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setMyBidAmount(Math.max(35000, myBidAmount - 500))}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold"
                      >
                        -₹500
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-purple-500/25 transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Gavel className="w-4 h-4" />
                    <span>Place Bid of ₹{myBidAmount.toLocaleString('en-IN')}</span>
                  </button>
                </form>

                {/* Live Real-Time Bidding Log */}
                <div>
                  <h5 className="font-bold text-slate-300 text-xs mb-2">Live Bids Stream:</h5>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {liveBids.map((bid, i) => (
                      <div key={i} className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{bid.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-purple-300">₹{bid.amount.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{bid.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* Create New Group Modal/View */}
      {activeTab === 'create' && (
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 bg-slate-950/90 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-slate-100 text-base">Create a Verified Digital Chit Fund Group</h3>
            </div>
            <button 
              onClick={() => setActiveTab('my_groups')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          {newGroupSuccess ? (
            <div className="p-6 text-center text-emerald-300 font-bold text-sm">
              ✓ New Chit Fund Group Registered on Smart Contract Ledger!
            </div>
          ) : (
            <form onSubmit={handleCreateGroup} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Group Name</label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Total Target Pool (₹)</label>
                  <input
                    type="number"
                    value={newGroupCorpus}
                    onChange={(e) => setNewGroupCorpus(Number(e.target.value))}
                    step="10000"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Total Members</label>
                  <input
                    type="number"
                    value={newGroupMembers}
                    onChange={(e) => setNewGroupMembers(Number(e.target.value))}
                    min="5"
                    max="25"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div>Monthly installment per member: <span className="font-bold text-slate-200">₹{Math.round(newGroupCorpus / newGroupMembers)}/mo</span></div>
                <div>Chit duration: <span className="font-bold text-slate-200">{newGroupMembers} Months</span></div>
                <div>Automated collections: <span className="text-emerald-400">NPCI UPI AutoPay Active</span></div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-lg shadow-purple-500/20 active:scale-95 transition"
              >
                Create Group & Invite Members via WhatsApp
              </button>
            </form>
          )}
        </div>
      )}

    </div>
  );
};
