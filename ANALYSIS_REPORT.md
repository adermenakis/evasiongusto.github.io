# Evasion Gusto Website Analysis Report

**Date**: March 3, 2026
**Branch**: `multi-page-seo-gtm` (off `dev`)
**Website**: [evasiongusto.be](https://evasiongusto.be)

---

## 1. Current Architecture Overview

### Structure
- **Single-page application (SPA)** — 1 HTML file (`index.html`, ~44KB, 493 lines)
- **6 anchor-linked sections**: Home, This Week, Services, About, Gallery, Contact
- **Bilingual**: French/English via client-side `data-key` translation system stored in `script.js`
- **Tech stack**: Vanilla JS (no frameworks), plain CSS, static hosting on GitHub Pages

### File Inventory
| File | Size | Purpose |
|------|------|---------|
| `index.html` | 44KB | Single HTML page with all sections |
| `styles.css` | 33.8KB | Main stylesheet (1574 lines) |
| `script.js` | 44KB | Core logic: translations, nav, lazy loading (786 lines) |
| `gallery-script.js` | 8KB | Lightbox gallery functionality |
| `analytics.js` | 1.8KB | GA4 with GDPR consent |
| `manifest.json` | — | PWA manifest |
| `robots.txt` | — | Crawl directives |
| `sitemap.xml` | — | URL index for search engines |
| `images/` | ~4.2MB | 76 files (WebP + JPG pairs, SVG logos) |

---

## 2. SEO Audit

### What's Working Well
- **Meta tags**: Title (keyword-rich), description, keywords, author all present
- **Open Graph + Twitter Cards**: Configured for social sharing
- **Structured Data (JSON-LD)**: `LocalBusiness` + `FoodEstablishment` + `EducationalOrganization` with 28 served areas, contact info, hours, geo coordinates
- **Hreflang tags**: FR/EN/x-default properly configured
- **Canonical URL**: Set to `https://www.evasiongusto.be/`
- **Image optimization**: WebP + JPG fallbacks, lazy loading with LQIP (base64 placeholders), explicit width/height attributes

### Critical SEO Issues

#### Issue 1: Single-Page Architecture Limits Indexing
**Impact: HIGH**

Google treats the entire site as ONE page. All 6 sections share a single URL, single title, single meta description, and single set of keywords. This means:
- Only 1 keyword targeting opportunity instead of 12+
- No ability to rank individual services for specific search queries
- "Chef a domicile Beaumont" and "cours de cuisine Mons" compete for the same URL
- Google cannot assign topic-specific authority to sections within a single page

**Fix**: Split into 12 separate pages (6 core + 6 individual service pages).

#### Issue 2: Sitemap Contains Anchor Fragment URLs
**Impact: HIGH**

Current `sitemap.xml` lists URLs like:
```
https://www.evasiongusto.be/#this-week
https://www.evasiongusto.be/#services
https://www.evasiongusto.be/#about
```

**Google ignores URL fragments** (`#` anchors) — these are all treated as the same URL (`/`). The sitemap effectively has 1 URL, not 6.

**Fix**: Replace with real page URLs after multi-page split.

#### Issue 3: Thin Content per "Page"
**Impact: MEDIUM**

Each section has only 2-3 short paragraphs. For Google to rank a page, it typically needs 500-1000+ words of quality, keyword-rich content. Current content per section:
- Home: ~50 words
- This Week: ~30 words
- Services: ~120 words (6 × 20-word descriptions)
- About: ~150 words
- Gallery: captions only
- Contact: address/phone only

**Fix**: Expand each page to 500-1000 words with keyword-rich, valuable content.

#### Issue 4: Missing Internal Linking
**Impact: MEDIUM**

A single-page site has no true internal links — only anchor jumps. Google values internal links for:
- Distributing page authority (PageRank)
- Discovering content relationships
- Understanding site hierarchy

**Fix**: Multi-page architecture naturally creates internal linking opportunities. Add breadcrumbs, cross-page CTAs, and footer sitemap.

#### Issue 5: No FAQ Schema
**Impact: LOW-MEDIUM**

FAQ schema (`FAQPage`) can generate rich snippets in Google results, increasing click-through rates. Common questions for a catering business:
- "How far in advance should I book?"
- "What areas do you serve?"
- "Do you accommodate dietary restrictions?"

**Fix**: Add FAQ sections to service pages and contact page with JSON-LD `FAQPage` schema.

---

## 3. Analytics & Tracking Audit

### Current Setup
- **GA4** tracking ID: `G-Z38L6G3HR0`
- **Implementation**: `analytics.js` loaded via `<script defer>`
- **GDPR compliance**: Cookie consent popup, analytics blocked if user declines
- **No Google Tag Manager (GTM)**

### Issues

#### Issue 1: No Google Tag Manager
**Impact: HIGH**

Direct GA4 implementation works but is limited:
- Adding new tags (Facebook Pixel, Google Ads, etc.) requires code changes
- No centralized tag management
- No version control for tag configurations
- No preview/debug mode for tags
- Not using Consent Mode v2 (required for EU compliance since March 2024)

**Fix**: Implement GTM to manage all tags. GA4 becomes a tag *inside* GTM.

#### Issue 2: Consent Mode Not v2
**Impact: MEDIUM**

Current consent is a simple accept/decline that blocks/allows GA4. Google's Consent Mode v2 provides:
- Cookieless pings (basic measurement even when declined)
- Granular consent categories (analytics_storage, ad_storage, etc.)
- Required for Google Ads remarketing in the EU

**Fix**: Implement Consent Mode v2 via GTM.

#### Issue 3: No Event Tracking
**Impact: MEDIUM**

Currently only tracking pageviews. Missing:
- CTA button clicks (Request Quote, Call, WhatsApp)
- Menu PDF downloads/views
- Service section interactions
- Language switch events
- Scroll depth

**Fix**: Configure custom events in GTM.

---

## 4. Performance Audit

### What's Working Well
- **Lazy loading**: IntersectionObserver with 200px rootMargin for images, PDF, and map
- **LQIP**: Base64 tiny image placeholders prevent layout shift
- **Resource hints**: `preconnect` to Google Fonts, `preload` for critical CSS/images
- **Deferred scripts**: All JS loaded with `defer`
- **WebP images**: Modern format with JPG fallbacks via `<picture>` elements
- **No frameworks**: Vanilla JS keeps bundle small

### Minor Issues
- **CSS `background-attachment: fixed`**: Used for parallax effect — causes paint performance issues on mobile
- **Single CSS file (33.8KB)**: Not a major issue at this size, but per-page critical CSS could improve FCP
- **No service worker**: Manifest exists but no offline support

---

## 5. Multi-Page Architecture Plan

### Proposed Page Structure (12 pages)

```
/                              → Home (index.html)
/menu.html                     → Weekly Menu
/services.html                 → Services Hub
/services/degustation.html     → Wine & Beer Tasting
/services/plats-emporter.html  → Takeout & Delivery
/services/traiteur.html        → Event Catering
/services/chef-domicile.html   → Private Chef
/services/cours-cuisine.html   → Cooking Classes
/services/team-building.html   → Team Building
/about.html                    → About
/gallery.html                  → Gallery
/contact.html                  → Contact
```

### SEO Benefits of This Split
| Metric | Current (1 page) | Proposed (12 pages) |
|--------|-------------------|---------------------|
| Indexable URLs | 1 | 12 |
| Unique title tags | 1 | 12 |
| Unique meta descriptions | 1 | 12 |
| Keyword targeting opportunities | ~5 | 50+ |
| JSON-LD schemas | 1 (LocalBusiness) | 12 (LocalBusiness, Service, FAQPage, BreadcrumbList, etc.) |
| Internal links | 0 (anchors only) | 50+ |
| Content depth | ~400 words total | 6,000-10,000 words total |

### Per-Page SEO Template
Each page will have:
- Unique `<title>` (50-60 chars, primary keyword first)
- Unique `<meta description>` (150-160 chars with CTA)
- Unique canonical URL
- Page-specific OG and Twitter Card tags
- Page-specific JSON-LD structured data
- Breadcrumbs (with `BreadcrumbList` schema)
- Hreflang tags pointing to that specific page's language variants

---

## 6. Google Tag Manager Implementation Plan

### Architecture
```
GTM Container (GTM-XXXXXXX)
├── Tags
│   ├── GA4 Configuration (G-Z38L6G3HR0)
│   ├── GA4 Page View Event
│   ├── GA4 Custom Events (CTA clicks, PDF views, etc.)
│   └── [Future: Facebook Pixel, Google Ads, etc.]
├── Triggers
│   ├── All Pages
│   ├── CTA Button Clicks
│   ├── PDF View
│   └── Scroll Depth
└── Variables
    ├── GA4 Measurement ID
    └── Page-specific variables
```

### Code Changes Required
1. **Add to `<head>` of every page** (as high as possible):
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

2. **Add immediately after `<body>` on every page**:
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

3. **Delete `analytics.js`** — GA4 is configured as a tag inside GTM

4. **Add Consent Mode v2 BEFORE the GTM snippet**:
```html
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
});
</script>
```

### Important: GTM Does NOT Require Meta Tags
GTM uses JavaScript snippets, not `<meta>` tags. The only `<meta>` tags needed are the standard SEO ones (title, description, OG, etc.) that already exist.

---

## 7. Content Strategy

### Content Goals per Page
| Page | Current Words | Target Words | Focus Keywords (FR) | Focus Keywords (EN) |
|------|--------------|-------------|--------------------|--------------------|
| Home | ~50 | 500-800 | chef à domicile, traiteur Beaumont | private chef, catering Belgium |
| Menu | ~30 | 400-600 | plats à emporter, menu semaine | weekly menu, takeout Beaumont |
| Services Hub | ~120 | 300-500 | services traiteur Hainaut | catering services Belgium |
| Wine Tasting | ~20 | 800-1000 | dégustation vins bières Mons | wine beer tasting Belgium |
| Takeout | ~20 | 800-1000 | plats à emporter Beaumont livraison | gourmet takeout delivery |
| Event Catering | ~20 | 800-1000 | traiteur événement mariage | event catering wedding |
| Private Chef | ~20 | 800-1000 | chef à domicile Beaumont | private chef at home |
| Cooking Classes | ~20 | 800-1000 | cours de cuisine Hainaut | cooking classes workshop |
| Team Building | ~20 | 800-1000 | team building culinaire | culinary team building |
| About | ~150 | 800-1000 | Évasion Gusto histoire mission | about chef story |
| Gallery | captions | 200-300 | galerie photos traiteur | photo gallery catering |
| Contact | info only | 400-600 | contact traiteur Beaumont | contact catering booking |

**Total**: From ~400 words → 7,000-10,000 words of unique, SEO-optimized content.

### Content Guidelines
- All content bilingual (FR primary, EN translation)
- Geographic keywords naturally woven in (Beaumont, Chimay, Mons, Charleroi, Hainaut, Namur, Brussels, NATO SHAPE)
- Each page answers a specific user intent / search query
- FAQ sections on service and contact pages (3-5 questions each)
- Internal links to related pages within body text

---

## 8. Technical Migration Plan

### Files to Create
| File | Description |
|------|-------------|
| `translations.json` | Extracted translations from script.js |
| `js/common.js` | Shared JS (nav, translation, GDPR, lazy loading) |
| `js/menu.js` | PDF lazy loading |
| `js/contact.js` | Map lazy loading |
| `menu.html` | Weekly menu page |
| `services.html` | Services hub page |
| `services/degustation.html` | Wine & Beer tasting |
| `services/plats-emporter.html` | Takeout & delivery |
| `services/traiteur.html` | Event catering |
| `services/chef-domicile.html` | Private chef |
| `services/cours-cuisine.html` | Cooking classes |
| `services/team-building.html` | Team building |
| `about.html` | About page |
| `gallery.html` | Gallery page |
| `contact.html` | Contact page |

### Files to Modify
| File | Changes |
|------|---------|
| `index.html` | Strip to home-only content, add GTM, update nav |
| `styles.css` | Add breadcrumb styles, page-specific adjustments |
| `sitemap.xml` | Complete rewrite with real page URLs (12 entries) |
| `robots.txt` | Update disallow rules |
| `manifest.json` | Update shortcut URLs |

### Files to Delete
| File | Reason |
|------|--------|
| `analytics.js` | Replaced by GTM |

---

## 9. Updated robots.txt Plan
```
User-agent: *
Allow: /

Sitemap: https://www.evasiongusto.be/sitemap.xml

User-agent: *
Disallow: /images/og-image.jpg
Disallow: /images/twitter-image.jpg
Disallow: /js/
```

## 10. Updated sitemap.xml Plan
- 12 URL entries (all real page URLs, no anchor fragments)
- Each with `lastmod`, `changefreq`, `priority`
- Each with `hreflang` alternates for FR/EN
- Priority hierarchy: Home (1.0) > Menu (0.9) > Services/Contact (0.8) > Individual services/About/Gallery (0.7)

---

## 11. Checklist Summary

### Quick Wins (No architecture change needed)
- [x] Meta tags present and keyword-rich
- [x] OG and Twitter Cards configured
- [x] JSON-LD structured data
- [x] Image optimization (WebP, lazy loading, LQIP)
- [x] Resource hints and preloading
- [x] GDPR consent popup

### Required Changes
- [ ] Split into 12 separate pages
- [ ] Implement Google Tag Manager
- [ ] Migrate GA4 to GTM
- [ ] Implement Consent Mode v2
- [ ] Expand content to 7,000-10,000 words total
- [ ] Update sitemap.xml with real URLs
- [ ] Update robots.txt
- [ ] Add breadcrumbs with BreadcrumbList schema
- [ ] Add FAQ schema to service and contact pages
- [ ] Add per-page JSON-LD structured data
- [ ] Internal linking strategy across all pages
- [ ] Extract translations to standalone JSON file
- [ ] Refactor script.js into modular files

---

*Report generated as part of the multi-page SEO overhaul initiative.*
