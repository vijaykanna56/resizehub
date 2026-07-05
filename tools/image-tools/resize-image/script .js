// State variables
let originalImage = null;
let originalWidth = 0;
let originalHeight = 0;
let originalFileName = 'image';
let originalFileType = 'image/jpeg';
let originalFileSizeKb = 0;

let currentUnit = 'px'; // 'px', 'cm', 'mm'
let aspectRatioLocked = true;
let currentDpi = 300;
let currentPaddingFill = 'transparent'; // 'transparent', 'white', 'black'
let currentFormat = 'image/jpeg'; // 'image/jpeg', 'image/png', 'image/webp'
let currentQuality = 0.85;

// Exam specs dictionary copy for local resizer validation
const COMPLIANCE_PRESETS = {
  'ssc-photo': { name: 'SSC Photo', w: 3.5, h: 4.5, unit: 'cm', format: 'image/jpeg', minKb: 20, maxKb: 50, desc: '3.5 x 4.5 cm | 20KB-50KB' },
  'ssc-sig': { name: 'SSC Signature', w: 4.0, h: 2.0, unit: 'cm', format: 'image/jpeg', minKb: 10, maxKb: 20, desc: '4.0 x 2.0 cm | 10KB-20KB' },
  'ibps-photo': { name: 'IBPS Photo', w: 3.5, h: 4.5, unit: 'cm', format: 'image/jpeg', minKb: 20, maxKb: 50, desc: '3.5 x 4.5 cm | 20KB-50KB' },
  'ibps-sig': { name: 'IBPS Signature', w: 140, h: 60, unit: 'px', format: 'image/jpeg', minKb: 10, maxKb: 20, desc: '140 x 60 px | 10KB-20KB' },
  'upsc-photo': { name: 'UPSC Photo', w: 350, h: 350, unit: 'px', format: 'image/jpeg', minKb: 20, maxKb: 300, desc: '350 x 350 px | 20KB-300KB' },
  'upsc-sig': { name: 'UPSC Signature', w: 350, h: 350, unit: 'px', format: 'image/jpeg', minKb: 20, maxKb: 300, desc: '350 x 350 px | 20KB-300KB' },
  'rrb-photo': { name: 'RRB Photo', w: 320, h: 240, unit: 'px', format: 'image/jpeg', minKb: 20, maxKb: 70, desc: '320 x 240 px | 20KB-70KB' },
  'rrb-sig': { name: 'RRB Signature', w: 400, h: 150, unit: 'px', format: 'image/jpeg', minKb: 10, maxKb: 30, desc: '400 x 150 px | 10KB-30KB' },
  'police-photo': { name: 'Police Photo', w: 4.0, h: 5.0, unit: 'cm', format: 'image/jpeg', minKb: 20, maxKb: 100, desc: '4.0 x 5.0 cm | 20KB-100KB' },
  'police-sig': { name: 'Police Signature', w: 6.0, h: 2.0, unit: 'cm', format: 'image/jpeg', minKb: 10, maxKb: 50, desc: '6.0 x 2.0 cm | 10KB-50KB' }
};

let activePresetKey = 'none';

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Bind file uploading hooks
  initUploadHandlers();

  // Bind input element controllers
  initControlPanel();
});

// File Upload Drag & Drop Interface
function initUploadHandlers() {
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const btnSelect = document.getElementById('btnSelectImage');

  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processUploadedFile(files[0]);
      }
    });
  }

  if (btnSelect && fileInput) {
    btnSelect.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        processUploadedFile(e.target.files[0]);
      }
    });
  }
}

