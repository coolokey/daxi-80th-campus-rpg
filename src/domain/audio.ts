// Web Audio API Synthesizer for 8-bit Retro Game Sound Effects
// Lightweight, zero external audio asset dependencies, instantaneous playback

class SoundSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  /**
   * Short UI blip for interactions and button clicks
   */
  public playBlip() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Crisp collect coin / chip sound
   */
  public playCollectChip() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Ignored
    }
  }

  /**
   * Majestic chime for historical monument / capsule discovery
   */
  public playMonumentChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Arpeggio)
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0.15, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.45);
      });
    } catch {
      // Ignored
    }
  }

  /**
   * Festive 80th Anniversary Chiptune Fanfare (Plays on Konami code / 80 trigger)
   */
  public playAnniversaryFanfare() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Fanfare: C5 -> E5 -> G5 -> C6 -> G5 -> C6 (High energetic celebration!)
      const melody = [
        { f: 523.25, d: 0.12 }, // C5
        { f: 659.25, d: 0.12 }, // E5
        { f: 783.99, d: 0.15 }, // G5
        { f: 1046.5, d: 0.25 }, // C6
        { f: 880.0, d: 0.15 },  // A5
        { f: 1046.5, d: 0.15 }, // C6
        { f: 1318.51, d: 0.45 }, // E6
      ];

      let startTime = ctx.currentTime + 0.05;

      melody.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(note.f, startTime);

        gain.gain.setValueAtTime(0.16, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d * 0.95);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + note.d);

        startTime += note.d * 1.05;
      });
    } catch {
      // Ignored
    }
  }

  /**
   * Firework launch and explosion pop sound
   */
  public playFireworkPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // 1. Whistle rise
      const whistle = ctx.createOscillator();
      const wGain = ctx.createGain();
      whistle.type = 'sine';
      whistle.frequency.setValueAtTime(300, now);
      whistle.frequency.exponentialRampToValueAtTime(1400, now + 0.18);

      wGain.gain.setValueAtTime(0.1, now);
      wGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      whistle.connect(wGain);
      wGain.connect(ctx.destination);
      whistle.start(now);
      whistle.stop(now + 0.2);

      // 2. Pop
      const popTime = now + 0.18;
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = 'triangle';
      popOsc.frequency.setValueAtTime(180, popTime);
      popOsc.frequency.exponentialRampToValueAtTime(50, popTime + 0.22);

      popGain.gain.setValueAtTime(0.2, popTime);
      popGain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.25);

      popOsc.connect(popGain);
      popGain.connect(ctx.destination);
      popOsc.start(popTime);
      popOsc.stop(popTime + 0.25);
    } catch {
      // Ignored
    }
  }
}

export const soundManager = new SoundSystem();
