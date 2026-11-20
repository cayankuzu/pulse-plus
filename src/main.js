/**
 * PULSE+ — Main Application Controller (Bilingual TR / EN)
 * Digital Twin of a 100% flat, uncut, bar-free 25x25 cm thin metal Chladni plate
 * driven by perimeter piezo / surface exciters (8 / 16 / 40 channels) or 1 speaker,
 * with per-frequency real Kirchhoff-Love manual controls, (?) help tooltips,
 * plain-language + academic guide, and non-blocking expanding Physics Lab.
 */

import { GRID_N, MATERIALS } from './physics.js';
import { evaluateSolutionField } from './solver.js';
import { SandSimulation } from './particles.js';
import { AcousticSynth } from './audio.js';
import { buildGlyphMask, tokenizeTextForPlate, paintMaskBrush } from './glyphs.js';
import { AcousticPuzzleGame, GAME_LEVELS } from './game.js';
import { getHelpTip, renderGuideMarkup } from './guide.js';
import { HowToBuild3DController } from './how-to-build-3d.js';
import { TRANSLATIONS } from './i18n.js';

// Core engines
const plateCanvas = document.getElementById('plateCanvas');
const miniScopeCanvas = document.getElementById('miniScopeCanvas');
const sandSim = new SandSimulation(plateCanvas, 45000);
const synth = new AcousticSynth();

// Dedicated ES Module Web Worker for non-blocking Kirchhoff-Love optimization & live band eval
const worker = new Worker(new URL('./solver-worker.js', import.meta.url), { type: 'module' });
let workerReqId = 0;
const workerPending = new Map();

worker.onmessage = (e) => {
  const { id, ok, result, error } = e.data;
  const entry = workerPending.get(id);
  if (!entry) return;
  workerPending.delete(id);
  if (ok) entry.resolve(result);
  else entry.reject(new Error(error));
};

function callWorker(type, payload) {
  return new Promise((resolve, reject) => {
    const id = ++workerReqId;
    workerPending.set(id, { resolve, reject });
    worker.postMessage({ id, type, payload });
  });
}

// DOM references
const appRoot = document.getElementById('appRoot');
const stageView = document.getElementById('stageView');
const buildView = document.getElementById('buildView');
const guideView = document.getElementById('guideView');
const labToggleWrap = document.getElementById('labToggleWrap');
const langSwitch = document.getElementById('langSwitch');

const btnModeStudio = document.getElementById('btnModeStudio');
const btnModeGame = document.getElementById('btnModeGame');
const btnModeBuild = document.getElementById('btnModeBuild');
const btnModeGuide = document.getElementById('btnModeGuide');
let build3dCtrl = null;
const studioCard = document.getElementById('studioCard');
const drawCard = document.getElementById('drawCard');
const gameCard = document.getElementById('gameCard');
const btnToggleLab = document.getElementById('btnToggleLab');
const btnCloseLab = document.getElementById('btnCloseLab');
const labDrawer = document.getElementById('labDrawer');

// Plate & Single Authoritative Live Telemetry DOM
const elHeaderSpec = document.getElementById('headerPlateSpec');
const elSimLed = document.getElementById('simLed');
const elStatusText = document.getElementById('statusText');
const elActiveBanner = document.getElementById('activeCharBanner');
const elSolvingPill = document.getElementById('solvingPill');
const elSolveTimeBadge = document.getElementById('solveTimeBadge');
const elLiveDomBadge = document.getElementById('liveDomBadge');
const elCompactFreqStrip = document.getElementById('compactFreqStrip');
const btnOpenManualMixer = document.getElementById('btnOpenManualMixer');
const btnOpenGuideFromStudio = document.getElementById('btnOpenGuideFromStudio');
const elLiveStatIouLabel = document.getElementById('liveStatIouLabel');
const elLiveStatContrastLabel = document.getElementById('liveStatContrastLabel');
const elLiveStatIou = document.getElementById('liveStatIou');
const elLiveStatContrast = document.getElementById('liveStatContrast');
const elLiveStatOverlap = document.getElementById('liveStatOverlap');
const elLiveStatLambda = document.getElementById('liveStatLambda');
const elPhysicsStory = document.getElementById('physicsStoryLine');

const elFreqMixer = document.getElementById('freqMixer');
const elMixerTitle = document.getElementById('mixerTitle');
const elMixerHintNote = document.getElementById('mixerHintNote');
const btnResetAllFreqs = document.getElementById('btnResetAllFreqs');
const elConstantsStrip = document.getElementById('constantsStrip');
const elHwHint = document.getElementById('hwHint');

const btnAudioToggle = document.getElementById('btnAudioToggle');
const icoAudioOn = document.getElementById('icoAudioOn');
const icoAudioOff = document.getElementById('icoAudioOff');
const audioLabel = document.getElementById('audioLabel');
const masterVolume = document.getElementById('masterVolume');
const volVal = document.getElementById('volVal');
const btnExportJson = document.getElementById('btnExportJson');
const btnExportCsv = document.getElementById('btnExportCsv');

const btnPlayPause = document.getElementById('btnPlayPause');
const icoPause = document.getElementById('icoPause');
const icoPlay = document.getElementById('icoPlay');
const btnPrevStep = document.getElementById('btnPrevStep');
const btnNextStep = document.getElementById('btnNextStep');
const btnLoopToggle = document.getElementById('btnLoopToggle');
const btnDigitTour = document.getElementById('btnDigitTour');
const digitTourLabel = document.getElementById('digitTourLabel');
const btnScatter = document.getElementById('btnScatter');
const btnDrawMode = document.getElementById('btnDrawMode');
const btnSolveDrawing = document.getElementById('btnSolveDrawing');
const btnClearDrawing = document.getElementById('btnClearDrawing');
const btnExitDrawing = document.getElementById('btnExitDrawing');
const btnSynthesizeWord = document.getElementById('btnSynthesizeWord');
const btnStopSequence = document.getElementById('btnStopSequence');

const canvasStage = document.getElementById('canvasStage');
const digitGrid = document.getElementById('digitGrid');
const wordInput = document.getElementById('wordInput');
const wordModeSelect = document.getElementById('wordModeSelect');
const sequenceBar = document.getElementById('sequenceBar');
const seqCounter = document.getElementById('seqCounter');
const seqChips = document.getElementById('seqChips');
const materialSelect = document.getElementById('materialSelect');
const particleCountSelect = document.getElementById('particleCountSelect');
const gammaSlider = document.getElementById('gammaSlider');
const gammaVal = document.getElementById('gammaVal');
const seqDurationSlider = document.getElementById('seqDurationSlider');
const seqDurationVal = document.getElementById('seqDurationVal');

// Classic & Hardware Drive Table DOM
const classicControls = document.getElementById('classicControls');
const classicFreqSlider = document.getElementById('classicFreqSlider');
const classicFreqVal = document.getElementById('classicFreqVal');
const resonanceChips = document.getElementById('resonanceChips');
const channelDrivePanel = document.getElementById('channelDrivePanel');
const channelDriveTable = document.getElementById('channelDriveTable');
const btnExportChannelsCsv = document.getElementById('btnExportChannelsCsv');

// Game DOM
const gameLevelBadge = document.getElementById('gameLevelBadge');
const gameLevelTitle = document.getElementById('gameLevelTitle');
const gameScoreVal = document.getElementById('gameScoreVal');
const gameMatchPct = document.getElementById('gameMatchPct');
const gameMatchFill = document.getElementById('gameMatchFill');
const gameKnobs = document.getElementById('gameKnobs');
const gameWinBanner = document.getElementById('gameWinBanner');
const gameWinTitle = document.getElementById('gameWinTitle');
const gameWinSub = document.getElementById('gameWinSub');
const btnNextLevel = document.getElementById('btnNextLevel');
const gameHintText = document.getElementById('gameHintText');
const gameLevelDots = document.getElementById('gameLevelDots');

// Benchmark & Info Popover DOM
const btnRunBenchmark = document.getElementById('btnRunBenchmark');
const benchResult = document.getElementById('benchResult');
const infoPopover = document.getElementById('infoPopover');
const infoPopTitle = document.getElementById('infoPopTitle');
const infoPopBody = document.getElementById('infoPopBody');
const infoPopNote = document.getElementById('infoPopNote');

// -------------------- Application State --------------------
let lang = 'tr';
try {
  if (localStorage.getItem('pulseplus_lang') === 'en') lang = 'en';
} catch {
  /* ignore storage blocks */
}
const T = () => TRANSLATIONS[lang] || TRANSLATIONS.tr;

const solutionCache = new Map();
let plateMeta = null;
let workerConfiguredKey = null;
let activeMaterialId = 'aluminum';
let activeHardware = 'array16'; // NEVER silently reset!
let classicManualSweep = false;
let currentTargetLabel = '3';
let studioTargetLabel = '3';
let currentSolution = null;

// Per-frequency manual control state (Gain 0..2.0 + exact Hz override + real Kirchhoff-Love field override)
let freqGains = [];
let manualFreqs = [];
let manualModeOverrides = [];
let bandEvalEpochs = [];

let userUnlockedAudio = false;
let isPaused = false;
let activeSolveEpoch = 0;
let labOpen = false;
let appMode = 'studio'; // 'studio' | 'game' | 'guide'
let lastInteractiveMode = 'studio';
let guideSimpleOnly = false;
let wasClassicSweepBeforeGame = false;
let lastClassicModeLabel = '';

const puzzleGame = new AcousticPuzzleGame();
let gameAllLocked = false;
let benchmarkRunning = false;
let lastBenchmarkRows = [];
let lastBenchmarkHw = 'array16';

// Drawing state
let drawMode = false;
let isPointerDown = false;
let customDrawMask = new Float32Array(GRID_N * GRID_N);
let prevOverlayBeforeDraw = 'sand';
let overlayChangedDuringDraw = false;

// Sequence state
let sequenceTimer = null;
let sequenceQueue = [];
let sequenceIndex = -1;
let seqDurationMs = 3400;
let loopSequence = false;

// -------------------- Language Switcher (TR / EN) --------------------
function getHwLabel(hw = activeHardware) {
  const t = T();
  return hw === 'array8'
    ? t.hw8
    : hw === 'array16'
    ? t.hw16
    : hw === 'array40'
    ? t.hw40
    : t.hwClassic;
}

