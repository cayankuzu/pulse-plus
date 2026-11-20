/**
 * PULSE+ — Inverse Kirchhoff-Love Wave Synthesizer & Single-Speaker Closed-Loop Controller
 * ----------------------------------------------------------------------------------------
 * 1) Multi-Piezo Simultaneous Wave Synthesis (40 / 80 perimeter piezos x 10-12 frequencies):
 *    Minimizes vibration intensity I(x, y) inside the target glyph mask M=1 while keeping
 *    background vibration I(x, y) >= 1.0 using Adam gradient descent on the exact
 *    Kirchhoff-Love Green's tensor.
 *
 * 2) Single-Speaker Closed-Loop Sequential Steering (Zhou et al., Nature Comm. 2016):
 *    Uses ONLY ONE off-center physical speaker. Reads live sand positions (camera feedback
 *    equivalent) and selects the single frequency f*(t) whose real Chladni gradient -grad(I_f)
 *    maximizes net grain transport toward the target shape while balancing coverage.
 */

function runMinimaxAdam(N, P, freqs, G, mask, iterations) {
  const size = N * N;
  const K = freqs.length;
  const lr = P >= 40 ? 0.064 : 0.068;
  const b1 = 0.9;
  const b2 = 0.999;
  const eps = 1e-8;
  const reg = 0.0003;

  const uRe = Array.from({ length: K }, (_, k) =>
    Float64Array.from({ length: P }, (_, p) => Math.sin((k + 1) * 1.9 + (p + 1) * 1.37) * 0.12)
  );
  const uIm = Array.from({ length: K }, (_, k) =>
    Float64Array.from({ length: P }, (_, p) => Math.cos((k + 1) * 2.3 + (p + 1) * 1.73) * 0.12)
  );

  const mRe = Array.from({ length: K }, () => new Float64Array(P));
  const vRe = Array.from({ length: K }, () => new Float64Array(P));
  const mIm = Array.from({ length: K }, () => new Float64Array(P));
  const vIm = Array.from({ length: K }, () => new Float64Array(P));

  const WRe = Array.from({ length: K }, () => new Float32Array(size));
  const WIm = Array.from({ length: K }, () => new Float32Array(size));
  const Itot = new Float32Array(size);

  let maskCount = 0;
  for (let idx = 0; idx < size; idx++) {
    if (mask[idx] > 0.5) maskCount++;
  }
  const maskRatio = Math.max(0.05, Math.min(0.45, maskCount / size));
  const fgWeight = 24.0 * Math.min(2.4, 0.18 / maskRatio);
  const bgWeight = 3.4;
  const bgFloor = 0.48; // Minimax barrier prevents isolated background nodal pockets (<1g)
  const invSize = 1 / size;

  for (let iter = 1; iter <= iterations; iter++) {
    Itot.fill(0);
    for (let k = 0; k < K; k++) {
      const wr = WRe[k];
      const wi = WIm[k];
      wr.fill(0);
      wi.fill(0);
      const Gk = G[k];
      const urArr = uRe[k];
      const uiArr = uIm[k];
      for (let p = 0; p < P; p++) {
        const ur = urArr[p];
        const ui = uiArr[p];
        const gr = Gk[p].re;
        const gi = Gk[p].im;
        for (let idx = 0; idx < size; idx++) {
          wr[idx] += ur * gr[idx] - ui * gi[idx];
          wi[idx] += ur * gi[idx] + ui * gr[idx];
        }
      }
      for (let idx = 0; idx < size; idx++) {
        Itot[idx] += wr[idx] * wr[idx] + wi[idx] * wi[idx];
      }
    }

    const b1c = 1 - Math.pow(b1, iter);
    const b2c = 1 - Math.pow(b2, iter);

    for (let k = 0; k < K; k++) {
      const wr = WRe[k];
      const wi = WIm[k];
      const Gk = G[k];
      for (let p = 0; p < P; p++) {
        let gRe = 0;
        let gIm = 0;
        const gr = Gk[p].re;
        const gi = Gk[p].im;
        for (let idx = 0; idx < size; idx++) {
          const val = Itot[idx];
          let dLdI = 0;
          if (mask[idx] > 0.5) {
            dLdI = fgWeight * val;
          } else if (val < bgFloor) {
            dLdI = -bgWeight * (1.0 - val) - bgWeight * 6.5 * (bgFloor - val);
          } else if (val < 1.0) {
            dLdI = -bgWeight * (1.0 - val);
          }
          if (dLdI !== 0) {
            const wri = wr[idx];
            const wii = wi[idx];
            gRe += dLdI * 2 * (wri * gr[idx] + wii * gi[idx]);
            gIm += dLdI * 2 * (-wri * gi[idx] + wii * gr[idx]);
          }
        }
        gRe = gRe * invSize + reg * uRe[k][p];
        gIm = gIm * invSize + reg * uIm[k][p];

        mRe[k][p] = b1 * mRe[k][p] + (1 - b1) * gRe;
        vRe[k][p] = b2 * vRe[k][p] + (1 - b2) * gRe * gRe;
        mIm[k][p] = b1 * mIm[k][p] + (1 - b1) * gIm;
        vIm[k][p] = b2 * vIm[k][p] + (1 - b2) * gIm * gIm;

        uRe[k][p] -= (lr * (mRe[k][p] / b1c)) / (Math.sqrt(vRe[k][p] / b2c) + eps);
        uIm[k][p] -= (lr * (mIm[k][p] / b1c)) / (Math.sqrt(vIm[k][p] / b2c) + eps);
      }
    }
  }

  const modeRe = Array.from({ length: K }, () => new Float32Array(size));
  const modeIm = Array.from({ length: K }, () => new Float32Array(size));
  const freqPowers = new Float64Array(K);
  let maxFreqPower = 1e-12;

  for (let k = 0; k < K; k++) {
    let pwr = 0;
    const wr = modeRe[k];
    const wi = modeIm[k];
    const Gk = G[k];
    for (let p = 0; p < P; p++) {
      const ur = uRe[k][p];
      const ui = uIm[k][p];
      pwr += ur * ur + ui * ui;
      const gr = Gk[p].re;
      const gi = Gk[p].im;
      for (let idx = 0; idx < size; idx++) {
        wr[idx] += ur * gr[idx] - ui * gi[idx];
        wi[idx] += ur * gi[idx] + ui * gr[idx];
      }
    }
    freqPowers[k] = pwr;
    if (pwr > maxFreqPower) maxFreqPower = pwr;
  }

  return { uRe, uIm, modeRe, modeIm, freqPowers, maxFreqPower };
}

