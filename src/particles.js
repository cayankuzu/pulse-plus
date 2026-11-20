/**
 * PULSE+ — High-Density 3D Ballistic Granular Sand Physics & Renderer
 * --------------------------------------------------------------------
 * Models 25,000 to 85,000 individual quartz sand grains on a 25 cm x 25 cm plate.
 *
 * Strictly physical mechanics (NO target-mask steering inside particle step):
 *   1. Local peak acceleration:     Gamma(x,y) = Gamma_0 * sqrt(I(x,y))
 *   2. Newton separation:           Grain launches iff Gamma(x,y) > 1.0 (a_plate > g)
 *   3. Launch normal-slope kick:    Plate normal at w > g/omega^2 > 0 pushes along -grad(I)
 *   4. Micro-facet oblique scatter: Stochastic bounce dispersion on vibrating antinodes
 *   5. Ballistic flight + gravity:  Parabolic z(t) trajectory & Coulomb impact friction
 *   6. Granular excluded volume:    84x84 packing grid prevents 1-pixel rim collapse
 */

import { GRID_N } from './physics.js';

function packABGR(r, g, b, a = 255) {
  return ((a & 255) << 24) | ((b & 255) << 16) | ((g & 255) << 8) | (r & 255);
}

class FastRng {
  constructor(seed = 0x51a7c0de) {
    this.s = seed >>> 0;
  }
  next() {
    let x = this.s;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.s = x >>> 0;
    return (this.s & 0xfffffff) / 0x10000000;
  }
}

export class SandSimulation {
  constructor(canvas, count = 45000) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.W = canvas.width;
    this.H = canvas.height;
    this.N = GRID_N;

    this.imageData = this.ctx.createImageData(this.W, this.H);
    this.pixels32 = new Uint32Array(this.imageData.data.buffer);
    this.basePlate32 = new Uint32Array(this.W * this.H);

    // 84x84 granular packing grid for physical excluded-volume sand-pile slumping
    this.packN = 84;
    this.packGrid = new Float32Array(this.packN * this.packN);
    this.reorganizePulse = 0;

    // Strictly wave-derived physical arrays (zero target-mask cheating)
    const size = this.N * this.N;
    this.intensity = new Float32Array(size);
    this.gradX = new Float32Array(size);
    this.gradY = new Float32Array(size);

    // Visual-only overlay state
    this.overlayMode = 'sand'; // 'sand' | 'heatmap' | 'wave' | 'target'
    this.waveModeRe = [];
    this.waveModeIm = [];
    this.waveFreqs = [];
    this.waveGains = [];
    this.targetMask = null;
    this.actuators = [];
    this.phaseClock = 0;

    // Calibrated so mean background I = 1.0 => Gamma = gammaGain
    this.gammaGain = 3.2;
    this.isActive = false;

