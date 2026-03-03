/**
 * Évasion Gusto - Contact Page JavaScript
 * Handles Google Maps lazy loading for the contact page.
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
            iframe.style.opacity = '1';
        }, 300);
    }

    const mapContainer = document.getElementById('map-lazy-container');
    if (mapContainer) {
        let mapLoaded = false;
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !mapLoaded) {
                    mapLoaded = true;
                    mapObserver.disconnect();

                    const currentLanguage = localStorage.getItem('language') || 'fr';
                    const translations = window.evasionTranslations;
                    const loadingText = translations ? translations[currentLanguage].mapLoading : 'Loading map...';

                    mapContainer.removeAttribute('style');
                    mapContainer.innerHTML = createSpinnerHTML('map-loading-spinner', 'map-load-progress', loadingText);
                    const progressInterval = simulateLoadingProgress('map-load-progress');

                    const iframe = document.createElement('iframe');
                    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2552.4739256206767!2d4.2012718!3d50.2270505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2154d024ce013%3A0x6be2f8b6a322b9c6!2s%C3%89vasion%20Gusto!5e0!3m2!1sen!2sbe!4v1760743263973!5m2!1sen!2sbe';
                    iframe.width = '100%';
                    iframe.height = '400';
                    iframe.title = '\u00c9vasion Gusto Location';
                    iframe.style.border = '0';
                    iframe.style.borderRadius = '8px';
                    iframe.style.opacity = '0';
                    iframe.style.transition = 'opacity 0.6s ease';
                    iframe.style.display = 'block';
                    iframe.allowFullscreen = true;
                    iframe.referrerPolicy = 'no-referrer-when-downgrade';
                    iframe.setAttribute('aria-label', 'Map showing \u00c9vasion Gusto location in Beaumont, Belgium');

                    iframe.onload = function() {
                        handleIframeLoad(progressInterval, 'map-load-progress', 'map-loading-spinner', mapContainer, iframe);
                    };
                    iframe.onerror = function() {
                        mapContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><p style="color: #c00;">Error loading map.</p></div>';
                    };
                    mapContainer.appendChild(iframe);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.5 });
        mapObserver.observe(mapContainer);
    }

});