export function solveInverseWaves(plateModel, mask, options = {}) {
  const t0 = performance.now();
  const N = plateModel.N;
  const size = N * N;
  const P = plateModel.actuators.length;

  const candFreqs = plateModel.candidateFreqs || plateModel.driveFreqs;
  const candG = plateModel.candidateGreenTensor || plateModel.greenTensor;
  const targetK = plateModel.targetFreqCount || candFreqs.length;

  let activeFreqs = candFreqs;
  let activeG = candG;

  // Stage 1: Real physical target-adaptive frequency discovery (16 broadband plate bands -> optimal K per shape)
  if (candFreqs.length > targetK && !options.skipAdaptiveSelect) {
    const probeIters = P >= 32 ? 24 : 34;
    const probe = runMinimaxAdam(N, P, candFreqs, candG, mask, probeIters);
    const picked = new Set();
    // Guarantee 1 strongest band per flexural quartile for full-wavelength stability
    const qSize = Math.floor(candFreqs.length / 4);
    for (let q = 0; q < 4; q++) {
      let best = q * qSize;
      const end = q === 3 ? candFreqs.length : (q + 1) * qSize;
      for (let k = best + 1; k < end; k++) {
        if (probe.freqPowers[k] > probe.freqPowers[best]) best = k;
      }
      picked.add(best);
    }
    // Fill remaining K - 4 channels with the highest-energy learned plate frequencies for this specific target
    const rest = Array.from(probe.freqPowers, (pwr, k) => ({ k, pwr }))
      .filter((item) => !picked.has(item.k))
      .sort((a, b) => b.pwr - a.pwr);
    for (let i = 0; i < rest.length && picked.size < targetK; i++) {
      picked.add(rest[i].k);
    }
    const chosenIdx = Array.from(picked).sort((a, b) => a - b);
    activeFreqs = chosenIdx.map((idx) => candFreqs[idx]);
    activeG = chosenIdx.map((idx) => candG[idx]);
  }

  // Stage 2: Precision Minimax-Barrier Adam synthesis on the selected winning K frequencies
  const K = activeFreqs.length;
  const iterations = options.iterations ?? (P >= 32 ? 135 : 145);
  const res = runMinimaxAdam(N, P, activeFreqs, activeG, mask, iterations);
  const { uRe, uIm, modeRe, modeIm, freqPowers } = res;
  let maxFreqPower = res.maxFreqPower;

  // Calibrate global amplifier voltage so mean background intensity = 1.0
  let bgSum = 0;
  let bgCnt = 0;
  for (let idx = 0; idx < size; idx++) {
    if (mask[idx] <= 0.5) {
      let val = 0;
      for (let k = 0; k < K; k++) {
        val += modeRe[k][idx] * modeRe[k][idx] + modeIm[k][idx] * modeIm[k][idx];
      }
      bgSum += val;
      bgCnt++;
    }
  }
  const bgMean = bgCnt > 0 ? bgSum / bgCnt : 1;
  const ampScale = bgMean > 1e-9 ? 1 / Math.sqrt(bgMean) : 1;

  const freqWaveEnergy = new Float64Array(K);
  let maxWaveEnergy = 1e-12;
  for (let k = 0; k < K; k++) {
    const wr = modeRe[k];
    const wi = modeIm[k];
    let wSum = 0;
    for (let idx = 0; idx < size; idx++) {
      wr[idx] *= ampScale;
      wi[idx] *= ampScale;
      wSum += wr[idx] * wr[idx] + wi[idx] * wi[idx];
    }
    freqWaveEnergy[k] = wSum / size;
    if (freqWaveEnergy[k] > maxWaveEnergy) maxWaveEnergy = freqWaveEnergy[k];
    for (let p = 0; p < P; p++) {
      uRe[k][p] *= ampScale;
      uIm[k][p] *= ampScale;
    }
    freqPowers[k] *= ampScale * ampScale;
  }
  maxFreqPower *= ampScale * ampScale;

  const freqWeights = Array.from(freqPowers, (p) => Math.sqrt(p / maxFreqPower));
  const freqWaveNorm = Array.from(freqWaveEnergy, (e) => Math.sqrt(e / maxWaveEnergy));
  const freqModes = activeFreqs.map((f) =>
    plateModel.getNearestModeInfo
      ? plateModel.getNearestModeInfo(f)
      : { modeLabel: '(m,n)', modeFreq: f, lambdaCm: 0 }
  );

  let dominantIndex = 0;
  for (let k = 1; k < K; k++) {
    if (freqWeights[k] > freqWeights[dominantIndex]) dominantIndex = k;
  }

  const actuatorStats = plateModel.actuators.map((act, p) => {
    let sumSq = 0;
    let sumRe = 0;
    let sumIm = 0;
    for (let k = 0; k < K; k++) {
      const ur = uRe[k][p];
      const ui = uIm[k][p];
      sumSq += ur * ur + ui * ui;
      sumRe += ur;
      sumIm += ui;
    }
    return {
      ...act,
      rms: Math.sqrt(sumSq),
      phase: Math.atan2(sumIm, sumRe),
    };
  });
  const maxActRms = Math.max(...actuatorStats.map((a) => a.rms), 1e-9);
  for (const a of actuatorStats) a.normAmp = a.rms / maxActRms;

  const solveMs = performance.now() - t0;

  const solution = {
    freqs: [...activeFreqs],
    uRe: uRe.map((arr) => Array.from(arr)),
    uIm: uIm.map((arr) => Array.from(arr)),
    modeRe,
    modeIm,
    freqPowers: Array.from(freqPowers),
    freqWeights,
    freqWaveNorm,
    freqModes,
    dominantIndex,
    candidatePoolCount: candFreqs.length,
    actuatorStats,
    mask: new Float32Array(mask),
    solveMs,
    hardwareMode: plateModel.hardwareMode,
    materialId: plateModel.material.id,
  };

  const fullEval = evaluateSolutionField(solution, new Array(K).fill(1));
  solution.intensity = fullEval.intensity;
  solution.metrics = fullEval.metrics;

  return solution;
}

