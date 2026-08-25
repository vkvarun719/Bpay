import React, { useState, useEffect } from 'react';
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
  Award,
  Link,
  Lock,
  Layers,
  Coins
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
  const [activeTab, setActiveTab] = useState<'my_groups' | 'explore' | 'create' | 'ledger'>('my_groups');
  const [biddingGroup, setBiddingGroup] = useState<ChitFundGroup | null>(null);
  const [myBidAmount, setMyBidAmount] = useState<number>(43000);
  const [biddingLiveTimer, setBiddingLiveTimer] = useState<number>(25);
  const [isAuctionActive, setIsAuctionActive] = useState<boolean>(false);
  const [liveBids, setLiveBids] = useState<Array<{ name: string; amount: number; time: string; isBot?: boolean }>>([
    { name: 'Mahesh Cloth Store', amount: 46000, time: '1m ago', isBot: true },
    { name: 'Suresh Electric Works', amount: 45200, time: '30s ago', isBot: true },
    { name: 'Ramesh Gupta (Kirana)', amount: 44500, time: '10s ago' },
  ]);
  const [auctionWon, setAuctionWon] = useState<boolean>(false);
  const [winningBidResult, setWinningBidResult] = useState<{ amount: number; dividend: number } | null>(null);

  // New Group Form State
  const [newGroupName, setNewGroupName] = useState<string>('Bhopal Traders Chit Group');
  const [newGroupCorpus, setNewGroupCorpus] = useState<number>(50000);
  const [newGroupMembers, setNewGroupMembers] = useState<number>(10);
  const [newGroupSuccess, setNewGroupSuccess] = useState<boolean>(false);

  // Simulated AI Bidding Bot Loop during active auction
  useEffect(() => {
    let interval: any = null;
    if (biddingGroup && isAuctionActive && biddingLiveTimer > 0 && !auctionWon) {
      interval = setInterval(() => {
        setBiddingLiveTimer(prev => {
          if (prev <= 1) {
            handleFinalizeAuction();
            return 0;
          }
          // Tick sound
          soundEngine.playTick();

          // Bot places a counter-bid around 18s and 8s left
          if (prev === 18) {
            const botBid = 43800;
            setLiveBids(b => [{ name: 'Deepak Hardware (Indore)', amount: botBid, time: 'Just now', isBot: true }, ...b]);
            soundEngine.playAuctionHammer();
          } else if (prev === 10) {
            const botBid = 43200;
            setLiveBids(b => [{ name: 'Suresh Electric Works', amount: botBid, time: 'Just now', isBot: true }, ...b]);
            soundEngine.playAuctionHammer();
          }

          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [biddingGroup, isAuctionActive, biddingLiveTimer, auctionWon]);

  const handleStartAuction = (grp: ChitFundGroup) => {
    setBiddingGroup(grp);
    setAuctionWon(false);
    setWinningBidResult(null);
    setMyBidAmount(43000);
    setBiddingLiveTimer(25);
    setIsAuctionActive(true);
    setLiveBids([
      { name: 'Mahesh Cloth Store', amount: 46000, time: '1m ago', isBot: true },
      { name: 'Suresh Electric Works', amount: 45200, time: '30s ago', isBot: true },
      { name: `${persona.name} (Kirana)`, amount: 44500, time: '10s ago' },
    ]);
  };

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biddingGroup) return;

    soundEngine.playAuctionHammer();
    const newBid = {
      name: `${persona.name} (${persona.role.split(' ')[0]})`,
      amount: myBidAmount,
      time: 'Just now'
    };

    setLiveBids(prev => [newBid, ...prev]);

    // If user bids low enough (< 43000), immediate hammer strike after 2 sec
    if (myBidAmount <= 43000) {
      setTimeout(() => {
        handleFinalizeAuction();
      }, 1500);
    }
  };

  const handleFinalizeAuction = () => {
    if (!biddingGroup) return;
    setIsAuctionActive(false);
    setAuctionWon(true);
    soundEngine.playSuccessChime();
    soundEngine.playCashRegister();

    try {
      confetti({ particleCount: 80, spread: 65 });
    } catch {}

    const lowestBid = Math.min(myBidAmount, ...liveBids.map(b => b.amount));
    const totalDividend = biddingGroup.totalCorpus - lowestBid;
    const dividendPerMember = Math.round(totalDividend / biddingGroup.membersCount);

    setWinningBidResult({ amount: lowestBid, dividend: dividendPerMember });

    const newTxn: Transaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      title: `Chit Fund Auction Payout (${biddingGroup.name})`,
      subtitle: `Winning Bid: ₹${lowestBid.toLocaleString('en-IN')} • Dividend Saved: ₹${dividendPerMember}/member`,
      amount: lowestBid,
      type: 'credit',
      category: 'chit_fund',
      timestamp: 'Just now',
      status: 'SUCCESS',
      iconName: 'Award',
      txnRef: `CHIT-BLKC-${Date.now().toString().slice(-6)}`
    };
    onAddTransaction(newTxn);
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

  const blockchainBlocks = [
    {
      blockHeight: '#104,821',
      hash: '0x8f2a9b...4e19',
      event: 'Auction Month 4 Settled: Suresh Electric Won ₹45,200',
      dividendPaid: '₹480 / member',
      timestamp: '28 July 2026, 03:00 PM',
      smartContract: '0xChitVyapar_v2.sol'
    },
    {
      blockHeight: '#104,820',
      hash: '0x3c91d4...88fa',
      event: 'AutoPay Monthly Contributions Cleared (10/10 Members)',
      dividendPaid: 'Corpus: ₹50,000 Locked in Vault',
      timestamp: '25 July 2026, 10:00 AM',
      smartContract: '0xChitVyapar_v2.sol'
    },
    {
      blockHeight: '#104,819',
      hash: '0xaa7291...02ee',
      event: 'Monthly Idle Float Deployed into Liquid Direct MF (+7.2% APR)',
      dividendPaid: 'Yield Added: +₹1,240',
      timestamp: '1 July 2026, 09:30 AM',
      smartContract: '0xChitVyapar_v2.sol'
    }
  ];

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

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab(activeTab === 'ledger' ? 'my_groups' : 'ledger')}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-purple-500/40 text-xs font-bold text-purple-300 transition"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{activeTab === 'ledger' ? 'View Groups' : 'Blockchain Ledger'}</span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Start Chit Group</span>
          </button>
        </div>
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

      {/* View Mode 1: Blockchain Explorer */}
      {activeTab === 'ledger' && (
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 bg-slate-950/90 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-slate-100 text-sm">
                BharatPay Chit Blockchain Explorer (Smart Contract v2.4)
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
              Chit Funds Act 1982 Compliant
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {blockchainBlocks.map((blk, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition">
                <div className="flex items-center justify-between font-mono text-[11px] text-purple-300 mb-1">
                  <span className="font-bold">{blk.blockHeight} • Hash: {blk.hash}</span>
                  <span className="text-slate-500 font-sans">{blk.timestamp}</span>
                </div>
                <div className="font-bold text-slate-100 text-sm mt-1">{blk.event}</div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span className="text-emerald-400 font-semibold">{blk.dividendPaid}</span>
                  <span className="font-mono text-[10px] text-slate-500">Contract: {blk.smartContract}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Mode 2: Create Group Form */}
      {activeTab === 'create' && (
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 bg-slate-950/90 shadow-2xl space-y-4 animate-fadeIn max-w-xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-slate-100 text-base">Launch New Mohalla Chit Fund Group</h3>
            <button onClick={() => setActiveTab('my_groups')} className="text-slate-400 hover:text-white text-xs">Cancel</button>
          </div>

          <form onSubmit={handleCreateGroup} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Group Name</label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-purple-500 font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Total Pool Corpus (₹)</label>
                <input
                  type="number"
                  value={newGroupCorpus}
                  onChange={(e) => setNewGroupCorpus(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-purple-500 font-bold"
                  step="5000"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Members Count (Months)</label>
                <input
                  type="number"
                  value={newGroupMembers}
                  onChange={(e) => setNewGroupMembers(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-purple-500 font-bold"
                  min="5"
                  max="25"
                />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-[11px] text-purple-200">
              Monthly installment per member: <strong className="text-white">₹{(newGroupCorpus / newGroupMembers).toLocaleString('en-IN')} / month</strong> for {newGroupMembers} months.
            </div>

            {newGroupSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Group Created! Smart Contract deployed to blockchain.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs shadow-lg transition active:scale-95"
            >
              Deploy Smart Contract & Invite Members via WhatsApp
            </button>
          </form>
        </div>
      )}

      {/* View Mode 3: Active Group Cards */}
      {activeTab === 'my_groups' && (
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
                      onClick={() => handleStartAuction(grp)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 transition active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <Gavel className="w-4 h-4" />
                      <span>Enter Live Reverse Auction</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartAuction(grp)}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-purple-300 border border-purple-500/30 font-bold text-xs transition"
                    >
                      Simulate Group Auction
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Auction Bidding Modal */}
      {biddingGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl glass-panel bg-slate-950 border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="font-bold text-slate-100 text-base">
                    Live Reverse Auction: {biddingGroup.name}
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-mono">Month {biddingGroup.currentMonth} Auction Pool</span>
                </div>
              </div>
              <button 
                onClick={() => setBiddingGroup(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {auctionWon && winningBidResult ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-3xl">
                  🏆
                </div>
                <h4 className="text-lg font-black text-slate-100">
                  Auction Settled on Blockchain!
                </h4>
                <p className="text-xs text-emerald-300 font-semibold">
                  Winning Bid: ₹{winningBidResult.amount.toLocaleString('en-IN')} payout disbursed to linked bank account!
                </p>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Total Corpus:</span>
                    <span className="font-bold text-white">₹{biddingGroup.totalCorpus.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Discount Dividend Saved:</span>
                    <span className="font-bold text-emerald-400">₹{(biddingGroup.totalCorpus - winningBidResult.amount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Dividend Distributed / Member:</span>
                    <span className="font-bold text-purple-300">₹{winningBidResult.dividend} / member</span>
                  </div>
                </div>
                <button
                  onClick={() => setBiddingGroup(null)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
                >
                  Close Auction Arena
                </button>
              </div>
            ) : (
              <div className="my-4 space-y-4 text-xs">
                
                {/* Live Auction Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400">Pool Corpus</span>
                    <div className="font-bold text-slate-100 text-sm">₹{biddingGroup.totalCorpus.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400">Lowest Bid So Far</span>
                    <div className="font-bold text-purple-300 text-sm">
                      ₹{Math.min(myBidAmount, ...liveBids.map(b => b.amount)).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400">Time Left</span>
                    <div className="font-bold text-red-400 text-sm animate-pulse">{biddingLiveTimer}s ⏱️</div>
                  </div>
                </div>

                {/* Place Reverse Bid Form */}
                <form onSubmit={handlePlaceBid} className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-semibold text-slate-300">
                        Your Discount Bid Amount (₹)
                      </label>
                      <span className="text-[10px] text-purple-300 font-mono">Lowest bid wins cash</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="35000"
                        max={biddingGroup.totalCorpus}
                        step="200"
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
                      <button
                        type="button"
                        onClick={() => setMyBidAmount(Math.max(35000, myBidAmount - 1000))}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold"
                      >
                        -₹1000
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-purple-500/25 transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Gavel className="w-4 h-4" />
                    <span>Strike Bid of ₹{myBidAmount.toLocaleString('en-IN')}</span>
                  </button>
                </form>

                {/* Live Real-Time Bidding Log */}
                <div>
                  <h5 className="font-bold text-slate-300 text-xs mb-2">Live Bids Stream (Simulated Members):</h5>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {liveBids.map((bid, i) => (
                      <div 
                        key={i} 
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition ${
                          i === 0 
                            ? 'bg-purple-950/60 border-purple-500/50 text-white font-bold' 
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{bid.isBot ? '🤖' : '👤'}</span>
                          <span>{bid.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-purple-300 font-extrabold">₹{bid.amount.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-slate-500">{bid.time}</span>
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

    </div>
  );
};
