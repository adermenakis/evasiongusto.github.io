# GitHub Actions Workflow

## 🚀 Deploy to Live Website (Manual)

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
6. **GitHub Pages** automatically deploys the live-website branch

### How to Use

#### Step 1: Trigger the Deployment

1. Go to **Actions** tab in your GitHub repository
2. Click **"Deploy to Live Website (Manual)"** workflow in the left sidebar
3. Click **"Run workflow"** button (top right)
4. Select source branch (usually `dev` or `main`)
5. Click the green **"Run workflow"** button
6. Wait ~30 seconds for completion
7. Check deployment report for file size savings

#### Step 2: Set Up GitHub Pages (One-time setup)

To serve your live site from the `live-website` branch:

1. Go to **Settings** → **Pages**
2. Under "Source", select branch: **live-website**
3. Select folder: **/ (root)**
4. Click **Save**

After a few minutes, your site will be live at: `https://YOUR_USERNAME.github.io/REPO_NAME`

### Workflow Process

```
┌─────────────┐
│   dev       │  ← Your development branch (readable code)
└──────┬──────┘
       │
       │ Manual trigger
       │ via GitHub Actions
       ▼
┌─────────────┐
│  Workflow   │  1. Checkout dev branch
│  Execution  │  2. Minify all CSS/JS
│             │  3. Replace files with minified versions
└──────┬──────┘  4. Force push to live-website
       │
       ▼
┌─────────────┐
│live-website │  ← Production branch (minified code)
└──────┬──────┘
       │
       │ GitHub Pages
       │ auto-deploys
       ▼
┌─────────────┐
│  Live Site  │  🌐 Your optimized website
└─────────────┘
```

### Important Notes

- The `live-website` branch contains **only minified files**
- Original source files remain untouched in your development branches (`dev`, `main`)
- Files are minified and renamed: `styles.min.css` → `styles.css` on live-website
- `index.html` references remain unchanged (still loads `styles.css`, but it's the minified version)
- Each deployment creates a commit with a detailed size report
- The workflow uses **force push**, so live-website is always clean

### Expected Savings

Based on current file sizes:
- **CSS**: 27 KB → ~18 KB (saving ~9 KB, 33%)
- **JavaScript**: 32 KB → ~19 KB (saving ~13 KB, 40%)
- **Total**: ~22 KB saved (~37% reduction)

### Development Workflow

```bash
# 1. Work on your feature in dev branch
git checkout dev
# ... make changes ...
git add .
git commit -m "Add new feature"
git push origin dev

# 2. When ready to deploy to production:
# - Go to GitHub Actions
# - Run "Deploy to Live Website" workflow
# - Select "dev" as source branch
# - Wait for deployment to complete

# 3. Your live site is updated!
# No need to touch the live-website branch manually
```

### Troubleshooting

#### Workflow fails with "Permission denied"

**Solution**: Enable workflow permissions
1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select **"Read and write permissions"**
3. Click **Save**

#### Changes aren't appearing on live site

**Possible causes**:
1. GitHub Pages is still building (wait 1-2 minutes)
2. Browser cache - hard refresh with `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
3. GitHub Pages source not set to `live-website` branch - check Settings → Pages

#### Want to test locally before deploying

```bash
# Install minification tools
npm install -g csso-cli terser

# Minify CSS
csso styles.css -o styles.min.css

# Minify JS
terser script.js -c -m -o script.min.js

# Compare file sizes
ls -lh styles.css styles.min.css
```

### Tools Used

- **csso-cli**: CSS minification (https://github.com/css/csso-cli)
  - Removes whitespace, comments, and redundant code
  - Optimizes CSS structure
  - Typical savings: 30-40%

- **terser**: JavaScript minification (https://terser.org/)
  - Removes whitespace and comments
  - Mangles variable names
  - Compresses code structure
  - Typical savings: 40-50%

### Performance Impact

Expected PageSpeed Insights improvements after deployment:
- ⬆️ **Performance Score**: +5-8 points
- ⬇️ **Total Blocking Time**: -50-100ms
- ⬇️ **First Contentful Paint**: -100-200ms
- ✅ **Passes "Minify CSS" audit**
- ✅ **Passes "Minify JavaScript" audit**

### Monitoring Deployments

View all workflow runs at:
```
https://github.com/YOUR_USERNAME/REPO_NAME/actions
```

Each deployment provides:
- ✅ Success/failure status
- 📊 Detailed size report
- 📝 Commit message with savings
- ⏱️ Execution time (~30 seconds)

### Why This Approach?

**Keeps development clean**:
- Work on `dev` or `main` with readable, formatted code
- Easy debugging and collaboration
- Git history remains clean and meaningful

**Production is optimized**:
- `live-website` branch has only minified code
- Maximum performance for end users
- Smaller file transfers = faster page loads

**Full control**:
- Deploy only when you're ready
- Test changes before pushing to production
- No automatic deployments on every commit

### Next Steps

1. ✅ Workflow is ready to use
2. Configure GitHub Pages to serve from `live-website` branch
3. Make some changes in your `dev` branch
4. Test the workflow by running it manually
5. Check the live site to verify everything works!
