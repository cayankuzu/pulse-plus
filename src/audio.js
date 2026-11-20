/**
 * PULSE+ — Real-Time 12-Channel Web Audio Acoustic Plate Synthesizer
 * ------------------------------------------------------------------
 * Drives K simultaneous pure sine oscillators at the EXACT Kirchhoff-Love
 * plate frequencies (480 Hz – 12.2 kHz), or glides a single pure oscillator
 * during 1-Speaker Closed-Loop Frequency Steering (Zhou et al. 2016).
 */

export class AcousticSynth {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.compressor = null;
    this.analyser = null;
    this.oscillators = [];
    this.oscGains = [];
    this.enabled = true;
    this.volume = 0.36;
    this.isPlaying = false;
    this.currentFreqs = [];
    this.currentWeights = [];
    this.currentMutes = [];
  }

  _ensureContext() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -16;
    this.compressor.knee.value = 18;
    this.compressor.ratio.value = 6;
    this.compressor.attack.value = 0.005;
    this.compressor.release.value = 0.12;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.0001;

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.76;

    this.masterGain.connect(this.compressor);
    this.compressor.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  _ensureOscCount(count) {
    if (!this.ctx) return;
    while (this.oscillators.length < count) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 440;
      gain.gain.value = 0.0001;
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      this.oscillators.push(osc);
      this.oscGains.push(gain);
    }
  }

  playChord(freqs, weights, gains, rampSec = 0.055, { accentTransition = false } = {}) {
    this.currentFreqs = [...freqs];
    this.currentWeights = [...weights];
    this.currentMutes = gains ? [...gains] : freqs.map(() => 1);
    this.isPlaying = true;

    if (!this.enabled) return;
    this._ensureContext();
    if (!this.ctx) return;
    this._ensureOscCount(freqs.length);

    const now = this.ctx.currentTime;
    const K = freqs.length;

    let activeSum = 0;
    const rawAmps = new Float64Array(K);
    for (let k = 0; k < K; k++) {
      const f = freqs[k];
      const w = Math.max(0, weights[k] ?? 1);
      const g = this.currentMutes[k] ?? 1;
      // Preserve crisp mid-band harmonic character (380-3200 Hz) while rolling off harsh >4.5 kHz ultrasonic-like partials
      const comfort = 1 / (1 + Math.pow(f / 2150, 1.42));
      // Accentuate dominant plate frequencies so each digit's true spectral peak clearly leads the chord
      const perceptualW = Math.pow(w, 1.55);
      const amp = Math.max(0, perceptualW * g * comfort);
      rawAmps[k] = amp;
      activeSum += amp;
    }

    const norm = activeSum > 0.001 ? 0.68 / Math.max(activeSum, 0.55) : 0;

    for (let i = 0; i < this.oscillators.length; i++) {
      const osc = this.oscillators[i];
      const gn = this.oscGains[i].gain;
      if (i < K) {
        osc.frequency.setTargetAtTime(Math.max(40, Math.min(16000, freqs[i])), now, rampSec);
        gn.setTargetAtTime(rawAmps[i] * norm, now, rampSec + 0.012);
      } else {
        gn.setTargetAtTime(0.0, now, 0.035);
      }
    }

    if (accentTransition && this.volume > 0.01) {
      // Subtle physical re-excitation breath when locking onto a new digit's modal chord
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(this.volume * 0.42, now, 0.018);
      this.masterGain.gain.setTargetAtTime(this.volume, now + 0.045, 0.065);
    } else {
      this.masterGain.gain.setTargetAtTime(this.volume, now, 0.05);
    }
  }

  stop() {
    this.isPlaying = false;
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.setTargetAtTime(0.0, now, 0.05);
  }

  /**
   * Soft harmonic celebration chime when a puzzle level locks into resonance
   */
  playSuccessChime() {
    if (!this.enabled) return;
    this._ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const t0 = now + idx * 0.07;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.14 * this.volume, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.48);
      osc.connect(g);
      g.connect(this.compressor);
      osc.start(t0);
      osc.stop(t0 + 0.52);
    });
  }

  setEnabled(on) {
    this.enabled = on;
    if (!on) {
      if (this.ctx && this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0.0, this.ctx.currentTime, 0.04);
      }
    } else if (this.isPlaying && this.currentFreqs.length > 0) {
      this.playChord(this.currentFreqs, this.currentWeights, this.currentMutes);
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain && this.enabled && this.isPlaying) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.04);
    }
  }

  drawScope(canvas, phaseClock) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Precision gridlines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.moveTo(W * 0.25, 0);
    ctx.lineTo(W * 0.25, H);
    ctx.moveTo(W * 0.5, 0);
    ctx.lineTo(W * 0.5, H);
    ctx.moveTo(W * 0.75, 0);
    ctx.lineTo(W * 0.75, H);
    ctx.stroke();

    if (!this.isPlaying || this.currentFreqs.length === 0) return;

    ctx.beginPath();
    if (this.analyser && this.enabled && this.ctx && this.ctx.state === 'running') {
      const buf = new Float32Array(this.analyser.fftSize);
      this.analyser.getFloatTimeDomainData(buf);
      const samples = 512;
      for (let i = 0; i < samples; i++) {
        const x = (i / (samples - 1)) * W;
        const y = H / 2 - buf[i] * (H * 1.15);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    } else {
      const K = this.currentFreqs.length;
      const samples = 260;
      const winSec = 0.007;
      let norm = 0;
      for (let k = 0; k < K; k++) {
        norm += (this.currentWeights[k] ?? 1) * (this.currentMutes[k] ?? 1);
      }
      norm = norm > 1e-4 ? 1 / norm : 0;
      for (let i = 0; i < samples; i++) {
        const t = phaseClock * 0.03 + (i / samples) * winSec;
        let v = 0;
        for (let k = 0; k < K; k++) {
          const a = (this.currentWeights[k] ?? 1) * (this.currentMutes[k] ?? 1);
          if (a > 0) v += a * Math.sin(2 * Math.PI * this.currentFreqs[k] * t);
        }
        const x = (i / (samples - 1)) * W;
        const y = H / 2 - v * norm * (H * 0.4);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    }

    ctx.strokeStyle = '#e8c476';
    ctx.lineWidth = 1.6;
    ctx.shadowColor = 'rgba(232, 196, 118, 0.35)';
    ctx.shadowBlur = 5;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}
