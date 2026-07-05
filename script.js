// Static Tools Catalog - Over 85+ tools pre-configured
const TOOLS_CATALOG = [
  // Image Tools
  { id: 'resize-image', name: 'Standard Image Resizer', desc: 'Resize images in pixels, cm, or mm with custom quality and format presets.', cat: 'Image Tools', tags: ['resize', 'photo', 'dimension', 'canvas'], badge: 'popular', url: 'tools/image-tools/resize-image/index.html' },
  { id: 'crop-image', name: 'Focal Crop Tool', desc: 'Crop pictures to standard aspect ratios or custom rectangular dimensions.', cat: 'Image Tools', tags: ['crop', 'cut', 'aspect', 'photo'], badge: 'popular' },
  { id: 'compress-image', name: 'Smart Photo Compressor', desc: 'Compress high-res images to exact target file weights (e.g., under 50KB).', cat: 'Image Tools', tags: ['compress', 'kb', 'weight', 'size'], badge: 'new' },
  { id: 'signature-maker', name: 'E-Signature Fit', desc: 'Create, scale, and trim electronic signatures to official pen/ink dimensions.', cat: 'Image Tools', tags: ['signature', 'sign', 'ink', 'crop'], badge: 'gov' },
  { id: 'passport-photo', name: 'Passport Photo Generator', desc: 'Format standard passport-size headshots with official guidelines and white backgrounds.', cat: 'Image Tools', tags: ['passport', 'headshot', 'visas', 'official'], badge: 'popular' },
  { id: 'bg-remover', name: 'Offline Background Isolator', desc: 'Isolate subjects and remove backgrounds client-side utilizing browser APIs.', cat: 'Image Tools', tags: ['background', 'remove', 'png', 'transparent'], badge: 'new' },
  { id: 'webp-converter', name: 'WebP Engine Converter', desc: 'Convert heavy PNG/JPG files to highly optimized WebP formats for web performance.', cat: 'Image Tools', tags: ['webp', 'convert', 'format', 'images'] },
  { id: 'bulk-resizer', name: 'Bulk Image Resizer', desc: 'Process multiple images concurrently with identical size boundaries and constraints.', cat: 'Image Tools', tags: ['bulk', 'batch', 'multi', 'resize'] },
  { id: 'png-to-jpg', name: 'PNG to JPG Converter', desc: 'Transform transparent PNG files to high-fidelity white-ground JPG formats.', cat: 'Image Tools', tags: ['png', 'jpg', 'converter', 'format'] },
  { id: 'jpg-to-png', name: 'JPG to PNG Converter', desc: 'Convert JPG images to standard lossless web-ready PNG files.', cat: 'Image Tools', tags: ['jpg', 'png', 'converter', 'format'] },
  { id: 'meta-viewer', name: 'Image Metadata Viewer', desc: 'Examine EXIF metadata, camera settings, and geotags stored in images.', cat: 'Image Tools', tags: ['exif', 'metadata', 'gps', 'info'] },
  { id: 'svg-opt', name: 'SVG Path Optimizer', desc: 'Clean, minify, and optimize vector SVG shapes for web integrations.', cat: 'Image Tools', tags: ['svg', 'vector', 'minify', 'xml'] },
  { id: 'meme-gen', name: 'Meme Typography Builder', desc: 'Overlay bold text with responsive padding onto images with traditional outlines.', cat: 'Image Tools', tags: ['meme', 'generator', 'text', 'overlay'] },
  { id: 'gif-resizer', name: 'Animated GIF Resizer', desc: 'Scale animated GIFs while preserving timelines, frame rates, and looping attributes.', cat: 'Image Tools', tags: ['gif', 'animate', 'resize', 'scale'] },
  { id: 'rotate-photo', name: 'Lossless Photo Rotator', desc: 'Flip, mirror, or rotate images by degrees without compression quality loss.', cat: 'Image Tools', tags: ['rotate', 'flip', 'mirror', 'degrees'] },
  { id: 'watermark-photo', name: 'Batch Watermark Stamper', desc: 'Overlay logo marks or translucent copyright text onto sets of photos.', cat: 'Image Tools', tags: ['watermark', 'copyright', 'text', 'overlay'] },

  // Converters
  { id: 'pdf-to-word', name: 'PDF to Word Converter', desc: 'Export PDF documents into editable Word document formats offline.', cat: 'Converters', tags: ['pdf', 'word', 'doc', 'convert'], badge: 'popular' },
  { id: 'word-to-pdf', name: 'Word to PDF Converter', desc: 'Instantly convert docx documents into pristine PDF presentation materials.', cat: 'Converters', tags: ['word', 'pdf', 'docx', 'convert'] },
  { id: 'excel-to-pdf', name: 'Excel Sheet to PDF', desc: 'Convert spreadsheet grids into printer-friendly aligned PDF pages.', cat: 'Converters', tags: ['excel', 'sheets', 'pdf', 'convert'] },
  { id: 'pdf-to-jpg', name: 'PDF to JPG Extractor', desc: 'Convert individual PDF pages into separate high-resolution JPG images.', cat: 'Converters', tags: ['pdf', 'jpg', 'images', 'extract'] },
  { id: 'epub-to-pdf', name: 'EPUB to PDF Layout', desc: 'Format digital books and EPUB streams into standard page-numbered PDFs.', cat: 'Converters', tags: ['epub', 'ebook', 'pdf', 'convert'] },
  { id: 'xml-to-json', name: 'XML to JSON Parser', desc: 'Translate strict hierarchical XML tags into clean JSON objects.', cat: 'Converters', tags: ['xml', 'json', 'parse', 'code'] },
  { id: 'json-to-csv', name: 'JSON to CSV Stream', desc: 'Flatten complex JSON arrays into standard comma-separated spreadsheet rows.', cat: 'Converters', tags: ['json', 'csv', 'spreadsheet', 'export'] },
  { id: 'csv-to-json', name: 'CSV to JSON Parser', desc: 'Convert database tables or spreadsheet files into standard JSON array formats.', cat: 'Converters', tags: ['csv', 'json', 'import', 'parse'] },
  { id: 'html-to-md', name: 'HTML to Markdown Parser', desc: 'Strip inline HTML structures and convert content to clean readable Markdown.', cat: 'Converters', tags: ['html', 'markdown', 'md', 'convert'] },
  { id: 'base64-enc', name: 'Base64 Stream Encoder', desc: 'Encode binary images or texts into standard Base64 web-safe strings.', cat: 'Converters', tags: ['base64', 'encode', 'decode', 'binary'] },
  { id: 'url-enc', name: 'URL Query Param Encoder', desc: 'Percent-encode special characters in URLs for web-safe query streaming.', cat: 'Converters', tags: ['url', 'encode', 'decode', 'query'] },
  { id: 'md-to-html', name: 'Markdown to HTML compiler', desc: 'Compile markdown documents into fully styled semantic HTML code blocks.', cat: 'Converters', tags: ['markdown', 'html', 'compiler', 'md'] },
  { id: 'hex-to-rgb', name: 'HEX/RGB Color Swatcher', desc: 'Translate hexadecimal hash color codes to fractional RGB or HSL matrices.', cat: 'Converters', tags: ['hex', 'rgb', 'color', 'convert'] },
  { id: 'binary-conv', name: 'Binary Text Encoder', desc: 'Convert text characters to standard 8-bit binary structures and vice versa.', cat: 'Converters', tags: ['binary', 'bits', 'text', 'ascii'] },
  { id: 'currency-conv', name: 'Local Currency Calculator', desc: 'Calculate conversion rates across global currency profiles locally.', cat: 'Converters', tags: ['currency', 'money', 'rates', 'calculate'] },
  { id: 'unit-conv', name: 'Metric Unit Converter', desc: 'Convert metric measurements (inches, cm, mm, points) in high accuracy.', cat: 'Converters', tags: ['unit', 'inches', 'cm', 'metric'] },

  // PDF Utilities
  { id: 'merge-pdf', name: 'PDF Combiner Engine', desc: 'Merge multiple separate PDF files into a single continuous file.', cat: 'PDF Utilities', tags: ['pdf', 'merge', 'combine', 'documents'], badge: 'popular' },
  { id: 'split-pdf', name: 'PDF Page Splitter', desc: 'Extract specific pages or split heavy PDFs into individual single-sheet files.', cat: 'PDF Utilities', tags: ['pdf', 'split', 'extract', 'pages'] },
  { id: 'compress-pdf', name: 'PDF Vector Compressor', desc: 'Reduce PDF file sizes by compressing embedded vectors and scanning streams.', cat: 'PDF Utilities', tags: ['pdf', 'compress', 'size', 'kb'], badge: 'popular' },
  { id: 'protect-pdf', name: 'PDF Password Encrypter', desc: 'Apply high-strength user access passwords and printing restriction locks to PDFs.', cat: 'PDF Utilities', tags: ['pdf', 'password', 'encrypt', 'security'] },
  { id: 'unlock-pdf', name: 'PDF Restriction Remover', desc: 'Remove editing, printing, and copying locks from unprotected PDFs.', cat: 'PDF Utilities', tags: ['pdf', 'unlock', 'security', 'owner'] },
  { id: 'rotate-pdf', name: 'PDF Page Rotator', desc: 'Correct sideways or upside-down pages in PDFs globally or on specific rows.', cat: 'PDF Utilities', tags: ['pdf', 'rotate', 'orient', 'pages'] },
  { id: 'organize-pdf', name: 'PDF Reorder Grid', desc: 'Drag, drop, delete, and sort page hierarchies within loaded PDFs.', cat: 'PDF Utilities', tags: ['pdf', 'organize', 'sort', 'pages'] },
  { id: 'page-nums', name: 'PDF Page Numberer', desc: 'Add page numbers, headers, or footers with custom fonts and margins onto PDFs.', cat: 'PDF Utilities', tags: ['pdf', 'number', 'header', 'footer'] },
  { id: 'pdf-watermark', name: 'PDF Overlay Watermark', desc: 'Apply watermark templates across all pages behind document text vectors.', cat: 'PDF Utilities', tags: ['pdf', 'watermark', 'overlay', 'stamp'] },
  { id: 'sign-pdf', name: 'PDF Digital Signer', desc: 'Stamp e-signatures and custom text nodes onto specific parts of PDF pages.', cat: 'PDF Utilities', tags: ['pdf', 'sign', 'draw', 'signature'] },

  // Document Portals
  { id: 'pan-sizer', name: 'PAN Card Sizing Spec', desc: 'Resize scans of PAN Cards to standard official submission constraints.', cat: 'Document Portals', tags: ['pan', 'card', 'id', 'resize'], badge: 'gov' },
  { id: 'aadhaar-crop', name: 'Aadhaar Card Align', desc: 'Align and crop Aadhaar card front/back panels into a clean single page.', cat: 'Document Portals', tags: ['aadhaar', 'card', 'id', 'crop'], badge: 'gov' },
  { id: 'dl-crop', name: 'Driving License Crop', desc: 'Isolate front and back of driving license card scans into standard shapes.', cat: 'Document Portals', tags: ['license', 'id', 'card', 'crop'] },
  { id: 'resume-builder', name: 'Interactive CV Builder', desc: 'Compile plain text resume inputs into elegant professional PDF layouts.', cat: 'Document Portals', tags: ['cv', 'resume', 'job', 'pdf'] },
  { id: 'cover-letter', name: 'Cover Letter Maker', desc: 'Generate high-fidelity structured cover letters aligned with application layouts.', cat: 'Document Portals', tags: ['job', 'cover', 'letter', 'doc'] },
  { id: 'ocr-extract', name: 'OCR Text Extractor', desc: 'Extract digital editable text characters from scanned image documents.', cat: 'Document Portals', tags: ['ocr', 'text', 'scan', 'extract'], badge: 'new' },
  { id: 'invoice-gen', name: 'Invoice Generator', desc: 'Fill template grids to generate professional itemized payment invoices.', cat: 'Document Portals', tags: ['invoice', 'bill', 'receipt', 'pdf'] },
  { id: 'receipt-scanner', name: 'Receipt Crop Scanner', desc: 'Isolate, contrast, and flatten slanted smartphone photos of payment slips.', cat: 'Document Portals', tags: ['receipt', 'scan', 'crop', 'billing'] },

  // Government Exams
  { id: 'ssc-photo-fit', name: 'SSC Photo Complier', desc: 'Scale passport photos to exact 3.5 x 4.5 cm with under 50KB constraints for Staff Selection.', cat: 'Government Exams', tags: ['ssc', 'exam', 'photo', 'dimension'], badge: 'gov' },
  { id: 'ibps-sig-fit', name: 'IBPS Signature Maker', desc: 'Scale e-signatures to exact 140 x 60 pixels with blue/black ink compliance.', cat: 'Government Exams', tags: ['ibps', 'bank', 'signature', 'exam'], badge: 'gov' },
  { id: 'upsc-comply', name: 'UPSC Photo & Sig Fits', desc: 'Prepare matching 350x350 pixel sets of photo and signature for Union Public Service Commission.', cat: 'Government Exams', tags: ['upsc', 'exam', 'photo', 'signature'], badge: 'gov' },
  { id: 'rrb-resize', name: 'RRB Specification Sizer', desc: 'Format photo submissions to meet Railway Recruitment Board standards.', cat: 'Government Exams', tags: ['rrb', 'railway', 'exam', 'photo'], badge: 'gov' },
  { id: 'police-fit', name: 'State Police Exam Photo Fit', desc: 'Scale submission photos to police board rules (typically larger dimensions).', cat: 'Government Exams', tags: ['police', 'exam', 'photo', 'dimension'], badge: 'gov' },
  { id: 'neet-compress', name: 'NEET Photo Optimizer', desc: 'Adjust postcard-size candidate photos (4"x6") for medical exam boards.', cat: 'Government Exams', tags: ['neet', 'medical', 'exam', 'photo'] },
  { id: 'gate-sig', name: 'GATE Signature Aligner', desc: 'Format e-signatures to exact 2:1 rectangular boxes under 20KB for IIT GATE.', cat: 'Government Exams', tags: ['gate', 'iit', 'exam', 'signature'] },
  { id: 'cet-align', name: 'CET Candidate Photo Fit', desc: 'Align eyes and face to standard guide marks for State CET requirements.', cat: 'Government Exams', tags: ['cet', 'college', 'exam', 'photo'] },

  // Social Media
  { id: 'yt-thumb', name: 'YouTube Thumbnail Sizer', desc: 'Generate 1280 x 720 px image canvases under 2MB for video listings.', cat: 'Social Media', tags: ['youtube', 'thumbnail', 'video', 'aspect'] },
  { id: 'yt-banner', name: 'YouTube Banner TV Fit', desc: 'Align focal content inside standard safe bounds for responsive cross-device layouts.', cat: 'Social Media', tags: ['youtube', 'banner', 'tv', 'resize'] },
  { id: 'insta-square', name: 'Instagram 1:1 Square Fit', desc: 'Crop or add colored margins to fit photos inside 1080 x 1080 px grid blocks.', cat: 'Social Media', tags: ['instagram', 'square', 'post', 'feed'], badge: 'popular' },
  { id: 'insta-story', name: 'Instagram Story 9:16 Canvas', desc: 'Extend, padding-fill, or crop vertical photos to standard HD ratios.', cat: 'Social Media', tags: ['instagram', 'story', 'reel', 'portrait'] },
  { id: 'twitter-header', name: 'Twitter/X Header Sizer', desc: 'Scale wide background banners to exact 1500 x 500 px aspect shapes.', cat: 'Social Media', tags: ['twitter', 'header', 'banner', 'x'] },
  { id: 'linkedin-banner', name: 'LinkedIn Professional Banner', desc: 'Format corporate profile background headers to standard proportions.', cat: 'Social Media', tags: ['linkedin', 'banner', 'corporate', 'size'] },
  { id: 'facebook-cover', name: 'Facebook Timeline Cover', desc: 'Resize landscape cover layouts to standard responsive coordinates.', cat: 'Social Media', tags: ['facebook', 'cover', 'timeline', 'page'] },
  { id: 'pinterest-pin', name: 'Pinterest Portrait Pin Sizer', desc: 'Crop and scale layout templates to standard 2:3 vertical structures.', cat: 'Social Media', tags: ['pinterest', 'pin', 'vertical', 'post'] },
  { id: 'tiktok-profile', name: 'TikTok Circular Profile Maker', desc: 'Add guides to align faces inside standard circular clipping bounds.', cat: 'Social Media', tags: ['tiktok', 'profile', 'avatar', 'circle'] },

  // Web Tools
  { id: 'favicon-gen', name: 'Favicon Generator Engine', desc: 'Export source images to multi-resolution .ico and modern Apple-touch packs.', cat: 'Web Tools', tags: ['favicon', 'ico', 'web', 'icon'], badge: 'new' },
  { id: 'qr-generator', name: 'QR Code Generator', desc: 'Generate clean scannable vector matrix barcodes with custom padding and values.', cat: 'Web Tools', tags: ['qr', 'code', 'link', 'scanner'] },
  { id: 'color-picker', name: 'Hues Palette Extractor', desc: 'Extract dominant color profiles and generate matching hex layouts from uploaded photos.', cat: 'Web Tools', tags: ['color', 'palette', 'swatches', 'hex'] },
  { id: 'shadow-gen', name: 'CSS Shadow Generator', desc: 'Visually scale multi-layered soft natural ambient drop shadows and copy css tokens.', cat: 'Web Tools', tags: ['shadow', 'css', 'box-shadow', 'web'] },
  { id: 'grid-gen', name: 'CSS Grid Visualizer', desc: 'Configure columns, rows, gaps and export semantic CSS grid frameworks.', cat: 'Web Tools', tags: ['grid', 'css', 'layout', 'code'] },
  { id: 'meta-gen', name: 'SEO Meta Tag Compiler', desc: 'Generate standard titles, descriptions, and OpenGraph variables for site headers.', cat: 'Web Tools', tags: ['seo', 'meta', 'tags', 'head'] },
  { id: 'password-gen', name: 'Strong Key Password Generator', desc: 'Compile unpredictable cryptographic tokens with custom symbols, numbers, and weights.', cat: 'Web Tools', tags: ['password', 'key', 'security', 'crypto'] },
  { id: 'html-beautify', name: 'HTML Code Beautifier', desc: 'Re-indent, line-break, and clean cluttered nested HTML markups.', cat: 'Web Tools', tags: ['html', 'beautify', 'format', 'code'] },
  { id: 'js-minify', name: 'JavaScript Minifier Engine', desc: 'Compress, strip comments, shorten variables, and minify native scripts.', cat: 'Web Tools', tags: ['javascript', 'minify', 'js', 'compress'] },
  { id: 'css-minify', name: 'CSS Minifier Engine', desc: 'Remove spaces, compress selectors, and minify static CSS styles.', cat: 'Web Tools', tags: ['css', 'minify', 'style', 'compress'] }
];