// Read & process the client-side file
function processUploadedFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image file format (PNG, JPG, WebP, GIF).');
    return;
  }

  // Store metadata
  originalFileName = file.name.split('.').slice(0, -1).join('.');
  originalFileType = file.type;
  originalFileSizeKb = (file.size / 1024).toFixed(1);

  // Read File fully client-side
  const reader = new FileReader();
  reader.onload = (e) => {
    originalImage = new Image();
    originalImage.onload = () => {
      originalWidth = originalImage.width;
      originalHeight = originalImage.height;

      // Update Dimensions Labels
      document.getElementById('metaOrigName').textContent = file.name;
      document.getElementById('metaOrigSize').textContent = `${originalWidth} x ${originalHeight} px`;
      document.getElementById('metaOrigWeight').textContent = `${originalFileSizeKb} KB`;

      // Set input fields to matching pixel widths initially
      currentUnit = 'px';
      syncActiveUnitButtons();
      
      document.getElementById('widthInput').value = originalWidth;
      document.getElementById('heightInput').value = originalHeight;

      // Unhide Preview grid and hide upload prompt
      document.getElementById('uploadPrompt').style.display = 'none';
      document.getElementById('previewStageContainer').classList.add('active');

      // Refresh DPI input visibility
      toggleDpiInputVisibility();

      // Recalculate aspect ratio on load
      recalculateCanvas();
    };
    originalImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Sidebar Controls & Inputs bindings
function initControlPanel() {
  const widthInput = document.getElementById('widthInput');
  const heightInput = document.getElementById('heightInput');
  const dpiInput = document.getElementById('dpiInput');
  const aspectBtn = document.getElementById('aspectLockBtn');
  const formatSelect = document.getElementById('formatSelect');
  const qualitySlider = document.getElementById('qualitySlider');
  const downloadBtn = document.getElementById('downloadBtn');

  // Input events
  widthInput.addEventListener('input', () => {
    if (aspectRatioLocked && originalImage) {
      const w = parseFloat(widthInput.value) || 0;
      const originalRatio = originalWidth / originalHeight;
      heightInput.value = Math.round((w / originalRatio) * 100) / 100;
    }
    recalculateCanvas();
  });

  heightInput.addEventListener('input', () => {
    if (aspectRatioLocked && originalImage) {
      const h = parseFloat(heightInput.value) || 0;
      const originalRatio = originalWidth / originalHeight;
      widthInput.value = Math.round((h * originalRatio) * 100) / 100;
    }
    recalculateCanvas();
  });

  dpiInput.addEventListener('input', () => {
    currentDpi = parseInt(dpiInput.value) || 300;
    recalculateCanvas();
  });

  aspectBtn.addEventListener('click', () => {
    aspectRatioLocked = !aspectRatioLocked;
    if (aspectRatioLocked) {
      aspectBtn.classList.add('locked');
      aspectBtn.innerHTML = '<i data-lucide="lock" style="width: 16px; height: 16px;"></i>';
      // Sync aspect height immediately
      if (originalImage && parseFloat(widthInput.value)) {
        const w = parseFloat(widthInput.value);
        const originalRatio = originalWidth / originalHeight;
        heightInput.value = Math.round((w / originalRatio) * 100) / 100;
        recalculateCanvas();
      }
    } else {
      aspectBtn.classList.remove('locked');
      aspectBtn.innerHTML = '<i data-lucide="lock-open" style="width: 16px; height: 16px;"></i>';
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });

  // Background padding fills buttons
  const bgButtons = document.querySelectorAll('.preset-btn[data-bg]');
  bgButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      bgButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPaddingFill = btn.dataset.bg;
      recalculateCanvas();
    });
  });

  // Preset pills bindings (SSC/IBPS/etc)
  const presetPills = document.querySelectorAll('.preset-pill');
  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      presetPills.forEach(p => p.classList.remove('active'));
      
      const key = pill.dataset.preset;
      if (activePresetKey === key) {
        // Toggle off
        activePresetKey = 'none';
        document.getElementById('complianceNotice').style.display = 'none';
      } else {
        activePresetKey = key;
        pill.classList.add('active');
        applyCompliancePreset(key);
      }
    });
  });

  // Unit toggle bindings
  const unitButtons = document.querySelectorAll('.unit-btn');
  unitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const nextUnit = btn.dataset.unit;
      if (currentUnit === nextUnit) return;
      
      convertActiveInputUnits(currentUnit, nextUnit);
      currentUnit = nextUnit;
      
      syncActiveUnitButtons();
      toggleDpiInputVisibility();
      recalculateCanvas();
    });
  });

  // Format selection
  formatSelect.addEventListener('change', (e) => {
    currentFormat = e.target.value;
    // Show/hide quality slider (PNG doesn't support quality compression parameter standardly)
    const qContainer = document.getElementById('qualitySliderContainer');
    if (currentFormat === 'image/png') {
      qContainer.style.opacity = '0.5';
      qContainer.style.pointerEvents = 'none';
    } else {
      qContainer.style.opacity = '1';
      qContainer.style.pointerEvents = 'auto';
    }
    recalculateCanvas();
  });

  // Quality Slider
  qualitySlider.addEventListener('input', (e) => {
    currentQuality = parseFloat(e.target.value) / 100;
    document.getElementById('qualityValLabel').textContent = `${e.target.value}%`;
    recalculateCanvas();
  });

  // Download Trigger
  downloadBtn.addEventListener('click', () => {
    triggerFileDownload();
  });
}

