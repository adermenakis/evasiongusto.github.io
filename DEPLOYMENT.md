# Deployment Guide - GitHub Pages

This document explains how the Évasion Gusto website is deployed using GitHub Pages and how to maintain/update it.

## Current Deployment Configuration

### GitHub Pages Settings

- **Hosting Platform**: GitHub Pages
- **Repository**: evasiongusto.github.io
- **Branch**: Main branch (root directory)
- **Custom Domain**: evasiongusto.be (configured via CNAME file)
- **URL**: https://www.evasiongusto.be

### Domain Configuration

The custom domain is configured through:
1. **CNAME file** in repository root containing: `evasiongusto.be`
2. **DNS records** pointing to GitHub Pages servers
3. **GitHub repository settings** with custom domain enabled

## Deployment Process

### Automatic Deployment

GitHub Pages automatically deploys the site when:
1. Changes are pushed to the main branch
2. Changes are committed directly on GitHub
3. Pull requests are merged to main

**Deployment Time**: Typically 1-5 minutes after push

### Manual Deployment Steps

If deploying for the first time or from a new repository:

#### 1. Repository Setup
```bash
# Clone or create repository
git clone https://github.com/[username]/evasiongusto.github.io.git
cd evasiongusto.github.io
```

#### 2. Add Website Files
Ensure these files are in the root directory:
```
/
├── index.html
├── styles.css
├── script.js
├── gallery-script.js
├── fade-script.js
├── mui-script.js
├── recaptcha-script.js
├── CNAME
├── robots.txt
└── images/
```

#### 3. Configure CNAME
Create/verify `CNAME` file:
```bash
echo "evasiongusto.be" > CNAME
```

#### 4. Push to GitHub
```bash
git add .
git commit -m "Deploy website"
git push origin main
```

#### 5. Enable GitHub Pages
1. Go to repository Settings
2. Navigate to "Pages" section
3. Select source: "Deploy from a branch"
4. Select branch: "main" and folder: "/ (root)"
5. Add custom domain: `evasiongusto.be`
6. Enable "Enforce HTTPS"

## DNS Configuration

### Required DNS Records

To point your custom domain to GitHub Pages:

#### For evasiongusto.be domain:
```
Type    Name    Value                           TTL
A       @       185.199.108.153                 3600
A       @       185.199.109.153                 3600
A       @       185.199.110.153                 3600
A       @       185.199.111.153                 3600
CNAME   www     evasiongusto.github.io          3600
```

**Note**: DNS changes can take 24-48 hours to propagate globally.

### Verify DNS Configuration
```bash
# Check A records
dig evasiongusto.be +noall +answer

# Check CNAME records
dig www.evasiongusto.be +noall +answer
```

## SSL/HTTPS Configuration

GitHub Pages provides free SSL certificates via Let's Encrypt:

1. Custom domain must be properly configured
2. DNS must be correctly pointed to GitHub Pages
3. Enable "Enforce HTTPS" in repository settings
4. Certificate provisioning takes a few minutes

**Important**: Always use HTTPS for production sites.

## Making Updates

### Content Updates

#### Updating Text Content
1. Edit `index.html` for structural changes
2. Edit `script.js` translations object for bilingual content
3. Commit and push changes

Example workflow:
```bash
# Edit files
nano index.html
nano script.js

# Stage changes
git add index.html script.js

# Commit with descriptive message
git commit -m "Update services section description"

# Push to deploy
git push origin main
```

#### Updating Styles
1. Edit `styles.css`
2. Test locally in browser
3. Commit and push

#### Adding Images
1. Add images to appropriate folder (`images/`, `images/gallery/`, `images/services/`)
2. Update `index.html` to reference new images
3. Optimize images before upload (recommended)
4. Commit and push

### Weekly Menu Updates

The weekly menu is embedded via Google Drive:
```html
<iframe src="https://drive.google.com/file/d/[FILE_ID]/preview" ...></iframe>
```

To update:
1. Update the PDF in Google Drive
2. No code changes needed if using same file ID
3. If new file, update iframe src in `index.html`

### Rollback Procedure