// Indian Government Exams Spec Config Database
const EXAM_SPECS = {
  ssc: {
    name: 'SSC (Staff Selection Commission)',
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      widthPx: 350,
      heightPx: 450,
      minKb: 20,
      maxKb: 50,
      ink: 'Normal Color Photo',
      notes: 'Must be taken without spectacles, cap. Focus on face (80% coverage). Background should be light gray or white. Date printed on photo is no longer mandatory but must be less than 3 months old.'
    },
    signature: {
      widthCm: 4.0,
      heightCm: 2.0,
      widthPx: 400,
      heightPx: 200,
      minKb: 10,
      maxKb: 20,
      ink: 'Black Ink Only',
      notes: 'Must be on a plain white paper with Black Ink Pen. Blurry signatures are instantly rejected.'
    }
  },
  ibps: {
    name: 'IBPS (Banking Personnel)',
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      widthPx: 350,
      heightPx: 450,
      minKb: 20,
      maxKb: 50,
      ink: 'Passport Color Photo',
      notes: 'Do not wear spectacles with glare. The background must be light-colored, preferably clear white. Candidate face should occupy the center space.'
    },
    signature: {
      widthCm: 4.6,
      heightCm: 2.0,
      widthPx: 140,
      heightPx: 60,
      minKb: 10,
      maxKb: 20,
      ink: 'Black Ink Only',
      notes: 'Must be signed on clean white paper with a Black Ink Pen. Capital letter signatures are not accepted.'
    }
  },
  upsc: {
    name: 'UPSC (Civil Services)',
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      widthPx: 350,
      heightPx: 350,
      minKb: 20,
      maxKb: 300,
      ink: 'Clear Color Portrait',
      notes: 'Upload matching square photo. Candidate name and date of photograph must be printed on the bottom of the photo. Background must be light/white.'
    },
    signature: {
      widthCm: 3.5,
      heightCm: 1.5,
      widthPx: 350,
      heightPx: 350,
      minKb: 20,
      maxKb: 300,
      ink: 'Black or Blue Ink',
      notes: 'Sign on white paper and scan. The aspect ratio must be 1:1 square canvas during compliance processing.'
    }
  },
  rrb: {
    name: 'RRB (Railway Recruitment)',
    photo: {
      widthCm: 3.5,
      heightCm: 4.5,
      widthPx: 320,
      heightPx: 240,
      minKb: 20,
      maxKb: 70,
      ink: 'Standard Color Photo',
      notes: 'Ensure shadows do not fall on face or background. Must be captured with high-intensity light in color.'
    },
    signature: {
      widthCm: 4.0,
      heightCm: 1.5,
      widthPx: 400,
      heightPx: 150,
      minKb: 10,
      maxKb: 30,
      ink: 'Black Ink Only',
      notes: 'Sign using deep black ink. Standard landscape crop applies.'
    }
  },
  statePolice: {
    name: 'State Police Exams',
    photo: {
      widthCm: 4.0,
      heightCm: 5.0,
      widthPx: 400,
      heightPx: 500,
      minKb: 20,
      maxKb: 100,
      ink: 'Full Portrait Headshot',
      notes: 'Standard Police Recruitment board dimensions. Face should be upright, front-facing, ears fully visible, background neutral grey/blue.'
    },
    signature: {
      widthCm: 6.0,
      heightCm: 2.0,
      widthPx: 600,
      heightPx: 200,
      minKb: 10,
      maxKb: 50,
      ink: 'Black or Blue Ink',
      notes: 'Plain paper with a dark ink pen. Needs to be bold and clear for physical verification.'
    }
  }
};