function getGameLevelCopy(idx) {
  const list = T().gameLevels;
  return list[Math.max(0, Math.min(list.length - 1, idx))] || list[0];
}

function applyStaticTranslations() {
  const t = T();
  document.documentElement.lang = lang;
  document.title = t.docTitle;

  langSwitch.querySelectorAll('.lang-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (typeof t[key] === 'string') {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (typeof t[key] === 'string') {
      el.placeholder = t[key];
    }
  });

  document.querySelectorAll('[data-mat-opt]').forEach((opt) => {
    const id = opt.dataset.matOpt;
    if (t.materials[id]) opt.textContent = t.materials[id].name;
  });

  audioLabel.textContent = synth.enabled ? t.audioOn : t.audioOff;
  btnCloseLab.title = t.closeLabTitle;
  btnScatter.title = t.scatterTitle;
  btnSynthesizeWord.title = t.sendWordTitle;
  btnLoopToggle.textContent = loopSequence ? t.loopOn : t.loopOff;
  seqDurationVal.textContent = `${(seqDurationMs / 1000).toFixed(1)} ${t.seqUnit}`;
  const tourRunning = sequenceQueue.join('') === '0123456789' && Boolean(sequenceTimer);
  digitTourLabel.textContent = tourRunning ? t.digitTourStop : t.digitTourStart;
  if (!benchmarkRunning) {
    btnRunBenchmark.textContent = t.benchRunBtn;
  }
  updatePlayPauseUI();
}

function setLanguage(nextLang) {
  if (nextLang !== 'tr' && nextLang !== 'en') return;
  lang = nextLang;
  try {
    localStorage.setItem('pulseplus_lang', lang);
  } catch {
    /* ignore */
  }

  applyStaticTranslations();
  updateHeaderAndConstants();
  renderChannelDriveTable();
  if (lastBenchmarkRows.length > 0 && !benchmarkRunning) {
    renderBenchmarkResults(lastBenchmarkHw);
  }
  if (build3dCtrl) {
    build3dCtrl.setLanguage(lang);
  }

  if (appMode === 'guide') {
    renderGuidePage();
  } else if (appMode === 'build') {
    // 3D build controller already updated language
  } else if (appMode === 'game' && puzzleGame.activeSolution) {
    const res = puzzleGame.evaluateLiveField();
    updateGameLevelCopy();
    if (res) {
      updateMetricsDisplay(res.metrics);
      updateGameUiFromEval(res);
      renderCompactTelemetry(res);
      if (labOpen) renderFreqMixer(res);
    }
  } else if (classicManualSweep) {
    const f = Math.round(Number(classicFreqSlider.value));
    setReadout(`${f} Hz`, lastClassicModeLabel || T().hwClassicDetail);
    elStatusText.textContent = T().statusClassicMode(f);
    updateMetricsDisplay(null);
    renderCompactTelemetry();
    renderFreqMixer();
  } else if (currentSolution) {
    const pCount = currentSolution.actuatorStats.length;
    elStatusText.textContent =
      pCount === 1
        ? T().statusSingleSpeaker(currentTargetLabel, currentSolution.metrics.iou.toFixed(0))
        : T().statusMultiPiezo(pCount, currentTargetLabel);
    const evalRes = evaluateSolutionField(currentSolution, freqGains, manualModeOverrides);
    updateMetricsDisplay(evalRes.metrics, currentSolution.solveMs);
    renderCompactTelemetry();
    renderFreqMixer();
  }

  if (pinnedTipAnchor && pinnedTipAnchor.dataset.tip) {
    showTooltip(pinnedTipAnchor.dataset.tip, pinnedTipAnchor);
  }
}

langSwitch.addEventListener('click', (e) => {
  const btn = e.target.closest('.lang-btn');
  if (!btn || btn.dataset.lang === lang) return;
  setLanguage(btn.dataset.lang);
});

// -------------------- Smart Contextual (?) Info Popover System --------------------
let pinnedTipAnchor = null;
let hoverTipAnchor = null;

function positionPopover(anchorEl) {
  const rect = anchorEl.getBoundingClientRect();
  infoPopover.classList.remove('hidden');
  const popRect = infoPopover.getBoundingClientRect();
  const pad = 12;

  let left = rect.left + rect.width / 2 - popRect.width / 2;
  left = Math.max(pad, Math.min(window.innerWidth - popRect.width - pad, left));

  let top = rect.bottom + 8;
  if (top + popRect.height > window.innerHeight - pad) {
    top = rect.top - popRect.height - 8;
  }
  top = Math.max(pad, Math.min(window.innerHeight - popRect.height - pad, top));

  infoPopover.style.left = `${Math.round(left)}px`;
  infoPopover.style.top = `${Math.round(top)}px`;
}

function showTooltip(tipKey, anchorEl) {
  const tip = getHelpTip(tipKey, lang);
  if (!tip || !anchorEl) return;
  infoPopTitle.textContent = tip.title;
  infoPopBody.textContent = tip.body;
  if (tip.note) {
    infoPopNote.textContent = tip.note;
    infoPopNote.classList.remove('hidden');
  } else {
    infoPopNote.classList.add('hidden');
  }
  positionPopover(anchorEl);
}

function hideTooltip() {
  if (pinnedTipAnchor) {
    pinnedTipAnchor.classList.remove('active');
    pinnedTipAnchor = null;
  }
  hoverTipAnchor = null;
  infoPopover.classList.add('hidden');
}

document.addEventListener('mouseover', (e) => {
  if (pinnedTipAnchor) return;
  const trigger = e.target.closest('[data-tip], [data-tip-hover]');
  if (!trigger) return;
  const key = trigger.dataset.tip || trigger.dataset.tipHover;
  hoverTipAnchor = trigger;
  showTooltip(key, trigger);
});

document.addEventListener('mouseout', (e) => {
  if (pinnedTipAnchor || !hoverTipAnchor) return;
  const related = e.relatedTarget;
  if (related && hoverTipAnchor.contains(related)) return;
  hoverTipAnchor = null;
  infoPopover.classList.add('hidden');
});

document.addEventListener('click', (e) => {
  const dot = e.target.closest('.info-dot[data-tip]');
  if (dot) {
    e.stopPropagation();
    if (pinnedTipAnchor === dot) {
      hideTooltip();
    } else {
      if (pinnedTipAnchor) pinnedTipAnchor.classList.remove('active');
      pinnedTipAnchor = dot;
      dot.classList.add('active');
      showTooltip(dot.dataset.tip, dot);
    }
    return;
  }
  if (pinnedTipAnchor) {
    hideTooltip();
  }
});

window.addEventListener('scroll', () => {
  if (pinnedTipAnchor) positionPopover(pinnedTipAnchor);
}, true);
window.addEventListener('resize', () => {
  if (pinnedTipAnchor) positionPopover(pinnedTipAnchor);
});

// -------------------- Plain-Language & Academic Guide Renderer --------------------
function renderGuidePage() {
  guideView.innerHTML =
    renderGuideMarkup(guideSimpleOnly, lang) +
    `<div class="guide-footer-cta">
      <button type="button" class="btn-solid" id="btnBackToStudioFromGuide">${T().backToStudioCta}</button>
    </div>`;

  guideView.querySelectorAll('[data-guide-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      guideSimpleOnly = btn.dataset.guideMode === 'simple';
      renderGuidePage();
    });
  });

  const backBtn = guideView.querySelector('#btnBackToStudioFromGuide');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      setAppMode(lastInteractiveMode || 'studio');
    });
  }

  guideView.querySelectorAll('[data-open-build3d]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setAppMode('build');
    });
  });
}

// -------------------- Helpers --------------------
function cacheKey(label) {
  return `${activeMaterialId}|${activeHardware}|${label}`;
}

function setReadout(primary, detail = '') {
  const el = elActiveBanner.querySelector('.readout-text');
  if (el) {
    el.innerHTML = detail ? `<strong>${primary}</strong> · ${detail}` : `<strong>${primary}</strong>`;
  }
}

function setSolvingBusy(busy, message = T().computing) {
  elSolvingPill.querySelector('span:last-child').textContent = message;
  elSolvingPill.classList.toggle('hidden', !busy);
}

function selectLabTab(key) {
  document.querySelectorAll('.lab-tab').forEach((t) => {
    const active = t.dataset.labtab === key;
    t.classList.toggle('active', active);
    t.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.lab-pane').forEach((p) => {
    p.classList.toggle('active', p.dataset.labpane === key);
  });
}

function setLabOpen(open) {
  labOpen = open;
  appRoot.classList.toggle('lab-open', open);
  btnToggleLab.classList.toggle('active', open);
  btnToggleLab.setAttribute('aria-expanded', String(open));
  labDrawer.setAttribute('aria-hidden', String(!open));
  if (open && appMode === 'game' && puzzleGame.activeSolution) {
    renderFreqMixer(puzzleGame.evaluateLiveField());
  }
}

function syncRightSurface() {
  studioCard.classList.toggle('hidden', appMode !== 'studio' || drawMode);
  drawCard.classList.toggle('hidden', !drawMode);
  gameCard.classList.toggle('hidden', appMode !== 'game' || drawMode);
}

async function ensureWorkerConfigured(hwMode = activeHardware) {
  const key = `${activeMaterialId}|${hwMode}`;
  if (workerConfiguredKey === key && plateMeta) return plateMeta;
  plateMeta = await callWorker('configure', { materialId: activeMaterialId, hardwareMode: hwMode });
  workerConfiguredKey = key;
  return plateMeta;
}

function computeFlexuralLambdaCm(freq) {
  if (!plateMeta || !plateMeta.alpha) return 0;
  return Math.sqrt((2 * Math.PI * plateMeta.alpha) / Math.max(20, freq)) * 100;
}

function getEffectiveFreqs() {
  if (!currentSolution) return [];
  return currentSolution.freqs.map((f, k) => manualFreqs[k] ?? f);
}

function getEffectiveWeights() {
  if (!currentSolution) return [];
  return currentSolution.freqWeights.map((w, k) => w * (freqGains[k] ?? 1));
}