If a deployment breaks the site:

#### Option 1: Git Revert
```bash
# Find the problematic commit
git log --oneline

# Revert to previous commit
git revert [commit-hash]

# Push to deploy
git push origin main
```

#### Option 2: Git Reset (use with caution)
```bash
# Reset to previous working commit
git reset --hard [commit-hash]

# Force push (only if you're certain)
git push --force origin main
```

#### Option 3: GitHub Web Interface
1. Go to repository on GitHub
2. Navigate to commit history
3. Click on last working commit
4. Click "Browse files"
5. Click "..." menu → "Create new branch from this commit"
6. Set as main branch in settings

## Testing Before Deployment

### Local Testing

Since this is a static site with no build process:

1. **Open Locally**:
   ```bash
   # Simple method: Open index.html in browser
   open index.html  # macOS
   xdg-open index.html  # Linux
   start index.html  # Windows
   ```

2. **Local Server** (recommended for testing AJAX/external resources):
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (if you have http-server installed)
   npx http-server -p 8000

   # PHP
   php -S localhost:8000
   ```

   Then visit: http://localhost:8000

3. **Test Checklist**:
   - [ ] All sections load correctly
   - [ ] Navigation works (smooth scrolling)
   - [ ] Language switcher toggles between FR/EN
   - [ ] Gallery lightbox opens and navigates
   - [ ] Mobile responsive design (resize browser)
   - [ ] All images load
   - [ ] Links work correctly
   - [ ] GDPR popup appears (clear localStorage first)
   - [ ] Header shrinks on scroll

### Browser Testing

Test in multiple browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Mobile Testing

1. **Browser DevTools**: Use responsive design mode
2. **Real Devices**: Test on actual phones/tablets
3. **Check**:
   - Hamburger menu works
   - Touch gestures in gallery
   - Text is readable
   - Images scale appropriately
   - Navigation is touch-friendly

## Monitoring & Analytics

### Google Analytics

Currently configured with:
- **Tracking ID**: G-Z38L6G3HR0
- **Platform**: Google Analytics 4 (GA4)
- **Privacy**: IP anonymization based on GDPR consent

**Accessing Analytics**:
1. Log into Google Analytics
2. Select Évasion Gusto property
3. View traffic, behavior, and conversion data

### Performance Monitoring

Use these tools to monitor site performance:

1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
   - Enter: https://www.evasiongusto.be
   - Check scores and recommendations

2. **GTmetrix**: https://gtmetrix.com/
   - Detailed performance analysis
   - Waterfall chart for load times

3. **Lighthouse** (Chrome DevTools):
   - Open DevTools → Lighthouse tab
   - Run audit for Performance, Accessibility, SEO

### Uptime Monitoring

Consider using:
- **UptimeRobot**: Free monitoring service
- **Pingdom**: Uptime and performance monitoring
- **GitHub Status**: Check GitHub Pages status at https://www.githubstatus.com/

## Backup Strategy

### Git as Backup

Git inherently backs up your site:
- Every commit is a backup point
- Full history preserved
- Can restore any previous version

### Additional Backup Recommendations

1. **Local Clone**: Keep local copy updated
   ```bash
   git clone https://github.com/[username]/evasiongusto.github.io.git
   ```

2. **External Backup**: Periodically export repository
   ```bash
   # Create archive
   git archive --format=zip HEAD > evasiongusto-backup-$(date +%Y%m%d).zip
   ```

3. **Image Backups**: Keep original high-resolution images separate from web-optimized versions

## Troubleshooting

### Common Issues

#### Site Not Updating
**Problem**: Changes pushed but not visible on live site

**Solutions**:
1. Wait 5 minutes for GitHub Pages build
2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
3. Check repository Actions tab for build status
4. Verify pushed to correct branch (main)

#### CNAME File Disappearing
**Problem**: Custom domain configuration lost after push

**Solutions**:
1. Ensure CNAME file is committed and in root directory
2. Don't have `.gitignore` excluding CNAME
3. Re-add CNAME file if missing:
   ```bash
   echo "evasiongusto.be" > CNAME
   git add CNAME
   git commit -m "Restore CNAME"
   git push
   ```

#### SSL Certificate Issues
**Problem**: HTTPS not working or certificate errors

**Solutions**:
1. Verify DNS is correctly configured
2. Wait for DNS propagation (24-48 hours)
3. Disable and re-enable "Enforce HTTPS" in settings
4. Check GitHub Pages status page

#### 404 Errors
**Problem**: Pages showing 404 errors

**Solutions**:
1. Verify `index.html` is in root directory
2. Check file names are correct (case-sensitive)
3. Ensure GitHub Pages is enabled in repository settings
4. Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (macOS)

#### Images Not Loading
**Problem**: Broken image links

**Solutions**:
1. Verify image paths are correct (relative to root)
2. Check file names match exactly (case-sensitive)
3. Ensure images are committed and pushed
4. Verify images aren't excluded by `.gitignore`

## Performance Optimization

### Image Optimization

Before adding images to the site:

1. **Compress Images**:
   ```bash
   # Using ImageMagick
   convert input.jpg -quality 85 -resize 1920x1920> output.jpg

   # Using online tools
   # - TinyPNG.com
   # - Squoosh.app
   ```

2. **Use Appropriate Formats**:
   - JPEG for photos
   - PNG for graphics with transparency
   - SVG for logos and icons
   - WebP for modern browsers (with fallbacks)

3. **Responsive Images**:
   Consider creating multiple sizes for different devices

### CSS/JS Optimization

Current site uses unminified code for readability. For production optimization:

1. **Minify CSS**:
   ```bash
   # Using cssnano/postcss
   npx cssnano styles.css styles.min.css
   ```

2. **Minify JavaScript**:
   ```bash
   # Using terser
   npx terser script.js -o script.min.js -c -m
   ```

3. **Update HTML** to reference minified files

### Caching Strategy

GitHub Pages automatically handles caching. For manual control:

1. **Versioning**: Add version query strings
   ```html
   <link rel="stylesheet" href="styles.css?v=1.2.0">
   ```

2. **Cache Busting**: Change version number when updating files

## Security Considerations

### HTTPS Only
- Always enforce HTTPS
- Update all links to use HTTPS
- Mixed content (HTTP resources on HTTPS page) will be blocked

### No Server-Side Processing
- Static site = reduced attack surface
- No database to compromise
- No server-side vulnerabilities

### Content Security
- Review all external scripts (analytics, fonts)
- Keep third-party dependencies minimal
- Regularly audit external resources

### GDPR Compliance
- Cookie consent popup implemented
- Google Analytics respects user choice
- localStorage for consent tracking
- Privacy-focused analytics configuration

## Contact & Support

### Repository Owner
Contact repository administrator for:
- Access permissions
- Deployment issues
- Configuration changes

### Technical Support
- **GitHub Pages Documentation**: https://docs.github.com/pages
- **GitHub Support**: https://support.github.com
- **DNS Provider Support**: Contact your domain registrar

### Emergency Contacts
For critical issues:
1. Check GitHub Status: https://www.githubstatus.com/
2. Review repository Actions/build logs
3. Contact website designer: [sdLix](https://sdlix.com)

## Maintenance Checklist

### Weekly
- [ ] Update "This Week" menu in Google Drive
- [ ] Check analytics for traffic issues
- [ ] Verify site is loading correctly

### Monthly
- [ ] Review analytics data
- [ ] Check for broken links
- [ ] Test forms and interactive elements
- [ ] Verify SSL certificate is valid
- [ ] Update content as needed

### Quarterly
- [ ] Run performance audit (Lighthouse)
- [ ] Update dependencies (if any added)
- [ ] Review and optimize images
- [ ] Check mobile responsiveness
- [ ] Test across different browsers

### Annually
- [ ] Review and update content
- [ ] Refresh images and photography
- [ ] Audit SEO performance
- [ ] Update copyright year in footer
- [ ] Review analytics goals and tracking

---

**Last Updated**: 2024
**Deployment Platform**: GitHub Pages
**Repository**: evasiongusto.github.io
**Domain**: https://www.evasiongusto.be
