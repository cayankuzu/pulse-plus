/**
 * PULSE+ — Full-Viewport Wheel-Driven 3D WebGL Hardware Assembly Experience ("Nasıl Kurulur?")
 * --------------------------------------------------------------------------------------------
 * Inspired by Event Horizon & Life of a Photon:
 *   - Locks the viewport (no page scrolling). Mouse wheel / trackpad / touch drag / arrow keys /
 *     vertical progress rail continuously scrub a 3D hardware assembly timeline u in [0, 7].
 *   - Built with Three.js PBR procedural 3D models: 25x25 cm Aluminum 6061 plate with live
 *     Kirchhoff-Love vertex bending, 8 brass/ceramic 35 mm piezo discs, cyan epoxy layers,
 *     4 soft silicone/sponge isolation pads, 8 color-banded 100 Ω 2W resistors, 4 detailed
 *     TPA3116D2 stereo Class-D amplifier PCBs (heatsinks, copper toroids, screw terminals),
 *     24V DC power supply, 4-jack 7.1 USB sound card, 3D laptop, 3D spline cables, and
 *     12,000 3D ballistic sand grains forming digit "3".
 *   - Live 3D-to-2D projected callout pins point directly at parts in 3D space.
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
import { BOM_PARTS } from './assembly-manual.js';

export const BUILD_STAGES = {
  tr: [
    {
      id: 1,
      code: '01 / 08',
      short: 'Parçalar',
      title: '1. Tüm Malzemeleri Masaya Diz (Sıfırdan Kurulum Envanteri)',
      sub: 'Link yok, karmaşa yok: Her parçanın tam teknik adını veya alternatifini herhangi bir elektronikçiden temin edebilirsin.',
      where: 'Masanın üzerinde 7 temel bileşen grubu hazır: (P-01) 25×25 cm × 1.0 mm mat siyah boyalı düz alüminyum plaka, (P-02) 8 adet 35 mm kablolu piezo disk, (P-06) 4 adet 2.5 cm yumuşak sünger/silikon takoz, (P-05) 8 adet 100 Ω 2W koruma direnci + 24V adaptör, (P-04) 4 adet TPA3116D2 stereo amfi kartı, (P-03) 4 jaklı 7.1 USB ses kartı ve (P-07) iki bileşenli epoksi + ince kuvars kumu.',
      why: 'Tek hoparlör düz plakada yalnızca simetrik çiçek desenleri çizebilir. Asimetrik rakamları (0–9) oluşturmak için en az 6 (5.1 ses kartı) veya 8 (7.1 ses kartı) kenar transdüserine ihtiyacımız vardır.',
      tip: 'Sağ üstteki "Tam Malzeme & Alternatif Listesi" butonuna tıklayarak her parçanın alternatiflerini inceleyebilirsin.',
    },
    {
      id: 2,
      code: '02 / 08',
      short: '4 Sünger Ayak',
      title: '2. Dört Yumuşak İzolasyon Takozunu Masaya Yerleştir',
      sub: 'Plaka asla vidalanmaz ve hoparlörlerin üstüne basmaz! Yükü 4 yumuşak takoz taşır.',
      where: '4 adet 25×25×25 mm (2.5 cm yüksekliğinde) yumuşak silikon veya yoğun sünger küpü masanın üzerine, plaka köşelerinden ~3.5 cm içeride kalacak şekilde (18×18 cm kare düzende) koy.',
      why: 'Kirchhoff–Love serbest kenar (free-edge) denkleminin çalışması için plaka kenarlarının havada serbestçe bükülebilmesi şarttır. Ayrıca 2.5 cm takoz yüksekliği, plakanın altına yapışacak piezoların masaya değmeden havada asılı kalmasını sağlar.',
      tip: 'Alternatif: Kalın bulaşık süngeri küpleri, EVA köpük veya yumuşak silikon kapı stoperleri birebir aynı işi görür.',
    },
    {
      id: 3,
      code: '03 / 08',
      short: 'Alttan Piezo',
      title: '3. Plakayı Ters Çevir ve 8 Piezoyu ALT Yüzeye Paralel Yapıştır',
      sub: 'Piezolar yandan vurmaz! Plakanın ALT yüzüne yüz yüze (paralel) epoksiyle yapışır.',
      where: 'Alüminyum plakayı ters çevir (mat siyah yüz alta, parlak metal üste gelsin). 4 kenarın ~1.5 cm içerisine (her kenara 2 adet = toplam 8 piezo; CH1..CH8 konumlarına) ince birer damla iki bileşenli sert epoksi sür ve 35 mm piezo disklerin sarı pirinç yüzeyini metale tam paralel bastır.',
      why: 'Çift taraflı köpük bant KULLANMA! Köpük bant yumuşak olduğu için piezonun titreşimini emer. Sert epoksi ise piezonun radyal genleşme-büzülme kuvvetini %100 metal plakaya iletir. Epoksi kuruyunca plakayı düz çevirip 4 sünger takozun üstüne oturt.',
      tip: 'Alternatif: 35 mm piezo yerine 19–25 mm 4–8 Ω yüzey titreşim hoparlörü (surface exciter) de aynı noktalara alttan yapıştırılabilir.',
    },
    {
      id: 4,
      code: '04 / 08',
      short: 'Yandan Kesit',
      title: '4. Göz Hizası Yandan Kesit: 20 mm Hava Boşluğu ve ±z Dikey Eğilme',
      sub: 'En çok merak edilen soru: Plaka hoparlörün üstüne mi basıyor? Hayır — piezo altta havada asılıdır!',
      where: 'Kamera şimdi tam göz hizasına (yandan kesite) indi: Plakayı yeşil sünger takozlar (25 mm) taşıyor. Plakanın altına yapışık olan ince piezo diskler (0.5 mm) masadan tam 20 mm yukarıda, boşlukta asılı duruyor.',
      why: 'Piezo disk plakanın alt yüzeyine paralel yapışık olduğu halde, elektrik sinyali geldiğinde alt yüzeyi kasıp gevşeterek (bimorf etkisiyle) plakayı trambolin gibi AŞAĞI–YUKARI (±z dikey eksende) büker! Kumun zıplamasını sağlayan şey bu dikey eğilme dalgasıdır.',
      tip: '3B sahneyi farenle sürükleyerek plakanın altındaki 20 mm boşluğu her açıdan inceleyebilirsin.',
    },
    {
      id: 5,
      code: '05 / 08',
      short: '100Ω & Amfiler',
      title: '5. Seri 100 Ω Koruma Dirençlerini ve 4 Stereo Amfiyi Bağla',
      sub: 'Kapasitif piezo koruması ve BTL köprü çıkışlarında hayati kısa devre kuralı.',
      where: 'Her piezonun Kırmızı (+) kablosuna seri olarak 1 adet 100 Ω 2W direnç bağla ve TPA3116D2 stereo amfinin ilgili kanalının (+) klemensine tak. Piezonun Siyah (−) kablosunu doğrudan o kanalın (−) klemensine tak. 4 amfi kartının güç girişlerini 24V DC adaptöre paralel bağla.',
      why: '35 mm piezo diskler akım değil yüksek voltaj salınımı (~18–24 Vpp) ister; bu yüzden 12–24V TPA3116D2 amfi kullanıyoruz. Seri 100 Ω direnç yüksek frekansta piezonun amfiyi kısa devreye düşürmesini engeller. KRİTİK: Amfi çıkışlarının (−) uçlarını asla birbirine veya metal plakaya birleştirme!',
      tip: 'Eğer piezo yerine 4–8 Ω mini titreşim hoparlörü kullanıyorsan 100 Ω dirence gerek yoktur ve 5V PAM8403 mini amfi de kullanabilirsin.',
    },
    {
      id: 6,
      code: '06 / 08',
      short: 'Ses Kartı & PC',
      title: '6. Çok Jaklı 7.1 / 5.1 USB Ses Kartını Amfilere ve Bilgisayara Tak',
      sub: 'Arduino gerekmez! Çok kanallı USB ses kartı zaten faz-senkronlu 8 kanallı profesyonel bir DAC’tır.',
      where: '4 adet 3.5 mm stereo AUX kablosunu USB ses kartının 4 analog çıkış jakından 4 stereo amfinin girişine tak: Jak 1 (Front L/R) → Amfi 1 (CH1, CH2); Jak 2 (Rear L/R) → Amfi 2 (CH3, CH4); Jak 3 (Cen/Sub) → Amfi 3 (CH5, CH6); Jak 4 (Side L/R) → Amfi 4 (CH7, CH8). Ses kartının USB kablosunu bilgisayara tak.',
      why: 'Karşı kenarlardan gelen ses dalgalarının "3" rakamının üzerinde birbirini tam sıfırlayabilmesi (yıkıcı girişim) için tüm kanalların mikrosaniye hassasiyetle aynı saat (sample clock) üzerinden sürülmesi gerekir.',
      tip: 'Önemli: Tek jaklı ucuz "Sanal 7.1" USB çubuklar gerçekte sadece 2 kanaldır; mutlaka üzerinde 3 veya 4 ayrı 3.5 mm jak olan kart kullan.',
    },
    {
      id: 7,
      code: '07 / 08',
      short: 'Kalibrasyon',
      title: '7. Tek Seferlik Gerçek Plaka Kalibrasyonu (60 Saniyelik Eşleme)',
      sub: 'El yapımı epoksi kalınlığı ve metal levha toleranslarını yazılımla sıfırlama.',
      where: 'Windows/macOS ses ayarlarında USB ses kartını "7.1 Surround" seç ve tüm efektleri kapat. Amfi sesini %25’e getir. CH1’den CH8’e her piezoyu sırayla 1 saniye süpürerek (veya Fizik Lab → Tez Verisi → "Kanal CSV" faz matrisini yükleyerek) her kanalın gerçek tepkisini doğrula.',
      why: 'Gerçek hayatta hiçbir metal levha ve el ile sürülen epoksi %100 kusursuz simetrik değildir. Tek seferlik kalibrasyon, gerçek plakanın transfer fonksiyonunu ölçerek dijital ikizle gerçek plakayı birebir kilitler.',
      tip: 'Her kanal tek tek çaldığında plakadan cızırtısız, berrak bir metal çan sesi gelmelidir.',
    },
    {
      id: 8,
      code: '08 / 08',
      short: 'Canlı Çalışma',
      title: '8. Üst Yüzeye Kumu Serp, Rakamı Seç ve Girişimi Canlı İzle!',
      sub: 'Alttaki 8 piezo plakayı ±z yönünde büker; üstteki serbest kum sessiz "3" vadisine akar!',
      where: 'Mat siyah boyalı üst yüzeye bir çay kaşığı kuru beyaz kuvars kumu (veya ince sofra tuzu) ince bir tabaka halinde serp. Bilgisayarda PULSE+ ekranından "3" rakamına tıkla!',
      why: '8 kenar piezo aynı anda 8 farklı frekansı kendi faz açılarıyla çalar. Dalgalar "3" rakamının çizgisi üzerinde ters fazda çarpışıp birbirini sıfırlar (I ≈ 0 sessiz düğüm vadisi). Dış bölgelerde ivme 1g’yi aşar (Γ ≈ 3.2g); zıplayan kum taneleri 1–2 saniyede "3" şekline yerleşir!',
      tip: 'Tebrikler! Artık yukarı/aşağı scroll yaparak veya 3B sahneyi döndürerek tüm sistemi canlı çalışırken inceleyebilirsin.',
    },
  ],
  en: [
    {
      id: 1,
      code: '01 / 08',
      short: 'Inventory',
      title: '1. Lay Out All Parts on the Workbench (Complete Zero-Link Inventory)',
      sub: 'Every component has clear engineering specs and accessible alternatives you can source from any electronics shop.',
      where: 'Seven part groups sit ready on the desk: (P-01) 25×25 cm × 1.0 mm matte-black flat aluminum plate, (P-02) 8× 35 mm wired piezo discs, (P-06) 4× 2.5 cm soft silicone/foam pads, (P-05) 8× 100 Ω 2W resistors + 24V DC supply, (P-04) 4× TPA3116D2 stereo Class-D amps, (P-03) 4-jack 7.1 USB sound card, and (P-07) two-part epoxy + fine silica sand.',
      why: 'A single speaker on a flat plate can only form symmetric Chladni stars. Forming asymmetric digits (0–9) simultaneously requires phase cancellation from at least 6 (5.1 card) or 8 (7.1 card) perimeter transducers.',
      tip: 'Click "Full Parts & Alternatives List" at the top right anytime to view exact substitutes for every component.',
    },
    {
      id: 2,
      code: '02 / 08',
      short: '4 Foam Pads',
      title: '2. Place the Four Soft Isolation Pads on the Desk',
      sub: 'Never screw the plate down, and never rest the plate’s weight on the speakers!',
      where: 'Place four 25×25×25 mm (2.5 cm tall) soft silicone or dense sponge cubes on the desk in an 18×18 cm square (~3.5 cm inset from where the plate corners will sit).',
      why: 'Kirchhoff–Love free-edge bending modes require unconstrained plate edges. The 2.5 cm pad height also ensures the piezos glued underneath hang suspended in air without touching the desk.',
      tip: 'Alternative: Cut kitchen sponge cubes, EVA foam blocks, or soft silicone bumpers work identically.',
    },
    {
      id: 3,
      code: '03 / 08',
      short: 'Underside Piezos',
      title: '3. Flip the Plate & Epoxy 8 Piezos Parallel to the UNDERSIDE',
      sub: 'Piezos do NOT push from the side! They bond flat (face-to-face) against the bottom surface.',
      where: 'Flip the aluminum plate upside down. Apply 8 thin drops of rigid two-part epoxy ~1.5 cm inside the four edges (2 per edge = CH1..CH8) and press the brass face of each 35 mm piezo disc flat and parallel against the underside metal.',
      why: 'NEVER use double-sided foam tape — soft foam absorbs acoustic shear! Rigid two-part epoxy transfers 100% of the piezo’s radial expansion/contraction strain into bending the metal plate. Once cured, flip the plate right-side up onto the 4 foam pads.',
      tip: 'Alternative: 19–25 mm 4–8 Ω coin-type surface exciters can be epoxied to the exact same underside spots.',
    },
    {
      id: 4,
      code: '04 / 08',
      short: 'Cross-Section',
      title: '4. Eye-Level Cross-Section: 20 mm Air Gap & ±z Vertical Bending',
      sub: 'Does the plate rest on the piezos? No — the 4 foam pads carry the plate while piezos hang in mid-air!',
      where: 'The 3D camera drops to exact eye level: the 4 green foam pads (25 mm tall) support the plate. The thin piezo discs (0.5 mm) bonded underneath hang suspended 20 mm above the desk in free air.',
      why: 'Even though each piezo is bonded parallel to the bottom face, applying AC voltage makes it expand and contract radially (bimorph action), bending the plate UP AND DOWN vertically (±z axis) like a trampoline! That vertical acceleration launches the sand.',
      tip: 'Drag the 3D scene with your mouse to inspect the 20 mm underside clearance from any angle.',
    },
    {
      id: 5,
      code: '05 / 08',
      short: '100Ω & Amps',
      title: '5. Wire the Series 100 Ω Protection Resistors & 4 Stereo Amplifiers',
      sub: 'Capacitive load protection and the critical Bridge-Tied Load (BTL) grounding rule.',
      where: 'Wire one 100 Ω 2W resistor in series with each piezo’s Red (+) wire into the TPA3116D2 amp’s (+) terminal. Connect each piezo’s Black (−) wire directly to that channel’s (−) terminal. Connect all 4 amp boards in parallel to the 24V DC power supply.',
      why: '35 mm piezo discs require ~18–24 Vpp voltage swing (hence 12–24V TPA3116D2 amps). The 100 Ω series resistor prevents high-frequency capacitive short-circuit shutdown. CRITICAL: TPA3116D2 outputs are BTL — never tie (−) speaker terminals together or to the metal plate!',
      tip: 'If using 4–8 Ω electromagnetic surface exciters instead of piezos, omit the 100 Ω resistor and use 5V PAM8403 or 12V TPA3116 amps.',
    },
    {
      id: 6,
      code: '06 / 08',
      short: 'Sound Card & PC',
      title: '6. Connect the 4-Jack 7.1 / 5.1 USB Sound Card to Amps & Laptop',
      sub: 'No Arduino needed! A multi-jack USB sound card is already a phase-locked 8-channel 48 kHz DAC.',
      where: 'Connect four 3.5 mm stereo AUX cables from the USB sound card jacks to the 4 stereo amps: Jack 1 (Front L/R) → Amp 1 (CH1, CH2); Jack 2 (Rear L/R) → Amp 2 (CH3, CH4); Jack 3 (Cen/Sub) → Amp 3 (CH5, CH6); Jack 4 (Side L/R) → Amp 4 (CH7, CH8). Plug USB into your laptop.',
      why: 'Destructive wave cancellation along the curve of "3" requires all 8 channels to share a single sample-accurate hardware clock.',
      tip: 'Important: Avoid single-jack "Virtual 7.1" USB sticks (only 2 real channels). Use a true 3-jack (5.1) or 4-jack (7.1) analog USB sound card.',
    },
    {
      id: 7,
      code: '07 / 08',
      short: 'Calibration',
      title: '7. One-Time Real-Plate Calibration (60-Second Phase Lock)',
      sub: 'Compensating hand-applied epoxy thickness and aluminum sheet tolerances.',
      where: 'Set the USB sound card to "7.1 Surround" in OS settings with all audio effects disabled. Set amp gain to ~25%. Sweep CH1 through CH8 one by one (or load the "Channel CSV" complex phase matrix exported from PULSE+ Physics Lab → Thesis Data).',
      why: 'No physical metal sheet or epoxy bond is 100% uniform. A one-time channel sweep locks the solver’s Green’s tensor to your exact physical hardware.',
      tip: 'Each channel should produce a clean, rattle-free metallic chime when pulsed.',
    },
    {
      id: 8,
      code: '08 / 08',
      short: 'Live Sand 3',
      title: '8. Sprinkle Sand, Pick a Digit & Watch Live 3D Wave Interference!',
      sub: 'All 8 underside piezos flex the plate vertically (±z) while sand migrates into the silent "3" valley!',
      where: 'Sprinkle a thin layer of dry white quartz sand (or fine table salt) onto the matte-black top face. Click digit "3" in PULSE+ on your laptop!',
      why: 'Waves from all 8 perimeter piezos collide in opposite phase along the path of "3", creating a zero-vibration nodal valley (I ≈ 0). Everywhere outside shakes above 1g (Γ ≈ 3.2g), bouncing sand grains into a crisp "3" in 1–2 seconds!',
      tip: 'Scroll up/down anytime to scrub the 3D assembly timeline or drag the 3D scene to inspect the vibrating plate.',
    },
  ],
};

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / Math.max(1e-6, edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export class HowToBuild3DController {
  constructor(hostEl, lang = 'tr', onBackToStudio = () => {}) {
    this.hostEl = hostEl;
    this.lang = lang;
    this.onBackToStudio = onBackToStudio;

    this.targetProgress = 0; // continuous [0..7] across 8 stages
    this.progress = 0;
    this.autoPlay = false;
    this.bomOpen = false;
    this.cameraPreset = 'auto'; // 'auto' | 'side' | 'underside' | 'electronics'
    this.clock = 0;
    this.rafId = null;
    this.disposed = false;

    // User orbit offset around current camera target
    this.isDragging = false;
    this.lastPtrX = 0;
    this.lastPtrY = 0;
    this.userYaw = 0;
    this.userPitch = 0;
    this.userZoom = 1;

    this._buildDOM();
    this._initThree();
    this._bindEvents();
    this.setLanguage(this.lang);
    this._loop();
  }

  _buildDOM() {
    this.hostEl.innerHTML = `
      <div class="build3d-viewport" id="build3dViewport">
        <div class="build3d-canvas-host" id="build3dCanvasHost"></div>

        <!-- 3D Projected Callout Pins Layer -->
        <div class="build3d-pins" id="build3dPins"></div>

        <!-- Left Vertical Scroll Progress Rail (Event Horizon / Life of a Photon style) -->
        <aside class="build3d-rail" id="build3dRail" aria-label="Assembly timeline">
          <div class="build3d-rail-head" id="build3dRailLabel">ADIM</div>
          <div class="build3d-rail-track" id="build3dRailTrack">
            <div class="build3d-rail-fill" id="build3dRailFill"></div>
            <div class="build3d-rail-stops" id="build3dRailStops"></div>
          </div>
          <div class="build3d-scroll-hint" id="build3dScrollHint">
            <span class="wheel-icon"><span></span></span>
            <small id="build3dScrollText">Scroll ile ilerlet</small>
          </div>
        </aside>

        <!-- Top Floating Camera Preset & BOM Bar -->
        <div class="build3d-topbar">
          <div class="build3d-cam-pills" id="build3dCamPills">
            <button type="button" class="b3d-cam-btn active" data-cam="auto" id="b3dCamAuto">Akıllı Kamera</button>
            <button type="button" class="b3d-cam-btn" data-cam="side" id="b3dCamSide">Yandan Kesit (Göz Hizası)</button>
            <button type="button" class="b3d-cam-btn" data-cam="underside" id="b3dCamUnder">Alttan Piezo &amp; Epoksi</button>
            <button type="button" class="b3d-cam-btn" data-cam="electronics" id="b3dCamElec">Amfi &amp; Ses Kartı</button>
          </div>

          <div class="build3d-top-actions">
            <button type="button" class="b3d-action-btn" id="btnBuildAutoPlay">
              <span id="buildAutoPlayLabel">Otomatik Oynat</span>
            </button>
            <button type="button" class="b3d-action-btn gold" id="btnToggleBomDrawer">
              <span id="buildBomBtnLabel">Tam Malzeme &amp; Alternatif Listesi (P-01..P-07)</span>
            </button>
          </div>
        </div>

        <!-- Right Floating Step Narrative Dossier Card -->
        <aside class="build3d-card" id="build3dCard">
          <div class="b3d-card-top">
            <span class="b3d-step-badge" id="b3dStepCode">ADIM 01 / 08</span>
            <div class="b3d-step-nav">
              <button type="button" class="b3d-nav-btn" id="btnBuildPrev" title="Previous">←</button>
              <button type="button" class="b3d-nav-btn" id="btnBuildNext" title="Next">→</button>
            </div>
          </div>

          <h2 class="b3d-title" id="b3dTitle"></h2>
          <p class="b3d-sub" id="b3dSub"></p>

          <div class="b3d-section">
            <strong id="b3dWhereHeading">NE NEREYE TAKILIR?</strong>
            <p id="b3dWhereBody"></p>
          </div>

          <div class="b3d-section why">
            <strong id="b3dWhyHeading">NEDEN BÖYLE YAPILIR? (FİZİKSEL SEBEBİ)</strong>
            <p id="b3dWhyBody"></p>
          </div>

          <div class="b3d-tip" id="b3dTip"></div>
        </aside>

        <!-- Slide-In Zero-Link Complete Parts & Alternatives Drawer -->
        <aside class="build3d-bom-drawer hidden" id="build3dBomDrawer" aria-label="Parts and alternatives">
          <div class="b3d-bom-head">
            <div>
              <span class="guide-step" id="b3dBomKicker">SIFIRDAN KURULUM MALZEME LİSTESİ (LİNKSİZ &amp; ALTERNATİFLİ)</span>
              <h3 id="b3dBomTitle">Gereken Tüm Parçalar ve Alternatifleri</h3>
            </div>
            <button type="button" class="icon-btn" id="btnCloseBomDrawer">✕</button>
          </div>
          <div class="b3d-bom-body" id="build3dBomList"></div>
        </aside>
      </div>
    `;

    this.elCanvasHost = this.hostEl.querySelector('#build3dCanvasHost');
    this.elPins = this.hostEl.querySelector('#build3dPins');
    this.elRailTrack = this.hostEl.querySelector('#build3dRailTrack');
    this.elRailFill = this.hostEl.querySelector('#build3dRailFill');
    this.elRailStops = this.hostEl.querySelector('#build3dRailStops');
    this.elStepCode = this.hostEl.querySelector('#b3dStepCode');
    this.elTitle = this.hostEl.querySelector('#b3dTitle');
    this.elSub = this.hostEl.querySelector('#b3dSub');
    this.elWhereHeading = this.hostEl.querySelector('#b3dWhereHeading');
    this.elWhereBody = this.hostEl.querySelector('#b3dWhereBody');
    this.elWhyHeading = this.hostEl.querySelector('#b3dWhyHeading');
    this.elWhyBody = this.hostEl.querySelector('#b3dWhyBody');
    this.elTip = this.hostEl.querySelector('#b3dTip');
    this.elBomDrawer = this.hostEl.querySelector('#build3dBomDrawer');
    this.elBomList = this.hostEl.querySelector('#build3dBomList');
  }

  _initThree() {
    const W = this.elCanvasHost.clientWidth || window.innerWidth;
    const H = this.elCanvasHost.clientHeight || window.innerHeight - 62;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x08080b);
    this.scene.fog = new THREE.FogExp2(0x08080b, 0.025);

    this.camera = new THREE.PerspectiveCamera(40, W / Math.max(1, H), 0.1, 120);
    this.camera.position.set(0, 5.2, 9.2);
    this.camLookTarget = new THREE.Vector3(0, 0.7, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(W, H);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.elCanvasHost.appendChild(this.renderer.domElement);

    // Studio Lighting
    const hemi = new THREE.HemisphereLight(0xfff4d6, 0x181824, 1.15);
    this.scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xfff8e7, 2.2);
    keyLight.position.set(5.5, 9.5, 6.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 28;
    const d = 8.5;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 0.9);
    rimLight.position.set(-7, 4, -6);
    this.scene.add(rimLight);

    const underLight = new THREE.PointLight(0xe8c476, 1.1, 10);
    underLight.position.set(0, 0.22, 1.6);
    this.scene.add(underLight);

    this._build3DModels();
  }

  _build3DModels() {
    // 1. Studio Workbench Table + Calibration Grid
    const deskGeo = new THREE.BoxGeometry(18, 0.3, 12);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x101015,
      roughness: 0.78,
      metalness: 0.15,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.y = -0.15;
    desk.receiveShadow = true;
    this.scene.add(desk);

    const grid = new THREE.GridHelper(16, 32, 0x2c2c38, 0x1a1a22);
    grid.position.y = 0.003;
    this.scene.add(grid);

    // 2. Four Soft Silicone / Foam Isolation Pads (P-06: 0.36 x 0.38 x 0.36 units = 2.5 cm scaled)
    this.foamPads = [];
    const padGeo = new THREE.BoxGeometry(0.38, 0.42, 0.38);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.65,
      metalness: 0.05,
      emissive: 0x064e3b,
      emissiveIntensity: 0.35,
    });
    // Knolling start positions (Step 1) vs Assembled square positions (Step 2+)
    const padTargets = [
      [-1.12, 0.21, -1.12],
      [1.12, 0.21, -1.12],
      [1.12, 0.21, 1.12],
      [-1.12, 0.21, 1.12],
    ];
    padTargets.forEach((tPos, i) => {
      const mesh = new THREE.Mesh(padGeo, padMat.clone());
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this.foamPads.push({
        mesh,
        knollPos: new THREE.Vector3(-4.2 + i * 0.55, 0.21, 1.9),
        targetPos: new THREE.Vector3(...tPos),
      });
    });

    // 3. Rig Group (Aluminum Plate + 8 Underside Piezos + 8 Cyan Epoxy Disks)
    // Allows smoothly flipping the plate 180 deg in Step 3 to show underside piezo bonding!
    this.plateRigGroup = new THREE.Group();
    this.scene.add(this.plateRigGroup);

    // 25x25 cm x 1.0 mm Flat Aluminum Plate (Subdivided 44x44 for live Kirchhoff-Love 3D bending in Step 8!)
    this.plateGeo = new THREE.BoxGeometry(3.2, 0.06, 3.2, 40, 1, 40);
    const posAttr = this.plateGeo.attributes.position;
    this.basePlateY = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      this.basePlateY[i] = posAttr.getY(i);
    }

    // Top face matte-black anodized aluminum; bottom & sides brushed metallic aluminum
    const matTopBlack = new THREE.MeshStandardMaterial({
      color: 0x141418,
      roughness: 0.52,
      metalness: 0.35,
    });
    const matBrushedAl = new THREE.MeshStandardMaterial({
      color: 0xd4d8e2,
      roughness: 0.28,
      metalness: 0.88,
    });
    const matEdgeAl = new THREE.MeshStandardMaterial({
      color: 0xa1a8b8,
      roughness: 0.32,
      metalness: 0.85,
    });
    // BoxGeometry material groups: [+x, -x, +y (top), -y (bottom), +z, -z]
    this.plateMesh = new THREE.Mesh(this.plateGeo, [
      matEdgeAl,
      matEdgeAl,
      matTopBlack,
      matBrushedAl,
      matEdgeAl,
      matEdgeAl,
    ]);
    this.plateMesh.castShadow = true;
    this.plateMesh.receiveShadow = true;
    this.plateRigGroup.add(this.plateMesh);

    // 8 Perimeter Piezo Discs (P-02: 35 mm brass disc + white PZT ceramic center + red/black terminal nub)
    // Mounted on UNDERSIDE (y = -0.048 in plateRigGroup local space!)
    this.piezos = [];
    const piezoLocalCoords = [
      { id: 'CH1', x: -0.68, z: -1.32 },
      { id: 'CH2', x: 0.68, z: -1.32 },
      { id: 'CH3', x: 1.32, z: -0.68 },
      { id: 'CH4', x: 1.32, z: 0.68 },
      { id: 'CH5', x: 0.68, z: 1.32 },
      { id: 'CH6', x: -0.68, z: 1.32 },
      { id: 'CH7', x: -1.32, z: 0.68 },
      { id: 'CH8', x: -1.32, z: -0.68 },
    ];

    const brassGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.022, 32);
    const ceramicGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.026, 32);
    const epoxyGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.012, 24);

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xe8c476,
      roughness: 0.22,
      metalness: 0.92,
    });
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xf4f4f6,
      roughness: 0.4,
      metalness: 0.1,
    });
    const epoxyMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
    });

    piezoLocalCoords.forEach((c, idx) => {
      const pGroup = new THREE.Group();
      const brass = new THREE.Mesh(brassGeo, brassMat.clone());
      const ceramic = new THREE.Mesh(ceramicGeo, ceramicMat);
      ceramic.position.y = -0.004;
      const epoxy = new THREE.Mesh(epoxyGeo, epoxyMat.clone());
      epoxy.position.y = 0.014; // sits between brass face and plate underside!

      // Tiny solder pads (red + / black -)
      const padPlus = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 10, 10),
        new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x7f1d1d })
      );
      padPlus.position.set(0.08, -0.018, 0);
      const padMinus = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 10, 10),
        new THREE.MeshStandardMaterial({ color: 0x27272a })
      );
      padMinus.position.set(-0.08, -0.018, 0);

      pGroup.add(brass, ceramic, epoxy, padPlus, padMinus);
      this.plateRigGroup.add(pGroup);

      // Glowing acoustic wave ring under each piezo (visible in Step 7 & 8)
      const ringGeo = new THREE.RingGeometry(0.18, 0.26, 32);
      ringGeo.rotateX(Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xe8c476,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(c.x, -0.065, c.z);
      this.plateRigGroup.add(ringMesh);

      this.piezos.push({
        id: c.id,
        group: pGroup,
        brass,
        epoxy,
        ringMesh,
        ringMat,
        targetLocal: new THREE.Vector3(c.x, -0.045, c.z),
        knollLocal: new THREE.Vector3(-2.6 + (idx % 4) * 0.62, -0.35, 1.85 + Math.floor(idx / 4) * 0.62),
      });
    });

    // 4. Four Realistic 3D Stereo Class-D Amplifier Boards (P-04: TPA3116D2) + 8x 100 Ω 2W Resistors (P-05)
    this.ampGroup = new THREE.Group();
    this.scene.add(this.ampGroup);
    this.ampBoards = [];
    this.resistorMeshes = [];

    const pcbGeo = new THREE.BoxGeometry(0.85, 0.04, 0.62);
    const pcbMat = new THREE.MeshStandardMaterial({ color: 0x0f5132, roughness: 0.45, metalness: 0.25 });
    const sinkGeo = new THREE.BoxGeometry(0.36, 0.18, 0.28);
    const sinkMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.35, metalness: 0.85 });
    const toroidGeo = new THREE.TorusGeometry(0.085, 0.032, 12, 24);
    toroidGeo.rotateX(Math.PI / 2);
    const toroidMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.3, metalness: 0.88 });
    const termGeo = new THREE.BoxGeometry(0.24, 0.11, 0.12);
    const termMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 });
    const capGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.16, 16);
    const capMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.7 });

    for (let a = 0; a < 4; a++) {
      const bGroup = new THREE.Group();
      const pcb = new THREE.Mesh(pcbGeo, pcbMat);
      pcb.castShadow = true;
      const sink = new THREE.Mesh(sinkGeo, sinkMat);
      sink.position.set(0, 0.11, 0);
      const t1 = new THREE.Mesh(toroidGeo, toroidMat);
      t1.position.set(-0.26, 0.05, -0.14);
      const t2 = new THREE.Mesh(toroidGeo, toroidMat);
      t2.position.set(-0.26, 0.05, 0.14);
      const term = new THREE.Mesh(termGeo, termMat);
      term.position.set(-0.34, 0.07, 0);
      const cap1 = new THREE.Mesh(capGeo, capMat);
      cap1.position.set(0.26, 0.1, -0.15);
      const cap2 = new THREE.Mesh(capGeo, capMat);
      cap2.position.set(0.26, 0.1, 0.15);
      // Volume pot knob
      const knob = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.055, 0.09, 16),
        brassMat
      );
      knob.rotation.z = Math.PI / 2;
      knob.position.set(0.44, 0.06, 0);

      bGroup.add(pcb, sink, t1, t2, term, cap1, cap2, knob);

      // Two 100 Ohm 2W axial resistors per stereo amp (1 per piezo channel)
      for (let ch = 0; ch < 2; ch++) {
        const rGroup = new THREE.Group();
        const body = new THREE.Mesh(
          new THREE.CylinderGeometry(0.032, 0.032, 0.16, 14),
          new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.35 })
        );
        body.rotation.z = Math.PI / 2;
        const lead = new THREE.Mesh(
          new THREE.CylinderGeometry(0.008, 0.008, 0.34, 8),
          matBrushedAl
        );
        lead.rotation.z = Math.PI / 2;
        // Color bands (Brown-Black-Brown-Gold = 100 Ohm)
        const band1 = new THREE.Mesh(
          new THREE.CylinderGeometry(0.034, 0.034, 0.018, 12),
          new THREE.MeshBasicMaterial({ color: 0x78350f })
        );
        band1.rotation.z = Math.PI / 2;
        band1.position.x = -0.04;
        const band2 = new THREE.Mesh(
          new THREE.CylinderGeometry(0.034, 0.034, 0.018, 12),
          new THREE.MeshBasicMaterial({ color: 0x111111 })
        );
        band2.rotation.z = Math.PI / 2;
        band2.position.x = 0;
        const band3 = new THREE.Mesh(
          new THREE.CylinderGeometry(0.034, 0.034, 0.018, 12),
          new THREE.MeshBasicMaterial({ color: 0xe8c476 })
        );
        band3.rotation.z = Math.PI / 2;
        band3.position.x = 0.04;

        rGroup.add(body, lead, band1, band2, band3);
        rGroup.position.set(-0.56, 0.07, ch === 0 ? -0.14 : 0.14);
        bGroup.add(rGroup);
        this.resistorMeshes.push(rGroup);
      }

      const zPos = -1.35 + a * 0.9;
      bGroup.position.set(2.85, 0.02, zPos);
      this.ampGroup.add(bGroup);
      this.ampBoards.push({ group: bGroup, baseZ: zPos });
    }

    // 24V 5A DC Power Adapter Brick
    this.psuMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.28, 0.52),
      new THREE.MeshStandardMaterial({ color: 0x1c1c22, roughness: 0.4, metalness: 0.3 })
    );
    this.psuMesh.position.set(2.85, 0.14, 2.25);
    this.psuMesh.castShadow = true;
    const psuLed = new THREE.Mesh(
      new THREE.SphereGeometry(0.028, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0x34d399 })
    );
    psuLed.position.set(-0.35, 0.15, 0.15);
    this.psuMesh.add(psuLed);
    this.ampGroup.add(this.psuMesh);

    // 5. Multi-Jack 7.1 External USB Sound Card (P-03)
    this.dacGroup = new THREE.Group();
    const dacBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, 0.24, 0.72),
      new THREE.MeshStandardMaterial({ color: 0x272730, roughness: 0.28, metalness: 0.82 })
    );
    dacBody.castShadow = true;
    const dacDial = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 0.08, 24),
      brassMat
    );
    dacDial.position.set(0, 0.15, 0);
    this.dacGroup.add(dacBody, dacDial);

    // 4 physical 3.5 mm stereo output jacks on left side facing amps
    const jackColors = [0x34d399, 0x38bdf8, 0xf59e0b, 0xa855f7];
    for (let j = 0; j < 4; j++) {
      const jack = new THREE.Mesh(
        new THREE.CylinderGeometry(0.036, 0.036, 0.08, 14),
        new THREE.MeshStandardMaterial({ color: jackColors[j], roughness: 0.3 })
      );
      jack.rotation.z = Math.PI / 2;
      jack.position.set(-0.6, 0, -0.24 + j * 0.16);
      this.dacGroup.add(jack);
    }
    this.dacGroup.position.set(4.55, 0.12, -0.2);
    this.scene.add(this.dacGroup);

    // 6. 3D Laptop Running PULSE+ (Right side of workbench)
    this.laptopGroup = new THREE.Group();
    const lapBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.75, 0.06, 1.22),
      new THREE.MeshStandardMaterial({ color: 0x27272f, roughness: 0.3, metalness: 0.8 })
    );
    lapBase.castShadow = true;
    const lapScreenGroup = new THREE.Group();
    lapScreenGroup.position.set(0, 0.03, -0.58);
    lapScreenGroup.rotation.x = -0.22;
    const lapLid = new THREE.Mesh(
      new THREE.BoxGeometry(1.75, 1.12, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x202028, roughness: 0.3, metalness: 0.8 })
    );
    lapLid.position.y = 0.56;
    // Dynamic canvas texture on the 3D laptop screen showing PULSE+ digit "3"!
    const scrCanvas = document.createElement('canvas');
    scrCanvas.width = 256;
    scrCanvas.height = 160;
    const sctx = scrCanvas.getContext('2d');
    sctx.fillStyle = '#09090b';
    sctx.fillRect(0, 0, 256, 160);
    sctx.strokeStyle = '#e8c476';
    sctx.lineWidth = 2;
    sctx.strokeRect(22, 18, 124, 124);
    sctx.fillStyle = '#e8c476';
    sctx.font = 'bold 74px "JetBrains Mono", monospace';
    sctx.fillText('3', 62, 106);
    sctx.fillStyle = '#a1a1aa';
    sctx.font = '600 12px Inter, sans-serif';
    sctx.fillText('PULSE+ · 16 Piezo', 156, 48);
    sctx.fillStyle = '#34d399';
    sctx.fillText('IoU 95.2% · 19×', 156, 72);
    sctx.fillStyle = '#e8c476';
    sctx.fillText('1940 Hz (2,6)', 156, 96);
    const scrTex = new THREE.CanvasTexture(scrCanvas);
    const lapDisplay = new THREE.Mesh(
      new THREE.PlaneGeometry(1.62, 1.0),
      new THREE.MeshBasicMaterial({ map: scrTex })
    );
    lapDisplay.position.set(0, 0.56, 0.022);
    lapScreenGroup.add(lapLid, lapDisplay);
    this.laptopGroup.add(lapBase, lapScreenGroup);
    this.laptopGroup.position.set(4.65, 0.03, -1.95);
    this.laptopGroup.rotation.y = -0.35;
    this.scene.add(this.laptopGroup);

    // 7. 3D Wiring Curves (Piezo Wires -> Resistors/Amps, AUX Cables -> DAC, USB -> Laptop)
    this.piezoWiresGroup = new THREE.Group();
    this.auxWiresGroup = new THREE.Group();
    this.scene.add(this.piezoWiresGroup, this.auxWiresGroup);

    const redWireMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.4,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.35,
    });
    const blkWireMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.5 });

    piezoLocalCoords.forEach((c, idx) => {
      const ampIdx = Math.floor(idx / 2);
      const chOffset = (idx % 2 === 0 ? -0.14 : 0.14);
      const ampZ = -1.35 + ampIdx * 0.9 + chOffset;

      const startPt = new THREE.Vector3(c.x, 0.37, c.z);
      const midPt = new THREE.Vector3((c.x + 2.2) * 0.5, 0.05, (c.z + ampZ) * 0.5);
      const endPt = new THREE.Vector3(2.28, 0.09, ampZ);

      const curvePlus = new THREE.CatmullRomCurve3([startPt, midPt, endPt]);
      const meshPlus = new THREE.Mesh(new THREE.TubeGeometry(curvePlus, 24, 0.014, 8, false), redWireMat);

      const curveMinus = new THREE.CatmullRomCurve3([
        startPt.clone().add(new THREE.Vector3(0.05, 0, 0.04)),
        midPt.clone().add(new THREE.Vector3(0, -0.02, 0.05)),
        endPt.clone().add(new THREE.Vector3(0.18, -0.01, 0.03)),
      ]);
      const meshMinus = new THREE.Mesh(new THREE.TubeGeometry(curveMinus, 24, 0.013, 8, false), blkWireMat);
      this.piezoWiresGroup.add(meshPlus, meshMinus);
    });

    // 4 AUX cables (DAC -> 4 Amps) + 1 USB cable (Laptop -> DAC)
    for (let a = 0; a < 4; a++) {
      const ampZ = -1.35 + a * 0.9;
      const dacZ = -0.2 - 0.24 + a * 0.16;
      const curveAux = new THREE.CatmullRomCurve3([
        new THREE.Vector3(3.95, 0.12, dacZ),
        new THREE.Vector3(3.6, 0.04, (dacZ + ampZ) * 0.5),
        new THREE.Vector3(3.26, 0.08, ampZ),
      ]);
      const auxMesh = new THREE.Mesh(
        new THREE.TubeGeometry(curveAux, 20, 0.016, 8, false),
        new THREE.MeshStandardMaterial({ color: jackColors[a], roughness: 0.35 })
      );
      this.auxWiresGroup.add(auxMesh);
    }
    const usbCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(4.55, 0.12, -0.56),
      new THREE.Vector3(4.62, 0.05, -1.05),
      new THREE.Vector3(4.65, 0.06, -1.45),
    ]);
    const usbMesh = new THREE.Mesh(
      new THREE.TubeGeometry(usbCurve, 18, 0.02, 8, false),
      new THREE.MeshStandardMaterial({ color: 0xe8c476, roughness: 0.3 })
    );
    this.auxWiresGroup.add(usbMesh);

    // 8. 12,000 3D Ballistic Sand Particles on Top of the Plate (Step 8!)
    this.sandCount = 12000;
    const sandGeo = new THREE.BufferGeometry();
    this.sandPos = new Float32Array(this.sandCount * 3);
    this.sandRandomPos = new Float32Array(this.sandCount * 2);
    this.sandTargetPos = new Float32Array(this.sandCount * 2);

    // Precompute points along digit '3' in plate coordinates [-1.45..1.45]
    const pts3 = [];
    for (let t = 0; t < 300; t++) {
      const u = t / 299;
      let px = 0;
      let pz = 0;
      if (u < 0.48) {
        // Top loop of '3'
        const a = lerp(-Math.PI * 0.82, Math.PI * 0.48, u / 0.48);
        px = 0.04 + Math.cos(a) * 0.62;
        pz = -0.52 + Math.sin(a) * 0.48;
      } else {
        // Bottom loop of '3'
        const a = lerp(-Math.PI * 0.48, Math.PI * 0.85, (u - 0.48) / 0.52);
        px = 0.06 + Math.cos(a) * 0.68;
        pz = 0.48 + Math.sin(a) * 0.52;
      }
      pts3.push([px, pz]);
    }

    for (let i = 0; i < this.sandCount; i++) {
      const rx = (Math.random() - 0.5) * 2.86;
      const rz = (Math.random() - 0.5) * 2.86;
      this.sandRandomPos[i * 2] = rx;
      this.sandRandomPos[i * 2 + 1] = rz;

      const p = pts3[i % pts3.length];
      const spread = (Math.random() - 0.5) * 0.13;
      const spread2 = (Math.random() - 0.5) * 0.13;
      this.sandTargetPos[i * 2] = p[0] + spread;
      this.sandTargetPos[i * 2 + 1] = p[1] + spread2;

      this.sandPos[i * 3] = rx;
      this.sandPos[i * 3 + 1] = 0.455;
      this.sandPos[i * 3 + 2] = rz;
    }

    sandGeo.setAttribute('position', new THREE.BufferAttribute(this.sandPos, 3));
    const sandMat = new THREE.PointsMaterial({
      color: 0xf5d996,
      size: 0.028,
      transparent: true,
      opacity: 0,
    });
    this.sandPoints = new THREE.Points(sandGeo, sandMat);
    this.scene.add(this.sandPoints);

    // 9. Build 3D Callout Pin Anchors
    this.pinDefs = [
      {
        id: 'pin_plate',
        pos: new THREE.Vector3(0, 0.52, 0),
        minS: 0,
        maxS: 1.5,
        tr: 'P-01 · 25×25 cm × 1.0 mm Düz Alüminyum Plaka',
        en: 'P-01 · 25×25 cm × 1.0 mm Flat Aluminum Plate',
      },
      {
        id: 'pin_pads',
        pos: new THREE.Vector3(-1.12, 0.22, 1.12),
        minS: 0.7,
        maxS: 3.6,
        tr: 'P-06 · 2.5 cm Yumuşak Sünger Takoz (Serbest Kenar)',
        en: 'P-06 · 2.5 cm Soft Foam Pad (Free-Edge Support)',
      },
      {
        id: 'pin_piezo',
        pos: new THREE.Vector3(-0.68, 0.36, 1.32),
        minS: 1.6,
        maxS: 3.6,
        tr: 'P-02 · 35 mm Piezo + Sert Epoksi (ALT YÜZE PARALEL)',
        en: 'P-02 · 35 mm Piezo + Rigid Epoxy (PARALLEL UNDERSIDE)',
      },
      {
        id: 'pin_gap',
        pos: new THREE.Vector3(0, 0.18, 1.32),
        minS: 2.6,
        maxS: 3.7,
        tr: '20 mm Hava Boşluğu — Piezolar masaya ASLA değmez, plakayı ±z dikey büker!',
        en: '20 mm Air Clearance — Piezos hang in air & bend plate vertically (±z)!',
      },
      {
        id: 'pin_res',
        pos: new THREE.Vector3(2.28, 0.25, -0.45),
        minS: 3.6,
        maxS: 5.5,
        tr: 'P-05 · 100 Ω 2W Seri Direnç (+) & TPA3116D2 BTL Çıkışı (− uçlar birleşmez!)',
        en: 'P-05 · 100 Ω 2W Series Resistor (+) & TPA3116D2 BTL Output (Never short − leads!)',
      },
      {
        id: 'pin_dac',
        pos: new THREE.Vector3(4.55, 0.45, -0.2),
        minS: 4.6,
        maxS: 6.4,
        tr: 'P-03 · 4 Jaklı 7.1 / 5.1 USB Ses Kartı (8 Faz-Senkronlu Kanal)',
        en: 'P-03 · 4-Jack 7.1 / 5.1 USB Sound Card (8 Phase-Locked Channels)',
      },
      {
        id: 'pin_sand',
        pos: new THREE.Vector3(0.15, 0.56, 0.1),
        minS: 6.3,
        maxS: 7.5,
        tr: '8 Eşzamanlı Frekans Girişimi → Sessiz Düğüm Vadisinde (I ≈ 0) "3" Oluşumu',
        en: '8 Simultaneous Frequencies → Sand Settles in Silent Nodal Valley (I ≈ 0) as "3"',
      },
    ];

    this.pinEls = this.pinDefs.map((p) => {
      const el = document.createElement('div');
      el.className = 'b3d-pin hidden';
      el.innerHTML = `<span class="b3d-pin-dot"></span><span class="b3d-pin-txt"></span>`;
      this.elPins.appendChild(el);
      return { def: p, el, txtEl: el.querySelector('.b3d-pin-txt') };
    });
  }

  _bindEvents() {
    // 1. Wheel event anywhere on viewport scrubs the 3D assembly timeline (Page never scrolls!)
    this._onWheel = (e) => {
      // Allow normal scroll inside the BOM drawer when it is open and hovered
      if (this.bomOpen && e.target.closest('#build3dBomDrawer')) return;
      e.preventDefault();
      this.autoPlay = false;
      this._updateAutoPlayBtn();
      const delta = clamp(e.deltaY, -160, 160) * 0.0042;
      this.targetProgress = clamp(this.targetProgress + delta, 0, 7);
    };
    this.hostEl.addEventListener('wheel', this._onWheel, { passive: false });

    // 2. Pointer drag on 3D canvas orbits camera around current focus
    const dom = this.renderer.domElement;
    dom.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.lastPtrX = e.clientX;
      this.lastPtrY = e.clientY;
      dom.setPointerCapture(e.pointerId);
    });
    dom.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastPtrX;
      const dy = e.clientY - this.lastPtrY;
      this.lastPtrX = e.clientX;
      this.lastPtrY = e.clientY;
      this.userYaw = clamp(this.userYaw - dx * 0.007, -1.4, 1.4);
      this.userPitch = clamp(this.userPitch + dy * 0.006, -0.55, 0.65);
    });
    dom.addEventListener('pointerup', () => {
      this.isDragging = false;
    });

    // 3. Prev / Next / AutoPlay / Camera Presets / BOM Drawer
    this.hostEl.querySelector('#btnBuildPrev').addEventListener('click', () => {
      this.autoPlay = false;
      this._updateAutoPlayBtn();
      this.targetProgress = clamp(Math.round(this.targetProgress) - 1, 0, 7);
      this.userYaw = 0;
      this.userPitch = 0;
    });
    this.hostEl.querySelector('#btnBuildNext').addEventListener('click', () => {
      this.autoPlay = false;
      this._updateAutoPlayBtn();
      this.targetProgress = clamp(Math.round(this.targetProgress) + 1, 0, 7);
      this.userYaw = 0;
      this.userPitch = 0;
    });

    this.hostEl.querySelector('#btnBuildAutoPlay').addEventListener('click', () => {
      this.autoPlay = !this.autoPlay;
      if (this.autoPlay && this.targetProgress >= 6.95) {
        this.targetProgress = 0;
      }
      this._updateAutoPlayBtn();
    });

    this.hostEl.querySelectorAll('#build3dCamPills .b3d-cam-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.cameraPreset = btn.dataset.cam || 'auto';
        this.userYaw = 0;
        this.userPitch = 0;
        this.hostEl.querySelectorAll('#build3dCamPills .b3d-cam-btn').forEach((b) => {
          b.classList.toggle('active', b === btn);
        });
      });
    });

    this.hostEl.querySelector('#btnToggleBomDrawer').addEventListener('click', () => {
      this.bomOpen = !this.bomOpen;
      this.elBomDrawer.classList.toggle('hidden', !this.bomOpen);
    });
    this.hostEl.querySelector('#btnCloseBomDrawer').addEventListener('click', () => {
      this.bomOpen = false;
      this.elBomDrawer.classList.add('hidden');
    });

    // Click anywhere on vertical rail track to jump to that progress
    this.elRailTrack.addEventListener('click', (e) => {
      const stopBtn = e.target.closest('[data-stage-idx]');
      if (stopBtn) {
        this.autoPlay = false;
        this._updateAutoPlayBtn();
        this.targetProgress = Number(stopBtn.dataset.stageIdx);
        this.userYaw = 0;
        this.userPitch = 0;
        return;
      }
      const rect = this.elRailTrack.getBoundingClientRect();
      const ratio = clamp((e.clientY - rect.top) / Math.max(1, rect.height), 0, 1);
      this.autoPlay = false;
      this._updateAutoPlayBtn();
      this.targetProgress = ratio * 7;
    });

    // Keyboard Up/Down arrows while in Build view
    this._onKeyDown = (e) => {
      if (this.disposed || this.hostEl.classList.contains('hidden')) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        this.autoPlay = false;
        this._updateAutoPlayBtn();
        this.targetProgress = clamp(Math.round(this.targetProgress) + 1, 0, 7);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        this.autoPlay = false;
        this._updateAutoPlayBtn();
        this.targetProgress = clamp(Math.round(this.targetProgress) - 1, 0, 7);
      }
    };
    window.addEventListener('keydown', this._onKeyDown);

    this._onResize = () => this.resize();
    window.addEventListener('resize', this._onResize);
  }

  resize() {
    if (!this.renderer || !this.elCanvasHost) return;
    const W = this.elCanvasHost.clientWidth || window.innerWidth;
    const H = this.elCanvasHost.clientHeight || window.innerHeight - 62;
    this.camera.aspect = W / Math.max(1, H);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(W, H);
  }

  _updateAutoPlayBtn() {
    const isEn = this.lang === 'en';
    const lbl = this.hostEl.querySelector('#buildAutoPlayLabel');
    const btn = this.hostEl.querySelector('#btnBuildAutoPlay');
    if (lbl) {
      lbl.textContent = this.autoPlay
        ? isEn
          ? '⏸ Pause Tour'
          : '⏸ Turu Durdur'
        : isEn
        ? '▶ Auto Play 3D'
        : '▶ 3B Otomatik Oynat';
    }
    if (btn) btn.classList.toggle('active', this.autoPlay);
  }

  setLanguage(lang = 'tr') {
    this.lang = lang === 'en' ? 'en' : 'tr';
    const isEn = this.lang === 'en';
    const stages = BUILD_STAGES[this.lang];

    this.hostEl.querySelector('#build3dRailLabel').textContent = isEn ? 'STEP' : 'ADIM';
    this.hostEl.querySelector('#build3dScrollText').textContent = isEn ? 'Scroll to assemble' : 'Scroll ile ilerlet';
    this.hostEl.querySelector('#b3dCamAuto').textContent = isEn ? 'Smart Camera' : 'Akıllı Kamera';
    this.hostEl.querySelector('#b3dCamSide').textContent = isEn ? 'Side Cross-Section' : 'Yandan Kesit (Göz Hizası)';
    this.hostEl.querySelector('#b3dCamUnder').textContent = isEn ? 'Underside Piezos' : 'Alttan Piezo & Epoksi';
    this.hostEl.querySelector('#b3dCamElec').textContent = isEn ? 'Amps & Sound Card' : 'Amfi & Ses Kartı';
    this.hostEl.querySelector('#buildBomBtnLabel').textContent = isEn
      ? 'Full Parts & Alternatives (P-01..P-07)'
      : 'Tam Malzeme & Alternatif Listesi (P-01..P-07)';
    this.hostEl.querySelector('#b3dWhereHeading').textContent = isEn
      ? 'HOW & WHERE TO MOUNT IT:'
      : 'NE NEREYE TAKILIR? (ADIM ADIM):';
    this.hostEl.querySelector('#b3dWhyHeading').textContent = isEn
      ? 'WHY? (PHYSICAL REASON):'
      : 'NEDEN BÖYLE YAPILIR? (FİZİKSEL SEBEBİ):';
    this.hostEl.querySelector('#b3dBomKicker').textContent = isEn
      ? 'COMPLETE BILL OF MATERIALS (WITH ALTERNATIVES, ZERO LINKS)'
      : 'SIFIRDAN KURULUM MALZEME LİSTESİ (LİNKSİZ & ALTERNATİFLİ)';
    this.hostEl.querySelector('#b3dBomTitle').textContent = isEn
      ? 'All Required Parts & Compatible Alternatives'
      : 'Gereken Tüm Parçalar ve Alternatifleri';

    this._updateAutoPlayBtn();

    // Render Rail Stops
    this.elRailStops.innerHTML = stages
      .map(
        (s, idx) => `
        <button type="button" class="b3d-rail-stop" data-stage-idx="${idx}" style="top:${(idx / 7) * 100}%">
          <span class="b3d-stop-dot">0${idx + 1}</span>
          <span class="b3d-stop-lbl">${s.short}</span>
        </button>
      `
      )
      .join('');

    // Render BOM List
    const parts = BOM_PARTS[this.lang];
    this.elBomList.innerHTML = parts
      .map(
        (p) => `
        <div class="ikea-part-card">
          <div class="ikea-part-top">
            <span class="ikea-part-code">${p.code}</span>
            <span class="ikea-part-qty">${p.qty}</span>
          </div>
          <strong class="ikea-part-name">${p.name}</strong>
          <p class="ikea-part-spec">${p.spec}</p>
          <p class="ikea-part-alt">${p.alt}</p>
        </div>
      `
      )
      .join('');

    // Update 3D pin labels
    this.pinEls.forEach((p) => {
      p.txtEl.textContent = isEn ? p.def.en : p.def.tr;
    });

    this._lastRenderedStageIdx = -1;
    this._syncHUD();
  }

  _syncHUD() {
    const stages = BUILD_STAGES[this.lang];
    const activeIdx = clamp(Math.round(this.progress), 0, 7);
    const pct = clamp((this.progress / 7) * 100, 0, 100);
    this.elRailFill.style.height = `${pct.toFixed(1)}%`;

    this.elRailStops.querySelectorAll('.b3d-rail-stop').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === activeIdx);
      btn.classList.toggle('passed', idx < activeIdx);
    });

    if (activeIdx !== this._lastRenderedStageIdx) {
      this._lastRenderedStageIdx = activeIdx;
      const st = stages[activeIdx];
      this.elStepCode.textContent = `${this.lang === 'en' ? 'STEP' : 'ADIM'} ${st.code}`;
      this.elTitle.textContent = st.title;
      this.elSub.textContent = st.sub;
      this.elWhereBody.textContent = st.where;
      this.elWhyBody.textContent = st.why;
      this.elTip.textContent = st.tip;
    }
  }

  _update3DScene() {
    const s = this.progress; // continuous 0..7

    // 1. Foam Pads: Knoll (s=0) -> Slide into 18x18 cm square on desk (s=1)
    const padT = smoothstep(0.15, 0.95, s);
    this.foamPads.forEach((p) => {
      p.mesh.position.lerpVectors(p.knollPos, p.targetPos, padT);
    });

    // 2. Plate Rig Position & 180-deg Flip for Underside Piezo Bonding (s in [1..3])
    // At s=0..1: plate sits slightly elevated at y=1.05
    // At s=1.2..2.2 (Step 3): plate flips 180 deg (rotation.z = PI) at y=1.35 so user clearly sees piezos bonding to UNDERSIDE!
    // At s=2.3..3.0 (Step 4): plate flips back to 0 deg and lowers onto the 4 foam pads at y=0.45!
    const flipIn = smoothstep(1.15, 1.75, s);
    const flipOut = smoothstep(2.25, 2.85, s);
    const flipAngle = flipIn * Math.PI - flipOut * Math.PI;
    this.plateRigGroup.rotation.z = flipAngle;

    const liftForFlip = Math.sin(clamp((s - 1.0) / 1.9, 0, 1) * Math.PI) * 0.95;
    const settleOnPads = lerp(0.95, 0.45, smoothstep(0.8, 2.85, s));
    this.plateRigGroup.position.set(0, settleOnPads + liftForFlip, 0);

    // 3. Underside 8 Piezos: move from knoll positions to flush against underside (s in [1.3..2.2])
    const piezoBondT = smoothstep(1.3, 2.15, s);
    this.piezos.forEach((p, idx) => {
      p.group.position.lerpVectors(p.knollLocal, p.targetLocal, piezoBondT);
      p.epoxy.material.opacity = smoothstep(1.2, 1.8, s) * 0.9;

      // Calibration sequential pulse in Step 7 (s in [5.5..6.5]) or simultaneous in Step 8 (s >= 6.5)
      const isCalib = s >= 5.5 && s < 6.5;
      const isLive = s >= 6.5;
      if (isCalib) {
        const activeCh = Math.floor(this.clock * 2.8) % 8;
        const on = activeCh === idx;
        p.ringMat.opacity = on ? 0.85 : 0.1;
        const sc = on ? 1 + 0.45 * Math.sin(this.clock * 18) : 1;
        p.ringMesh.scale.set(sc, sc, sc);
      } else if (isLive) {
        p.ringMat.opacity = 0.55 + 0.35 * Math.sin(this.clock * 14 + idx);
        const sc = 1.1 + 0.25 * Math.sin(this.clock * 14 + idx);
        p.ringMesh.scale.set(sc, sc, sc);
      } else {
        p.ringMat.opacity = 0;
      }
    });

    // 4. Wires visibility:
    // Piezo -> 100 Ohm -> Amp wires appear in Step 5 (s >= 3.5)
    const wire1T = smoothstep(3.4, 4.1, s);
    this.piezoWiresGroup.visible = wire1T > 0.02;
    this.piezoWiresGroup.scale.y = lerp(0.01, 1, wire1T);

    // Sound card -> Amp AUX cables & USB -> Laptop appear in Step 6 (s >= 4.5)
    const wire2T = smoothstep(4.4, 5.1, s);
    this.auxWiresGroup.visible = wire2T > 0.02;
    this.auxWiresGroup.scale.y = lerp(0.01, 1, wire2T);

    // 5. Real 3D Kirchhoff-Love Plate Vertical Bending (±z / Three.js Y) in Step 4, 7, 8!
    const vibStrength =
      s >= 6.3
        ? smoothstep(6.3, 6.8, s) * 0.036
        : s >= 2.7 && s <= 3.7
        ? 0.022
        : 0;
    const posAttr = this.plateGeo.attributes.position;
    if (vibStrength > 0.0005) {
      for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const vz = posAttr.getZ(i);
        const wave =
          Math.cos(vx * 2.1) * Math.cos(vz * 2.1) * Math.sin(this.clock * 11) +
          0.5 * Math.sin(vx * 3.4) * Math.cos(vz * 1.8) * Math.cos(this.clock * 15);
        posAttr.setY(i, this.basePlateY[i] + wave * vibStrength);
      }
      posAttr.needsUpdate = true;
    } else if (this._wasVibrating) {
      for (let i = 0; i < posAttr.count; i++) {
        posAttr.setY(i, this.basePlateY[i]);
      }
      posAttr.needsUpdate = true;
    }
    this._wasVibrating = vibStrength > 0.0005;

    // 6. 12,000 3D Sand Particles (Step 8: s in [6.1..7.0]): rain onto plate and migrate into glowing "3"!
    const sandAppear = smoothstep(6.05, 6.45, s);
    const sandForm3 = smoothstep(6.35, 6.95, s);
    this.sandPoints.material.opacity = sandAppear;
    if (sandAppear > 0.01) {
      const sArr = this.sandPoints.geometry.attributes.position.array;
      for (let i = 0; i < this.sandCount; i++) {
        const rx = this.sandRandomPos[i * 2];
        const rz = this.sandRandomPos[i * 2 + 1];
        const tx = this.sandTargetPos[i * 2];
        const tz = this.sandTargetPos[i * 2 + 1];

        const x = lerp(rx, tx, sandForm3);
        const z = lerp(rz, tz, sandForm3);
        // Unsettled grains hop vertically with the standing wave; settled grains rest quietly inside "3"
        const hop = (1 - sandForm3 * 0.88) * Math.abs(Math.sin(this.clock * 16 + i)) * 0.09;
        sArr[i * 3] = x;
        sArr[i * 3 + 1] = 0.485 + hop;
        sArr[i * 3 + 2] = z;
      }
      this.sandPoints.geometry.attributes.position.needsUpdate = true;
    }

    // 7. Smooth Camera Choreography + User Orbit Offset
    let desiredCamPos = new THREE.Vector3();
    let desiredLook = new THREE.Vector3();

    if (this.cameraPreset === 'side') {
      // Exact eye-level side cross-section showing the 20 mm air gap under the piezos!
      desiredCamPos.set(0, 0.36, 4.35);
      desiredLook.set(0, 0.32, 0);
    } else if (this.cameraPreset === 'underside') {
      // Looking directly at the underside piezos & cyan epoxy
      desiredCamPos.set(0, -1.9, 3.4);
      desiredLook.set(0, 0.38, 0);
    } else if (this.cameraPreset === 'electronics') {
      // Focused on 100 Ohm resistors, 4x TPA3116D2 amps, 7.1 USB sound card & Laptop
      desiredCamPos.set(3.4, 3.1, 3.6);
      desiredLook.set(3.4, 0.2, -0.3);
    } else {
      // 'auto': Cinematic stage-driven camera keyframes across s in [0..7]
      const keyframes = [
        { pos: new THREE.Vector3(0.8, 5.4, 7.8), look: new THREE.Vector3(0.8, 0.3, 0.2) }, // 0: Overview inventory
        { pos: new THREE.Vector3(-2.1, 2.1, 4.4), look: new THREE.Vector3(0, 0.25, 0) }, // 1: 4 Foam pads
        { pos: new THREE.Vector3(0, 2.5, 4.3), look: new THREE.Vector3(0, 1.1, 0) }, // 2: Flipped plate underside piezos
        { pos: new THREE.Vector3(0.15, 0.35, 4.15), look: new THREE.Vector3(0, 0.33, 0) }, // 3: Eye-level Side Cross-Section (20mm gap!)
        { pos: new THREE.Vector3(2.3, 2.3, 3.3), look: new THREE.Vector3(2.35, 0.18, 0.1) }, // 4: 100 Ohm resistors & 4 TPA3116 amps
        { pos: new THREE.Vector3(4.1, 2.6, 2.8), look: new THREE.Vector3(3.8, 0.2, -0.6) }, // 5: 7.1 Sound Card + AUX + Laptop
        { pos: new THREE.Vector3(1.1, 2.8, 5.2), look: new THREE.Vector3(0.8, 0.35, 0) }, // 6: 60s Calibration sweep
        { pos: new THREE.Vector3(0.4, 3.9, 4.4), look: new THREE.Vector3(0.3, 0.45, 0) }, // 7: Live Sand '3' + Laptop
      ];
      const i0 = clamp(Math.floor(s), 0, 7);
      const i1 = clamp(i0 + 1, 0, 7);
      const frac = smoothstep(0, 1, s - i0);
      desiredCamPos.lerpVectors(keyframes[i0].pos, keyframes[i1].pos, frac);
      desiredLook.lerpVectors(keyframes[i0].look, keyframes[i1].look, frac);
    }

    // Apply user drag orbit offset around desiredLook
    const offset = desiredCamPos.clone().sub(desiredLook);
    const spherical = new THREE.Spherical().setFromVector3(offset);
    spherical.theta += this.userYaw;
    spherical.phi = clamp(spherical.phi - this.userPitch, 0.12, Math.PI - 0.15);
    spherical.radius *= this.userZoom;
    offset.setFromSpherical(spherical);
    desiredCamPos.copy(desiredLook).add(offset);

    this.camera.position.lerp(desiredCamPos, 0.1);
    this.camLookTarget.lerp(desiredLook, 0.12);
    this.camera.lookAt(this.camLookTarget);

    // 8. Project 3D Callout Pins onto 2D Screen
    const W = this.elCanvasHost.clientWidth || window.innerWidth;
    const H = this.elCanvasHost.clientHeight || window.innerHeight - 62;
    this.pinEls.forEach(({ def, el }) => {
      const visible = s >= def.minS && s <= def.maxS;
      if (!visible) {
        el.classList.add('hidden');
        return;
      }
      const v = def.pos.clone().project(this.camera);
      if (v.z > 1) {
        el.classList.add('hidden');
        return;
      }
      const x = (v.x * 0.5 + 0.5) * W;
      const y = (-v.y * 0.5 + 0.5) * H;
      el.classList.remove('hidden');
      el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
    });
  }

  _loop() {
    if (this.disposed) return;
    this.rafId = requestAnimationFrame(() => this._loop());
    if (this.hostEl.classList.contains('hidden')) return;

    this.clock += 0.016;
    if (this.autoPlay) {
      this.targetProgress += 0.0045;
      if (this.targetProgress >= 7) {
        this.targetProgress = 7;
        this.autoPlay = false;
        this._updateAutoPlayBtn();
      }
    }

    this.progress += (this.targetProgress - this.progress) * 0.09;
    this._syncHUD();
    this._update3DScene();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.hostEl.removeEventListener('wheel', this._onWheel);
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('resize', this._onResize);
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
