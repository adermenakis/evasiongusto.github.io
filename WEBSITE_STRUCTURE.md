# Website Structure & Technical Documentation

## Architecture Overview

Évasion Gusto's website is a single-page application (SPA) built with vanilla HTML, CSS, and JavaScript. It uses a modern, mobile-first responsive design with smooth scrolling navigation and dynamic content.

## HTML Structure

### Document Sections

The website follows a semantic HTML5 structure:

```html
<header>         <!-- Fixed navigation bar -->
<main>           <!-- Main content container -->
  <section id="home">        <!-- Hero section -->
  <section id="this-week">   <!-- Weekly menu -->
  <section id="services">    <!-- Service offerings -->
  <section id="about">       <!-- Company info -->
  <section id="gallery">     <!-- Photo gallery -->
  <section id="contact">     <!-- Contact info -->
</main>
<footer>         <!-- Copyright & credits -->
```

### Navigation System

#### Desktop Navigation
- Horizontal menu bar with logo, navigation links, and language switcher
- Fixed position header that shrinks on scroll
- Smooth scroll to anchor links

#### Mobile Navigation
- Hamburger menu (≤768px viewport width)
- Collapsible navigation menu
- Touch-friendly interface

#### Header Elements
1. **Logo**: SVG image linking to home
2. **Navigation Links**: Home, This Week, Services, About, Gallery, Contact
3. **Language Switcher**: Dropdown (EN/FR)
4. **Hamburger Icon**: Three-bar menu toggle (mobile only)

## CSS Architecture

### CSS Variables (Custom Properties)

Located in `:root` selector for easy theming:

```css
--primary-color: #607244;      /* Olive Green */
--secondary-color: #5F9757;    /* Forest Green */
--accent-color: #86C232;       /* Lime Green */
--text-color: #333;            /* Dark Gray */
--background-color: #f6f6f6;   /* Light Gray */
--highlight-color: #a3a983;    /* Sage */
--olive-brown-color: #5a5c3c;  /* Olive Brown */
--menu-separator-color: #ccc;  /* Separator Gray */
--nav-bar-font-color: #fff;    /* White */
```

### Layout Techniques

1. **Flexbox**: Navigation, header alignment, section centering
2. **CSS Grid**: Gallery layout (3 columns on desktop, responsive on mobile)
3. **Fixed Positioning**: Header and footer
4. **Absolute Positioning**: Gallery titles, lightbox controls
5. **Background Attachment**: Parallax effect with `background-attachment: fixed`

### Responsive Breakpoints

- **Desktop**: Default styles (>768px)
- **Mobile**: `@media (max-width: 768px)`

### Key CSS Features

#### Header Shrink Effect
```css
header.shrink {
    padding: 0.5rem 0;
    background: rgba(96, 114, 68, 0.7);
}

header.shrink .header-logo {
    height: 30px;
}
```

#### Content Boxes
- Semi-transparent white background: `rgba(255, 255, 255, 0.8)`
- Fixed max-width: 800px
- Box shadow for depth
- Border-radius: 10px

#### Gallery Grid
- 3-column layout on desktop
- Automatic reflow on mobile
- 10px gap between items
- Images with overlay titles

#### Animations
- Fade-in effect using opacity and transform
- Intersection Observer for viewport-triggered animations
- CSS transitions for smooth state changes

## JavaScript Functionality

### Core Scripts

#### 1. **script.js** (Main Application Logic)

##### Translation System
```javascript
const translations = {
    en: { /* English translations */ },
    fr: { /* French translations */ }
};
```

**Features**:
- Client-side language switching
- localStorage persistence
- Dynamic content replacement via `data-key` attributes
- 50+ translation keys covering entire site

**Implementation**:
```javascript
function translatePage(language) {
    document.querySelectorAll('[data-key]').forEach((element) => {
        const key = element.getAttribute('data-key');
        // Update element content based on language
    });
}
```

##### Navigation Features
- **Smooth Scrolling**: Scrolls to section with offset for fixed header
- **Header Shrink**: Detects scroll position and adds/removes `.shrink` class
- **Hamburger Toggle**: Opens/closes mobile navigation menu
- **Mobile Menu Close**: Auto-closes menu when link is clicked

##### GDPR Cookie Consent
```javascript
// Check localStorage for consent status
const consentStatus = localStorage.getItem('gdpr-consent');

// Show popup if no consent recorded
if (!consentStatus) {
    gdprPopup.style.display = 'flex';
}
```

Stores three possible states:
- `null`: Not yet decided (show popup)
- `'accepted'`: User accepted cookies
- `'declined'`: User declined cookies

##### Intersection Observer
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
```

**Purpose**: Triggers fade-in animations when sections enter viewport

#### 2. **gallery-script.js** (Image Gallery)

##### Lightbox Functionality
- Opens full-screen image viewer
- Navigation: Previous/Next buttons, arrow keys
- Touch gestures: Swipe left/right
- Close: ESC key or click outside image
- Displays image title from translation system

##### Touch Handling
```javascript
function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
}