function isChannelModified(k) {
  if (!currentSolution) return false;
  const gainChanged = Math.abs((freqGains[k] ?? 1) - 1) > 0.01;
  const freqChanged = manualFreqs[k] !== undefined && manualFreqs[k] !== currentSolution.freqs[k];
  return gainChanged || freqChanged;
}

function updateHeaderAndConstants() {
  const t = T();
  const m = MATERIALS[activeMaterialId] || MATERIALS.aluminum;
  const matShort = t.materials[activeMaterialId]?.short || m.shortName;
  const hwLabel = getHwLabel(activeHardware);
  const kCount = Math.round(sandSim.count / 1000);
  elHeaderSpec.textContent = `${matShort} · 25×25 cm · ${hwLabel} · ${kCount}k ${t.sandUnit}`;
  elHwHint.textContent = t.hwHints[activeHardware];
  channelDrivePanel.classList.toggle('hidden', classicManualSweep);

  if (plateMeta) {
    elConstantsStrip.innerHTML = `
      <span>f₁,₁ = <strong>${plateMeta.f11.toFixed(1)} Hz</strong></span>
      <span>E = <strong>${(m.E / 1e9).toFixed(1)} GPa</strong></span>
      <span>ν = <strong>${m.nu.toFixed(2)}</strong></span>
      <span>ρ = <strong>${m.rho} kg/m³</strong></span>
      <span>D = <strong>${plateMeta.D.toFixed(2)} N·m</strong></span>
      <span>${t.modesWord} = <strong>${plateMeta.modeCount}</strong></span>
      <span>λ₁,₁ = <strong>${plateMeta.lambda11.toFixed(2)}</strong> (Leissa: 13.49)</span>
    `;
  }
}

function renderChannelDriveTable() {
  if (!currentSolution || classicManualSweep) {
    channelDriveTable.innerHTML = '';
    return;
  }
  const t = T();
  const rows = currentSolution.actuatorStats
    .slice(0, 16)
    .map((a, idx) => {
      const deg = Math.round((a.phase * 180) / Math.PI);
      const pct = Math.round((a.normAmp ?? 0) * 100);
      return `<tr>
        <td>CH${idx + 1} (${a.label})</td>
        <td>(${(a.x * 25).toFixed(1)}, ${(a.y * 25).toFixed(1)}) cm</td>
        <td>${pct}%</td>
        <td>${deg >= 0 ? '+' : ''}${deg}°</td>
      </tr>`;
    })
    .join('');

  const note =
    currentSolution.actuatorStats.length > 16
      ? `<p class="field-note" style="margin-top:6px">${t.channelMoreNote}</p>`
      : '';

  channelDriveTable.innerHTML = `
    <table class="bench-table">
      <thead><tr><th>${t.thChannel}</th><th>${t.thPos}</th><th>${t.thAmp}</th><th>${t.thPhase}</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>${note}
  `;
}

