const images = [
    {
        src: "images/gallery/1.jpg",
        title: "Delicious Appetizers"
    },
    {
        src: "images/gallery/2.jpg",
        title: "Mousaka"
    },
    {
        src: "images/gallery/3.jpg",
        title: "Fine Desserts"
    },
    {
        src: "images/gallery/4.jpg",
        title: "Quiche lorraine camembert-jambon"
    },
    {
        src: "images/gallery/5.jpg",
        title: "Buffet Setup"
    },
    {
        src: "images/gallery/6.jpg",
        title: "Outdoor Events"
    },
    {
        src: "images/gallery/7.jpg",
        title: "Wine Tastings"
    },
    {
        src: "images/gallery/8.jpg",
        title: "Beer Pairings"
    },
    {
        src: "images/gallery/9.jpg",
        title: "Charcuterie Boards"
    },
    {
        src: "images/gallery/10.jpg",
        title: "Private Dinners"
    },
    {
        src: "images/gallery/11.jpg",
        title: "Cooking Workshops"
    },
    {
        src: "images/gallery/12.jpg",
        title: "Team Building"
    }
];

let currentImageIndex = 0;
let scrollPosition = 0;

// Zoom variables
let scale = 1;
let translateX = 0;
let translateY = 0;
let isPanning = false;
let startPanX = 0;
let startPanY = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");

    lightboxImg.src = images[currentImageIndex].src;
    lightboxTitle.textContent = images[currentImageIndex].title;

    lightbox.style.display = "flex";

    // Reset zoom on image change
    resetZoom();

    // Prevent background scrolling - save current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    document.documentElement.classList.add("lightbox-open");
    document.body.classList.add("lightbox-open");
    document.body.style.top = `-${scrollPosition}px`;
}

function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
}

function updateImageTransform() {
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";

    // Re-enable background scrolling and restore scroll position
    document.documentElement.classList.remove("lightbox-open");
    document.body.classList.remove("lightbox-open");
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
}

function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");

    lightboxImg.src = images[currentImageIndex].src;
    lightboxTitle.textContent = images[currentImageIndex].title;

    // Reset zoom when changing images
    resetZoom();
}

document.addEventListener("keydown", function(event) {
    if (document.getElementById("lightbox").style.display === "flex") {
        if (event.key === "ArrowRight") {
            changeImage(1);
        } else if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "Escape") {
            closeLightbox();
        }
    }
});

// Touch events for pinch-to-zoom and swipe navigation
let touchStartX = 0;
let touchStartY = 0;
let initialDistance = 0;
let initialScale = 1;
let lastTapTime = 0;

const lightboxImg = document.getElementById("lightbox-img");

// Get distance between two touch points
function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

lightboxImg.addEventListener('touchstart', function(e) {
    if (document.getElementById("lightbox").style.display === "flex") {
        if (e.touches.length === 2) {
            // Pinch zoom starting
            e.preventDefault();
            initialDistance = getDistance(e.touches);
            initialScale = scale;
        } else if (e.touches.length === 1) {
            if (scale > 1) {
                // Panning if zoomed in
                isPanning = true;
                startPanX = e.touches[0].clientX - translateX;
                startPanY = e.touches[0].clientY - translateY;
            } else {
                // Swipe navigation if not zoomed
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }
    }
}, { passive: false });

lightboxImg.addEventListener('touchmove', function(e) {
    if (document.getElementById("lightbox").style.display === "flex") {
        if (e.touches.length === 2) {
            // Pinch zoom
            e.preventDefault();
            const currentDistance = getDistance(e.touches);
            scale = Math.max(1, Math.min(4, initialScale * (currentDistance / initialDistance)));
            updateImageTransform();
        } else if (e.touches.length === 1) {
            if (isPanning && scale > 1) {
                // Pan the zoomed image
                e.preventDefault();
                translateX = e.touches[0].clientX - startPanX;
                translateY = e.touches[0].clientY - startPanY;
                updateImageTransform();
            }
        }
    }
}, { passive: false });

lightboxImg.addEventListener('touchend', function(e) {
    if (document.getElementById("lightbox").style.display === "flex") {
        if (e.touches.length === 0) {
            isPanning = false;

            // Double-tap to zoom
            const currentTime = new Date().getTime();
            const tapInterval = currentTime - lastTapTime;

            if (tapInterval < 300 && tapInterval > 0) {
                // Double tap detected
                if (scale === 1) {
                    // Zoom in to 2x on double tap
                    scale = 2;
                    // Center the zoom on the tap location
                    const rect = lightboxImg.getBoundingClientRect();
                    const tapX = e.changedTouches[0].clientX - rect.left;
                    const tapY = e.changedTouches[0].clientY - rect.top;
                    translateX = (rect.width / 2 - tapX);
                    translateY = (rect.height / 2 - tapY);
                    updateImageTransform();
                } else {
                    // Zoom out to normal
                    resetZoom();
                }
                lastTapTime = 0; // Reset to prevent triple-tap issues
            } else {
                lastTapTime = currentTime;

                // Swipe navigation (only if not zoomed)
                if (scale === 1 && touchStartX !== 0) {
                    const touchEndX = e.changedTouches[0].clientX;
                    const touchEndY = e.changedTouches[0].clientY;
                    const diffX = touchStartX - touchEndX;
                    const diffY = Math.abs(touchStartY - touchEndY);

                    if (diffY < 50 && Math.abs(diffX) > 50) {
                        if (diffX > 50) {
                            changeImage(1); // Swipe left, next image
                        } else if (diffX < -50) {
                            changeImage(-1); // Swipe right, previous image
                        }
                    }

                    touchStartX = 0;
                    touchStartY = 0;
                }
            }
        }
    }
}, { passive: false });

// Prevent background scrolling when lightbox is open
document.addEventListener('wheel', function(e) {
    const lightbox = document.getElementById("lightbox");
    if (lightbox.style.display === "flex") {
        e.preventDefault();
    }
}, { passive: false });
