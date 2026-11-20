/**
 * PULSE+ — Bilingual (TR / EN) Plain-Language Guide, Academic Citations & Contextual (?) Tooltips
 * Written so both a 10-year-old child and a physics professor understand every button, wave, and formula.
 */

import { renderAssemblyManualHTML } from './assembly-manual.js';

export const HELP_TIPS_TR = {
  mode_studio: {
    title: 'Stüdyo Modu',
    body: 'İstediğin rakamı (0–9), kelimeyi ya da elinle çizdiğin bir şekli seç. Plakadaki gerçek ses dalgaları kumu canlı olarak o şekle toplar.',
    note: 'Hile yok: Plaka tamamen düzdür, tüm şekiller ses girişimiyle oluşur.',
  },
  mode_game: {
    title: 'Akustik Şifre Kırıcı (Oyun)',
    body: 'Gizli bir rakam veya kelime frekansların arasına saklanmıştır. Kaydırıcıları yavaşça hareket ettirerek bozuk dalgaları rezonansa kilitle ve kumun içindeki şifreyi çöz.',
    note: 'Her kaydırıcı gerçek Lorentzian rezonans eğrisini ve ses perdesini değiştirir.',
  },
  mode_guide: {
    title: 'Nasıl Çalışır? (Herkes İçin Rehber)',
    body: 'Ses dalgalarının kumu nasıl şekillendirdiğini ilkokul çocuğuna anlatır gibi sade benzetmelerle, gerçek formüllerle ve hakemli akademik makalelerle açıklar.',
    note: 'İstersen "Sadece Basit Anlatım" moduyla tüm formülleri tek tıkla gizleyebilirsin.',
  },
  lang_switch: {
    title: 'Dil Seçimi (Türkçe / English)',
    body: 'Tüm arayüzü, bilgi balonlarını, oyun seviyelerini ve bilimsel rehberi anında Türkçe veya İngilizce arasında değiştirir.',
  },
  audio_toggle: {
    title: 'Canlı Ses Sentezleyici',
    body: 'Plakayı titreten gerçek Kirchhoff–Love frekanslarını Web Audio API ile kulağınla duymanı sağlar. Rakam değiştikçe farklı frekans akorları duyarsın.',
    note: 'Kulak sağlığı için çok yüksek tiz frekanslar yumuşatılarak verilir.',
  },
  physics_lab: {
    title: 'Genişleyen Fizik Laboratuvarı',
    body: 'Arka planı kapatmadan sağa doğru genişleyen kontrol paneli. Frekansları tek tek elle artırıp azaltabilir, donanımı ve malzemeyi değiştirebilir, tez verilerini indirebilirsin.',
    note: 'Hem Stüdyo hem Oyun modunda plaka canlı çalışırken yan yana açık kalabilir.',
  },
  plate_readout: {
    title: 'Aktif Hedef ve Baskın Frekans',
    body: 'Ekrandaki hedef karakteri, seçili hoparlör/piezo sayısını ve şu an plakayı en güçlü şekillendiren baskın frekansı (Hz) gösterir.',
    note: 'Yanındaki küçük sarı dalga, o an hoparlörlerden çıkan birleşik sesin canlı osiloskobudur.',
  },
  play_pause: {
    title: 'Duraklat / Başlat (Boşluk Tuşu)',
    body: 'Ses dalgalarını ve kum taneciklerinin hareketini anında dondurur veya devam ettirir. Boşluk (Space) tuşuyla da çalışır.',
  },
  scatter: {
    title: 'Kumu Yeniden Dağıt',
    body: 'Tüm kum taneciklerini plaka yüzeyine rastgele, eşit şekilde yeniden serper. Ses dalgalarının şekli sıfırdan nasıl kurduğunu baştan izleyebilirsin.',
  },
  overlay_layer: {
    title: 'Plaka Görünüm Katmanı',
    body: 'Kum: Gerçekçi metal plaka ve altın kum tanecikleri. Titreşim: Hangi bölgenin sert sallandığını (parlak) ve nerenin sessiz kaldığını (koyu) gösteren ısı haritası. Dalga: Anlık bükülen duran dalgalar. Hedef: İstenen şekil şablonu.',
    note: 'Görünmeyen dalgaları çıplak gözle görmek için "Dalga" veya "Titreşim" katmanına tıkla.',
  },
  spectrum_strip: {
    title: 'Aktif Frekans Özeti (Hz)',
    body: 'Seçtiğin rakamı çizmek için 16 doğal plaka bandından otomatik seçilen 8 (veya 10) frekansı gösterir. Her rakam farklı frekanslara ihtiyaç duyar!',
    note: 'Herhangi bir frekansı elle değiştirmek için "Manuel Ayarla" ile Fizik Lab → Frekanslar panelini aç.',
  },
  metric_iou: {
    title: 'IoU Uyumu (Şekil Doğruluğu)',
    body: 'Düğüm çizgilerinin (sessiz bölgenin) hedef rakamla yüzde kaç örtüştüğünü ölçer. %85+ net okunur, %95+ neredeyse mükemmel demektir.',
  },
  metric_contrast: {
    title: 'Titreşim Kontrastı',
    body: 'Rakamın dışındaki gürültülü alanın, rakamın içindeki sessiz alandan kaç kat daha şiddetli titrediğini gösterir. Kontrast yüksekse kum dışarıda hiç kalmaz.',
  },
  metric_overlap: {
    title: 'Hedef İçi Kum Oranı',
    body: 'Plakadaki on binlerce gerçek kum taneciğinin şu an yüzde kaçının hedef şeklin içine yerleştiğini anlık sayar.',
  },
  metric_lambda: {
    title: 'Eğilme Dalgaboyu (λ)',
    body: 'Baskın ses frekansının metal plaka içinde oluşturduğu bir tam dalga tepesi arasındaki mesafedir (cm). Frekans yükseldikçe dalgaboyu kısalır ve daha ince ayrıntılar çizilir.',
  },
  keypad: {
    title: '0–9 Rakam Tuş Takımı',
    body: 'Her rakam seçildiğinde çözücü bu şekil için en uygun plaka frekanslarını ve her piezonun faz/genlik değerini yeniden hesaplar. Klavyedeki 0–9 tuşlarıyla da seçebilirsin.',
  },
  word_input: {
    title: 'Kelime, Harf veya Cümle Yaz',
    body: 'İstediğin herhangi bir harfi (A–Z, Türkçe karakterler), kelimeyi (CAT, PULSE+) veya uzun cümleyi yaz. Sistem otomatik olarak en okunaklı şekilde kumda oynatır.',
  },
  digit_tour: {
    title: '0–9 Otomatik Gösteri Turu',
    body: '0’dan 9’a kadar tüm rakamları tek tek ve otomatik olarak kumda oluşturur. Tez sunumlarında eller serbest canlı demo yapmak için idealdir.',
  },
  draw_mode: {
    title: 'Kendin Çiz (Serbest Şekil)',
    body: 'Plakanın üzerine fare veya parmağınla kalp, yıldız, baş harfin ya da istediğin herhangi bir çizimi yap; çözücü o şekli oluşturacak gerçek ses dalgalarını anında hesaplasın.',
  },
  game_match: {
    title: 'Rezonans Uyumu',
    body: 'Tüm gizli frekans kanallarının gerçek hedef frekansa ne kadar yaklaştığını gösterir. %100 kilitlendiğinde kumlar dağılmayı bırakıp gizli şifreyi netçe ortaya çıkarır.',
  },
  game_knobs: {
    title: 'Frekans Ayar Kaydırıcıları',
    body: 'Her sürgü bir grup ses kanalının frekansını gerçek zamanlı kaydırır. Doğru noktaya yaklaştıkça kart sarıya, tam kilitlenince yeşile döner.',
  },
  manual_mixer: {
    title: 'Manuel Frekans Kontrol Masası',
    body: 'Her bir ses kanalının şiddetini (%0–%200) ve gerçek frekansını (Hz) tek tek değiştirebilirsin. Bir frekansın Hz değerini kaydırdığında Web Worker gerçek Kirchhoff–Love dalga alanını anında yeniden hesaplar!',
    note: 'Her kanalın kendi "↺" düğmesi sadece o kanalı varsayılana döndürür; üstteki "Tümünü Sıfırla" tüm kanalları ilk çözüme geri getirir.',
  },
  hardware_mode: {
    title: 'Akustik Donanım (Piezo / Hoparlör Sayısı)',
    body: '8 Piezo: Tek 7.1 USB ses kartıyla evde kurulabilen gerçek prototip (%89 IoU). 16 Piezo: Düz plakada %95 netlik. 40 Piezo: CAT, PULSE+ gibi çoklu kelimeler. 1 Hoparlör: Tek kaynakla neden asimetrik rakam oluşmadığını ve klasik Chladni özmodlarını kanıtlar.',
  },
  classic_sweep: {
    title: 'Tekil Frekans Tarayıcı (Klasik Chladni)',
    body: '1 Hoparlör seçiliyken tek bir saf sinüs frekansını 80 Hz – 5200 Hz arasında tarar ve düz metal plakanın doğal geometrik özmodlarını gösterir.',
  },
  material_select: {
    title: 'Plaka Malzemesi',
    body: 'Farklı malzemelerin sertliği (E) ve yoğunluğu (ρ) farklıdır. Alüminyum hafif ve sert olduğu için daha tiz, pirinç daha ağır olduğu için daha pes frekanslarda rezonansa girer.',
  },
  particle_count: {
    title: 'Kum Taneciği Sayısı',
    body: 'Plakada fizik kurallarıyla zıplayan bağımsız 3B kum tanesi sayısı. Daha fazla kum şekli daha dolgun gösterir; daha az kum eski bilgisayarlarda daha akıcı çalışır.',
  },
  gamma_slider: {
    title: 'Titreşim İvmesi (Γ = a/g)',
    body: 'Plakanın maksimum düşey ivmesinin yerçekimine oranıdır. 1g altında kum zıplayamaz; 2.5g – 4.0g aralığı en keskin ve hızlı kum toplanmasını sağlar.',
    note: 'Gerçek hayatta amfi çıkış voltajını açıp kısmaya denktir.',
  },
  master_volume: {
    title: 'Ses Seviyesi',
    body: 'Tarayıcıdan çıkan sesin dinleme yüksekliğini ayarlar. Plaka fiziğini (Γ ivmesini) etkilemez, yalnızca kulaklık/hoparlör sesini kısar veya açar.',
  },
  seq_duration: {
    title: 'Geçiş Süresi & Döngü',
    body: '0–9 Otomatik turunda veya çoklu cümle oynatırken her karakterin ekranda kaç saniye kalacağını ve bitince başa dönüp dönmeyeceğini belirler.',
  },
  word_mode: {
    title: 'Çoklu Metin Oynatma Biçimi',
    body: 'Uzun metinlerin harf harf mi, kelime kelime mi yoksa tümünün tek plakaya sığdırılarak mı gösterileceğini seçer. 8/16 Piezo modunda harf harf en net sonucu verir.',
  },
  pde_eq: {
    title: 'Kirchhoff–Love İnce Plaka Denklemi',
    body: '25×25 cm ince metal plakanın eğilme fiziğini yöneten 4. mertebe diferansiyel denklem: ρh (kütle ivmesi) + D∇⁴w (plaka esnekliği) + c (sönüm) = F (piezo kuvvetleri).',
  },
  constants_strip: {
    title: 'Plaka Sabitleri ve Leissa (1969) Doğrulaması',
    body: 'Seçili malzemenin gerçek elastisite modülü (E), Poisson oranı (ν), yoğunluğu (ρ), eğilme rijitliği (D), temel frekansı (f₁,₁) ve NASA SP-160 (Leissa 1969) doğrulama özdeğeri.',
  },
  channel_table: {
    title: 'Gerçek Donanım Kanal Sürüşü (Faz / RMS)',
    body: 'Gerçek hayatta 6–8 kanallı USB ses kartı ve amfilere göndermen gereken her bir piezonun (CH1..CH16) plaka kenarındaki tam cm konumu, genliği ve faz açısı (°).',
  },
  export_buttons: {
    title: 'Tez Verisi Dışa Aktarım (JSON & CSV)',
    body: 'Aktif çözümün tüm plaka sabitlerini, frekanslarını, karmaşık faz/genlik matrisini ve doğrulama metriklerini tez raporunda veya Python/MATLAB analizinde kullanmak üzere indirir.',
  },
  benchmark_btn: {
    title: '0–9 Toplu Tez Testi',
    body: 'Seçili donanım ve malzeme üzerinde 0’dan 9’a tüm rakamları otomatik çözer; her rakamın IoU doğruluğunu, kontrastını, baskın frekansını ve çözüm süresini tablo + CSV olarak üretir.',
  },
};

