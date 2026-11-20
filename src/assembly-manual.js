/**
 * PULSE+ — AAA IKEA-Style Interactive Hardware Assembly Manual & 60 FPS Blueprint Animator
 * ----------------------------------------------------------------------------------------
 * Scroll-driven + step-clickable + multi-angle (3D Isometric | Side Cross-Section | Underside Wiring)
 * technical blueprint showing exactly how to build the real physical Chladni plate rig from scratch.
 * Zero external shopping links — provides exact engineering specs and accessible part alternatives.
 */

export const BOM_PARTS = {
  tr: [
    {
      code: 'P-01',
      qty: '1×',
      name: 'Düz Metal Rezonans Plakası (25×25 cm × 1.0 mm)',
      spec: 'Alüminyum 6061-T6 veya 1050 serisi düz, kesiksiz levha. Üst yüzü kum kontrastı için ince mat siyah akrilik sprey boyayla boyanır.',
      alt: 'Alternatifler: 1.0–1.2 mm Pirinç C260 levha (daha tok ve pes rezonans), 1.0 mm Paslanmaz Çelik 304 levha veya 3 mm Döküm Akrilik (PMMA) / %100 doluluklu 3D baskı PLA plaka.',
    },
    {
      code: 'P-02',
      qty: '8× (veya 16×)',
      name: '35 mm Kablolu Piezo Disk Transdüser',
      spec: 'Pirinç disk tabanlı, ~0.4 mm inceliğinde piezoelektrik seramik eleman (hazır kırmızı/siyah kablolu). Plakanın ALT yüzüne paralel yapıştırılır.',
      alt: 'Alternatifler: 19–25 mm 4 Ω / 8 Ω Yüzey Titreşim Hoparlörü (Surface Exciter / Rezonatör Hoparlör, 3W–5W — daha güçlü düşük frekans genliği üretir) veya 27 mm Piezo Disk.',
    },
    {
      code: 'P-03',
      qty: '1×',
      name: 'Çok Jaklı Gerçek Analog USB Ses Kartı (7.1 veya 5.1)',
      spec: 'Üzerinde 4 ayrı 3.5 mm stereo çıkış jakı (Front, Rear, Center/Sub, Side) bulunan gerçek 8 kanallı 7.1 harici USB ses kartı.',
      alt: 'Alternatifler: 3 jaklı CM6206 çipsetli 5.1 Harici USB Ses Kartı (6 bağımsız kanal = 6 piezo ile %82 netlik) veya 8 çıkışlı stüdyo ses kartı. (Not: Tek jaklı "Sanal 7.1" USB bellek tipi adaptörler sadece 2 kanaldır, kullanılmaz.)',
    },
    {
      code: 'P-04',
      qty: '4× (veya 3×)',
      name: 'Stereo Class-D Mini Amplifikatör Kartı (12V–24V DC)',
      spec: 'TPA3116D2 2×50W Stereo dijital amfi modülü. Her kart 2 piezo kanalını (Sol ve Sağ) bağımsız sürer; piezoların ihtiyaç duyduğu ~18–24 Vpp gerilim salınımını sağlar.',
      alt: 'Alternatifler: TPA3118 / TDA7492P (12–24V DC) stereo amfi kartları. (Eğer piezo yerine 4–8 Ω mini titreşim hoparlörü kullanacaksan 5V USB beslemeli PAM8403 2×3W veya PAM8610 2×10W mini amfi kartları da doğrudan çalışır.)',
    },
    {
      code: 'P-05',
      qty: '8× + 1×',
      name: '100 Ω 2W Koruma Direnci & 24V 3A–5A DC Güç Kaynağı',
      spec: 'Her piezonun (+) kablosuna seri bağlanan 100 Ω 2W metal film/taş direnç (yüksek frekansta kapasitif kısa devreyi önler) + tüm amfileri paralel besleyen 24V DC adaptör.',
      alt: 'Alternatifler: 47 Ω – 150 Ω (1W–2W) seri direnç; güç kaynağı olarak 12V–19V (3A–5A) eski dizüstü bilgisayar adaptörü veya ayarlı laboratuvar güç kaynağı.',
    },
    {
      code: 'P-06',
      qty: '4×',
      name: 'Yumuşak İzolasyon Takozu (25×25×25 mm)',
      spec: 'Plakayı masadan 2.5 cm yukarıda tutan yumuşak silikon veya yoğun sünger küpler. Plaka kenarlarının serbestçe bükülmesini sağlar ve alttaki piezoların masaya değmesini önler.',
      alt: 'Alternatifler: Kalın bulaşık süngeri küpleri, EVA köpük bloklar, yumuşak akustik izolasyon süngeri veya yumuşak silikon kapı stoperleri.',
    },
    {
      code: 'P-07',
      qty: '1 Set',
      name: 'İki Bileşenli Epoksi, 4× Stereo AUX Kablo & Beyaz Kum',
      spec: 'Titreşimi kayıpsız ileten sert iki bileşenli epoksi yapıştırıcı + 4 adet 3.5 mm stereo erkek-erkek ses kablosu + 0.2–0.4 mm kuru beyaz kuvars/silika kumu.',
      alt: 'Alternatifler: Yapıştırıcı olarak siyanoakrilat (Japon yapıştırıcısı + aktivatör) — Çift taraflı köpük bant KULLANMA (titreşimi yutar!). Kum yerine ince elenmiş sofra tuzu veya irmik.',
    },
  ],
  en: [
    {
      code: 'P-01',
      qty: '1×',
      name: 'Flat Metal Resonance Plate (25×25 cm × 1.0 mm)',
      spec: 'Uncut Aluminum 6061-T6 or 1050 flat sheet. Spray-paint the top face matte black so golden/white sand grains pop with high visual contrast.',
      alt: 'Alternatives: 1.0–1.2 mm Brass C260 sheet (warmer, lower resonant pitch), 1.0 mm Stainless Steel 304 sheet, or 3 mm Cast Acrylic (PMMA) / 100%-infill 3D-printed PLA plate.',
    },
    {
      code: 'P-02',
      qty: '8× (or 16×)',
      name: '35 mm Pre-Wired Piezo Disc Transducers',
      spec: 'Brass-backed ~0.4 mm thin piezoelectric ceramic discs with soldered red/black leads. Bonded flat (parallel) to the UNDERSIDE perimeter of the plate.',
      alt: 'Alternatives: 19–25 mm 4 Ω / 8 Ω Coin-Type Surface Exciters / Vibration Speakers (3W–5W — stronger low-frequency displacement) or 27 mm Piezo Discs.',
    },
    {
      code: 'P-03',
      qty: '1×',
      name: 'Multi-Jack True Analog USB Sound Card (7.1 or 5.1)',
      spec: 'External 7.1 USB sound card featuring 4 physical 3.5 mm stereo output jacks (Front, Rear, Center/Sub, Side = 8 independent phase-locked DAC channels).',
      alt: 'Alternatives: 3-jack CM6206 5.1 External USB Sound Card (6 independent channels = 6 piezos, ~82% IoU) or 8-output studio audio interface. (Avoid single-jack "Virtual 7.1" thumb-drive adapters — they only have 2 physical channels.)',
    },
    {
      code: 'P-04',
      qty: '4× (or 3×)',
      name: 'Stereo Class-D Mini Amplifier Boards (12V–24V DC)',
      spec: 'TPA3116D2 2×50W Stereo Class-D amp boards. Each board drives 2 piezo channels (L & R) with the ~18–24 Vpp voltage swing required by capacitive piezo discs.',
      alt: 'Alternatives: TPA3118 / TDA7492P (12–24V DC) stereo boards. (If using 4–8 Ω electromagnetic surface exciters instead of piezos, 5V USB-powered PAM8403 2×3W or PAM8610 2×10W mini amps also work directly.)',
    },
    {
      code: 'P-05',
      qty: '8× + 1×',
      name: '100 Ω 2W Series Protection Resistors & 24V 3A–5A DC Supply',
      spec: 'One 100 Ω 2W metal-film/cement resistor wired in series with each piezo (+) lead (prevents high-frequency capacitive shorting) + one 24V DC power adapter feeding all amp boards in parallel.',
      alt: 'Alternatives: 47 Ω – 150 Ω (1W–2W) series resistors; 12V–19V (3A–5A) laptop power brick or benchtop DC supply.',
    },
    {
      code: 'P-06',
      qty: '4×',
      name: 'Soft Isolation Support Pads (25×25×25 mm)',
      spec: '2.5 cm tall soft silicone or dense foam cubes supporting the plate so edges flex freely and underside piezos hang suspended in air without touching the desk.',
      alt: 'Alternatives: Cut kitchen sponge cubes, EVA foam blocks, soft acoustic foam, or soft silicone furniture bumpers.',
    },
    {
      code: 'P-07',
      qty: '1 Set',
      name: 'Two-Part Epoxy, 4× Stereo AUX Cables & Fine Silica Sand',
      spec: 'Rigid two-part epoxy adhesive (transmits acoustic shear/bending without loss) + 4× 3.5 mm male-to-male stereo cables + 0.2–0.4 mm dry white quartz/silica sand.',
      alt: 'Alternatives: Cyanoacrylate superglue + activator — NEVER use double-sided foam tape (it absorbs vibration!). Fine table salt or semolina works great instead of quartz sand.',
    },
  ],
};

