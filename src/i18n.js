/**
 * PULSE+ — Complete Bilingual Internationalization (TR / EN)
 * Switches every label, tooltip, physics caption, game level, and science guide live.
 */

export const TRANSLATIONS = {
  tr: {
    docTitle: 'PULSE+ — Sesle Şekillenen Kum',
    modeStudio: 'Stüdyo',
    modeGame: 'Oyun',
    modeGuide: 'Nasıl Çalışır?',
    audioOn: 'Ses',
    audioOff: 'Sessiz',
    physicsLab: 'Fizik Lab',
    physicsLabTitle: 'Fizik Laboratuvarı',
    closeLabTitle: 'Daralt (Esc)',
    computing: 'Hesaplanıyor',
    preparingPlate: 'Plaka hazırlanıyor',
    preparingPhysics: 'Plaka fiziği hazırlanıyor',

    // Plate bar & Telemetry
    viewLabel: 'Görünüm',
    layerSand: 'Kum',
    layerHeatmap: 'Titreşim',
    layerWave: 'Dalga',
    layerTarget: 'Hedef',
    peakLabel: 'Baskın',
    singleLabel: 'Tekil',
    scanLabel: 'Tarama',
    lockedLabel: 'Kilitlendi',
    activeFreqsLabel: 'Aktif Frekanslar (Hz)',
    tuneManually: 'Manuel Ayarla →',
    statIou: 'IoU',
    statContrast: 'Kontrast',
    statOverlap: 'Hedef Kum',
    statMode: 'Mod',
    statDrive: 'Tahrik',
    statEigenmode: 'Özmod',
    statSingleF: 'Tekil f',
    analytic: 'Analitik',
    playTitle: 'Başlat (Boşluk)',
    pauseTitle: 'Duraklat (Boşluk)',
    scatterTitle: 'Kumu dağıt',
    sandUnit: 'Kum',

    // Studio Card
    studioTitle: 'Rakam seç veya yaz',
    studioSubDefault: 'Düz metal plaka üstündeki serbest kum, eşzamanlı dalga girişimiyle şekil alır.',
    wordPlaceholder: 'Kelime, harf veya cümle yaz...',
    sendWordTitle: 'Kumda oluştur',
    digitTourStart: '0–9 Otomatik',
    digitTourStop: 'Turu Durdur',
    drawModeBtn: 'Kendin Çiz',
    guideTeaserText: 'Ses kumu nasıl rakamlara dönüştürüyor?',
    guideTeaserCta: 'Rehberi Oku →',
    customDrawLabel: 'ÇİZİM',

    // Draw Card
    drawEyebrow: 'Serbest Çizim',
    drawTitle: 'Plakanın üzerine çiz',
    drawSub: 'Sol taraftaki plakaya fare veya parmağınla istediğin şekli çiz, sonra ses dalgalarına dönüştür.',
    drawSolveBtn: 'Kumda Oluştur',
    drawClearBtn: 'Temizle',
    drawExitBtn: 'Geri Dön',

    // Game Card
    gameScoreUnit: 'puan',
    gameMatchLabel: 'Rezonans Uyumu',
    gameKnobsLabel: 'Frekans Ayar Kanalları',
    gameStatusTune: 'Ayarla',
    gameStatusWarm: 'Yakın',
    gameStatusLocked: 'Kilitlendi',
    gameSecretReadout: 'Gizli Şifre',
    gameUnlockedReadout: 'Kilit açıldı',
    gameWinSubNext: 'Ses dalgaları rezonansa kilitlendi.',
    gameWinSubAll: 'Tüm 8 seviyeyi tamamladın.',
    gameNextBtn: 'Sonraki',
    gameReplayBtn: 'Tekrar Oyna',
    gameKnobPrefix: 'Ses',
    gameLevelPrefix: 'SEVİYE',

    // Lab Tabs
    tabFreqs: 'Frekanslar',
    tabHardware: 'Donanım',
    tabThesis: 'Tez Verisi',

    // Manual Frequency Mixer
    mixerTitlePrefix: 'Manuel Frekans Kontrolü',
    mixerGameTitlePrefix: 'Canlı Oyun Frekansları',
    mixerClassicTitle: 'Tekil Sinüs Tahriki (1 Hoparlör)',
    channelWord: 'Kanal',
    resetAllBtn: 'Tümünü Sıfırla',
    mixerHintStudio: 'Her kanalın şiddetini (%0–%200) ve gerçek Hz frekansını ayrı ayrı değiştirebilir, ↺ ile tek tek varsayılana döndürebilirsin.',
    mixerHintGame: 'Oyun modunda frekanslar sol taraftaki şifre kaydırıcılarıyla canlı yönetilir; kilitlenen kanallar yeşile döner.',
    mixerHintClassic: '1 Hoparlör klasik tarama modunda tek sinüs dalgası çalışır; frekansı Donanım sekmesinden değiştirebilirsin.',
    ctrlGain: 'Şiddet',
    ctrlFreq: 'Frekans',
    mutedTag: 'KAPALI',
    singleSineTag: 'Tekil Sinüs',
    resetChannelTip: (idx, hz) => `F${idx} kanalını varsayılana döndür (${hz} Hz · %100)`,
    defaultChannelTip: (hz) => `Varsayılan (${hz} Hz · %100)`,

    // Hardware Tab
    hwSectionLabel: 'Akustik Donanım (Düz Metal Plaka)',
    hw8: '8 Piezo',
    hw16: '16 Piezo',
    hw40: '40 Piezo',
    hwClassic: '1 Hoparlör',
    hwClassicDetail: '1 Hoparlör Klasik',
    hwHints: {
      array8: '8 kenar piezo (her kenara 2) — tek 7.1 USB ses kartıyla evde kurulabilen gerçek prototip (%89 ort. IoU).',
      array16: '16 kenar piezo (her kenara 4) × 8 eşzamanlı frekans — çizgisiz düz plakada %95+ netlik.',
      array40: '40 kenar piezo × 10 eşzamanlı frekans — tek plakada çoklu kelimeler (CAT, PULSE+) için.',
      classic: '1 hoparlör + düz metal plaka — rakamlar fiziksel kısıtla düşük netlikte kalır; aşağıdaki kaydırıcıyla klasik Chladni özmodları da izlenebilir.',
    },
    classicSweepLabel: 'Tekil Frekans Tarayıcı',
    materialLabel: 'Plaka Malzemesi',
    particleLabel: 'Kum Taneciği',
    gammaLabel: 'Titreşim İvmesi (Γ = a/g)',
    volumeLabel: 'Ses Seviyesi',
    wordModeLabel: 'Çoklu Metin Oynatma',
    wordModeAuto: 'Otomatik',
    wordModeChar: 'Harf Harf (En Net)',
    wordModeWord: 'Kelime Kelime',
    wordModeSingle: 'Tek Plakada',
    seqDurationLabel: 'Geçiş Süresi',
    seqUnit: 'sn',
    loopLabel: 'Sekans Döngüsü',
    loopOn: 'Döngü: Açık',
    loopOff: 'Döngü: Kapalı',

    // Materials
    materials: {
      aluminum: { name: 'Alüminyum 6061-T6', short: 'Al 6061-T6' },
      acrylic: { name: 'Akrilik / PLA (3D)', short: 'Akrilik PMMA' },
      brass: { name: 'Pirinç C260', short: 'Pirinç C260' },
      steel: { name: 'Paslanmaz Çelik 304', short: 'Çelik 304' },
    },

    // Thesis Tab
    pdeLabel: 'Kirchhoff–Love Alan Denklemi',
    constantsLabel: 'Plaka Sabitleri & NASA Leissa Doğrulaması',
    modesWord: 'Modlar',
    channelDriveLabel: 'Gerçek Donanım Kanal Sürüşü',
    channelCsvBtn: 'Kanal CSV',
    thChannel: 'Kanal',
    thPos: 'Konum',
    thAmp: 'Genlik',
    thPhase: 'Faz',
    channelMoreNote: 'İlk 16 kanal gösteriliyor (tümü CSV/JSON içinde).',
    exportLabel: 'Tez Verisi İndir',
    exportJsonBtn: 'JSON İndir',
    exportCsvBtn: 'Spektrum CSV',
    benchRunBtn: '0–9 Toplu Tez Testi Çalıştır',
    benchRunning: (i) => `Test ediliyor (${i}/10)...`,
    benchAvgIou: 'Ort. IoU',
    benchContrast: 'Kontrast',
    benchLeissa: 'Leissa',
    benchThDigit: 'Rakam',
    benchThPeak: 'Baskın f',
    benchThTime: 'Süre',
    benchDownloadCsv: '0–9 Tablosunu CSV İndir',

    // Dynamic Status & Physics Stories
    statusSingleSpeaker: (label, iou) =>
      `1 hoparlör (düz plaka): fiziksel simetri kısıtı nedeniyle "${label}" yalnızca %${iou} yakınsar.`,
    statusMultiPiezo: (pCount, label) =>
      `Dümdüz metal plakada ${pCount} kenar transdüseriyle "${label}" oluşuyor.`,
    statusClassicMode: (freq) =>
      `Tek merkez hoparlör · düz metal plakada klasik Chladni özmodu (${freq} Hz).`,
    storyClassic: (f) =>
      `Tek hoparlörden çıkan ${f} Hz saf sinüs dalgası plakada duran dalga (özmod) kuruyor; kum titreşimsiz düğüm çizgilerinde toplanır.`,
    storyGameLocked: (n, pct) =>
      `Tüm kanallar gerçek Kirchhoff–Love rezonansına kilitlendi (${n} eşzamanlı frekans · %${pct} uyum).`,
    storyGameTuning:
      'Kaydırıcılar frekansları gerçek Lorentzian rezonans eğrisinde tarıyor; kanallar doğru Hz’ye yaklaştıkça yıkıcı gürültü temizlenir.',
    storySingleSpeaker: (active, total, domF) =>
      `1 hoparlörde faz serbestliği olmadığı için ${active}/${total} frekans (${domF} Hz baskın) düz plakada yalnızca düşük yakınsama verir.`,
    storyManual: (active, total, domF) =>
      `Manuel ayar aktif (${active}/${total} kanal açık) · ${domF} Hz baskın; gerçek Kirchhoff–Love dalga alanı canlı güncelleniyor.`,
    storyAuto: (label, pool, total, f1, f2) =>
      `"${label}" için ${pool} özmod bandından seçilen ${total} frekans aktif · ${f1} Hz ve ${f2} Hz baskın düğüm çizgilerini kuruyor.`,
    storyOneLeft: (f1) =>
      `Yalnızca ${f1} Hz açık · tekil dalgayla rakam bozulur; düğüm girişimi için diğer kanalları artır.`,
    storyAllMuted: 'Tüm frekanslar sıfırlandı · plakada titreşim yok, kum hareketsiz.',
    solvingTarget: (label) => `"${label}" hesaplanıyor`,
    preparingLevel: (id) => `Seviye ${id} hazırlanıyor`,
    backToStudioCta: 'Stüdyoya Dön ve Canlı Deney Yap →',

    // Game Levels TR
    gameLevels: [
      { name: 'İlk Rezonans', category: 'GİZLİ RAKAM', hint: 'İki ses düğmesini yavaşça kaydır — kumlar yuvarlak bir rakama dönüşecek!' },
      { name: 'Üçlü Dalga', category: 'GİZLİ RAKAM', hint: 'Sesler uyuma girdiğinde plakanın sağında kıvrımlı bir rakam belirecek.' },
      { name: 'Sonsuzluk Halkası', category: 'GİZLİ RAKAM', hint: '3 ses kanalını da yeşile kilitlediğinde çift halkalı rakam ortaya çıkacak.' },
      { name: 'İlk Harf', category: 'GİZLİ HARF', hint: 'Alfabenin ilk harfi frekansların arasına gizlendi — sesi dinleyerek ayarla!' },
      { name: 'Beşinci Harmonik', category: 'GİZLİ RAKAM', hint: 'Uyum çubuğu %90 üzerine çıktığında gizli rakam tamamen netleşecek.' },
      { name: 'Akustik Kelime', category: 'GİZLİ KELİME', hint: '3 harfli sevimli bir İngilizce kelime kumların arasında saklı!' },
      { name: 'Zaman Şifresi', category: 'GİZLİ YIL', hint: '4 ses kanalını rezonansa getirerek gizli yılı çöz.' },
      { name: 'Final: PULSE+', category: 'USTA ŞİFRE', hint: 'Son seviye! 4 frekans grubunu kilitleyerek projenin adını kumda yazdır.' },
    ],
  },

  en: {
    docTitle: 'PULSE+ — Sound-Sculpted Sand',
    modeStudio: 'Studio',
    modeGame: 'Game',
    modeGuide: 'How It Works',
    audioOn: 'Sound',
    audioOff: 'Muted',
    physicsLab: 'Physics Lab',
    physicsLabTitle: 'Physics Laboratory',
    closeLabTitle: 'Collapse (Esc)',
    computing: 'Computing',
    preparingPlate: 'Initializing plate',
    preparingPhysics: 'Updating plate physics',

    // Plate bar & Telemetry
    viewLabel: 'Layer',
    layerSand: 'Sand',
    layerHeatmap: 'Intensity',
    layerWave: 'Wave',
    layerTarget: 'Target',
    peakLabel: 'Peak',
    singleLabel: 'Single',
    scanLabel: 'Scanning',
    lockedLabel: 'Locked',
    activeFreqsLabel: 'Active Frequencies (Hz)',
    tuneManually: 'Tune Manually →',
    statIou: 'IoU',
    statContrast: 'Contrast',
    statOverlap: 'Sand in Target',
    statMode: 'Mode',
    statDrive: 'Drive',
    statEigenmode: 'Eigenmode',
    statSingleF: 'Single f',
    analytic: 'Analytic',
    playTitle: 'Play (Space)',
    pauseTitle: 'Pause (Space)',
    scatterTitle: 'Scatter sand',
    sandUnit: 'Sand',

    // Studio Card
    studioTitle: 'Pick a digit or type',
    studioSubDefault: 'Free sand on a flat metal plate forms shapes through simultaneous standing-wave interference.',
    wordPlaceholder: 'Type a word, letter, or sentence...',
    sendWordTitle: 'Synthesize in sand',
    digitTourStart: '0–9 Auto Tour',
    digitTourStop: 'Stop Tour',
    drawModeBtn: 'Freehand Draw',
    guideTeaserText: 'How does sound sculpt sand into digits?',
    guideTeaserCta: 'Read Guide →',
    customDrawLabel: 'DRAWING',

    // Draw Card
    drawEyebrow: 'Freehand Sketch',
    drawTitle: 'Draw on the plate',
    drawSub: 'Sketch any shape directly on the metal plate with your mouse or finger, then synthesize its real sound waves.',
    drawSolveBtn: 'Synthesize in Sand',
    drawClearBtn: 'Clear',
    drawExitBtn: 'Back',

    // Game Card
    gameScoreUnit: 'pts',
    gameMatchLabel: 'Resonance Lock',
    gameKnobsLabel: 'Frequency Channels',
    gameStatusTune: 'Tune',
    gameStatusWarm: 'Close',
    gameStatusLocked: 'Locked',
    gameSecretReadout: 'Hidden Cipher',
    gameUnlockedReadout: 'Unlocked',
    gameWinSubNext: 'All acoustic channels locked into resonance.',
    gameWinSubAll: 'You completed all 8 acoustic levels!',
    gameNextBtn: 'Next',
    gameReplayBtn: 'Play Again',
    gameKnobPrefix: 'Ch',
    gameLevelPrefix: 'LEVEL',

    // Lab Tabs
    tabFreqs: 'Frequencies',
    tabHardware: 'Hardware',
    tabThesis: 'Thesis Data',

    // Manual Frequency Mixer
    mixerTitlePrefix: 'Manual Frequency Console',
    mixerGameTitlePrefix: 'Live Game Frequencies',
    mixerClassicTitle: 'Single Sine Drive (1 Speaker)',
    channelWord: 'Ch',
    resetAllBtn: 'Reset All',
    mixerHintStudio: 'Adjust each channel’s gain (0%–200%) and real Kirchhoff–Love frequency (Hz) individually, or click ↺ to reset any single channel.',
    mixerHintGame: 'In Game mode, frequencies shift live via the puzzle sliders on the left; locked channels glow emerald green.',
    mixerHintClassic: 'In 1-Speaker classic sweep mode, a single pure sine wave drives the plate; adjust its Hz in the Hardware tab.',
    ctrlGain: 'Gain',
    ctrlFreq: 'Freq',
    mutedTag: 'MUTED',
    singleSineTag: 'Single Sine',
    resetChannelTip: (idx, hz) => `Reset F${idx} to default (${hz} Hz · 100%)`,
    defaultChannelTip: (hz) => `Default (${hz} Hz · 100%)`,

    // Hardware Tab
    hwSectionLabel: 'Acoustic Hardware (Flat Metal Plate)',
    hw8: '8 Piezos',
    hw16: '16 Piezos',
    hw40: '40 Piezos',
    hwClassic: '1 Speaker',
    hwClassicDetail: '1-Speaker Classic',
    hwHints: {
      array8: '8 perimeter piezos (2 per edge) — buildable home prototype using a single 7.1 USB sound card (~89% avg IoU).',
      array16: '16 perimeter piezos (4 per edge) × 8 simultaneous frequencies — 95%+ clarity on a flat, bar-free plate.',
      array40: '40 perimeter piezos × 10 simultaneous frequencies — crisp multi-letter words (CAT, PULSE+) at once.',
      classic: '1 speaker + flat metal plate — digits stay low-clarity due to symmetry limits; sweep classic Chladni eigenmodes below.',
    },
    classicSweepLabel: 'Single-Frequency Sweep',
    materialLabel: 'Plate Material',
    particleLabel: 'Sand Grains',
    gammaLabel: 'Peak Acceleration (Γ = a/g)',
    volumeLabel: 'Master Volume',
    wordModeLabel: 'Multi-Text Playback',
    wordModeAuto: 'Automatic',
    wordModeChar: 'Letter by Letter (Crispest)',
    wordModeWord: 'Word by Word',
    wordModeSingle: 'Single Plate',
    seqDurationLabel: 'Step Duration',
    seqUnit: 's',
    loopLabel: 'Sequence Loop',
    loopOn: 'Loop: On',
    loopOff: 'Loop: Off',

    // Materials
    materials: {
      aluminum: { name: 'Aluminum 6061-T6', short: 'Al 6061-T6' },
      acrylic: { name: 'Acrylic / PLA (3D)', short: 'Acrylic PMMA' },
      brass: { name: 'Brass C260', short: 'Brass C260' },
      steel: { name: 'Stainless Steel 304', short: 'Steel 304' },
    },

    // Thesis Tab
    pdeLabel: 'Kirchhoff–Love Plate Equation',
    constantsLabel: 'Plate Constants & NASA Leissa Validation',
    modesWord: 'Modes',
    channelDriveLabel: 'Real Hardware Channel Drive',
    channelCsvBtn: 'Channel CSV',
    thChannel: 'Ch',
    thPos: 'Position',
    thAmp: 'Amp',
    thPhase: 'Phase',
    channelMoreNote: 'Showing first 16 channels (all included in CSV/JSON).',
    exportLabel: 'Export Thesis Data',
    exportJsonBtn: 'Download JSON',
    exportCsvBtn: 'Spectrum CSV',
    benchRunBtn: 'Run 0–9 Thesis Benchmark',
    benchRunning: (i) => `Testing (${i}/10)...`,
    benchAvgIou: 'Avg IoU',
    benchContrast: 'Contrast',
    benchLeissa: 'Leissa',
    benchThDigit: 'Digit',
    benchThPeak: 'Peak f',
    benchThTime: 'Time',
    benchDownloadCsv: 'Download 0–9 Table CSV',

    // Dynamic Status & Physics Stories
    statusSingleSpeaker: (label, iou) =>
      `1 speaker (flat plate): due to physical symmetry limits, "${label}" converges to only ${iou}%.`,
    statusMultiPiezo: (pCount, label) =>
      `Forming "${label}" on a flat metal plate with ${pCount} perimeter transducers.`,
    statusClassicMode: (freq) =>
      `Single center speaker · classic Chladni eigenmode on a flat metal plate (${freq} Hz).`,
    storyClassic: (f) =>
      `A single ${f} Hz sine wave forms a symmetric standing eigenmode; sand gathers strictly along zero-vibration nodal curves.`,
    storyGameLocked: (n, pct) =>
      `All channels locked into Kirchhoff–Love resonance (${n} simultaneous frequencies · ${pct}% match).`,
    storyGameTuning:
      'Sliders sweep real Lorentzian resonance curves; as each channel nears its target Hz, destructive noise fades away.',
    storySingleSpeaker: (active, total, domF) =>
      `Without multi-actuator phase freedom, ${active}/${total} frequencies (${domF} Hz peak) can only weakly approximate the target.`,
    storyManual: (active, total, domF) =>
      `Manual tuning active (${active}/${total} channels on) · ${domF} Hz peak; live Kirchhoff–Love wavefield recalculated in real time.`,
    storyAuto: (label, pool, total, f1, f2) =>
      `Selected ${total} frequencies from ${pool} modal bands for "${label}" · ${f1} Hz & ${f2} Hz carve the primary quiet nodal lines.`,
    storyOneLeft: (f1) =>
      `Only ${f1} Hz active · a single frequency cannot hold an asymmetric digit; raise other channels to restore wave interference.`,
    storyAllMuted: 'All channels muted · zero vibration on the plate, sand remains still.',
    solvingTarget: (label) => `Solving "${label}"`,
    preparingLevel: (id) => `Preparing level ${id}`,
    backToStudioCta: 'Back to Studio & Experiment Live →',

    // Game Levels EN
    gameLevels: [
      { name: 'First Resonance', category: 'HIDDEN DIGIT', hint: 'Slide both channels slowly — the sand will lock into a round digit!' },
      { name: 'Triple Wave', category: 'HIDDEN DIGIT', hint: 'As the waves align, a curved digit appears on the right half of the plate.' },
      { name: 'Infinity Loop', category: 'HIDDEN DIGIT', hint: 'Lock all 3 channels to emerald green to reveal the double-loop digit.' },
      { name: 'First Letter', category: 'HIDDEN LETTER', hint: 'The first letter of the alphabet is hidden in the waves — listen as you tune!' },
      { name: 'Fifth Harmonic', category: 'HIDDEN DIGIT', hint: 'Cross 90% resonance lock and the hidden digit snaps crystal clear.' },
      { name: 'Acoustic Word', category: 'HIDDEN WORD', hint: 'A cute 3-letter English word is hiding inside the shimmering sand!' },
      { name: 'Time Cipher', category: 'HIDDEN YEAR', hint: 'Bring all 4 frequency groups into resonance to unlock the hidden year.' },
      { name: 'Final: PULSE+', category: 'MASTER CIPHER', hint: 'Final level! Lock all 4 frequency groups to spell the project name in sand.' },
    ],
  },
};