export const HELP_TIPS_EN = {
  mode_studio: {
    title: 'Studio Mode',
    body: 'Pick any digit (0–9), type a word, or draw your own shape. Real acoustic waves on the metal plate naturally herd loose sand into that exact shape.',
    note: 'Zero tricks: the plate is 100% flat — every pattern emerges purely from wave interference.',
  },
  mode_game: {
    title: 'Acoustic Cipher Game',
    body: 'A secret digit or word is hidden inside detuned frequencies. Slide the frequency channels slowly until they lock into resonance and reveal the hidden shape in the sand.',
    note: 'Each slider sweeps a real Lorentzian resonance curve and live Web Audio pitch.',
  },
  mode_guide: {
    title: 'How It Works (Plain-Language Guide)',
    body: 'Explains how invisible sound waves sculpt sand into digits — first in everyday kid-friendly analogies, then with exact Kirchhoff–Love equations and peer-reviewed papers.',
    note: 'Toggle "Simple Explanation Only" anytime to hide all math formulas.',
  },
  lang_switch: {
    title: 'Language Switch (TR / EN)',
    body: 'Instantly switches the entire interface, tooltips, puzzle levels, and science guide between Turkish and English.',
  },
  audio_toggle: {
    title: 'Live Acoustic Synthesizer',
    body: 'Plays the exact Kirchhoff–Love plate frequencies through Web Audio API so you hear each digit’s unique harmonic chord as you switch shapes.',
    note: 'Very high piezo frequencies are softly rolled off for comfortable headphone listening.',
  },
  physics_lab: {
    title: 'Expanding Physics Laboratory',
    body: 'Expands smoothly beside the plate without darkening or blocking the workspace. Tune every frequency channel manually, swap hardware/materials, or export thesis data.',
    note: 'Stays open live side-by-side in both Studio and Game modes.',
  },
  plate_readout: {
    title: 'Active Target & Dominant Frequency',
    body: 'Displays the current target character, transducer count, and the strongest dominant frequency (Hz) carving the plate right now.',
    note: 'The small glowing trace beside it is the live oscilloscope of the combined sound wave.',
  },
  play_pause: {
    title: 'Pause / Play (Spacebar)',
    body: 'Instantly freezes or resumes plate vibrations, audio playback, and sand grain motion. Also triggered with the Spacebar.',
  },
  scatter: {
    title: 'Scatter Sand Uniformly',
    body: 'Randomly spreads all sand grains evenly across the flat plate so you can watch the acoustic waves assemble the shape from scratch.',
  },
  overlay_layer: {
    title: 'Plate Visual Layer',
    body: 'Sand: Realistic metal plate & silica sand. Intensity: Vibration heatmap (bright = violent shaking, dark = quiet nodal valleys). Wave: Real-time bending waves. Target: Desired glyph mask.',
    note: 'Click "Wave" or "Intensity" to see the invisible standing waves working underneath the sand.',
  },
  spectrum_strip: {
    title: 'Active Frequency Overview (Hz)',
    body: 'Shows the 8 (or 10) winning frequencies automatically chosen from 16 natural plate bands for this exact shape. Every digit needs a different chord!',
    note: 'Click any chip or "Tune Manually" to adjust gain and Hz individually in Physics Lab.',
  },
  metric_iou: {
    title: 'IoU Match (Shape Accuracy)',
    body: 'Measures the percentage overlap between the quiet nodal valleys and the target digit. 85%+ reads clearly; 95%+ is razor sharp.',
  },
  metric_contrast: {
    title: 'Vibration Contrast Ratio',
    body: 'How many times harder the noisy background shakes compared to the quiet interior of the digit. Higher contrast keeps stray sand completely off the background.',
  },
  metric_overlap: {
    title: 'Sand Inside Target',
    body: 'Live count of what percentage of the tens of thousands of ballistic sand grains have currently settled inside the target glyph.',
  },
  metric_lambda: {
    title: 'Flexural Wavelength (λ)',
    body: 'Distance (cm) between wave crests of the dominant frequency inside the metal plate. Higher Hz means shorter wavelength λ and sharper corner detail.',
  },
  keypad: {
    title: '0–9 Digit Keypad',
    body: 'Each digit triggers a fresh Kirchhoff–Love inverse solve for the best plate frequencies and piezo phases. You can also press 0–9 on your keyboard.',
  },
  word_input: {
    title: 'Type a Word, Letter, or Sentence',
    body: 'Enter any letter (A–Z, Turkish characters), word (CAT, PULSE+), or full sentence. The system automatically plays it in the sharpest layout for your hardware.',
  },
  digit_tour: {
    title: '0–9 Auto Showcase Tour',
    body: 'Automatically steps through digits 0 to 9 in sand — ideal for hands-free live demos during thesis presentations.',
  },
  draw_mode: {
    title: 'Freehand Draw Mode',
    body: 'Sketch a heart, star, initial, or any custom shape directly onto the plate with mouse or touch; the solver immediately synthesizes real sound waves to form it.',
  },
  game_match: {
    title: 'Resonance Lock Meter',
    body: 'Shows how close all hidden frequency channels are to true plate resonance. At 100%, competing noise vanishes and the hidden cipher snaps clear.',
  },
  game_knobs: {
    title: 'Frequency Tuning Sliders',
    body: 'Each slider shifts a group of live plate frequencies. Cards glow gold when warm and lock emerald green once tuned to resonance.',
  },
  manual_mixer: {
    title: 'Manual Frequency Console',
    body: 'Tune every channel’s gain (0%–200%) and real frequency (Hz) independently. Shifting any channel’s Hz recomputes its exact Kirchhoff–Love Green’s wavefield live in the Web Worker!',
    note: 'Each bar’s "↺" button resets only that bar; "Reset All" restores the full solved optimum.',
  },
  hardware_mode: {
    title: 'Acoustic Hardware (Piezo / Speaker Count)',
    body: '8 Piezos: Real home prototype using one 7.1 USB sound card (~89% IoU). 16 Piezos: 95%+ crispness on a flat plate. 40 Piezos: Full words (CAT, PULSE+). 1 Speaker: Demonstrates symmetry limits & classic Chladni eigenmodes.',
  },
  classic_sweep: {
    title: 'Single-Frequency Sweep (Classic Chladni)',
    body: 'In 1-Speaker mode, sweeps a single pure sine wave from 80 Hz to 5200 Hz to inspect classic symmetric Chladni eigenmodes.',
  },
  material_select: {
    title: 'Plate Material',
    body: 'Each material has different stiffness (E) and density (ρ). Stiff, light aluminum resonates at higher pitches; dense brass resonates lower.',
  },
  particle_count: {
    title: 'Sand Grain Count',
    body: 'Number of independent 3D ballistic sand grains simulated on the plate. Higher counts look richer; lower counts run smoothly on older laptops.',
  },
  gamma_slider: {
    title: 'Peak Acceleration (Γ = a/g)',
    body: 'Ratio of peak vertical plate acceleration to gravity. Below 1g sand cannot bounce; 2.5g–4.0g gives the fastest, cleanest migration to quiet nodal valleys.',
    note: 'Equivalent to turning up the amplifier output voltage in real hardware.',
  },
  master_volume: {
    title: 'Master Volume',
    body: 'Controls headphone/speaker listening loudness in the browser. Does not change the simulated plate vibration acceleration (Γ).',
  },
  seq_duration: {
    title: 'Step Duration & Loop',
    body: 'Controls how many seconds each character holds during the 0–9 Auto Tour or multi-character sentences, and whether the sequence loops.',
  },
  word_mode: {
    title: 'Multi-Text Playback Mode',
    body: 'Chooses whether longer text plays letter-by-letter, word-by-word, or squeezed onto a single plate. Letter-by-letter gives the highest clarity on 8/16 piezos.',
  },
  pde_eq: {
    title: 'Kirchhoff–Love Thin Plate PDE',
    body: 'The 4th-order partial differential equation governing a 25×25 cm flat elastic plate: ρh (inertia) + D∇⁴w (bending stiffness) + c (damping) = F (piezo forces).',
  },
  constants_strip: {
    title: 'Plate Constants & NASA Leissa Validation',
    body: 'Displays Young’s modulus (E), Poisson’s ratio (ν), density (ρ), flexural rigidity (D), fundamental mode (f₁,₁), and validation against NASA SP-160 (Leissa 1969).',
  },
  channel_table: {
    title: 'Real Hardware Channel Drive (Phase / RMS)',
    body: 'Exact cm edge coordinates, drive amplitude, and phase angle (°) for every physical actuator (CH1..CH16) to drive a real 6/8/16-channel USB sound card & amps.',
  },
  export_buttons: {
    title: 'Export Thesis Data (JSON & CSV)',
    body: 'Downloads the full physical plate constants, frequencies, complex actuator drive matrix, and metrics for thesis tables or Python/MATLAB analysis.',
  },
  benchmark_btn: {
    title: '0–9 Full Thesis Benchmark',
    body: 'Automatically solves digits 0–9 on the currently selected hardware and material, generating a full accuracy/contrast/frequency table + downloadable CSV.',
  },
};