export const ASSEMBLY_STEPS = {
  tr: [
    {
      step: '01',
      title: 'Masa Üzerine 4 Yumuşak İzolasyon Takozunu Yerleştir',
      badge: 'P-06 · Serbest Sınır Koşulu',
      what: '4 adet 2.5 cm yüksekliğindeki yumuşak sünger/silikon takozu masanın üzerine, plakanın köşelerinden ~3.5 cm içeride kalacak şekilde (18×18 cm kare düzende) yerleştir.',
      why: 'Plakayı mengene veya vidayla sabitlersen kenarlar kilitlenir ve Kirchhoff–Love serbest kenar dalgaları bozulur. Ayrıca 2.5 cm yükseklik, plakanın altına yapışacak piezoların masaya çarpm 않고 havada serbest kalmasını sağlar.',
      check: 'Kontrol: Takozlar aynı boyda (2.5 cm) ve yumuşak olmalı.',
    },
    {
      step: '02',
      title: 'Piezoları Plakanın ALT Yüzüne Paralel Olarak Epoksiyle Yapıştır',
      badge: 'P-01 + P-02 · Alttan Paralel Montaj',
      what: 'Metal plakayı ters çevir. Alt yüzeyin 4 kenarına (kenardan 1.5 cm içeride; her kenara 2 adet = 8 Piezo veya her kenara 4 adet = 16 Piezo) zımpara ile hafif pürüz aç. 35 mm piezo disklerin sarı pirinç yüzeyini ince bir tabaka iki bileşenli epoksiyle plakanın ALT yüzüne tam paralel (yüz yüze) yapıştır.',
      why: 'Piezolar plakaya yandan vurmaz! Plakanın altına yapışan piezo disk genişleyip daraldıkça metali trambolin gibi AŞAĞI–YUKARI (±z ekseninde) büker. Köpük bant kullanırsan titreşim süngerde kaybolur; sert epoksi kuvveti %100 metale aktarır.',
      check: 'Kontrol: Epoksi kürleştikten sonra plakayı düz çevirip 4 sünger takozun üstüne bırak. Piezolar altta havada asılı kalmalı, masaya ASLA değmemeli!',
    },
    {
      step: '03',
      title: '100 Ω Koruma Dirençlerini ve Stereo Amfileri Bağla',
      badge: 'P-04 + P-05 · BTL Köprü Uyarısı',
      what: 'Her piezonun kırmızı (+) kablosuna seri olarak bir adet 100 Ω 2W direnç lehimle (veya klemensle bağla) ve TPA3116D2 amfinin ilgili kanalının (+) çıkışına tak. Piezonun siyah (−) kablosunu ise doğrudan o kanalın (−) çıkışına tak. Tüm amfi kartlarının güç girişlerini 24V DC adaptöre paralel bağla.',
      why: 'Piezo diskler kapasitif yüktür; yüksek frekanslarda (4–6 kHz) dirençleri çok düşer. Seri 100 Ω direnç amfinin aşırı akım korumasını tetiklemesini önler. KRİTİK: TPA3116D2 çıkışları BTL (köprü) tipindedir — farklı kanalların (−) uçlarını birbirine veya metal plakaya BİRLEŞTİRME!',
      check: 'Kontrol: Multimetre ile piezo kabloları ile çıplak alüminyum plaka arasında kısa devre olmadığını doğrula.',
    },
    {
      step: '04',
      title: 'Çok Jaklı USB Ses Kartını Amfilere ve Bilgisayara Bağla',
      badge: 'P-03 + P-07 · Faz-Senkronlu 8 Kanal',
      what: '3.5 mm stereo AUX kablolarını USB ses kartının çıkışlarından amfi girişlerine sırayla tak: Jak 1 (Front L/R) → Amfi 1 (CH1 Üst-Sol, CH2 Üst-Sağ); Jak 2 (Rear L/R) → Amfi 2 (CH3 Sağ-Üst, CH4 Sağ-Alt); Jak 3 (Cen/Sub) → Amfi 3 (CH5 Alt-Sağ, CH6 Alt-Sol); Jak 4 (Side L/R) → Amfi 4 (CH7 Sol-Alt, CH8 Sol-Üst). USB kablosunu bilgisayara tak.',
      why: '8 piezonun aynı anda milisaniyenin binde biri hassasiyetle (faz farklarıyla) sürülebilmesi için tek bir çok kanallı ses kartı saati (clock) şarttır. Böylece Arduino’ya hiç gerek kalmadan 48 kHz stüdyo kalitesinde 8 bağımsız dalga üretilir.',
      check: 'Kontrol: İşletim sistemi ses ayarlarından USB ses kartını "7.1 Surround" (veya 6 piezo için "5.1 Surround") olarak seç ve tüm ses efektlerini (Dolby/EQ) kapat.',
    },
    {
      step: '05',
      title: 'Tek Seferlik Plaka Kalibrasyonu ve Faz Eşleme (60 Saniye)',
      badge: 'Kalibrasyon · Gerçek Metal Uyumu',
      what: 'Amfi ses düğmelerini %25 seviyesine aç. Her kanala (CH1..CH8) sırayla 1 saniyelik test frekansı gönderip plakanın gerçek tepkisini ölç (veya Fizik Lab → Tez Verisi içindeki "Kanal CSV" tablosundaki genlik ve faz açılarını çok kanallı ses sürücüsüne yükle).',
      why: 'Gerçek hayatta her piezonun epoksi kalınlığı ve alüminyum levhanın haddeleme yönü %5–10 farklılık gösterir. Tek seferlik kalibrasyon bu farkı sıfırlar ve simülasyondaki düğüm çizgilerini gerçek plakaya birebir kilitler.',
      check: 'Kontrol: Tek tek her kanal test edildiğinde plakadan temiz, cızırtısız bir metal tınısı gelmeli.',
    },
    {
      step: '06',
      title: 'Kumu Serp, Rakamı Seç ve Dalga Girişimini Canlı İzle!',
      badge: 'Canlı Çalışma · ±z Eğilme Dalgaları',
      what: 'Mat siyah üst yüzeye bir çay kaşığı kuru beyaz kuvars kumu (veya ince tuz) ince bir tabaka halinde serp. PULSE+ ekranında "3" rakamına tıkla. Alttaki 8/16 piezo aynı anda 8 farklı frekansı kendi faz açılarıyla çalar.',
      why: 'Karşı kenarlardan gelen eğilme dalgaları tam "3" rakamının çizgisi üzerinde ters fazda çarpışıp birbirini sıfırlar (I ≈ 0 sessiz vadi). Plakanın geri kalanında ivme yerçekimini aşar (Γ > 1g); zıplayan kum taneleri 1–2 saniye içinde sessiz "3" vadisine toplanır!',
      check: 'Kontrol: Kum çok az zıplıyorsa amfi kazancını (Γ ivmesini) hafifçe artır; kum plaka dışına sıçrıyorsa biraz kıs.',
    },
  ],
  en: [
    {
      step: '01',
      title: 'Place the 4 Soft Isolation Pads on the Desk',
      badge: 'P-06 · Free-Edge Boundary Condition',
      what: 'Place the four 2.5 cm tall soft silicone/sponge cubes on a flat desk in an ~18×18 cm square (~3.5 cm inset from where the plate corners will sit).',
      why: 'Clamping or screwing the plate locks its edges and destroys Kirchhoff–Love free-edge bending modes. The 2.5 cm elevation also guarantees that the piezos glued underneath hang freely in air without touching the desk.',
      check: 'Check: All 4 pads are level (2.5 cm tall) and compliant.',
    },
    {
      step: '02',
      title: 'Epoxy the Piezo Discs Parallel to the UNDERSIDE of the Plate',
      badge: 'P-01 + P-02 · Flush Underside Mounting',
      what: 'Flip the aluminum plate upside down. Lightly sand the perimeter (~1.5 cm from each edge: 2 per edge = 8 Piezos, or 4 per edge = 16 Piezos). Bond the brass face of each 35 mm piezo disc flush (parallel) to the UNDERSIDE using a thin layer of rigid two-part epoxy.',
      why: 'Piezos do NOT push horizontally from the side! Bonded parallel underneath, each piezo expands and contracts radially, bending the metal plate UP AND DOWN vertically (±z flexural waves) like a trampoline. Never use foam tape — rigid epoxy transfers 100% of bending strain.',
      check: 'Check: Once cured, flip the plate right-side up onto the 4 foam pads. Every piezo hangs suspended underneath with ~20 mm air clearance above the desk!',
    },
    {
      step: '03',
      title: 'Wire the 100 Ω Series Protection Resistors & Stereo Amplifiers',
      badge: 'P-04 + P-05 · BTL Bridge Warning',
      what: 'Solder or clamp one 100 Ω 2W resistor in series with each piezo’s red (+) wire into the TPA3116D2 amp’s (+) terminal. Connect the piezo’s black (−) wire directly to that channel’s (−) terminal. Power all amp boards in parallel from the 24V DC supply.',
      why: 'Piezo discs are capacitive loads whose impedance drops sharply at 4–6 kHz; the 100 Ω series resistor prevents amplifier over-current shutdown. CRITICAL: TPA3116D2 outputs are Bridge-Tied Load (BTL) — NEVER tie different (−) speaker terminals together or to the metal plate!',
      check: 'Check: Verify with a multimeter that neither piezo lead is shorted to the bare aluminum plate.',
    },
    {
      step: '04',
      title: 'Connect the Multi-Jack USB Sound Card to Amps & PC',
      badge: 'P-03 + P-07 · Phase-Locked 8-Channel DAC',
      what: 'Plug four 3.5 mm stereo AUX cables from the sound card analog outputs into the 4 stereo amps: Jack 1 (Front L/R) → Amp 1 (CH1 Top-L, CH2 Top-R); Jack 2 (Rear L/R) → Amp 2 (CH3 Right-T, CH4 Right-B); Jack 3 (Cen/Sub) → Amp 3 (CH5 Bot-R, CH6 Bot-L); Jack 4 (Side L/R) → Amp 4 (CH7 Left-B, CH8 Left-T). Plug USB into your PC.',
      why: 'Driving 8 piezos with exact phase cancellation requires a single shared hardware sample clock. One multi-channel USB sound card acts as an 8-channel 48 kHz phase-synchronized DAC — no Arduino required.',
      check: 'Check: Set the USB audio device to "7.1 Surround" (or "5.1" for 6 piezos) in OS sound settings and disable all audio enhancements/EQ.',
    },
    {
      step: '05',
      title: 'Run One-Time Real-Plate Calibration & Phase Sync (60 Seconds)',
      badge: 'Calibration · Compensating Glue & Metal Tolerances',
      what: 'Set amp volume knobs to ~25%. Pulse each channel (CH1..CH8) briefly to verify clean acoustic coupling, or load the per-channel amplitudes and phases exported from PULSE+ (Physics Lab → Thesis Data → "Channel CSV").',
      why: 'Real aluminum plates and hand-applied epoxy layers have 5–10% physical tolerances. A one-time impulse/sweep calibration locks the digital twin’s Green’s tensor to your exact physical plate.',
      check: 'Check: Each channel produces a crisp, rattle-free metallic tone.',
    },
    {
      step: '06',
      title: 'Sprinkle Sand, Pick a Digit & Watch Live Wave Interference!',
      badge: 'Live Operation · ±z Flexural Standing Waves',
      what: 'Sprinkle a thin, even layer of dry white quartz sand (or fine table salt) across the matte-black top surface. Click digit "3" in PULSE+. All 8/16 underside piezos fire 8 simultaneous frequencies at their solved phase angles.',
      why: 'Bending waves from opposite edges collide along the path of "3" in opposite phase and cancel to dead silence (I ≈ 0 nodal valley). Everywhere outside shakes above 1g (Γ > 1), bouncing sand grains into the calm "3" valley within 1–2 seconds!',
      check: 'Check: If sand barely hops, slightly raise amp gain (Γ); if grains bounce off the rim, lower gain slightly.',
    },
  ],
};

