# Évasion Gusto Website - Setup & Configuration Guide

Complete guide for setting up, configuring, and deploying the Évasion Gusto website with the new multi-page architecture and Google Tag Manager integration.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Installation & Local Development](#installation--local-development)
3. [Google Tag Manager Setup](#google-tag-manager-setup)
4. [Configuration Checklist](#configuration-checklist)
5. [Bilingual Content Management](#bilingual-content-management)
6. [Docker Local Testing](#docker-local-testing)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## 📌 Project Overview

### Architecture

The website has been **refactored from a single-page app to a multi-page static site** with improved SEO, GTM integration, and modular JavaScript.

**12 Pages Total:**

| Type | Files | Purpose |
|------|-------|---------|
| **Core Pages** (6) | index.html, menu.html, services.html, about.html, gallery.html, contact.html | Main site sections |
| **Service Pages** (6) | services/degustation.html, services/plats-emporter.html, services/traiteur.html, services/chef-domicile.html, services/cours-cuisine.html, services/team-building.html | Individual service descriptions |

### Key Technologies

- **HTML5/CSS3/Vanilla JS** — No build system, pure static files
- **Bilingual System** — `translations.json` with FR/EN content
- **SEO** — JSON-LD structured data, meta tags, hreflang, breadcrumbs
- **Google Tag Manager** — Replaces direct GA4 with Consent Mode v2
- **Image Optimization** — WebP + JPG fallbacks with lazy loading
- **Docker/Nginx** — Local testing environment

### File Structure

```
evasiongusto.github.io/
├── index.html                    # Home page
├── menu.html                     # Weekly menu (PDF embed)
├── services.html                 # Services overview
├── about.html                    # About company
├── gallery.html                  # Image gallery with lightbox
├── contact.html                  # Contact info + map
├── styles.css                    # Main stylesheet
├── translations.json             # Bilingual FR/EN translations
├── manifest.json                 # PWA manifest
├── robots.txt                    # SEO crawler rules
├── sitemap.xml                   # URL sitemap with hreflang
├── Dockerfile                    # Docker image definition
├── docker-compose.yml            # Docker Compose configuration
├── nginx.conf                    # Nginx web server config
├── js/
│   ├── common.js                 # Shared (all pages): header, nav, GDPR, translations
│   ├── menu.js                   # Menu page: PDF lazy loading
│   └── contact.js                # Contact page: Maps lazy loading
├── services/
│   ├── degustation.html          # Wine & beer tasting
│   ├── plats-emporter.html       # Takeout & delivery
│   ├── traiteur.html             # Event catering
│   ├── chef-domicile.html        # Private chef
│   ├── cours-cuisine.html        # Cooking classes
│   └── team-building.html        # Team building activities
├── images/
│   ├── logo-nobackground.svg
│   ├── hero-background.jpg
│   ├── facebook-icon.svg
│   ├── whatsapp-icon.svg
│   ├── services/                 # Service page images
│   └── [12 gallery images]
└── [other config files]
```

---

## 🚀 Installation & Local Development

### Prerequisites

- **Docker & Docker Compose** (for local testing)
  - [Install Docker Desktop](https://www.docker.com/products/docker-desktop)
  - Mac/Windows: Docker Desktop includes Docker Compose
  - Linux: `sudo apt-get install docker.io docker-compose`

- **Git** (for version control)
  - [Install Git](https://git-scm.com/)

### Quick Start

#### 1. Clone Repository
```bash
git clone https://github.com/adermenakis/evasiongusto.github.io.git
cd evasiongusto.github.io
```

#### 2. Choose Development Method

**Option A: Docker (Recommended for consistent environment)**
```bash
# Build and start Docker container
docker-compose up -d

# Site available at: http://localhost:8080
# View logs: docker-compose logs -f
# Stop: docker-compose down
```

**Option B: Direct File Opening (Simple, no server)**
```bash
# Open in browser (works for static HTML, limited functionality)
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

**Option C: Python Local Server (Middle ground)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Site available at: http://localhost:8000
```

#### 3. Verify Installation

Open http://localhost:8080 (Docker) or http://localhost:8000 (Python) and check:
- [ ] Home page loads (header, hero, services grid)
- [ ] Language switcher works (FR ↔ EN)
- [ ] Navigation links work (all 6 pages)
- [ ] Service cards link to individual pages
- [ ] Images load (no broken links)
- [ ] Footer displays

---

## 🏷️ Google Tag Manager Setup

**CRITICAL: This must be done before going to production!**

### What is GTM?

Google Tag Manager is a **tag management system** that lets you:
- Configure Google Analytics (GA4) without code changes
- Manage consent/GDPR compliance dynamically
- Add pixels and scripts without developer intervention
- Test tracking before publishing

### Why Replace Direct GA4?

| Aspect | Direct GA4 | GTM |
|--------|-----------|-----|
| Configuration | Code changes required | Dashboard-based |
| GDPR Consent | Manual implementation | Built-in Consent Mode v2 |
| Testing | Deploy and hope | Preview mode before live |
| Flexibility | Brittle | Easily add/remove tags |

### Step-by-Step Setup

#### Step 1: Create GTM Container

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Log in with Google account (or create one)
3. Click **Create Account**
   - **Account Name**: `Évasion Gusto`
   - **Container Name**: `evasiongusto.be`
   - **Target Platform**: Web
4. Click **Create**
5. **Copy your Container ID** from the modal (format: `GTM-XXXXXXX`)

#### Step 2: Update All HTML Files with Real GTM ID

Find the placeholder `GTM-XXXXXXX` in all 12 HTML files and replace with your real ID:

**Files to update:**
```
index.html
menu.html
services.html
about.html
gallery.html
contact.html
services/degustation.html
services/plats-emporter.html
services/traiteur.html
services/chef-domicile.html
services/cours-cuisine.html
services/team-building.html
```

**Quick search & replace (bash):**
```bash
# Replace GTM-XXXXXXX with your actual ID (e.g., GTM-ABC123XYZ)
find . -name "*.html" -type f -exec sed -i 's/GTM-XXXXXXX/GTM-ABC123XYZ/g' {} +
```

#### Step 3: Configure Google Analytics 4 Tag in GTM

1. In GTM dashboard, click **Tags** (left menu)
2. Click **New** → **Tag Configuration**
3. Choose **Google Analytics: GA4 Configuration**
4. Enter **Measurement ID**: `G-Z38L6G3HR0`
5. Enable **Send page view events** (default)
6. Under **Triggering**, select **All Pages**
7. Name it: `GA4 Configuration - All Pages`
8. Click **Save**

#### Step 4: Set Up Consent Mode v2

1. Click **Variables** (left menu)
2. Click **New** → **User-Defined Variable**
3. Variable Type: **1st Party Cookie**
4. Cookie Name: `consent_granted`
5. Default Value: `false`
6. Name: `Consent Status`
7. Click **Save**

8. Click **Tags** → **New** (for consent update)
9. Tag Type: **Custom HTML**
10. HTML:
```javascript
<script>
  gtag('consent', 'update', {
    'analytics_storage': document.querySelector('#accept-cookies') ? 'granted' : 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
  });
</script>
```
11. Trigger: **When Accept Cookies Clicked**
12. Name: `Update Consent - Accept`
13. Save

#### Step 5: Test in Preview Mode

1. Click **Preview** button (top-right)
2. Enter your site URL: `http://localhost:8080`
3. Start preview
4. Visit your site, check the GTM debug console
5. Verify page views and consent events fire

#### Step 6: Publish

1. Exit preview mode
2. Click **Submit**
3. **Change Name**: `GA4 + Consent Mode v2 - Multi-page Site`
4. **Add Description**: `Deployed with multi-page SEO overhaul`
5. Click **Publish**

**🎉 GTM is now live!** Your GA4 tracking is now managed via GTM.

### Verify GA4 Tracking

1. Go to [Google Analytics](https://analytics.google.com)
2. Select Évasion Gusto property
3. Check **Realtime** dashboard
4. Load your site in a new tab
5. You should see 1 active user within 30 seconds

---

## ✅ Configuration Checklist

### Phase 1: Code Setup ✅ COMPLETE
- [x] Extracted translations to `translations.json`
- [x] Split `script.js` into modules (`js/common.js`, `js/menu.js`, `js/contact.js`)
- [x] Created 12 HTML pages (6 core + 6 service)
- [x] Updated `sitemap.xml` with real URLs (not anchors)
- [x] Updated `robots.txt` for new structure
- [x] Updated `manifest.json` with real page URLs
- [x] Added JSON-LD schemas per page (Service, FAQPage, BreadcrumbList, etc.)
- [x] Deleted `analytics.js` (replaced by GTM)
- [x] Updated `styles.css` with new components

### Phase 2: GTM Setup 🔴 ACTION REQUIRED
- [ ] **Create GTM container** at tagmanager.google.com
- [ ] **Get Container ID** (GTM-XXXXXXX)
- [ ] **Replace placeholder** in all 12 HTML files
- [ ] **Configure GA4 Configuration tag** in GTM (Measurement ID: G-Z38L6G3HR0)
- [ ] **Set up Consent Mode v2** tags
- [ ] **Test in preview mode**
- [ ] **Publish to live**
- [ ] **Verify in Google Analytics** (Real-time dashboard)

### Phase 3: Content Review 🟡 PENDING USER REVIEW
- [ ] Review service page content (French translations provided)
- [ ] Customize service descriptions if needed
- [ ] Add/remove FAQ questions per service
- [ ] Update imagery on service pages
- [ ] Verify all CTAs (Contact buttons) work
- [ ] Test language switcher across all pages

### Phase 4: Local Testing 🟡 BEFORE DEPLOYMENT
- [ ] Start Docker: `docker-compose up -d`
- [ ] Test all 12 pages load at http://localhost:8080
- [ ] Navigation works (all links functional)
- [ ] Language switching (FR/EN toggle)
- [ ] Lazy loading (images, PDF, map)
- [ ] Mobile responsiveness (use DevTools)
- [ ] GDPR consent popup
- [ ] Breadcrumbs display correctly
- [ ] FAQ sections on each service page
- [ ] Gallery lightbox on gallery page
- [ ] Google Map loads on contact page
- [ ] Menu PDF embed loads

### Phase 5: Pre-Production Verification 🟡 BEFORE MERGE
- [ ] Run Lighthouse audit (each page)
- [ ] Check sitemap.xml in search console
- [ ] Validate JSON-LD with Rich Results Test
- [ ] Test hreflang tags
- [ ] Verify canonical URLs
- [ ] Check Open Graph tags with Facebook Debugger
- [ ] Test Twitter Card preview

### Phase 6: Deployment 🔴 AFTER APPROVAL
- [ ] Commit changes to `multi-page-seo-gtm` branch
- [ ] Create pull request to `main`
- [ ] Merge to `main` after review
- [ ] Verify live at https://www.evasiongusto.be
- [ ] Confirm GTM is firing (GA4 real-time)
- [ ] Consent works (accept/decline GDPR)
- [ ] Mobile responsive on live site

---

## 🌐 Bilingual Content Management

### How Translations Work

**File**: `translations.json` (55KB)

```json
{
  "fr": {
    "home": "Accueil",
    "tastingPageTitle": "Événements de Dégustation de Vins & Bières",
    ...
  },
  "en": {
    "home": "Home",
    "tastingPageTitle": "Wine & Beer Tasting Events",
    ...
  }
}
```

### Adding New Content

#### 1. Add Translation Keys to JSON

```json
{
  "fr": {
    "newFeatureTitle": "Mon nouveau contenu",
    "newFeatureDesc": "Description détaillée..."
  },
  "en": {
    "newFeatureTitle": "My new content",
    "newFeatureDesc": "Detailed description..."
  }
}
```

#### 2. Use in HTML with `data-key`

```html
<h2 data-key="newFeatureTitle">Mon nouveau contenu</h2>
<p data-key="newFeatureDesc">Description détaillée...</p>
```

#### 3. JavaScript will automatically translate on language switch

The `common.js` script:
1. Loads `translations.json` on page load
2. Caches in `sessionStorage` (faster page transitions)
3. On language change, replaces all `data-key` text
4. Persists language choice in `localStorage`

### Translation Keys Reference

All available keys in `translations.json`:

**Core Navigation:**
- `home`, `thisWeek`, `services`, `about`, `gallery`, `contact`

**Home Page:**
- `homeTitle`, `homeSubtitle`, `whyChooseUsTitle`, `whyChooseUsItem1-3` (title + desc)

**Service Pages (example for tasting, same pattern for all):**
- `tastingPageTitle`, `tastingPageDesc`
- `tastingWhatWeOffer`, `tastingWhatWeOfferDesc`
- `tastingHowItWorks`, `tastingHowItWorksDesc`
- `tastingFaq1Q`, `tastingFaq1A`, etc. (3 FAQs)

**Contact:**
- `contactTitle`, `contactDesc`
- `contactServiceArea`, `contactServiceAreaDesc`
- `contactBookingFaq`
- `contactFaq1Q`, `contactFaq1A`, etc.

**Footer:**
- `footerAllRights`, `footerDesignedBy`

**GDPR:**
- `gdprTitle`, `gdprAccept`, `gdprDecline`

---

## 🐳 Docker Local Testing

### Prerequisites

```bash
# Verify Docker is installed
docker --version
docker-compose --version
```

### Quick Start

```bash
# From project root directory
docker-compose up -d

# View running containers
docker ps

# View logs
docker-compose logs -f web

# Stop
docker-compose down

# Rebuild image (after code changes)
docker-compose up -d --build
```

### Access

- **Site URL**: http://localhost:8080
- **Nginx access logs**: `docker-compose logs web`
- **Port**: 8080 (mapped to container port 80)

### Testing Checklist

```bash
# 1. Test home page
curl -I http://localhost:8080/

# 2. Test service page
curl -I http://localhost:8080/services/degustation.html

# 3. Check gzip compression
curl -I -H "Accept-Encoding: gzip" http://localhost:8080/styles.css

# 4. Verify security headers
curl -I http://localhost:8080/ | grep X-Frame-Options
```

### Docker Configuration Details

**Dockerfile:**
- Nginx Alpine image (light, fast)
- Copies project files to `/usr/share/nginx/html`
- Loads custom `nginx.conf`

**docker-compose.yml:**
- Port mapping: 8080 → 80
- Container name: `evasiongusto-web`
- Health check every 30s
- Restart on failure

**nginx.conf:**
- Gzip compression enabled
- Cache headers for static files
- Security headers (X-Frame-Options, CSP, etc.)
- No-cache for HTML files (always fresh)
- Denies hidden files (`.git`, `.env`, etc.)

### Troubleshooting Docker

**Port 8080 already in use:**
```bash
# Change port in docker-compose.yml
# Change "8080:80" to "8081:80" (or any available port)
docker-compose up -d
```

**Container won't start:**
```bash
# Check logs
docker-compose logs web

# Rebuild
docker-compose up -d --build --force-recreate
```

**File changes not reflecting:**
```bash
# Files are copied into container (not mounted)
# Rebuild required for changes to apply
docker-compose up -d --build
```

---

## 🚀 Deployment

### Branch Strategy

- **`dev`** — Development branch (readable code)
- **`multi-page-seo-gtm`** — Feature branch with all new changes
- **`main`** — Stable production branch
- **GitHub Pages** serves `main` branch as live site

### Deployment Steps

#### 1. Verify All Changes Locally

```bash
# 1. Build Docker image
docker-compose up -d

# 2. Test at http://localhost:8080
# - All pages load ✓
# - Navigation works ✓
# - Language switcher ✓
# - Lazy loading works ✓
```

#### 2. Commit & Push Changes

```bash
# On multi-page-seo-gtm branch
git add .
git commit -m "Configuration updates and GTM setup"
git push origin multi-page-seo-gtm
```

#### 3. Create Pull Request

```bash
# Go to GitHub → Create PR from multi-page-seo-gtm → main
# Review changes
# Merge (squash or regular merge)
```

#### 4. GitHub Pages Deployment

- Changes to `main` are automatically deployed
- Deployment takes 1-5 minutes
- Check status: **Repository → Actions tab**
- Verify at https://www.evasiongusto.be

### What Gets Deployed

- All 12 HTML pages
- CSS, JavaScript, images
- JSON files (translations, manifest, sitemap)
- XML files (sitemap, robots)

### Post-Deployment Verification

1. **Check site loads**: https://www.evasiongusto.be
2. **Verify GTM**: Check for GTM script in page source
3. **Check GA4**: Google Analytics real-time dashboard
4. **Test navigation**: Click through all pages
5. **Check mobile**: Use mobile browser or DevTools

---

## 🔧 Troubleshooting

### GTM Not Firing

**Symptom**: No events in GA4 real-time dashboard

**Solutions**:
1. Verify Container ID is correct (GTM-XXXXXXX format)
2. Check browser console for errors: `F12 → Console`
3. Check GTM Preview mode is publishing
4. Wait 30-60 seconds for data to appear in GA4
5. Clear browser cache and retry

### Translations Not Working

**Symptom**: Text shows translation key instead of content (e.g., "tastingPageTitle" instead of "Événements de Dégustation...")

**Solutions**:
1. Check `translations.json` exists and is valid
2. Open browser console: `window.evasionTranslations` should be defined
3. Check `js/common.js` loaded (Network tab in DevTools)
4. Verify `data-key` attributes in HTML match translation keys
5. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)

### Language Switcher Not Persisting

**Symptom**: Language resets when navigating to different page

**Solutions**:
1. Check localStorage: `F12 → Application → Local Storage`
2. Look for `evasionLanguage` key (should be `fr` or `en`)
3. Check browser allows localStorage (privacy settings)
4. Clear localStorage and retry: `localStorage.clear()`

### Images Not Loading

**Symptom**: Broken image icons on pages

**Solutions**:
1. Check image paths use relative paths (`images/file.jpg`, NOT `/images/file.jpg`)
2. Service pages use `../images/` (one level up)
3. Verify WebP and JPG files exist: `ls images/services/`
4. Check file names match exactly (case-sensitive)
5. Check CORS headers if loading from external domain

### PDF Not Loading on Menu Page

**Symptom**: Menu PDF shows loading spinner indefinitely

**Solutions**:
1. PDF embedded via Google Drive (must be shared publicly)
2. Check Drive file ID: `https://drive.google.com/file/d/[FILE_ID]/preview`
3. Verify file is publicly shared (Anyone with link can view)
4. Check quota: Google Drive may have bandwidth limits
5. Use fallback link to Google Drive directly if embed fails

### Map Not Loading on Contact Page

**Symptom**: Map shows loading spinner or blank area

**Solutions**:
1. Map embedded via iframe (requires internet)
2. Check iframe src URL is correct
3. Verify Google Maps embed is allowed
4. Check browser's permission settings for location
5. Check Network tab for CORS errors

### 404 Errors on Service Pages

**Symptom**: Service pages return 404 when accessed directly

**Solutions**:
1. Service pages must be in `/services/` directory
2. Check file names: `degustation.html`, `chef-domicile.html`, etc.
3. Case-sensitive: `services/` (lowercase)
4. Verify files committed to git
5. Check GitHub Pages is enabled (Settings → Pages)

### Mobile Menu Not Working

**Symptom**: Hamburger menu doesn't open on mobile

**Solutions**:
1. Check `js/common.js` is loaded (check Network tab)
2. Check hamburger button with id="hamburger" exists
3. Verify CSS for hamburger menu in `styles.css`
4. Check JavaScript console for errors
5. Ensure viewport meta tag in head: `<meta name="viewport" ...>`

---

## 📚 Additional Resources

### Documentation Files

- **[DEPLOYMENT.md](DEPLOYMENT.md)** — GitHub Pages deployment details
- **[ANALYSIS_REPORT.md](ANALYSIS_REPORT.md)** — Architecture analysis and design rationale
- **[WEBSITE_STRUCTURE.md](WEBSITE_STRUCTURE.md)** — Detailed page structure
- **[SERVICES.md](SERVICES.md)** — Service descriptions

### External Resources

- **Google Tag Manager**: https://tagmanager.google.com
- **Google Analytics**: https://analytics.google.com
- **Google Search Console**: https://search.google.com/search-console
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/

### Performance Tools

- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Lighthouse**: Built into Chrome DevTools

---

## 📞 Support

### Common Questions

**Q: Do I need Node.js to run the site?**
A: No, it's pure static HTML/CSS/JS. Only for Docker (no npm packages used).

**Q: Can I edit pages without touching code?**
A: Some changes (translations, menu) can be done in JSON. For HTML structural changes, you need to edit files.

**Q: How often should I update content?**
A: Weekly menu updates, monthly analytics review, quarterly content refresh (see maintenance checklist in [DEPLOYMENT.md](DEPLOYMENT.md)).

**Q: What if GTM breaks?**
A: GA4 tracking pauses, but site continues to function. Re-publish GTM container or revert to direct GA4 code.

---

## 🎉 Next Steps

1. **Create GTM Container** (15 mins) ← START HERE
2. **Test locally with Docker** (10 mins)
3. **Review service page content** (30 mins)
4. **Configure GA4 tag in GTM** (10 mins)
5. **Test consent and tracking** (10 mins)
6. **Deploy to production** (5 mins)

Total time: ~80 minutes

---

**Last Updated**: 2026-03-03
**Status**: Ready for GTM setup and deployment
**Branch**: `multi-page-seo-gtm`
**Repository**: https://github.com/adermenakis/evasiongusto.github.io