// State Variables
let currentExam = 'ssc';
let currentTab = 'photo'; // 'photo' or 'signature'
let activeFilter = 'all';
let searchQuery = '';

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Bind Exam Compliance Events
  initComplianceDashboard();

  // Bind Search and Filtering Events
  initSearchAndFilters();

  // Bind Console Modal Events
  initConsoleModal();

  // Draw Initial Compliance Preview Blueprint
  drawBlueprint();
});

// 1. Compliance Dashboard Logic
function initComplianceDashboard() {
  const examButtons = document.querySelectorAll('.exam-btn');
  examButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      examButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentExam = btn.dataset.exam;
      updateComplianceSpecs();
    });
  });

  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      updateComplianceSpecs();
    });
  });

  updateComplianceSpecs();
}

function updateComplianceSpecs() {
  const spec = EXAM_SPECS[currentExam][currentTab];
  
  // Update Specs UI
  document.getElementById('specExamName').textContent = EXAM_SPECS[currentExam].name;
  document.getElementById('specTabName').textContent = currentTab === 'photo' ? 'PHOTO GUIDELINES' : 'SIGNATURE SPECS';
  
  document.getElementById('specWidthCm').textContent = `${spec.widthCm} cm`;
  document.getElementById('specHeightCm').textContent = `${spec.heightCm} cm`;
  document.getElementById('specWidthPx').textContent = `${spec.widthPx} px`;
  document.getElementById('specHeightPx').textContent = `${spec.heightPx} px`;
  document.getElementById('specWeightRange').textContent = `${spec.minKb}KB - ${spec.maxKb}KB`;
  document.getElementById('specInk').textContent = spec.ink;
  document.getElementById('specNotes').textContent = spec.notes;

  // Redraw Canvas Blueprint
  drawBlueprint();
}

