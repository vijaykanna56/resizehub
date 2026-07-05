/**
 * ResizeHub - Image Resizer Tool
 * Architecture: Vanilla ES6 Class
 * Features: Canvas processing, memory management, offline-first
 */

class ImageResizer {
    constructor() {
        this.initDOM();
        if (!this.dom.uploadContainer) return; // Guard clause if not on tool page
        
        this.initState();
        this.bindEvents();
        this.initFAQ();
    }

    initDOM() {
        this.dom = {
            // Containers
            uploadArea: document.getElementById('upload-container'),
            editorArea: document.getElementById('editor-container'),
            uploadInput: document.getElementById('image-upload-input'),
            
            // Canvas & Stats
            canvas: document.getElementById('image-canvas'),
            ctx: document.getElementById('image-canvas')?.getContext('2d'),
            statOriginal: document.getElementById('stat-original-size'),
            statNew: document.getElementById('stat-new-size'),
            
            // Tabs
            tabPixels: document.getElementById('tab-pixels'),
            tabPercent: document.getElementById('tab-percentage'),
            panelPixels: document.getElementById('panel-pixels'),
            panelPercent: document.getElementById('panel-percentage'),
            
            // Controls
            inputWidth: document.getElementById('resize-width'),
            inputHeight: document.getElementById('resize-height'),
            btnLockRatio: document.getElementById('btn-lock-ratio'),
            inputPercent: document.getElementById('resize-percentage'),
            outputPercent: document.getElementById('percentage-output'),
            
            // Export Settings
            selectFormat: document.getElementById('export-format'),
            inputQuality: document.getElementById('export-quality'),
            outputQuality: document.getElementById('quality-output'),
            qualityWrapper: document.getElementById('quality-control-wrapper'),
            
            // Actions
            btnDownload: document.getElementById('btn-download'),
            btnReset: document.getElementById('btn-reset'),
            
            // FAQ
            faqToggles: document.querySelectorAll('.faq-toggle')
        };
    }

    initState() {
        this.state = {
            image: null,
            originalFile: null,
            originalWidth: 0,
            originalHeight: 0,
            currentWidth: 0,
            currentHeight: 0,
            aspectRatio: 1,
            isLocked: true,
            activeTab: 'pixels', // 'pixels' or 'percentage'
            debounceTimer: null,
            maxCanvasDim: 4000 // Memory limit prevention
        };
    }

    bindEvents() {
        // Upload Events
        this.dom.uploadArea.addEventListener('click', () => this.dom.uploadInput.click());
        this.dom.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.dom.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.dom.uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        this.dom.uploadInput.addEventListener('change', this.handleFileSelect.bind(this));

        // Tab Switching
        this.dom.tabPixels.addEventListener('click', () => this.switchTab('pixels'));
        this.dom.tabPercent.addEventListener('click', () => this.switchTab('percentage'));

        // Lock Ratio
        this.dom.btnLockRatio.addEventListener('click', this.toggleRatioLock.bind(this));

        // Resize Inputs
        this.dom.inputWidth.addEventListener('input', (e) => this.handleDimensionChange('width', e.target.value));
        this.dom.inputHeight.addEventListener('input', (e) => this.handleDimensionChange('height', e.target.value));
        this.dom.inputPercent.addEventListener('input', this.handlePercentageChange.bind(this));

        // Export Settings
        this.dom.selectFormat.addEventListener('change', this.handleFormatChange.bind(this));
        this.dom.inputQuality.addEventListener('input', this.handleQualityChange.bind(this));

        // Actions
        this.dom.btnDownload.addEventListener('click', this.downloadImage.bind(this));
        this.dom.btnReset.addEventListener('click', this.resetTool.bind(this));
    }

