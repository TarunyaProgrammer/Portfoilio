// Native 8-Bit Web Audio API Sound Synthesizer with Multi-Layer Safety System
class RetroAudioSynth {
  constructor() {
    this.audioCtx = null;
    this.muted = localStorage.getItem("retro_audio_muted") === "true";
    this.activeOscillators = new Set();
    this.lastPlayTimeMap = new Map();
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem("retro_audio_muted", String(this.muted));
    if (this.muted) {
      this.stopAllSounds();
    } else {
      this.playCoinSound();
    }
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Hard Panic Switch: Instantly kills all currently playing audio oscillators
  stopAllSounds() {
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.activeOscillators.clear();
  }

  // Internal Safety Helper to create, track, auto-stop, and auto-cleanup oscillators
  _createOscillator(type, frequency, startTime, duration, gainValue = 0.1) {
    if (!this.audioCtx) return null;

    // Safety Limit: Limit max concurrent active oscillators to prevent audio buffer overloading
    if (this.activeOscillators.size > 10) {
      this.stopAllSounds();
    }

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, startTime);

      gain.gain.setValueAtTime(gainValue, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      this.activeOscillators.add(osc);

      const cleanup = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch (e) {}
        this.activeOscillators.delete(osc);
      };

      osc.onended = cleanup;

      // Hard Timeout Fallback: Guarantees sound MUST stop even if onended fails or browser drops event
      setTimeout(() => {
        try {
          osc.stop();
        } catch (e) {}
        cleanup();
      }, Math.ceil((startTime - this.audioCtx.currentTime + duration + 0.1) * 1000));

      osc.start(startTime);
      osc.stop(startTime + duration);

      return { osc, gain };
    } catch (e) {
      return null;
    }
  }

  // Throttle helper to prevent rapid duplicate sound triggers
  _canPlay(soundKey, cooldownMs) {
    if (this.muted) return false;
    const now = Date.now();
    const last = this.lastPlayTimeMap.get(soundKey) || 0;
    if (now - last < cooldownMs) return false;
    this.lastPlayTimeMap.set(soundKey, now);
    return true;
  }

  // 🪙 Mario Coin Sound (B5 -> E6 square wave)
  playCoinSound() {
    if (!this._canPlay("coin", 60)) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      this.activeOscillators.add(osc);

      const cleanup = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch (e) {}
        this.activeOscillators.delete(osc);
      };

      osc.onended = cleanup;
      setTimeout(cleanup, 350);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  // 👾 Retro Click / Blip
  playClickSound() {
    if (!this._canPlay("click", 40)) return;
    this.initContext();
    if (!this.audioCtx) return;

    this._createOscillator("square", 440, this.audioCtx.currentTime, 0.05, 0.08);
  }

  // 🍄 Powerup Sound
  playPowerupSound() {
    if (!this._canPlay("powerup", 200)) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const freqs = [330, 392, 659, 523, 587, 784];
      freqs.forEach((freq, idx) => {
        this._createOscillator("triangle", freq, now + idx * 0.04, 0.07, 0.1);
      });
    } catch (e) {}
  }

  // 🏁 Mario Stage Clear Fanfare (Strict 2500ms cooldown safety lock)
  playStageClearSound() {
    if (!this._canPlay("stage_clear", 2500)) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const notes = [
        { f: 523.25, d: 0.1 }, // C5
        { f: 659.25, d: 0.1 }, // E5
        { f: 783.99, d: 0.1 }, // G5
        { f: 1046.50, d: 0.3 }  // C6
      ];

      let currentTime = now;
      notes.forEach((note) => {
        this._createOscillator("square", note.f, currentTime, note.d, 0.12);
        currentTime += note.d + 0.03;
      });
    } catch (e) {}
  }
}

export const audioSynth = new RetroAudioSynth();