function drawBlueprint() {
  const canvas = document.getElementById('blueprintCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const parentWidth = canvas.parentElement.clientWidth;
  const parentHeight = canvas.parentElement.clientHeight;
  canvas.width = parentWidth * window.devicePixelRatio;
  canvas.height = parentHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const spec = EXAM_SPECS[currentExam][currentTab];
  
  // Background style
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, parentWidth, parentHeight);

  // Technical Blueprint Grid
  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 1;
  const gridSize = 20;
  for (let x = 0; x < parentWidth; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, parentHeight);
    ctx.stroke();
  }
  for (let y = 0; y < parentHeight; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(parentWidth, y);
    ctx.stroke();
  }

  // Draw Aspect Box Frame based on real spec dimensions
  const aspect = spec.widthCm / spec.heightCm;
  let boxWidth, boxHeight;

  if (aspect >= 1) { // Landscape/Square (e.g. signature or square photos)
    boxWidth = Math.min(parentWidth - 60, 200);
    boxHeight = boxWidth / aspect;
  } else { // Portrait
    boxHeight = Math.min(parentHeight - 100, 240);
    boxWidth = boxHeight * aspect;
  }

  const boxX = (parentWidth - boxWidth) / 2;
  const boxY = (parentHeight - boxHeight) / 2 - 10;

  // Draw Guide Outer Shade
  ctx.fillStyle = 'rgba(15, 23, 42, 0.02)';
  ctx.fillRect(0, 0, parentWidth, parentHeight);
  ctx.clearRect(boxX, boxY, boxWidth, boxHeight);

  // Draw Active Border Frame
  ctx.strokeStyle = '#2563eb'; // Technical Blue
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]); // Dotted blueprint look
  ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
  ctx.setLineDash([]); // Reset

  // Draw Center Crosshair
  ctx.strokeStyle = 'rgba(37, 99, 235, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(boxX + boxWidth / 2, boxY);
  ctx.lineTo(boxX + boxWidth / 2, boxY + boxHeight);
  ctx.moveTo(boxX, boxY + boxHeight / 2);
  ctx.lineTo(boxX + boxWidth, boxY + boxHeight / 2);
  ctx.stroke();

  // Draw dimensions text labels
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';

  // Width Label
  ctx.fillText(`${spec.widthCm} cm (${spec.widthPx}px)`, boxX + boxWidth / 2, boxY - 10);
  
  // Height Label (needs rotation for vertical alignment)
  ctx.save();
  ctx.translate(boxX - 12, boxY + boxHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(`${spec.heightCm} cm (${spec.heightPx}px)`, 0, 0);
  ctx.restore();

  // Placeholders inside the compliance box
  if (currentTab === 'photo') {
    // Face outline helper
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // Head circle
    ctx.arc(boxX + boxWidth / 2, boxY + boxHeight * 0.4, boxWidth * 0.25, 0, Math.PI * 2);
    ctx.stroke();
    // Shoulders
    ctx.beginPath();
    ctx.moveTo(boxX + boxWidth * 0.15, boxY + boxHeight);
    ctx.bezierCurveTo(
      boxX + boxWidth * 0.2, boxY + boxHeight * 0.8,
      boxX + boxWidth * 0.8, boxY + boxHeight * 0.8,
      boxX + boxWidth * 0.85, boxY + boxHeight
    );
    ctx.stroke();
    
    // Face safety bounds
    ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
    ctx.font = '500 9px "Inter", sans-serif';
    ctx.fillText('FACE COVERAGE: 80%', boxX + boxWidth / 2, boxY + boxHeight * 0.9);
  } else {
    // Signature Line helper
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(boxX + boxWidth * 0.1, boxY + boxHeight * 0.7);
    ctx.lineTo(boxX + boxWidth * 0.9, boxY + boxHeight * 0.7);
    ctx.stroke();

    // Scribble signature look
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(boxX + boxWidth * 0.2, boxY + boxHeight * 0.55);
    ctx.bezierCurveTo(
      boxX + boxWidth * 0.3, boxY + boxHeight * 0.3,
      boxX + boxWidth * 0.4, boxY + boxHeight * 0.75,
      boxX + boxWidth * 0.5, boxY + boxHeight * 0.5
    );
    ctx.bezierCurveTo(
      boxX + boxWidth * 0.6, boxY + boxHeight * 0.35,
      boxX + boxWidth * 0.7, boxY + boxHeight * 0.65,
      boxX + boxWidth * 0.8, boxY + boxHeight * 0.45
    );
    ctx.stroke();

    ctx.fillStyle = 'rgba(37, 99, 235, 0.1)';
    ctx.font = '500 9px "Inter", sans-serif';
    ctx.fillText(spec.ink.toUpperCase(), boxX + boxWidth / 2, boxY + boxHeight * 0.85);
  }
}