export function renderAssemblyManualHTML(lang = 'tr') {
  const isEn = lang === 'en';
  const parts = BOM_PARTS[isEn ? 'en' : 'tr'];
  const steps = ASSEMBLY_STEPS[isEn ? 'en' : 'tr'];

  const bomHtml = parts
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

  const stepsHtml = steps
    .map(
      (s, idx) => `
      <article class="ikea-step-card ${idx === 0 ? 'active' : ''}" data-assembly-step="${idx}">
        <div class="ikea-step-header">
          <span class="ikea-step-num">${isEn ? 'STEP' : 'ADIM'} ${s.step}</span>
          <span class="ikea-step-badge">${s.badge}</span>
        </div>
        <h3 class="ikea-step-title">${s.title}</h3>
        <div class="ikea-step-block">
          <strong>${isEn ? 'HOW TO DO IT:' : 'NE YAPILIR?'}</strong>
          <p>${s.what}</p>
        </div>
        <div class="ikea-step-block why">
          <strong>${isEn ? 'WHY? (PHYSICS REASON):' : 'NEDEN? (FİZİKSEL SEBEBİ):'}</strong>
          <p>${s.why}</p>
        </div>
        <div class="ikea-step-check">${s.check}</div>
      </article>
    `
    )
    .join('');

  return `
    <div class="ikea-manual-wrap" id="ikeaManualRoot">
      <div class="ikea-intro-banner">
        <div>
          <span class="guide-step">${isEn ? 'IKEA-STYLE STEP-BY-STEP HARDWARE CATALOG' : 'IKEA TARZI ADIM ADIM DONANIM KURULUM KATALOĞU'}</span>
          <h3>${isEn ? 'Complete Parts List (With Alternatives) & Interactive 3D / Cross-Section Assembly' : 'Tam Malzeme Listesi (Alternatifleriyle) & İnteraktif 3B / Yandan Kesit Montaj Şeması'}</h3>
          <p>${
            isEn
              ? 'Scroll down through the 6 assembly cards (or click any step / camera angle). The technical blueprint animates how the foam pads, underside parallel piezos, 100 Ω resistors, amps, and sound card come together.'
              : 'Aşağıdaki 6 montaj adımını kaydırarak oku (veya istediğin adıma ve kamera açısına tıkla). Teknik şema; sünger takozların, alttan paralel yapışan piezoların, 100 Ω dirençlerin, amfilerin ve ses kartının nasıl birleştiğini canlı canlandırır.'
          }</p>
        </div>
      </div>

      <!-- Complete Zero-Link BOM Grid with Alternatives -->
      <div class="ikea-bom-grid">${bomHtml}</div>

      <!-- Sticky Interactive Blueprint Canvas + Scrollable Step Cards -->
      <div class="ikea-workbench">
        <div class="ikea-stage-sticky">
          <div class="ikea-stage-topbar">
            <div class="ikea-step-pills" id="ikeaStepPills" role="tablist" aria-label="Assembly steps">
              ${steps
                .map(
                  (s, idx) =>
                    `<button type="button" class="ikea-pill ${idx === 0 ? 'active' : ''}" data-goto-step="${idx}">${s.step}</button>`
                )
                .join('')}
            </div>

            <div class="ikea-view-tabs" id="ikeaViewTabs" role="group" aria-label="Camera angle">
              <button type="button" class="ikea-view-btn active" data-cam="split">${isEn ? '3D + Cross-Section' : '3B + Yandan Kesit'}</button>
              <button type="button" class="ikea-view-btn" data-cam="side">${isEn ? 'Side Cross-Section' : 'Tam Yandan Kesit'}</button>
              <button type="button" class="ikea-view-btn" data-cam="bottom">${isEn ? 'Underside & Wiring' : 'Alt Yüz & Kablolama'}</button>
            </div>
          </div>

          <div class="ikea-canvas-frame">
            <canvas id="ikeaBlueprintCanvas" width="760" height="440"></canvas>
          </div>

          <div class="ikea-stage-caption" id="ikeaStageCaption">
            ${
              isEn
                ? 'KEY GEOMETRY: Piezos are bonded parallel to the UNDERSIDE of the plate and hang 20 mm above the desk on 4 soft pads — flexing the plate UP & DOWN (±z).'
                : 'KRİTİK GEOMETRİ: Piezolar plakanın ALT YÜZÜNE paralel yapışır ve 4 sünger takoz sayesinde masadan 20 mm yukarıda havada asılı kalır; plakayı AŞAĞI–YUKARI (±z) büker.'
            }
          </div>
        </div>

        <div class="ikea-steps-column" id="ikeaStepsColumn">
          ${stepsHtml}
        </div>
      </div>
    </div>
  `;
}

