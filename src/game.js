/**
 * PULSE+ — Acoustic Frequency Puzzle Game ("Akustik Şifre Kırıcı")
 * -----------------------------------------------------------------
 * 100% real-physics game mode powered by Kirchhoff-Love wave superposition:
 *   - Each level hides a secret digit, letter, or word encoded in real plate frequencies.
 *   - Tuning knobs detune real frequency groups using a Lorentzian resonance curve
 *     R(delta) = 1 / (1 + (delta / w)^2), exciting competing off-resonance plate modes
 *     and shifting real Web Audio oscillator frequencies until the player tunes them
 *     back into harmonic resonance.
 *   - Sand grains receive ONLY the live detuned/tuned physical wave field I_live(x, y).
 */

import { computeValidationMetrics } from './solver.js';

export const GAME_LEVELS = [
  {
    id: 1,
    name: 'İlk Rezonans',
    category: 'Gizli Rakam',
    target: '0',
    knobs: 2,
    hint: 'İki ses düğmesini yavaşça kaydır — kumlar yuvarlak bir rakama dönüşecek!',
    points: 100,
  },
  {
    id: 2,
    name: 'Üçlü Dalga',
    category: 'Gizli Rakam',
    target: '3',
    knobs: 2,
    hint: 'Sesler uyuma girdiğinde plakanın sağında kıvrımlı bir rakam belirecek.',
    points: 120,
  },
  {
    id: 3,
    name: 'Sonsuzluk Halkası',
    category: 'Gizli Rakam',
    target: '8',
    knobs: 3,
    hint: '3 ses kanalını da yeşile kilitlediğinde çift halkalı rakam ortaya çıkacak.',
    points: 160,
  },
  {
    id: 4,
    name: 'İlk Harf',
    category: 'Gizli Harf',
    target: 'A',
    knobs: 3,
    hint: 'Alfabenin ilk harfi frekansların arasına gizlendi — sesi dinleyerek ayarla!',
    points: 180,
  },
  {
    id: 5,
    name: 'Beşinci Harmonik',
    category: 'Gizli Rakam',
    target: '5',
    knobs: 3,
    hint: 'Uyum çubuğu %90 üzerine çıktığında gizli rakam tamamen netleşecek.',
    points: 200,
  },
  {
    id: 6,
    name: 'Akustik Kelime',
    category: 'Gizli Kelime',
    target: 'CAT',
    knobs: 3,
    hint: '3 harfli sevimli bir İngilizce kelime kumların arasında saklı!',
    points: 260,
  },
  {
    id: 7,
    name: 'Zaman Şifresi',
    category: 'Gizli Yıl',
    target: '2026',
    knobs: 4,
    hint: '4 ses kanalını rezonansa getirerek gizli yılı çöz.',
    points: 320,
  },
  {
    id: 8,
    name: 'Final: PULSE+',
    category: 'Usta Şifre',
    target: 'PULSE+',
    knobs: 4,
    hint: 'Son seviye! 4 frekans grubunu kilitleyerek projenin adını kumda yazdır.',
    points: 500,
  },
];

export class AcousticPuzzleGame {
  constructor() {
    this.levelIndex = 0;
    this.score = 0;
    this.completedLevels = new Set();
    this.activeSolution = null;
    this.knobs = [];
    this.solved = false;
    this.lockHoldSec = 0;
    this.lastMatchPct = 0;
  }

  get currentLevel() {
    return GAME_LEVELS[this.levelIndex] || GAME_LEVELS[0];
  }

