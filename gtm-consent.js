// GTM + Consent Mode v2 Manager
// This file handles consent state restoration and updates for Google Tag Manager

(function() {
    'use strict';

    // Default consent state (all tracking denied, security granted)
    const DEFAULT_CONSENT = {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'functionality_storage': 'granted',
        'security_storage': 'granted'
    };

    /**
     * Parse stored consent from localStorage
     * Handles both old format (string: 'accepted'|'declined') and new format (JSON object)
     */
    function getStoredConsent() {
        try {
            const stored = localStorage.getItem('gdpr-consent');

            if (!stored) {
                return null; // First time visitor
            }

            // New format: JSON string
            if (stored.startsWith('{')) {
                return JSON.parse(stored);
            }

            // Old format: string 'accepted' or 'declined'
            if (stored === 'accepted') {
                return { analytics: true, marketing: true };
            }
            if (stored === 'declined') {
                return { analytics: false, marketing: false };
            }

            return null;
        } catch (e) {
            console.error('Error parsing stored consent:', e);
            return null;
        }
    }

    /**
     * Convert user consent preferences to GTM Consent Mode values
     */
    function preferencesToConsentMode(preferences) {
        const consentMode = { ...DEFAULT_CONSENT };

        if (preferences && typeof preferences === 'object') {
            // Analytics consent
            if (preferences.analytics === true) {
                consentMode.analytics_storage = 'granted';
            }

            // Marketing consent (all ad-related categories)
            if (preferences.marketing === true) {
                consentMode.ad_storage = 'granted';
                consentMode.ad_user_data = 'granted';
                consentMode.ad_personalization = 'granted';
            }

            // Functionality is always granted for basic site features
            consentMode.functionality_storage = 'granted';
            consentMode.security_storage = 'granted';
        }

        return consentMode;
    }

    /**
     * Restore consent for returning visitors
     * Called on page load to set GTM consent state based on stored preferences
     */
    function restoreConsent() {
        const stored = getStoredConsent();

        if (stored) {
            const consentMode = preferencesToConsentMode(stored);
            // Update consent with stored preferences (if they differ from defaults)
            gtag('consent', 'update', consentMode);
            console.log('Restored consent from localStorage:', consentMode);
        }
    }

    /**
     * Public function: Update consent based on user action
     * Called from consent banner (script.js)
     */
    window.updateConsent = function(analytics = false, marketing = false, saveToStorage = true) {
        const consentMode = preferencesToConsentMode({
            analytics: analytics,
            marketing: marketing
        });

        // Send update to GTM
        gtag('consent', 'update', consentMode);
        console.log('Consent updated via banner:', consentMode);

        // Store preference if requested (all banner actions should save)
        if (saveToStorage) {
            localStorage.setItem('gdpr-consent', JSON.stringify({
                analytics: analytics,
                marketing: marketing
            }));
            console.log('Consent saved to localStorage');
        }
    };

    /**
     * Special case: Accept all
     */
    window.acceptAllConsent = function() {
        window.updateConsent(true, true, true);
    };

    /**
     * Special case: Decline all
     */
    window.declineAllConsent = function() {
        window.updateConsent(false, false, true);
    };

    /**
     * Check if user has already made a consent choice
     */
    window.hasConsentChoice = function() {
        return localStorage.getItem('gdpr-consent') !== null;
    };

    // On page load, restore consent for returning visitors
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', restoreConsent);
    } else {
        restoreConsent();
    }
})();