function renderClassicResonances() {
  if (!plateMeta) return;
  const picks = plateMeta.classicResonances || [];
  const activeFreq = classicManualSweep ? Math.round(Number(classicFreqSlider.value)) : -1;
  resonanceChips.innerHTML = '';
  picks.forEach((p) => {
    const btn = document.createElement('button');
    btn.className = 'res-chip' + (activeFreq === p.freq ? ' active' : '');
    btn.textContent = `${p.label} · ${p.freq} Hz`;
    btn.addEventListener('click', () => {
      unlockAudioOnInteraction();
      classicFreqSlider.value = String(p.freq);
      applyClassicFrequency(p.freq, p.label);
      resonanceChips.querySelectorAll('.res-chip').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
    resonanceChips.appendChild(btn);
  });
}

// -------------------- Compact Hz Overview Strip Under Plate --------------------
function renderCompactTelemetry(gameEval = null) {
  const t = T();
  elCompactFreqStrip.innerHTML = '';

  // 1) Classic 1-Speaker Single-Frequency Sweep
  if (classicManualSweep) {
    const f = Math.round(Number(classicFreqSlider.value));
    const lam = computeFlexuralLambdaCm(f);
    elLiveDomBadge.textContent = `${t.singleLabel} ${f} Hz`;
    elLiveStatLambda.textContent = lam > 0 ? `${lam.toFixed(1)} cm` : '—';
    elCompactFreqStrip.innerHTML = `<span class="hz-chip dominant"><span class="hz-dot"></span>${f} Hz <span class="hz-chip-mode">${t.singleSineTag}</span></span>`;
    elPhysicsStory.textContent = t.storyClassic(f);
    return;
  }

  // 2) Game Mode: Live Detuned / Locked Frequencies
  if (appMode === 'game' && gameEval && puzzleGame.activeSolution) {
    const sol = puzzleGame.activeSolution;
    const freqs = gameEval.liveFreqs;
    const weights = gameEval.liveWeights;
    let domIdx = 0;
    for (let k = 1; k < weights.length; k++) {
      if (weights[k] > weights[domIdx]) domIdx = k;
    }
    const domFreq = Math.round(freqs[domIdx] || 0);
    const lam = computeFlexuralLambdaCm(domFreq);
    elLiveDomBadge.textContent = gameEval.allLocked
      ? `${t.lockedLabel} · ${domFreq} Hz`
      : `${t.scanLabel} · ${domFreq} Hz`;
    elLiveStatLambda.textContent = lam > 0 ? `${lam.toFixed(1)} cm` : '—';

    const lockedSet = new Set();
    puzzleGame.knobs.forEach((knob) => {
      if (knob.locked && Array.isArray(knob.channels)) {
        knob.channels.forEach((ch) => lockedSet.add(ch));
      }
    });

    freqs.forEach((f, k) => {
      const isLocked = lockedSet.has(k) || gameEval.allLocked;
      const isDom = k === domIdx && !isLocked;
      const chip = document.createElement('span');
      chip.className = `hz-chip${isLocked ? ' locked' : isDom ? ' dominant' : ''}`;
      const mLbl = sol.freqModes?.[k]?.modeLabel || `F${k + 1}`;
      chip.innerHTML = `<span class="hz-dot"></span>${Math.round(f)} Hz <span class="hz-chip-mode">${mLbl}</span>`;
      elCompactFreqStrip.appendChild(chip);
    });

    elPhysicsStory.textContent = gameEval.allLocked
      ? t.storyGameLocked(freqs.length, gameEval.matchPct)
      : t.storyGameTuning;
    return;
  }

  // 3) Studio Mode: Compact Hz Chips
  if (!currentSolution) return;
  const effFreqs = getEffectiveFreqs();
  const effWeights = getEffectiveWeights();
  const K = effFreqs.length;

  const ranked = effFreqs
    .map((f, k) => ({ k, f, w: effWeights[k] ?? 0 }))
    .sort((a, b) => b.w - a.w);
  const top1 = ranked[0];
  const top2 = ranked[1];
  const domIdx = top1 && top1.w > 0.01 ? top1.k : 0;
  const domFreq = effFreqs[domIdx];
  const domMode = manualModeOverrides[domIdx]?.modeInfo || currentSolution.freqModes?.[domIdx];
  const domLam = domMode?.lambdaCm || computeFlexuralLambdaCm(domFreq);

  elLiveDomBadge.textContent = domMode
    ? `${t.peakLabel} ${domFreq} Hz · ${domMode.modeLabel}`
    : `${t.peakLabel} ${domFreq} Hz`;
  elLiveStatLambda.textContent = domLam > 0 ? `${domLam.toFixed(1)} cm` : '—';

  const pCount = currentSolution.actuatorStats.length;
  const hwText = pCount === 1 ? t.hwClassic : `${pCount} ${lang === 'en' ? 'Piezos' : 'Piezo'}`;
  setReadout(currentTargetLabel, `${hwText} · ${t.peakLabel} ${domFreq} Hz`);

  effFreqs.forEach((f, k) => {
    const isMuted = (freqGains[k] ?? 1) < 0.02;
    const isDom = !isMuted && k === domIdx;
    const isMod = isChannelModified(k);
    const modeInfo = manualModeOverrides[k]?.modeInfo || currentSolution.freqModes?.[k];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `hz-chip${isMuted ? ' muted' : isDom ? ' dominant' : ''}${isMod ? ' modified' : ''}`;
    btn.title = `F${k + 1}: ${f} Hz · ${t.ctrlGain} ${Math.round((freqGains[k] ?? 1) * 100)}%`;
    btn.innerHTML = `<span class="hz-dot"></span>${f} Hz <span class="hz-chip-mode">${modeInfo ? modeInfo.modeLabel : `F${k + 1}`}</span>`;
    btn.addEventListener('click', () => {
      selectLabTab('spectrum');
      setLabOpen(true);
    });
    elCompactFreqStrip.appendChild(btn);
  });

  const activeCount = freqGains.filter((g) => g >= 0.02).length;
  const anyManual = effFreqs.some((_, k) => isChannelModified(k));
  const pool = currentSolution.candidatePoolCount || K;

  if (pCount === 1) {
    elPhysicsStory.textContent = t.storySingleSpeaker(activeCount, K, top1.f);
  } else if (anyManual && top1 && top1.w > 0.01) {
    elPhysicsStory.textContent = t.storyManual(activeCount, K, top1.f);
  } else if (top1 && top2 && top2.w > 0.02) {
    elPhysicsStory.textContent = t.storyAuto(currentTargetLabel, pool, K, top1.f, top2.f);
  } else if (top1 && top1.w > 0.01) {
    elPhysicsStory.textContent = t.storyOneLeft(top1.f);
  } else {
    elPhysicsStory.textContent = t.storyAllMuted;
  }
}

// -------------------- Per-Channel Manual Frequency Control Console --------------------
async function updateManualChannelFreq(k, newFreq) {
  if (!currentSolution || classicManualSweep || appMode === 'game') return;
  const clamped = Math.max(120, Math.min(11000, Math.round(newFreq)));
  manualFreqs[k] = clamped;

  const defaultFreq = currentSolution.freqs[k];
  const myEpoch = (bandEvalEpochs[k] = (bandEvalEpochs[k] || 0) + 1);

  if (clamped === defaultFreq) {
    manualModeOverrides[k] = null;
    applyActiveSolutionField({ pulse: false });
    renderCompactTelemetry();
    syncMixerCardUI(k);
    return;
  }

  await ensureWorkerConfigured(activeHardware);
  const res = await callWorker('evalBand', {
    freq: clamped,
    uRe: currentSolution.uRe[k],
    uIm: currentSolution.uIm[k],
  });
  if (myEpoch !== bandEvalEpochs[k] || !currentSolution) return;

  manualModeOverrides[k] = res;
  applyActiveSolutionField({ pulse: false });
  renderCompactTelemetry();
  syncMixerCardUI(k);
}

function updateManualChannelGain(k, newGain) {
  if (!currentSolution || classicManualSweep || appMode === 'game') return;
  freqGains[k] = Math.max(0, Math.min(2, Number(newGain)));
  applyActiveSolutionField({ pulse: false });
  renderCompactTelemetry();
  syncMixerCardUI(k);
}

function resetSingleChannel(k) {
  if (!currentSolution || classicManualSweep || appMode === 'game') return;
  bandEvalEpochs[k] = (bandEvalEpochs[k] || 0) + 1;
  freqGains[k] = 1;
  manualFreqs[k] = currentSolution.freqs[k];
  manualModeOverrides[k] = null;
  applyActiveSolutionField({ pulse: false });
  renderCompactTelemetry();
  renderFreqMixer();
}

function resetAllChannelsToDefault() {
  if (!currentSolution || classicManualSweep || appMode === 'game') return;
  freqGains = currentSolution.freqs.map(() => 1);
  manualFreqs = [...currentSolution.freqs];
  manualModeOverrides = currentSolution.freqs.map(() => null);
  bandEvalEpochs = currentSolution.freqs.map(() => 0);
  applyActiveSolutionField({ pulse: false });
  renderCompactTelemetry();
  renderFreqMixer();
}

function syncMixerCardUI(k) {
  const card = elFreqMixer.querySelector(`[data-ch="${k}"]`);
  if (!card || !currentSolution) return;
  const t = T();
  const gPct = Math.round((freqGains[k] ?? 1) * 100);
  const hz = manualFreqs[k] ?? currentSolution.freqs[k];
  const defHz = currentSolution.freqs[k];
  const isMuted = gPct < 2;
  const isMod = isChannelModified(k);
  const modeInfo = manualModeOverrides[k]?.modeInfo || currentSolution.freqModes?.[k];

  card.classList.toggle('muted', isMuted);
  card.classList.toggle('modified', isMod);

  const meta = card.querySelector('.freq-card-meta');
  if (meta && modeInfo) {
    meta.textContent = `${modeInfo.modeLabel} · λ=${modeInfo.lambdaCm}cm`;
  }
  const gSlider = card.querySelector('.js-gain-slider');
  const gVal = card.querySelector('.js-gain-val');
  if (gSlider && Number(gSlider.value) !== gPct) gSlider.value = String(gPct);
  if (gVal) {
    gVal.textContent = isMuted ? t.mutedTag : `${gPct}%`;
    gVal.classList.toggle('dirty-val', Math.abs(gPct - 100) > 1);
  }

  const fSlider = card.querySelector('.js-freq-slider');
  const fVal = card.querySelector('.js-freq-val');
  if (fSlider && Number(fSlider.value) !== hz) fSlider.value = String(hz);
  if (fVal) {
    fVal.textContent = `${hz} Hz`;
    fVal.classList.toggle('dirty-val', hz !== defHz);
  }

  const resetBtn = card.querySelector('.freq-reset-btn');
  if (resetBtn) {
    resetBtn.classList.toggle('dirty', isMod);
    resetBtn.title = isMod ? t.resetChannelTip(k + 1, defHz) : t.defaultChannelTip(defHz);
  }
}

function renderFreqMixer(gameEval = null) {
  const t = T();
  elFreqMixer.innerHTML = '';

  if (classicManualSweep) {
    elMixerTitle.textContent = t.mixerClassicTitle;
    elMixerHintNote.textContent = t.mixerHintClassic;
    btnResetAllFreqs.classList.add('hidden');
    const f = Math.round(Number(classicFreqSlider.value));
    const card = document.createElement('div');
    card.className = 'freq-card dominant';
    card.innerHTML = `
      <div class="freq-card-head">
        <div class="freq-card-left">
          <button class="freq-toggle" disabled>F1</button>
          <strong class="freq-hz">${f} Hz</strong>
          <span class="freq-card-meta">λ=${computeFlexuralLambdaCm(f).toFixed(1)}cm</span>
        </div>
        <span class="freq-pct">100%</span>
      </div>
    `;
    elFreqMixer.appendChild(card);
    return;
  }

  if (appMode === 'game' && gameEval && puzzleGame.activeSolution) {
    const freqs = gameEval.liveFreqs;
    const weights = gameEval.liveWeights;
    const maxW = Math.max(...weights, 0.01);
    const lockedSet = new Set();
    puzzleGame.knobs.forEach((knob) => {
      if (knob.locked && Array.isArray(knob.channels)) {
        knob.channels.forEach((ch) => lockedSet.add(ch));
      }
    });
    elMixerTitle.textContent = `${t.mixerGameTitlePrefix} (${freqs.length} ${t.channelWord})`;
    elMixerHintNote.textContent = t.mixerHintGame;
    btnResetAllFreqs.classList.add('hidden');
    freqs.forEach((f, k) => {
      const pct = Math.round((weights[k] / maxW) * 100);
      const isLocked = lockedSet.has(k) || gameEval.allLocked;
      const row = document.createElement('div');
      row.className = `freq-row${isLocked ? ' locked' : ''}`;
      row.innerHTML = `
        <button class="freq-toggle" disabled>F${k + 1}</button>
        <span class="freq-hz">${Math.round(f)} Hz</span>
        <div class="freq-bar-track"><div class="freq-bar-fill" style="width:${pct}%"></div></div>
        <span class="freq-pct">${pct}%</span>
      `;
      elFreqMixer.appendChild(row);
    });
    return;
  }

  if (!currentSolution) return;
  const K = currentSolution.freqs.length;
  elMixerTitle.textContent = `${t.mixerTitlePrefix} (${K} ${t.channelWord})`;
  elMixerHintNote.textContent = t.mixerHintStudio;
  btnResetAllFreqs.classList.remove('hidden');

  currentSolution.freqs.forEach((defHz, k) => {
    const curHz = manualFreqs[k] ?? defHz;
    const gPct = Math.round((freqGains[k] ?? 1) * 100);
    const isMuted = gPct < 2;
    const isMod = isChannelModified(k);
    const isDom = k === currentSolution.dominantIndex && !isMuted;
    const modeInfo = manualModeOverrides[k]?.modeInfo || currentSolution.freqModes?.[k];

    const span = Math.max(80, Math.round(defHz * 0.28));
    const minHz = Math.max(120, defHz - span);
    const maxHz = Math.min(11000, defHz + span);

    const card = document.createElement('div');
    card.dataset.ch = String(k);
    card.className = `freq-card${isMuted ? ' muted' : isDom ? ' dominant' : ''}${isMod ? ' modified' : ''}`;
    card.innerHTML = `
      <div class="freq-card-head">
        <div class="freq-card-left">
          <button type="button" class="freq-toggle">F${k + 1}</button>
          <span class="freq-card-meta">${modeInfo ? `${modeInfo.modeLabel} · λ=${modeInfo.lambdaCm}cm` : ''}</span>
        </div>
        <button type="button" class="freq-reset-btn${isMod ? ' dirty' : ''}" title="${isMod ? t.resetChannelTip(k + 1, defHz) : t.defaultChannelTip(defHz)}">↺</button>
      </div>
      <div class="freq-ctrl-row">
        <span class="freq-ctrl-lbl">${t.ctrlGain}</span>
        <button type="button" class="freq-step-btn js-gain-dec" title="-10%">−</button>
        <input type="range" class="js-gain-slider" min="0" max="200" step="5" value="${gPct}" aria-label="F${k + 1} ${t.ctrlGain}" />
        <button type="button" class="freq-step-btn js-gain-inc" title="+10%">+</button>
        <span class="freq-ctrl-val js-gain-val${Math.abs(gPct - 100) > 1 ? ' dirty-val' : ''}">${isMuted ? t.mutedTag : gPct + '%'}</span>
      </div>
      <div class="freq-ctrl-row">
        <span class="freq-ctrl-lbl">${t.ctrlFreq}</span>
        <button type="button" class="freq-step-btn js-freq-dec" title="-10 Hz">−</button>
        <input type="range" class="js-freq-slider" min="${minHz}" max="${maxHz}" step="5" value="${curHz}" aria-label="F${k + 1} ${t.ctrlFreq}" />
        <button type="button" class="freq-step-btn js-freq-inc" title="+10 Hz">+</button>
        <span class="freq-ctrl-val js-freq-val${curHz !== defHz ? ' dirty-val' : ''}">${curHz} Hz</span>
      </div>
    `;

    card.querySelector('.freq-toggle').addEventListener('click', () => {
      unlockAudioOnInteraction();
      updateManualChannelGain(k, (freqGains[k] ?? 1) >= 0.05 ? 0 : 1);
    });

    card.querySelector('.freq-reset-btn').addEventListener('click', () => {
      unlockAudioOnInteraction();
      resetSingleChannel(k);
    });

    const gSlider = card.querySelector('.js-gain-slider');
    gSlider.addEventListener('input', () => {
      unlockAudioOnInteraction();
      updateManualChannelGain(k, Number(gSlider.value) / 100);
    });
    card.querySelector('.js-gain-dec').addEventListener('click', () => {
      unlockAudioOnInteraction();
      updateManualChannelGain(k, Math.max(0, (freqGains[k] ?? 1) - 0.1));
    });
    card.querySelector('.js-gain-inc').addEventListener('click', () => {
      unlockAudioOnInteraction();
      updateManualChannelGain(k, Math.min(2, (freqGains[k] ?? 1) + 0.1));
    });

    const fSlider = card.querySelector('.js-freq-slider');
    fSlider.addEventListener('input', () => {
      unlockAudioOnInteraction();
      updateManualChannelFreq(k, Number(fSlider.value));
    });
    card.querySelector('.js-freq-dec').addEventListener('click', () => {
      unlockAudioOnInteraction();
      updateManualChannelFreq(k, Math.max(minHz, (manualFreqs[k] ?? defHz) - 10));
    });
    card.querySelector('.js-freq-inc').addEventListener('click', () => {
      unlockAudioOnInteraction();
      updateManualChannelFreq(k, Math.min(maxHz, (manualFreqs[k] ?? defHz) + 10));
    });

    elFreqMixer.appendChild(card);
  });
}

function updateMetricsDisplay(metrics, solveMs = null) {
  const t = T();
  if (classicManualSweep || !metrics) {
    elLiveStatIouLabel.textContent = t.statMode;
    elLiveStatContrastLabel.textContent = t.statDrive;
    elLiveStatIou.textContent = t.statEigenmode;
    elLiveStatContrast.textContent = t.statSingleF;
    elSolveTimeBadge.textContent = t.analytic;
    return;
  }
  elLiveStatIouLabel.textContent = t.statIou;
  elLiveStatContrastLabel.textContent = t.statContrast;
  elLiveStatIou.textContent = `${metrics.iou.toFixed(1)}%`;
  elLiveStatContrast.textContent = `${metrics.contrast.toFixed(1)}×`;
  if (solveMs !== null) {
    elSolveTimeBadge.textContent = `${Math.round(solveMs)} ms`;
  }
}

function updatePlayPauseUI() {
  const t = T();
  elSimLed.classList.toggle('paused', isPaused);
  btnPlayPause.classList.toggle('paused', isPaused);
  icoPause.classList.toggle('hidden', isPaused);
  icoPlay.classList.toggle('hidden', !isPaused);
  btnPlayPause.title = isPaused ? t.playTitle : t.pauseTitle;
}

function applyActiveSolutionField({ pulse = false, accentTransition = false } = {}) {
  if (!currentSolution) return;
  const evalRes = evaluateSolutionField(currentSolution, freqGains, manualModeOverrides);
  const effFreqs = getEffectiveFreqs();
  const modeReArr = currentSolution.modeRe.map((arr, k) => manualModeOverrides[k]?.modeRe || arr);
  const modeImArr = currentSolution.modeIm.map((arr, k) => manualModeOverrides[k]?.modeIm || arr);

  sandSim.setWaveField(evalRes.intensity, {
    modeRe: modeReArr,
    modeIm: modeImArr,
    freqs: effFreqs,
    gains: freqGains,
    actuators: currentSolution.actuatorStats,
    targetMask: currentSolution.mask,
    pulse,
  });
  sandSim.isActive = !isPaused;
  updateMetricsDisplay(evalRes.metrics);

  if (!isPaused && userUnlockedAudio) {
    synth.playChord(effFreqs, currentSolution.freqWeights, freqGains, 0.055, { accentTransition });
  } else if (!isPaused) {
    synth.currentFreqs = [...effFreqs];
    synth.currentWeights = [...currentSolution.freqWeights];
    synth.currentMutes = [...freqGains];
    synth.isPlaying = true;
  }
}

// -------------------- Flat Metal Plate Inverse Wave Synthesizer --------------------
async function synthesizeTarget(label, customMaskOverride = null, { playSound = true, pulse = true } = {}) {
  classicManualSweep = false;
  resonanceChips.querySelectorAll('.res-chip').forEach((b) => b.classList.remove('active'));
  updateHeaderAndConstants();

  const epoch = ++activeSolveEpoch;
  const prevLabel = currentTargetLabel;
  const changedTarget = currentSolution !== null && (prevLabel !== label || Boolean(customMaskOverride));
  currentTargetLabel = label;
  studioTargetLabel = label;

  const isCustom = Boolean(customMaskOverride);
  digitGrid.querySelectorAll('.key-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.digit === label);
  });

  await ensureWorkerConfigured(activeHardware);
  if (epoch !== activeSolveEpoch) return;

  const mask = isCustom ? new Float32Array(customMaskOverride) : buildGlyphMask(label, GRID_N);
  const key = cacheKey(label);
  let sol = !isCustom ? solutionCache.get(key) : null;

  if (!sol) {
    setSolvingBusy(true, T().solvingTarget(label));
    sol = await callWorker('solve', { mask });
    if (epoch !== activeSolveEpoch) return;
    if (!isCustom) solutionCache.set(key, sol);
  }
  setSolvingBusy(false);

  currentSolution = sol;
  freqGains = sol.freqs.map(() => 1);
  manualFreqs = [...sol.freqs];
  manualModeOverrides = sol.freqs.map(() => null);
  bandEvalEpochs = sol.freqs.map(() => 0);

  const pCount = sol.actuatorStats.length;
  elStatusText.textContent =
    pCount === 1
      ? T().statusSingleSpeaker(label, sol.metrics.iou.toFixed(0))
      : T().statusMultiPiezo(pCount, label);

  updateMetricsDisplay(sol.metrics, sol.solveMs);
  applyActiveSolutionField({ pulse: pulse && changedTarget, accentTransition: playSound && changedTarget });
  renderCompactTelemetry();
  renderFreqMixer();
  renderChannelDriveTable();
}

async function applyClassicFrequency(freq, modeLabel = '') {
  const epoch = ++activeSolveEpoch;
  classicManualSweep = true;
  lastClassicModeLabel = modeLabel;
  await ensureWorkerConfigured('classic');
  if (epoch !== activeSolveEpoch) return;
  const field = await callWorker('classic', { freq });
  if (epoch !== activeSolveEpoch) return;

  updateHeaderAndConstants();
  const rFreq = Math.round(freq);
  classicFreqVal.textContent = `${rFreq} Hz`;
  setReadout(`${rFreq} Hz`, modeLabel || T().hwClassicDetail);
  elStatusText.textContent = T().statusClassicMode(rFreq);

  sandSim.setWaveField(field.intensity, {
    modeRe: field.modeRe,
    modeIm: field.modeIm,
    freqs: field.freqs,
    gains: [1],
    actuators: [{ x: 0.5, y: 0.5, edge: 'center', normAmp: 1, phase: 0 }],
    targetMask: null,
  });
  sandSim.isActive = !isPaused;

  updateMetricsDisplay(null);
  renderCompactTelemetry();
  renderFreqMixer();
  renderChannelDriveTable();

  if (!isPaused && userUnlockedAudio) {
    synth.playChord([freq], [1], [1], 0.04);
  }
}

async function setHardwareMode(hw, triggerSolve = true, { preserveClassicSweep = false } = {}) {
  const keepSweep = preserveClassicSweep && hw === 'classic' && classicManualSweep;
  activeHardware = hw;
  classicManualSweep = keepSweep;
  document.querySelectorAll('#hardwareSegmented .seg-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.hw === hw);
  });

  classicControls.classList.toggle('hidden', hw !== 'classic');

  setSolvingBusy(true, T().preparingPhysics);
  await ensureWorkerConfigured(hw);
  setSolvingBusy(false);
  updateHeaderAndConstants();

  if (hw === 'classic') {
    renderClassicResonances();
  }

  if (triggerSolve) {
    if (keepSweep) {
      await applyClassicFrequency(Number(classicFreqSlider.value), lastClassicModeLabel);
    } else if (appMode === 'game') {
      await startGameLevel(puzzleGame.levelIndex);
    } else if (appMode === 'studio') {
      const isCustom = studioTargetLabel === 'ÇİZİM' || studioTargetLabel === 'DRAWING';
      await synthesizeTarget(studioTargetLabel, isCustom ? customDrawMask : null);
    }
  }
}

