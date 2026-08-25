import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Share2, 
  Download, 
  Flame, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Volume2,
  Printer,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ShikshaLesson, UserPersona, Language } from '../../types';
import { soundEngine } from '../../utils/audio';

interface ShikshaLiteracyTabProps {
  persona: UserPersona;
  currentLang: Language;
  lessons: ShikshaLesson[];
}

export const ShikshaLiteracyTab: React.FC<ShikshaLiteracyTabProps> = ({
  persona,
  currentLang,
  lessons
}) => {
  const [activeLesson, setActiveLesson] = useState<ShikshaLesson | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [totalCoins, setTotalCoins] = useState<number>(350);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const handleStartLesson = (lesson: ShikshaLesson) => {
    setActiveLesson(lesson);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setIsPlayingAudio(false);
  };

  const handlePlayAudioSummary = () => {
    if (!activeLesson) return;
    setIsPlayingAudio(true);
    const textToSpeak = `${activeLesson.titleVernacular[currentLang] || activeLesson.title}. ${activeLesson.quiz.explanation}`;
    soundEngine.speakText(textToSpeak, currentLang);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || !activeLesson) return;

    setQuizSubmitted(true);
    const isCorrect = selectedOption === activeLesson.quiz.correctIndex;

    if (isCorrect) {
      soundEngine.playSuccessChime();
      soundEngine.playCashRegister();
      setTotalCoins(prev => prev + activeLesson.coinsReward);
      try {
        confetti({ particleCount: 75, spread: 70 });
      } catch {}
    } else {
      soundEngine.playWarningBeep();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner with Shiksha Coins & Streak */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
              Shiksha Mode (Learn & Earn)
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              ✓ 50+ Bite-Sized Modules in 12+ Languages
            </span>
          </div>
          <h2 className="text-lg font-black text-slate-100">
            Gamified Financial Education for Bharat
          </h2>
          <p className="text-xs text-slate-400">
            Learn how UPI works, build an 800+ credit score, safeguard against scams, and earn Bharat Coins redeemable for real cashbacks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-amber-950/80 border border-amber-500/50 text-center">
            <div className="text-[10px] text-amber-300 uppercase font-bold flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" /> Bharat Coins
            </div>
            <div className="text-xl font-black text-amber-400">{totalCoins}</div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-orange-950/80 border border-orange-500/50 text-center">
            <div className="text-[10px] text-orange-300 uppercase font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" /> Daily Streak
            </div>
            <div className="text-xl font-black text-orange-400">7 Days 🔥</div>
          </div>
        </div>
      </div>

      {/* Community Challenge & Certificate CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100">Official Bharat Shiksha Certificate</h4>
              <p className="text-[11px] text-slate-400">Share your certified financial literacy badge on WhatsApp & LinkedIn</p>
            </div>
          </div>
          <button
            onClick={() => setShowCertificateModal(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 whitespace-nowrap active:scale-95 transition"
          >
            View Certificate
          </button>
        </div>

        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100">"Learn with your Mohalla" Challenge</h4>
              <p className="text-[11px] text-slate-400">Indore Kirana Union ranks #1 with 1,420 lessons completed this week</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-xl bg-emerald-950 border border-emerald-500/40">
            Top 5%
          </span>
        </div>

      </div>

      {/* Interactive Lessons Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-100 text-sm">
          Featured Interactive Modules & Video Quizzes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson) => {
            const localizedTitle = lesson.titleVernacular[currentLang] || lesson.title;

            return (
              <div 
                key={lesson.id}
                className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-amber-500/40 bg-slate-950/85 transition flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {lesson.category}
                    </span>
                    <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                      <Coins className="w-3 h-3" /> +{lesson.coinsReward} Coins
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition">
                    {localizedTitle}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    ⏱️ {lesson.durationMins} Min Read & Video • Instant Quiz
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {lesson.completed ? '✓ Completed' : 'Unfinished'}
                  </span>

                  <button
                    onClick={() => handleStartLesson(lesson)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/10 active:scale-95 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Lesson & Quiz</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Lesson & Quiz Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg glass-panel bg-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-slate-100 text-base">{activeLesson.titleVernacular[currentLang] || activeLesson.title}</h3>
              </div>
              <button 
                onClick={() => setActiveLesson(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Video preview / Summary */}
            <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Vernacular Video Summary (Truefan AI)</span>
                <span className="text-amber-400 font-semibold">175+ Indian Dialects</span>
              </div>
              <div 
                onClick={handlePlayAudioSummary}
                className="h-32 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:border-amber-500/50 transition group"
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/20 group-hover:bg-amber-500 text-amber-400 group-hover:text-slate-950 flex items-center justify-center mb-2 transition shadow">
                  <Volume2 className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-slate-200">
                  {isPlayingAudio ? '🔊 Playing Vernacular Audio...' : 'Tap to listen to 60-second audio summary in your language'}
                </p>
              </div>
            </div>

            {/* Quiz Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <HelpCircle className="w-4 h-4" />
                <span>Knowledge Check: Earn +{activeLesson.coinsReward} Coins</span>
              </div>

              <p className="text-sm font-semibold text-slate-100">
                {activeLesson.quiz.question}
              </p>

              <div className="space-y-2">
                {activeLesson.quiz.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === activeLesson.quiz.correctIndex;
                  let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-900';

                  if (quizSubmitted) {
                    if (isCorrect) borderClass = 'border-emerald-500 bg-emerald-950/60 text-emerald-200';
                    else if (isSelected && !isCorrect) borderClass = 'border-red-500 bg-red-950/60 text-red-200';
                  } else if (isSelected) {
                    borderClass = 'border-amber-500 bg-amber-950/30 text-amber-200';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={quizSubmitted}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full p-3 rounded-2xl border text-left text-xs font-medium transition flex items-center justify-between ${borderClass}`}
                    >
                      <span>{option}</span>
                      {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs mt-3 animate-fadeIn">
                  <div className="font-bold text-slate-200 mb-1">
                    {selectedOption === activeLesson.quiz.correctIndex ? '🎉 Shabaash! Sahi Jawab!' : '⚠️ Incorrect! Try reviewing the tip below:'}
                  </div>
                  <p className="text-slate-400">{activeLesson.quiz.explanation}</p>
                </div>
              )}

              <div className="pt-3">
                {!quizSubmitted ? (
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={selectedOption === null}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition"
                  >
                    Submit Answer & Claim Coins
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveLesson(null)}
                    className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                  >
                    Close & Next Lesson
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Shareable & Printable Official Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] font-serif">
            
            {/* Certificate Outer Gold Border Frame */}
            <div className="p-6 rounded-2xl border-4 border-amber-600 bg-amber-50/50 relative">
              <div className="absolute top-2 right-2 text-[10px] font-sans font-bold text-slate-500">
                Govt. Initiative • NCFE Aligned
              </div>

              <div className="text-center space-y-2">
                <div className="text-3xl">🇮🇳</div>
                <div className="text-[11px] uppercase tracking-widest text-amber-900 font-black font-sans">
                  NATIONAL FINANCIAL LITERACY MISSION (NFLM)
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Certificate of Financial Excellence
                </h3>
                <p className="text-xs text-slate-600 italic font-sans">This is to certify that</p>
                <div className="text-2xl font-black text-blue-950 border-b-2 border-slate-300 pb-1 mx-auto max-w-[320px] font-sans">
                  {persona.name}
                </div>
                <p className="text-xs text-slate-700 font-sans leading-relaxed pt-2">
                  has successfully passed the comprehensive modules on <strong>UPI Safety, ONDC Hyperlocal Commerce, AI Fraud Identification, Micro-Credit Underwriting, and Chit Funds 2.0</strong>.
                </p>
              </div>

              {/* Badges & QR */}
              <div className="mt-6 pt-4 border-t border-amber-300 flex items-center justify-between font-sans text-[11px]">
                <div>
                  <div className="font-bold text-slate-900">Bharat National Registry</div>
                  <div className="font-mono text-slate-500 text-[10px]">ID: NFLM-2026-BHARATPAY-{persona.id.toUpperCase()}</div>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-300">
                  <QrCode className="w-5 h-5 text-slate-800" />
                  <span className="font-mono text-[9px] text-slate-600">SEBI / RBI<br/>Verified</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-2 font-sans">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Download PDF</span>
              </button>
              <button
                onClick={() => {
                  soundEngine.playSuccessChime();
                  alert('Certificate link copied! Share on WhatsApp to earn +50 Bharat Coins.');
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share on WhatsApp</span>
              </button>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