// Dynamic conversion of input states
function convertActiveInputUnits(fromUnit, toUnit) {
  const wInput = document.getElementById('widthInput');
  const hInput = document.getElementById('heightInput');
  let w = parseFloat(wInput.value) || 0;
  let h = parseFloat(hInput.value) || 0;

  if (w === 0 || h === 0) return;

  // First convert FROM current unit to absolute Pixels
  let pxW = w;
  let pxH = h;
  if (fromUnit === 'cm') {
    pxW = (w / 2.54) * currentDpi;
    pxH = (h / 2.54) * currentDpi;
  } else if (fromUnit === 'mm') {
    pxW = (w / 25.4) * currentDpi;
    pxH = (h / 25.4) * currentDpi;
  }

  // Then convert from pixels to TARGET unit
  let targetW = pxW;
  let targetH = pxH;
  if (toUnit === 'cm') {
    targetW = (pxW / currentDpi) * 2.54;
    targetH = (pxH / currentDpi) * 2.54;
  } else if (toUnit === 'mm') {
    targetW = (pxW / currentDpi) * 25.4;
    targetH = (pxH / currentDpi) * 25.4;
  }

  // Round values nicely
  wInput.value = Math.round(targetW * 100) / 100;
  hInput.value = Math.round(targetH * 100) / 100;
}