function unlockAudioOnInteraction() {
  if (!userUnlockedAudio) {
    userUnlockedAudio = true;
    if (!isPaused) {
      if (classicManualSweep) {
        synth.playChord([Number(classicFreqSlider.value)], [1], [1]);
      } else if (appMode === 'game' && puzzleGame.activeSolution) {
        const res = puzzleGame.evaluateLiveField();
        if (res) {
          synth.playChord(
            res.liveFreqs,
            res.liveWeights,
            puzzleGame.activeSolution.freqs.map(() => 1)
          );
        }
      } else if (currentSolution) {
        synth.playChord(getEffectiveFreqs(), currentSolution.freqWeights, freqGains);
      }
    }
  }
}

// -------------------- Sequence Player --------------------
function clearSequenceTimer() {
  if (sequenceTimer) {
    clearTimeout(sequenceTimer);
    sequenceTimer = null;
  }
}

function stopSequence() {
  clearSequenceTimer();
  sequenceQueue = [];
  sequenceIndex = -1;
  sequenceBar.classList.add('hidden');
  btnDigitTour.classList.remove('active');
  digitTourLabel.textContent = T().digitTourStart;
}

function renderSequenceChips() {
  seqCounter.textContent = `${sequenceIndex + 1}/${sequenceQueue.length}`;
  seqChips.innerHTML = '';
  sequenceQueue.forEach((tok, idx) => {
    const span = document.createElement('button');
    span.type = 'button';
    span.className =
      'seq-chip' + (idx === sequenceIndex ? ' active' : idx < sequenceIndex ? ' done' : '');
    span.textContent = tok;
    span.addEventListener('click', () => {
      unlockAudioOnInteraction();
      jumpToSequenceIndex(idx);
    });
    seqChips.appendChild(span);
  });
}

function scheduleNextSequenceStep() {
  clearSequenceTimer();
  if (isPaused || sequenceQueue.length <= 1 || sequenceIndex < 0) return;

  sequenceTimer = setTimeout(() => {
    if (isPaused) return;
    if (sequenceIndex + 1 < sequenceQueue.length) {
      jumpToSequenceIndex(sequenceIndex + 1);
    } else if (loopSequence) {
      jumpToSequenceIndex(0);
    } else {
      btnDigitTour.classList.remove('active');
      digitTourLabel.textContent = T().digitTourStart;
    }
  }, seqDurationMs);
}

async function jumpToSequenceIndex(idx) {
  if (idx < 0 || idx >= sequenceQueue.length) return;
  clearSequenceTimer();
  sequenceIndex = idx;
  renderSequenceChips();
  await synthesizeTarget(sequenceQueue[sequenceIndex]);
  scheduleNextSequenceStep();
}

