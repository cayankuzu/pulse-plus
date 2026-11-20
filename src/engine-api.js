/**
 * PULSE+ — Reusable Physics Game Module SDK (`PulsePlateEngine`)
 * --------------------------------------------------------------
 * Drop-in Kirchhoff-Love vibrating plate + ballistic granular sand + Web Audio module
 * designed to be embedded directly inside web games, interactive puzzles, or audio-reactive
 * visual effects.
 *
 * Example usage in any game:
 *   import { PulsePlateEngine } from './src/engine-api.js';
 *
 *   const engine = new PulsePlateEngine(myCanvas, {
 *     material: 'aluminum',
 *     hardware: 'array40',
 *     particleCount: 35000,
 *     audioEnabled: true,
 *   });
 *   await engine.init();
 *   const result = await engine.formText('CAT'); // returns { freqs, metrics, solveMs }
 *   engine.startLoop();
 */

import { GRID_N } from './physics.js';
import { evaluateSolutionField } from './solver.js';
import { SandSimulation } from './particles.js';
import { AcousticSynth } from './audio.js';
import { buildGlyphMask } from './glyphs.js';

export class PulsePlateEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.materialId = options.material || 'aluminum';
    this.hardwareMode = options.hardware || 'array16';
    this.sim = new SandSimulation(canvas, options.particleCount || 35000);
    this.synth = new AcousticSynth();
    this.synth.setEnabled(options.audioEnabled ?? true);
    this.synth.setVolume(options.volume ?? 0.35);

    this.worker = new Worker(new URL('./solver-worker.js', import.meta.url), { type: 'module' });
    this._reqId = 0;
    this._pending = new Map();
    this._rafId = null;
    this._lastTime = null;
    this._acc = 0;
    this.meta = null;
    this.solution = null;
    this.freqGains = [];

    this.worker.onmessage = (e) => {
      const { id, ok, result, error } = e.data;
      const p = this._pending.get(id);
      if (!p) return;
      this._pending.delete(id);
      if (ok) p.resolve(result);
      else p.reject(new Error(error));
    };
  }

  _call(type, payload) {
    return new Promise((resolve, reject) => {
      const id = ++this._reqId;
      this._pending.set(id, { resolve, reject });
      this.worker.postMessage({ id, type, payload });
    });
  }

  async init() {
    this.meta = await this._call('configure', {
      materialId: this.materialId,
      hardwareMode: this.hardwareMode,
    });
    return this.meta;
  }

  async formText(text, { playAudio = true, pulse = true } = {}) {
    const mask = buildGlyphMask(text, GRID_N);
    return this.formMask(mask, { playAudio, pulse });
  }

  async formMask(mask, { playAudio = true, pulse = true } = {}) {
    const sol = await this._call('solve', { mask });
    this.solution = sol;
    this.freqGains = sol.freqs.map(() => 1);
    this.sim.setWaveField(sol.intensity, {
      modeRe: sol.modeRe,
      modeIm: sol.modeIm,
      freqs: sol.freqs,
      gains: this.freqGains,
      actuators: sol.actuatorStats,
      targetMask: sol.mask,
      pulse,
    });
    this.sim.isActive = true;
    if (playAudio) {
      this.synth.playChord(sol.freqs, sol.freqWeights, this.freqGains);
    }
    return {
      freqs: sol.freqs,
      freqWeights: sol.freqWeights,
      metrics: sol.metrics,
      solveMs: sol.solveMs,
    };
  }

  setChannelGains(gains) {
    if (!this.solution) return null;
    this.freqGains = [...gains];
    const evalRes = evaluateSolutionField(this.solution, this.freqGains);
    this.sim.setWaveField(evalRes.intensity, {
      modeRe: this.solution.modeRe,
      modeIm: this.solution.modeIm,
      freqs: this.solution.freqs,
      gains: this.freqGains,
      actuators: this.solution.actuatorStats,
      targetMask: this.solution.mask,
      pulse: false,
    });
    this.synth.playChord(this.solution.freqs, this.solution.freqWeights, this.freqGains);
    return evalRes.metrics;
  }

  getTargetOverlap() {
    return this.sim.getTargetOverlapRatio();
  }

  scatter() {
    this.sim.scatterUniform();
  }

  startLoop() {
    if (this._rafId !== null) return;
    const FIXED_DT = 1 / 60;
    const frame = (now) => {
      if (this._lastTime === null) this._lastTime = now;
      const elapsed = Math.max(0, Math.min(0.2, (now - this._lastTime) / 1000));
      this._lastTime = now;
      this._acc += elapsed;
      let steps = 0;
      while (this._acc >= FIXED_DT && steps < 6) {
        this.sim.step(FIXED_DT);
        this._acc -= FIXED_DT;
        steps++;
      }
      this.sim.render();
      this._rafId = requestAnimationFrame(frame);
    };
    this._rafId = requestAnimationFrame(frame);
  }

  stopLoop() {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this.synth.stop();
  }

  destroy() {
    this.stopLoop();
    this.worker.terminate();
  }
}
