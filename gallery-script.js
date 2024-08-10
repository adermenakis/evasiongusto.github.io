const images = [
    {
        src: "images/gallery/1.jpg",
        title: "Delicious Appetizers"
    },
    {
        src: "images/gallery/2.jpg",
        title: "Gourmet Dishes"
    },
    {
        src: "images/gallery/3.jpg",
        title: "Fine Desserts"
    },
    {
        src: "images/gallery/4.jpg",
        title: "Elegant Presentations"
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

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");

    lightboxImg.src = images[currentImageIndex].src;
    lightboxTitle.textContent = images[currentImageIndex].title;

    lightbox.style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
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
        }
    }
});
