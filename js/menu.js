/**
 * Évasion Gusto - Menu Page JavaScript
 * Handles PDF lazy loading for the weekly menu.
 */
document.addEventListener('DOMContentLoaded', function() {

    function createSpinnerHTML(spinnerId, progressId, loadingText) {
        return `
            <div id="${spinnerId}">
                <div style="position: relative; width: 80px; height: 80px; margin-bottom: 1.5rem;">
                    <div style="position: absolute; width: 100%; height: 100%; border: 4px solid #e0e0e0; border-top: 4px solid #607244; border-radius: 50%; animation: spin-pdf 1s linear infinite; box-shadow: 0 0 20px rgba(96, 114, 68, 0.3);"></div>
                    <p id="${progressId}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #607244; font-size: 18px; margin: 0; font-weight: 700; text-shadow: 0 0 10px rgba(96, 114, 68, 0.4);">0%</p>
                </div>
                <p style="color: #607244; font-size: 18px; margin: 0; font-weight: 600;">${loadingText}</p>
            </div>
        `;
    }

    function simulateLoadingProgress(progressId) {
        let progress = 0;
        return setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90;
            const el = document.getElementById(progressId);
            if (el) el.textContent = Math.floor(progress) + '%';
        }, 200);
    }

    function handleIframeLoad(progressInterval, progressId, spinnerId, container, iframe) {
        clearInterval(progressInterval);
        const el = document.getElementById(progressId);
        if (el) el.textContent = '100%';
        setTimeout(() => {
            const spinner = document.getElementById(spinnerId);
            if (spinner) spinner.remove();
            container.style.background = 'transparent';
            container.style.animation = 'none';
            container.style.minHeight = 'auto';
            iframe.style.opacity = '1';
        }, 300);
    }

    const pdfContainer = document.getElementById('pdf-lazy-container');
    if (pdfContainer) {
        let pdfLoaded = false;
        const pdfObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !pdfLoaded) {
                    pdfLoaded = true;
                    pdfObserver.disconnect();

                    const currentLanguage = localStorage.getItem('language') || 'fr';
                    const translations = window.evasionTranslations;
                    const loadingText = translations ? translations[currentLanguage].pdfLoading : 'Loading...';

                    pdfContainer.removeAttribute('style');
                    pdfContainer.innerHTML = createSpinnerHTML('pdf-loading-spinner', 'pdf-load-progress', loadingText);
                    const progressInterval = simulateLoadingProgress('pdf-load-progress');

                    const iframe = document.createElement('iframe');
                    iframe.src = 'https://drive.google.com/file/d/1yjaPTS9nFbm8eVBIxwH_zT35Tt3r7iL5/preview';
                    iframe.width = '100%';
                    iframe.height = '850px';
                    iframe.title = "This Week's Menu PDF";
                    iframe.style.border = 'none';
                    iframe.style.borderRadius = '8px';
                    iframe.style.opacity = '0';
                    iframe.style.transition = 'opacity 0.6s ease';
                    iframe.style.display = 'block';
                    iframe.allow = 'autoplay';

                    iframe.onload = function() {
                        handleIframeLoad(progressInterval, 'pdf-load-progress', 'pdf-loading-spinner', pdfContainer, iframe);
                    };
                    iframe.onerror = function() {
                        pdfContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><p style="color: #c00;">Error loading menu.</p></div>';
                    };
                    pdfContainer.appendChild(iframe);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.5 });
        pdfObserver.observe(pdfContainer);
    }

});
