/**
 * PULSE+ — Asynchronous Kirchhoff-Love Plate Physics & Inverse Wave Optimizer Worker
 * Runs Green's tensor construction and Minimax Adam optimization off the main thread
 * so 45,000-85,000 ballistic sand grains remain locked at 60 FPS.
 */

import { PlateModel } from './physics.js';
import { solveInverseWaves } from './solver.js';

const plate = new PlateModel('aluminum', 'array16');

self.onmessage = (e) => {
  const { id, type, payload } = e.data;
  try {
    if (type === 'configure') {
      plate.configure(payload.materialId, payload.hardwareMode);
      self.postMessage({ id, ok: true, result: plate.getMetaSummary() });
    } else if (type === 'solve') {
      const mask = new Float32Array(payload.mask);
      const sol = solveInverseWaves(plate, mask, payload.options || {});
      self.postMessage({ id, ok: true, result: sol });
    } else if (type === 'classic') {
      const res = plate.computeSingleFreqField(payload.freq, 0.5, 0.5);
      self.postMessage({ id, ok: true, result: res });
    } else if (type === 'evalBand') {
      const res = plate.evalDrivenBandField(payload.freq, payload.uRe, payload.uIm);
      self.postMessage({ id, ok: true, result: res });
    }
  } catch (err) {
    self.postMessage({ id, ok: false, error: String(err?.message || err) });
  }
};
