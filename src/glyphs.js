/**
 * PULSE+ — High-Resolution Target Glyph, Word & Sentence Mask Rasterizer (48x48)
 * -------------------------------------------------------------------------------
 * - Precision geometric strokes for digits 0-9 tuned to the plate diffraction limit.
 * - High-contrast auto-kerned multi-character & 2-line word rasterizer supporting
 *   A-Z, Turkish characters (Ç, Ğ, İ, Ö, Ş, Ü), digits, and symbols (+, -, !, ?, #).
 * - Long-sentence tokenizer for Character-by-Character, Word-by-Word, and Single-Plate modes.
 */

import { GRID_N } from './physics.js';

function distSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy || 1e-9;
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function arcPoints(cx, cy, rx, ry, startDeg, endDeg, steps = 18) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const a = ((startDeg + (endDeg - startDeg) * (i / steps)) * Math.PI) / 180;
    pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  return pts;
}

const DIGIT_STROKES = {
  '0': [arcPoints(0.5, 0.5, 0.19, 0.30, 0, 360, 28)],
  '1': [
    [
      [0.37, 0.31],
      [0.51, 0.19],
      [0.51, 0.81],
    ],
    [
      [0.34, 0.81],
      [0.68, 0.81],
    ],
  ],
  '2': [
    [
      ...arcPoints(0.5, 0.34, 0.18, 0.14, 195, 360, 14),
      [0.68, 0.38],
      [0.62, 0.48],
      [0.32, 0.80],
      [0.70, 0.80],
    ],
  ],
  '3': [
    [
      ...arcPoints(0.49, 0.34, 0.18, 0.14, 200, 445, 16),
      [0.45, 0.49],
    ],
    [
      [0.47, 0.49],
      ...arcPoints(0.49, 0.65, 0.19, 0.15, -75, 165, 16),
    ],
  ],
  '4': [
    [
      [0.61, 0.81],
      [0.61, 0.19],
      [0.29, 0.59],
      [0.72, 0.59],
    ],
  ],
  '5': [
    [
      [0.67, 0.21],
      [0.35, 0.21],
      [0.34, 0.46],
      [0.52, 0.46],
      ...arcPoints(0.51, 0.64, 0.18, 0.16, -75, 165, 16),
    ],
  ],
  '6': [
    [
      ...arcPoints(0.51, 0.36, 0.17, 0.16, -35, -185, 12),
      [0.32, 0.62],
    ],
    arcPoints(0.50, 0.64, 0.18, 0.16, 0, 360, 24),
  ],
  '7': [
    [
      [0.29, 0.21],
      [0.70, 0.21],
      [0.44, 0.80],
    ],
  ],
  '8': [
    arcPoints(0.50, 0.34, 0.165, 0.145, 0, 360, 22),
    arcPoints(0.50, 0.65, 0.185, 0.16, 0, 360, 24),
  ],
  '9': [
    arcPoints(0.50, 0.35, 0.18, 0.155, 0, 360, 24),
    [
      [0.68, 0.37],
      ...arcPoints(0.49, 0.64, 0.19, 0.16, 0, 145, 12),
    ],
  ],
};

function rasterizeStrokes(strokes, N, radius) {
  const mask = new Float32Array(N * N);
  for (let j = 0; j < N; j++) {
    const y = (j + 0.5) / N;
    for (let i = 0; i < N; i++) {
      const x = (i + 0.5) / N;
      let minD = 999;
      for (const poly of strokes) {
        for (let k = 0; k < poly.length - 1; k++) {
          const d = distSegment(x, y, poly[k][0], poly[k][1], poly[k + 1][0], poly[k + 1][1]);
          if (d < minD) minD = d;
        }
      }
      mask[j * N + i] = minD <= radius ? 1 : 0;
    }
  }
  return mask;
}

/**
 * Draw a single line of text with explicit character spacing so adjacent letters
 * never blur into one another under acoustic diffraction limits.
 */
function drawSpacedLine(ctx, line, cx, cy, trackingPx, boldStroke = 0) {
  const chars = Array.from(line);
  const drawChar = (ch, x, y) => {
    if (boldStroke > 0) {
      ctx.lineWidth = boldStroke;
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#fff';
      ctx.strokeText(ch, x, y);
    }
    ctx.fillText(ch, x, y);
  };
  if (chars.length === 1) {
    drawChar(chars[0], cx, cy);
    return;
  }
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const totalW = widths.reduce((a, b) => a + b, 0) + trackingPx * (chars.length - 1);
  let cursor = cx - totalW / 2;
  for (let i = 0; i < chars.length; i++) {
    drawChar(chars[i], cursor + widths[i] / 2, cy);
    cursor += widths[i] + trackingPx;
  }
}

function measureSpacedWidth(ctx, line, trackingPx) {
  const chars = Array.from(line);
  if (chars.length === 0) return 0;
  let w = 0;
  for (let i = 0; i < chars.length; i++) w += ctx.measureText(chars[i]).width;
  return w + trackingPx * Math.max(0, chars.length - 1);
}

/**
 * Rasterize any digit, Turkish/Latin letter, symbol, or multi-letter word cleanly onto N x N.
 */
