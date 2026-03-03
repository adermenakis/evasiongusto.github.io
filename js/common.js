/**
 * Évasion Gusto - Common JavaScript
 * Shared across all pages of the multi-page website.
 */

/* ============================================
   1. Progressive Background Loading (hero pages)
   ============================================ */
(function() {
    const homeSection = document.getElementById('home');
    if (homeSection) {
        const bgImage = new Image();
        bgImage.onload = function() {
            document.body.classList.add('bg-loaded');
        };
        bgImage.src = 'images/hero-background.webp';
        bgImage.onerror = function() {
            bgImage.src = 'images/hero-background.jpg';
        };
    }
})();

/* ============================================
   2. GTM Consent Mode v2
   ============================================ */
(function() {
    // Restore consent for returning visitors
    const consentStatus = localStorage.getItem('gdpr-consent');
    if (consentStatus === 'accepted') {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
        });
    }

    const gdprPopup = document.getElementById('gdpr-consent-popup');
    if (!consentStatus && gdprPopup) {
        gdprPopup.style.display = 'flex';

        document.getElementById('accept-cookies')?.addEventListener('click', () => {
            localStorage.setItem('gdpr-consent', 'accepted');
            gdprPopup.style.display = 'none';
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
            });
        });

        document.getElementById('decline-cookies')?.addEventListener('click', () => {
            localStorage.setItem('gdpr-consent', 'declined');
            gdprPopup.style.display = 'none';
        });
    }
})();

/* ============================================
   3. DOMContentLoaded - Core Functionality
   ============================================ */
document.addEventListener('DOMContentLoaded', async function() {

    /* ------------------------------------------
       a. Translation System
       ------------------------------------------ */
    let translations;
    const cached = sessionStorage.getItem('evasiongusto-translations');
    if (cached) {
        translations = JSON.parse(cached);
    } else {
        try {
            const response = await fetch('/translations.json');
            translations = await response.json();
            sessionStorage.setItem('evasiongusto-translations', JSON.stringify(translations));
        } catch (e) {
            console.error('Failed to load translations:', e);
            return;
        }
    }

    // Make translations available globally for other scripts
    window.evasionTranslations = translations;

    /* ------------------------------------------
       b. translatePage Function
       ------------------------------------------ */
    function translatePage(language) {
        document.querySelectorAll('[data-key], [data-key-tooltip]').forEach((element) => {
            const key = element.getAttribute('data-key') || element.getAttribute('data-key-tooltip');
            if (translations[language] && translations[language][key]) {
                if (element.hasAttribute('data-key')) {
                    if (['A', 'BUTTON', 'P', 'H1', 'H2', 'H3', 'SPAN', 'LI', 'DIV'].includes(element.tagName)) {
                        element.innerHTML = translations[language][key];
                    } else {
                        element.textContent = translations[language][key];
                    }
                }
                if (element.hasAttribute('data-key-tooltip')) {
                    element.setAttribute('data-tooltip', translations[language][key]);
                    element.setAttribute('title', translations[language][key]);
                }
            }
        });
    }

    /* ------------------------------------------
       c. Language Initialization & Switcher
       ------------------------------------------ */
    const userLanguage = localStorage.getItem('language') || 'fr';
    translatePage(userLanguage);

    function updateLanguageButton(lang) {
        const langButton = document.getElementById('lang-button');
        if (!langButton) return;
        const flagSpan = langButton.querySelector('.lang-flag');
        const textSpan = langButton.querySelector('.lang-text');
        if (lang === 'fr') {
            flagSpan.textContent = '\u{1F1EB}\u{1F1F7}';
            textSpan.textContent = 'FR';
        } else {
            flagSpan.textContent = '\u{1F1EC}\u{1F1E7}';
            textSpan.textContent = 'EN';
        }
    }
    updateLanguageButton(userLanguage);

    const langButton = document.getElementById('lang-button');
    const langDropdown = document.getElementById('lang-dropdown');

    if (langButton && langDropdown) {
        langButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            langDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-switcher')) {
                langButton.setAttribute('aria-expanded', 'false');
                langDropdown.classList.remove('active');
            }
        });

        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', function() {
                const selectedLanguage = this.getAttribute('data-lang');
                localStorage.setItem('language', selectedLanguage);
                translatePage(selectedLanguage);
                updateLanguageButton(selectedLanguage);
                langButton.setAttribute('aria-expanded', 'false');
                langDropdown.classList.remove('active');
                const announcement = document.getElementById('language-announcement');
                if (announcement) {
                    announcement.textContent = `Language changed to ${selectedLanguage === 'en' ? 'English' : 'French'}`;
                    setTimeout(() => { announcement.textContent = ''; }, 1000);
                }
                document.documentElement.lang = selectedLanguage;
            });
        });
    }

    /* ------------------------------------------
       d. Header Shrink Effect
       ------------------------------------------ */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('shrink');
            } else {
                header.classList.remove('shrink');
            }
        });
    }

    /* ------------------------------------------
       e. Hamburger Menu
       ------------------------------------------ */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            const isExpanded = navLinks.classList.toggle('show');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('show');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    /* ------------------------------------------
       f. Fade-in Animation for Sections
       ------------------------------------------ */
    const sections = document.querySelectorAll('.fade-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.1 });
        sections.forEach(section => observer.observe(section));
    }

    /* ------------------------------------------
       g. Back to Top Button
       ------------------------------------------ */
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            const footer = document.querySelector('.footer');
            if (!footer) return;
            const scrollPosition = window.scrollY + window.innerHeight;
            const footerTop = footer.offsetTop;
            const distanceFromFooter = footerTop - scrollPosition;
            if (window.scrollY > 500 && distanceFromFooter > 100) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ------------------------------------------
       h. Active Nav Highlighting by URL Path
       ------------------------------------------ */
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath ||
            (currentPath === '/' && href === '/') ||
            (currentPath.endsWith('/index.html') && href === '/') ||
            (href !== '/' && currentPath.startsWith(href.replace('.html', '')))) {
            link.classList.add('active');
        }
    });

    /* ------------------------------------------
       i. Lazy Loading for Images
       ------------------------------------------ */
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const picture = img.closest('picture');
                    if (picture) {
                        const source = picture.querySelector('source[data-srcset]');
                        if (source && source.dataset.srcset) {
                            source.srcset = source.dataset.srcset;
                            source.removeAttribute('data-srcset');
                        }
                    }
                    if (img.dataset.src) {
                        const fullImage = new Image();
                        fullImage.onload = () => {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.add('lazy-loaded');
                        };
                        fullImage.onerror = () => {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.add('lazy-loaded');
                        };
                        fullImage.src = img.dataset.src;
                    } else {
                        img.classList.add('lazy-loaded');
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    /* ------------------------------------------
       j. Facebook Button Blur Handler
       ------------------------------------------ */
    const facebookButton = document.querySelector('.floating-facebook');
    if (facebookButton) {
        facebookButton.addEventListener('click', function() { this.blur(); });
    }

});