function handleTouchMove(evt) {
    const xDiff = xDown - evt.touches[0].clientX;
    // Determine swipe direction
}
```

#### 3. **fade-script.js** (Animation Effects)
Additional animation logic for fade-in effects on page elements.

#### 4. **mui-script.js** (Material UI Integration)
Handles Material Icons and UI component interactions.

#### 5. **recaptcha-script.js** (Form Security)
Integrates Google reCAPTCHA for contact form spam protection (currently placeholder).

### Event Listeners

The site uses multiple event listeners:

1. **DOMContentLoaded**: Initialize translations, GDPR, gallery, observers
2. **scroll**: Header shrink effect
3. **click**: Navigation, hamburger, GDPR buttons, gallery items
4. **change**: Language switcher
5. **keydown**: Lightbox navigation (ESC, Arrow keys)
6. **touchstart/touchmove**: Gallery swipe gestures

## Data Storage

### localStorage Usage

1. **Language Preference**: `localStorage.getItem('language')`
   - Values: `'en'` or `'fr'`
   - Default: `'fr'`

2. **GDPR Consent**: `localStorage.getItem('gdpr-consent')`
   - Values: `'accepted'`, `'declined'`, or `null`

No server-side database or backend. All data is client-side.

## SEO Implementation

### Meta Tags

#### Basic SEO
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta name="author" content="Évasion Gusto">
```

#### Open Graph (Facebook)
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="images/og-image.jpg">
<meta property="og:url" content="https://www.evasiongusto.com">
<meta property="og:type" content="website">
```

#### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="images/twitter-image.jpg">
```

#### Structured Data (JSON-LD)
```json
{
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "Évasion Gusto",
    "url": "https://www.evasiongusto.com",
    "logo": "images/logo.svg",
    "description": "...",
    "sameAs": ["Facebook URL", "Instagram URL"]
}
```

#### Hreflang Tags
```html
<link rel="alternate" hreflang="en" href="https://www.evasiongusto.com/en">
<link rel="alternate" hreflang="fr" href="https://www.evasiongusto.com/fr">
```

### Analytics

**Google Analytics (GA4)**
- Tracking ID: `G-Z38L6G3HR0`
- IP Anonymization: Based on GDPR consent
- Respects user privacy preferences

## Image Assets

### Logo Files
- `logo.svg`: Full logo with background (98.9 KB)
- `logo-nobackground.svg`: Transparent background version (75 KB)
- `logo-original.svg`: Original design file

### Hero Section
- `hero-background.jpg`: Main background image (429 KB)
- Used with `background-attachment: fixed` for parallax effect

### Service Images
Located in `/images/services/`:
- Professional stock photos illustrating each service
- Optimized for web delivery
- Attribution preserved where required

### Gallery Images
Located in `/images/gallery/`:
- 12+ food photography images
- Showcase dishes, presentations, events
- Various culinary creations and techniques

### Social Media Icons
- `facebook-icon.svg`: Facebook logo (1.7 KB)
- Used in header, footer, and home section

## Performance Considerations

### Optimization Strategies
1. **No Framework Overhead**: Vanilla JS = smaller bundle size
2. **Lazy Loading**: Intersection Observer defers animations
3. **SVG Graphics**: Scalable logos without quality loss
4. **CSS Variables**: Easy theming without preprocessor
5. **Single Page**: No page reloads, smooth transitions
6. **localStorage**: Reduces server requests for preferences

### Load Order
1. Google Analytics (async)
2. External fonts (Google Fonts)
3. Styles (CSS)
4. HTML content
5. Scripts (defer/bottom of body)

## Accessibility Features

1. **Semantic HTML**: Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
2. **Alt Text**: All images have descriptive alt attributes
3. **Keyboard Navigation**: Lightbox responds to arrow keys and ESC
4. **Color Contrast**: Dark text on light backgrounds for readability
5. **Focus States**: Visible focus indicators on interactive elements
6. **Responsive Text**: Scales appropriately on mobile devices

## Browser Compatibility

### Modern Features Used
- CSS Variables (Custom Properties)
- CSS Grid
- Flexbox
- Intersection Observer API
- localStorage API
- Touch Events API
- ES6 JavaScript (arrow functions, const/let, template literals)

### Fallbacks
- Graceful degradation for older browsers
- Backdrop-filter has vendor prefixes where needed
- JavaScript feature detection where applicable

## Future Enhancement Opportunities

1. **Contact Form**: Currently no form submission (could add backend API)
2. **Online Ordering**: E-commerce integration for takeaway orders
3. **Booking System**: Event/chef service reservation calendar
4. **Blog/News**: Updates and recipes section
5. **Customer Reviews**: Testimonials integration
6. **Menu PDF Generation**: Dynamic weekly menu creation
7. **Multi-language Expansion**: Add Dutch, German for regional audience
8. **Progressive Web App**: Add manifest.json and service worker
9. **Image Optimization**: WebP format with fallbacks
10. **CDN Integration**: Faster global content delivery
