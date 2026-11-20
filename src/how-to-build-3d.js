/**
 * PULSE+ — Full-Viewport Wheel-Driven 3D WebGL "How to Build" Experience (TR / EN)
 *
 * Docked Split-Workbench Architecture (Zero Panel Overlap):
 * - Left / Center Column: Dedicated unobstructed 3D WebGL Stage (Three.js PBR models,
 *   auto-aspect camera framing, animated epoxy syringe, giant 3D piezo cutaway,
 *   3D dimension arrows, symmetrical 4-amp layout, color-coded 7.1 cables, 12,000 3D sand grains).
 * - Right Column: Docked 10-Step Master Engineering Dossier with step-specific high-contrast
 *   SVG technical blueprints (millimeter coordinates, piezo +/- solder polarity, 100Ω resistor
 *   series circuit, TPA3116D2 terminal pinout, 7.1 jack color mapping, troubleshooting).
 * - Locked Full-Viewport (`overflow: hidden`): Scrolling the mouse wheel anywhere scrubs the
 *   10-stage assembly timeline smoothly without scrolling the page.
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / Math.max(1e-6, edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

// ---------------------------------------------------------------------------
// Step-Specific Technical SVG Schematics (10 High-Contrast Engineering Diagrams)
// ---------------------------------------------------------------------------
function getStepBlueprintSVG(stepIdx, lang = 'tr') {
  const tr = lang !== 'en';
  switch (stepIdx) {
    case 0: // Step 1: Full System Signal Flow Block Diagram
      return `
        <svg viewBox="0 0 420 118" class="b3d-blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="418" height="116" rx="10" fill="#090b10" stroke="rgba(232,196,118,0.28)"/>
          <text x="12" y="17" fill="#e8c476" font-size="9.5" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? 'SİNYAL AKIŞ ŞEMASI (PC → 8 BAĞIMSIZ FAZ-SENKRON KANAL → PLAKA)' : 'SIGNAL FLOW ARCHITECTURE (PC → 8 PHASE-LOCKED CHANNELS → PLATE)'}
          </text>
          <!-- Blocks -->
          <rect x="10" y="28" width="66" height="52" rx="6" fill="#131722" stroke="#38bdf8" stroke-width="1.2"/>
          <text x="43" y="49" text-anchor="middle" fill="#f4f4f5" font-size="9" font-family="Inter, sans-serif" font-weight="700">PC / Laptop</text>
          <text x="43" y="62" text-anchor="middle" fill="#38bdf8" font-size="8" font-family="JetBrains Mono, monospace">PULSE+ Web</text>
          <text x="43" y="73" text-anchor="middle" fill="#9ca3af" font-size="7.5" font-family="JetBrains Mono, monospace">8 Frekans</text>

          <path d="M76 54 L94 54" stroke="#38bdf8" stroke-width="1.6" marker-end="url(#arr)"/>
          <text x="85" y="48" text-anchor="middle" fill="#38bdf8" font-size="7" font-family="JetBrains Mono, monospace">USB</text>

          <rect x="94" y="28" width="76" height="52" rx="6" fill="#131722" stroke="#e8c476" stroke-width="1.2"/>
          <text x="132" y="47" text-anchor="middle" fill="#f4f4f5" font-size="8.5" font-family="Inter, sans-serif" font-weight="700">${tr ? '7.1 USB DAC' : '7.1 USB Card'}</text>
          <text x="132" y="59" text-anchor="middle" fill="#e8c476" font-size="7.5" font-family="JetBrains Mono, monospace">4× 3.5mm Jak</text>
          <text x="132" y="71" text-anchor="middle" fill="#34d399" font-size="7.5" font-family="JetBrains Mono, monospace">48kHz Senkron</text>

          <path d="M170 54 L190 54" stroke="#e8c476" stroke-width="1.6"/>
          <text x="180" y="47" text-anchor="middle" fill="#e8c476" font-size="7" font-family="JetBrains Mono, monospace">4×AUX</text>

          <rect x="190" y="28" width="78" height="52" rx="6" fill="#131722" stroke="#34d399" stroke-width="1.2"/>
          <text x="229" y="47" text-anchor="middle" fill="#f4f4f5" font-size="8.5" font-family="Inter, sans-serif" font-weight="700">4× TPA3116D2</text>
          <text x="229" y="59" text-anchor="middle" fill="#34d399" font-size="7.5" font-family="JetBrains Mono, monospace">8 Kanal Amfi</text>
          <text x="229" y="71" text-anchor="middle" fill="#9ca3af" font-size="7.5" font-family="JetBrains Mono, monospace">24V 5A DC</text>

          <path d="M268 54 L288 54" stroke="#f59e0b" stroke-width="1.6"/>
          <text x="278" y="47" text-anchor="middle" fill="#f59e0b" font-size="7" font-family="JetBrains Mono, monospace">8×100Ω</text>

          <rect x="288" y="28" width="120" height="52" rx="6" fill="#131722" stroke="#e8c476" stroke-width="1.4"/>
          <text x="348" y="47" text-anchor="middle" fill="#e8c476" font-size="8.5" font-family="Inter, sans-serif" font-weight="700">${tr ? '8× Piezo + Plaka' : '8× Piezo + Plate'}</text>
          <text x="348" y="59" text-anchor="middle" fill="#f4f4f5" font-size="7.5" font-family="JetBrains Mono, monospace">250×250×1.0 mm Al</text>
          <text x="348" y="71" text-anchor="middle" fill="#34d399" font-size="7.5" font-family="JetBrains Mono, monospace">${tr ? 'Alttan Paralel (±z)' : 'Underside Parallel'}</text>

          <text x="210" y="102" text-anchor="middle" fill="#a1a1aa" font-size="8.5" font-family="JetBrains Mono, monospace">
            ${tr ? '✓ Arduino / Kodlama Yok   ✓ Plakada Delik/Oluk Yok   ✓ Tamamen Standart Parçalar' : '✓ No Arduino / Coding   ✓ No Plate Grooves/Holes   ✓ 100% Off-The-Shelf Parts'}
          </text>
        </svg>`;

    case 1: // Step 2: Exact Millimeter Coordinates on the 250x250mm Plate
      return `
        <svg viewBox="0 0 420 132" class="b3d-blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="418" height="130" rx="10" fill="#090b10" stroke="rgba(232,196,118,0.28)"/>
          <text x="12" y="17" fill="#e8c476" font-size="9.5" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? 'PLAKA ALT YÜZÜ MİLİMETRİK İŞARETLEME CETVELİ (250 × 250 mm)' : 'PLATE UNDERSIDE MILLIMETER MARKING BLUEPRINT (250 × 250 mm)'}
          </text>
          <!-- Square Plate Diagram -->
          <rect x="26" y="25" width="96" height="96" fill="#181c26" stroke="#94a3b8" stroke-width="1.5"/>
          <!-- 4 Foam Pad Squares (35mm from corner) -->
          <rect x="36" y="35" width="12" height="12" fill="rgba(52,211,153,0.25)" stroke="#34d399" stroke-width="1.2"/>
          <rect x="100" y="35" width="12" height="12" fill="rgba(52,211,153,0.25)" stroke="#34d399" stroke-width="1.2"/>
          <rect x="36" y="99" width="12" height="12" fill="rgba(52,211,153,0.25)" stroke="#34d399" stroke-width="1.2"/>
          <rect x="100" y="99" width="12" height="12" fill="rgba(52,211,153,0.25)" stroke="#34d399" stroke-width="1.2"/>
          <!-- 8 Piezo Circles (85mm and 165mm along each 250mm edge, 18mm inset) -->
          <circle cx="58" cy="33" r="6" fill="rgba(232,196,118,0.25)" stroke="#e8c476" stroke-width="1.2"/>
          <circle cx="90" cy="33" r="6" fill="rgba(232,196,118,0.25)" stroke="#e8c476" stroke-width="1.2"/>
          <circle cx="114" cy="57" r="6" fill="rgba(232,196,118,0.25)" stroke="#e8c476" stroke-width="1.2"/>
          <circle cx="114" cy="89" r="6" fill="rgba(232,196,118,0.25)" stroke="#e8c476" stroke-width="1.2"/>
          <circle cx="90" cy="113" r="6" fill="rgba(232,196,118,0.25)" stroke="#e8c476" stroke-width="1.2"/>
          <circle cx="58" cy="113" r="6" fill="rgba(232,196,118,0.25)" stroke="#e8c476" stroke-width="1.2"/>
          <circle cx="34" cy="89" r="6" fill="rgba(232,196,118,0.25)" stroke="#e8c476" stroke-width="1.2"/>
          <circle cx="34" cy="57" r="6" fill="rgba(232,196,118,0.25)" stroke="#e8c476" stroke-width="1.2"/>
          <!-- Coordinate Legend on Right -->
          <text x="138" y="42" fill="#e8c476" font-size="9" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? '● 8× Piezo Merkezi (P1..P8):' : '● 8× Piezo Centers (P1..P8):'}
          </text>
          <text x="138" y="56" fill="#d4d4d8" font-size="8.5" font-family="JetBrains Mono, monospace">
            ${tr ? '• Kenar boyunca: Sol köşeden 85 mm ve 165 mm' : '• Along edge: 85 mm and 165 mm from corner'}
          </text>
          <text x="138" y="70" fill="#d4d4d8" font-size="8.5" font-family="JetBrains Mono, monospace">
            ${tr ? '• Kenardan içeri: 18 mm (disk kenara sıfır oturur)' : '• Inset from edge: 18 mm (35mm disc sits flush)'}
          </text>
          <text x="138" y="92" fill="#34d399" font-size="9" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? '■ 4× Sünger Takoz Merkezi (T1..T4):' : '■ 4× Foam Pad Centers (T1..T4):'}
          </text>
          <text x="138" y="106" fill="#d4d4d8" font-size="8.5" font-family="JetBrains Mono, monospace">
            ${tr ? '• Her köşeden X = 35 mm, Y = 35 mm içeride' : '• Inset X = 35 mm, Y = 35 mm from all 4 corners'}
          </text>
          <text x="138" y="120" fill="#38bdf8" font-size="8" font-family="JetBrains Mono, monospace">
            ${tr ? 'İpucu: 8 piezo yerini 400 kum zımpara + alkolle temizle!' : 'Tip: Sand 8 piezo zones with 400-grit + clean with alcohol!'}
          </text>
        </svg>`;

    case 2: // Step 3: 4x 25mm Isolation Pads Placement
      return `
        <svg viewBox="0 0 420 118" class="b3d-blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="418" height="116" rx="10" fill="#090b10" stroke="rgba(52,211,153,0.32)"/>
          <text x="12" y="17" fill="#34d399" font-size="9.5" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? '4× YUMUŞAK İZOLASYON TAKOZU (30×30 mm TABAN · 25 mm YÜKSEKLİK)' : '4× SOFT ISOLATION PADS (30×30 mm BASE · 25 mm HEIGHT)'}
          </text>
          <!-- Desk line -->
          <line x1="20" y1="94" x2="210" y2="94" stroke="#64748b" stroke-width="2"/>
          <!-- Two foam pads in side view -->
          <rect x="42" y="54" width="28" height="40" rx="3" fill="rgba(52,211,153,0.22)" stroke="#34d399" stroke-width="1.5"/>
          <rect x="160" y="54" width="28" height="40" rx="3" fill="rgba(52,211,153,0.22)" stroke="#34d399" stroke-width="1.5"/>
          <!-- Plate on top -->
          <rect x="26" y="48" width="178" height="6" rx="2" fill="#cbd5e1"/>
          <!-- Height arrow -->
          <line x1="115" y1="54" x2="115" y2="94" stroke="#e8c476" stroke-width="1.3" stroke-dasharray="3 2"/>
          <text x="115" y="77" text-anchor="middle" fill="#e8c476" font-size="9" font-family="JetBrains Mono, monospace" font-weight="700">25 mm (2.5 cm)</text>
          <!-- Right explanation -->
          <text x="225" y="44" fill="#f4f4f5" font-size="8.8" font-family="Inter, sans-serif" font-weight="700">
            ${tr ? 'Neden Tam 2.5 cm Yükseklik?' : 'Why Exactly 2.5 cm Height?'}
          </text>
          <text x="225" y="60" fill="#d4d4d8" font-size="8.2" font-family="JetBrains Mono, monospace">
            ${tr ? '1) Alttaki piezolara 20 mm boşluk açar.' : '1) Creates 20 mm clearance for piezos.'}
          </text>
          <text x="225" y="75" fill="#d4d4d8" font-size="8.2" font-family="JetBrains Mono, monospace">
            ${tr ? '2) Titreşimin masaya kaçmasını önler.' : '2) Stops vibration leaking into desk.'}
          </text>
          <text x="225" y="90" fill="#f87171" font-size="8.2" font-family="JetBrains Mono, monospace">
            ${tr ? '✗ Ortadan vida/cıvata ASLA takılmaz!' : '✗ NEVER bolt the center of the plate!'}
          </text>
        </svg>`;

    case 3: // Step 4: Piezo Disc Polarity (+ White Ceramic vs - Brass Ring) & Soldering
      return `
        <svg viewBox="0 0 420 128" class="b3d-blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="418" height="126" rx="10" fill="#090b10" stroke="rgba(232,196,118,0.35)"/>
          <text x="12" y="17" fill="#e8c476" font-size="9.5" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? '35 mm PİEZO DİSK KUTUPLARI (+ / −) VE LEHİM NOKTALARI' : '35 mm PIEZO DISC POLARITY (+ / −) & SOLDER PAD DIAGRAM'}
          </text>
          <!-- Outer Brass Disc -->
          <circle cx="72" cy="72" r="42" fill="#d4a13e" stroke="#f5d996" stroke-width="1.5"/>
          <!-- Inner White Ceramic Disc -->
          <circle cx="72" cy="72" r="27" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.2"/>
          <!-- Positive Solder Pad (on white ceramic) -->
          <circle cx="78" cy="66" r="4.5" fill="#ef4444" stroke="#ffffff" stroke-width="1"/>
          <path d="M82 66 C115 66, 125 46, 152 46" stroke="#ef4444" stroke-width="2.4" fill="none"/>
          <!-- Negative Solder Pad (on outer brass ring) -->
          <circle cx="104" cy="84" r="4.5" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2"/>
          <path d="M108 84 C128 84, 134 92, 152 92" stroke="#38bdf8" stroke-width="2.4" fill="none"/>
          <!-- Labels -->
          <text x="158" y="44" fill="#f87171" font-size="9" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? 'KIRMIZI KABLO (+ SİNYAL)' : 'RED WIRE (+ SIGNAL)'}
          </text>
          <text x="158" y="57" fill="#d4d4d8" font-size="8.2" font-family="JetBrains Mono, monospace">
            ${tr ? '→ Ortadaki BEYAZ SERAMİK yüzeye lehimlenir' : '→ Solder to inner WHITE CERAMIC circle'}
          </text>
          <text x="158" y="88" fill="#38bdf8" font-size="9" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? 'SİYAH KABLO (− TOPRAK / GND)' : 'BLACK WIRE (− GROUND / GND)'}
          </text>
          <text x="158" y="101" fill="#d4d4d8" font-size="8.2" font-family="JetBrains Mono, monospace">
            ${tr ? '→ Dıştaki SARI PİRİNÇ halkaya lehimlenir' : '→ Solder to outer BRASS metal rim'}
          </text>
          <text x="158" y="118" fill="#34d399" font-size="8" font-family="JetBrains Mono, monospace">
            ${tr ? '★ 8 piezoda da aynı yönü koru (Faz uyumu için şart!)' : '★ Keep identical polarity on all 8 piezos for phase lock!'}
          </text>
        </svg>`;

    case 4: // Step 5: Flipping Plate & Parallel Epoxy Bonding on Underside
      return `
        <svg viewBox="0 0 420 126" class="b3d-blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="418" height="124" rx="10" fill="#090b10" stroke="rgba(56,189,248,0.35)"/>
          <text x="12" y="17" fill="#38bdf8" font-size="9.5" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? 'EPOKSİ KATMAN KESİTİ: HANGİ YÜZ PLAKAYA YAPIŞIR?' : 'EPOXY BONDING CROSS-SECTION: WHICH FACE TOUCHES THE PLATE?'}
          </text>
          <!-- Layer Stack -->
          <rect x="24" y="34" width="165" height="14" rx="2" fill="#cbd5e1"/>
          <text x="106" y="44" text-anchor="middle" fill="#090b10" font-size="8.2" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? 'ALÜMİNYUM PLAKA (ALT YÜZÜ)' : 'ALUMINUM PLATE (UNDERSIDE)'}
          </text>
          <rect x="44" y="48" width="125" height="8" rx="2" fill="#38bdf8"/>
          <text x="106" y="55" text-anchor="middle" fill="#090b10" font-size="7.2" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? '0.2 mm SERT EPOKSİ (A+B)' : '0.2 mm RIGID EPOXY (A+B)'}
          </text>
          <rect x="38" y="56" width="137" height="11" rx="2" fill="#d4a13e"/>
          <text x="106" y="64" text-anchor="middle" fill="#090b10" font-size="7.5" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? 'PİEZO DÜZ PİRİNÇ YÜZÜ (ÜSTE)' : 'FLAT BRASS BACKING (TOUCHES EPOXY)'}
          </text>
          <rect x="52" y="67" width="109" height="9" rx="2" fill="#f8fafc"/>
          <text x="106" y="74" text-anchor="middle" fill="#090b10" font-size="7" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? 'BEYAZ SERAMİK + LEHİM (AŞAĞIYA)' : 'WHITE CERAMIC + SOLDER (FACES DOWN)'}
          </text>
          <!-- Solder blobs facing down into air -->
          <circle cx="70" cy="79" r="3.5" fill="#ef4444"/>
          <circle cx="152" cy="70" r="3.5" fill="#38bdf8"/>
          <text x="106" y="96" text-anchor="middle" fill="#34d399" font-size="8" font-family="JetBrains Mono, monospace">
            ${tr ? '↑ Lehim tümseği aşağı baktığı için pirinç yüzey plakaya %100 sıfır oturur!' : '↑ Solder faces down so the flat brass back bonds 100% flush to the plate!'}
          </text>
          <!-- Right checklist -->
          <text x="204" y="44" fill="#e8c476" font-size="8.8" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? 'Yapıştırma Kuralları:' : 'Bonding Rules:'}
          </text>
          <text x="204" y="59" fill="#d4d4d8" font-size="8" font-family="JetBrains Mono, monospace">
            ${tr ? '✓ 5 dk çift bileşenli sert epoksi kullan' : '✓ Use 5-min rigid 2-part epoxy'}
          </text>
          <text x="204" y="73" fill="#d4d4d8" font-size="8" font-family="JetBrains Mono, monospace">
            ${tr ? '✓ Hava kabarcığı kalmayacak şekilde bastır' : '✓ Press firmly to squeeze out air bubbles'}
          </text>
          <text x="204" y="87" fill="#f87171" font-size="8" font-family="JetBrains Mono, monospace">
            ${tr ? '✗ Silikon / köpük bant kullanma (sesi yutar)' : '✗ Never use silicone or foam tape'}
          </text>
        </svg>`;

    case 5: // Step 6: Eye-Level Cross-Section (Correct vs Wrong Mounting)
      return `
        <svg viewBox="0 0 420 128" class="b3d-blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="418" height="126" rx="10" fill="#090b10" stroke="rgba(52,211,153,0.35)"/>
          <text x="12" y="17" fill="#34d399" font-size="9.5" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? 'GÖZ HİZASI YAN KESİT: DOĞRU vs YANLIŞ MONTAJ' : 'EYE-LEVEL SIDE CROSS-SECTION: CORRECT vs WRONG MOUNTING'}
          </text>
          <!-- Left: CORRECT -->
          <rect x="12" y="25" width="236" height="94" rx="7" fill="rgba(52,211,153,0.06)" stroke="#34d399" stroke-width="1.2"/>
          <text x="20" y="39" fill="#34d399" font-size="8.8" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? '✓ DOĞRU: ALTTA PARALEL & HAVADA ASILI' : '✓ CORRECT: UNDERSIDE PARALLEL & SUSPENDED'}
          </text>
          <line x1="22" y1="102" x2="236" y2="102" stroke="#64748b" stroke-width="1.5"/>
          <rect x="30" y="64" width="22" height="38" rx="2" fill="rgba(52,211,153,0.28)" stroke="#34d399"/>
          <rect x="206" y="64" width="22" height="38" rx="2" fill="rgba(52,211,153,0.28)" stroke="#34d399"/>
          <rect x="22" y="59" width="214" height="5" fill="#e2e8f0"/>
          <!-- Piezos hanging under plate with 20mm air gap -->
          <rect x="68" y="64" width="34" height="5" fill="#e8c476"/>
          <rect x="156" y="64" width="34" height="5" fill="#e8c476"/>
          <text x="129" y="88" text-anchor="middle" fill="#38bdf8" font-size="8" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? '20 mm HAVA BOŞLUĞU' : '20 mm AIR GAP'}
          </text>
          <text x="129" y="52" text-anchor="middle" fill="#e8c476" font-size="8" font-family="JetBrains Mono, monospace">
            ${tr ? 'Kum Üstte · Dalga ↕ (±z)' : 'Sand on Top · Bending ↕ (±z)'}
          </text>

          <!-- Right: WRONG -->
          <rect x="256" y="25" width="152" height="94" rx="7" fill="rgba(239,68,68,0.07)" stroke="#ef4444" stroke-width="1.2"/>
          <text x="264" y="39" fill="#f87171" font-size="8.5" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? '✗ YANLIŞ MONTAJLAR' : '✗ WRONG MOUNTINGS'}
          </text>
          <text x="264" y="57" fill="#fca5a5" font-size="7.8" font-family="JetBrains Mono, monospace">
            ${tr ? '1) Piezoların üstüne basmak' : '1) Resting plate on piezos'}
          </text>
          <text x="264" y="71" fill="#9ca3af" font-size="7.5" font-family="JetBrains Mono, monospace">
            ${tr ? '   (Titreşimi masaya kilitler)' : '   (Clamps vibration to desk)'}
          </text>
          <text x="264" y="89" fill="#fca5a5" font-size="7.8" font-family="JetBrains Mono, monospace">
            ${tr ? '2) Kenara dik (90°) takmak' : '2) Edge-on vertical (90°)'}
          </text>
          <text x="264" y="103" fill="#9ca3af" font-size="7.5" font-family="JetBrains Mono, monospace">
            ${tr ? '   (1mm kenara yapışmaz)' : '   (Cannot bond to 1mm edge)'}
          </text>
        </svg>`;

    case 6: // Step 7: 8x 100 Ohm 2W Series Protection Resistors Wiring Diagram
      return `
        <svg viewBox="0 0 420 122" class="b3d-blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="418" height="120" rx="10" fill="#090b10" stroke="rgba(245,158,11,0.35)"/>
          <text x="12" y="17" fill="#f59e0b" font-size="9.5" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? 'HER KANAL İÇİN 100 Ω 2W SERİ KORUMA DİRENCİ BAĞLANTISI (×8 ADET)' : '100 Ω 2W SERIES PROTECTION RESISTOR WIRING PER CHANNEL (×8)'}
          </text>
          <!-- Amp Terminal -->
          <rect x="16" y="34" width="82" height="62" rx="6" fill="#132a1c" stroke="#34d399" stroke-width="1.3"/>
          <text x="57" y="52" text-anchor="middle" fill="#34d399" font-size="8.5" font-family="JetBrains Mono, monospace" font-weight="700">TPA3116D2</text>
          <text x="57" y="66" text-anchor="middle" fill="#f87171" font-size="8.5" font-family="JetBrains Mono, monospace">OUT +</text>
          <text x="57" y="84" text-anchor="middle" fill="#38bdf8" font-size="8.5" font-family="JetBrains Mono, monospace">OUT −</text>

          <!-- Positive wire through 100 Ohm resistor -->
          <line x1="98" y1="62" x2="146" y2="62" stroke="#ef4444" stroke-width="2.5"/>
          <!-- Resistor body -->
          <rect x="146" y="52" width="86" height="20" rx="5" fill="#3b82f6" stroke="#93c5fd" stroke-width="1.3"/>
          <!-- Color bands: Brown Black Brown Gold -->
          <rect x="158" y="52" width="6" height="20" fill="#78350f"/>
          <rect x="172" y="52" width="6" height="20" fill="#09090b"/>
          <rect x="186" y="52" width="6" height="20" fill="#78350f"/>
          <rect x="212" y="52" width="5" height="20" fill="#eab308"/>
          <text x="189" y="45" text-anchor="middle" fill="#e8c476" font-size="9" font-family="JetBrains Mono, monospace" font-weight="700">100 Ω · 2 Watt</text>
          <line x1="232" y1="62" x2="296" y2="62" stroke="#ef4444" stroke-width="2.5"/>

          <!-- Negative wire direct -->
          <line x1="98" y1="82" x2="296" y2="82" stroke="#38bdf8" stroke-width="2.5"/>

          <!-- Piezo Disc on Right -->
          <circle cx="338" cy="72" r="28" fill="#d4a13e" stroke="#f5d996" stroke-width="1.4"/>
          <circle cx="338" cy="72" r="17" fill="#f8fafc"/>
          <circle cx="338" cy="64" r="3.5" fill="#ef4444"/>
          <circle cx="322" cy="82" r="3.5" fill="#38bdf8"/>
          <line x1="296" y1="62" x2="338" y2="64" stroke="#ef4444" stroke-width="2.2"/>
          <line x1="296" y1="82" x2="322" y2="82" stroke="#38bdf8" stroke-width="2.2"/>

          <text x="210" y="110" text-anchor="middle" fill="#d4d4d8" font-size="8.2" font-family="JetBrains Mono, monospace">
            ${tr ? 'Direnç yönü fark etmez; sadece KIRMIZI (+) hattın arasına seri lehimlenir veya klemenslenir.' : 'Resistor has no polarity; wire it in series on the RED (+) line between amp and piezo.'}
          </text>
        </svg>`;

    case 7: // Step 8: 4x TPA3116D2 Amplifiers & 8-Channel Terminal Mapping
      return `
        <svg viewBox="0 0 420 132" class="b3d-blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="418" height="130" rx="10" fill="#090b10" stroke="rgba(52,211,153,0.35)"/>
          <text x="12" y="17" fill="#34d399" font-size="9.5" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? '4× TPA3116D2 STEREO AMFİ → 8 PİEZO KANAL EŞLEŞTİRME TABLOSU' : '4× TPA3116D2 STEREO AMP → 8 PIEZO CHANNEL MAPPING TABLE'}
          </text>
          <!-- 4 Amp Boxes -->
          <g font-family="JetBrains Mono, monospace" font-size="8">
            <rect x="12" y="26" width="192" height="42" rx="6" fill="#111d18" stroke="#34d399"/>
            <text x="20" y="40" fill="#34d399" font-weight="700">${tr ? 'AMFİ-1 (KUZEY KENAR)' : 'AMP-1 (NORTH EDGE)'}</text>
            <text x="20" y="53" fill="#e2e8f0">OUT_L → <tspan fill="#e8c476">P1 (Kuzey-Sol, 85mm)</tspan></text>
            <text x="20" y="63" fill="#e2e8f0">OUT_R → <tspan fill="#e8c476">P2 (Kuzey-Sağ, 165mm)</tspan></text>

            <rect x="216" y="26" width="192" height="42" rx="6" fill="#111d18" stroke="#34d399"/>
            <text x="224" y="40" fill="#34d399" font-weight="700">${tr ? 'AMFİ-2 (DOĞU KENAR)' : 'AMP-2 (EAST EDGE)'}</text>
            <text x="224" y="53" fill="#e2e8f0">OUT_L → <tspan fill="#e8c476">P3 (Doğu-Üst, 85mm)</tspan></text>
            <text x="224" y="63" fill="#e2e8f0">OUT_R → <tspan fill="#e8c476">P4 (Doğu-Alt, 165mm)</tspan></text>

            <rect x="12" y="74" width="192" height="42" rx="6" fill="#111d18" stroke="#34d399"/>
            <text x="20" y="88" fill="#34d399" font-weight="700">${tr ? 'AMFİ-3 (GÜNEY KENAR)' : 'AMP-3 (SOUTH EDGE)'}</text>
            <text x="20" y="101" fill="#e2e8f0">OUT_L → <tspan fill="#e8c476">P5 (Güney-Sağ, 165mm)</tspan></text>
            <text x="20" y="111" fill="#e2e8f0">OUT_R → <tspan fill="#e8c476">P6 (Güney-Sol, 85mm)</tspan></text>

            <rect x="216" y="74" width="192" height="42" rx="6" fill="#111d18" stroke="#34d399"/>
            <text x="224" y="88" fill="#34d399" font-weight="700">${tr ? 'AMFİ-4 (BATI KENAR)' : 'AMP-4 (WEST EDGE)'}</text>
            <text x="224" y="101" fill="#e2e8f0">OUT_L → <tspan fill="#e8c476">P7 (Batı-Alt, 165mm)</tspan></text>
            <text x="224" y="111" fill="#e2e8f0">OUT_R → <tspan fill="#e8c476">P8 (Batı-Üst, 85mm)</tspan></text>
          </g>
          <text x="210" y="126" text-anchor="middle" fill="#38bdf8" font-size="7.8" font-family="JetBrains Mono, monospace">
            ${tr ? 'Güç: 24V 5A DC Adaptör → 1-4 DC Ahtapot Kablo ile 4 amfinin VCC(+)/GND(−) girişine' : 'Power: 24V 5A DC Brick → 1-to-4 DC Splitter to all 4 amps VCC(+)/GND(−)'}
          </text>
        </svg>`;

    case 8: // Step 9: 7.1 USB Sound Card Color-Coded Jack Mapping
      return `
        <svg viewBox="0 0 420 128" class="b3d-blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="418" height="126" rx="10" fill="#090b10" stroke="rgba(56,189,248,0.35)"/>
          <text x="12" y="17" fill="#38bdf8" font-size="9.5" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? '7.1 USB SES KARTI 4× JAK RENK KODU VE BİLGİSAYAR AYARI' : '7.1 USB SOUND CARD 4× JACK COLOR MAP & OS AUDIO SETUP'}
          </text>
          <g font-family="JetBrains Mono, monospace" font-size="8.2">
            <circle cx="22" cy="36" r="6" fill="#22c55e"/>
            <text x="34" y="39" fill="#f4f4f5"><tspan fill="#22c55e" font-weight="700">${tr ? '1. YEŞİL JAK (Front L/R)' : '1. GREEN JACK (Front L/R)'}</tspan> ──► Amfi-1 (P1, P2 Kuzey)</text>

            <circle cx="22" cy="56" r="6" fill="#64748b" stroke="#e2e8f0"/>
            <text x="34" y="59" fill="#f4f4f5"><tspan fill="#cbd5e1" font-weight="700">${tr ? '2. SİYAH JAK (Rear L/R) ' : '2. BLACK JACK (Rear L/R) '}</tspan> ──► Amfi-2 (P3, P4 Doğu)</text>

            <circle cx="22" cy="76" r="6" fill="#f59e0b"/>
            <text x="34" y="79" fill="#f4f4f5"><tspan fill="#f59e0b" font-weight="700">${tr ? '3. TURUNCU JAK (Cen/Sub)' : '3. ORANGE JACK (Cen/Sub)'}</tspan> ──► Amfi-3 (P5, P6 Güney)</text>

            <circle cx="22" cy="96" r="6" fill="#38bdf8"/>
            <text x="34" y="99" fill="#f4f4f5"><tspan fill="#38bdf8" font-weight="700">${tr ? '4. GRİ JAK (Side L/R)   ' : '4. GREY JACK (Side L/R)  '}</tspan> ──► Amfi-4 (P7, P8 Batı)</text>
          </g>
          <text x="14" y="118" fill="#e8c476" font-size="8" font-family="JetBrains Mono, monospace">
            ${tr ? '★ Windows Ses Ayarı: 7.1 Surround · Tam Aralık (Full-Range) · Bass Yönetimi/Subwoofer Filtresi KAPALI · 48kHz' : '★ OS Audio Setup: 7.1 Surround · All Full-Range · Disable Bass Management/Crossover · 48kHz'}
          </text>
        </svg>`;

    default: // Step 10: Calibration, Multimeter Check & Live Sand Synthesis
      return `
        <svg viewBox="0 0 420 124" class="b3d-blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="418" height="122" rx="10" fill="#090b10" stroke="rgba(232,196,118,0.4)"/>
          <text x="12" y="17" fill="#e8c476" font-size="9.5" font-family="JetBrains Mono, monospace" font-weight="700">
            ${tr ? 'İLK ÇALIŞTIRMA KONTROL LİSTESİ & SORUN GİDERME' : 'FIRST POWER-ON CHECKLIST & TROUBLESHOOTING GUIDE'}
          </text>
          <g font-family="JetBrains Mono, monospace" font-size="8.1">
            <text x="14" y="36" fill="#34d399" font-weight="700">
              ${tr ? '1) Multimetre Testi:' : '1) Multimeter Test:'}
              <tspan fill="#d4d4d8" font-weight="400">${tr ? 'Amfi çıkışında kısa devre (0 Ω) olmadığını doğrula.' : 'Verify no 0 Ω short across amp terminals.'}</tspan>
            </text>
            <text x="14" y="53" fill="#34d399" font-weight="700">
              ${tr ? '2) Kum Miktarı:' : '2) Sand Amount:'}
              <tspan fill="#d4d4d8" font-weight="400">${tr ? '0.1–0.3 mm kuru silis kumu, sadece 1 tatlı kaşığı (~4 g).' : '0.1–0.3 mm dry quartz sand, 1 teaspoon (~4 g) only.'}</tspan>
            </text>
            <text x="14" y="70" fill="#e8c476" font-weight="700">
              ${tr ? '3) Kum Hiç Zıplamıyorsa:' : '3) If Sand Does Not Bounce:'}
              <tspan fill="#d4d4d8" font-weight="400">${tr ? 'Amfi kazancını %25’ten %50’ye aç, epoksi sertliğini kontrol et.' : 'Raise amp gain from 25% to 50%, check epoxy cure.'}</tspan>
            </text>
            <text x="14" y="87" fill="#e8c476" font-weight="700">
              ${tr ? '4) Rakam Bulanık Çıkıyorsa:' : '4) If Digit Looks Blurry:'}
              <tspan fill="#d4d4d8" font-weight="400">${tr ? 'Piezolardan birinin (+)/(−) kablosu ters lehimlenmiştir.' : 'Check that all 8 piezos share identical (+)/(−) polarity.'}</tspan>
            </text>
            <text x="14" y="104" fill="#38bdf8" font-weight="700">
              ${tr ? '5) Güney Kenar Çalışmıyorsa:' : '5) If South Edge Is Weak:'}
              <tspan fill="#d4d4d8" font-weight="400">${tr ? 'Windows 7.1 ayarında Subwoofer Bass filtreyi kapat.' : 'Disable Subwoofer Bass Crossover in OS 7.1 settings.'}</tspan>
            </text>
          </g>
        </svg>`;
  }
}

// ---------------------------------------------------------------------------
// 10-Stage Bilingual Master Assembly Curriculum (Zero Ambiguity)
// ---------------------------------------------------------------------------
export const BUILD_STAGES = {
  tr: [
    {
      num: '01 / 10',
      shortTitle: 'Tam Sistem & Sinyal Akışı',
      tag: 'MİMARİ GENEL BAKIŞ',
      title: 'PULSE+ Gerçek Hayat Donanım Mimarisi: Bilgisayardan Kuma Sinyal Nasıl Akar?',
      subtitle: 'Hiçbir mikrodenetleyici (Arduino) veya özel kesim parça kullanmadan, 7 standart bileşenle kurulan 8 kanallı akustik sentez tezgâhı.',
      what: 'Sol taraftaki 3B sahnede bitmiş sistemin simetrik masaüstü yerleşimini görüyorsun: Ortada 4 adet yeşil sünger takoz üzerinde duran 25×25 cm düz alüminyum plaka, plakanın ALT YÜZÜNE paralel yapıştırılmış 8 adet 35 mm piezo disk, plakanın iki yanında 4 adet TPA3116D2 stereo amfi (toplam 8 kanal), önde 7.1 harici USB ses kartı ve arkada 24V güç adaptörü ile bilgisayar.',
      how: '1) Bilgisayarındaki PULSE+ uygulaması 8 farklı frekansı ve her piezonun faz açısını hesaplar.\n2) USB üzerinden bağlanan 7.1 Ses Kartı, üzerindeki 4 adet 3.5 mm stereo jaktan 8 bağımsız analog ses kanalı çıkarır.\n3) 4 adet stereo Class-D amfi bu sinyalleri 24V güçle yükseltip 8 adet 100 Ω koruma direnci üzerinden plaka altındaki 8 piezoya iletir.\n4) Karşılıklı kenarlardan çıkan bükülme dalgaları hedef rakamın çizgisi üzerinde birbirini sıfırlar (I ≈ 0) ve kum sadece orada birikir.',
      why: 'Neden Arduino kullanmıyoruz? Çünkü 8 ayrı piezodan aynı anda 8 farklı frekansı (200 Hz – 4500 Hz) mikrosaniye faz hassasiyetiyle sürmek için 48 kHz çok kanallı ses DAC’ı gerekir. Standart bir 7.1 USB ses kartı zaten bilgisayarla tam senkron çalışan 8 kanallı profesyonel bir faz üretecidir!',
      check: '✓ Hazırlık: 70×50 cm düz bir masa, havya + lehim teli, cetvel, asetat kalemi, 400 kum zımpara ve 5 dk çift bileşenli epoksi hazırla.',
      parts: ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06', 'P-07'],
    },
    {
      num: '02 / 10',
      shortTitle: 'Plaka & Milimetrik Cetvel',
      tag: 'PARÇA P-01 · 250 × 250 × 1.0 mm',
      title: 'Metal Plaka Seçimi ve Alt Yüzeye Milimetrik Koordinatların İşaretlenmesi',
      subtitle: '250×250 mm kare, 1.0 mm kalınlıkta 6061-T6 Alüminyum levhayı çevirip cetvelle 4 takoz ve 8 piezo merkezini işaretle.',
      what: 'Plaka tamamen düz, deliksiz ve oluksuzdur. Kalınlık çok kritiktir: 1.0 mm (veya en fazla 1.2 mm) 6061-T6 alüminyum levha kullanmalısın. 3 mm gibi kalın bir levha kullanırsan eğilme rijitliği (D ∝ h³) 27 kat artar ve küçük piezolar plakayı titretemez.',
      how: '1) Plakanın ALT YÜZÜNÜ yukarı gelecek şekilde masaya koy.\n2) Cetvel ve asetat kalemiyle 4 köşeden hem X hem Y yönünde 35 mm (3.5 cm) içeri girerek 4 adet Sünger Takoz Merkezini (T1..T4) kare olarak çiz.\n3) Her 250 mm’lik kenar boyunca sol köşeden 85 mm (8.5 cm) ve 165 mm (16.5 cm) mesafeyi ölç; kenardan 18 mm (1.8 cm) içeri girerek 8 adet Piezo Merkezini (P1..P8) işaretle.\n4) İşaretlediğin 8 piezo dairesini (Ø35 mm) 400 kum zımpara ile hafifçe zımparala ve izopropil alkolle (veya kolonyayla) sil.',
      why: '85 mm ve 165 mm koordinatları, 250 mm’lik kenarı üç eşit akustik bölgeye (L/3 ve 2L/3) böler. Bu yerleşim hem simetrik hem de asimetrik plaka özmodlarını (0’dan 9’a tüm rakamları) kör nokta bırakmadan uyarabilmeyi sağlar.',
      check: '✓ Kontrol: Plakada bükülme/bombe olmamalı; 8 piezo dairesi zımparalanmış ve parmak izi/yağdan tamamen arındırılmış olmalı.',
      parts: ['P-01'],
    },
    {
      num: '03 / 10',
      shortTitle: '4× 2.5 cm Sünger Takoz',
      tag: 'PARÇA P-03 · AKUSTİK İZOLASYON',
      title: '4 Adet 2.5 cm Yüksekliğinde Yumuşak Sünger/Silikon Takozun Yerleştirilmesi',
      subtitle: 'Plaka ortadan vidalanmaz! Köşelerden 3.5 cm içerideki 4 yumuşak takoz üzerinde serbestçe yüzer.',
      what: '30×30 mm tabanlı ve tam 25 mm (2.5 cm) yüksekliğinde 4 adet orta-yumuşak gözenekli EVA sünger, akustik sünger veya yumuşak silikon takoz.',
      how: '1) Masanın üzerine 18×18 cm kare oluşturacak şekilde (plaka köşelerinden 35 mm içerideki T1..T4 işaretlerine denk gelecek biçimde) 4 takozu yerleştir.\n2) Takozların kaymaması için sadece masaya değen alt tabanlarına ince çift taraflı bant yapıştırabilirsin.\n3) Plakayı takozların üzerine koyduğunda plakanın dört köşesi de eşit yükseklikte (su terazisinde düz) durmalıdır.',
      why: '2.5 cm yükseklik iki hayati işi aynı anda yapar: Birincisi, plaka enerjisinin masaya kaçıp sönümlenmesini engeller (serbest sınır koşulu). İkincisi, bir sonraki adımda plakanın altına yapıştıracağımız piezoların masaya değmemesi için altta 20 mm’lik güvenli bir hava boşluğu bırakır!',
      check: '✓ Kontrol: Plaka 4 takoz üzerindeyken parmağınla hafifçe dokunduğunda serbestçe yaylanmalı, altında en az 20 mm boşluk olmalı.',
      parts: ['P-01', 'P-03'],
    },
    {
      num: '04 / 10',
      shortTitle: 'Piezo (+/−) Lehimleme',
      tag: 'PARÇA P-02 · 35 mm PZT SERAMİK DİSK',
      title: 'Piezo Diskin Kutupları: İç Beyaz Seramik (+) ve Dış Sarı Pirinç (−) Lehimleme',
      subtitle: 'Piezoları plakaya yapıştırmadan ÖNCE masada 22 AWG kırmızı (+) ve siyah (−) burgu kablolarını lehimle.',
      what: 'Sol taraftaki 3B sahnede büyütülmüş kesitini gördüğün 35 mm piezo disk iki katmandan oluşur: Altta Ø35 mm sarı pirinç metal disk (Negatif / GND kutbu) ve ortasında Ø25 mm beyaz piezoelektrik PZT seramik katman (Pozitif / Sinyal kutbu).',
      how: '1) 8 adet piezonun her biri için 40 cm kırmızı ve 40 cm siyah ince çok telli kablo (22–24 AWG) kes.\n2) Havyayı 320°C’ye ısıt. Piezo üzerindeki beyaz seramik dairenin kenarına çok az lehim pastası sür ve KIRMIZI (+) kabloyu en fazla 2 saniye dokundurarak lehimle.\n3) Dıştaki sarı pirinç halkayı bıçak ucuyla hafifçe kazıyıp SİYAH (−) kabloyu pirinç halkaya lehimle.\n4) Her piezonun kırmızı ve siyah kablosunu kendi etrafında burgu (twisted pair) haline getir.',
      why: '8 piezonun tamamında Kırmızı (+) kablonun beyaz seramiğe, Siyah (−) kablonun sarı pirince lehimlenmesi ŞARTTIR! Eğer tek bir piezoda bile + ve − kabloyu ters lehimlersen o piezo 180° ters fazda çalışır (plakayı yukarı iterken aşağı çeker) ve rakam şekli bozulur.',
      check: '✓ Kontrol: 8 piezonun tamamında Kırmızı = İç Beyaz Seramik (+), Siyah = Dış Sarı Pirinç (−) olduğundan tek tek emin ol.',
      parts: ['P-02'],
    },
    {
      num: '05 / 10',
      shortTitle: 'Alttan Paralel Epoksi Montaj',
      tag: 'KRİTİK ADIM · YÜZ YÜZE PARALEL YAPIŞTIRMA',
      title: 'Plakayı 180° Ters Çevirip 8 Piezoyu ALT YÜZEYE Paralel Epoksiyle Yapıştırma',
      subtitle: 'Piezoların kablosuz düz pirinç yüzü plakanın altına yapışır; beyaz seramikli ve lehimli yüzü aşağıya (boşluğa) bakar!',
      what: '3B animasyonda gördüğün gibi plaka ters çevrilir, zımparalanmış 8 hedef daireye (P1..P8) şırıngayla çift bileşenli sert epoksi sürülür ve 8 piezo disk plakaya tam paralel (yüz yüze) olarak yapıştırılır.',
      how: '1) 5 dakikalık çift bileşenli (A+B) şeffaf epoksiden mercimek büyüklüğünde eşit miktarda sıkıp kürdanla 30 saniye karıştır.\n2) İşaretli P1..P8 dairelerinin üzerine ince ve homojen bir epoksi tabakası sür.\n3) Piezo diskin KABLOSUZ DÜZ PİRİNÇ YÜZÜ plakaya değecek, BEYAZ SERAMİKLİ VE LEHİMLİ YÜZÜ ise sana (yukarıya/dışarıya) bakacak şekilde yerleştir.\n4) Parmağınla 60 saniye sıkıca bastırarak içindeki hava kabarcıklarını dışarı at. Tam kürleşme için 20 dakika bekle.',
      why: 'Neden lehimli yüz dışarıya bakar? Eğer lehimli yüzü plakaya yapıştırmaya çalışırsan lehim damlası tümsek yapar ve piezo plakaya tam değmez. Düz pirinç arka yüzü plakaya yapıştırdığında ise %100 sıfır metal-epoksi-metal teması sağlanır ve eğilme momenti kayıpsız aktarılır!',
      whyNote: 'Asla silikon veya köpük bant kullanma!',
      check: '✓ Kontrol: 8 piezonun tamamı plakanın ALT yüzüne sıfır boşlukla paralel yapışmış, kabloları kenarlardan dışarı uzanıyor olmalı.',
      parts: ['P-01', 'P-02'],
    },
    {
      num: '06 / 10',
      shortTitle: 'Göz Hizası Kesit & 20mm Boşluk',
      tag: 'FİZİKSEL DOĞRULAMA · ±Z BÜKÜLME',
      title: 'Göz Hizası Yan Kesit: Piezolar Masaya Değmez, 20 mm Havada Asılı Kalır!',
      subtitle: 'Plakayı düz çevirip 4 yeşil takozun üzerine oturt ve yandan göz hizasında eğilerek 20 mm hava boşluğunu doğrula.',
      what: 'Sol taraftaki 3B sahnede kamera tam göz hizasına indi: Plakanın ağırlığını yalnızca köşelerdeki 4 adet 25 mm yeşil sünger takoz taşır. Plakanın altına yapışık olan 0.5 mm’lik ince piezolar ise masanın 20 mm yukarısında, tamamen boşlukta asılı durur.',
      how: '1) Epoksi tamamen sertleştikten sonra plakayı düz çevir (düz pürüzsüz metal yüzey üste, 8 piezo alta gelsin).\n2) Plakayı 4 adet 25 mm sünger takozun üzerine oturt.\n3) Masanın yanından göz hizasında eğilip plakanın altına bak: Hiçbir piezo veya kablo masaya değmemeli!\n4) Piezo kablolarını plakanın hareketini kasmayacak şekilde gevşek bir kavisle masa yüzeyine indir.',
      why: 'Piezo disk plakaya paralel yapışıkken elektrik sinyaliyle radyal olarak genleşip büzülür; plakanın alt yüzeyini çekip ittiği için plakayı AŞAĞI–YUKARI (±z yönünde) büker. Eğer piezolar masaya değseydi veya plaka piezoların üstüne otursaydı bu bükülme kilitlenirdi.',
      check: '✓ Kontrol: Plakanın altından bir kalem veya cetvel geçirdiğinde hiçbir piezoya takılmadan 20 mm boşluktan rahatça geçmeli.',
      parts: ['P-01', 'P-02', 'P-03'],
    },
    {
      num: '07 / 10',
      shortTitle: '8× 100 Ω 2W Koruma Direnci',
      tag: 'PARÇA P-04 · EMPEDANS DENGELEME',
      title: '8 Adet 100 Ω 2W Seri Koruma Direncinin Piezo (+) Hatlarına Bağlanması',
      subtitle: 'Kapasitif piezo yükünün yüksek frekanslarda Class-D amfileri aşırı akım korumasına sokmasını önleyen seri direnç bloğu.',
      what: '8 adet 100 Ω 2 Watt metal film veya karbon direnç (Renk kodu: Kahverengi – Siyah – Kahverengi – Altın). 3B sahnede plakanın arkasındaki 8 kanallı klemens/direnç modülü üzerinde R1..R8 olarak dizilmiştir.',
      how: '1) Her bir piezonun KIRMIZI (+ / iç beyaz seramik) kablosunun ucuna 1 adet 100 Ω 2W direncin bir bacağını lehimle (veya vidalı klemensle sık).\n2) Direncin diğer bacağını ilgili amfi kanalının (+) çıkış klemensine gidecek kabloya bağla.\n3) Piezonun SİYAH (− / dış pirinç) kablosuna direnç takma; doğrudan amfinin (−) çıkış klemensine bağla.',
      why: 'Sıradan hoparlör 4–8 Ω dirençli bir bobindir; piezo disk ise 15–30 nF’lık bir kapasitördür (Z = 1 / 2πfC). 4 kHz gibi yüksek frekanslarda piezonun empedansı düşer ve dirençsiz bağlanırsa TPA3116D2 amfi çipi ısınıp kendini kapatır. Seri 100 Ω direnç amfiyi %100 güvende tutar.',
      check: '✓ Kontrol: 8 kanalın tamamında amfi (+) çıkışı ile piezo kırmızı (+) kablosu arasında seri 100 Ω 2W direnç bağlı olmalı.',
      parts: ['P-02', 'P-04'],
    },
    {
      num: '08 / 10',
      shortTitle: '4× TPA3116D2 Amfi & 24V Güç',
      tag: 'PARÇA P-05 & P-06 · 8 KANAL GÜÇ KATI',
      title: '4 Adet TPA3116D2 Stereo Class-D Amfi ve 24V 5A DC Güç Bağlantısı',
      subtitle: 'Her stereo amfi plakanın bir kenarındaki 2 piezoyu (Sol ve Sağ kanal olarak) bağımsız sürer: 4 Amfi × 2 = 8 Kanal.',
      what: 'Plakanın solunda (Amfi-1 Kuzey, Amfi-4 Batı) ve sağında (Amfi-2 Doğu, Amfi-3 Güney) simetrik dizilmiş 4 adet TPA3116D2 (2×50W) stereo amfi kartı ve arkada 24V 5A DC güç adaptörü + 1’den 4’e DC dağıtıcı kablo.',
      how: '1) Sağdaki şemadaki tabloya göre klemensleri vidala:\n   • Amfi-1: OUT_L → P1 (Kuzey-Sol), OUT_R → P2 (Kuzey-Sağ)\n   • Amfi-2: OUT_L → P3 (Doğu-Üst), OUT_R → P4 (Doğu-Alt)\n   • Amfi-3: OUT_L → P5 (Güney-Sağ), OUT_R → P6 (Güney-Sol)\n   • Amfi-4: OUT_L → P7 (Batı-Alt), OUT_R → P8 (Batı-Üst)\n2) 24V 5A DC adaptörü henüz fişe takmadan, 1-4 DC ahtapot dağıtıcı kabloyla 4 amfinin DC güç girişine tak.\n3) 4 amfinin üzerindeki Bass ve Treble düğmelerini tam ortaya (Saat 12 yönüne), Ses (Volume) düğmesini ise %35 seviyesine getir.',
      why: 'Piezo disklerin 1.0 mm alüminyum plakada kumu havaya fırlatacak ivmeyi (Γ > 1g) üretebilmesi için 15–22V tepe-tepe (Vpp) voltaj salınımı gerekir. Bilgisayar kulaklık çıkışı sadece ~1V verir; 24V beslemeli TPA3116D2 amfiler bu voltajı tertemiz sağlar.',
      check: '✓ Kontrol: Hiçbir (+) ve (−) kablo teli klemens dışında birbirine değmemeli; 4 amfinin ses düğmesi aynı hizada (%35) olmalı.',
      parts: ['P-04', 'P-05', 'P-06'],
    },
    {
      num: '09 / 10',
      shortTitle: '7.1 USB Ses Kartı & PC Ayarı',
      tag: 'PARÇA P-07 · 8 KANAL FAZ-SENKRON DAC',
      title: '7.1 Harici USB Ses Kartı, 4× AUX Kablo Eşleştirmesi ve Bilgisayar Ses Ayarı',
      subtitle: 'Renk kodlu 4 stereo jakı 4 amfiye bağla ve Windows/macOS ses ayarında 7.1 Tam Aralık (Full-Range) modunu aç.',
      what: 'Önde duran 7.1 Harici USB Ses Kartı (üzerinde Yeşil, Siyah, Turuncu ve Gri olmak üzere 4 adet 3.5 mm stereo çıkış jakı bulunur), 4 adet 3.5 mm AUX kablosu ve arkada PULSE+ çalıştıran bilgisayar.',
      how: '1) 4 adet 3.5 mm stereo AUX (veya 3.5 mm TRS → 2×RCA) kablosunu renk sırasıyla tak:\n   • 🟢 Yeşil Jak (Front L/R) → Amfi-1 Girişi (Kuzey P1, P2)\n   • ⚫ Siyah Jak (Rear L/R) → Amfi-2 Girişi (Doğu P3, P4)\n   • 🟠 Turuncu Jak (Center/Sub) → Amfi-3 Girişi (Güney P5, P6)\n   • ⚪ Gri Jak (Side L/R) → Amfi-4 Girişi (Batı P7, P8)\n2) USB ses kartını bilgisayara tak.\n3) Windows Ses Denetim Masası → USB Ses Kartı → Yapılandır → "7.1 Surround" seç → Tüm hoparlörleri "Tam Aralık (Full-Range)" işaretle → "Bass Management / Subwoofer Crossover" kutusunu KAPAT → 48000 Hz 16-bit seç.',
      why: 'Çok önemli detay: Turuncu jakın bir kanalı "Subwoofer" olarak adlandırılır. Eğer işletim sisteminde Bass Management / Crossover filtresini kapatmazsan bilgisayar o kanalda 120 Hz üstündeki tüm frekansları keser ve Güney kenardaki P6 piezosu sessiz kalır! Tam Aralık seçtiğinde 8 kanalın tamamı 20 Hz – 20 kHz tam bant çalışır.',
      check: '✓ Kontrol: İşletim sistemi ses testinde 8 hoparlör ikonuna tek tek tıkladığında plakanın 4 kenarındaki 8 piezodan sırayla ses gelmeli.',
      parts: ['P-05', 'P-07'],
    },
    {
      num: '10 / 10',
      shortTitle: 'İlk Çalıştırma & Kum Sentezi',
      tag: 'CANLI KALİBRASYON · 0–9 RAKAM SENTEZİ',
      title: 'Multimetre Güvenlik Kontrolü, Kum Serpme ve İlk Canlı “3” Rakamı Sentezi!',
      subtitle: 'Plakaya 1 tatlı kaşığı kuru silis kumu serp, PULSE+ ekranından “3” rakamını seç ve kumun düğüm çizgisine akışını izle.',
      what: '3B sahnede gördüğün gibi tüm sistem aktif: 4 amfi çalışıyor, 8 piezo faz-senkronlu bükülme dalgaları gönderiyor ve plaka üzerindeki 12.000 kum taneciği zıplayarak “3” rakamının sıfır titreşimli düğüm vadisinde toplanıyor.',
      how: '1) Gücü açmadan önce multimetreyi direnç (Ω) kademesine al ve 8 amfi çıkış klemensinde kısa devre (0 Ω) olmadığını doğrula (piezo DC’de açık devredir).\n2) 24V adaptörü fişe tak.\n3) Plakanın üst yüzüne 1 tatlı kaşığı (~4 gram) 0.1–0.3 mm kuru beyaz silis/kuvars kumu ince bir tabaka halinde serp.\n4) PULSE+ ekranında üstten "Stüdyo" moduna geç, donanım olarak "8 Piezo (Ev Prototipi)" ve malzeme olarak "Alüminyum" seç.\n5) "Ses Açık" butonuna bas, "3" rakamına tıkla ve amfi ses düğmelerini yavaşça %45–%55 seviyesine kaldır!',
      why: 'Amfi kazancı %45–%55 seviyesine ulaştığında rakamın dışındaki plaka bölgelerinde ivme yerçekimini aşar (Γ = a/g > 1). Kum tanecikleri şiddetle titreşen bölgelerden havaya fırlayıp 2–4 saniye içinde yalnız ve ancak 8 piezonun yıkıcı girişimle susturduğu (I ≈ 0) “3” vadisinde durur!',
      check: '✓ Tebrikler! Artık 0’dan 9’a tüm rakamları, harfleri ve Fizik Lab içindeki manuel frekans kaydırıcılarını gerçek metal plakan üzerinde canlı deneyebilirsin.',
      parts: ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06', 'P-07'],
    },
  ],
  en: [
    {
      num: '01 / 10',
      shortTitle: 'System & Signal Flow',
      tag: 'ARCHITECTURE OVERVIEW',
      title: 'PULSE+ Real-World Hardware Architecture: Signal Flow from PC to Sand',
      subtitle: 'An 8-channel phase-coherent acoustic synthesis bench built from 7 standard off-the-shelf components — zero Arduino or CNC machining required.',
      what: 'In the 3D stage on the left, you see the complete symmetrical workbench: a flat 25×25 cm aluminum plate resting on 4 green foam corner pads, 8 underside parallel 35 mm piezo discs, 4 stereo TPA3116D2 amplifiers (8 channels total) flanking the plate, a 7.1 USB sound card in front, and a 24V power brick + laptop in the back.',
      how: '1) PULSE+ on your laptop computes 8 simultaneous frequencies and exact phase angles for all 8 actuators.\n2) The 7.1 USB Sound Card outputs 8 phase-locked analog audio channels across its 4× 3.5 mm stereo jacks.\n3) Four stereo Class-D amplifiers boost those signals with 24V DC power and feed the 8 underside piezos through 8× 100 Ω series protection resistors.\n4) Bending waves from opposite edges destructively interfere along the target digit curve (I ≈ 0), trapping sand cleanly inside the digit.',
      why: 'Why no Arduino? Driving 8 piezos with 8 simultaneous sine waves (200 Hz – 4500 Hz) and microsecond phase coherence requires a multi-channel 48 kHz audio DAC. A standard 7.1 USB sound card is already a plug-and-play 8-channel phase-synchronized signal generator!',
      check: '✓ Prep: Clear a 70×50 cm flat desk, soldering iron + solder, millimeter ruler, marker, 400-grit sandpaper, and 5-minute 2-part epoxy.',
      parts: ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06', 'P-07'],
    },
    {
      num: '02 / 10',
      shortTitle: 'Plate & Millimeter Grid',
      tag: 'PART P-01 · 250 × 250 × 1.0 mm',
      title: 'Metal Plate Selection & Marking Exact Millimeter Coordinates on the Underside',
      subtitle: 'Flip a 250×250 mm × 1.0 mm 6061-T6 Aluminum sheet upside down and mark the 4 pad centers and 8 piezo centers with a ruler.',
      what: 'The plate is 100% flat, uncut, and groove-free. Thickness is critical: use 1.0 mm (or at most 1.2 mm) 6061-T6 aluminum. A 3 mm plate increases flexural rigidity (D ∝ h³) by 27×, making it too stiff for piezo discs to flex.',
      how: '1) Place the plate UNDERSIDE UP on your desk.\n2) With a ruler and marker, measure 35 mm inward in both X and Y from all 4 corners to mark the 4 Foam Pad Centers (T1..T4).\n3) Along each 250 mm edge, measure 85 mm and 165 mm from the corner, and 18 mm inward from the outer edge to mark the 8 Piezo Centers (P1..P8).\n4) Lightly scuff the 8 marked Ø35 mm circles with 400-grit sandpaper and wipe clean with isopropyl alcohol.',
      why: 'The 85 mm and 165 mm positions divide each 250 mm edge into thirds (L/3 and 2L/3), giving the array maximum controllability over both symmetric and asymmetric 2D plate eigenmodes for digits 0–9.',
      check: '✓ Verify: Plate is completely flat without warps; all 8 piezo zones are scuffed and degreased with alcohol.',
      parts: ['P-01'],
    },
    {
      num: '03 / 10',
      shortTitle: '4× 2.5 cm Isolation Pads',
      tag: 'PART P-03 · ACOUSTIC ISOLATION',
      title: 'Placing the 4 Soft 2.5 cm (25 mm) Foam / Silicone Corner Isolation Pads',
      subtitle: 'Never bolt the center of the plate! It floats freely on 4 soft pads inset 3.5 cm from the corners.',
      what: 'Four 30×30 mm base × 25 mm (2.5 cm) tall medium-soft open-cell EVA foam, acoustic foam, or soft silicone blocks.',
      how: '1) Place the 4 pads on your desk in an 18×18 cm square matching the T1..T4 marks (35 mm inset from plate corners).\n2) Optional: use thin double-sided tape under the bottom of the pads so they stay put on the desk.\n3) Rest the plate on top and verify all 4 corners sit level.',
      why: 'The 25 mm height serves two vital purposes: first, it decouples the plate from the desk (true free-edge Kirchhoff–Love boundary condition); second, it creates a 20 mm air gap beneath the plate so the underside piezos never touch the table!',
      check: '✓ Verify: Pressing the plate gently produces a free bounce, with at least 20 mm of open air underneath.',
      parts: ['P-01', 'P-03'],
    },
    {
      num: '04 / 10',
      shortTitle: 'Piezo (+/−) Soldering',
      tag: 'PART P-02 · 35 mm PZT CERAMIC DISC',
      title: 'Piezo Disc Polarity: Inner White Ceramic (+) vs Outer Brass Ring (−) Soldering',
      subtitle: 'Solder 40 cm twisted-pair red (+) and black (−) 22 AWG wires to all 8 piezos BEFORE gluing them to the plate.',
      what: 'As shown in the giant 3D cutaway model on the left, a 35 mm piezo disc has two layers: the Ø35 mm yellow brass backing plate (Negative / GND pole) and the inner Ø25 mm white PZT piezoelectric ceramic circle (Positive / Signal pole).',
      how: '1) Cut eight 40 cm red wires and eight 40 cm black stranded wires (22–24 AWG).\n2) Set your soldering iron to 320°C. Apply a tiny dot of flux to the inner white ceramic silver electrode and solder the RED (+) wire in under 2 seconds.\n3) Lightly scratch the outer yellow brass rim and solder the BLACK (−) wire to the brass ring.\n4) Twist each piezo’s red and black wires together into a neat twisted pair.',
      why: 'Every single piezo MUST have Red (+) on the inner white ceramic and Black (−) on the outer brass ring! Reversing polarity on even one piezo flips its phase by 180° (pulling down while others push up), blurring the nodal lines.',
      check: '✓ Verify: All 8 piezos have Red = Inner White Ceramic (+) and Black = Outer Brass Ring (−).',
      parts: ['P-02'],
    },
    {
      num: '05 / 10',
      shortTitle: 'Underside Parallel Epoxy Bond',
      tag: 'CRITICAL STEP · FACE-TO-FACE BONDING',
      title: 'Flip Plate 180° & Bond All 8 Piezos Parallel to the UNDERSIDE with Rigid Epoxy',
      subtitle: 'The flat unwired brass back glues to the plate; the white ceramic + solder joints face outward into the air!',
      what: 'In the 3D scene, the plate flips upside down, the 3D syringe dispenses rigid 2-part epoxy onto P1..P8, and all 8 piezo discs descend flat (parallel) onto the underside.',
      how: '1) Mix equal pea-sized drops of 5-minute 2-part (A+B) rigid epoxy for 30 seconds.\n2) Spread a thin, even film over the scuffed P1..P8 circles on the plate underside.\n3) Press each piezo down with its FLAT UNWIRED BRASS BACK against the epoxy, and its WHITE CERAMIC + SOLDER SIDE facing outward.\n4) Hold firmly for 60 seconds to squeeze out air bubbles, then let cure for 20 minutes.',
      why: 'Why face the solder joints outward? If you tried gluing the soldered side to the plate, the solder bump would prevent flat contact. Gluing the smooth brass back guarantees a 100% flush metal-epoxy-metal bond that transfers radial strain directly into plate bending!',
      check: '✓ Verify: All 8 piezos are bonded flat against the underside with zero air gaps and leads routed outward.',
      parts: ['P-01', 'P-02'],
    },
    {
      num: '06 / 10',
      shortTitle: 'Eye-Level Cross-Section',
      tag: 'PHYSICAL VERIFICATION · ±Z BENDING',
      title: 'Eye-Level Side Cross-Section: Piezos Hang in a 20 mm Air Gap & Flex the Plate ±z',
      subtitle: 'Flip the plate right-side up onto the 4 green foam pads and inspect from eye level to confirm the 20 mm air clearance.',
      what: 'The 3D camera drops to exact eye level: the 4 green 25 mm corner pads carry the plate’s weight, while the 8 underside piezos hang suspended 20 mm above the desk.',
      how: '1) Once the epoxy has cured, turn the plate right-side up (smooth bare metal on top, 8 piezos underneath).\n2) Set the plate onto the 4 green 25 mm foam pads.\n3) Crouch to eye level and look under the plate: no piezo or solder joint may touch the desk!\n4) Route the 8 twisted-pair wires with gentle slack out to the terminal strip.',
      why: 'When AC audio voltage hits an underside parallel piezo, it expands and contracts radially along the bottom skin of the plate, creating a bending moment that flexes the plate UP AND DOWN (±z) to launch sand grains toward the silent nodal valleys.',
      check: '✓ Verify: You can slide a pencil cleanly underneath all 8 piezos without touching them.',
      parts: ['P-01', 'P-02', 'P-03'],
    },
    {
      num: '07 / 10',
      shortTitle: '8× 100 Ω 2W Resistors',
      tag: 'PART P-04 · IMPEDANCE PROTECTION',
      title: 'Wiring the 8× 100 Ω 2W Series Protection Resistors on Every Piezo (+) Line',
      subtitle: 'Prevents capacitive piezo loads from triggering high-frequency over-current shutdown on Class-D amplifiers.',
      what: 'Eight 100 Ω 2 Watt metal-film resistors (Color bands: Brown – Black – Brown – Gold) mounted on the 8-channel terminal strip (R1..R8) behind the plate.',
      how: '1) Connect one leg of a 100 Ω 2W resistor in series with each piezo’s RED (+ / inner white ceramic) wire.\n2) Connect the other leg of the resistor to the amplifier’s (+) speaker output terminal.\n3) Connect each piezo’s BLACK (− / outer brass) wire directly to the amplifier’s (−) speaker output terminal.',
      why: 'Unlike an 8 Ω voice-coil speaker, a piezo disc is a 15–30 nF capacitor (Z = 1 / 2πfC). Above 3 kHz its impedance drops sharply; a series 100 Ω 2W resistor guarantees the TPA3116D2 amplifier always sees a safe ≥100 Ω load.',
      check: '✓ Verify: Every channel has a 100 Ω 2W resistor in series on the red (+) wire between amp and piezo.',
      parts: ['P-02', 'P-04'],
    },
    {
      num: '08 / 10',
      shortTitle: '4× TPA3116D2 Amps & 24V',
      tag: 'PARTS P-05 & P-06 · 8-CH POWER STAGE',
      title: 'Connecting the 4× TPA3116D2 Stereo Class-D Amplifiers & 24V 5A DC Power',
      subtitle: 'Each stereo amplifier drives 2 piezos (Left & Right channels) on one edge of the plate: 4 Amps × 2 = 8 Channels.',
      what: 'Four TPA3116D2 (2×50W) stereo amplifier boards arranged symmetrically on the left (Amp-1 North, Amp-4 West) and right (Amp-2 East, Amp-3 South) of the plate, powered by a 24V 5A DC brick via a 1-to-4 DC splitter.',
      how: '1) Wire the screw terminals according to the schematic table:\n   • Amp-1 (North): OUT_L → P1 (North-Left), OUT_R → P2 (North-Right)\n   • Amp-2 (East): OUT_L → P3 (East-Top), OUT_R → P4 (East-Bottom)\n   • Amp-3 (South): OUT_L → P5 (South-Right), OUT_R → P6 (South-Left)\n   • Amp-4 (West): OUT_L → P7 (West-Bottom), OUT_R → P8 (West-Top)\n2) Connect the 1-to-4 DC barrel splitter from the unplugged 24V 5A power brick to all 4 amplifiers.\n3) Set Bass and Treble knobs to center (12 o’clock) and Volume knobs to 35% on all 4 boards.',
      why: 'Achieving >1g surface acceleration on a 1.0 mm aluminum plate requires 15–22 Vpp drive across the piezos. A laptop headphone jack only outputs ~1 V; the 24V-powered TPA3116D2 boards deliver clean high-voltage swing across all 8 channels.',
      check: '✓ Verify: No stray wire strands touch across screw terminals; all 4 volume knobs are matched at 35%.',
      parts: ['P-04', 'P-05', 'P-06'],
    },
    {
      num: '09 / 10',
      shortTitle: '7.1 USB DAC & OS Audio',
      tag: 'PART P-07 · 8-CH PHASE-LOCKED DAC',
      title: '7.1 External USB Sound Card, 4× AUX Cable Mapping & OS Full-Range Audio Setup',
      subtitle: 'Map the 4 color-coded stereo jacks to the 4 amplifiers and enable 7.1 Full-Range mode with Bass Management OFF.',
      what: 'The 7.1 External USB Sound Card in front of the plate (with Green, Black, Orange, and Grey 3.5 mm stereo output jacks), 4 stereo AUX cables, and your laptop.',
      how: '1) Plug 4 stereo 3.5 mm AUX (or 3.5 mm TRS-to-RCA) cables from the sound card to the 4 amplifiers:\n   • 🟢 Green Jack (Front L/R) → Amp-1 Input (North P1, P2)\n   • ⚫ Black Jack (Rear L/R) → Amp-2 Input (East P3, P4)\n   • 🟠 Orange Jack (Center/Sub) → Amp-3 Input (South P5, P6)\n   • ⚪ Grey Jack (Side L/R) → Amp-4 Input (West P7, P8)\n2) Connect the USB sound card to your laptop.\n3) In Windows Sound Control Panel → Configure USB Sound Card → Select "7.1 Surround" → Check all speakers as "Full-Range" → TURN OFF "Bass Management / Subwoofer Crossover" → Set 48000 Hz 16-bit.',
      why: 'Crucial detail: One channel of the Orange jack is labeled "Subwoofer". If OS Bass Management is left on, Windows filters out frequencies above 120 Hz on that channel, silencing piezo P6! Disabling Bass Management makes all 8 channels full-range (20 Hz – 20 kHz).',
      check: '✓ Verify: Clicking each of the 8 speaker icons in the OS sound test produces a clear tone from each corresponding edge piezo.',
      parts: ['P-05', 'P-07'],
    },
    {
      num: '10 / 10',
      shortTitle: 'Power-On & Sand Synthesis',
      tag: 'LIVE CALIBRATION · 0–9 DIGIT SYNTHESIS',
      title: 'Multimeter Safety Check, Sprinkling Quartz Sand & Synthesizing Digit “3” Live!',
      subtitle: 'Sprinkle 1 teaspoon of dry quartz sand onto the plate, select digit “3” in PULSE+, and watch the sand lock into the nodal valley.',
      what: 'The complete 3D system is live: all 4 amps are lit, all 8 underside piezos radiate phase-locked bending waves, and 12,000 3D sand grains bounce out of the antinodes to form a razor-sharp digit “3”.',
      how: '1) Before plugging in AC power, check with a multimeter in Ω mode across each amp output terminal to confirm there is no 0 Ω short.\n2) Plug in the 24V power brick.\n3) Sprinkle 1 level teaspoon (~4 g) of dry 0.1–0.3 mm white quartz/silica sand evenly across the top of the aluminum plate.\n4) Switch PULSE+ to "Studio" mode, select "8 Piezos (Home Prototype)" and "Aluminum", turn "Audio On", click digit "3", and slowly raise the 4 amp volume knobs to 45%–55%!',
      why: 'At 45%–55% gain, plate acceleration outside the digit exceeds gravity (Γ = a/g > 1). Sand grains bounce out of the vibrating background and settle within 2–4 seconds inside the quiet nodal valley (I ≈ 0) carved by destructive wave interference!',
      check: '✓ Congratulations! You can now synthesize digits 0–9, letters, custom drawings, and live Physics Lab frequency tweaks on your physical plate.',
      parts: ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06', 'P-07'],
    },
  ],
};

// ---------------------------------------------------------------------------
// Zero-Link Complete Parts & Alternatives Inventory (P-01 .. P-07)
// ---------------------------------------------------------------------------
export const BUILD_BOM = {
  tr: [
    {
      code: 'P-01',
      name: 'Düz Kare Metal Plaka (Alüminyum 6061-T6)',
      qty: '1 Adet',
      spec: '250 × 250 mm kare, 1.0 mm kalınlık (0.8 – 1.2 mm aralığı), tamamen düz ve deliksiz.',
      alt: 'C260 Pirinç Levha (250×250×0.8 mm — sıcak altın tınılı) veya 304 Paslanmaz Çelik (250×250×0.8 mm).',
      why: '1.0 mm kalınlık piezo disklerin bükülme dalgası üretmesi için ideal rijitliktedir; 3 mm levha çok kalın gelir.',
    },
    {
      code: 'P-02',
      name: '35 mm Piezoelektrik Seramik Disk (PZT) + Sert Epoksi',
      qty: '8 Adet (+2 Yedek)',
      spec: 'Ø35 mm pirinç tabanlı, Ø25 mm PZT seramik katmanlı pasif piezo disk + 5 dk çift bileşenli (A+B) şeffaf epoksi.',
      alt: 'Ø27 mm Piezo Disk veya Dayton Audio DAEX19CT-4 (19 mm, 4 Ω, 5W) mini yüzey uyarıcı (exciter).',
      why: 'Plakanın ALT YÜZÜNE paralel yapıştırılarak metali aşağı–yukarı (±z) büken eğilme momenti üretir.',
    },
    {
      code: 'P-03',
      name: 'Yumuşak Akustik İzolasyon Takozu (2.5 cm Yükseklik)',
      qty: '4 Adet',
      spec: '30 × 30 mm taban, 25 mm (2.5 cm) yükseklik, orta-yumuşak EVA sünger veya silikon küp.',
      alt: '25 mm kalınlıkta bulaşık süngeri küpleri, neopren kauçuk takoz veya yumuşak kapı stoperi.',
      why: 'Plakayı köşelerden 3.5 cm içeride taşır; alttaki piezolara 20 mm hava boşluğu açar ve titreşimi masadan yalıtır.',
    },
    {
      code: 'P-04',
      name: '100 Ω 2 Watt Seri Koruma Direnci + 22 AWG Kablo',
      qty: '8 Adet Direnç + 6m Kablo',
      spec: '100 Ohm, 2 Watt (%5 veya %1) metal film / karbon direnç + 22–24 AWG kırmızı/siyah çok telli bakır kablo.',
      alt: '47 Ω – 150 Ω arası herhangi bir 2W / 3W taş veya metal oksit direnç (DAEX19CT-4 exciter kullanılırsa direnç gerekmez).',
      why: 'Piezo kapasitif yük olduğu için yüksek frekansta Class-D amfiyi aşırı akım kapanmasından korur.',
    },
    {
      code: 'P-05',
      name: 'TPA3116D2 2×50W Stereo Class-D Amfi Kartı',
      qty: '4 Adet (Toplam 8 Kanal)',
      spec: 'Çift kanallı (Stereo L/R) TPA3116D2 dijital amfi modülü (12V–24V DC beslemeli, klemens çıkışlı).',
      alt: '4× PAM8610 (2×15W 12V) mini stereo amfi kartı veya 4× TDA7297 (2×15W) stereo amfi modülü.',
      why: 'Her kart 2 piezoyu (1 kenarı) sürer; 4 kart toplam 8 bağımsız kanalı yüksek voltaj salınımıyla besler.',
    },
    {
      code: 'P-06',
      name: '24V 5A DC Güç Adaptörü + 1’den 4’e DC Dağıtıcı Kablo',
      qty: '1 Adaptör + 1 Dağıtıcı',
      spec: '24V DC, 5 Amper (120W) regüleli adaptör (5.5×2.5 mm uç) + 1 Dişi → 4 Erkek DC ahtapot kablo.',
      alt: 'Eski bir 19V 4.74A (90W) laptop şarj adaptörü veya 12V 8A LED şerit trafo adaptörü.',
      why: '4 adet stereo amfiyi tek prizden gürültüsüz ve dengeli biçimde besler.',
    },
    {
      code: 'P-07',
      name: '7.1 / 5.1 Harici USB Ses Kartı + 4× AUX Kablo + Kuvars Kumu',
      qty: '1 Ses Kartı + 4 Kablo + 50g Kum',
      spec: 'Üzerinde Front(Yeşil), Rear(Siyah), Cen/Sub(Turuncu), Side(Gri) 3.5 mm jakları olan 7.1 USB DAC + 0.1–0.3 mm beyaz silis kumu.',
      alt: '5.1 Harici USB Ses Kartı (6 kanal), masaüstü PC anakartının arka 7.1 jakları; kum yerine ince sofra tuzu veya irmik.',
      why: 'Bilgisayardan 8 kanalı 48 kHz faz-senkronlu olarak çıkarır; Arduino veya ek kodlama ihtiyacını ortadan kaldırır.',
    },
  ],
  en: [
    {
      code: 'P-01',
      name: 'Flat Square Metal Plate (Aluminum 6061-T6)',
      qty: '1 Piece',
      spec: '250 × 250 mm square, 1.0 mm thickness (0.8 – 1.2 mm range), 100% flat and uncut.',
      alt: 'C260 Brass Sheet (250×250×0.8 mm — warm golden tone) or 304 Stainless Steel (250×250×0.8 mm).',
      why: '1.0 mm thickness provides ideal flexural rigidity for piezo bending waves; 3 mm plate is 27× too stiff.',
    },
    {
      code: 'P-02',
      name: '35 mm Piezoelectric Ceramic Disc (PZT) + Rigid Epoxy',
      qty: '8 Pieces (+2 Spare)',
      spec: 'Ø35 mm brass-backed, Ø25 mm PZT ceramic element passive piezo disc + 5-min 2-part (A+B) rigid epoxy.',
      alt: 'Ø27 mm Piezo Discs or Dayton Audio DAEX19CT-4 (19 mm, 4 Ω, 5W) coin surface exciters.',
      why: 'Bonds parallel to the UNDERSIDE of the plate to generate vertical (±z) bending moments.',
    },
    {
      code: 'P-03',
      name: 'Soft Acoustic Isolation Pads (2.5 cm Height)',
      qty: '4 Pieces',
      spec: '30 × 30 mm footprint, 25 mm (2.5 cm) tall medium-soft EVA foam or silicone blocks.',
      alt: '25 mm dense sponge cubes, neoprene rubber blocks, or soft silicone bumpers.',
      why: 'Supports the plate 3.5 cm from corners, creating a 20 mm air gap beneath the underside piezos.',
    },
    {
      code: 'P-04',
      name: '100 Ω 2 Watt Series Protection Resistors + 22 AWG Wire',
      qty: '8 Resistors + 6m Wire',
      spec: '100 Ohm, 2 Watt (5% or 1%) metal-film resistors + 22–24 AWG red/black stranded hookup wire.',
      alt: 'Any 47 Ω – 150 Ω 2W / 3W power resistor (not needed if using 4 Ω voice-coil exciters).',
      why: 'Prevents capacitive piezo impedance drops at high frequencies from tripping Class-D amp protection.',
    },
    {
      code: 'P-05',
      name: 'TPA3116D2 2×50W Stereo Class-D Amplifier Board',
      qty: '4 Boards (8 Channels Total)',
      spec: 'Dual-channel (Stereo L/R) TPA3116D2 digital amplifier module (12V–24V DC input, screw terminals).',
      alt: '4× PAM8610 (2×15W 12V) mini stereo boards or 4× TDA7297 (2×15W) stereo amplifier modules.',
      why: 'Each board drives 2 piezos (1 plate edge); 4 boards drive all 8 independent channels.',
    },
    {
      code: 'P-06',
      name: '24V 5A DC Power Adapter + 1-to-4 DC Splitter Cable',
      qty: '1 Brick + 1 Splitter',
      spec: '24V DC, 5 Amp (120W) regulated power brick (5.5×2.5 mm plug) + 1-female-to-4-male DC octopus splitter.',
      alt: 'Spare 19V 4.74A (90W) laptop charger or 12V 8A regulated DC power supply.',
      why: 'Powers all 4 stereo amplifier boards cleanly from a single wall outlet.',
    },
    {
      code: 'P-07',
      name: '7.1 / 5.1 External USB Sound Card + 4× AUX Cables + Quartz Sand',
      qty: '1 Sound Card + 4 Cables + 50g Sand',
      spec: 'Multi-jack 7.1 USB DAC with Front(Green), Rear(Black), Cen/Sub(Orange), Side(Grey) 3.5 mm jacks + 0.1–0.3 mm dry quartz sand.',
      alt: '5.1 External USB Sound Card (6-ch), desktop motherboard rear 7.1 jacks; fine table salt or semolina instead of sand.',
      why: 'Outputs 8 phase-synchronized 48 kHz analog channels straight from your PC without an Arduino.',
    },
  ],
};

// ---------------------------------------------------------------------------
// 3D WebGL Controller Class
// ---------------------------------------------------------------------------
export class HowToBuild3DController {
  constructor(containerEl, lang = 'tr', onBackToStudio = null) {
    this.container = containerEl;
    this.lang = lang === 'en' ? 'en' : 'tr';
    this.onBackToStudio = onBackToStudio;

    this.targetProgress = 0; // 0 .. 9 (10 stages: 0..9)
    this.progress = 0;
    this.activeStepIdx = 0;
    this.cameraPreset = 'auto'; // 'auto' | 'side' | 'under' | 'Closeup' | 'elec'
    this.autoPlay = false;
    this.bomOpen = false;
    this.clock = 0;
    this.disposed = false;

    this.userYaw = 0;
    this.userPitch = 0;
    this.userZoom = 0;
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };

    this._buildDOM();
    this._initThree();
    this._buildSceneModels();
    this._bindEvents();
    this._syncUI(true);
    this._animate = this._animate.bind(this);
    this._raf = requestAnimationFrame(this._animate);
  }

  _copy() {
    return this.lang === 'en'
      ? {
          stageHeaderKicker: '3D INTERACTIVE HARDWARE WORKBENCH · DRAG TO ROTATE · SCROLL TO ADVANCE',
          scrollHint: 'Scroll mouse wheel anywhere to scrub the 10-step 3D assembly',
          camAuto: 'Smart Camera',
          camSide: 'Eye-Level Side Cut',
          camUnder: 'Underside Piezos',
          camCloseup: 'Piezo (+/−) Cutaway',
          camElec: 'Amps & 7.1 DAC',
          autoTourOff: '▶ Auto-Play',
          autoTourOn: '⏸ Pause',
          bomBtn: 'Parts List & Alternatives (7)',
          backStudio: '← Studio',
          secWhat: '1. WHAT ARE WE LOOKING AT?',
          secHow: '2. HOW & WHERE TO INSTALL (STEP-BY-STEP)',
          secWhy: '3. WHY IS IT DESIGNED THIS WAY? (PHYSICS & ENGINEERING)',
          secBlueprint: 'TECHNICAL SCHEMATIC & DIMENSIONS FOR THIS STEP',
          prevBtn: '← Previous Step',
          nextBtn: 'Next Step →',
          finishBtn: 'Test in Live Studio →',
          bomTitle: 'Complete Parts List & Alternatives (No External Links)',
          bomSub: 'Anyone can source these 7 standard parts locally or online by searching their exact technical names below:',
          bomSpecLbl: 'Exact Specification:',
          bomAltLbl: 'Compatible Alternatives:',
          bomWhyLbl: 'Physical Role:',
          bomClose: '✕ Close',
          toolsLine: 'Required Hand Tools: Soldering iron (320°C) + solder, 5-min 2-part rigid epoxy, 400-grit sandpaper, millimeter ruler, marker, small screwdriver.',
        }
      : {
          stageHeaderKicker: '3B İNTERAKTİF DONANIM TEZGÂHI · DÖNDÜRMEK İÇİN SÜRÜKLE · İLERLEMEK İÇİN SCROLL YAP',
          scrollHint: '10 adımlı 3B kurulumu ileri–geri sarmak için fare tekerleğini (scroll) çevir',
          camAuto: 'Akıllı Kamera',
          camSide: 'Göz Hizası Yan Kesit',
          camUnder: 'Alttan Piezo & Epoksi',
          camCloseup: 'Piezo (+/−) Kesiti',
          camElec: 'Amfiler & 7.1 Ses Kartı',
          autoTourOff: '▶ Otomatik Oynat',
          autoTourOn: '⏸ Duraklat',
          bomBtn: 'Malzeme Listesi & Alternatifler (7)',
          backStudio: '← Stüdyo',
          secWhat: '1. BU ADIMDA NEYİ İNCELİYORUZ?',
          secHow: '2. NEREYE VE NASIL TAKILIR? (ADIM ADIM UYGULAMA)',
          secWhy: '3. NEDEN BÖYLE YAPIYORUZ? (FİZİK & MÜHENDİSLİK MANTIĞI)',
          secBlueprint: 'BU ADIMIN TEKNİK ŞEMASI VE MİLİMETRİK ÖLÇÜLERİ',
          prevBtn: '← Önceki Adım',
          nextBtn: 'Sonraki Adım →',
          finishBtn: 'Canlı Stüdyoda Dene →',
          bomTitle: 'Tam Malzeme Listesi ve Alternatifler (Link Yok · Sıfırdan Kurulum)',
          bomSub: 'Aşağıdaki 7 parçayı herhangi bir elektronikçiden veya hırdavatçıdan tam teknik isimleriyle temin edebilirsin:',
          bomSpecLbl: 'Tam Teknik Özellik:',
          bomAltLbl: 'Bulamazsan Alternatifler:',
          bomWhyLbl: 'Sistemdeki Görevi:',
          bomClose: '✕ Kapat',
          toolsLine: 'Gerekli El Aletleri: Kalem havya (320°C) + lehim teli, 5 dk çift bileşenli sert epoksi, 400 kum zımpara, milimetrik cetvel, asetat kalemi, yıldız tornavida.',
        };
  }

  _buildDOM() {
    this.container.innerHTML = `
      <div class="build3d-workbench" id="build3dViewport">
        <!-- LEFT / CENTER COLUMN: Dedicated Unobstructed 3D WebGL Stage -->
        <div class="build3d-stage-col">
          <!-- Docked Top Camera & Action Bar (Never overlaps 3D models) -->
          <div class="build3d-stage-header">
            <div class="build3d-cam-group" id="build3dCamGroup">
              <button type="button" class="b3d-cam-btn active" data-cam="auto"></button>
              <button type="button" class="b3d-cam-btn" data-cam="side"></button>
              <button type="button" class="b3d-cam-btn" data-cam="under"></button>
              <button type="button" class="b3d-cam-btn" data-cam="closeup"></button>
              <button type="button" class="b3d-cam-btn" data-cam="elec"></button>
            </div>
            <div class="build3d-top-actions">
              <button type="button" class="b3d-action-btn" id="btnBuild3dAuto"></button>
              <button type="button" class="b3d-action-btn b3d-bom-trigger" id="btnBuild3dBom"></button>
              <button type="button" class="b3d-action-btn" id="btnBuild3dBack"></button>
            </div>
          </div>

          <!-- Dedicated 3D Canvas Area -->
          <div class="build3d-stage-box">
            <div class="build3d-canvas-host" id="build3dCanvasHost"></div>
            <div class="build3d-pins" id="build3dPins"></div>

            <!-- Live 3D HUD Status Pill inside stage corner -->
            <div class="build3d-hud-pill" id="build3dHudPill">
              <span class="mouse-wheel-icon"><span class="wheel-dot"></span></span>
              <span id="build3dScrollHintText"></span>
            </div>
          </div>

          <!-- Docked Bottom 10-Step Interactive Timeline Strip -->
          <div class="build3d-timeline-bar">
            <div class="b3d-timeline-track">
              <div class="b3d-timeline-fill" id="build3dRailFill"></div>
            </div>
            <div class="b3d-timeline-stops" id="build3dRailStops"></div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Docked Step-by-Step Engineering Dossier & Technical Blueprint -->
        <aside class="build3d-dossier-col" id="build3dCard">
          <div class="b3d-card-header">
            <span class="b3d-step-pill" id="b3dStepPill">01 / 10</span>
            <span class="b3d-tag-pill" id="b3dTagPill"></span>
          </div>

          <h2 class="b3d-card-title" id="b3dTitle"></h2>
          <p class="b3d-card-sub" id="b3dSub"></p>

          <!-- Scrollable Dossier Content with Custom Step SVG Blueprint -->
          <div class="b3d-sections" id="b3dDossierScroll">
            <div class="b3d-blueprint-card">
              <div class="b3d-blueprint-head" id="b3dLblBlueprint"></div>
              <div class="b3d-blueprint-host" id="b3dBlueprintHost"></div>
            </div>

            <div class="b3d-sec">
              <span class="b3d-sec-lbl" id="b3dLblWhat"></span>
              <p id="b3dTextWhat"></p>
            </div>

            <div class="b3d-sec b3d-sec-how">
              <span class="b3d-sec-lbl" id="b3dLblHow"></span>
              <div class="b3d-numbered-list" id="b3dTextHow"></div>
            </div>

            <div class="b3d-sec b3d-sec-why">
              <span class="b3d-sec-lbl" id="b3dLblWhy"></span>
              <p id="b3dTextWhy"></p>
            </div>

            <div class="b3d-check-box" id="b3dCheckBox"></div>

            <div class="b3d-parts-row">
              <div class="b3d-parts-chips" id="b3dPartsChips"></div>
            </div>
          </div>

          <!-- Docked Step Prev / Next Navigation -->
          <div class="b3d-card-nav">
            <button type="button" class="b3d-nav-btn" id="btnB3dPrev"></button>
            <button type="button" class="b3d-nav-btn b3d-nav-primary" id="btnB3dNext"></button>
          </div>
        </aside>

        <!-- Full Slide-Over BOM & Alternatives Modal -->
        <div class="build3d-bom-drawer hidden" id="build3dBomDrawer">
          <div class="b3d-bom-head">
            <div>
              <h3 id="b3dBomTitle"></h3>
              <p id="b3dBomSub"></p>
            </div>
            <button type="button" class="b3d-action-btn" id="btnB3dBomClose"></button>
          </div>
          <div class="b3d-bom-grid" id="b3dBomGrid"></div>
          <div class="b3d-bom-tools" id="b3dBomTools"></div>
        </div>
      </div>
    `;

    this.elViewport = this.container.querySelector('#build3dViewport');
    this.canvasHost = this.container.querySelector('#build3dCanvasHost');
    this.pinsHost = this.container.querySelector('#build3dPins');
    this.elRailStops = this.container.querySelector('#build3dRailStops');
    this.elRailFill = this.container.querySelector('#build3dRailFill');
    this.elScrollHintText = this.container.querySelector('#build3dScrollHintText');

    this.elCamGroup = this.container.querySelector('#build3dCamGroup');
    this.btnAuto = this.container.querySelector('#btnBuild3dAuto');
    this.btnBom = this.container.querySelector('#btnBuild3dBom');
    this.btnBack = this.container.querySelector('#btnBuild3dBack');

    this.elStepPill = this.container.querySelector('#b3dStepPill');
    this.elTagPill = this.container.querySelector('#b3dTagPill');
    this.elTitle = this.container.querySelector('#b3dTitle');
    this.elSub = this.container.querySelector('#b3dSub');
    this.elDossierScroll = this.container.querySelector('#b3dDossierScroll');
    this.elLblBlueprint = this.container.querySelector('#b3dLblBlueprint');
    this.elBlueprintHost = this.container.querySelector('#b3dBlueprintHost');
    this.elLblWhat = this.container.querySelector('#b3dLblWhat');
    this.elTextWhat = this.container.querySelector('#b3dTextWhat');
    this.elLblHow = this.container.querySelector('#b3dLblHow');
    this.elTextHow = this.container.querySelector('#b3dTextHow');
    this.elLblWhy = this.container.querySelector('#b3dLblWhy');
    this.elTextWhy = this.container.querySelector('#b3dTextWhy');
    this.elCheckBox = this.container.querySelector('#b3dCheckBox');
    this.elPartsChips = this.container.querySelector('#b3dPartsChips');
    this.btnPrev = this.container.querySelector('#btnB3dPrev');
    this.btnNext = this.container.querySelector('#btnB3dNext');

    this.elBomDrawer = this.container.querySelector('#build3dBomDrawer');
    this.elBomTitle = this.container.querySelector('#b3dBomTitle');
    this.elBomSub = this.container.querySelector('#b3dBomSub');
    this.elBomGrid = this.container.querySelector('#b3dBomGrid');
    this.elBomTools = this.container.querySelector('#b3dBomTools');
    this.btnBomClose = this.container.querySelector('#btnB3dBomClose');
  }

  _initThree() {
    const w = Math.max(320, this.canvasHost.clientWidth || 860);
    const h = Math.max(300, this.canvasHost.clientHeight || 640);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x07090f);

    this.camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 100);
    this.camera.position.set(0, 3.8, 5.4);
    this.cameraLookAt = new THREE.Vector3(0, 0.2, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(w, h);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.canvasHost.appendChild(this.renderer.domElement);

    // Studio Lighting
    const hemi = new THREE.HemisphereLight(0xdbeafe, 0x090b10, 0.95);
    this.scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.3);
    keyLight.position.set(4.5, 7.5, 5.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 22;
    const d = 5.2;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.15);
    rimLight.position.set(-5.0, 4.0, -4.5);
    this.scene.add(rimLight);

    const underLight = new THREE.PointLight(0xe8c476, 1.35, 9);
    underLight.position.set(0, 0.08, 1.8);
    this.scene.add(underLight);
  }

  _makeBrushedMetalTexture() {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#c4ccd6';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 950; i++) {
      const y = Math.random() * 256;
      const alpha = 0.03 + Math.random() * 0.06;
      ctx.fillStyle = Math.random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(30,41,59,${alpha})`;
      ctx.fillRect(0, y, 256, 1);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  _makeScreenTexture() {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 320;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#090b10';
    ctx.fillRect(0, 0, 512, 320);
    ctx.strokeStyle = '#e8c476';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, 492, 300);
    ctx.fillStyle = '#e8c476';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('PULSE+ 8-CH SYNCHRONIZED DAC', 26, 44);
    ctx.strokeStyle = 'rgba(232,196,118,0.45)';
    ctx.strokeRect(36, 70, 200, 200);
    ctx.fillStyle = '#f5d996';
    ctx.font = 'bold 138px sans-serif';
    ctx.fillText('3', 98, 220);
    const freqs = ['F1 268Hz', 'F2 512Hz', 'F3 845Hz', 'F4 1240Hz', 'F5 1690Hz', 'F6 2210Hz', 'F7 2840Hz', 'F8 3520Hz'];
    freqs.forEach((lbl, i) => {
      const y = 80 + i * 24;
      ctx.fillStyle = '#34d399';
      ctx.fillRect(265, y, 110 + (i % 3) * 32, 12);
      ctx.fillStyle = '#d4d4d8';
      ctx.font = '12px monospace';
      ctx.fillText(lbl, 415, y + 11);
    });
    return new THREE.CanvasTexture(c);
  }

  _buildSceneModels() {
    // 1. Lab Workbench Desk Surface + Subtle Metric Grid
    const deskGeo = new THREE.BoxGeometry(11.5, 0.16, 8.5);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x0b0e15,
      roughness: 0.85,
      metalness: 0.12,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, -0.08, 0);
    desk.receiveShadow = true;
    this.scene.add(desk);

    const grid = new THREE.GridHelper(10, 40, 0x2a3446, 0x151b26);
    grid.position.y = 0.002;
    this.scene.add(grid);

    // 2. 4× Soft 25mm (0.25 unit) Green EVA / Silicone Isolation Pads
    // Plate is 2.5 x 2.5 units (250 x 250 mm). 35 mm inset from 1.25 edge => +/- 0.90
    this.padsGroup = new THREE.Group();
    this.scene.add(this.padsGroup);
    this.padCoords = [
      [-0.9, -0.9],
      [0.9, -0.9],
      [0.9, 0.9],
      [-0.9, 0.9],
    ];
    this.padMeshes = [];
    const padGeo = new THREE.BoxGeometry(0.32, 0.25, 0.32);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.72,
      metalness: 0.05,
      emissive: 0x064e3b,
      emissiveIntensity: 0.25,
    });
    this.padCoords.forEach(([px, pz]) => {
      const m = new THREE.Mesh(padGeo, padMat.clone());
      m.position.set(px, 0.125, pz);
      m.castShadow = true;
      m.receiveShadow = true;
      this.padsGroup.add(m);
      this.padMeshes.push(m);
    });

    // 3. Rig for Plate + Underside Piezos + Millimeter Marking Overlay + Epoxy Drops + Sand
    // Normal resting height on top of 0.25m pads = y: 0.265
    this.plateRig = new THREE.Group();
    this.plateRig.position.set(0, 0.265, 0);
    this.scene.add(this.plateRig);

    const metalTex = this._makeBrushedMetalTexture();
    const plateGeo = new THREE.BoxGeometry(2.5, 0.03, 2.5, 36, 1, 36);
    this._plateBasePos = Float32Array.from(plateGeo.attributes.position.array);
    this.plateMat = new THREE.MeshStandardMaterial({
      color: 0xd8e0ea,
      map: metalTex,
      roughness: 0.3,
      metalness: 0.86,
    });
    this.plateMesh = new THREE.Mesh(plateGeo, this.plateMat);
    this.plateMesh.castShadow = true;
    this.plateMesh.receiveShadow = true;
    this.plateRig.add(this.plateMesh);

    // Millimeter Ruler & Target Circles Overlay on Plate Underside (y = -0.017)
    this.markingGroup = new THREE.Group();
    this.plateRig.add(this.markingGroup);

    // 4 Green Pad Target Squares on Underside
    this.padCoords.forEach(([px, pz]) => {
      const sqGeo = new THREE.RingGeometry(0.14, 0.175, 4);
      sqGeo.rotateX(Math.PI / 2);
      sqGeo.rotateY(Math.PI / 4);
      const sqMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const sq = new THREE.Mesh(sqGeo, sqMat);
      sq.position.set(px, -0.017, pz);
      this.markingGroup.add(sq);
    });

    // 4. 8× 35mm Underside Parallel Piezo Discs + Epoxy Layer
    // 250mm edge: 85mm and 165mm from corner => -0.40 and +0.40 from center; 18mm inset from edge => 1.25 - 0.18 = 1.07
    this.piezoCoords = [
      { id: 'P1', edge: 'N', x: -0.42, z: -1.04, ampIdx: 0, ch: 0 },
      { id: 'P2', edge: 'N', x: 0.42, z: -1.04, ampIdx: 0, ch: 1 },
      { id: 'P3', edge: 'E', x: 1.04, z: -0.42, ampIdx: 1, ch: 0 },
      { id: 'P4', edge: 'E', x: 1.04, z: 0.42, ampIdx: 1, ch: 1 },
      { id: 'P5', edge: 'S', x: 0.42, z: 1.04, ampIdx: 2, ch: 0 },
      { id: 'P6', edge: 'S', x: -0.42, z: 1.04, ampIdx: 2, ch: 1 },
      { id: 'P7', edge: 'W', x: -1.04, z: 0.42, ampIdx: 3, ch: 0 },
      { id: 'P8', edge: 'W', x: -1.04, z: -0.42, ampIdx: 3, ch: 1 },
    ];

    this.piezoUnits = [];
    this.epoxyDrops = [];
    this.waveRings = [];

    const brassGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.012, 32);
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      roughness: 0.25,
      metalness: 0.88,
    });
    const ceramicGeo = new THREE.CylinderGeometry(0.125, 0.125, 0.008, 32);
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.35,
      metalness: 0.08,
    });
    const epoxyGeo = new THREE.CylinderGeometry(0.165, 0.165, 0.006, 28);
    const epoxyMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0.82,
      roughness: 0.15,
    });

    this.piezoCoords.forEach((pc) => {
      // Target outline ring on underside
      const targetRingGeo = new THREE.RingGeometry(0.17, 0.195, 32);
      targetRingGeo.rotateX(Math.PI / 2);
      const targetRingMat = new THREE.MeshBasicMaterial({
        color: 0xe8c476,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const targetRing = new THREE.Mesh(targetRingGeo, targetRingMat);
      targetRing.position.set(pc.x, -0.0165, pc.z);
      this.markingGroup.add(targetRing);

      // Cyan Epoxy layer between plate underside (y = -0.015) and piezo
      const ep = new THREE.Mesh(epoxyGeo, epoxyMat.clone());
      ep.position.set(pc.x, -0.018, pc.z);
      this.plateRig.add(ep);
      this.epoxyDrops.push(ep);

      // Piezo group (brass touches epoxy; white ceramic + red/black solder pads face outward to -y)
      const pGroup = new THREE.Group();
      pGroup.position.set(pc.x, -0.025, pc.z);

      const brass = new THREE.Mesh(brassGeo, brassMat);
      pGroup.add(brass);

      const ceramic = new THREE.Mesh(ceramicGeo, ceramicMat);
      ceramic.position.y = -0.007;
      pGroup.add(ceramic);

      // Red (+) solder pad on inner white ceramic & Black (-) solder pad on outer brass ring
      const padPos = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 })
      );
      padPos.position.set(0.04, -0.012, 0);
      pGroup.add(padPos);

      const padNeg = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 })
      );
      padNeg.position.set(-0.14, -0.006, 0);
      pGroup.add(padNeg);

      this.plateRig.add(pGroup);
      this.piezoUnits.push(pGroup);

      // Glowing acoustic wave ring for Step 1 & Step 10
      const ringGeo = new THREE.RingGeometry(0.17, 0.21, 32);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xe8c476,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(pc.x, -0.032, pc.z);
      this.plateRig.add(ring);
      this.waveRings.push(ring);
    });

    // 5. Animated 3D Epoxy Syringe (for Step 5 Underside Bonding)
    this.syringeGroup = new THREE.Group();
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.42, 20),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.85, roughness: 0.2 })
    );
    barrel.position.y = 0.26;
    this.syringeGroup.add(barrel);
    const plunger = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.32, 16),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 })
    );
    plunger.position.y = 0.52;
    this.syringeGroup.add(plunger);
    const tip = new THREE.Mesh(
      new THREE.ConeGeometry(0.025, 0.12, 16),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.5 })
    );
    tip.rotation.x = Math.PI;
    tip.position.y = 0.03;
    this.syringeGroup.add(tip);
    this.syringeGroup.visible = false;
    this.scene.add(this.syringeGroup);

    // 6. Giant 3D Magnified Piezo Disc Cutaway Showcase (for Step 4 Polarity & Soldering)
    this.giantPiezoGroup = new THREE.Group();
    this.giantPiezoGroup.position.set(0, 1.05, 0.35);
    this.giantPiezoGroup.rotation.x = 0.55;

    const gBrass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.88, 0.88, 0.045, 48),
      new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.22, metalness: 0.9 })
    );
    this.giantPiezoGroup.add(gBrass);

    const gCeramic = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.62, 0.032, 48),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.06 })
    );
    gCeramic.position.y = 0.035;
    this.giantPiezoGroup.add(gCeramic);

    // Solder joints & thick twisted pair leads on Giant Piezo
    const gPadRed = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x991b1b, emissiveIntensity: 0.35 })
    );
    gPadRed.position.set(0.22, 0.055, 0.08);
    this.giantPiezoGroup.add(gPadRed);

    const gPadBlk = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0369a1, emissiveIntensity: 0.35 })
    );
    gPadBlk.position.set(-0.72, 0.03, 0.08);
    this.giantPiezoGroup.add(gPadBlk);

    const redLeadCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.22, 0.055, 0.08),
      new THREE.Vector3(0.45, 0.14, 0.55),
      new THREE.Vector3(0.15, 0.1, 1.15),
    ]);
    this.giantPiezoGroup.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(redLeadCurve, 24, 0.032, 12, false),
        new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 })
      )
    );

    const blkLeadCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.72, 0.03, 0.08),
      new THREE.Vector3(-0.45, 0.12, 0.55),
      new THREE.Vector3(-0.08, 0.1, 1.15),
    ]);
    this.giantPiezoGroup.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(blkLeadCurve, 24, 0.032, 12, false),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.4 })
      )
    );
    this.giantPiezoGroup.visible = false;
    this.scene.add(this.giantPiezoGroup);

    // 7. 3D Air-Gap Highlight Beam under Plate (for Step 6 Eye-Level Cross-Section)
    this.airGapBeam = new THREE.Mesh(
      new THREE.BoxGeometry(1.45, 0.19, 0.35),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.18,
      })
    );
    this.airGapBeam.position.set(0, 0.11, 0.95);
    this.airGapBeam.visible = false;
    this.scene.add(this.airGapBeam);

    // 8. 8× 100 Ω 2W Series Protection Resistors mounted around the plate edges
    this.resistorsGroup = new THREE.Group();
    this.scene.add(this.resistorsGroup);
    this.resistorUnits = [];

    const resLayout = [
      { x: -0.52, z: -1.48, rotY: 0 },
      { x: 0.52, z: -1.48, rotY: 0 },
      { x: 1.48, z: -0.52, rotY: Math.PI / 2 },
      { x: 1.48, z: 0.52, rotY: Math.PI / 2 },
      { x: 0.52, z: 1.48, rotY: 0 },
      { x: -0.52, z: 1.48, rotY: 0 },
      { x: -1.48, z: 0.52, rotY: Math.PI / 2 },
      { x: -1.48, z: -0.52, rotY: Math.PI / 2 },
    ];

    resLayout.forEach((rl) => {
      const rUnit = this._createResistorMesh();
      rUnit.position.set(rl.x, 0.08, rl.z);
      rUnit.rotation.y = rl.rotY;
      this.resistorsGroup.add(rUnit);
      this.resistorUnits.push(rUnit);
    });

    // 9. Symmetrical 4× TPA3116D2 Stereo Amplifier Boards (2 on Left, 2 on Right of Plate!)
    // Amp-1 (North) at (-2.25, -0.58), Amp-4 (West) at (-2.25, +0.58)
    // Amp-2 (East) at (+2.25, -0.58), Amp-3 (South) at (+2.25, +0.58)
    this.ampsGroup = new THREE.Group();
    this.scene.add(this.ampsGroup);
    this.ampUnits = [];
    this.ampCoords = [
      { x: -2.25, z: -0.62, label: 'AMP-1 (N)' },
      { x: 2.25, z: -0.62, label: 'AMP-2 (E)' },
      { x: 2.25, z: 0.62, label: 'AMP-3 (S)' },
      { x: -2.25, z: 0.62, label: 'AMP-4 (W)' },
    ];
    this.ampCoords.forEach((ac) => {
      const amp = this._createAmplifierMesh();
      amp.position.set(ac.x, 0, ac.z);
      this.ampsGroup.add(amp);
      this.ampUnits.push(amp);
    });

    // 10. 24V 5A DC Power Adapter Brick (Back-Left: x = -1.55, z = -1.98)
    this.psuUnit = this._createPowerBrickMesh();
    this.psuUnit.position.set(-1.55, 0, -1.98);
    this.ampsGroup.add(this.psuUnit);

    // 11. 7.1 External USB Sound Card (Front-Center: x = 0, z = +1.98)
    this.dacGroup = new THREE.Group();
    this.scene.add(this.dacGroup);
    this.dacUnit = this._createUsbDacMesh();
    this.dacUnit.position.set(0, 0, 1.98);
    this.dacGroup.add(this.dacUnit);

    // 12. 3D Laptop Running PULSE+ (Back-Right: x = +1.45, z = -2.05)
    this.laptopUnit = this._createLaptopMesh();
    this.laptopUnit.position.set(1.45, 0, -2.05);
    this.laptopUnit.rotation.y = -0.22;
    this.dacGroup.add(this.laptopUnit);

    // 13. Realistic Color-Coded 3D Spline Wires
    this._buildWiringSplines();

    // 14. 12,000 3D Ballistic Quartz Sand Grains on Top of the Plate
    this._buildSandParticles();

    // 15. Step-Aware Projected 3D Callout Pins
    this._initCalloutPins();
  }

  _createResistorMesh() {
    const g = new THREE.Group();
    // Small terminal carrier base
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.03, 0.14),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 })
    );
    base.position.y = -0.04;
    g.add(base);

    const bodyGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.22, 16);
    bodyGeo.rotateZ(Math.PI / 2);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.35, metalness: 0.1 });
    g.add(new THREE.Mesh(bodyGeo, bodyMat));

    const leadGeo = new THREE.CylinderGeometry(0.009, 0.009, 0.36, 10);
    leadGeo.rotateZ(Math.PI / 2);
    const leadMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.9, roughness: 0.2 });
    g.add(new THREE.Mesh(leadGeo, leadMat));

    // Color bands: Brown, Black, Brown, Gold (100 Ohm)
    const bandColors = [0x78350f, 0x09090b, 0x78350f, 0xeab308];
    [-0.06, -0.02, 0.02, 0.07].forEach((bx, idx) => {
      const bGeo = new THREE.CylinderGeometry(0.041, 0.041, 0.018, 16);
      bGeo.rotateZ(Math.PI / 2);
      const bMat = new THREE.MeshStandardMaterial({ color: bandColors[idx], roughness: 0.3 });
      const b = new THREE.Mesh(bGeo, bMat);
      b.position.x = bx;
      g.add(b);
    });
    return g;
  }

  _createAmplifierMesh() {
    const g = new THREE.Group();
    // Green PCB
    const pcb = new THREE.Mesh(
      new THREE.BoxGeometry(0.84, 0.035, 0.78),
      new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.45, metalness: 0.2 })
    );
    pcb.position.y = 0.04;
    pcb.castShadow = true;
    g.add(pcb);

    // Finned Black Aluminum Heatsink
    const hs = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.16, 0.34),
      new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.35, metalness: 0.85 })
    );
    hs.position.set(0, 0.13, 0);
    hs.castShadow = true;
    g.add(hs);

    // 2 Copper Toroid Inductors
    const torGeo = new THREE.TorusGeometry(0.07, 0.026, 12, 24);
    torGeo.rotateX(Math.PI / 2);
    const torMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.88 });
    [-0.18, 0.18].forEach((tz) => {
      const tor = new THREE.Mesh(torGeo, torMat);
      tor.position.set(-0.26, 0.09, tz);
      g.add(tor);
    });

    // 2 Electrolytic Capacitors
    const capGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.16, 16);
    const capMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.3, metalness: 0.4 });
    [-0.2, 0.2].forEach((cz) => {
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(0.24, 0.13, cz);
      g.add(cap);
    });

    // Blue Screw Terminal Block
    const term = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.11, 0.44),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 })
    );
    term.position.set(-0.35, 0.1, 0);
    g.add(term);

    // 3 Gold Volume / Tone Knobs
    const knobGeo = new THREE.CylinderGeometry(0.036, 0.036, 0.07, 16);
    knobGeo.rotateZ(Math.PI / 2);
    const knobMat = new THREE.MeshStandardMaterial({ color: 0xe8c476, roughness: 0.25, metalness: 0.9 });
    [-0.2, 0, 0.2].forEach((kz) => {
      const k = new THREE.Mesh(knobGeo, knobMat);
      k.position.set(0.43, 0.085, kz);
      g.add(k);
    });

    // Power LED
    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0x34d399 })
    );
    led.position.set(0.32, 0.075, 0);
    g.add(led);

    return g;
  }

  _createPowerBrickMesh() {
    const g = new THREE.Group();
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.24, 0.48),
      new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.55, metalness: 0.2 })
    );
    box.position.y = 0.12;
    box.castShadow = true;
    g.add(box);

    const badge = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.01, 0.22),
      new THREE.MeshBasicMaterial({ color: 0xe8c476 })
    );
    badge.position.set(0, 0.245, 0);
    g.add(badge);

    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.025, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0x34d399 })
    );
    led.position.set(0.36, 0.245, 0.14);
    g.add(led);
    return g;
  }

  _createUsbDacMesh() {
    const g = new THREE.Group();
    const chassis = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, 0.2, 0.52),
      new THREE.MeshStandardMaterial({ color: 0x1e2433, roughness: 0.35, metalness: 0.65 })
    );
    chassis.position.y = 0.1;
    chassis.castShadow = true;
    g.add(chassis);

    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.11, 0.06, 24),
      new THREE.MeshStandardMaterial({ color: 0xe8c476, roughness: 0.25, metalness: 0.88 })
    );
    wheel.position.set(0, 0.22, 0);
    g.add(wheel);

    // 4 Color-Coded 3.5mm Stereo Jacks: Green, Black, Orange, Grey
    const jackColors = [0x22c55e, 0x94a3b8, 0xf59e0b, 0x38bdf8];
    const jackGeo = new THREE.CylinderGeometry(0.036, 0.036, 0.06, 16);
    jackGeo.rotateX(Math.PI / 2);
    [-0.39, -0.13, 0.13, 0.39].forEach((jx, idx) => {
      const j = new THREE.Mesh(jackGeo, new THREE.MeshStandardMaterial({ color: jackColors[idx], roughness: 0.3 }));
      j.position.set(jx, 0.1, -0.27);
      g.add(j);
    });
    return g;
  }

  _createLaptopMesh() {
    const g = new THREE.Group();
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(1.45, 0.05, 0.98),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.32, metalness: 0.8 })
    );
    base.position.y = 0.025;
    base.castShadow = true;
    g.add(base);

    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.05, -0.46);
    lidGroup.rotation.x = -0.32;

    const lid = new THREE.Mesh(
      new THREE.BoxGeometry(1.45, 0.92, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.8 })
    );
    lid.position.set(0, 0.46, 0);
    lidGroup.add(lid);

    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.34, 0.82),
      new THREE.MeshBasicMaterial({ map: this._makeScreenTexture() })
    );
    screen.position.set(0, 0.46, 0.022);
    lidGroup.add(screen);

    g.add(lidGroup);
    return g;
  }

  _buildWiringSplines() {
    this.piezoWiresGroup = new THREE.Group();
    this.ampWiresGroup = new THREE.Group();
    this.dacWiresGroup = new THREE.Group();
    this.scene.add(this.piezoWiresGroup);
    this.scene.add(this.ampWiresGroup);
    this.scene.add(this.dacWiresGroup);

    const resPositions = [
      [-0.52, -1.48],
      [0.52, -1.48],
      [1.48, -0.52],
      [1.48, 0.52],
      [0.52, 1.48],
      [-0.52, 1.48],
      [-1.48, 0.52],
      [-1.48, -0.52],
    ];

    const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.45 });
    const blkMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.45 });

    // 1. Piezos -> 8x 100 Ohm Resistors
    this.piezoCoords.forEach((pc, idx) => {
      const [rx, rz] = resPositions[idx];
      const pStart = new THREE.Vector3(pc.x, 0.22, pc.z);
      const pMid = new THREE.Vector3((pc.x + rx) * 0.5, 0.07, (pc.z + rz) * 0.5);
      const pEnd = new THREE.Vector3(rx, 0.08, rz);
      const curve = new THREE.CatmullRomCurve3([pStart, pMid, pEnd]);
      this.piezoWiresGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 18, 0.013, 8, false), redMat));

      // Return black GND wire
      const curveGnd = new THREE.CatmullRomCurve3([
        new THREE.Vector3(pc.x + 0.04, 0.22, pc.z + 0.04),
        new THREE.Vector3((pc.x + rx) * 0.5 + 0.05, 0.05, (pc.z + rz) * 0.5 + 0.04),
        new THREE.Vector3(rx + 0.05, 0.06, rz + 0.04),
      ]);
      this.piezoWiresGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curveGnd, 18, 0.011, 8, false), blkMat));
    });

    // 2. 8x Resistors -> 4x Amplifiers + 24V PSU Splitter Cables
    this.piezoCoords.forEach((pc, idx) => {
      const [rx, rz] = resPositions[idx];
      const ampCoord = this.ampCoords[pc.ampIdx];
      const start = new THREE.Vector3(rx, 0.08, rz);
      const mid = new THREE.Vector3((rx + ampCoord.x) * 0.5, 0.04, (rz + ampCoord.z) * 0.5);
      const end = new THREE.Vector3(ampCoord.x, 0.09, ampCoord.z + (pc.ch === 0 ? -0.14 : 0.14));
      const curve = new THREE.CatmullRomCurve3([start, mid, end]);
      this.ampWiresGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.013, 8, false), redMat));
    });

    // 24V DC Power Splitter (1-to-4 from PSU at (-1.55, -1.98) to all 4 amps)
    const psuMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 });
    this.ampCoords.forEach((ac) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.55, 0.1, -1.75),
        new THREE.Vector3((ac.x - 1.55) * 0.5, 0.03, (ac.z - 1.75) * 0.5),
        new THREE.Vector3(ac.x, 0.08, ac.z),
      ]);
      this.ampWiresGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.015, 8, false), psuMat));
    });

    // 3. 7.1 USB Sound Card (0, 1.98) -> 4 Amplifiers (Color-coded Green, Grey, Orange, Cyan)
    const auxColors = [0x22c55e, 0x94a3b8, 0xf59e0b, 0x38bdf8];
    const jackXs = [-0.39, -0.13, 0.13, 0.39];
    this.ampCoords.forEach((ac, idx) => {
      const mat = new THREE.MeshStandardMaterial({ color: auxColors[idx], roughness: 0.35 });
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(jackXs[idx], 0.1, 1.72),
        new THREE.Vector3(ac.x * 0.65, 0.04, 1.35),
        new THREE.Vector3(ac.x, 0.09, ac.z),
      ]);
      this.dacWiresGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 22, 0.016, 8, false), mat));
    });

    // USB Cable from 7.1 DAC (0.58, 0.1, 1.98) to Laptop (1.45, 0.04, -2.05)
    const usbMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.3 });
    const usbCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.58, 0.1, 1.98),
      new THREE.Vector3(2.85, 0.04, 1.25),
      new THREE.Vector3(2.85, 0.04, -1.25),
      new THREE.Vector3(1.45, 0.04, -1.65),
    ]);
    this.dacWiresGroup.add(new THREE.Mesh(new THREE.TubeGeometry(usbCurve, 32, 0.018, 8, false), usbMat));
  }

  _buildSandParticles() {
    const N = 12000;
    this.sandCount = N;
    this.sandScattered = new Float32Array(N * 2);
    this.sandTarget3 = new Float32Array(N * 2);

    // Rasterize crisp "3" mask on an offscreen canvas
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 96px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('3', 64, 66);
    const img = ctx.getImageData(0, 0, 128, 128).data;
    const validPts = [];
    for (let y = 0; y < 128; y++) {
      for (let x = 0; x < 128; x++) {
        if (img[(y * 128 + x) * 4] > 128) {
          validPts.push([(x / 127 - 0.5) * 1.65, (y / 127 - 0.5) * 1.65]);
        }
      }
    }

    const posArr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const sx = (Math.random() - 0.5) * 2.15;
      const sz = (Math.random() - 0.5) * 2.15;
      this.sandScattered[i * 2] = sx;
      this.sandScattered[i * 2 + 1] = sz;

      const pt = validPts[i % validPts.length] || [0, 0];
      this.sandTarget3[i * 2] = pt[0] + (Math.random() - 0.5) * 0.032;
      this.sandTarget3[i * 2 + 1] = pt[1] + (Math.random() - 0.5) * 0.032;

      posArr[i * 3] = sx;
      posArr[i * 3 + 1] = 0.022;
      posArr[i * 3 + 2] = sz;
    }

    this.sandGeo = new THREE.BufferGeometry();
    this.sandGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    this.sandMat = new THREE.PointsMaterial({
      color: 0xf5d996,
      size: 0.022,
      transparent: true,
      opacity: 0.92,
    });
    this.sandPoints = new THREE.Points(this.sandGeo, this.sandMat);
    this.plateRig.add(this.sandPoints);
  }

  _initCalloutPins() {
    // Each pin specifies `steps`: array of step indices (0..9) where this pin is relevant.
    // That way only 2-3 clean, non-overlapping callout pins appear on any step!
    this.calloutDefs = [
      {
        id: 'plate',
        pos: new THREE.Vector3(0, 0.34, 0),
        steps: [0, 1, 9],
        tr: 'P-01 · 250×250×1.0 mm 6061-T6 Alüminyum Plaka',
        en: 'P-01 · 250×250×1.0 mm 6061-T6 Aluminum Plate',
      },
      {
        id: 'pads',
        pos: new THREE.Vector3(-0.9, 0.14, 0.9),
        steps: [1, 2, 5],
        color: 'mint',
        tr: 'P-03 · 4× 25 mm Sünger Takoz (Köşeden 35 mm İçeride)',
        en: 'P-03 · 4× 25 mm Foam Pads (35 mm Inset from Corners)',
      },
      {
        id: 'airgap',
        pos: new THREE.Vector3(0, 0.1, 1.05),
        steps: [2, 5],
        color: 'cyan',
        tr: '20 mm Hava Boşluğu (Piezolar Masaya Değmez!)',
        en: '20 mm Air Clearance (Piezos Never Touch Desk!)',
      },
      {
        id: 'polarity_pos',
        pos: new THREE.Vector3(0.28, 1.15, 0.45),
        steps: [3],
        tr: 'Kırmızı Kablo (+) → İç Beyaz PZT Seramik Yüzey',
        en: 'Red Wire (+) → Inner White PZT Ceramic Circle',
      },
      {
        id: 'polarity_neg',
        pos: new THREE.Vector3(-0.72, 1.02, 0.45),
        steps: [3],
        color: 'cyan',
        tr: 'Siyah Kablo (− GND) → Dış Sarı Pirinç Halka',
        en: 'Black Wire (− GND) → Outer Yellow Brass Ring',
      },
      {
        id: 'piezos',
        pos: new THREE.Vector3(0.42, 0.25, 1.04),
        steps: [0, 4, 5],
        color: 'cyan',
        tr: 'P-02 · 8× 35 mm Piezo (ALT YÜZEYE Paralel Epoksi)',
        en: 'P-02 · 8× 35 mm Piezos (Parallel Epoxy on UNDERSIDE)',
      },
      {
        id: 'resistors',
        pos: new THREE.Vector3(0.52, 0.15, 1.48),
        steps: [6],
        tr: 'P-04 · 8× 100 Ω 2W Seri Koruma Direnci (+ Hattında)',
        en: 'P-04 · 8× 100 Ω 2W Series Protection Resistors (on + Line)',
      },
      {
        id: 'ampsL',
        pos: new THREE.Vector3(-2.25, 0.28, 0),
        steps: [0, 7],
        color: 'mint',
        tr: 'P-05 · Amfi-1 (Kuzey P1-P2) & Amfi-4 (Batı P7-P8)',
        en: 'P-05 · Amp-1 (North P1-P2) & Amp-4 (West P7-P8)',
      },
      {
        id: 'ampsR',
        pos: new THREE.Vector3(2.25, 0.28, 0),
        steps: [7],
        color: 'mint',
        tr: 'P-05 · Amfi-2 (Doğu P3-P4) & Amfi-3 (Güney P5-P6)',
        en: 'P-05 · Amp-2 (East P3-P4) & Amp-3 (South P5-P6)',
      },
      {
        id: 'psu',
        pos: new THREE.Vector3(-1.55, 0.3, -1.98),
        steps: [7],
        tr: 'P-06 · 24V 5A DC Güç Adaptörü + 4’lü Dağıtıcı',
        en: 'P-06 · 24V 5A DC Power Brick + 1-to-4 Splitter',
      },
      {
        id: 'dac',
        pos: new THREE.Vector3(0, 0.28, 1.98),
        steps: [0, 8],
        color: 'cyan',
        tr: 'P-07 · 7.1 USB Ses Kartı (Yeşil/Siyah/Turuncu/Gri Jak)',
        en: 'P-07 · 7.1 USB Sound Card (Green/Black/Orange/Grey Jacks)',
      },
      {
        id: 'laptop',
        pos: new THREE.Vector3(1.45, 0.72, -2.05),
        steps: [8, 9],
        tr: 'Bilgisayar · PULSE+ 48 kHz 8 Kanal Faz-Senkron Sentez',
        en: 'Laptop · PULSE+ 48 kHz 8-Channel Phase-Locked Synth',
      },
    ];

    this.pinsHost.innerHTML = '';
    this.pinEls = this.calloutDefs.map((def) => {
      const el = document.createElement('div');
      el.className = `b3d-pin ${def.color ? `pin-${def.color}` : ''}`;
      el.innerHTML = `<span class="b3d-pin-dot"></span><span class="b3d-pin-txt"></span>`;
      this.pinsHost.appendChild(el);
      return { def, el, txtEl: el.querySelector('.b3d-pin-txt') };
    });
  }

  _bindEvents() {
    // 1. Wheel listener on the 3D Stage & Timeline (while allowing normal scrolling inside the right dossier text!)
    this._onWheel = (e) => {
      if (this.bomOpen) return;
      // If user is scrolling inside the dossier text column and it has scroll room, let them read comfortably
      const inDossier = e.target.closest('#b3dDossierScroll');
      if (inDossier) {
        const atTop = inDossier.scrollTop <= 0 && e.deltaY < 0;
        const atBottom =
          inDossier.scrollTop + inDossier.clientHeight >= inDossier.scrollHeight - 2 && e.deltaY > 0;
        if (!atTop && !atBottom) return;
      }
      e.preventDefault();
      this.autoPlay = false;
      this.cameraPreset = 'auto';
      this._syncCamPresetButtons();

      const delta = clamp(e.deltaY, -160, 160);
      this.targetProgress = clamp(this.targetProgress + delta * 0.0048, 0, 9);
    };
    this.elViewport.addEventListener('wheel', this._onWheel, { passive: false });

    // 2. Drag to Orbit 3D Scene
    this.canvasHost.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.dragStart.x = e.clientX;
      this.dragStart.y = e.clientY;
      this.canvasHost.setPointerCapture(e.pointerId);
    });
    this.canvasHost.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.dragStart.x;
      const dy = e.clientY - this.dragStart.y;
      this.dragStart.x = e.clientX;
      this.dragStart.y = e.clientY;
      this.userYaw = clamp(this.userYaw - dx * 0.006, -1.35, 1.35);
      this.userPitch = clamp(this.userPitch + dy * 0.005, -0.45, 0.65);
    });
    const endDrag = () => {
      this.isDragging = false;
    };
    this.canvasHost.addEventListener('pointerup', endDrag);
    this.canvasHost.addEventListener('pointercancel', endDrag);

    // 3. Camera Preset Buttons
    this.elCamGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-cam]');
      if (!btn) return;
      this.cameraPreset = btn.dataset.cam;
      this.userYaw = 0;
      this.userPitch = 0;
      if (this.cameraPreset === 'closeup' && Math.round(this.targetProgress) !== 3) {
        this.jumpToStep(3, true);
      } else if (this.cameraPreset === 'under' && Math.round(this.targetProgress) !== 4) {
        this.jumpToStep(4, true);
      } else if (this.cameraPreset === 'side' && Math.round(this.targetProgress) !== 5) {
        this.jumpToStep(5, true);
      }
      this._syncCamPresetButtons();
    });

    // 4. Auto-Play Tour, BOM Drawer & Back to Studio
    this.btnAuto.addEventListener('click', () => {
      this.autoPlay = !this.autoPlay;
      if (this.autoPlay && this.targetProgress >= 8.95) {
        this.targetProgress = 0;
      }
      this._syncTopButtons();
    });

    this.btnBom.addEventListener('click', () => {
      this.bomOpen = !this.bomOpen;
      this.elBomDrawer.classList.toggle('hidden', !this.bomOpen);
    });
    this.btnBomClose.addEventListener('click', () => {
      this.bomOpen = false;
      this.elBomDrawer.classList.add('hidden');
    });

    this.btnBack.addEventListener('click', () => {
      if (typeof this.onBackToStudio === 'function') this.onBackToStudio();
    });

    // 5. Prev / Next Step Buttons
    this.btnPrev.addEventListener('click', () => {
      this.autoPlay = false;
      this.jumpToStep(Math.max(0, Math.round(this.targetProgress) - 1));
    });
    this.btnNext.addEventListener('click', () => {
      this.autoPlay = false;
      const cur = Math.round(this.targetProgress);
      if (cur >= 9) {
        if (typeof this.onBackToStudio === 'function') this.onBackToStudio();
      } else {
        this.jumpToStep(cur + 1);
      }
    });

    // 6. Keyboard Left/Right/Up/Down navigation
    this._onKeyDown = (e) => {
      if (this.container.classList.contains('hidden') || this.bomOpen) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        this.autoPlay = false;
        this.jumpToStep(Math.min(9, Math.round(this.targetProgress) + 1));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        this.autoPlay = false;
        this.jumpToStep(Math.max(0, Math.round(this.targetProgress) - 1));
      }
    };
    window.addEventListener('keydown', this._onKeyDown);

    this._onResize = () => this.resize();
    window.addEventListener('resize', this._onResize);
    if (typeof ResizeObserver !== 'undefined') {
      this._ro = new ResizeObserver(() => this.resize());
      this._ro.observe(this.canvasHost);
    }
  }

  jumpToStep(idx, keepPreset = false) {
    this.targetProgress = clamp(idx, 0, 9);
    if (!keepPreset) {
      this.cameraPreset = 'auto';
    }
    this.userYaw = 0;
    this.userPitch = 0;
    this._syncCamPresetButtons();
    this._syncTopButtons();
  }

  setLanguage(nextLang) {
    this.lang = nextLang === 'en' ? 'en' : 'tr';
    this._syncUI(true);
  }

  resize() {
    if (!this.renderer || !this.canvasHost) return;
    if (!this.canvasHost.clientWidth || !this.canvasHost.clientHeight) return;
    const w = Math.max(320, this.canvasHost.clientWidth || 860);
    const h = Math.max(300, this.canvasHost.clientHeight || 640);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  _syncCamPresetButtons() {
    this.elCamGroup.querySelectorAll('[data-cam]').forEach((b) => {
      b.classList.toggle('active', b.dataset.cam === this.cameraPreset);
    });
  }

  _syncTopButtons() {
    const c = this._copy();
    this.btnAuto.textContent = this.autoPlay ? c.autoTourOn : c.autoTourOff;
    this.btnAuto.classList.toggle('active', this.autoPlay);
  }

  _syncUI(forceFull = false) {
    const c = this._copy();
    const stages = BUILD_STAGES[this.lang] || BUILD_STAGES.tr;

    if (forceFull) {
      this.elScrollHintText.textContent = c.scrollHint;
      this.elCamGroup.querySelector('[data-cam="auto"]').textContent = c.camAuto;
      this.elCamGroup.querySelector('[data-cam="side"]').textContent = c.camSide;
      this.elCamGroup.querySelector('[data-cam="under"]').textContent = c.camUnder;
      this.elCamGroup.querySelector('[data-cam="closeup"]').textContent = c.camCloseup;
      this.elCamGroup.querySelector('[data-cam="elec"]').textContent = c.camElec;
      this.btnBom.textContent = c.bomBtn;
      this.btnBack.textContent = c.backStudio;
      this.elLblBlueprint.textContent = c.secBlueprint;
      this.elLblWhat.textContent = c.secWhat;
      this.elLblHow.textContent = c.secHow;
      this.elLblWhy.textContent = c.secWhy;

      // Render 10 timeline stops in the docked bottom timeline bar
      this.elRailStops.innerHTML = stages
        .map(
          (st, i) => `
          <button type="button" class="b3d-stop-btn ${i === this.activeStepIdx ? 'active' : ''}" data-step="${i}">
            <span class="b3d-stop-num">${String(i + 1).padStart(2, '0')}</span>
            <span class="b3d-stop-lbl">${st.shortTitle}</span>
          </button>
        `
        )
        .join('');

      this.elRailStops.querySelectorAll('.b3d-stop-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          this.autoPlay = false;
          this.jumpToStep(Number(btn.dataset.step));
        });
      });

      this.pinEls.forEach((p) => {
        p.txtEl.textContent = this.lang === 'en' ? p.def.en : p.def.tr;
      });

      this._renderBomDrawer();
      this._syncTopButtons();
      this._syncCamPresetButtons();
    }

    const st = stages[this.activeStepIdx] || stages[0];
    this.elStepPill.textContent = st.num;
    this.elTagPill.textContent = st.tag;
    this.elTitle.textContent = st.title;
    this.elSub.textContent = st.subtitle;
    this.elBlueprintHost.innerHTML = getStepBlueprintSVG(this.activeStepIdx, this.lang);
    this.elTextWhat.textContent = st.what;

    // Render step-by-step numbered paragraphs cleanly
    this.elTextHow.innerHTML = st.how
      .split('\n')
      .map((line) => `<div class="b3d-how-item">${line}</div>`)
      .join('');

    this.elTextWhy.textContent = st.why;
    this.elCheckBox.textContent = st.check;

    if (this.elDossierScroll) {
      this.elDossierScroll.scrollTop = 0;
    }

    const bomList = BUILD_BOM[this.lang] || BUILD_BOM.tr;
    this.elPartsChips.innerHTML = st.parts
      .map((code) => {
        const item = bomList.find((b) => b.code === code);
        return `<button type="button" class="b3d-part-chip" data-open-bom="${code}">${code} · ${
          item ? item.name.split('(')[0].trim() : ''
        }</button>`;
      })
      .join('');

    this.elPartsChips.querySelectorAll('[data-open-bom]').forEach((chip) => {
      chip.addEventListener('click', () => {
        this.bomOpen = true;
        this.elBomDrawer.classList.remove('hidden');
      });
    });

    this.btnPrev.textContent = c.prevBtn;
    this.btnPrev.disabled = this.activeStepIdx === 0;
    this.btnNext.textContent = this.activeStepIdx === 9 ? c.finishBtn : c.nextBtn;

    this.elRailStops.querySelectorAll('.b3d-stop-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === this.activeStepIdx);
      btn.classList.toggle('done', idx < this.activeStepIdx);
    });
  }

  _renderBomDrawer() {
    const c = this._copy();
    const list = BUILD_BOM[this.lang] || BUILD_BOM.tr;
    this.elBomTitle.textContent = c.bomTitle;
    this.elBomSub.textContent = c.bomSub;
    this.btnBomClose.textContent = c.bomClose;
    this.elBomTools.innerHTML = `<strong>🛠️</strong> ${c.toolsLine}`;

    this.elBomGrid.innerHTML = list
      .map(
        (item) => `
        <article class="b3d-bom-item">
          <div class="b3d-bom-top">
            <span class="b3d-bom-code">${item.code}</span>
            <span class="b3d-bom-qty">${item.qty}</span>
          </div>
          <h4>${item.name}</h4>
          <p class="b3d-bom-spec"><strong>${c.bomSpecLbl}</strong> ${item.spec}</p>
          <p class="b3d-bom-alt"><strong>${c.bomAltLbl}</strong> ${item.alt}</p>
          <p class="b3d-bom-why"><strong>${c.bomWhyLbl}</strong> ${item.why}</p>
        </article>
      `
      )
      .join('');
  }

  // -------------------------------------------------------------------------
  // Continuous 10-Stage 3D Animation Choreography (`progress` in 0.0 .. 9.0)
  // -------------------------------------------------------------------------
  _updateSceneForProgress(p, dt) {
    this.clock += dt;

    // 0: Overview (0)
    // 1: Plate & Millimeter Grid (1) -> Plate flips upside down to show bottom ruler coordinates
    // 2: 4x 2.5cm Isolation Pads (2) -> Plate right-side up lowering onto 4 green pads
    // 3: Piezo (+/-) Soldering Cutaway (3) -> Giant 3D Piezo Cutaway center stage
    // 4: Underside Parallel Epoxy Bond (4) -> Plate flipped 180°, syringe + 8 piezos landing
    // 5: Eye-Level Side Cross-Section (5) -> Plate on pads, 20mm air gap beam, ±z bending wave
    // 6: 8x 100 Ohm Resistors (6) -> Resistors + twisted-pair wires
    // 7: 4x TPA3116D2 Amps & 24V PSU (7) -> Symmetrical left/right amps + power splitter
    // 8: 7.1 USB Sound Card & Laptop (8) -> Front 7.1 DAC + color-coded AUX cables + Laptop
    // 9: Live Sand Synthesis "3" (9) -> Full wave rings + 12,000 sand grains forming "3"

    const isOverview = 1 - smoothstep(0.0, 0.75, p);

    // Plate flip state: flipped upside-down (PI) during Step 2 (p≈1, marking underside) and Step 5 (p≈4, gluing piezos)
    const flipStep2 = smoothstep(0.45, 0.9, p) * (1 - smoothstep(1.35, 1.85, p));
    const flipStep5 = smoothstep(3.35, 3.85, p) * (1 - smoothstep(4.35, 4.85, p));
    const flipFactor = Math.max(flipStep2, flipStep5);

    this.plateRig.rotation.x = flipFactor * Math.PI;
    // Lift plate higher when flipped or during pad placement
    const padDropLift = (1 - smoothstep(1.6, 2.2, p)) * smoothstep(1.1, 1.5, p) * 0.45;
    this.plateRig.position.y = lerp(0.265, 0.65, flipFactor) + padDropLift;

    // Underside millimeter coordinate markings visible in Step 2 (p≈1) and Step 5 (p≈4)
    this.markingGroup.visible = flipFactor > 0.05;

    // 4 Foam pads visibility: visible in Step 1 (overview), and from Step 3 (p>=1.5) onward
    const padsVis = Math.max(isOverview, smoothstep(1.4, 2.0, p));
    this.padMeshes.forEach((m, idx) => {
      const sc = clamp(padsVis * 1.15 - idx * 0.04, 0, 1);
      m.scale.setScalar(Math.max(0.001, sc));
      m.visible = sc > 0.01;
    });

    // Giant 3D Piezo Cutaway (Step 4: p ≈ 3.0)
    const giantVis = smoothstep(2.4, 2.85, p) * (1 - smoothstep(3.2, 3.65, p));
    this.giantPiezoGroup.visible = giantVis > 0.01;
    this.giantPiezoGroup.scale.setScalar(Math.max(0.001, giantVis));
    if (this.giantPiezoGroup.visible) {
      this.giantPiezoGroup.rotation.y = Math.sin(this.clock * 0.9) * 0.25;
    }

    // 8 Underside Piezos & Cyan Epoxy Drops (visible in Overview p=0, and from Step 5 p>=3.4 onward)
    const piezoAssemble = smoothstep(3.45, 4.15, p);
    const piezoVis = Math.max(isOverview, piezoAssemble);

    // Animated 3D Epoxy Syringe orbiting over the 8 piezo zones during Step 5 (p ≈ 3.5..4.3)
    const syringeVis = smoothstep(3.45, 3.75, p) * (1 - smoothstep(4.25, 4.55, p));
    this.syringeGroup.visible = syringeVis > 0.02;
    if (this.syringeGroup.visible) {
      const activePIdx = Math.floor((this.clock * 1.8) % this.piezoCoords.length);
      const targetPc = this.piezoCoords[activePIdx];
      // Since plateRig is flipped by PI around X, world Z of piezo is -targetPc.z and world Y is ~0.68
      this.syringeGroup.position.x = lerp(this.syringeGroup.position.x, targetPc.x, 0.14);
      this.syringeGroup.position.z = lerp(this.syringeGroup.position.z, -targetPc.z, 0.14);
      this.syringeGroup.position.y = 0.72 + Math.sin(this.clock * 6) * 0.04;
    }

    this.piezoUnits.forEach((pGroup, idx) => {
      const localT = clamp((piezoVis - idx * 0.04) / 0.68, 0, 1);
      pGroup.visible = localT > 0.01;
      pGroup.scale.setScalar(Math.max(0.001, localT));
      pGroup.position.y = lerp(-0.34, -0.025, localT);

      const ep = this.epoxyDrops[idx];
      ep.visible = localT > 0.01;
      ep.scale.setScalar(Math.max(0.001, localT));
    });

    // Eye-Level Air-Gap Beam (Step 6: p ≈ 5.0)
    const airBeamVis = smoothstep(4.5, 4.85, p) * (1 - smoothstep(5.35, 5.7, p));
    this.airGapBeam.visible = airBeamVis > 0.02;
    this.airGapBeam.material.opacity = airBeamVis * (0.16 + 0.08 * Math.sin(this.clock * 4));

    // 8× 100 Ohm Resistors & Piezo Wires (Overview or Step 7: p >= 5.5)
    const resVis = Math.max(isOverview, smoothstep(5.45, 6.15, p));
    this.resistorsGroup.visible = resVis > 0.01;
    this.piezoWiresGroup.visible = resVis > 0.15;
    this.resistorUnits.forEach((ru, idx) => {
      const sc = clamp((resVis - idx * 0.03) / 0.75, 0, 1);
      ru.scale.setScalar(Math.max(0.001, sc));
      ru.position.y = lerp(0.32, 0.08, sc);
    });

    // 4× TPA3116D2 Amplifiers & 24V Power Brick (Overview or Step 8: p >= 6.5)
    const ampVis = Math.max(isOverview, smoothstep(6.45, 7.15, p));
    this.ampsGroup.visible = ampVis > 0.01;
    this.ampWiresGroup.visible = ampVis > 0.2;
    this.ampUnits.forEach((au, idx) => {
      const sc = clamp((ampVis - idx * 0.06) / 0.75, 0, 1);
      au.scale.setScalar(Math.max(0.001, sc));
      au.position.y = lerp(0.45, 0, sc);
    });
    this.psuUnit.scale.setScalar(Math.max(0.001, ampVis));

    // 7.1 USB Sound Card & Laptop (Overview or Step 9: p >= 7.5)
    const dacVis = Math.max(isOverview, smoothstep(7.45, 8.15, p));
    this.dacGroup.visible = dacVis > 0.01;
    this.dacWiresGroup.visible = dacVis > 0.25;
    this.dacUnit.scale.setScalar(Math.max(0.001, dacVis));
    this.laptopUnit.scale.setScalar(Math.max(0.001, dacVis));

    // Vertical (±z) Plate Bending Animation (active in Step 1 Overview, Step 6 Eye-Level Cross-Section, and Step 10 Live Sand)
    const bendStrength = Math.max(
      isOverview * 0.45,
      smoothstep(4.5, 5.0, p) * (1 - smoothstep(5.3, 5.7, p)) * 1.15,
      smoothstep(8.3, 8.9, p) * 0.85
    );
    const posAttr = this.plateMesh.geometry.attributes.position;
    const baseArr = this._plateBasePos;
    for (let i = 0; i < posAttr.count; i++) {
      const bx = baseArr[i * 3];
      const by = baseArr[i * 3 + 1];
      const bz = baseArr[i * 3 + 2];
      const wave =
        bendStrength > 0.005
          ? Math.sin(bx * 3.6 + this.clock * 6.5) * Math.cos(bz * 3.6 - this.clock * 5.2) * 0.022 * bendStrength
          : 0;
      posAttr.array[i * 3 + 1] = by + wave;
    }
    posAttr.needsUpdate = true;

    // Glowing Wave Rings around the 8 piezos
    const ringStrength = Math.max(isOverview * 0.65, smoothstep(8.3, 8.9, p));
    this.waveRings.forEach((ring, idx) => {
      if (ringStrength < 0.02) {
        ring.visible = false;
        return;
      }
      ring.visible = true;
      const pulse = ((this.clock * 1.6 + idx * 0.15) % 1.0);
      ring.scale.setScalar(1 + pulse * 0.9);
      ring.material.opacity = (1 - pulse) * 0.65 * ringStrength;
    });

    // 12,000 3D Ballistic Sand Grains (visible in Overview p=0 and Step 10 p>=8.2)
    const sandVis = Math.max(isOverview, smoothstep(8.15, 8.55, p));
    this.sandPoints.visible = sandVis > 0.02 && flipFactor < 0.1;
    if (this.sandPoints.visible) {
      const formT = Math.max(isOverview * 0.94, smoothstep(8.35, 8.92, p));
      const sArr = this.sandGeo.attributes.position.array;
      for (let i = 0; i < this.sandCount; i++) {
        const sx = this.sandScattered[i * 2];
        const sz = this.sandScattered[i * 2 + 1];
        const tx = this.sandTarget3[i * 2];
        const tz = this.sandTarget3[i * 2 + 1];
        const gx = lerp(sx, tx, formT);
        const gz = lerp(sz, tz, formT);
        const jitter = (1 - formT * 0.86) * Math.abs(Math.sin(this.clock * 11 + i * 0.37)) * 0.04;
        sArr[i * 3] = gx;
        sArr[i * 3 + 1] = 0.02 + jitter;
        sArr[i * 3 + 2] = gz;
      }
      this.sandGeo.attributes.position.needsUpdate = true;
    }
  }

  _updateCamera(p) {
    // 10 Camera Keyframes (Centered around the symmetrical workbench so nothing ever clips!)
    const keyframes = [
      // 0: Full Symmetrical Workbench Overview
      { pos: [0.0, 4.15, 5.45], look: [0.0, 0.15, 0.0] },
      // 1: Top-Down Close-up on Flipped Plate Underside Millimeter Grid
      { pos: [0.0, 3.25, 1.55], look: [0.0, 0.55, 0.0] },
      // 2: 4× 2.5cm Green Corner Isolation Pads Close-Up
      { pos: [2.15, 1.25, 2.45], look: [0.0, 0.18, 0.0] },
      // 3: Giant 3D Piezo Disc (+ White Ceramic / - Brass Ring) Cutaway Showcase
      { pos: [0.0, 1.75, 2.45], look: [0.0, 1.02, 0.35] },
      // 4: Flipped Underside Parallel Epoxy Bonding + Animated Syringe
      { pos: [0.0, 2.85, 2.05], look: [0.0, 0.62, 0.0] },
      // 5: Exact Eye-Level Side Cross-Section (20mm Air Gap + ±z Bending!)
      { pos: [0.0, 0.24, 3.05], look: [0.0, 0.21, 0.0] },
      // 6: 8× 100 Ohm 2W Series Protection Resistors & Twisted Pairs
      { pos: [1.65, 2.35, 3.15], look: [0.0, 0.14, 0.35] },
      // 7: Symmetrical 4× TPA3116D2 Stereo Amplifiers & 24V Power Splitter
      { pos: [0.0, 3.65, 4.65], look: [0.0, 0.15, -0.15] },
      // 8: 7.1 USB Sound Card Front Jacks & Laptop
      { pos: [0.65, 2.75, 4.75], look: [0.15, 0.2, 0.35] },
      // 9: Live 3D Ballistic Quartz Sand Forming Digit "3" on Plate
      { pos: [0.0, 2.85, 2.55], look: [0.0, 0.26, 0.0] },
    ];

    let targetPos;
    let targetLook;

    if (this.cameraPreset === 'side') {
      targetPos = new THREE.Vector3(0.0, 0.24, 3.05);
      targetLook = new THREE.Vector3(0.0, 0.21, 0.0);
    } else if (this.cameraPreset === 'under') {
      targetPos = new THREE.Vector3(0.0, 2.85, 2.05);
      targetLook = new THREE.Vector3(0.0, 0.62, 0.0);
    } else if (this.cameraPreset === 'closeup') {
      targetPos = new THREE.Vector3(0.0, 1.75, 2.45);
      targetLook = new THREE.Vector3(0.0, 1.02, 0.35);
    } else if (this.cameraPreset === 'elec') {
      targetPos = new THREE.Vector3(0.0, 3.75, 4.75);
      targetLook = new THREE.Vector3(0.0, 0.15, 0.1);
    } else {
      const i0 = clamp(Math.floor(p), 0, 9);
      const i1 = clamp(i0 + 1, 0, 9);
      const f = smoothstep(0, 1, p - i0);
      const k0 = keyframes[i0];
      const k1 = keyframes[i1];
      targetPos = new THREE.Vector3(
        lerp(k0.pos[0], k1.pos[0], f),
        lerp(k0.pos[1], k1.pos[1], f),
        lerp(k0.pos[2], k1.pos[2], f)
      );
      targetLook = new THREE.Vector3(
        lerp(k0.look[0], k1.look[0], f),
        lerp(k0.look[1], k1.look[1], f),
        lerp(k0.look[2], k1.look[2], f)
      );
    }

    // Auto-Aspect Distance Scaling: guarantees the 3D scene never clips horizontally on narrow viewports!
    const aspect = this.camera.aspect || 1.35;
    const aspectPullback = aspect < 1.28 ? clamp(1.28 / Math.max(0.65, aspect), 1.0, 1.45) : 1.0;

    // Apply user drag orbit offset + aspect pullback
    const offset = targetPos.clone().sub(targetLook).multiplyScalar(aspectPullback);
    const radius = offset.length();
    let theta = Math.atan2(offset.x, offset.z) + this.userYaw;
    let phi = clamp(Math.asin(clamp(offset.y / Math.max(0.001, radius), -0.98, 0.98)) + this.userPitch, -0.1, 1.42);

    const finalPos = new THREE.Vector3(
      targetLook.x + radius * Math.cos(phi) * Math.sin(theta),
      targetLook.y + radius * Math.sin(phi),
      targetLook.z + radius * Math.cos(phi) * Math.cos(theta)
    );

    this.camera.position.lerp(finalPos, 0.12);
    this.cameraLookAt.lerp(targetLook, 0.14);
    this.camera.lookAt(this.cameraLookAt);
  }

  _updateProjectedPins() {
    const w = this.canvasHost.clientWidth || 860;
    const h = this.canvasHost.clientHeight || 640;

    this.pinEls.forEach((p) => {
      const visible = p.def.steps.includes(this.activeStepIdx);
      if (!visible) {
        p.el.style.opacity = '0';
        p.el.style.pointerEvents = 'none';
        return;
      }
      const v = p.def.pos.clone().project(this.camera);
      if (v.z > 1) {
        p.el.style.opacity = '0';
        return;
      }
      // Clamp safely inside the dedicated 3D stage box so pins never touch edges
      const sx = clamp((v.x * 0.5 + 0.5) * w, 110, w - 110);
      const sy = clamp((-v.y * 0.5 + 0.5) * h, 36, h - 36);
      p.el.style.opacity = '1';
      p.el.style.transform = `translate3d(${Math.round(sx)}px, ${Math.round(sy)}px, 0) translate(-50%, -100%)`;
    });
  }

  _animate() {
    if (this.disposed) return;
    if (this.container.classList.contains('hidden')) {
      this._raf = requestAnimationFrame(this._animate);
      return;
    }

    if (this.autoPlay && !this.bomOpen) {
      this.targetProgress += 0.0042;
      if (this.targetProgress >= 9) {
        this.targetProgress = 9;
        this.autoPlay = false;
        this._syncTopButtons();
      }
    }

    this.progress = lerp(this.progress, this.targetProgress, 0.11);
    const pct = clamp((this.progress / 9) * 100, 0, 100);
    if (this.elRailFill) this.elRailFill.style.width = `${pct.toFixed(1)}%`;

    const nearestIdx = clamp(Math.round(this.progress), 0, 9);
    if (nearestIdx !== this.activeStepIdx) {
      this.activeStepIdx = nearestIdx;
      this._syncUI(false);
    }

    this._updateSceneForProgress(this.progress, 1 / 60);
    this._updateCamera(this.progress);
    this.renderer.render(this.scene, this.camera);
    this._updateProjectedPins();

    this._raf = requestAnimationFrame(this._animate);
  }
}