export function evaluateSolutionField(solution, freqGains, modeOverrides = null) {
  const K = solution.freqs.length;
  const size = solution.modeRe[0].length;
  const intensity = new Float32Array(size);

  for (let k = 0; k < K; k++) {
    const g = freqGains[k] ?? 1;
    if (g <= 1e-4) continue;
    const gSq = g * g;
    const ov = modeOverrides && modeOverrides[k];
    const wr = ov ? ov.modeRe : solution.modeRe[k];
    const wi = ov ? ov.modeIm : solution.modeIm[k];
    for (let idx = 0; idx < size; idx++) {
      intensity[idx] += gSq * (wr[idx] * wr[idx] + wi[idx] * wi[idx]);
    }
  }

  const metrics = computeValidationMetrics(intensity, solution.mask);
  return { intensity, metrics };
}

export function computeValidationMetrics(intensity, mask) {
  const size = intensity.length;
  let maskCnt = 0;
  let bgCnt = 0;
  let maskMean = 0;
  let bgMean = 0;

  for (let idx = 0; idx < size; idx++) {
    if (mask[idx] > 0.5) {
      maskMean += intensity[idx];
      maskCnt++;
    } else {
      bgMean += intensity[idx];
      bgCnt++;
    }
  }

  if (maskCnt === 0 || bgCnt === 0) {
    return { iou: 0, contrast: 1, maskMean: 0, bgMean: 0 };
  }

  maskMean /= maskCnt;
  bgMean /= bgCnt;

  const sorted = Float32Array.from(intensity).sort();
  const thresh = sorted[Math.min(size - 1, maskCnt)];
  let overlap = 0;
  for (let idx = 0; idx < size; idx++) {
    if (mask[idx] > 0.5 && intensity[idx] <= thresh) overlap++;
  }
  const denom = 2 * maskCnt - overlap;
  const iou = denom > 0 ? (overlap / denom) * 100 : 0;
  const contrast = bgMean / (maskMean + 1e-6);

  return { iou, contrast, maskMean, bgMean };
}

