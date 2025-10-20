// Google Analytics (Optimized Loading)
// Initialize dataLayer
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Load Google Analytics after page is interactive
function loadGoogleAnalytics() {
    var anonymize = localStorage.getItem('gdpr-consent');

    // Only load if user hasn't declined
    if (anonymize !== 'declined') {
        // Create and append script tag
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-Z38L6G3HR0';
        document.head.appendChild(script);

        // Configure after script loads
        script.onload = function() {
            gtag('js', new Date());
            gtag('config', 'G-Z38L6G3HR0', {
                'anonymize_ip': anonymize != 'accepted'
            });
        };
    }
}

// Load after page is fully loaded (doesn't block rendering)
if (document.readyState === 'complete') {
    loadGoogleAnalytics();
} else {
    window.addEventListener('load', loadGoogleAnalytics);
}