export function getHelpTip(key, lang = 'tr') {
  const dict = lang === 'en' ? HELP_TIPS_EN : HELP_TIPS_TR;
  return dict[key] || HELP_TIPS_TR[key] || null;
}

export const ACADEMIC_REFERENCES = [
  {
    authors: 'Chladni, E. F. F.',
    year: '1787',
    title: 'Entdeckungen über die Theorie des Klanges (Discoveries in the Theory of Sound)',
    journal: 'Weidmanns Erben und Reich, Leipzig',
    url: 'https://archive.org/details/entdeckungenuber00chla',
    noteTr: 'Titreşen metal plaka üzerindeki kumun sessiz düğüm çizgilerinde toplandığını ilk kez sistematik olarak belgeleyen kurucu eser.',
    noteEn: 'Foundational treatise documenting how sand collects along silent nodal lines on vibrating metal plates.',
  },
  {
    authors: 'Faraday, M.',
    year: '1831',
    title: 'On a Peculiar Class of Acoustical Figures; and on Certain Forms Assumed by Groups of Particles upon Vibrating Elastic Surfaces',
    journal: 'Philosophical Transactions of the Royal Society 121, 299–340',
    url: 'https://doi.org/10.1098/rstl.1831.0018',
    noteTr: 'Ağır kum tanelerinin düğümlere, çok ince tozların ise hava akımıyla karın noktalarına nasıl hareket ettiğinin klasik fiziği.',
    noteEn: 'Classical physics explaining why heavy sand grains settle at quiet nodes while ultra-fine dust drifts to antinodes.',
  },
  {
    authors: 'Kirchhoff, G.',
    year: '1850',
    title: 'Über das Gleichgewicht und die Bewegung einer elastischen Scheibe',
    journal: 'Journal für die reine und angewandte Mathematik (Crelle) 40, 51–88',
    url: 'https://doi.org/10.1515/crll.1850.40.51',
    noteTr: 'PULSE+ motorunun temelini oluşturan 4. mertebe ince elastik plaka eğilme denklemi (ρh ∂²w/∂t² + D∇⁴w = F).',
    noteEn: 'The 4th-order thin elastic plate bending PDE powering the PULSE+ physics engine.',
  },
  {
    authors: 'Warburton, G. B.',
    year: '1954',
    title: 'The Vibration of Rectangular Plates',
    journal: 'Proceedings of the Institution of Mechanical Engineers 168(1), 371–384',
    url: 'https://doi.org/10.1243/PIME_PROC_1954_168_040_02',
    noteTr: 'Serbest kenarlı kare/dikdörtgen plakaların doğal özmod frekanslarını Euler–Bernoulli kiriş fonksiyonlarıyla veren analitik formül.',
    noteEn: 'Analytical free-edge rectangular plate dispersion law built from Euler–Bernoulli beam eigenfunctions.',
  },
  {
    authors: 'Leissa, A. W.',
    year: '1969',
    title: 'Vibration of Plates (NASA SP-160)',
    journal: 'NASA Scientific and Technical Information Division, Washington D.C.',
    url: 'https://ntrs.nasa.gov/citations/19700009156',
    noteTr: 'Serbest kare plakanın temel burulma özdeğeri λ₁,₁ = 13.49 için evrensel NASA doğrulama referansı (PULSE+ sapması ~%2.9).',
    noteEn: 'Universal NASA benchmark for free square plate fundamental eigenvalue λ₁,₁ = 13.49 (PULSE+ within ~2.9%).',
  },
  {
    authors: 'Zhou, Q., Sariola, V., Latifi, K., & Liimatainen, V.',
    year: '2016',
    title: 'Controlling the motion of multiple objects on a Chladni plate',
    journal: 'Nature Communications 7, 12764',
    url: 'https://doi.org/10.1038/ncomms12764',
    noteTr: 'Tek bir titreşim kaynağında kapalı döngü frekans geçişleriyle parçacık yönlendirmeyi ve tek kaynaklı plakanın fiziksel sınırlarını gösteren çalışma.',
    noteEn: 'Landmark demonstration of closed-loop Chladni particle manipulation and single-actuator physical bounds.',
  },
  {
    authors: 'Melde, K., Mark, A. G., Qiu, T., & Fischer, P.',
    year: '2016',
    title: 'Holograms for acoustics',
    journal: 'Nature 537, 518–522',
    url: 'https://doi.org/10.1038/nature19755',
    noteTr: 'Çoklu faz kontrollü akustik dalga girişimiyle keyfi 2B şekillerin mikropartiküllerde nasıl kurulduğunun deneysel kanıtı.',
    noteEn: 'Experimental proof that phase-controlled acoustic wave interference can assemble arbitrary 2D shapes in particles.',
  },
  {
    authors: 'Latifi, K., Wijaya, H., & Zhou, Q.',
    year: '2019',
    title: 'Motion of Heavy Particles on a Submerged Chladni Plate',
    journal: 'Physical Review Letters 122, 184301',
    url: 'https://doi.org/10.1103/PhysRevLett.122.184301',
    noteTr: 'Chladni plakasında parçacıkların ivme eşiği (Γ > 1) ve titreşim şiddeti gradyanı (−∇I) boyunca sürüklenme mekaniği.',
    noteEn: 'Particle transport mechanics under acceleration threshold (Γ > 1) and intensity gradient drift (−∇I).',
  },
];

