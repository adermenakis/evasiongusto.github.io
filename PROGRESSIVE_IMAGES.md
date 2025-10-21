# Progressive Image Loading (Blur-Up Effect)

This website implements progressive image loading with a blur-up effect to improve perceived performance and user experience.

## What is Progressive Image Loading?

Progressive image loading (also called "blur-up" technique) is a performance optimization where:

1. A tiny, low-quality placeholder image (LQIP) loads first (very fast, only ~300 bytes)
2. The LQIP is displayed with a blur filter
3. The full-quality image loads in the background
4. Once loaded, the image smoothly transitions from blurred to sharp

This technique provides several benefits:
- ✅ **Faster perceived load time** - Users see images immediately (albeit blurred)
- ✅ **Better UX** - No jarring "pop-in" of images
- ✅ **Reduced layout shift** - Image dimensions are known from the start
- ✅ **Smaller initial page size** - LQIPs are tiny (~17KB total for all images)
- ✅ **Fixes scrolling issues** - Proper image dimensions prevent scroll position bugs

## How It Works

### 1. LQIP Generation

LQIPs are generated using the `sharp` library:

```bash
npm run lqip:generate
```

This creates `lqip-data.json` with base64-encoded tiny images (20px wide, heavily blurred and compressed).

### 2. HTML Injection

LQIPs are injected into the HTML:

```bash
npm run lqip:inject
```

This replaces generic SVG placeholders with actual blurred image previews.

### 3. Full Process

To regenerate all LQIPs and update the HTML:

```bash
npm run lqip
```

## Technical Implementation

### HTML Structure

```html
<img
  src="data:image/jpeg;base64,/9j/2wBDA..."
  data-src="images/gallery/1.jpg"
  class="lazy"
  alt="..."
>
```

- `src`: Contains the LQIP as a data URI
- `data-src`: Contains the path to the full-quality image
- `class="lazy"`: Triggers lazy loading behavior

### CSS Blur Effect

```css
.gallery-grid img.lazy {
    filter: blur(20px);
    transform: scale(1.1);
    transition: filter 0.5s ease-out, transform 0.5s ease-out;
}

.gallery-grid img.lazy-loaded {
    filter: blur(0);
    transform: scale(1);
}
```

The blur and slight scale create a smooth transition effect.

### JavaScript Lazy Loading

```javascript
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;

            // Load full image in background
            const fullImage = new Image();
            fullImage.onload = () => {
                img.src = img.dataset.src;
                img.classList.add('lazy-loaded'); // Removes blur
            };
            fullImage.src = img.dataset.src;
        }
    });
}, { rootMargin: '200px' });
```

Images start loading 200px before entering the viewport for optimal UX.

## File Size Comparison

| Type | Size | Notes |
|------|------|-------|
| Original JPG (each) | 50-200 KB | Full quality |
| WebP (each) | 30-150 KB | Optimized format |
| LQIP (each) | ~300 bytes | Tiny placeholder |
| **All LQIPs combined** | **~17 KB** | All 57 images |

## Browser Support

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11 requires polyfill for IntersectionObserver

## Maintenance

When adding new images:

1. Add the image files to `images/gallery/` or `images/services/`
2. Update `index.html` with a standard lazy loading structure:
   ```html
   <img src="data:image/svg+xml,..." data-src="images/path/to/image.jpg" class="lazy">
   ```
3. Run `npm run lqip` to regenerate LQIPs and update HTML

## Performance Impact

### Before (SVG Placeholders)
- Initial load: Generic gray placeholders
- Image pop-in: Jarring when scrolling
- Scroll bugs: Images loading caused scroll position jumps

### After (LQIP Blur-Up)
- Initial load: +17KB (all LQIPs embedded)
- Smooth transitions: Blur-to-sharp effect
- Fixed scrolling: Images load correctly before navigation

## Credits

This implementation uses:
- [sharp](https://sharp.pixelplumbing.com/) for image processing
- IntersectionObserver API for lazy loading
- CSS filter and transform for blur effect

## References

- [Medium's Progressive Image Loading](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)
- [Blur Up Technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/)
- [LQIP Best Practices](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders)