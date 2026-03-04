/**
 * Jest Setup File
 * Configures globals and mocks for testing
 */

// Create a real localStorage implementation
const localStorageData = {};

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem(key) {
      return localStorageData[key] || null;
    },
    setItem(key, value) {
      localStorageData[key] = value.toString();
    },
    removeItem(key) {
      delete localStorageData[key];
    },
    clear() {
      Object.keys(localStorageData).forEach(key => {
        delete localStorageData[key];
      });
    },
  },
  writable: true,
});

// Setup default window globals
window.dataLayer = [];
window.gtag = jest.fn();

// Load the gtm-consent.js code
require('./gtm-consent.js');