    this.rng = new FastRng(20261119);
    this._buildBasePlateTexture();
    this.setParticleCount(count);
  }

  _buildBasePlateTexture() {
    const W = this.W;
    const H = this.H;
    const cx = W * 0.5;
    const cy = H * 0.5;
    const maxR = Math.hypot(cx, cy);

    for (let y = 0; y < H; y++) {
      const brush = Math.sin(y * 1.9) * 0.9 + Math.cos(y * 0.41) * 0.7;
      for (let x = 0; x < W; x++) {
        const r = Math.hypot(x - cx, y - cy) / maxR;
        const vignette = 1 - 0.44 * r * r;
        const base = (18 + brush) * vignette;

        const rC = Math.max(8, Math.min(34, Math.round(base * 0.92)));
        const gC = Math.max(8, Math.min(34, Math.round(base * 0.93)));
        const bC = Math.max(9, Math.min(38, Math.round(base * 0.98)));
        this.basePlate32[y * W + x] = packABGR(rC, gC, bC, 255);
      }
    }
  }

  setParticleCount(count) {
    this.count = count;
    this.px = new Float32Array(count);
    this.py = new Float32Array(count);
    this.pz = new Float32Array(count);
    this.vx = new Float32Array(count);
    this.vy = new Float32Array(count);
    this.vz = new Float32Array(count);
    this.shade = new Float32Array(count);
    this.scatterUniform();
  }

  scatterUniform() {
    for (let i = 0; i < this.count; i++) {
      this.px[i] = 0.04 + this.rng.next() * 0.92;
      this.py[i] = 0.04 + this.rng.next() * 0.92;
      this.pz[i] = 0;
      this.vx[i] = 0;
      this.vy[i] = 0;
      this.vz[i] = 0;
      this.shade[i] = 0.76 + this.rng.next() * 0.36;
    }
  }

  setWaveField(
    intensity,
    { modeRe = [], modeIm = [], freqs = [], gains = [], actuators = [], targetMask = null, pulse = false } = {}
  ) {
    this.intensity.set(intensity);
    this.waveModeRe = modeRe;
    this.waveModeIm = modeIm;
    this.waveFreqs = freqs;
    this.waveGains = gains;
    this.actuators = actuators;
    this.targetMask = targetMask;
    if (pulse) {
      this.reorganizePulse = 0.24;
    }

    const N = this.N;
    const Nm1 = N - 1;
    const halfN = N * 0.5;
    for (let j = 0; j < N; j++) {
      const jm = j > 0 ? j - 1 : 0;
      const jp = j < Nm1 ? j + 1 : Nm1;
      const row = j * N;
      const rowM = jm * N;
      const rowP = jp * N;
      for (let i = 0; i < N; i++) {
        const im = i > 0 ? i - 1 : 0;
        const ip = i < Nm1 ? i + 1 : Nm1;
        this.gradX[row + i] = (intensity[row + ip] - intensity[row + im]) * halfN;
        this.gradY[row + i] = (intensity[rowP + i] - intensity[rowM + i]) * halfN;
      }
    }
  }

  /**
   * Subsample live sand positions (virtual overhead camera feedback for 1-Speaker closed-loop steering)
   */
  sampleParticlePositions(maxSamples = 480) {
    const step = Math.max(1, Math.floor(this.count / maxSamples));
    const n = Math.ceil(this.count / step);
    const sx = new Float32Array(n);
    const sy = new Float32Array(n);
    let idx = 0;
    for (let i = 0; i < this.count && idx < n; i += step) {
      sx[idx] = this.px[i];
      sy[idx] = this.py[i];
      idx++;
    }
    return { samplePx: sx, samplePy: sy };
  }

  step(dt, gammaOverride = null) {
    if (!(dt > 0)) return;
    this.phaseClock += dt;
    if (!this.isActive) {
      this._settleOnly(dt);
      return;
    }

    const substeps = 2;
    const sdt = Math.min(dt, 0.033) / substeps;
    const N = this.N;
    const Nm1 = N - 1;
    const Iarr = this.intensity;
    const gXarr = this.gradX;
    const gYarr = this.gradY;
    const gamma0 = gammaOverride ?? this.gammaGain;

    const gNorm = 9.81 / 0.25;
    const launchVelScale = 0.34;
    const slopeDriftScale = 0.46;
    const roughScatterScale = 0.40;
    const restFriction = Math.pow(0.002, sdt);
    const airDrag = Math.pow(0.55, sdt);

    const px = this.px;
    const py = this.py;
    const pz = this.pz;
    const vx = this.vx;
    const vy = this.vy;
    const vz = this.vz;
    const rng = this.rng;
    const count = this.count;

    // Update 84x84 granular excluded-volume packing grid
    const pN = this.packN;
    const pNm1 = pN - 1;
    const pGrid = this.packGrid;
    pGrid.fill(0);
    for (let i = 0; i < count; i++) {
      const bx = (px[i] * pN) | 0;
      const by = (py[i] * pN) | 0;
      if (bx >= 0 && bx < pN && by >= 0 && by < pN) {
        pGrid[by * pN + bx] += 1;
      }
    }
    const monolayerCap = Math.max(5, (count / (pN * pN)) * 2.2);
    const invMonolayer = 1 / monolayerCap;

    const inPulse = this.reorganizePulse > 0;
    if (inPulse) {
      this.reorganizePulse = Math.max(0, this.reorganizePulse - dt);
    }

    for (let s = 0; s < substeps; s++) {
      for (let i = 0; i < count; i++) {
        let x = px[i];
        let y = py[i];
        let z = pz[i];
        let vxi = vx[i];
        let vyi = vy[i];
        let vzi = vz[i];

        if (z > 0) {
          vzi -= gNorm * sdt;
          z += vzi * sdt;
          x += vxi * sdt;
          y += vyi * sdt;
          vxi *= airDrag;
          vyi *= airDrag;

          if (z <= 0) {
            z = 0;
            vzi = 0;
            vxi *= 0.56;
            vyi *= 0.56;
          }
        }

        // Reflective acrylic plate perimeter guard lip
        if (x < 0.028) {
          x = 0.028;
          vxi = Math.abs(vxi) * 0.65;
        } else if (x > 0.972) {
          x = 0.972;
          vxi = -Math.abs(vxi) * 0.65;
        }
        if (y < 0.028) {
          y = 0.028;
          vyi = Math.abs(vyi) * 0.65;
        } else if (y > 0.972) {
          y = 0.972;
          vyi = -Math.abs(vyi) * 0.65;
        }

        if (z <= 0) {
          z = 0;
          const gx = x * N - 0.5;
          const gy = y * N - 0.5;
          const ix0 = gx < 0 ? 0 : gx >= Nm1 ? Nm1 : gx | 0;
          const iy0 = gy < 0 ? 0 : gy >= Nm1 ? Nm1 : gy | 0;
          const ix1 = ix0 < Nm1 ? ix0 + 1 : Nm1;
          const iy1 = iy0 < Nm1 ? iy0 + 1 : Nm1;
          const tx = gx <= 0 ? 0 : gx >= Nm1 ? 1 : gx - ix0;
          const ty = gy <= 0 ? 0 : gy >= Nm1 ? 1 : gy - iy0;

          const row0 = iy0 * N;
          const row1 = iy1 * N;
          const i00 = row0 + ix0;
          const i10 = row0 + ix1;
          const i01 = row1 + ix0;
          const i11 = row1 + ix1;

          const omx = 1 - tx;
          const omy = 1 - ty;
          const w00 = omx * omy;
          const w10 = tx * omy;
          const w01 = omx * ty;
          const w11 = tx * ty;

          const Ival = Iarr[i00] * w00 + Iarr[i10] * w10 + Iarr[i01] * w01 + Iarr[i11] * w11;
          const gamma = gamma0 * Math.sqrt(Ival > 0 ? Ival : 0) + (inPulse ? 1.55 : 0);

          if (gamma > 1.0) {
            const excess = gamma - 1.0 > 4.5 ? 4.5 : gamma - 1.0;
            const dIx = gXarr[i00] * w00 + gXarr[i10] * w10 + gXarr[i01] * w01 + gXarr[i11] * w11;
            const dIy = gYarr[i00] * w00 + gYarr[i10] * w10 + gYarr[i01] * w01 + gYarr[i11] * w11;

            const gMag = Math.hypot(dIx, dIy);
            const normScale = gMag > 1e-5 ? 1 / (gMag + 2.4) : 0;
            const driftMag = (inPulse ? slopeDriftScale * 0.22 : slopeDriftScale) * (excess > 3.0 ? 3.0 : excess);

            const ang = rng.next() * 6.2831853;
            const sqrtEx = Math.sqrt(excess);
            const scatterMag =
              (inPulse ? roughScatterScale * 1.45 : roughScatterScale) *
              sqrtEx *
              (0.4 + 0.9 * rng.next());

            vxi = vxi * 0.42 - dIx * normScale * driftMag + Math.cos(ang) * scatterMag;
            vyi = vyi * 0.42 - dIy * normScale * driftMag + Math.sin(ang) * scatterMag;
            vzi = launchVelScale * sqrtEx * (0.55 + 0.75 * rng.next());

            z = vzi * sdt * 0.5;
            x += vxi * sdt;
            y += vyi * sdt;
          } else {
            // Quiet nodal region (a_peak <= g): Coulomb arrest + excluded-volume sand-pile slumping
            const bx = (x * pN) | 0;
            const by = (y * pN) | 0;
            const cbx = bx < 0 ? 0 : bx > pNm1 ? pNm1 : bx;
            const cby = by < 0 ? 0 : by > pNm1 ? pNm1 : by;
            const localRho = pGrid[cby * pN + cbx];

            if (localRho > monolayerCap && gamma > 0.05) {
              const leftRho = cbx > 0 ? pGrid[cby * pN + cbx - 1] : localRho;
              const rightRho = cbx < pNm1 ? pGrid[cby * pN + cbx + 1] : localRho;
              const upRho = cby > 0 ? pGrid[(cby - 1) * pN + cbx] : localRho;
              const downRho = cby < pNm1 ? pGrid[(cby + 1) * pN + cbx] : localRho;

              const invR = 1 / (localRho + 2);
              const slumpX = (leftRho - rightRho) * invR;
              const slumpY = (upRho - downRho) * invR;
              const over = (localRho - monolayerCap) * invMonolayer;
              const slumpSpeed = 0.095 * (over > 2.5 ? 2.5 : over);
              const jAng = rng.next() * 6.2831853;
              const microCreep = 0.014 * gamma;

              vxi = vxi * 0.5 + slumpX * slumpSpeed + Math.cos(jAng) * microCreep;
              vyi = vyi * 0.5 + slumpY * slumpSpeed + Math.sin(jAng) * microCreep;
              x += vxi * sdt;
              y += vyi * sdt;
            } else {
              vxi *= restFriction;
              vyi *= restFriction;
              x += vxi * sdt;
              y += vyi * sdt;
              if (vxi > -5e-4 && vxi < 5e-4) vxi = 0;
              if (vyi > -5e-4 && vyi < 5e-4) vyi = 0;
            }
          }
        }

        px[i] = x;
        py[i] = y;
        pz[i] = z;
        vx[i] = vxi;
        vy[i] = vyi;
        vz[i] = vzi;
      }
    }
  }

  _settleOnly(dt) {
    const sdt = Math.min(dt, 0.033);
    const gNorm = 9.81 / 0.25;
    const damp = Math.pow(0.01, sdt);
    for (let i = 0; i < this.count; i++) {
      if (this.pz[i] > 0) {
        this.vz[i] -= gNorm * sdt;
        this.pz[i] += this.vz[i] * sdt;
        if (this.pz[i] <= 0) {
          this.pz[i] = 0;
          this.vz[i] = 0;
        }
      }
      this.vx[i] *= damp;
      this.vy[i] *= damp;
      this.px[i] = Math.max(0.028, Math.min(0.972, this.px[i] + this.vx[i] * sdt));
      this.py[i] = Math.max(0.028, Math.min(0.972, this.py[i] + this.vy[i] * sdt));
    }
  }

  getSettledRatio() {
    let settled = 0;
    const N = this.N;
    const Nm1 = N - 1;
    const Iarr = this.intensity;
    const gamma0 = this.gammaGain;
    const step = 8;
    let total = 0;
    for (let i = 0; i < this.count; i += step) {
      total++;
      const ix = Math.min(Nm1, Math.max(0, (this.px[i] * N) | 0));
      const iy = Math.min(Nm1, Math.max(0, (this.py[i] * N) | 0));
      const gamma = gamma0 * Math.sqrt(Iarr[iy * N + ix]);
      if (gamma <= 1.05 && this.pz[i] <= 0) settled++;
    }
    return total > 0 ? (settled / total) * 100 : 0;
  }

  /**
   * Percentage of grains physically located inside targetMask (live validation metric!)
   */
  getTargetOverlapRatio() {
    if (!this.targetMask) return 0;
    const N = this.N;
    const Nm1 = N - 1;
    const mask = this.targetMask;
    const step = 8;
    let inMask = 0;
    let total = 0;
    for (let i = 0; i < this.count; i += step) {
      total++;
      const ix = Math.min(Nm1, Math.max(0, (this.px[i] * N) | 0));
      const iy = Math.min(Nm1, Math.max(0, (this.py[i] * N) | 0));
      if (mask[iy * N + ix] > 0.5) inMask++;
    }
    return total > 0 ? (inMask / total) * 100 : 0;
  }

  render() {
    const W = this.W;
    const H = this.H;
    const dst = this.pixels32;

    if (this.overlayMode === 'heatmap') {
      this._renderHeatmapBackdrop(dst);
    } else if (this.overlayMode === 'wave') {
      this._renderWavePhaseBackdrop(dst);
    } else {
      dst.set(this.basePlate32);
    }

    const px = this.px;
    const py = this.py;
    const pz = this.pz;
    const shade = this.shade;
    const count = this.count;

    // Scale per-grain brightness cleanly with grain count so 25k and 85k both look rich & crisp
    const densityGain = Math.sqrt(26000 / Math.max(15000, count));
    const baseR = 112 * densityGain;
    const baseG = 95 * densityGain;
    const baseB = 58 * densityGain;

    for (let i = 0; i < count; i++) {
      const sx = (px[i] * W) | 0;
      const lift = pz[i] > 0 ? Math.min(6, (pz[i] * 55) | 0) : 0;
      const sy = ((py[i] * H) | 0) - lift;
      if (sx < 1 || sx >= W - 1 || sy < 1 || sy >= H - 1) continue;

      const idx = sy * W + sx;
      const cur = dst[idx];
      const s = shade[i] * (pz[i] > 0 ? 1.32 : 1.0);
      const addR = (baseR * s) | 0;
      const addG = (baseG * s) | 0;
      const addB = (baseB * s) | 0;

      const nr = (cur & 255) + addR;
      const ng = ((cur >>> 8) & 255) + addG;
      const nb = ((cur >>> 16) & 255) + addB;
      dst[idx] = packABGR(nr > 255 ? 255 : nr, ng > 248 ? 248 : ng, nb > 222 ? 222 : nb, 255);

      const idx2 = idx + 1;
      const cur2 = dst[idx2];
      const r2 = (cur2 & 255) + (addR >> 1);
      const g2 = ((cur2 >>> 8) & 255) + (addG >> 1);
      const b2 = ((cur2 >>> 16) & 255) + (addB >> 1);
      dst[idx2] = packABGR(r2 > 255 ? 255 : r2, g2 > 246 ? 246 : g2, b2 > 218 ? 218 : b2, 255);
    }

    this.ctx.putImageData(this.imageData, 0, 0);

    if (this.overlayMode === 'target' && this.targetMask) {
      this._drawTargetContour();
    }
    this._drawActuators();
  }

  _renderHeatmapBackdrop(dst) {
    const W = this.W;
    const H = this.H;
    const N = this.N;
    const Nm1 = N - 1;
    const Iarr = this.intensity;
    const gamma0 = this.gammaGain;

    for (let y = 0; y < H; y++) {
      const gy = (y / H) * N - 0.5;
      const iy0 = gy < 0 ? 0 : gy >= Nm1 ? Nm1 : gy | 0;
      const iy1 = iy0 < Nm1 ? iy0 + 1 : Nm1;
      const ty = Math.max(0, Math.min(1, gy - iy0));
      const row = y * W;

      for (let x = 0; x < W; x++) {
        const gx = (x / W) * N - 0.5;
        const ix0 = gx < 0 ? 0 : gx >= Nm1 ? Nm1 : gx | 0;
        const ix1 = ix0 < Nm1 ? ix0 + 1 : Nm1;
        const tx = Math.max(0, Math.min(1, gx - ix0));

        const Ival =
          Iarr[iy0 * N + ix0] * (1 - tx) * (1 - ty) +
          Iarr[iy0 * N + ix1] * tx * (1 - ty) +
          Iarr[iy1 * N + ix0] * (1 - tx) * ty +
          Iarr[iy1 * N + ix1] * tx * ty;

        const gamma = gamma0 * Math.sqrt(Math.max(0, Ival));
        let r, g, b;
        if (gamma < 1.0) {
          r = 7 + gamma * 8;
          g = 13 + gamma * 22;
          b = 25 + gamma * 46;
        } else {
          const t = Math.min(1, (gamma - 1.0) / 3.5);
          if (t < 0.5) {
            const u = t * 2;
            r = 15 + u * 26;
            g = 48 + u * 88;
            b = 96 + u * 44;
          } else {
            const u = (t - 0.5) * 2;
            r = 41 + u * 155;
            g = 136 - u * 64;
            b = 140 - u * 95;
          }
        }
        dst[row + x] = packABGR(r | 0, g | 0, b | 0, 255);
      }
    }
  }

  _renderWavePhaseBackdrop(dst) {
    const W = this.W;
    const H = this.H;
    const N = this.N;
    const Nm1 = N - 1;
    const K = this.waveModeRe.length;

    const snap = new Float32Array(N * N);
    const t = this.phaseClock;
    for (let k = 0; k < K; k++) {
      const gain = this.waveGains[k] ?? 1;
      if (gain <= 1e-4) continue;
      const visOmega = (this.waveFreqs[k] || 500) * 0.012;
      const cosT = Math.cos(visOmega * t) * gain;
      const sinT = Math.sin(visOmega * t) * gain;
      const wr = this.waveModeRe[k];
      const wi = this.waveModeIm[k];
      for (let idx = 0; idx < N * N; idx++) {
        snap[idx] += wr[idx] * cosT - wi[idx] * sinT;
      }
    }

    for (let y = 0; y < H; y++) {
      const gy = (y / H) * N - 0.5;
      const iy0 = gy < 0 ? 0 : gy >= Nm1 ? Nm1 : gy | 0;
      const iy1 = iy0 < Nm1 ? iy0 + 1 : Nm1;
      const ty = Math.max(0, Math.min(1, gy - iy0));
      const row = y * W;

      for (let x = 0; x < W; x++) {
        const gx = (x / W) * N - 0.5;
        const ix0 = gx < 0 ? 0 : gx >= Nm1 ? Nm1 : gx | 0;
        const ix1 = ix0 < Nm1 ? ix0 + 1 : Nm1;
        const tx = Math.max(0, Math.min(1, gx - ix0));

        const val =
          snap[iy0 * N + ix0] * (1 - tx) * (1 - ty) +
          snap[iy0 * N + ix1] * tx * (1 - ty) +
          snap[iy1 * N + ix0] * (1 - tx) * ty +
          snap[iy1 * N + ix1] * tx * ty;

        const c = Math.max(-1, Math.min(1, val * 0.52));
        let r = 14, g = 18, b = 26;
        if (c > 0) {
          r += c * 30;
          g += c * 112;
          b += c * 158;
        } else {
          const a = -c;
          r += a * 142;
          g += a * 40;
          b += a * 96;
        }
        dst[row + x] = packABGR(r | 0, g | 0, b | 0, 255);
      }
    }
  }

  _drawTargetContour() {
    const ctx = this.ctx;
    const N = this.N;
    const cw = this.W / N;
    const ch = this.H / N;
    ctx.save();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.16)';
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        if (this.targetMask[j * N + i] > 0.5) {
          ctx.fillRect(i * cw, j * ch, cw, ch);
        }
      }
    }
    ctx.restore();
  }

  _drawActuators() {
    if (!this.actuators || this.actuators.length === 0) return;
    const ctx = this.ctx;
    const W = this.W;
    const H = this.H;
    const t = this.phaseClock;
    const total = this.actuators.length;
    const padLen = total >= 70 ? 11 : total >= 36 ? 15 : 18;
    const padThick = total >= 70 ? 5 : 6;

    ctx.save();
    for (let i = 0; i < total; i++) {
      const a = this.actuators[i];
      const cx = a.x * W;
      const cy = a.y * H;
      const amp = this.isActive ? (a.normAmp ?? 0.85) : 0.14;
      const pulse = this.isActive ? 0.5 + 0.5 * Math.sin(t * 15 + (a.phase ?? 0)) : 0;

      if (a.edge === 'center') {
        // Real single-speaker acoustic driver cone & ripple rings (Classic Chladni mode)
        for (let ring = 0; ring < 2; ring++) {
          const rad = 11 + ring * 9 + pulse * 5 * amp;
          ctx.beginPath();
          ctx.arc(cx, cy, rad, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(232, 196, 118, ${(0.36 - ring * 0.14) * (0.3 + 0.7 * amp)})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = this.isActive ? '#e8c476' : '#52525b';
        ctx.fill();
      } else {
        // Precision machined perimeter surface exciter / piezo pad along the 4 edges
        const isHoriz = a.edge === 'top' || a.edge === 'bottom';
        const rw = isHoriz ? padLen : padThick;
        const rh = isHoriz ? padThick : padLen;
        const rx = Math.max(2, Math.min(W - rw - 2, cx - rw / 2));
        const ry = Math.max(2, Math.min(H - rh - 2, cy - rh / 2));

        const lum = 0.45 + 0.55 * pulse;
        const rCol = Math.round(140 + 100 * amp * lum);
        const gCol = Math.round(125 + 80 * amp * lum);
        const bCol = Math.round(92 + 35 * amp);
        ctx.fillStyle = this.isActive
          ? `rgba(${rCol}, ${gCol}, ${bCol}, ${0.42 + 0.58 * amp})`
          : 'rgba(113, 113, 122, 0.35)';
        ctx.fillRect(rx, ry, rw, rh);
      }
    }
    ctx.restore();
  }
}
