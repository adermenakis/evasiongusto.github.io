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

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");

    lightboxImg.src = images[currentImageIndex].src;
    lightboxTitle.textContent = images[currentImageIndex].title;

    lightbox.style.display = "flex";

    // Prevent background scrolling - save current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    document.documentElement.classList.add("lightbox-open");
    document.body.classList.add("lightbox-open");
    document.body.style.top = `-${scrollPosition}px`;
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

// Prevent scrolling with touch/swipe on mobile when lightbox is open
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    if (document.getElementById("lightbox").style.display === "flex") {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }
}, { passive: false });

document.addEventListener('touchmove', function(e) {
    const lightbox = document.getElementById("lightbox");
    if (lightbox.style.display === "flex") {
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // If horizontal swipe is more significant than vertical, allow it for image navigation
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            // This is a horizontal swipe, allow it
            return;
        }

        // Prevent all vertical scrolling
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchend', function(e) {
    if (document.getElementById("lightbox").style.display === "flex") {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = Math.abs(touchStartY - touchEndY);

        // Only trigger image change if horizontal swipe is significant and vertical is minimal
        if (diffY < 50) {
            if (diffX > 50) {
                changeImage(1); // Swipe left, next image
            } else if (diffX < -50) {
                changeImage(-1); // Swipe right, previous image
            }
        }
    }
});

// Prevent mouse wheel scrolling when lightbox is open
document.addEventListener('wheel', function(e) {
    if (document.getElementById("lightbox").style.display === "flex") {
        e.preventDefault();
    }
}, { passive: false });