/**
 * Exact 2D Euclidean distance transform to the target mask (used by 1-Speaker Closed-Loop Steering)
 */
export function computeDistanceField(mask, N) {
  const size = N * N;
  const dist = new Float32Array(size);
  const fgPts = [];
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      if (mask[j * N + i] > 0.5) fgPts.push([i, j]);
    }
  }
  if (fgPts.length === 0) {
    dist.fill(0);
    return dist;
  }
  const invN = 1 / N;
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      if (mask[j * N + i] > 0.5) {
        dist[j * N + i] = 0;
        continue;
      }
      let bestSq = 1e9;
      for (let q = 0; q < fgPts.length; q++) {
        const dx = i - fgPts[q][0];
        const dy = j - fgPts[q][1];
        const dSq = dx * dx + dy * dy;
        if (dSq < bestSq) bestSq = dSq;
      }
      dist[j * N + i] = Math.sqrt(bestSq) * invN;
    }
  }
  return dist;
}

/**
 * Zhou et al. (Nature Communications 2016) Closed-Loop Single-Speaker Controller:
 * Evaluates all 88 physical single-speaker eigen-responses against a live subsample
 * of sand grain positions and selects the optimal next frequency + drive gain.
 */
export function pickNextSingleSpeakerNote(bank, mask, distField, samplePx, samplePy, N, prevIdx = -1) {
  const sampleCount = samplePx.length;
  const Nm1 = N - 1;
  const rho = new Float32Array(N * N);
  let fgCells = 0;
  for (let idx = 0; idx < N * N; idx++) {
    if (mask[idx] > 0.5) fgCells++;
  }
  for (let i = 0; i < sampleCount; i++) {
    const ix = Math.min(Nm1, Math.max(0, (samplePx[i] * N) | 0));
    const iy = Math.min(Nm1, Math.max(0, (samplePy[i] * N) | 0));
    rho[iy * N + ix] += 1;
  }
  const idealPerCell = sampleCount / Math.max(1, fgCells);

  let bestIdx = 0;
  let bestGain = 2.0;
  let bestScore = Infinity;

  for (let k = 0; k < bank.length; k++) {
    if (k === prevIdx) continue; // force fresh wave mode to avoid static stagnation
    const sf = bank[k];
    const Iarr = sf.intensity;
    const gx = sf.gradX;
    const gy = sf.gradY;

    for (let gStep = 0; gStep < 2; gStep++) {
      const gain = gStep === 0 ? 1.8 : 2.6;
      let score = 0;
      for (let i = 0; i < sampleCount; i++) {
        const x = samplePx[i];
        const y = samplePy[i];
        const ix = Math.min(Nm1, Math.max(0, (x * N) | 0));
        const iy = Math.min(Nm1, Math.max(0, (y * N) | 0));
        const idx = iy * N + ix;
        const gam = gain * Math.sqrt(Iarr[idx]);
        let nx = x;
        let ny = y;
        if (gam > 1.0) {
          const ex = Math.min(gam - 1.0, 3.2);
          const gm = Math.hypot(gx[idx], gy[idx]) + 2.2;
          nx = Math.max(0.03, Math.min(0.97, nx - (gx[idx] / gm) * 0.036 * ex));
          ny = Math.max(0.03, Math.min(0.97, ny - (gy[idx] / gm) * 0.036 * ex));
        }
        const nix = Math.min(Nm1, Math.max(0, (nx * N) | 0));
        const niy = Math.min(Nm1, Math.max(0, (ny * N) | 0));
        const nidx = niy * N + nix;
        // Distance to target + mild anti-clumping term so grains spread across whole glyph
        score += distField[nidx] + (mask[nidx] > 0.5 && rho[nidx] > idealPerCell * 1.45 ? 0.035 : 0);
      }
      if (score < bestScore) {
        bestScore = score;
        bestIdx = k;
        bestGain = gain;
      }
    }
  }

  return { bankIdx: bestIdx, note: bank[bestIdx], gain: bestGain };
}
