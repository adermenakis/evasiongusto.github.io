// Google Analytics (GDPR-Compliant Loading)
// Initialize dataLayer
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Track if analytics has been loaded to prevent double-loading
window.analyticsLoaded = false;

// Function to load Google Analytics
window.loadGoogleAnalytics = function() {
    // Prevent double-loading
    if (window.analyticsLoaded) {
        return;
    }

    var consentStatus = localStorage.getItem('gdpr-consent');

    // Only load if user has explicitly accepted OR hasn't made a choice yet (implicit consent)
    // Change this to only load on 'accepted' if you want explicit consent only
    if (consentStatus !== 'declined') {
        window.analyticsLoaded = true;

        // Create and append script tag
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-Z38L6G3HR0';
        document.head.appendChild(script);

        // Configure after script loads
        script.onload = function() {
            gtag('js', new Date());
            gtag('config', 'G-Z38L6G3HR0', {
                'anonymize_ip': consentStatus !== 'accepted'
            });
            console.log('Google Analytics loaded with consent status:', consentStatus);
        };
    }
}

// For returning visitors who previously accepted or haven't decided: load immediately
var consentStatus = localStorage.getItem('gdpr-consent');
if (consentStatus !== 'declined') {
    // Load after page is interactive (doesn't block rendering)
    if (document.readyState === 'complete') {
        window.loadGoogleAnalytics();
    } else {
        window.addEventListener('load', window.loadGoogleAnalytics);
    }
}

// For first-time visitors: analytics will be loaded when they click "Accept" in script.js
