import { Language } from '../types';

class SoundEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play pleasant UPI payment chime
  playSuccessChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
      osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35); // C6

      osc2.frequency.setValueAtTime(261.63, now);
      osc2.frequency.exponentialRampToValueAtTime(523.25, now + 0.35);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);
    } catch {
      // Ignore audio context autoplay errors
    }
  }

  // Play auction hammer sound for Chit Fund
  playAuctionHammer() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // audio error fallback
    }
  }

  // Play fraud warning alarm
  playWarningBeep() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(440, now + 0.15);
      osc.frequency.setValueAtTime(880, now + 0.3);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // audio error fallback
    }
  }

  // BharatPay Merchant Soundbox voice announcement
  speakSoundboxAnnouncement(amount: number, lang: Language = 'hi') {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    this.playSuccessChime();

    setTimeout(() => {
      let announcementText = `BharatPay par ₹${amount} prapt hue!`;
      let voiceLangCode = 'hi-IN';

      if (lang === 'hi' || lang === 'hinglish') {
        announcementText = `भारतपे पर ${amount} रुपये प्राप्त हुए!`;
        voiceLangCode = 'hi-IN';
      } else if (lang === 'ta') {
        announcementText = `பாரத்பேவில் ${amount} ரூபாய் பெறப்பட்டது!`;
        voiceLangCode = 'ta-IN';
      } else if (lang === 'te') {
        announcementText = `భారత్‌పే లో ${amount} రూపాయలు వచ్చాయి!`;
        voiceLangCode = 'te-IN';
      } else if (lang === 'gu') {
        announcementText = `ભારતપે પર ${amount} રૂપિયા મળ્યા!`;
        voiceLangCode = 'gu-IN';
      } else if (lang === 'mr') {
        announcementText = `भारतपे वर ${amount} रुपये मिळाले!`;
        voiceLangCode = 'mr-IN';
      } else if (lang === 'bn') {
        announcementText = `ভারতপে তে ${amount} টাকা পেয়েছেন!`;
        voiceLangCode = 'bn-IN';
      } else {
        announcementText = `Received ₹${amount} on BharatPay!`;
        voiceLangCode = 'en-IN';
      }

      const utterance = new SpeechSynthesisUtterance(announcementText);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.lang = voiceLangCode;

      // Select matching voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(v => v.lang.startsWith(voiceLangCode.slice(0, 2)) || v.lang.includes('IN'));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      window.speechSynthesis.cancel(); // Stop ongoing speech
      window.speechSynthesis.speak(utterance);
    }, 400);
  }

  // Generic TTS helper
  speakText(text: string, lang: Language = 'en') {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;

    const langMap: Record<Language, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      hinglish: 'hi-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
      gu: 'gu-IN',
      pa: 'pa-IN',
      ml: 'ml-IN',
      or: 'or-IN'
    };

    utterance.lang = langMap[lang] || 'en-IN';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}

export const soundEngine = new SoundEngine();