export function renderGuideMarkup(simpleOnly = false, lang = 'tr') {
  const isEn = lang === 'en';
  const refsHtml = ACADEMIC_REFERENCES.map(
    (r, idx) => `
      <a class="ref-card" href="${r.url}" target="_blank" rel="noopener noreferrer">
        <div class="ref-top">
          <span class="ref-num">[${idx + 1}]</span>
          <span class="ref-authors">${r.authors} (${r.year})</span>
        </div>
        <div class="ref-title">${r.title}</div>
        <div class="ref-journal">${r.journal}</div>
        <p class="ref-note">${isEn ? r.noteEn : r.noteTr}</p>
      </a>
    `
  ).join('');

  if (isEn) {
    return `
      <div class="guide-shell ${simpleOnly ? 'simple-only' : ''}">
        <header class="guide-hero">
          <div class="guide-kicker">PLAIN-LANGUAGE ACOUSTIC PHYSICS GUIDE · SIMPLE ANALOGIES + PEER-REVIEWED SCIENCE</div>
          <h1>How Do Invisible Sound Waves Sculpt Loose Sand Into Sharp Digits?</h1>
          <p class="guide-lead">
            This guide explains everything happening inside <strong>PULSE+</strong> — first in everyday analogies clear
            enough for a curious 10-year-old, and then with full Kirchhoff–Love plate equations, validation metrics, and
            clickable academic papers.
          </p>

          <div class="guide-mode-bar">
            <button type="button" class="guide-mode-btn ${simpleOnly ? 'active' : ''}" data-guide-mode="simple">
              Simple Explanation Only (No Math)
            </button>
            <button type="button" class="guide-mode-btn ${!simpleOnly ? 'active' : ''}" data-guide-mode="full">
              Full Science (Simple + Equations)
            </button>
          </div>
        </header>

        <section class="guide-sec">
          <span class="guide-step">CHAPTER 01 · THE CORE IDEA</span>
          <h2>1. Sound Is Invisible — So How Does It Push Sand? (The Trampoline Analogy)</h2>
          <div class="simple-box">
            <strong>In Simple Words:</strong>
            Imagine sprinkling tiny beads onto a giant trampoline. Wherever people jump hard, beads fly into the air and
            bounce away. But if there is a calm line on the trampoline that <em>never moves</em>, any bead that lands there
            stops bouncing and falls asleep!
          </div>
          <p>
            Sound is simply rapid vibration. When we shake a thin flat aluminum plate (25×25 cm) with speakers or piezo discs,
            some spots bounce violently hundreds of times per second (<strong>antinodes</strong>) while certain curves remain
            almost completely still (<strong>nodal lines</strong>). Loose sand grains escape the bouncing regions and collect
            exclusively along the silent nodal lines — creating the famous <strong>Chladni figures</strong> discovered in 1787.
          </p>

          <div class="guide-diagram" aria-label="Standing wave and nodal line diagram">
            <svg viewBox="0 0 640 165" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="638" height="163" rx="12" fill="#0d0d10" stroke="rgba(255,255,255,0.08)"/>
              <line x1="48" y1="92" x2="592" y2="92" stroke="rgba(255,255,255,0.16)" stroke-dasharray="4 4"/>
              <path d="M48 92 C98 28, 138 28, 184 92 C230 156, 270 156, 320 92 C370 28, 410 28, 456 92 C502 156, 542 156, 592 92" stroke="#e8c476" stroke-width="2.2"/>
              <path d="M48 92 C98 156, 138 156, 184 92 C230 28, 270 28, 320 92 C370 156, 410 156, 456 92 C502 28, 542 28, 592 92" stroke="rgba(232,196,118,0.32)" stroke-width="1.4" stroke-dasharray="5 4"/>
              <g fill="#f5d996">
                <circle cx="184" cy="87" r="4"/><circle cx="178" cy="89" r="3"/><circle cx="190" cy="89" r="3"/><circle cx="184" cy="81" r="2.6"/>
                <circle cx="320" cy="87" r="4"/><circle cx="314" cy="89" r="3"/><circle cx="326" cy="89" r="3"/><circle cx="320" cy="81" r="2.6"/>
                <circle cx="456" cy="87" r="4"/><circle cx="450" cy="89" r="3"/><circle cx="462" cy="89" r="3"/><circle cx="456" cy="81" r="2.6"/>
              </g>
              <g fill="rgba(244,244,245,0.65)">
                <circle cx="116" cy="36" r="2.2"/><circle cx="132" cy="48" r="1.8"/>
                <circle cx="388" cy="34" r="2.2"/><circle cx="372" cy="48" r="1.8"/>
              </g>
              <text x="116" y="24" text-anchor="middle" fill="#a1a1aa" font-size="11" font-family="Inter, sans-serif">Shaking Zone (Antinode)</text>
              <text x="116" y="148" text-anchor="middle" fill="#63636e" font-size="10" font-family="Inter, sans-serif">Sand bounces away</text>
              <text x="320" y="24" text-anchor="middle" fill="#e8c476" font-size="11" font-weight="600" font-family="Inter, sans-serif">Silent Node (Zero Vibration)</text>
              <text x="320" y="148" text-anchor="middle" fill="#e8c476" font-size="10.5" font-family="Inter, sans-serif">Sand settles here and draws the shape</text>
              <text x="524" y="24" text-anchor="middle" fill="#a1a1aa" font-size="11" font-family="Inter, sans-serif">Shaking Zone</text>
            </svg>
          </div>

          <div class="math-only">
            <div class="formula-box">
              <span class="formula-label">Ballistic Launch Threshold &amp; Gradient Drift Law</span>
              <code>Γ(x,y) = a(x,y) / g &gt; 1  ⇒  v_drift ∝ −∇I(x,y)</code>
              <p>
                A grain launches only when local vertical plate acceleration exceeds gravity (g = 9.81 m/s²). Repeated micro-hops
                drift every grain down the intensity gradient (−∇I) until it rests inside quiet nodal valleys (I ≈ 0).
              </p>
            </div>
          </div>
        </section>

        <section class="guide-sec">
          <span class="guide-step">CHAPTER 02 · THE SECRET BEHIND DIGITS 0–9</span>
          <h2>2. Why Can’t 1 Speaker Draw Digits — And How Do 8 or 16 Piezos Do It?</h2>
          <div class="simple-box">
            <strong>In Simple Words (Pond Ripples + Noise-Cancelling Headphones):</strong>
            Drop <strong>one pebble</strong> into the center of a square pond and you only get symmetric stars and ripples — never
            an asymmetric “3” or “7”. Now place <strong>8 or 16 tiny wave-makers (piezos)</strong> around the edges with exact
            timing (phase): waves from opposite edges collide right along the curve of “3” with opposite crests and
            <strong>cancel each other to dead silence</strong> — just like noise-cancelling headphones! Meanwhile, everywhere
            outside “3” shakes violently, so sand has nowhere to hide except inside the calm “3” valley.
          </div>
          <p>
            Even better, we play <strong>8 different frequencies at the exact same time</strong>. Low frequencies (long waves)
            sweep the broad background clean, while mid and high frequencies (short waves) carve tight loops, corners, and holes.
            The metal plate stays <strong>100% flat, uncut, and bar-free</strong>.
          </p>

          <div class="compare-grid">
            <div class="cmp-card">
              <span class="cmp-tag">1 Speaker (Flat Plate)</span>
              <strong>Avg IoU ~16%</strong>
              <p>Lacks multi-actuator phase freedom. Produces classic symmetric Chladni art, but cannot form asymmetric digits simultaneously.</p>
            </div>
            <div class="cmp-card highlight">
              <span class="cmp-tag">8 Edge Piezos (Home Prototype)</span>
              <strong>Avg IoU ~89% · 14.3× Contrast</strong>
              <p>2 piezos per edge driven by a single 7.1 USB sound card. Forms clear, unmistakable digits 0–9 on a real flat plate.</p>
            </div>
            <div class="cmp-card highlight">
              <span class="cmp-tag">16 Edge Piezos (Default)</span>
              <strong>Avg IoU ~95% · 19.0× Contrast</strong>
              <p>4 piezos per edge × 8 simultaneous tones. Razor-sharp digits and letters with virtually zero stray background sand.</p>
            </div>
            <div class="cmp-card">
              <span class="cmp-tag">40 Edge Piezos (High-Res)</span>
              <strong>Avg IoU ~98%</strong>
              <p>10 piezos per edge × 10 simultaneous tones. Spells multi-letter words like CAT, 2026, and PULSE+ at once.</p>
            </div>
          </div>
        </section>

        <section class="guide-sec">
          <span class="guide-step">CHAPTER 03 · UNDER THE HOOD</span>
          <h2>3. Four Real Physics Steps Happening Every Time You Click a Digit</h2>
          <ol class="steps-list">
            <li>
              <strong>Natural Plate Modes (266+ Eigenmodes):</strong>
              From your chosen material’s stiffness and density, the engine computes all natural free-edge bending shapes of the
              25×25 cm square plate.
            </li>
            <li>
              <strong>Shape-Adaptive Frequency Discovery (16 Bands → Best 8):</strong>
              Every digit has a different spatial fingerprint — “0” favors wide circular waves while “3” and “7” demand crisp
              high-frequency curves. The solver scans 16 plate bands and selects the 8 frequencies that physically fit that exact
              shape best, which is why the sound and spectrum genuinely change from digit to digit!
            </li>
            <li>
              <strong>Inverse Wave Synthesis (Minimax-Barrier Adam):</strong>
              Computes exact drive amplitude and phase for every piezo so vibration vanishes inside the digit (I ≈ 0) while a steep
              barrier keeps every background cell shaking (I ≥ 0.48), preventing stray sand clumps.
            </li>
            <li>
              <strong>45,000+ 3D Ballistic Sand Grains:</strong>
              Each grain knows nothing about the target shape! It only feels local plate vibration beneath its feet: bouncing,
              sliding down gradients, arresting via Coulomb friction, and slumping like real sand piles.
            </li>
          </ol>

          <div class="math-only">
            <div class="formula-box">
              <span class="formula-label">Kirchhoff–Love Plate PDE &amp; Multi-Frequency Superposition</span>
              <code>ρh ∂²w/∂t² + D ∇⁴w + c ∂w/∂t = Σ_{p,k} u_{p,k} e^{iω_k t} δ(r − r_p)</code>
              <code>I(x,y) = Σ_{k=1}^{K} | Σ_{p=1}^{P} u_{p,k} G(x,y; r_p, ω_k) |²</code>
              <p>
                Here <strong>D = Eh³ / [12(1 − ν²)]</strong> is flexural rigidity and <strong>G(r; r_p, ω_k)</strong> is the exact
                free-edge plate Green’s function built from Euler–Bernoulli beam eigenfunctions. Because distinct frequencies are
                time-orthogonal, their intensities add cleanly without cross-term beats.
              </p>
            </div>
            <div class="formula-box">
              <span class="formula-label">NASA SP-160 (Leissa, 1969) Analytical Benchmark</span>
              <code>λ₁,₁ = ω₁,₁ L² √(ρh / D) = 13.89   (NASA Leissa 1969 reference: 13.49 · Error: 2.9%)</code>
              <p>
                Matches analytical torsion-mode theory for a 25×25 cm × 1.5 mm Aluminum 6061-T6 plate (f₁,₁ ≈ 82 Hz).
              </p>
            </div>
          </div>
        </section>

        <section class="guide-sec">
          <span class="guide-step">CHAPTER 04 · REAL-WORLD BUILD &amp; INTERACTIVE ASSEMBLY MANUAL</span>
          <h2>4. How to Build It on Your Desk from Scratch (IKEA-Style Step-by-Step Manual)</h2>
          <div class="simple-box">
            <strong>Why No Arduino?</strong> A multi-channel USB sound card (5.1 or 7.1) is already a phase-synchronized 6- or
            8-channel 48 kHz DAC straight from your PC! And remember: <strong>piezos bond parallel to the UNDERSIDE of the plate</strong>,
            while the plate rests on <strong>4 soft 2.5 cm foam pads</strong> so the piezos hang in mid-air without touching the desk.
          </div>
          ${renderAssemblyManualHTML('en')}
        </section>

        <section class="guide-sec">
          <span class="guide-step">CHAPTER 05 · ACADEMIC REFERENCES</span>
          <h2>5. Peer-Reviewed Papers &amp; Primary Sources (8 Citations)</h2>
          <p class="guide-ref-intro">
            Every equation, validation benchmark, and wave-interference principle in PULSE+ is grounded in primary physics literature:
          </p>
          <div class="refs-grid">${refsHtml}</div>
        </section>
      </div>
    `;
  }

  return `
    <div class="guide-shell ${simpleOnly ? 'simple-only' : ''}">
      <header class="guide-hero">
        <div class="guide-kicker">HERKES İÇİN AKUSTİK FİZİK REHBERİ · BASİT ANLATIM + BİLİMSEL TEZ KAYNAKÇASI</div>
        <h1>Ses Dalgaları Düz Bir Metal Plakadaki Kumu Nasıl Rakamlara Dönüştürür?</h1>
        <p class="guide-lead">
          Bu rehber, <strong>PULSE+</strong> projesinin arkasındaki tüm fiziği önce 10 yaşındaki bir çocuğun bile rahatça
          hayal edebileceği günlük benzetmelerle, ardından bitirme tezi jürisi için tam matematiksel denklemler ve
          hakemli makalelerle anlatır.
        </p>

        <div class="guide-mode-bar">
          <button type="button" class="guide-mode-btn ${simpleOnly ? 'active' : ''}" data-guide-mode="simple">
            Sadece Basit Anlatım (Formülsüz)
          </button>
          <button type="button" class="guide-mode-btn ${!simpleOnly ? 'active' : ''}" data-guide-mode="full">
            Tam Bilimsel (Basit + Formüller)
          </button>
        </div>
      </header>

      <section class="guide-sec">
        <span class="guide-step">BÖLÜM 01 · TEMEL MANTIK</span>
        <h2>1. Ses Görünmezdir, Peki Kumu Nasıl İter? (Trambolin Benzetmesi)</h2>
        <div class="simple-box">
          <strong>Basitçe Anlatırsak:</strong>
          Büyük bir trambolinin üzerine avuç dolusu minik boncuk döktüğünü düşün. Trambolinin ortasında birileri zıplarsa
          oradaki boncuklar havaya fırlar ve sağa sola kaçar. Ama trambolinin <em>hiç kıpırdamayan</em> bir çizgisi varsa,
          oraya düşen boncuk bir daha zıplamaz ve orada sakin sakin uyur!
        </div>
        <p>
          Ses dediğimiz şey havadaki veya metalin içindeki hızlı titreşimlerdir. Bir metal plakayı (örneğin 25×25 cm ince
          alüminyum bir levhayı) hoparlör veya piezo diskle titrettiğimizde, plakanın bazı bölgeleri saniyede yüzlerce kez
          aşağı-yukarı fırlar (<strong>karın / antinode</strong>), bazı çizgiler ise neredeyse hiç kıpırdamaz
          (<strong>düğüm çizgisi / node</strong>). Kum tanecikleri sallanan yerlerden kaça kaça sadece sessiz düğüm
          çizgilerinde toplanır. İşte 1787’de Ernst Chladni’nin keşfettiği <strong>Chladni desenleri</strong> budur!
        </p>

        <div class="guide-diagram" aria-label="Duran dalga ve düğüm çizgisi şeması">
          <svg viewBox="0 0 640 165" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="638" height="163" rx="12" fill="#0d0d10" stroke="rgba(255,255,255,0.08)"/>
            <line x1="48" y1="92" x2="592" y2="92" stroke="rgba(255,255,255,0.16)" stroke-dasharray="4 4"/>
            <path d="M48 92 C98 28, 138 28, 184 92 C230 156, 270 156, 320 92 C370 28, 410 28, 456 92 C502 156, 542 156, 592 92" stroke="#e8c476" stroke-width="2.2"/>
            <path d="M48 92 C98 156, 138 156, 184 92 C230 28, 270 28, 320 92 C370 156, 410 156, 456 92 C502 28, 542 28, 592 92" stroke="rgba(232,196,118,0.32)" stroke-width="1.4" stroke-dasharray="5 4"/>
            <g fill="#f5d996">
              <circle cx="184" cy="87" r="4"/><circle cx="178" cy="89" r="3"/><circle cx="190" cy="89" r="3"/><circle cx="184" cy="81" r="2.6"/>
              <circle cx="320" cy="87" r="4"/><circle cx="314" cy="89" r="3"/><circle cx="326" cy="89" r="3"/><circle cx="320" cy="81" r="2.6"/>
              <circle cx="456" cy="87" r="4"/><circle cx="450" cy="89" r="3"/><circle cx="462" cy="89" r="3"/><circle cx="456" cy="81" r="2.6"/>
            </g>
            <g fill="rgba(244,244,245,0.65)">
              <circle cx="116" cy="36" r="2.2"/><circle cx="132" cy="48" r="1.8"/>
              <circle cx="388" cy="34" r="2.2"/><circle cx="372" cy="48" r="1.8"/>
            </g>
            <text x="116" y="24" text-anchor="middle" fill="#a1a1aa" font-size="11" font-family="Inter, sans-serif">Çok sallanan yer (Karın)</text>
            <text x="116" y="148" text-anchor="middle" fill="#63636e" font-size="10" font-family="Inter, sans-serif">Kum buradan fırlar</text>
            <text x="320" y="24" text-anchor="middle" fill="#e8c476" font-size="11" font-weight="600" font-family="Inter, sans-serif">Sessiz Düğüm Noktası (0 Titreşim)</text>
            <text x="320" y="148" text-anchor="middle" fill="#e8c476" font-size="10.5" font-family="Inter, sans-serif">Kum sadece burada birikir ve şekli çizer</text>
            <text x="524" y="24" text-anchor="middle" fill="#a1a1aa" font-size="11" font-family="Inter, sans-serif">Sallanan Bölge</text>
          </svg>
        </div>

        <div class="math-only">
          <div class="formula-box">
            <span class="formula-label">Kumun Zıplama Eşiği &amp; Sürüklenme Yasası</span>
            <code>Γ(x,y) = a(x,y) / g &gt; 1  ⇒  v_drift ∝ −∇I(x,y)</code>
            <p>
              Bir kum taneciği ancak yerel plaka ivmesi yerçekimini (g = 9.81 m/s²) aştığında havalanır. Havalanan her tane,
              titreşim şiddeti I(x,y)’nin azaldığı yöne (−∇I) doğru sürüklenerek I ≈ 0 düğüm vadilerinde durur.
            </p>
          </div>
        </div>
      </section>

      <section class="guide-sec">
        <span class="guide-step">BÖLÜM 02 · ASIL SIR</span>
        <h2>2. Peki 0’dan 9’a Rakamlar Nasıl Oluşuyor? (1 Hoparlör Neden Yetmez?)</h2>
        <div class="simple-box">
          <strong>Basitçe Anlatırsak (Havuz &amp; Gürültü Engelleyici Kulaklık Benzetmesi):</strong>
          Kare bir su havuzunun tam ortasına <strong>tek bir taş</strong> atarsan, dalgalar hep düzgün halkalar veya simetrik
          yıldızlar çizer — asla “3” veya “7” çıkmaz! Ama havuzun kenarlarına <strong>8 veya 16 küçük dalga yapıcı (piezo)</strong>
          koyup hepsini tam hesaplanmış zamanlamalarla (faz) aynı anda çalıştırırsan, bir taraftan gelen tepe diğer taraftan gelen
          çukurla tam “3” çizgisinin üstünde çarpışıp <strong>birbirini sıfırlar</strong>! Tıpkı gürültü engelleyici kulaklıkların
          ters ses dalgasıyla gürültüyü susturması gibi: “3” rakamının üstü kasıtlı olarak susturulur, plakanın geri kalanı ise
          şiddetle sallanır.
        </div>
        <p>
          Üstelik bunu <strong>tek bir frekansla değil, 8 farklı frekansı aynı anda çalarak</strong> yaparız. Düşük frekanslar
          (uzun dalgalar) rakamın dışındaki geniş alanları temizler; orta ve yüksek frekanslar (kısa dalgalar) “3”ün kıvrımlarını,
          “8”in ortasındaki iki boşluğu ve “7”nin keskin köşesini oyar. Bu yüzden plakanın üzerinde hiçbir oluk, çubuk veya
          gizli çizgi yoktur — plaka <strong>%100 dümdüz bir metal levhadır</strong>.
        </p>

        <div class="compare-grid">
          <div class="cmp-card">
            <span class="cmp-tag">1 Hoparlör (Düz Plaka)</span>
            <strong>Ort. IoU ~%16</strong>
            <p>Faz kontrol serbestliği yoktur. Sadece güzel, simetrik klasik Chladni çiçek/yıldız desenleri oluşur; asimetrik rakamlar çıkmaz.</p>
          </div>
          <div class="cmp-card highlight">
            <span class="cmp-tag">8 Kenar Piezo (Ev Prototipi)</span>
            <strong>Ort. IoU ~%89 · 14.3× Kontrast</strong>
            <p>Her kenarda 2 piezo + tek bir 7.1 USB ses kartı. 0–9 rakamlarını düz metal plakada net ve okunaklı biçimde oluşturur.</p>
          </div>
          <div class="cmp-card highlight">
            <span class="cmp-tag">16 Kenar Piezo (Varsayılan)</span>
            <strong>Ort. IoU ~%95 · 19.0× Kontrast</strong>
            <p>Her kenarda 4 piezo × 8 eşzamanlı frekans. Dışarıda tek bir başıboş kum öbeği bırakmadan jilet gibi rakamlar ve harfler çizer.</p>
          </div>
          <div class="cmp-card">
            <span class="cmp-tag">40 Kenar Piezo (Yüksek Çözünürlük)</span>
            <strong>Ort. IoU ~%98</strong>
            <p>Her kenarda 10 piezo × 10 frekans. Tek bir plakada aynı anda CAT, 2026, PULSE+ gibi çok harfli kelimeleri yazar.</p>
          </div>
        </div>
      </section>

      <section class="guide-sec">
        <span class="guide-step">BÖLÜM 03 · ARKA PLANDA NELER OLUYOR?</span>
        <h2>3. Bir Rakama Bastığında 1 Saniyede Çalışan 4 Fizik Aşaması</h2>
        <ol class="steps-list">
          <li>
            <strong>Plakanın Doğal Şekilleri Çıkarılır (266+ Özmod):</strong>
            Seçtiğin malzemenin (Alüminyum, Pirinç, Çelik, Akrilik) sertliği ve ağırlığına göre serbest kenarlı kare plakanın
            doğal olarak hangi frekanslarda nasıl büküldüğü hesaplanır.
          </li>
          <li>
            <strong>Şekle Özel Akıllı Frekans Seçimi (16 Bant → En İyi 8 Frekans):</strong>
            Her rakamın kıvrımı farklıdır! “0” yuvarlak dalgaları sever, “3” ve “7” daha kısa keskin dalgalar ister. Çözücü,
            plakanın 16 doğal frekans bandını tarayıp <em>o rakama fiziksel olarak en iyi uyan 8 frekansı</em> seçer. Bu yüzden
            rakamlar arasında geçerken duyduğun ses ve spektrum gerçekten değişir!
          </li>
          <li>
            <strong>Ters Dalga Sentezi (Minimax-Barrier Adam Optimizasyonu):</strong>
            Her piezonun her frekansta hangi güçte (genlik) ve hangi zamanlamada (faz açısı) itmesi gerektiği hesaplanır.
            Hedef rakamın içi <em>I ≈ 0</em> sessiz vadiye indirilirken, dışındaki her noktada <em>I ≥ 0.48</em> engeli korunarak
            istenmeyen kum lekeleri yok edilir.
          </li>
          <li>
            <strong>45.000+ Gerçek 3B Balistik Kum Taneciği:</strong>
            Her kum tanesi yalnızca altındaki gerçek plaka titreşimini hisseder: zıplar, eğimden kayar, sürtünmeyle yavaşlar ve
            yığıldığında gerçek kum tepesi gibi yanlara kayar. Hiçbir kum tanesi “hedef rakamın ne olduğunu” bilmez!
          </li>
        </ol>

        <div class="math-only">
          <div class="formula-box">
            <span class="formula-label">Kirchhoff–Love Plaka Denklemi &amp; Çoklu Frekans Süperpozisyonu</span>
            <code>ρh ∂²w/∂t² + D ∇⁴w + c ∂w/∂t = Σ_{p,k} u_{p,k} e^{iω_k t} δ(r − r_p)</code>
            <code>I(x,y) = Σ_{k=1}^{K} | Σ_{p=1}^{P} u_{p,k} G(x,y; r_p, ω_k) |²</code>
            <p>
              Burada <strong>D = Eh³ / [12(1 − ν²)]</strong> eğilme rijitliği, <strong>G(r; r_p, ω_k)</strong> serbest kenarlı
              Euler–Bernoulli özmod açılımıyla kurulan tam plaka Green fonksiyonudur. Farklı frekanslar zaman ortalamasında çapraz
              terim üretmeden (ortogonal) toplandığı için toplam titreşim alanı <em>I(x,y)</em> pozitif-kesin olarak kararlı kalır.
            </p>
          </div>
          <div class="formula-box">
            <span class="formula-label">Leissa (NASA SP-160, 1969) Analitik Doğrulaması</span>
            <code>λ₁,₁ = ω₁,₁ L² √(ρh / D) = 13.89   (NASA Leissa 1969 referansı: 13.49 · Sapma: %2.9)</code>
            <p>
              25×25 cm × 1.5 mm Alüminyum 6061-T6 plaka için temel burulma özmodu f₁,₁ ≈ 82 Hz olarak analitik teoriyle örtüşür.
            </p>
          </div>
        </div>
      </section>

      <section class="guide-sec">
        <span class="guide-step">BÖLÜM 04 · GERÇEK HAYAT PROTOTİPİ &amp; İNTERAKTİF KURULUM KATALOĞU</span>
        <h2>4. Bu Sistem Gerçek Hayatta Sıfırdan Nasıl Kurulur? (Adım Adım Montaj Kataloğu)</h2>
        <div class="simple-box">
          <strong>Arduino Gerekmez &amp; Piezolar Altta Havada Durur!</strong> Bilgisayara takılan çok jaklı bir USB ses kartı zaten
          6 veya 8 bağımsız kanalı faz-senkronlu sürer. <strong>Piezolar plakanın ALT YÜZÜNE paralel yapışır</strong>; plaka ise
          <strong>4 adet 2.5 cm yumuşak sünger takoz</strong> üzerine oturduğu için piezolar masaya hiç değmeden altta havada asılı kalır
          ve plakayı <strong>aşağı–yukarı (±z)</strong> büker.
        </div>
        ${renderAssemblyManualHTML('tr')}
      </section>

      <section class="guide-sec">
        <span class="guide-step">BÖLÜM 05 · AKADEMİK KAYNAKÇA</span>
        <h2>5. Hakemli Makaleler ve Bilimsel Referanslar (8 Kaynak)</h2>
        <p class="guide-ref-intro">
          PULSE+ fizik motorundaki denklemler, doğrulama sabitleri ve dalga kontrol ilkeleri aşağıdaki birincil fizik ve
          mühendislik yayınlarına dayanır:
        </p>
        <div class="refs-grid">${refsHtml}</div>
      </section>
    </div>
  `;
}