// 2. Search & Filter System
function initSearchAndFilters() {
  const searchInput = document.getElementById('searchInput');
  const filterPills = document.querySelectorAll('.filter-pill');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderBentoGrid();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter;
      renderBentoGrid();
    });
  });

  // Handle Quick Tag Search Triggers
  window.triggerTagSearch = function(tag) {
    if (searchInput) {
      searchInput.value = tag;
      searchQuery = tag.toLowerCase().trim();
      renderBentoGrid();
      // Scroll to catalog section nicely
      document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initial catalog draw
  renderBentoGrid();
}

function renderBentoGrid() {
  const grid = document.getElementById('bentoGrid');
  if (!grid) return;

  // Filter Catalog
  let filtered = TOOLS_CATALOG;

  // 1. Apply category filtering
  if (activeFilter === 'popular') {
    filtered = filtered.filter(t => t.badge === 'popular');
  } else if (activeFilter === 'gov') {
    filtered = filtered.filter(t => t.badge === 'gov' || t.cat === 'Government Exams');
  } else if (activeFilter === 'new') {
    filtered = filtered.filter(t => t.badge === 'new');
  }

  // 2. Apply Fuzzy/Literal search queries
  if (searchQuery !== '') {
    filtered = filtered.filter(tool => {
      const nameMatch = tool.name.toLowerCase().includes(searchQuery);
      const descMatch = tool.desc.toLowerCase().includes(searchQuery);
      const catMatch = tool.cat.toLowerCase().includes(searchQuery);
      const tagsMatch = tool.tags.some(tag => tag.toLowerCase().includes(searchQuery));
      return nameMatch || descMatch || catMatch || tagsMatch;
    });
  }

  // Update Stats UI
  const statsLabel = document.getElementById('catalogStats');
  if (statsLabel) {
    statsLabel.textContent = `SHOWING ${filtered.length} OF ${TOOLS_CATALOG.length} PRE-CONFIGURED TOOLS`;
  }

  // Draw Grid HTML
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 24px; color: var(--text-muted);">
        <i data-lucide="search-slash" style="width: 48px; height: 48px; margin: 0 auto 16px auto; opacity: 0.5;"></i>
        <h4 style="font-size: 18px; color: var(--text-primary); margin-bottom: 8px;">No Tools Found Match "${searchQuery}"</h4>
        <p style="font-size: 14px;">Try searching for generic terms like "Resize", "PDF", "PAN", "Signature", or "UPSC".</p>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  grid.innerHTML = filtered.map(tool => {
    let badgeHTML = '';
    if (tool.badge === 'popular') badgeHTML = `<span class="card-badge popular">Popular</span>`;
    else if (tool.badge === 'gov') badgeHTML = `<span class="card-badge gov">Gov Spec</span>`;
    else if (tool.badge === 'new') badgeHTML = `<span class="card-badge new">New</span>`;

    // Map categories to modern vector icons
    let iconName = 'file-image';
    if (tool.cat === 'Converters') iconName = 'arrow-left-right';
    else if (tool.cat === 'PDF Utilities') iconName = 'file-text';
    else if (tool.cat === 'Document Portals') iconName = 'folder-open';
    else if (tool.cat === 'Government Exams') iconName = 'award';
    else if (tool.cat === 'Social Media') iconName = 'share-2';
    else if (tool.cat === 'Web Tools') iconName = 'cpu';

    // Standalone tool check
    const isSizingTool = tool.id === 'resize-image';
    const clickHandler = isSizingTool 
      ? `window.location.href='${tool.url}'` 
      : `openToolRedirectModal('${tool.name}', '${tool.cat}')`;

    return `
      <div class="bento-card" id="card-${tool.id}" onclick="${clickHandler}">
        <div class="bento-card-header">
          <div class="card-icon-wrapper">
            <i data-lucide="${iconName}"></i>
          </div>
          ${badgeHTML}
        </div>
        <div class="bento-card-body">
          <h3>${tool.name}</h3>
          <p>${tool.desc}</p>
        </div>
        <div class="bento-card-footer">
          <span>${tool.cat.toUpperCase()}</span>
          <div class="bento-card-action">
            ${isSizingTool ? 'Open Tool' : 'Analyze Spec'} <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// 3. Tool Redirect / Info Overlay
window.openToolRedirectModal = function(toolName, category) {
  const overlay = document.getElementById('toolRedirectModal');
  const modalBody = document.getElementById('toolRedirectModalBody');
  
  if (!overlay || !modalBody) return;

  modalBody.innerHTML = `
    <div class="info-modal-content">
      <div class="info-modal-icon">
        <i data-lucide="shield-check" style="width: 32px; height: 32px;"></i>
      </div>
      <h3>${toolName}</h3>
      <p>This utility belongs to the <strong>${category}</strong> category within the fully local, browser-native compliance pipeline.</p>
      
      <div style="background-color: var(--bg-tertiary); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 18px; margin-bottom: 24px; text-align: left;">
        <h5 style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
          <i data-lucide="info" style="width: 16px; height: 16px; color: var(--accent-blue);"></i> Native Local Routing Active
        </h5>
        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 0;">
          All physical canvas resizes, DPI recalculations, aspect locked compression matrices, and exam weight validations are pre-routed directly to the core offline <strong>HTML5 Resizing Engine</strong>.
        </p>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center;">
        <button class="btn" onclick="closeToolRedirectModal()">Back to Dashboard</button>
        <button class="btn btn-blue" onclick="window.location.href='tools/image-tools/resize-image/index.html'">Launch Resizer Canvas</button>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  if (typeof lucide !== 'undefined') lucide.createIcons();
};

window.closeToolRedirectModal = function() {
  const overlay = document.getElementById('toolRedirectModal');
  if (overlay) overlay.classList.remove('active');
};

// 4. Blueprint Architecture Modal
function initConsoleModal() {
  const openBtn = document.getElementById('openConsoleBtn');
  const closeBtn = document.getElementById('closeConsoleBtn');
  const modal = document.getElementById('consoleModal');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('remove');
      modal.classList.remove('active');
    });
  }

  // Click outside to close standard
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}