function startSequence(tokens, isTour = false) {
  stopSequence();
  if (!tokens.length) return;

  if (tokens.length === 1) {
    if (isPaused) {
      isPaused = false;
      updatePlayPauseUI();
    }
    synthesizeTarget(tokens[0]);
    return;
  }

  sequenceQueue = tokens;
  sequenceBar.classList.remove('hidden');
  if (isTour) {
    btnDigitTour.classList.add('active');
    digitTourLabel.textContent = T().digitTourStop;
  }
  if (isPaused) {
    isPaused = false;
    updatePlayPauseUI();
  }
  jumpToSequenceIndex(0);
}

// -------------------- Freehand Drawing --------------------
function setDrawMode(on) {
  drawMode = on;
  btnDrawMode.classList.toggle('active', on);
  canvasStage.classList.toggle('drawing', on);
  syncRightSurface();

  if (on) {
    stopSequence();
    prevOverlayBeforeDraw = sandSim.overlayMode;
    overlayChangedDuringDraw = false;
    customDrawMask.fill(0);
    sandSim.targetMask = customDrawMask;
    setOverlayMode('target');
  } else if (!overlayChangedDuringDraw) {
    setOverlayMode(prevOverlayBeforeDraw);
  }
}

function paintAtPointerEvent(e) {
  const rect = plateCanvas.getBoundingClientRect();
  const nx = (e.clientX - rect.left) / rect.width;
  const ny = (e.clientY - rect.top) / rect.height;
  if (nx < 0.04 || nx > 0.96 || ny < 0.04 || ny > 0.96) return;
  paintMaskBrush(customDrawMask, nx, ny, 0.056, 1, GRID_N);
  sandSim.targetMask = customDrawMask;
}

function setOverlayMode(mode) {
  sandSim.overlayMode = mode;
  document.querySelectorAll('#overlayTabs .mini-seg').forEach((b) => {
    b.classList.toggle('active', b.dataset.overlay === mode);
  });
}

// -------------------- Event Bindings --------------------
btnToggleLab.addEventListener('click', () => setLabOpen(!labOpen));
btnCloseLab.addEventListener('click', () => setLabOpen(false));
btnOpenManualMixer.addEventListener('click', () => {
  selectLabTab('spectrum');
  setLabOpen(true);
});
btnOpenGuideFromStudio.addEventListener('click', () => setAppMode('guide'));

document.querySelectorAll('.lab-tab').forEach((tab) => {
  tab.addEventListener('click', () => selectLabTab(tab.dataset.labtab));
});

btnPlayPause.addEventListener('click', () => {
  unlockAudioOnInteraction();
  isPaused = !isPaused;
  sandSim.isActive = !isPaused;
  updatePlayPauseUI();

  if (isPaused) {
    clearSequenceTimer();
    synth.stop();
  } else {
    if (classicManualSweep) {
      synth.playChord([Number(classicFreqSlider.value)], [1], [1]);
    } else if (appMode === 'game' && puzzleGame.activeSolution) {
      const res = puzzleGame.evaluateLiveField();
      if (res) {
        synth.playChord(
          res.liveFreqs,
          res.liveWeights,
          puzzleGame.activeSolution.freqs.map(() => 1)
        );
      }
    } else if (currentSolution) {
      synth.playChord(getEffectiveFreqs(), currentSolution.freqWeights, freqGains);
    }
    scheduleNextSequenceStep();
  }
});

btnPrevStep.addEventListener('click', () => {
  unlockAudioOnInteraction();
  if (sequenceQueue.length <= 1) return;
  jumpToSequenceIndex((sequenceIndex - 1 + sequenceQueue.length) % sequenceQueue.length);
});

btnNextStep.addEventListener('click', () => {
  unlockAudioOnInteraction();
  if (sequenceQueue.length <= 1) return;
  jumpToSequenceIndex((sequenceIndex + 1) % sequenceQueue.length);
});

btnLoopToggle.addEventListener('click', () => {
  loopSequence = !loopSequence;
  btnLoopToggle.classList.toggle('active', loopSequence);
  btnLoopToggle.textContent = loopSequence ? T().loopOn : T().loopOff;
});

digitGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.key-btn');
  if (!btn) return;
  unlockAudioOnInteraction();
  stopSequence();
  if (drawMode) setDrawMode(false);
  if (isPaused) {
    isPaused = false;
    updatePlayPauseUI();
  }
  synthesizeTarget(btn.dataset.digit);
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (pinnedTipAnchor) {
      hideTooltip();
      return;
    }
    if (labOpen) {
      setLabOpen(false);
      return;
    }
  }
  if (document.activeElement === wordInput || appMode === 'guide') return;
  if (e.code === 'Space') {
    e.preventDefault();
    btnPlayPause.click();
  } else if (appMode === 'studio' && !drawMode && e.key >= '0' && e.key <= '9') {
    unlockAudioOnInteraction();
    stopSequence();
    synthesizeTarget(e.key);
  }
});

function handleWordSubmit() {
  unlockAudioOnInteraction();
  if (drawMode) setDrawMode(false);
  const raw = wordInput.value.trim();
  if (!raw) return;

  let mode = wordModeSelect.value;
  if (mode === 'auto') {
    const hasSpaces = /\s/.test(raw);
    const len = Array.from(raw).length;
    if (len === 1) {
      mode = 'single';
    } else if (activeHardware === 'array40' && !hasSpaces && len <= 6) {
      mode = 'single';
    } else if (activeHardware === 'array40') {
      mode = 'word';
    } else {
      mode = 'char';
    }
  }

  const tokens = tokenizeTextForPlate(raw, mode);
  if (!tokens.length) return;
  startSequence(tokens, false);
}

btnSynthesizeWord.addEventListener('click', handleWordSubmit);
wordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleWordSubmit();
});
btnStopSequence.addEventListener('click', stopSequence);

btnDigitTour.addEventListener('click', () => {
  unlockAudioOnInteraction();
  if (drawMode) setDrawMode(false);
  if (sequenceQueue.join('') === '0123456789' && sequenceTimer) {
    stopSequence();
  } else {
    startSequence(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], true);
  }
});

btnScatter.addEventListener('click', () => {
  unlockAudioOnInteraction();
  sandSim.scatterUniform();
});

btnDrawMode.addEventListener('click', () => {
  unlockAudioOnInteraction();
  setDrawMode(!drawMode);
});
btnExitDrawing.addEventListener('click', () => setDrawMode(false));
btnClearDrawing.addEventListener('click', () => {
  customDrawMask.fill(0);
  sandSim.targetMask = customDrawMask;
});
btnSolveDrawing.addEventListener('click', () => {
  unlockAudioOnInteraction();
  let sum = 0;
  for (let i = 0; i < customDrawMask.length; i++) sum += customDrawMask[i];
  if (sum < 4) return;
  const maskCopy = new Float32Array(customDrawMask);
  setDrawMode(false);
  synthesizeTarget(T().customDrawLabel, maskCopy);
});

plateCanvas.addEventListener('pointerdown', (e) => {
  if (!drawMode) return;
  isPointerDown = true;
  plateCanvas.setPointerCapture(e.pointerId);
  paintAtPointerEvent(e);
});
plateCanvas.addEventListener('pointermove', (e) => {
  if (!drawMode || !isPointerDown) return;
  paintAtPointerEvent(e);
});
plateCanvas.addEventListener('pointerup', () => {
  isPointerDown = false;
});

document.querySelectorAll('#overlayTabs .mini-seg').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (drawMode) overlayChangedDuringDraw = true;
    setOverlayMode(btn.dataset.overlay);
  });
});

document.querySelectorAll('#hardwareSegmented .seg-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    unlockAudioOnInteraction();
    setHardwareMode(btn.dataset.hw, true);
  });
});

classicFreqSlider.addEventListener('input', () => {
  unlockAudioOnInteraction();
  resonanceChips.querySelectorAll('.res-chip').forEach((b) => b.classList.remove('active'));
  applyClassicFrequency(Number(classicFreqSlider.value));
});

btnResetAllFreqs.addEventListener('click', () => {
  unlockAudioOnInteraction();
  resetAllChannelsToDefault();
});

materialSelect.addEventListener('change', async () => {
  unlockAudioOnInteraction();
  activeMaterialId = materialSelect.value;
  workerConfiguredKey = null;
  await setHardwareMode(activeHardware, true, { preserveClassicSweep: true });
});

particleCountSelect.addEventListener('change', () => {
  sandSim.setParticleCount(Number(particleCountSelect.value));
  updateHeaderAndConstants();
});

gammaSlider.addEventListener('input', () => {
  const val = Number(gammaSlider.value);
  sandSim.gammaGain = val;
  gammaVal.textContent = `${val.toFixed(1)} g`;
});

seqDurationSlider.addEventListener('input', () => {
  const sec = Number(seqDurationSlider.value);
  seqDurationMs = Math.round(sec * 1000);
  seqDurationVal.textContent = `${sec.toFixed(1)} ${T().seqUnit}`;
});

btnAudioToggle.addEventListener('click', () => {
  unlockAudioOnInteraction();
  const next = !synth.enabled;
  synth.setEnabled(next);
  btnAudioToggle.classList.toggle('active', next);
  icoAudioOn.classList.toggle('hidden', !next);
  icoAudioOff.classList.toggle('hidden', next);
  audioLabel.textContent = next ? T().audioOn : T().audioOff;
});

masterVolume.addEventListener('input', () => {
  unlockAudioOnInteraction();
  const v = Number(masterVolume.value);
  synth.setVolume(v);
  volVal.textContent = `${Math.round(v * 100)}%`;
});

// -------------------- Data Export --------------------
btnExportChannelsCsv.addEventListener('click', () => {
  if (!currentSolution || classicManualSweep) return;
  const effFreqs = getEffectiveFreqs();
  let csv = 'Channel,Label,X_cm,Y_cm,Freq_Hz,Drive_Re,Drive_Im,Amplitude,Phase_rad,Phase_deg\n';
  currentSolution.actuatorStats.forEach((a, p) => {
    effFreqs.forEach((f, k) => {
      const g = freqGains[k] ?? 1;
      const re = currentSolution.uRe[k][p] * g;
      const im = currentSolution.uIm[k][p] * g;
      const amp = Math.hypot(re, im);
      const phase = Math.atan2(im, re);
      const deg = (phase * 180) / Math.PI;
      csv += `CH${p + 1},${a.label},${(a.x * 25).toFixed(2)},${(a.y * 25).toFixed(2)},${f},${re.toFixed(5)},${im.toFixed(5)},${amp.toFixed(5)},${phase.toFixed(5)},${deg.toFixed(2)}\n`;
    });
  });
  downloadFile(`pulseplus_hardware_channels_${activeHardware}_${currentTargetLabel}.csv`, csv, 'text/csv;charset=utf-8');
});