export function buildGlyphMask(text, N = GRID_N) {
  const raw = (text || '0').trim().toLocaleUpperCase('tr-TR');
  if (!raw) return rasterizeStrokes(DIGIT_STROKES['0'], N, 0.058);

  if (raw.length === 1 && DIGIT_STROKES[raw]) {
    return rasterizeStrokes(DIGIT_STROKES[raw], N, 0.058);
  }

  const S = 256;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, S, S);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Split 5-8 char strings cleanly into 2 balanced rows so each character stays acoustically crisp
  let lines = [raw];
  if (raw.includes(' ')) {
    const parts = raw.split(/\s+/).filter(Boolean);
    if (parts.length === 2 && parts[0].length <= 4 && parts[1].length <= 4) {
      lines = parts;
    } else {
      lines = [raw.replace(/\s+/g, ' ').slice(0, 8)];
    }
  } else if (raw.length >= 5 && raw.length <= 8) {
    const mid = Math.ceil(raw.length / 2);
    lines = [raw.slice(0, mid), raw.slice(mid)];
  }

  const maxLineLen = Math.max(...lines.map((l) => Array.from(l).length));
  let fontSize = lines.length === 2 ? 96 : maxLineLen === 1 ? 185 : maxLineLen === 2 ? 128 : 98;
  const tracking = maxLineLen === 1 ? 0 : Math.round(fontSize * 0.14);
  const maxWidth = S * 0.84;

  while (fontSize > 34) {
    ctx.font = `800 ${fontSize}px "Inter", "Segoe UI", Arial, sans-serif`;
    const tr = maxLineLen === 1 ? 0 : Math.round(fontSize * 0.13);
    const widest = Math.max(...lines.map((l) => measureSpacedWidth(ctx, l, tr)));
    if (widest <= maxWidth) break;
    fontSize -= 4;
  }

  const finalTracking = maxLineLen === 1 ? 0 : Math.round(fontSize * 0.22);
  const boldStroke = lines.length === 2 ? Math.round(fontSize * 0.04) : 0;
  ctx.font = `700 ${fontSize}px "Inter", "Segoe UI", Arial, sans-serif`;

  if (lines.length === 1) {
    drawSpacedLine(ctx, lines[0], S / 2, S / 2, finalTracking, boldStroke);
  } else {
    const gapY = fontSize * 0.62;
    drawSpacedLine(ctx, lines[0], S / 2, S / 2 - gapY, finalTracking, boldStroke);
    drawSpacedLine(ctx, lines[1], S / 2, S / 2 + gapY, finalTracking, boldStroke);
  }

  // Tight optical bounding box
  const img = ctx.getImageData(0, 0, S, S).data;
  let minX = S, maxX = 0, minY = S, maxY = 0;
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      if (img[(y * S + x) * 4] > 90) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX <= minX || maxY <= minY) {
    return rasterizeStrokes(DIGIT_STROKES['0'], N, 0.058);
  }

  // Fit inside safe interior zone (away from perimeter piezo transducers)
  const out = document.createElement('canvas');
  out.width = N;
  out.height = N;
  const octx = out.getContext('2d', { willReadFrequently: true });
  octx.fillStyle = '#000';
  octx.fillRect(0, 0, N, N);

  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  const isSingle = lines.length === 1 && Array.from(lines[0]).length === 1;
  const targetW = N * (isSingle ? 0.64 : 0.80);
  const targetH = N * (isSingle ? 0.68 : lines.length === 2 ? 0.74 : 0.62);
  const scale = Math.min(targetW / bw, targetH / bh);

  const dw = bw * scale;
  const dh = bh * scale;
  const dx = (N - dw) / 2;
  const dy = (N - dh) / 2;

  octx.imageSmoothingEnabled = true;
  octx.drawImage(canvas, minX, minY, bw, bh, dx, dy, dw, dh);

  const outData = octx.getImageData(0, 0, N, N).data;
  const mask = new Float32Array(N * N);
  const threshold = isSingle ? 85 : 95;
  for (let idx = 0; idx < N * N; idx++) {
    mask[idx] = outData[idx * 4] > threshold ? 1 : 0;
  }

  return mask;
}

/**
 * Tokenize arbitrary long Turkish/English sentences into sequence steps.
 * - 'char'   : Individual letters/digits/symbols (spaces skipped cleanly)
 * - 'word'   : Whole words (chunked cleanly to <= 6 chars per plate so every word stays crisp)
 * - 'single' : Whole short phrase on a single plate at once (up to 8 chars)
 */
export function tokenizeTextForPlate(inputText, mode = 'char') {
  const clean = (inputText || '').trim().toLocaleUpperCase('tr-TR');
  if (!clean) return [];

  if (mode === 'single') {
    return [clean.slice(0, 8)];
  }

  if (mode === 'word') {
    const words = clean.split(/\s+/).filter(Boolean);
    const chunks = [];
    for (const w of words) {
      const chars = Array.from(w);
      if (chars.length <= 6) {
        chunks.push(w);
      } else {
        // Chunk very long words into clean readable 4-char blocks
        for (let i = 0; i < chars.length; i += 4) {
          chunks.push(chars.slice(i, i + 4).join(''));
        }
      }
    }
    return chunks;
  }

  // 'char': letter by letter (filter out pure whitespace)
  return Array.from(clean).filter((c) => !/\s/.test(c));
}

export function paintMaskBrush(mask, nx, ny, radius = 0.056, value = 1, N = GRID_N) {
  for (let j = 0; j < N; j++) {
    const y = (j + 0.5) / N;
    for (let i = 0; i < N; i++) {
      const x = (i + 0.5) / N;
      if (Math.hypot(x - nx, y - ny) <= radius) {
        mask[j * N + i] = value;
      }
    }
  }
}
