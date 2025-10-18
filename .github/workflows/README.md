# GitHub Actions Workflows

## 🚀 Deploy to Live Website (Manual - RECOMMENDED)

**File**: `deploy-to-live.yml`

### What It Does

This workflow allows you to **manually trigger** a deployment that minifies all CSS/JS files and pushes them to the `live-website` branch. This gives you full control over when to deploy optimized code to production.

### Features

- ✅ **Manual trigger** - You control when to deploy
- ✅ **Choose source branch** - Deploy from main, dev, or master
- ✅ **Complete minification** - Replaces all files with minified versions
- ✅ **Clean deployment** - Only optimized code on live-website branch
- ✅ **Detailed report** - Shows exact file size savings
- ✅ **Force push** - Ensures live-website is always clean

### How It Works

1. **You trigger the workflow** manually from GitHub Actions
2. **Select source branch** to deploy from (main/dev/master)
3. **Workflow minifies** all CSS and JS files
4. **Replaces originals** with minified versions (e.g., styles.css becomes minified)
5. **Force pushes** to `live-website` branch
6. **GitHub Pages** serves from `live-website` branch

### How to Use

1. Go to **Actions** tab in your GitHub repository
2. Click **"Deploy to Live Website (Manual)"** workflow
3. Click **"Run workflow"** button
4. Select source branch (usually `main` or `dev`)
5. Click **"Run workflow"** to start deployment
6. Wait ~30 seconds for completion
7. Check deployment report for file size savings

### Important Notes

- The `live-website` branch will contain **only minified files**
- Original source files remain untouched in your development branches
- Files are renamed: `styles.min.css` → `styles.css` on live-website
- `index.html` references remain unchanged (still loads `styles.css`, but it's minified)
- Each deployment creates a commit with detailed report

### Expected Savings

Based on current file sizes:
- **CSS**: 27 KB → ~18 KB (saving ~9 KB, 33%)
- **JavaScript**: 32 KB → ~19 KB (saving ~13 KB, 40%)
- **Total**: ~22 KB saved (~37% reduction)

### Setting Up GitHub Pages

To serve from the `live-website` branch:
1. Go to **Settings** → **Pages**
2. Under "Source", select branch: **live-website**
3. Select folder: **/ (root)**
4. Click **Save**

Now your live site will always serve optimized code!

---

## 🗜️ Build and Deploy (Auto-Minification)

**File**: `build-and-deploy.yml`

### What It Does

This workflow automatically minifies your CSS and JavaScript files when code is pushed to the main/master/live-website branch, helping improve website performance.

### Features

- ✅ **Automatic minification** of all CSS and JS files
- ✅ **Keeps original files** for development
- ✅ **Creates production HTML** (index.prod.html) with minified references
- ✅ **Generates size report** showing savings
- ✅ **Comments on PRs** with minification preview
- ✅ **Only commits on merge** to main branches

### When It Runs

1. **On Push** to `main`, `master`, or `live-website` branches
   - Minifies all CSS/JS files
   - Creates `*.min.css` and `*.min.js` versions
   - Updates `index.prod.html` to use minified files
   - Commits and pushes changes

2. **On Pull Request** to main branches
   - Shows minification preview in PR comments
   - Does NOT commit (preview only)

3. **Manual Trigger** via GitHub Actions UI

### Files Created

| Original File | Minified File | Description |
|---------------|---------------|-------------|
| `styles.css` | `styles.min.css` | Minified CSS (~30% smaller) |
| `script.js` | `script.min.js` | Minified JavaScript (~40% smaller) |
| `gallery-script.js` | `gallery-script.min.js` | Minified gallery code |
| `index.html` | `index.prod.html` | Production HTML with minified refs |
| - | `size-report.txt` | Detailed size savings report |

### Expected Savings

Based on current file sizes:
- **CSS**: 27 KB → ~18 KB (saving ~9 KB, 33%)
- **JavaScript**: 32 KB → ~19 KB (saving ~13 KB, 40%)
- **Total**: ~22 KB saved (~37% reduction)

### Usage for Development

#### Option 1: Use Original Files (Recommended for Development)
Keep using `index.html` which loads unminified files for easier debugging:
```html
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>
```

#### Option 2: Use Production Files (For Testing)
Rename `index.prod.html` to `index.html` when deploying to production.

#### Option 3: Automatic Switching (Best Approach)
Keep both files and configure GitHub Pages to serve `index.prod.html` as the main page.

### How to Enable

The workflow is already configured and will run automatically. No additional setup needed!

### How to Disable

To disable auto-minification:
1. Delete or rename `.github/workflows/build-and-deploy.yml`
2. Or add this to the top of the file:
```yaml
on:
  workflow_dispatch:  # Manual trigger only
```

### Monitoring

View workflow runs at:
https://github.com/YOUR_USERNAME/evasiongusto.github.io/actions

Each run provides:
- ✅ Success/failure status
- 📊 Size report with savings
- 📝 Commit with minified files
- ⏱️ Build time

### Troubleshooting

**Q: The workflow fails with "Permission denied"**
A: Make sure the repository has "Allow GitHub Actions to create and approve pull requests" enabled in Settings → Actions → General.

**Q: Changes aren't appearing on the live site**
A: You need to update `index.html` to reference `.min.css` and `.min.js` files, or rename `index.prod.html` to `index.html`.

**Q: I want to test minified files locally**
A: Run these commands:
```bash
npm install -g csso-cli terser
csso styles.css -o styles.min.css
terser script.js -c -m -o script.min.js
```

### Tools Used

- **csso-cli**: CSS minification (https://github.com/css/csso-cli)
- **terser**: JavaScript minification (https://terser.org/)
- **html-minifier-terser**: HTML minification (optional)

### Next Steps

After the first run:
1. Check the generated `size-report.txt` to see savings
2. Review minified files (`*.min.css`, `*.min.js`)
3. Update `index.html` to use minified files in production:
   ```html
   <link rel="stylesheet" href="styles.min.css">
   <script src="script.min.js" defer></script>
   ```

### Performance Impact

Expected PageSpeed Insights improvements:
- ⬆️ Performance Score: +5-8 points
- ⬇️ Total Blocking Time: -50-100ms
- ⬇️ First Contentful Paint: -100-200ms
- ✅ Passes "Minify CSS" audit
- ✅ Passes "Minify JavaScript" audit