btnExportJson.addEventListener('click', () => {
  if (!plateMeta) return;
  const m = plateMeta.material;
  const effFreqs = getEffectiveFreqs();
  const payload = {
    project: 'PULSE+ — Flat Metal Plate Kirchhoff-Love Acoustic Synthesizer',
    timestamp: new Date().toISOString(),
    plate: {
      material: m.name,
      youngsModulus_Pa: m.E,
      poissonsRatio: m.nu,
      density_kg_m3: m.rho,
      thickness_m: m.h,
      sideLength_m: m.L,
      flexuralRigidity_Nm: plateMeta.D,
      dampingRatio: m.zeta,
      fundamentalMode_f11_Hz: plateMeta.f11,
      dimensionless_lambda11: plateMeta.lambda11,
      modalBasisCount: plateMeta.modeCount,
    },
    hardwareMode: activeHardware,
    target: classicManualSweep ? `${Math.round(Number(classicFreqSlider.value))}Hz` : currentTargetLabel,
    particleCount: sandSim.count,
    gammaGain_g: sandSim.gammaGain,
    solution: !classicManualSweep && currentSolution
      ? {
          solveTime_ms: Number(currentSolution.solveMs.toFixed(2)),
          iou_percent: Number(currentSolution.metrics.iou.toFixed(2)),
          vibrationContrast_ratio: Number(currentSolution.metrics.contrast.toFixed(2)),
          frequencies_Hz: effFreqs,
          defaultFrequencies_Hz: currentSolution.freqs,
          frequencyNormalizedWeights: currentSolution.freqWeights.map((w) => Number(w.toFixed(4))),
          activeMixerGains: freqGains,
          channels: currentSolution.actuatorStats.map((a, p) => ({
            channel: p + 1,
            label: a.label,
            x_cm: Number((a.x * 25).toFixed(2)),
            y_cm: Number((a.y * 25).toFixed(2)),
            perFrequency: effFreqs.map((f, k) => ({
              freq_Hz: f,
              re: Number((currentSolution.uRe[k][p] * (freqGains[k] ?? 1)).toFixed(5)),
              im: Number((currentSolution.uIm[k][p] * (freqGains[k] ?? 1)).toFixed(5)),
            })),
          })),
        }
      : null,
  };
  downloadFile(`pulseplus_${m.id}_${activeHardware}_${currentTargetLabel}.json`, JSON.stringify(payload, null, 2), 'application/json');
});

btnExportCsv.addEventListener('click', () => {
  if (!currentSolution || classicManualSweep) return;
  const effFreqs = getEffectiveFreqs();
  let csv = 'Channel,Frequency_Hz,Default_Hz,Normalized_Weight,Manual_Gain,Target,Hardware,IoU_Pct,Contrast_x\n';
  effFreqs.forEach((f, k) => {
    csv += `F${k + 1},${f},${currentSolution.freqs[k]},${currentSolution.freqWeights[k].toFixed(4)},${(freqGains[k] ?? 1).toFixed(2)},${currentTargetLabel},${activeHardware},${currentSolution.metrics.iou.toFixed(2)},${currentSolution.metrics.contrast.toFixed(2)}\n`;
  });
  downloadFile(`pulseplus_${currentTargetLabel}_spectrum.csv`, csv, 'text/csv;charset=utf-8');
});

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// -------------------- Acoustic Puzzle Game --------------------
function updateGameLevelCopy() {
  const t = T();
  const idx = puzzleGame.levelIndex;
  const lvl = GAME_LEVELS[idx] || GAME_LEVELS[0];
  const copy = getGameLevelCopy(idx);
  gameLevelBadge.textContent = `${t.gameLevelPrefix} 0${lvl.id} / 0${GAME_LEVELS.length} · ${copy.category}`;
  gameLevelTitle.textContent = copy.name;
  gameHintText.textContent = copy.hint;
  if (puzzleGame.solved) {
    setReadout(lvl.target, t.gameUnlockedReadout);
    gameWinTitle.textContent = `${t.gameUnlockedReadout}: ${lvl.target} (+${lvl.points})`;
    gameWinSub.textContent = puzzleGame.hasNextLevel() ? t.gameWinSubNext : t.gameWinSubAll;
    btnNextLevel.textContent = puzzleGame.hasNextLevel() ? t.gameNextBtn : t.gameReplayBtn;
  } else {
    setReadout('?', t.gameSecretReadout);
  }
  renderGameLevelDots();
}

function renderGameLevelDots() {
  gameLevelDots.innerHTML = '';
  GAME_LEVELS.forEach((lvl, idx) => {
    const copy = getGameLevelCopy(idx);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className =
      'lvl-dot' +
      (idx === puzzleGame.levelIndex ? ' active' : '') +
      (puzzleGame.completedLevels.has(lvl.id) ? ' done' : '');
    btn.textContent = String(lvl.id);
    btn.title = `${T().gameLevelPrefix} ${lvl.id}: ${copy.name}`;
    btn.addEventListener('click', () => {
      unlockAudioOnInteraction();
      startGameLevel(idx);
    });
    gameLevelDots.appendChild(btn);
  });
}

function updateGameUiFromEval(evalRes) {
  if (!evalRes) return;
  const t = T();
  gameAllLocked = evalRes.allLocked;
  gameMatchPct.textContent = `${evalRes.matchPct}%`;
  gameMatchFill.style.width = `${evalRes.matchPct}%`;
  gameMatchFill.classList.toggle('locked', evalRes.allLocked || puzzleGame.solved);
  gameScoreVal.textContent = String(puzzleGame.score);

  puzzleGame.knobs.forEach((knob, i) => {
    const card = gameKnobs.querySelector(`[data-knob="${i}"]`);
    if (!card) return;
    const badge = card.querySelector('.knob-status');
    const titleEl = card.querySelector('.knob-label-hz');
    const isWarm = !knob.locked && knob.resonance >= 0.55;
    card.classList.toggle('locked', knob.locked);
    card.classList.toggle('warm', isWarm);
    if (titleEl && Array.isArray(knob.channels) && knob.channels.length) {
      const liveHz = Math.round(evalRes.liveFreqs[knob.channels[0]] ?? knob.baseFreq);
      titleEl.textContent = `${t.gameKnobPrefix} ${i + 1} · ${liveHz} Hz`;
    }
    if (badge) {
      badge.textContent = knob.locked ? t.gameStatusLocked : isWarm ? t.gameStatusWarm : t.gameStatusTune;
    }
  });
}

function applyGameEval(evalRes, { pulse = false } = {}) {
  if (!evalRes || !puzzleGame.activeSolution) return;
  const sol = puzzleGame.activeSolution;
  const gains = sol.freqs.map(() => 1);
  sandSim.setWaveField(evalRes.intensity, {
    modeRe: sol.modeRe,
    modeIm: sol.modeIm,
    freqs: evalRes.liveFreqs,
    gains,
    actuators: sol.actuatorStats,
    targetMask: sol.mask,
    pulse,
  });
  sandSim.isActive = !isPaused;
  updateMetricsDisplay(evalRes.metrics);
  updateGameUiFromEval(evalRes);
  renderCompactTelemetry(evalRes);
  if (labOpen) {
    renderFreqMixer(evalRes);
  }

  if (!isPaused && userUnlockedAudio) {
    synth.playChord(evalRes.liveFreqs, evalRes.liveWeights, gains, 0.03);
  } else if (!isPaused) {
    synth.currentFreqs = [...evalRes.liveFreqs];
    synth.currentWeights = [...evalRes.liveWeights];
    synth.currentMutes = gains;
    synth.isPlaying = true;
  }
}

function renderGameKnobs() {
  const t = T();
  gameKnobs.innerHTML = '';
  puzzleGame.knobs.forEach((knob, idx) => {
    const card = document.createElement('div');
    card.className = 'knob-card';
    card.dataset.knob = String(idx);
    card.innerHTML = `
      <div class="knob-top">
        <span class="knob-label-hz">${t.gameKnobPrefix} ${idx + 1} · ${knob.baseFreq} Hz</span>
        <span class="knob-status">${t.gameStatusTune}</span>
      </div>
      <input type="range" min="0" max="100" step="1" value="${knob.value}" />
    `;
    const slider = card.querySelector('input');
    slider.addEventListener('input', () => {
      unlockAudioOnInteraction();
      if (isPaused) {
        isPaused = false;
        updatePlayPauseUI();
      }
      const res = puzzleGame.setKnobValue(idx, Number(slider.value));
      applyGameEval(res);
    });
    gameKnobs.appendChild(card);
  });
}

async function startGameLevel(idx = puzzleGame.levelIndex) {
  const epoch = ++activeSolveEpoch;
  stopSequence();
  if (drawMode) setDrawMode(false);
  classicManualSweep = false;
  gameAllLocked = false;
  gameWinBanner.classList.add('hidden');

  const safeIdx = Math.max(0, Math.min(GAME_LEVELS.length - 1, idx));
  const lvl = GAME_LEVELS[safeIdx];
  puzzleGame.levelIndex = safeIdx;
  updateGameLevelCopy();

  const needsHighRes = Array.from(lvl.target).length > 1 && activeHardware !== 'array40';
  const solveHw = needsHighRes
    ? 'array40'
    : activeHardware === 'classic'
    ? 'array16'
    : activeHardware;
  await ensureWorkerConfigured(solveHw);
  if (epoch !== activeSolveEpoch) return;

  const key = `${activeMaterialId}|${solveHw}|${lvl.target}`;
  let sol = solutionCache.get(key);
  if (!sol) {
    setSolvingBusy(true, T().preparingLevel(lvl.id));
    const mask = buildGlyphMask(lvl.target, GRID_N);
    sol = await callWorker('solve', { mask });
    if (epoch !== activeSolveEpoch) return;
    solutionCache.set(key, sol);
  }
  setSolvingBusy(false);

  currentSolution = sol;
  currentTargetLabel = lvl.target;
  renderChannelDriveTable();

  const evalRes = puzzleGame.loadSolution(sol, safeIdx);
  updateGameLevelCopy();
  renderGameKnobs();
  sandSim.scatterUniform();
  applyGameEval(evalRes, { pulse: false });
}