// -------------------- 60 FPS Interactive Blueprint Canvas Animator --------------------
let activeManualCleanup = null;

export function mountAssemblyManualAnimator(rootEl, lang = 'tr') {
  if (activeManualCleanup) {
    activeManualCleanup();
    activeManualCleanup = null;
  }
  if (!rootEl) return;

  const canvas = rootEl.querySelector('#ikeaBlueprintCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const isEn = lang === 'en';

  let targetStep = 0;
  let smoothStep = 0;
  let camMode = 'split'; // 'split' | 'side' | 'bottom'
  let rafId = null;
  let tClock = 0;

  const stepCards = Array.from(rootEl.querySelectorAll('.ikea-step-card'));
  const stepPills = Array.from(rootEl.querySelectorAll('.ikea-pill'));
  const viewBtns = Array.from(rootEl.querySelectorAll('.ikea-view-btn'));

  function setActiveStep(idx, scrollCard = false) {
    targetStep = Math.max(0, Math.min(5, idx));
    stepCards.forEach((c, i) => c.classList.toggle('active', i === targetStep));
    stepPills.forEach((p, i) => p.classList.toggle('active', i === targetStep));
    if (scrollCard && stepCards[targetStep]) {
      stepCards[targetStep].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  stepPills.forEach((btn) => {
    btn.addEventListener('click', () => setActiveStep(Number(btn.dataset.gotoStep), true));
  });

  stepCards.forEach((card, idx) => {
    card.addEventListener('click', () => setActiveStep(idx, false));
  });

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      camMode = btn.dataset.cam || 'split';
      viewBtns.forEach((b) => b.classList.toggle('active', b === btn));
    });
  });

  // Scroll-driven IntersectionObserver so scrolling down naturally advances the blueprint!
  const observer = new IntersectionObserver(
    (entries) => {
      let bestEntry = null;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        }
      }
      if (bestEntry) {
        const idx = Number(bestEntry.target.dataset.assemblyStep);
        if (!Number.isNaN(idx)) setActiveStep(idx, false);
      }
    },
    { threshold: [0.35, 0.6, 0.85], rootMargin: '-15% 0px -25% 0px' }
  );

  stepCards.forEach((c) => observer.observe(c));

  // Isometric projection helper
  function iso(x, y, z, cx, cy, scale = 1) {
    const sx = (x - y) * 0.866 * scale + cx;
    const sy = (x + y) * 0.46 * scale - z * scale + cy;
    return { x: sx, y: sy };
  }

  function drawIsoBox(cx, cy, scale, x0, y0, z0, wx, wy, wz, topCol, leftCol, rightCol, strokeCol = 'rgba(255,255,255,0.22)') {
    const p000 = iso(x0, y0, z0, cx, cy, scale);
    const p100 = iso(x0 + wx, y0, z0, cx, cy, scale);
    const p110 = iso(x0 + wx, y0 + wy, z0, cx, cy, scale);
    const p010 = iso(x0, y0 + wy, z0, cx, cy, scale);

    const p001 = iso(x0, y0, z0 + wz, cx, cy, scale);
    const p101 = iso(x0 + wx, y0, z0 + wz, cx, cy, scale);
    const p111 = iso(x0 + wx, y0 + wy, z0 + wz, cx, cy, scale);
    const p011 = iso(x0, y0 + wy, z0 + wz, cx, cy, scale);

    // Left front face (y = y0 + wy)
    ctx.fillStyle = leftCol;
    ctx.beginPath();
    ctx.moveTo(p010.x, p010.y);
    ctx.lineTo(p110.x, p110.y);
    ctx.lineTo(p111.x, p111.y);
    ctx.lineTo(p011.x, p011.y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = strokeCol;
    ctx.stroke();

    // Right front face (x = x0 + wx)
    ctx.fillStyle = rightCol;
    ctx.beginPath();
    ctx.moveTo(p100.x, p100.y);
    ctx.lineTo(p110.x, p110.y);
    ctx.lineTo(p111.x, p111.y);
    ctx.lineTo(p101.x, p101.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Top face (z = z0 + wz)
    ctx.fillStyle = topCol;
    ctx.beginPath();
    ctx.moveTo(p001.x, p001.y);
    ctx.lineTo(p101.x, p101.y);
    ctx.lineTo(p111.x, p111.y);
    ctx.lineTo(p011.x, p011.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // 8 perimeter piezo normalized coordinates (-1..1)
  const PIEZO_COORDS = [
    { id: 'CH1', x: -0.45, y: -0.84, edge: 'T1' },
    { id: 'CH2', x: 0.45, y: -0.84, edge: 'T2' },
    { id: 'CH3', x: 0.84, y: -0.45, edge: 'R1' },
    { id: 'CH4', x: 0.84, y: 0.45, edge: 'R2' },
    { id: 'CH5', x: 0.45, y: 0.84, edge: 'B1' },
    { id: 'CH6', x: -0.45, y: 0.84, edge: 'B2' },
    { id: 'CH7', x: -0.84, y: 0.45, edge: 'L1' },
    { id: 'CH8', x: -0.84, y: -0.45, edge: 'L2' },
  ];

  function drawBlueprintGrid(W, H) {
    ctx.fillStyle = '#0b0b0e';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const step = 24;
    ctx.beginPath();
    for (let x = 0; x < W; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
    }
    for (let y = 0; y < H; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
    }
    ctx.stroke();
  }

  // Draws the crucial EYE-LEVEL SIDE CROSS-SECTION so nobody ever confuses vertical vs horizontal mounting!
  function drawSideCrossSection(x0, y0, w, h, sProg, clock) {
    ctx.save();
    ctx.fillStyle = 'rgba(18, 18, 23, 0.92)';
    ctx.strokeStyle = 'rgba(232, 196, 118, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x0, y0, w, h, 10);
    ctx.fill();
    ctx.stroke();

    // Header badge
    ctx.fillStyle = '#e8c476';
    ctx.font = '600 10.5px "JetBrains Mono", monospace';
    ctx.fillText(
      isEn ? 'SIDE CROSS-SECTION (EYE LEVEL)' : 'YANDAN KESİT (GÖZ HİZASI — ALTTAN BAĞLANTI)',
      x0 + 12,
      y0 + 18
    );

    const deskY = y0 + h - 26;
    const leftX = x0 + 28;
    const rightX = x0 + w - 28;
    const plateW = rightX - leftX;

    // 1. Desk surface
    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x0 + 14, deskY);
    ctx.lineTo(x0 + w - 14, deskY);
    ctx.stroke();

    ctx.fillStyle = '#71717a';
    ctx.font = '500 10px Inter, sans-serif';
    ctx.fillText(isEn ? 'Desk Surface' : 'Masa Yüzeyi', x0 + 16, deskY + 15);

    // 2. Soft Foam Pads (2.5 cm tall)
    const padH = 38;
    const padW = 28;
    const pad1X = leftX + plateW * 0.14;
    const pad2X = leftX + plateW * 0.86 - padW;
    const padY = deskY - padH;

    ctx.fillStyle = 'rgba(52, 211, 153, 0.18)';
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 1.4;
    ctx.fillRect(pad1X, padY, padW, padH);
    ctx.strokeRect(pad1X, padY, padW, padH);
    ctx.fillRect(pad2X, padY, padW, padH);
    ctx.strokeRect(pad2X, padY, padW, padH);

    ctx.fillStyle = '#6ee7b7';
    ctx.font = '500 9.5px "JetBrains Mono", monospace';
    ctx.fillText(isEn ? 'Foam Pad (2.5cm)' : 'Sünger Takoz (2.5cm)', pad1X - 10, deskY + 15);

    // 3. Aluminum Plate (explodes slightly up in step 1-2, sits on pads in step >=2, bends in step 5-6)
    const explodeLift = sProg < 1 ? (1 - sProg) * 26 : 0;
    const basePlateY = padY - 6 - explodeLift;
    const isVibrating = sProg >= 3.6;
    const vibAmp = isVibrating ? Math.min(1, sProg - 3.5) * 4.5 : 0;

    // Draw bending plate cross-section
    ctx.strokeStyle = '#e4e4e7';
    ctx.lineWidth = 5;
    ctx.beginPath();
    const segs = 40;
    for (let i = 0; i <= segs; i++) {
      const u = i / segs;
      const px = leftX + u * plateW;
      // Standing wave with 3 quiet nodes
      const waveZ = vibAmp * Math.sin(clock * 7.5) * Math.cos(u * Math.PI * 3);
      const py = basePlateY + waveZ;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 4. Underside Parallel Piezos (bonded flush to bottom of plate near edges!)
    if (sProg >= 0.4) {
      const piezoAlpha = Math.min(1, (sProg - 0.4) * 1.4);
      const piezoDrop = sProg < 1.3 ? Math.max(0, (1.3 - sProg) * 16) : 0;
      const pPositions = [0.06, 0.94];

      pPositions.forEach((u, idx) => {
        const px = leftX + u * plateW;
        const waveZ = vibAmp * Math.sin(clock * 7.5) * Math.cos(u * Math.PI * 3);
        const py = basePlateY + 4 + waveZ + piezoDrop;

        // Thin epoxy layer (cyan line)
        ctx.fillStyle = `rgba(56, 189, 248, ${piezoAlpha})`;
        ctx.fillRect(px - 16, py - 1, 32, 2);

        // Brass piezo disc (parallel flat against underside!)
        ctx.fillStyle = `rgba(232, 196, 118, ${piezoAlpha})`;
        ctx.strokeStyle = `rgba(255, 230, 160, ${piezoAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.fillRect(px - 16, py + 1, 32, 6);
        ctx.strokeRect(px - 16, py + 1, 32, 6);

        // Vertical bending force arrows (±z)
        if (sProg >= 1.0) {
          const arrowY = py + 15;
          ctx.strokeStyle = '#e8c476';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(px, arrowY - 6);
          ctx.lineTo(px, arrowY + 8);
          // Arrowheads up & down
          ctx.moveTo(px - 3, arrowY - 3);
          ctx.lineTo(px, arrowY - 6);
          ctx.lineTo(px + 3, arrowY - 3);
          ctx.moveTo(px - 3, arrowY + 5);
          ctx.lineTo(px, arrowY + 8);
          ctx.lineTo(px + 3, arrowY + 5);
          ctx.stroke();
        }

        // Label first piezo
        if (idx === 0) {
          ctx.fillStyle = '#e8c476';
          ctx.font = '600 9.5px "JetBrains Mono", monospace';
          ctx.fillText(
            isEn ? 'Piezo (Underside, Parallel)' : 'Piezo (Alttan Paralel Yapışık)',
            px - 14,
            py + 28
          );
          ctx.fillStyle = '#a1a1aa';
          ctx.font = '500 9px Inter, sans-serif';
          ctx.fillText(
            isEn ? '↑↓ Bends plate vertically · 20mm air gap to desk' : '↑↓ Plakayı dikey büker · Masaya değmez (20mm boşluk)',
            px - 14,
            py + 40
          );
        }
      });
    }

    // 5. Sand grains on top surface (Step 6: jumping off antinodes into the 3 quiet nodes!)
    if (sProg >= 4.2) {
      const nodesU = [1 / 6, 3 / 6, 5 / 6];
      ctx.fillStyle = '#f5d996';
      for (let g = 0; g < 36; g++) {
        const nodeTarget = nodesU[g % 3];
        const spread = ((g * 17) % 11 - 5) * 0.006;
        const u = nodeTarget + spread;
        const px = leftX + u * plateW;
        const py = basePlateY - 4 - (g % 3) * 1.8;
        ctx.beginPath();
        ctx.arc(px, py, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#f5d996';
      ctx.font = '600 9.5px Inter, sans-serif';
      ctx.fillText(
        isEn ? 'Sand settles in quiet nodes (I ≈ 0)' : 'Kum sessiz düğüm çukurlarında (I ≈ 0) toplanır',
        leftX + plateW * 0.28,
        basePlateY - 14
      );
    }

    ctx.restore();
  }

  function renderFrame() {
    tClock += 0.016;
    smoothStep += (targetStep - smoothStep) * 0.12;

    const W = canvas.width;
    const H = canvas.height;
    drawBlueprintGrid(W, H);

    if (camMode === 'side') {
      // Full-canvas detailed Side Cross-Section
      drawSideCrossSection(24, 24, W - 48, H - 48, smoothStep, tClock);
      rafId = requestAnimationFrame(renderFrame);
      return;
    }

    if (camMode === 'bottom') {
      // Underside Schematic Plan View: 8 Piezos + 100 Ohm Resistors + 4 Amps + 7.1 Sound Card + PC
      drawUndersideWiringView(W, H, smoothStep, tClock);
      rafId = requestAnimationFrame(renderFrame);
      return;
    }

    // DEFAULT 'split': Left = 3D Isometric Exploded/Assembled Rig + Electronics, Right/Bottom = Side Cross-Section!
    const isoCx = 215;
    const isoCy = 225;
    const scale = 1.05;

    // Title
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 10.5px "JetBrains Mono", monospace';
    ctx.fillText(
      isEn ? '3D ISOMETRIC ASSEMBLY VIEW' : '3B İZOMETRİK MONTAJ GÖRÜNÜMÜ',
      20,
      24
    );

    // 1. Desk base plane
    drawIsoBox(
      isoCx,
      isoCy,
      scale,
      -105,
      -105,
      -6,
      210,
      210,
      6,
      'rgba(24, 24, 30, 0.9)',
      'rgba(16, 16, 20, 0.9)',
      'rgba(12, 12, 16, 0.9)',
      'rgba(255,255,255,0.1)'
    );

    // 2. 4 Soft Silicone / Foam Pads (Step 01+)
    const padCoords = [
      [-65, -65],
      [41, -65],
      [41, 41],
      [-65, 41],
    ];
    padCoords.forEach(([px, py]) => {
      drawIsoBox(
        isoCx,
        isoCy,
        scale,
        px,
        py,
        0,
        24,
        24,
        22,
        'rgba(52, 211, 153, 0.32)',
        'rgba(16, 185, 129, 0.24)',
        'rgba(5, 150, 105, 0.24)',
        '#34d399'
      );
    });

    // 3. Underside 8 Piezo Discs (Step 02+: hover between pads and plate when exploding, lock onto underside of plate)
    const plateLift = smoothStep < 1.2 ? Math.max(0, (1.2 - smoothStep) * 52) : 0;
    const plateZ = 22 + plateLift;
    const piezoLift = smoothStep < 1.2 ? Math.max(0, (1.2 - smoothStep) * 26) : 0;
    const piezoZ = 19 + piezoLift;

    if (smoothStep >= 0.3) {
      PIEZO_COORDS.forEach((p, idx) => {
        const pt = iso(p.x * 86, p.y * 86, piezoZ, isoCx, isoCy, scale);
        const pulse =
          smoothStep >= 3.8
            ? 0.5 + 0.5 * Math.sin(tClock * 8 + idx * 0.9)
            : 0.7;

        // Vertical dashed alignment guide during step 1-2
        if (smoothStep < 1.5) {
          const ptTop = iso(p.x * 86, p.y * 86, plateZ, isoCx, isoCy, scale);
          ctx.strokeStyle = 'rgba(232, 196, 118, 0.35)';
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(ptTop.x, ptTop.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Piezo brass disc
        ctx.fillStyle = `rgba(232, 196, 118, ${0.45 + 0.45 * pulse})`;
        ctx.strokeStyle = '#ffe5a3';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(pt.x, pt.y, 10, 5.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    }

    // 4. 25x25 cm Flat Aluminum Plate
    drawIsoBox(
      isoCx,
      isoCy,
      scale,
      -88,
      -88,
      plateZ,
      176,
      176,
      4,
      'rgba(22, 22, 27, 0.93)',
      'rgba(161, 161, 170, 0.45)',
      'rgba(113, 113, 122, 0.45)',
      'rgba(255, 255, 255, 0.35)'
    );

    // Ghost projection of the 8 underside piezos visible through the plate rim
    if (smoothStep >= 0.8) {
      PIEZO_COORDS.forEach((p, idx) => {
        const pt = iso(p.x * 80, p.y * 80, plateZ + 4.5, isoCx, isoCy, scale);
        const activeChan =
          Math.abs(smoothStep - 4) < 0.6
            ? Math.floor(tClock * 3) % 8 === idx
            : smoothStep >= 4.5;
        ctx.strokeStyle = activeChan ? '#e8c476' : 'rgba(232, 196, 118, 0.45)';
        ctx.lineWidth = activeChan ? 1.8 : 1;
        ctx.beginPath();
        ctx.ellipse(pt.x, pt.y, 8, 4.5, 0, 0, Math.PI * 2);
        ctx.stroke();
      });
    }

    // 5. Step 6: Live Sand Digit '3' Forming on Top of the Plate!
    if (smoothStep >= 4.3) {
      const sandAlpha = Math.min(1, (smoothStep - 4.3) * 1.5);
      ctx.save();
      ctx.globalAlpha = sandAlpha;
      // Draw glowing golden sand grains along digit '3' curve on the isometric top face
      const stroke3 = [
        [-28, -42], [-10, -50], [16, -46], [32, -30], [26, -10], [4, -2], [-12, -2],
        [8, -2], [30, 8], [36, 28], [22, 46], [-4, 50], [-28, 42], [-36, 28],
      ];
      ctx.fillStyle = '#f5d996';
      for (let s = 0; s < stroke3.length - 1; s++) {
        const [x1, y1] = stroke3[s];
        const [x2, y2] = stroke3[s + 1];
        for (let k = 0; k < 14; k++) {
          const u = k / 14;
          const jitterX = Math.sin(s * 17 + k * 5) * 3.5;
          const jitterY = Math.cos(s * 11 + k * 7) * 3.5;
          const pt = iso(x1 + (x2 - x1) * u + jitterX, y1 + (y2 - y1) * u + jitterY, plateZ + 5, isoCx, isoCy, scale);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    // 6. Electronics Chain on Right Half (Steps 3, 4, 5, 6)
    drawElectronicsChain(425, 18, W - 440, 195, smoothStep, tClock);

    // 7. Side Cross-Section on Bottom-Right Half (Always visible in split view!)
    drawSideCrossSection(425, 224, W - 440, 200, smoothStep, tClock);

    rafId = requestAnimationFrame(renderFrame);
  }

  function drawElectronicsChain(x0, y0, w, h, sProg, clock) {
    ctx.save();
    ctx.fillStyle = 'rgba(18, 18, 23, 0.92)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x0, y0, w, h, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#e8c476';
    ctx.font = '600 10.5px "JetBrains Mono", monospace';
    ctx.fillText(
      isEn ? 'SIGNAL & POWER CHAIN (NO ARDUINO)' : 'ELEKTRONİK SİNYAL ZİNCİRİ (ARDUINO GEREKMEZ)',
      x0 + 12,
      y0 + 18
    );

    // 4 blocks: PC -> 7.1 USB DAC -> 4x TPA3116D2 Amps (24V) -> 8x 100Ω Resistors -> Piezos
    const boxes = [
      {
        x: x0 + 14,
        y: y0 + 34,
        w: 76,
        h: 52,
        title: 'PC / Laptop',
        sub: 'PULSE+ Web',
        active: sProg >= 2.5,
      },
      {
        x: x0 + 114,
        y: y0 + 34,
        w: 92,
        h: 52,
        title: isEn ? '7.1 / 5.1 USB' : '7.1 / 5.1 USB',
        sub: isEn ? '4-Jack Sound Card' : '4 Jaklı Ses Kartı',
        active: sProg >= 2.5,
      },
      {
        x: x0 + 228,
        y: y0 + 34,
        w: 84,
        h: 52,
        title: '4× TPA3116',
        sub: '12–24V Stereo',
        active: sProg >= 1.6,
      },
    ];

    boxes.forEach((b) => {
      ctx.fillStyle = b.active ? 'rgba(232, 196, 118, 0.11)' : 'rgba(255,255,255,0.03)';
      ctx.strokeStyle = b.active ? '#e8c476' : 'rgba(255,255,255,0.14)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(b.x, b.y, b.w, b.h, 7);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = b.active ? '#f4f4f5' : '#71717a';
      ctx.font = '600 10px Inter, sans-serif';
      ctx.fillText(b.title, b.x + 8, b.y + 22);
      ctx.fillStyle = b.active ? '#e8c476' : '#52525b';
      ctx.font = '500 9px "JetBrains Mono", monospace';
      ctx.fillText(b.sub, b.x + 8, b.y + 38);
    });

    // Connections between PC -> USB Sound Card -> Amps
    ctx.strokeStyle = sProg >= 2.5 ? '#34d399' : 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(x0 + 90, y0 + 60);
    ctx.lineTo(x0 + 114, y0 + 60);
    // 4 stereo AUX lines from sound card to 4 amps
    for (let j = 0; j < 4; j++) {
      const ly = y0 + 42 + j * 11;
      ctx.moveTo(x0 + 206, ly);
      ctx.lineTo(x0 + 228, ly);
    }
    ctx.stroke();

    // Series 100 Ohm resistor block + BTL warning box below
    const resY = y0 + 104;
    const resActive = sProg >= 1.6;
    ctx.fillStyle = resActive ? 'rgba(52, 211, 153, 0.09)' : 'rgba(255,255,255,0.02)';
    ctx.strokeStyle = resActive ? 'rgba(52, 211, 153, 0.45)' : 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.roundRect(x0 + 14, resY, w - 28, 76, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = resActive ? '#6ee7b7' : '#71717a';
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.fillText(
      isEn
        ? 'AMP OUT (+) ──[ 100 Ω 2W ]──► PIEZO (+) Red'
        : 'AMFİ OUT (+) ──[ 100 Ω 2W Direnç ]──► PİEZO (+) Kırmızı',
      x0 + 24,
      resY + 22
    );
    ctx.fillStyle = '#d4d4d8';
    ctx.fillText(
      isEn
        ? 'AMP OUT (−) ─────────────────► PIEZO (−) Black'
        : 'AMFİ OUT (−) ────────────────────────► PİEZO (−) Siyah',
      x0 + 24,
      resY + 40
    );
    ctx.fillStyle = '#e8c476';
    ctx.font = '500 9.5px Inter, sans-serif';
    ctx.fillText(
      isEn
        ? 'BTL Rule: Keep each channel’s (−) wire isolated; never common-ground to plate!'
        : 'BTL Kuralı: Çıkışların (−) uçlarını birbirine veya metal plakaya BİRLEŞTİRME!',
      x0 + 24,
      resY + 62
    );

    ctx.restore();
  }

  function drawUndersideWiringView(W, H, sProg, clock) {
    ctx.save();
    ctx.fillStyle = '#e8c476';
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillText(
      isEn
        ? 'UNDERSIDE PLAN VIEW — EXACT PIEZO COORDINATES & 4-AMP WIRING'
        : 'ALT YÜZEY PLANI — PİEZO KONUMLARI (CM) VE 4 STEREO AMFİ DAĞILIMI',
      24,
      26
    );

    const cx = 210;
    const cy = 230;
    const plateSize = 290;
    const half = plateSize / 2;

    // Plate underside square
    ctx.fillStyle = '#141419';
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 2;
    ctx.fillRect(cx - half, cy - half, plateSize, plateSize);
    ctx.strokeRect(cx - half, cy - half, plateSize, plateSize);

    // 4 Corner Foam Pads (dashed emerald squares)
    const padOff = 92;
    const padS = 36;
    [
      [-padOff, -padOff],
      [padOff - padS, -padOff],
      [padOff - padS, padOff - padS],
      [-padOff, padOff - padS],
    ].forEach(([dx, dy]) => {
      ctx.fillStyle = 'rgba(52, 211, 153, 0.12)';
      ctx.strokeStyle = '#34d399';
      ctx.setLineDash([4, 3]);
      ctx.fillRect(cx + dx, cy + dy, padS, padS);
      ctx.strokeRect(cx + dx, cy + dy, padS, padS);
      ctx.setLineDash([]);
    });

    // 8 Piezos around perimeter
    PIEZO_COORDS.forEach((p, idx) => {
      const px = cx + p.x * (half * 0.88);
      const py = cy + p.y * (half * 0.88);

      ctx.fillStyle = 'rgba(232, 196, 118, 0.28)';
      ctx.strokeStyle = '#e8c476';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(px, py, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f4f4f5';
      ctx.font = '600 9.5px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(p.id, px, py + 3);
    });
    ctx.textAlign = 'left';

    // Right side wiring legend
    drawElectronicsChain(400, 48, W - 424, 195, Math.max(sProg, 3), clock);
    drawSideCrossSection(400, 254, W - 424, 168, Math.max(sProg, 2), clock);

    ctx.restore();
  }

  rafId = requestAnimationFrame(renderFrame);

  activeManualCleanup = () => {
    if (rafId) cancelAnimationFrame(rafId);
    observer.disconnect();
  };
}