function syncActiveUnitButtons() {
  const buttons = document.querySelectorAll('.unit-btn');
  buttons.forEach(btn => {
    if (btn.dataset.unit === currentUnit) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update input field suffixes
  document.getElementById('widthSuffix').textContent = currentUnit;
  document.getElementById('heightSuffix').textContent = currentUnit;
}

function toggleDpiInputVisibility() {
  const dpiContainer = document.getElementById('dpiInputContainer');
  if (currentUnit === 'cm' || currentUnit === 'mm') {
    dpiContainer.classList.add('active');
  } else {
    dpiContainer.classList.remove('active');
  }
}

// Recalculates canvas sizes, performs resizing, and estimates file sizes
function recalculateCanvas() {
  if (!originalImage) return;

  const canvas = document.getElementById('canvasPreview');
  const ctx = canvas.getContext('2d');

  // 1. Calculate Target Pixels
  const wVal = parseFloat(document.getElementById('widthInput').value) || 0;
  const hVal = parseFloat(document.getElementById('heightInput').value) || 0;

  if (wVal <= 0 || hVal <= 0) return;

  let targetPixelW = wVal;
  let targetPixelH = hVal;

  if (currentUnit === 'cm') {
    targetPixelW = Math.round((wVal / 2.54) * currentDpi);
    targetPixelH = Math.round((hVal / 2.54) * currentDpi);
  } else if (currentUnit === 'mm') {
    targetPixelW = Math.round((wVal / 25.4) * currentDpi);
    targetPixelH = Math.round((hVal / 25.4) * currentDpi);
  }

  // Update canvas boundaries
  canvas.width = targetPixelW;
  canvas.height = targetPixelH;

  // 2. Perform rendering on canvas
  ctx.clearRect(0, 0, targetPixelW, targetPixelH);

  // Background fill
  if (currentPaddingFill === 'white') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetPixelW, targetPixelH);
  } else if (currentPaddingFill === 'black') {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, targetPixelW, targetPixelH);
  }

  // Draw image
  if (aspectRatioLocked) {
    // Contain pattern centering: fit the image in bounds
    const origRatio = originalWidth / originalHeight;
    const targetRatio = targetPixelW / targetPixelH;
    let renderW, renderH, renderX, renderY;

    if (origRatio > targetRatio) {
      renderW = targetPixelW;
      renderH = targetPixelW / origRatio;
      renderX = 0;
      renderY = (targetPixelH - renderH) / 2;
    } else {
      renderH = targetPixelH;
      renderW = targetPixelH * origRatio;
      renderX = (targetPixelW - renderW) / 2;
      renderY = 0;
    }

    ctx.drawImage(originalImage, renderX, renderY, renderW, renderH);
  } else {
    // Squeeze fill: stretch to match exactly
    ctx.drawImage(originalImage, 0, 0, targetPixelW, targetPixelH);
  }

  // Display pixels bounds in stage badge
  document.getElementById('stageResBadge').textContent = `${targetPixelW} x ${targetPixelH} PX`;

  // 3. Estimate Output File size in real-time
  canvas.toBlob((blob) => {
    if (!blob) return;

    const sizeKb = (blob.size / 1024).toFixed(1);
    const sizeLabel = document.getElementById('metaOptWeight');
    sizeLabel.textContent = `${sizeKb} KB`;

    // Validate size against active presets
    performComplianceValidation(parseFloat(sizeKb));
  }, currentFormat, currentQuality);

  // Sync format metadata labels
  let formatText = 'JPG';
  if (currentFormat === 'image/png') formatText = 'PNG';
  else if (currentFormat === 'image/webp') formatText = 'WEBP';
  document.getElementById('metaOptFormat').textContent = formatText;
}