function handleGameLevelSolved() {
  updateGameLevelCopy();
  gameScoreVal.textContent = String(puzzleGame.score);
  gameWinBanner.classList.remove('hidden');
  synth.playSuccessChime();
}

async function setAppMode(mode) {
  if (appMode === mode) return;
  const prevMode = appMode;
  appMode = mode;

  const isStudio = mode === 'studio';
  const isGame = mode === 'game';
  const isBuild = mode === 'build';
  const isGuide = mode === 'guide';

  btnModeStudio.classList.toggle('active', isStudio);
  btnModeStudio.setAttribute('aria-selected', String(isStudio));
  btnModeGame.classList.toggle('active', isGame);
  btnModeGame.setAttribute('aria-selected', String(isGame));
  if (btnModeBuild) {
    btnModeBuild.classList.toggle('active', isBuild);
    btnModeBuild.setAttribute('aria-selected', String(isBuild));
  }
  btnModeGuide.classList.toggle('active', isGuide);
  btnModeGuide.setAttribute('aria-selected', String(isGuide));

  document.body.classList.toggle('build3d-locked', isBuild);
  stageView.classList.toggle('hidden', isGuide || isBuild);
  if (buildView) buildView.classList.toggle('hidden', !isBuild);
  guideView.classList.toggle('hidden', !isGuide);
  labToggleWrap.classList.toggle('hidden', isGuide || isBuild);

  if (isBuild) {
    if (prevMode === 'studio' || prevMode === 'game') lastInteractiveMode = prevMode;
    if (labOpen) setLabOpen(false);
    hideTooltip();
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!build3dCtrl && buildView) {
      build3dCtrl = new HowToBuild3DController(buildView, lang, () => {
        setAppMode(lastInteractiveMode || 'studio');
      });
    } else if (build3dCtrl) {
      build3dCtrl.setLanguage(lang);
      build3dCtrl.resize();
    }
    return;
  }

  if (isGuide) {
    if (prevMode === 'studio' || prevMode === 'game') lastInteractiveMode = prevMode;
    renderGuidePage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  if (drawMode) setDrawMode(false);
  syncRightSurface();

  if (isGame) {
    if (prevMode === 'studio') wasClassicSweepBeforeGame = classicManualSweep;
    stopSequence();
    if ((prevMode === 'guide' || prevMode === 'build') && puzzleGame.activeSolution) {
      updateGameLevelCopy();
      const res = puzzleGame.evaluateLiveField();
      if (res) applyGameEval(res, { pulse: false });
    } else {
      await startGameLevel(puzzleGame.levelIndex);
    }
  } else if (isStudio) {
    gameAllLocked = false;
    if ((prevMode === 'guide' || prevMode === 'build') && currentSolution && currentTargetLabel === studioTargetLabel) {
      const pCount = currentSolution.actuatorStats.length;
      elStatusText.textContent = classicManualSweep
        ? T().statusClassicMode(Math.round(Number(classicFreqSlider.value)))
        : pCount === 1
        ? T().statusSingleSpeaker(currentTargetLabel, currentSolution.metrics.iou.toFixed(0))
        : T().statusMultiPiezo(pCount, currentTargetLabel);
      applyActiveSolutionField({ pulse: false });
      renderCompactTelemetry();
      renderFreqMixer();
      return;
    }
    if (activeHardware === 'classic' && wasClassicSweepBeforeGame) {
      await applyClassicFrequency(Number(classicFreqSlider.value), lastClassicModeLabel);
    } else {
      const target = studioTargetLabel || '3';
      const isCustom = target === 'ÇİZİM' || target === 'DRAWING';
      await synthesizeTarget(
        target,
        isCustom ? customDrawMask : null,
        { playSound: userUnlockedAudio, pulse: true }
      );
    }
  }
}

btnModeStudio.addEventListener('click', () => {
  unlockAudioOnInteraction();
  setAppMode('studio');
});
btnModeGame.addEventListener('click', () => {
  unlockAudioOnInteraction();
  setAppMode('game');
});
if (btnModeBuild) {
  btnModeBuild.addEventListener('click', () => {
    setAppMode('build');
  });
}
btnModeGuide.addEventListener('click', () => {
  setAppMode('guide');
});

btnNextLevel.addEventListener('click', () => {
  unlockAudioOnInteraction();
  const nextIdx = puzzleGame.hasNextLevel() ? puzzleGame.levelIndex + 1 : 0;
  startGameLevel(nextIdx);
});

// -------------------- 0-9 Thesis Validation Benchmark --------------------
function renderBenchmarkResults(benchHw) {
  const t = T();
  const avgIou = lastBenchmarkRows.reduce((s, r) => s + r.iou, 0) / lastBenchmarkRows.length;
  const avgContrast = lastBenchmarkRows.reduce((s, r) => s + r.contrast, 0) / lastBenchmarkRows.length;
  const leissaErr = plateMeta ? (Math.abs(plateMeta.lambda11 - 13.49) / 13.49) * 100 : 2.9;

  const rowsHtml = lastBenchmarkRows
    .map(
      (r) =>
        `<tr><td>${r.digit}</td><td>${r.iou.toFixed(1)}%</td><td>${r.contrast.toFixed(1)}×</td><td>${r.peakFreq} Hz</td><td>${Math.round(r.solveMs)} ms</td></tr>`
    )
    .join('');

  benchResult.innerHTML = `
    <div class="bench-summary">
      <span>${t.benchAvgIou}: ${avgIou.toFixed(1)}%</span>
      <span>${t.benchContrast}: ${avgContrast.toFixed(1)}×</span>
      <span>${t.benchLeissa}: ${leissaErr.toFixed(2)}%</span>
    </div>
    <table class="bench-table">
      <thead><tr><th>${t.benchThDigit}</th><th>IoU</th><th>${t.benchContrast}</th><th>${t.benchThPeak}</th><th>${t.benchThTime}</th></tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>
    <button id="btnDownloadBenchCsv" class="btn-outline btn-full">${t.benchDownloadCsv}</button>
  `;

  benchResult.querySelector('#btnDownloadBenchCsv').addEventListener('click', () => {
    let csv = 'Digit,IoU_Percent,Contrast_Ratio,Dominant_Freq_Hz,SolveTime_ms,Material,Hardware,Lambda11,Leissa1969_Ref\n';
    lastBenchmarkRows.forEach((r) => {
      csv += `${r.digit},${r.iou.toFixed(2)},${r.contrast.toFixed(2)},${r.peakFreq},${r.solveMs.toFixed(1)},${activeMaterialId},${benchHw},${plateMeta.lambda11.toFixed(3)},13.490\n`;
    });
    downloadFile(`pulseplus_benchmark_0-9_${activeMaterialId}_${benchHw}.csv`, csv, 'text/csv;charset=utf-8');
  });
}

async function runDigitBenchmark() {
  if (benchmarkRunning) return;
  const benchHw = activeHardware;
  lastBenchmarkHw = benchHw;
  benchmarkRunning = true;
  btnRunBenchmark.disabled = true;
  benchResult.classList.remove('hidden');
  lastBenchmarkRows = [];

  try {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    await ensureWorkerConfigured(benchHw);

    for (let i = 0; i < digits.length; i++) {
      const d = digits[i];
      btnRunBenchmark.textContent = T().benchRunning(i + 1);
      const key = `${activeMaterialId}|${benchHw}|${d}`;
      let sol = solutionCache.get(key);
      if (!sol) {
        const mask = buildGlyphMask(d, GRID_N);
        sol = await callWorker('solve', { mask });
        solutionCache.set(key, sol);
      }
      let peakIdx = 0;
      for (let k = 1; k < sol.freqWeights.length; k++) {
        if (sol.freqWeights[k] > sol.freqWeights[peakIdx]) peakIdx = k;
      }
      lastBenchmarkRows.push({
        digit: d,
        iou: sol.metrics.iou,
        contrast: sol.metrics.contrast,
        solveMs: sol.solveMs,
        peakFreq: sol.freqs[peakIdx],
      });
    }

    renderBenchmarkResults(benchHw);
  } finally {
    benchmarkRunning = false;
    btnRunBenchmark.disabled = false;
    btnRunBenchmark.textContent = T().benchRunBtn;
  }
}

btnRunBenchmark.addEventListener('click', runDigitBenchmark);

// -------------------- Main 60 FPS Fixed-Timestep Loop --------------------
let lastTime = null;
let physicsAcc = 0;
let metricAcc = 0;
const FIXED_DT = 1 / 60;

function tick(now) {
  if (lastTime === null) lastTime = now;
  const elapsed = Math.max(0, Math.min(0.2, (now - lastTime) / 1000));
  lastTime = now;

  if (appMode === 'studio' || appMode === 'game') {
    physicsAcc += elapsed;
    let steps = 0;
    while (physicsAcc >= FIXED_DT && steps < 6) {
      sandSim.step(FIXED_DT);
      physicsAcc -= FIXED_DT;
      steps++;
    }
    if (steps === 6 && physicsAcc > FIXED_DT) physicsAcc = 0;

    if (appMode === 'game' && !isPaused && !puzzleGame.solved) {
      const justWon = puzzleGame.tickLock(elapsed, gameAllLocked);
      if (justWon) handleGameLevelSolved();
    }

    sandSim.render();
    synth.drawScope(miniScopeCanvas, sandSim.phaseClock);

    metricAcc += elapsed;
    if (metricAcc >= 0.25) {
      metricAcc = 0;
      const pct = classicManualSweep
        ? sandSim.getSettledRatio()
        : sandSim.getTargetOverlapRatio();
      elLiveStatOverlap.textContent = `${pct.toFixed(0)}%`;
    }
  }

  requestAnimationFrame(tick);
}

// -------------------- Boot --------------------
async function boot() {
  applyStaticTranslations();
  syncRightSurface();
  setSolvingBusy(true, T().preparingPlate);
  await ensureWorkerConfigured(activeHardware);
  updateHeaderAndConstants();
  await synthesizeTarget('3', null, { playSound: false, pulse: false });
}

boot();
requestAnimationFrame(tick);
