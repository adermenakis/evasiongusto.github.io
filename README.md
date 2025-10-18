# Évasion Gusto - Premium Catering Services Website

A professional, bilingual (French/English) website for Évasion Gusto, a premium catering business based in Beaumont, Belgium, serving the Mons area and NATO SHAPE region.

## Overview

Évasion Gusto offers exceptional culinary experiences through multiple services including wine and beer tasting, take-away food delivery, event organization, private chef services, culinary workshops, and team-building activities. This website showcases these services with an elegant, responsive design.

## Business Information

- **Business Name**: Évasion Gusto
- **Registration**: BE 1009.024.385
- **Location**: Rue Orger Meurice 12, 6500 Beaumont, Belgium
- **Service Area**: Beaumont, Sivry, Rance, Chimay, Mons, NATO SHAPE area, and surrounding regions
- **Contact**:
  - Email: info@evasiongusto.be
  - Phone: +32 (0) 480 65 80 12
- **Website**: https://www.evasiongusto.be
- **Social Media**: [Facebook](https://www.facebook.com/profile.php?id=61563989882231)

## Key Features

### Bilingual Support
- **Languages**: French (default) and English
- Client-side translation system using JavaScript
- Language preference stored in localStorage
- Complete translations for all content

### Services Offered

1. **Wine and Beer Tasting** - Carefully curated tasting experiences with educational components
2. **Take Away Food & Delivery** - Restaurant-quality gourmet meals delivered to your door
3. **Event Organization** - Full-service event planning and catering
4. **Private Chef Services** - In-home fine dining experiences
5. **Culinary Workshops** - Interactive cooking classes for all skill levels
6. **Team Building Workshops** - Food-focused team-building activities

### Technical Features

- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **Single Page Application**: Smooth scrolling navigation between sections
- **Image Gallery**: Interactive lightbox gallery with touch/swipe support
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, and structured data
- **GDPR Compliant**: Cookie consent popup with localStorage management
- **Google Analytics**: Tracking with privacy-respecting anonymization option
- **Fixed Header**: Shrinking header on scroll for better UX
- **Animations**: Fade-in effects and intersection observer for smooth transitions

## Technology Stack

- **HTML5**: Semantic markup with proper accessibility
- **CSS3**: Modern styling with CSS variables, flexbox, grid, and animations
- **Vanilla JavaScript**: No frameworks, pure JavaScript for optimal performance
- **Google Fonts**: Open Sans font family
- **Material Icons**: Icon library for UI elements
- **GitHub Pages**: Static site hosting

## File Structure

```
/
├── index.html              # Main HTML file (bilingual single-page site)
├── styles.css              # Main stylesheet with responsive design
├── script.js               # Main JavaScript (translations, navigation, gallery)
├── gallery-script.js       # Gallery-specific functionality
├── fade-script.js          # Animation effects
├── mui-script.js           # Material UI integration
├── recaptcha-script.js     # Contact form security
├── CNAME                   # Custom domain configuration
├── robots.txt              # SEO crawler instructions
├── LICENSE                 # Project license
└── images/
    ├── logo.svg
    ├── logo-nobackground.svg
    ├── hero-background.jpg
    ├── facebook-icon.svg
    ├── gallery/            # Gallery images (12+ food photos)
    └── services/           # Service section images
```

## Color Scheme

The website uses an elegant green/olive color palette reflecting natural, fresh ingredients:

- **Primary**: #607244 (Olive Green)
- **Secondary**: #5F9757 (Forest Green)
- **Accent**: #86C232 (Lime Green)
- **Highlight**: #a3a983 (Sage)
- **Background**: #f6f6f6 (Light Gray)
- **Text**: #333 (Dark Gray)

## Culinary Influences

Évasion Gusto's cuisine draws inspiration from:
- Greek traditions
- Belgian classics
- French techniques
- Japanese precision
- North American favorites

The menu ranges from simple grilled meats to complex plated dishes with wine/beer pairings.

## SEO & Marketing

- Google Analytics tracking (G-Z38L6G3HR0)
- Structured data (schema.org) for better search visibility
- Social media integration (Facebook)
- Open Graph and Twitter Card meta tags
- Hreflang tags for language targeting
- Optimized for local search (Mons, Beaumont, NATO SHAPE area)

## Development & Maintenance

### Local Development
Simply open `index.html` in a modern web browser. No build process required.

### Deployment

The site uses a **two-branch deployment strategy** to keep development code readable while serving optimized production code:

#### Branch Structure
- **`dev`** - Development branch with readable, unminified code
- **`main`** - Stable branch for tested features
- **`live-website`** - Production branch with minified code (auto-deployed to GitHub Pages)

#### Deployment Process

1. **Work on features** in the `dev` branch:
   ```bash
   git checkout dev
   # Make changes, test locally
   git add .
   git commit -m "Your feature description"
   git push origin dev
   ```

2. **Deploy to production** when ready:
   - Go to the **Actions** tab on GitHub
   - Click **"Deploy to Live Website (Manual)"** workflow
   - Click **"Run workflow"** button
   - Select source branch: `dev` (or `main`)
   - Click **"Run workflow"**
   - Wait ~30 seconds for deployment to complete

3. **GitHub Pages** automatically serves the optimized `live-website` branch at https://evasiongusto.be

#### What the Deployment Does

The manual deployment workflow:
- ✅ Minifies all CSS files (~33% size reduction)
- ✅ Minifies all JavaScript files (~40% size reduction)
- ✅ Replaces files with optimized versions on `live-website` branch
- ✅ Generates detailed size savings report
- ✅ Total savings: ~22 KB (~37% reduction)

**Expected Performance Impact:**
- Performance Score: +5-8 points on PageSpeed Insights
- Total Blocking Time: -50-100ms
- First Contentful Paint: -100-200ms

For detailed deployment documentation, see [.github/workflows/README.md](.github/workflows/README.md)

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Credits

- **Website Design**: [sdLix](https://sdlix.com)
- **Copyright**: © 2024 Évasion Gusto - BE 1009.024.385

## License

See [LICENSE](LICENSE) file for details.