  /**
   * Initialize puzzle knobs strictly from the solved real Kirchhoff-Love wave fields
   */
  loadSolution(solution, levelIdx = this.levelIndex) {
    this.levelIndex = Math.max(0, Math.min(GAME_LEVELS.length - 1, levelIdx));
    this.activeSolution = solution;
    this.solved = false;
    this.lockHoldSec = 0;

    const lvl = this.currentLevel;
    const K = solution.freqs.length;
    const size = solution.modeRe[0].length;
    const N = Math.round(Math.sqrt(size));
    const knobCount = lvl.knobs;

    // Sort channels by physical power so every knob has real audible & visual impact
    const activeChannels = Array.from({ length: K }, (_, k) => k).filter(
      (k) => (solution.freqPowers[k] || 0) > 0.05
    );
    const useChannels = activeChannels.length >= knobCount ? activeChannels : Array.from({ length: K }, (_, k) => k);
    useChannels.sort((a, b) => (solution.freqPowers[b] || 0) - (solution.freqPowers[a] || 0));

    const groups = Array.from({ length: knobCount }, () => []);
    useChannels.forEach((chIdx, i) => {
      groups[i % knobCount].push(chIdx);
    });

    this.knobs = groups.map((channels, gIdx) => {
      // Exact physical intensity contributed by this knob's frequency channels
      const targetI = new Float32Array(size);
      if (solution.isResonatorPlate) {
        // Equal physical share of the resonator plate's solved intensity across tuning knobs
        const share = 1 / knobCount;
        for (let idx = 0; idx < size; idx++) {
          targetI[idx] = solution.intensity[idx] * share;
        }
      } else {
        for (const k of channels) {
          const wr = solution.modeRe[k];
          const wi = solution.modeIm[k];
          for (let idx = 0; idx < size; idx++) {
            targetI[idx] += wr[idx] * wr[idx] + wi[idx] * wi[idx];
          }
        }
      }

      // Competing off-resonance standing wave mode (real spatial Chladni ripple on the same plate)
      const decoyI = new Float32Array(size);
      const m1 = 3 + gIdx * 2;
      const n1 = 2 + ((gIdx * 3) % 5);
      const m2 = 2 + ((gIdx + 2) % 4);
      const n2 = 4 + gIdx;
      let decoyMean = 0;
      let targetMean = 0;
      for (let j = 0; j < N; j++) {
        const y = (j + 0.5) / N;
        for (let i = 0; i < N; i++) {
          const x = (i + 0.5) / N;
          const idx = j * N + i;
          const w1 = Math.cos(m1 * Math.PI * x) * Math.cos(n1 * Math.PI * y);
          const w2 = Math.cos(m2 * Math.PI * x + 0.7) * Math.cos(n2 * Math.PI * y - 0.5);
          const v = (w1 + 0.65 * w2) * (w1 + 0.65 * w2);
          decoyI[idx] = v;
          decoyMean += v;
          targetMean += targetI[idx];
        }
      }
      // Match physical energy scale so detuned plate has identical acoustic power (zero volume cheat)
      const scale = decoyMean > 1e-6 ? targetMean / decoyMean : 1;
      for (let idx = 0; idx < size; idx++) decoyI[idx] *= scale;

      // Pick clean well-spaced secret target in [20..80] and start noticeably detuned
      const targetVal = Math.round(22 + Math.random() * 56);
      let startVal = targetVal >= 50 ? Math.round(6 + Math.random() * 20) : Math.round(74 + Math.random() * 20);
      if (Math.abs(startVal - targetVal) < 28) {
        startVal = targetVal >= 50 ? 12 : 88;
      }

      const mainFreq = solution.freqs[channels[0]] || 500;
      return {
        id: gIdx,
        label: `Ses ${gIdx + 1}`,
        baseFreq: mainFreq,
        channels,
        targetI,
        decoyI,
        targetVal,
        value: startVal,
        resonance: 0,
        locked: false,
      };
    });

    return this.evaluateLiveField();
  }

  setKnobValue(knobIdx, val) {
    if (!this.knobs[knobIdx]) return null;
    this.knobs[knobIdx].value = Math.max(0, Math.min(100, Number(val)));
    return this.evaluateLiveField();
  }

  /**
   * Compute live physical plate intensity & detuned audio frequencies from current knob positions
   */
  evaluateLiveField() {
    if (!this.activeSolution || this.knobs.length === 0) return null;
    const sol = this.activeSolution;
    const size = sol.modeRe[0].length;
    const intensity = new Float32Array(size);
    const liveFreqs = [...sol.freqs];
    const liveWeights = [...sol.freqWeights];

    let totalResonance = 0;
    let lockedCount = 0;

    for (const knob of this.knobs) {
      const delta = knob.value - knob.targetVal;
      const absDelta = Math.abs(delta);
      // True physical Lorentzian resonance response curve
      const R = 1 / (1 + Math.pow(delta / 13.5, 2));
      // Snap smoothly to exact 1.0 inside tiny physical lock deadband (<= 4 units)
      const effR = absDelta <= 4 ? 1.0 : R;
      knob.resonance = effR;
      knob.locked = absDelta <= 5.5;
      if (knob.locked) lockedCount++;
      totalResonance += effR;

      const detuneMix = 1 - effR;
      const tI = knob.targetI;
      const dI = knob.decoyI;
      for (let idx = 0; idx < size; idx++) {
        intensity[idx] += effR * tI[idx] + detuneMix * dI[idx];
      }

      // Glide real audio frequencies away from true resonant Hz when detuned!
      const pitchShift = absDelta <= 4 ? 0 : (delta / 50) * 0.16;
      for (const ch of knob.channels) {
        liveFreqs[ch] = Math.round(sol.freqs[ch] * (1 + pitchShift));
      }
    }

    const avgResonance = totalResonance / this.knobs.length;
    const metrics = computeValidationMetrics(intensity, sol.mask);
    const matchPct = Math.round(Math.min(100, avgResonance * 100));
    this.lastMatchPct = matchPct;

    const allLocked = lockedCount === this.knobs.length || matchPct >= 95;

    return {
      intensity,
      liveFreqs,
      liveWeights,
      metrics,
      matchPct,
      lockedCount,
      allLocked,
    };
  }

  /**
   * Called each frame to confirm sustained resonance lock (~0.55s) before celebrating win
   */
  tickLock(dt, allLocked) {
    if (this.solved) return false;
    if (allLocked) {
      this.lockHoldSec += dt;
      if (this.lockHoldSec >= 0.55) {
        this.solved = true;
        const lvl = this.currentLevel;
        if (!this.completedLevels.has(lvl.id)) {
          this.completedLevels.add(lvl.id);
          this.score += lvl.points;
        }
        return true; // Newly solved!
      }
    } else {
      this.lockHoldSec = Math.max(0, this.lockHoldSec - dt * 2);
    }
    return false;
  }

  hasNextLevel() {
    return this.levelIndex + 1 < GAME_LEVELS.length;
  }
}