    /* --- File Handling --- */
    
    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dom.uploadArea.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dom.uploadArea.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dom.uploadArea.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file) this.processFile(file);
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) this.processFile(file);
        e.target.value = ''; // Reset input
    }

    processFile(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            alert('Invalid file format. Please upload JPG, PNG, WEBP, or GIF.');
            return;
        }

        if (file.size > 25 * 1024 * 1024) { // 25MB limit
            alert('File is too large. Maximum size is 25MB.');
            return;
        }

        this.state.originalFile = file;
        this.dom.statOriginal.textContent = this.formatBytes(file.size);
        
        // Auto-select output format based on input
        if (file.type !== 'image/gif') {
            this.dom.selectFormat.value = file.type;
            this.handleFormatChange();
        }

        const reader = new FileReader();
        reader.onload = (e) => this.loadImage(e.target.result);
        reader.readAsDataURL(file);
    }

    loadImage(dataUrl) {
        const img = new Image();
        img.onload = () => {
            this.state.image = img;
            this.state.originalWidth = img.width;
            this.state.originalHeight = img.height;
            this.state.currentWidth = img.width;
            this.state.currentHeight = img.height;
            this.state.aspectRatio = img.width / img.height;

            this.updateInputs(img.width, img.height);
            this.updateCanvas();
            this.switchView('editor');
        };
        img.onerror = () => alert('Error loading image. File may be corrupted.');
        img.src = dataUrl;
    }

    /* --- Core Resize Logic --- */

    handleDimensionChange(dimension, value) {
        let val = parseInt(value, 10);
        if (isNaN(val) || val < 1) val = 1;
        if (val > this.state.maxCanvasDim) val = this.state.maxCanvasDim;

        if (dimension === 'width') {
            this.state.currentWidth = val;
            if (this.state.isLocked) {
                this.state.currentHeight = Math.round(val / this.state.aspectRatio);
                this.dom.inputHeight.value = this.state.currentHeight;
            }
        } else {
            this.state.currentHeight = val;
            if (this.state.isLocked) {
                this.state.currentWidth = Math.round(val * this.state.aspectRatio);
                this.dom.inputWidth.value = this.state.currentWidth;
            }
        }
        
        this.updatePercentageInput();
        this.updateCanvas();
    }

    handlePercentageChange(e) {
        const percent = parseInt(e.target.value, 10);
        this.dom.outputPercent.textContent = `${percent}%`;
        
        const scale = percent / 100;
        this.state.currentWidth = Math.round(this.state.originalWidth * scale);
        this.state.currentHeight = Math.round(this.state.originalHeight * scale);
        
        // Clamp to limits
        if (this.state.currentWidth < 1) this.state.currentWidth = 1;
        if (this.state.currentHeight < 1) this.state.currentHeight = 1;

        this.updateInputs(this.state.currentWidth, this.state.currentHeight);
        this.updateCanvas();
    }

    toggleRatioLock() {
        this.state.isLocked = !this.state.isLocked;
        
        if (this.state.isLocked) {
            this.dom.btnLockRatio.classList.add('active');
            this.dom.btnLockRatio.setAttribute('aria-pressed', 'true');
            // Recalculate aspect ratio based on current loose values
            this.state.aspectRatio = this.state.currentWidth / this.state.currentHeight;
        } else {
            this.dom.btnLockRatio.classList.remove('active');
            this.dom.btnLockRatio.setAttribute('aria-pressed', 'false');
        }
    }

    /* --- Export & Updates --- */

    handleFormatChange() {
        const format = this.dom.selectFormat.value;
        if (format === 'image/png') {
            this.dom.qualityWrapper.classList.add('hidden');
        } else {
            this.dom.qualityWrapper.classList.remove('hidden');
        }
        this.queueEstimation();
    }

    handleQualityChange(e) {
        this.dom.outputQuality.textContent = `${e.target.value}%`;
        this.queueEstimation();
    }

    /* --- Canvas & Rendering --- */

    updateInputs(width, height) {
        this.dom.inputWidth.value = width;
        this.dom.inputHeight.value = height;
    }

    updatePercentageInput() {
        // Calculate average percentage change for UI reflection
        const wPercent = this.state.currentWidth / this.state.originalWidth;
        const hPercent = this.state.currentHeight / this.state.originalHeight;
        const avgPercent = Math.round(((wPercent + hPercent) / 2) * 100);
        
        this.dom.inputPercent.value = Math.min(Math.max(avgPercent, 1), 300);
        this.dom.outputPercent.textContent = `${this.dom.inputPercent.value}%`;
    }

    updateCanvas() {
        if (!this.state.image) return;

        const { currentWidth, currentHeight } = this.state;
        
        // Prevent canvas crash on impossible dimensions
        if (currentWidth <= 0 || currentHeight <= 0) return;

        this.dom.canvas.width = currentWidth;
        this.dom.canvas.height = currentHeight;
        
        // Use better interpolation for downscaling if needed (default canvas behavior is usually fine, 
        // but imageSmoothingEnabled helps)
        this.dom.ctx.imageSmoothingEnabled = true;
        this.dom.ctx.imageSmoothingQuality = 'high';
        
        this.dom.ctx.clearRect(0, 0, currentWidth, currentHeight);
        this.dom.ctx.drawImage(this.state.image, 0, 0, currentWidth, currentHeight);

        this.queueEstimation();
    }

    queueEstimation() {
        clearTimeout(this.state.debounceTimer);
        this.dom.statNew.textContent = 'Calculating...';
        this.state.debounceTimer = setTimeout(() => this.estimateSize(), 300);
    }

    estimateSize() {
        const format = this.dom.selectFormat.value;
        const quality = format === 'image/png' ? undefined : parseInt(this.dom.inputQuality.value, 10) / 100;

        try {
            this.dom.canvas.toBlob((blob) => {
                if (blob) {
                    this.dom.statNew.textContent = this.formatBytes(blob.size);
                } else {
                    this.dom.statNew.textContent = 'Error';
                }
            }, format, quality);
        } catch (e) {
            this.dom.statNew.textContent = 'N/A'; // Handle canvas taint issues if any
        }
    }

    /* --- Actions --- */

    downloadImage() {
        if (!this.state.image) return;

        const format = this.dom.selectFormat.value;
        const quality = format === 'image/png' ? undefined : parseInt(this.dom.inputQuality.value, 10) / 100;
        const ext = format.split('/')[1];
        
        // Generate file name
        const originalName = this.state.originalFile.name.replace(/\.[^/.]+$/, "");
        const fileName = `${originalName}-resized-${this.state.currentWidth}x${this.state.currentHeight}.${ext}`;

        // Loading state
        const originalBtnHtml = this.dom.btnDownload.innerHTML;
        this.dom.btnDownload.innerHTML = 'Processing...';
        this.dom.btnDownload.disabled = true;

        this.dom.canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                // Memory cleanup
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            }
            
            // Restore button
            this.dom.btnDownload.innerHTML = originalBtnHtml;
            this.dom.btnDownload.disabled = false;
        }, format, quality);
    }

    resetTool() {
        // Memory cleanup
        if (this.state.image) {
            this.state.image.src = '';
            this.state.image = null;
        }
        
        this.dom.ctx.clearRect(0, 0, this.dom.canvas.width, this.dom.canvas.height);
        this.state.originalFile = null;
        
        // Reset Inputs
        this.dom.inputPercent.value = 100;
        this.dom.outputPercent.textContent = '100%';
        this.switchTab('pixels');
        
        this.switchView('upload');
    }

    /* --- UI Utilities --- */

    switchView(view) {
        if (view === 'editor') {
            this.dom.uploadArea.classList.add('hidden');
            this.dom.editorArea.classList.remove('hidden');
        } else {
            this.dom.uploadArea.classList.remove('hidden');
            this.dom.editorArea.classList.add('hidden');
        }
    }

    switchTab(tabId) {
        this.state.activeTab = tabId;
        
        if (tabId === 'pixels') {
            this.dom.tabPixels.classList.add('active');
            this.dom.tabPixels.setAttribute('aria-selected', 'true');
            this.dom.tabPercent.classList.remove('active');
            this.dom.tabPercent.setAttribute('aria-selected', 'false');
            
            this.dom.panelPixels.classList.remove('hidden');
            this.dom.panelPercent.classList.add('hidden');
        } else {
            this.dom.tabPercent.classList.add('active');
            this.dom.tabPercent.setAttribute('aria-selected', 'true');
            this.dom.tabPixels.classList.remove('active');
            this.dom.tabPixels.setAttribute('aria-selected', 'false');
            
            this.dom.panelPercent.classList.remove('hidden');
            this.dom.panelPixels.classList.add('hidden');
        }
    }

    initFAQ() {
        this.dom.faqToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                const contentId = toggle.getAttribute('aria-controls');
                const content = document.getElementById(contentId);
                
                toggle.setAttribute('aria-expanded', !isExpanded);
                if (isExpanded) {
                    content.setAttribute('hidden', '');
                } else {
                    content.removeAttribute('hidden');
                }
            });
        });
    }

    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    new ImageResizer();
});
