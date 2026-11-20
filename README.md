# PULSE+ — Sound-Sculpted Sand / Sesle Şekillenen Kum

Interactive real-time acoustic physics digital twin & puzzle instrument built around the **4th-order Kirchhoff–Love free-edge thin elastic plate equation**, target-adaptive inverse Green's function wave synthesis, and 45,000–85,000 3D ballistic sand grains.

> **Zero cheating, zero bars, zero reference lines:** The simulated metal plate is 100% flat and uncut. Digits (`0–9`), letters, words, and freehand drawings emerge strictly from simultaneous multi-frequency acoustic wave interference and quiet nodal valleys.

---

## Key Features

- **Exact Kirchhoff–Love Thin Plate Solver** (`src/physics.js`, `src/solver.js`, `src/solver-worker.js`)
  - 266+ free-free Euler–Bernoulli flexural modes on a 25×25 cm flat metal plate (`Al 6061-T6`, `Brass C260`, `Steel 304`, `Acrylic PMMA`)
  - Validated against NASA SP-160 (Leissa, 1969): dimensionless fundamental eigenvalue $\lambda_{1,1} = 13.89$ vs. reference `13.49` (~2.9% error)
  - **2-Stage Target-Adaptive Frequency Discovery**: scans 16 broadband plate bands and selects the physically optimal 8 (or 10) frequencies per target shape, yielding ~89% avg IoU (`8 Piezos`), ~95% avg IoU (`16 Piezos`, `19×` vibration contrast), and ~98% avg IoU (`40 Piezos`)
- **45,000–85,000 3D Ballistic Granular Sand Physics** (`src/particles.js`)
  - Physical launch threshold $\Gamma = a/g > 1$, intensity-gradient drift $-\nabla I$, stochastic micro-scatter, Coulomb arrest, and 84×84 excluded-volume sand-pile slumping
- **Real-Time Per-Channel Manual Frequency Console** (`Fizik Lab → Frekanslar / Frequencies`)
  - Non-blocking side-expanding Physics Lab panel (works live beside both **Studio** and **Game** without dimming the background)
  - Adjust every frequency channel's gain (`0%–200%`) and exact real plate frequency (`Hz`, recomputing exact Kirchhoff–Love Green's wavefields live in the Web Worker), with individual (`↺`) and global reset controls
- **Real-Time Multi-Channel Web Audio Synthesizer** (`src/audio.js`)
  - Synthesizes the exact active Kirchhoff–Love frequencies with equal-loudness headphone safety filtering and live oscilloscope
- **8-Level Acoustic Cipher Game** (`src/game.js`)
  - Detunes real plate frequency groups via Lorentzian resonance curves with competing off-resonance modes
- **Bilingual TR / EN + Plain-Language & Academic Guide** (`src/i18n.js`, `src/guide.js`)
  - Instant top-bar `TR | EN` toggle, 35 contextual `?` info popovers, reading-mode switch (*Simple Explanation Only* vs. *Full Science + Equations*), standing-wave SVG diagram, real-world hardware build guide, and 8 clickable peer-reviewed citations
- **Real Hardware Export**: Exports per-channel complex drive amplitudes, phases (°/rad), plate constants, and 0–9 thesis benchmark tables (`JSON` / `CSV`) ready to drive a 6/8/16-channel USB sound card + Class-D piezo amplifier rig.

---

## Local Run

Zero dependencies required (Node.js 18+):

```bash
node server.mjs
# Opens at http://localhost:4321
```

Or on Windows, double-click `start.bat`.

---

## Primary Academic References

1. Chladni, E. F. F. (1787). *Entdeckungen über die Theorie des Klanges*.
2. Faraday, M. (1831). *Phil. Trans. R. Soc.* 121, 299–340.
3. Kirchhoff, G. (1850). *J. Reine Angew. Math.* 40, 51–88.
4. Warburton, G. B. (1954). *Proc. Inst. Mech. Eng.* 168(1), 371–384.
5. Leissa, A. W. (1969). *Vibration of Plates*, NASA SP-160.
6. Zhou, Q. et al. (2016). *Nature Communications* 7, 12764.
7. Melde, K. et al. (2016). *Nature* 537, 518–522.
8. Latifi, K. et al. (2019). *Physical Review Letters* 122, 184301.