// Active validation against Indian Gov guidelines
function performComplianceValidation(weightKb) {
  const statusIcon = document.getElementById('complianceStatusIcon');
  const statusTitle = document.getElementById('complianceStatusTitle');
  const statusBox = document.getElementById('complianceNotice');

  if (activePresetKey === 'none') {
    statusBox.style.display = 'none';
    return;
  }

  const rule = COMPLIANCE_PRESETS[activePresetKey];
  statusBox.style.display = 'block';

  const wVal = parseFloat(document.getElementById('widthInput').value) || 0;
  const hVal = parseFloat(document.getElementById('heightInput').value) || 0;

  // Validate width, height, and file weight
  const isWValid = Math.abs(wVal - rule.w) < 0.05;
  const isHValid = Math.abs(hVal - rule.h) < 0.05;
  const isUnitValid = currentUnit === rule.unit;
  const isWeightValid = weightKb >= rule.minKb && weightKb <= rule.maxKb;

  const complies = isWValid && isHValid && isUnitValid && isWeightValid;

  if (complies) {
    statusBox.style.backgroundColor = '#ecfdf5'; // light emerald
    statusBox.style.borderColor = '#10b981';
    statusIcon.style.color = '#10b981';
    statusIcon.innerHTML = '<i data-lucide="check-circle" style="width: 20px; height: 20px;"></i>';
    statusTitle.innerHTML = `<span style="color: #065f46; font-weight: 700;">Submission Compliant!</span>`;
    document.getElementById('complianceStatusDesc').innerHTML = `This canvas is perfectly formatted for <strong>${rule.name}</strong> guidelines (${rule.desc}).`;
  } else {
    statusBox.style.backgroundColor = '#fffbeb'; // light amber
    statusBox.style.borderColor = '#f59e0b';
    statusIcon.style.color = '#f59e0b';
    statusIcon.innerHTML = '<i data-lucide="alert-triangle" style="width: 20px; height: 20px;"></i>';
    statusTitle.innerHTML = `<span style="color: #92400e; font-weight: 700;">Adjustment Required</span>`;
    
    let advice = `Guidelines: <strong>${rule.desc}</strong>.<br>`;
    if (!isUnitValid || !isWValid || !isHValid) {
      advice += `• Change dimensions to <strong>${rule.w} x ${rule.h} ${rule.unit}</strong>.<br>`;
    }
    if (!isWeightValid) {
      if (weightKb < rule.minKb) {
        advice += `• Current weight (<strong>${weightKb}KB</strong>) is too light. Boost quality slider or select PNG format.<br>`;
      } else {
        advice += `• Current weight (<strong>${weightKb}KB</strong>) exceeds limit. Reduce quality slider further.<br>`;
      }
    }
    document.getElementById('complianceStatusDesc').innerHTML = advice;
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Apply Selected Official Guidelines
function applyCompliancePreset(presetKey) {
  const rule = COMPLIANCE_PRESETS[presetKey];
  if (!rule) return;

  // 1. Force state parameters
  currentUnit = rule.unit;
  currentFormat = rule.format;
  aspectRatioLocked = true;

  // Sync unit toggles in UI
  syncActiveUnitButtons();
  toggleDpiInputVisibility();

  // Force DPI to 300 for cm compliance
  if (currentUnit === 'cm') {
    currentDpi = 300;
    document.getElementById('dpiInput').value = 300;
  }

  // Update dropdown selection
  document.getElementById('formatSelect').value = currentFormat;
  const qContainer = document.getElementById('qualitySliderContainer');
  qContainer.style.opacity = '1';
  qContainer.style.pointerEvents = 'auto';

  // 2. Set dimensions
  document.getElementById('widthInput').value = rule.w;
  document.getElementById('heightInput').value = rule.h;

  // Force aspect ratio lock button UI to active
  const aspectBtn = document.getElementById('aspectLockBtn');
  aspectBtn.classList.add('locked');
  aspectBtn.innerHTML = '<i data-lucide="lock" style="width: 16px; height: 16px;"></i>';

  // 3. Intelligently set slider quality to hit target weight range if file is loaded
  if (originalImage) {
    // Start at a reasonable 80% and scale if needed
    document.getElementById('qualitySlider').value = 80;
    currentQuality = 0.8;
    document.getElementById('qualityValLabel').textContent = '80%';
    
    // Auto fill backgrounds with pure solid white for photos standard
    if (presetKey.includes('photo')) {
      document.querySelectorAll('.preset-btn[data-bg]').forEach(b => b.classList.remove('active'));
      document.querySelector('.preset-btn[data-bg="white"]').classList.add('active');
      currentPaddingFill = 'white';
    }
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
  
  // Draw canvas
  recalculateCanvas();
}

// Trigger Client-Side Secure File Download
function triggerFileDownload() {
  if (!originalImage) return;

  const canvas = document.getElementById('canvasPreview');
  const ext = currentFormat.split('/')[1] === 'jpeg' ? 'jpg' : currentFormat.split('/')[1];
  const targetW = canvas.width;
  const targetH = canvas.height;

  canvas.toBlob((blob) => {
    if (!blob) return;

    const downloadLink = document.createElement('a');
    downloadLink.download = `${originalFileName}_resized_${targetW}x${targetH}.${ext}`;
    downloadLink.href = URL.createObjectURL(blob);
    
    // Click programmatically
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean cache
    setTimeout(() => URL.revokeObjectURL(downloadLink.href), 1000);
  }, currentFormat, currentQuality);
}
