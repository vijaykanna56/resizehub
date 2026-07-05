document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const uploadSection = document.getElementById('upload-section');
    const editorSection = document.getElementById('editor-section');
    
    const imagePreview = document.getElementById('image-preview');
    const originalDimensions = document.getElementById('original-dimensions');
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorAlert = document.getElementById('error-alert');
    
    const inputWidth = document.getElementById('input-width');
    const inputHeight = document.getElementById('input-height');
    const inputPercentage = document.getElementById('input-percentage');
    const lockRatioBtn = document.getElementById('lock-ratio-btn');
    const outputFormat = document.getElementById('output-format');
    
    const resetBtn = document.getElementById('reset-btn');
    const downloadBtn = document.getElementById('download-btn');
    const newImageBtn = document.getElementById('new-image-btn');

    // --- State Variables ---
    let originalImage = null;
    let originalWidth = 0;
    let originalHeight = 0;
    let aspectRatio = 1;
    let isRatioLocked = true;
    let currentFileName = 'resized-image';

    // --- Event Listeners for File Upload ---
    browseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });

    dropZone.addEventListener('click', (e) => {
        if (e.target !== browseBtn) {
            fileInput.click();
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-active');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-active');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-active');
        if (e.dataTransfer.files.length) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFileUpload(e.target.files[0]);
        }
    });

    // --- Core Logic ---
    function handleFileUpload(file) {
        hideError();
        
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            showError('Invalid file type. Please upload a JPG, PNG, or WEBP image.');
            return;
        }

        currentFileName = file.name.split('.')[0] + '-resized';
        
        showLoading(true);
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                originalImage = img;
                originalWidth = img.width;
                originalHeight = img.height;
                aspectRatio = originalWidth / originalHeight;
                
                // Update UI
                imagePreview.src = img.src;
                originalDimensions.textContent = `${originalWidth} x ${originalHeight}`;
                
                resetInputs();
                
                // Switch views
                uploadSection.classList.add('hidden');
                editorSection.classList.remove('hidden');
                
                showLoading(false);
            };
            img.onerror = () => {
                showError('Failed to load image.');
                showLoading(false);
            };
            img.src = e.target.result;
        };
        
        reader.onerror = () => {
            showError('Error reading file.');
            showLoading(false);
        };
        
        reader.readAsDataURL(file);
    }

    // --- Input Handling & Calculations ---
    inputWidth.addEventListener('input', () => {
        if (!originalImage) return;
        const w = parseInt(inputWidth.value) || 0;
        
        if (isRatioLocked && w > 0) {
            inputHeight.value = Math.round(w / aspectRatio);
        }
        updatePercentage();
    });

    inputHeight.addEventListener('input', () => {
        if (!originalImage) return;
        const h = parseInt(inputHeight.value) || 0;
        
        if (isRatioLocked && h > 0) {
            inputWidth.value = Math.round(h * aspectRatio);
        }
        updatePercentage();
    });

    inputPercentage.addEventListener('input', () => {
        if (!originalImage) return;
        const percent = parseInt(inputPercentage.value) || 0;
        
        if (percent > 0) {
            const multiplier = percent / 100;
            inputWidth.value = Math.round(originalWidth * multiplier);
            inputHeight.value = Math.round(originalHeight * multiplier);
        }
    });

    lockRatioBtn.addEventListener('click', () => {
        isRatioLocked = !isRatioLocked;
        lockRatioBtn.classList.toggle('active', isRatioLocked);
        
        // If re-locked, adjust height to match width based on original ratio
        if (isRatioLocked) {
            const w = parseInt(inputWidth.value) || originalWidth;
            inputHeight.value = Math.round(w / aspectRatio);
            updatePercentage();
        }
    });

    resetBtn.addEventListener('click', resetInputs);

    newImageBtn.addEventListener('click', () => {
        fileInput.value = '';
        originalImage = null;
        editorSection.classList.add('hidden');
        uploadSection.classList.remove('hidden');
    });

    // --- Canvas & Download Logic ---
    downloadBtn.addEventListener('click', () => {
        if (!originalImage) return;
        
        const targetWidth = parseInt(inputWidth.value);
        const targetHeight = parseInt(inputHeight.value);
        
        if (!targetWidth || !targetHeight || targetWidth <= 0 || targetHeight <= 0) {
            showError('Please enter valid width and height values.');
            return;
        }

        showLoading(true);
        
        // Small timeout to allow UI to update loading spinner
        setTimeout(() => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                
                // Draw resized image
                ctx.drawImage(originalImage, 0, 0, targetWidth, targetHeight);
                
                // Get format and extension
                const format = outputFormat.value;
                const ext = format.split('/')[1];
                const quality = format === 'image/jpeg' || format === 'image/webp' ? 0.9 : undefined;
                
                // Export and trigger download
                const dataUrl = canvas.toDataURL(format, quality);
                const link = document.createElement('a');
                link.download = `${currentFileName}.${ext}`;
                link.href = dataUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
            } catch (err) {
                console.error(err);
                showError('Error processing image. Image might be too large.');
            } finally {
                showLoading(false);
            }
        }, 50);
    });

    // --- Utilities ---
    function resetInputs() {
        inputWidth.value = originalWidth;
        inputHeight.value = originalHeight;
        inputPercentage.value = 100;
        
        if (!isRatioLocked) {
            isRatioLocked = true;
            lockRatioBtn.classList.add('active');
        }
    }

    function updatePercentage() {
        const w = parseInt(inputWidth.value) || 0;
        if (originalWidth > 0 && w > 0) {
            inputPercentage.value = Math.round((w / originalWidth) * 100);
        }
    }

    function showLoading(show) {
        if (show) {
            loadingSpinner.classList.remove('hidden');
            imagePreview.style.opacity = '0.5';
        } else {
            loadingSpinner.classList.add('hidden');
            imagePreview.style.opacity = '1';
        }
    }

    function showError(message) {
        errorAlert.textContent = message;
        errorAlert.classList.remove('hidden');
        setTimeout(hideError, 5000);
    }

    function hideError() {
        errorAlert.classList.add('hidden');
        errorAlert.textContent = '';
    }
});
