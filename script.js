document.addEventListener('DOMContentLoaded', function () {
    // Translation Data
const translations = {
    en: {
        home: "Home",
        thisWeek: "This Week",
        services: "Services",
        about: "About",
        gallery: "Gallery",
        contact: "Contact",
        intro: "Évasion Gusto: Elevate Your Culinary Journey",
        introDesc: "Premium catering services tailored to your every need, conveniently located near NATO SHAPE in Mons.",
        followUs: "Follow us on Facebook",
        thisWeekTitle: "This Week's Menu",
        thisWeekDesc: "This week, Évasion Gusto presents an exquisite selection of dishes crafted with the freshest seasonal ingredients. Our chefs have created a menu that not only delights the palate but also showcases the best of what the season has to offer. From tantalizing appetizers to decadent desserts, each dish is a celebration of flavors and creativity. Dive into our weekly menu and discover new favorites that will thrill your taste buds and leave you wanting more.",
        thisWeekLink: "Discover the Full Menu of This Week",
        servicesTitle: "Our Exquisite Services",
        service1Title: "Wine and Beer Tasting",
        service1Desc: "Savor carefully selected wine and beer tastings perfectly paired with gourmet dishes to delight your palate. Our sommeliers and beer experts create a sensory journey that combines flavors and aromas, offering an educational and deeply enjoyable experience. Whether you are a connoisseur or a casual enthusiast, our tastings are designed to broaden your horizons and enhance your appreciation of fine beverages.",
        service2Title: "Take Away Food and Food Delivery",
        service2Desc: "Enjoy the luxury of gourmet meals at home. Our take-away and food delivery service brings freshly prepared, restaurant-quality dishes directly to your door. Each meal is crafted with the finest ingredients and carefully packaged to ensure it arrives in perfect condition. Ideal for busy professionals, family dinners, or special occasions, our service offers convenience without compromising quality.",
        service3Title: "Event Organization",
        service3Desc: "Transform any venue into the perfect setting for your event. Whether it's an intimate gathering or a grand celebration, we bring your vision to life. Our event planners work closely with you to design and execute every detail, from décor and entertainment to customized menus. Our goal is to create unforgettable experiences that reflect your style and preferences, ensuring a stress-free and seamless event.",
        service4Title: "Private Chef Services",
        service4Desc: "Experience the art of fine dining in the comfort of your home. Our private chefs create customized menus and prepare exquisite meals tailored to your tastes. Enjoy a restaurant-quality culinary experience without leaving your residence, perfect for intimate dinners, special celebrations, or simply indulging in gourmet cuisine. Our chefs take care of everything from ingredient sourcing to cleanup, allowing you to relax and savor the occasion.",
        service5Title: "Culinary Workshops",
        service5Desc: "Develop your culinary skills with our interactive workshops. From mastering techniques to exploring new recipes, our expert chefs guide you every step of the way. Whether you're a novice looking to acquire basic skills or an experienced cook wanting to learn advanced techniques, our workshops offer hands-on learning in a fun and engaging environment. Discover the joy of cooking and take home the knowledge to impress your loved ones.",
        service6Title: "Team Building Workshops",
        service6Desc: "Strengthen team spirit with our food-focused team-building activities. Learn cheese making, brewing, and charcuterie while bonding with your team. Our workshops are designed to foster collaboration, creativity, and communication, providing a unique and enjoyable way for teams to connect and grow together. Perfect for corporate retreats, team-building days, or any group looking to combine fun with learning.",
        aboutTitle: "About Évasion Gusto",
        aboutDesc1: "At Évasion Gusto, we are passionate about creating exceptional culinary experiences. Located in Mons, near NATO SHAPE, we pride ourselves on our ability to deliver customized catering solutions that exceed expectations. Our dedicated team combines creativity, expertise, and a love of food to offer you the best in catering services.",
        aboutDesc2: "Founded on the principles of quality and innovation, Évasion Gusto has been serving the Mons community and beyond for over a decade. Our commitment to excellence is reflected in every dish we prepare, every event we organize, and every workshop we conduct. We believe that food is not just about nourishment, but also about creating connections and memories. Whether you are hosting a lavish celebration, a corporate event, or a cozy dinner at home, we are here to make the occasion extraordinary.",
        aboutDesc3: "Our team is composed of talented chefs, skilled sommeliers, and experienced event planners who work tirelessly to ensure that every aspect of our service meets the highest standards. We source the freshest ingredients, use state-of-the-art equipment, and continually refine our techniques to stay at the forefront of the culinary industry. At Évasion Gusto, we don't just meet your needs; we elevate your dining experience.",
        galleryTitle: "Gallery",
        galleryDesc: "Explore our gallery to see the art and attention to detail that goes into every dish we prepare. From elegantly plated meals to sumptuous buffets, our food presentation reflects our commitment to quality and creativity. Whether it's a beautifully garnished appetizer, a decadent dessert, or a meticulously arranged charcuterie board, each image tells the story of our culinary excellence.",
        gallery1Title: "Delicious Amuse-Bouches",
        gallery2Title: "Gourmet Dishes",
        gallery3Title: "Fine Desserts",
        gallery4Title: "Elegant Presentations",
        gallery5Title: "Buffet Setup",
        gallery6Title: "Outdoor Events",
        gallery7Title: "Wine Tastings",
        gallery8Title: "Beer Pairings",
        gallery9Title: "Charcuterie Boards",
        gallery10Title: "Private Dinners",
        gallery11Title: "Cooking Workshops",
        gallery12Title: "Team Building",
        contactTitle: "Contact Évasion Gusto",
        contactDesc: "Ready to start planning your next event or have questions about our services? We would love to hear from you. Visit us, call us, or email us today to discuss your catering needs, request a quote, or schedule a consultation. Let Évasion Gusto bring the magic of fine dining to your table.",
        address: "Address: Rue Orger Meurice 12, 6500 Beaumont, Belgium",
        email: "Email: <a href=\"mailto:info@evasiongusto.be\">info@evasiongusto.be</a>",
        phone: "Phone: <a href=\"tel:+32491438890\">+32 (0) 491 43 88 90</a>"
    },
    fr: {
        home: "Accueil",
        thisWeek: "Cette Semaine",
        services: "Services",
        about: "À Propos",
        gallery: "Galerie",
        contact: "Contact",
        intro: "Évasion Gusto: Élevez Votre Voyage Culinaire",
        introDesc: "Des services de restauration haut de gamme adaptés à chacun de vos besoins, idéalement situés près de l'OTAN SHAPE à Mons.",
        followUs: "Suivez-nous sur Facebook",
        thisWeekTitle: "Menu de Cette Semaine",
        thisWeekDesc: "Cette semaine, Évasion Gusto présente une sélection exquise de plats élaborés avec les ingrédients saisonniers les plus frais. Nos chefs ont créé un menu qui non seulement ravira les papilles, mais met également en valeur le meilleur de ce que la saison a à offrir. Des amuse-bouches alléchants aux desserts décadents, chaque plat est une célébration de saveurs et de créativité. Plongez dans notre menu hebdomadaire et découvrez de nouveaux favoris qui raviront vos papilles et vous laisseront en redemander.",
        thisWeekLink: "Découvrez le Menu Complet de Cette Semaine",
        servicesTitle: "Nos Services Exquis",
        service1Title: "Dégustation de Vins et Bières",
        service1Desc: "Savourez des dégustations de vins et de bières soigneusement sélectionnés, parfaitement assortis à des plats gastronomiques pour ravir vos papilles. Nos sommeliers et experts en bière créent un voyage sensoriel qui combine saveurs et arômes, offrant une expérience éducative et profondément agréable. Que vous soyez un connaisseur ou un amateur occasionnel, nos dégustations sont conçues pour élargir vos horizons et enrichir votre appréciation des boissons fines.",
        service2Title: "Plats à Emporter et Livraison de Repas",
        service2Desc: "Profitez du luxe de repas gastronomiques à domicile. Notre service de plats à emporter et de livraison apporte des plats fraîchement préparés de qualité restaurant directement à votre porte. Chaque repas est élaboré avec les meilleurs ingrédients et soigneusement emballé pour garantir qu'il arrive en parfait état. Idéal pour les professionnels occupés, les dîners en famille ou les occasions spéciales, notre service offre commodité sans compromettre la qualité.",
        service3Title: "Organisation d'Événements",
        service3Desc: "Transformez n'importe quel lieu en un cadre parfait pour votre événement. Qu'il s'agisse d'une réunion intime ou d'une grande célébration, nous donnons vie à votre vision. Nos planificateurs d'événements travaillent en étroite collaboration avec vous pour concevoir et exécuter chaque détail, de la décoration et du divertissement aux menus sur mesure. Notre objectif est de créer des expériences inoubliables qui reflètent votre style et vos préférences, assurant un événement sans stress et sans accroc.",
        service4Title: "Services de Chef Privé",
        service4Desc: "Découvrez l'art de la haute cuisine chez vous. Nos chefs privés créent des menus personnalisés et préparent des repas exquis adaptés à vos goûts. Profitez d'une expérience culinaire de qualité restaurant sans quitter votre résidence, parfaite pour des dîners intimes, des célébrations spéciales ou tout simplement pour se faire plaisir avec un repas gastronomique. Nos chefs s'occupent de tout, de l'achat des ingrédients au nettoyage, vous permettant de vous détendre et de savourer l'occasion.",
        service5Title: "Ateliers Culinaires",
        service5Desc: "Développez vos compétences culinaires avec nos ateliers interactifs. De la maîtrise des techniques à l'exploration de nouvelles recettes, nos chefs experts vous guident à chaque étape. Que vous soyez un novice cherchant à acquérir des compétences de base ou un cuisinier chevronné désireux d'apprendre des techniques avancées, nos ateliers offrent un apprentissage pratique dans une ambiance ludique et interactive. Découvrez la joie de cuisiner et repartez avec les connaissances pour impressionner vos proches.",
        service6Title: "Ateliers de Renforcement d'Équipe",
        service6Desc: "Renforcez l'esprit d'équipe avec nos activités de renforcement d'équipe autour de la nourriture. Apprenez la fabrication du fromage, le brassage et la charcuterie tout en renforçant les liens de l'équipe. Nos ateliers sont conçus pour favoriser la collaboration, la créativité et la communication, offrant une manière unique et agréable pour les équipes de se connecter et de grandir ensemble. Parfait pour les retraites d'entreprise, les journées de team building ou tout groupe cherchant à allier plaisir et apprentissage.",
        aboutTitle: "À propos d'Évasion Gusto",
        aboutDesc1: "Chez Évasion Gusto, nous sommes passionnés par la création d'expériences culinaires exceptionnelles. Situés à Mons, près de l'OTAN SHAPE, nous sommes fiers de notre capacité à offrir des solutions de restauration personnalisées qui dépassent les attentes. Notre équipe dévouée combine créativité, expertise et amour de la nourriture pour vous offrir le meilleur des services de restauration.",
        aboutDesc2: "Fondée sur les principes de qualité et d'innovation, Évasion Gusto sert la communauté de Mons et au-delà depuis plus de dix ans. Notre engagement envers l'excellence se reflète dans chaque plat que nous préparons, chaque événement que nous organisons et chaque atelier que nous menons. Nous croyons que la nourriture ne se résume pas à la nutrition, mais qu'elle crée également des liens et des souvenirs. Que vous organisiez une célébration somptueuse, un événement d'entreprise ou un dîner chaleureux à domicile, nous sommes là pour rendre l'occasion extraordinaire.",
        aboutDesc3: "Notre équipe est composée de chefs talentueux, de sommeliers qualifiés et de planificateurs d'événements expérimentés qui travaillent sans relâche pour garantir que chaque aspect de notre service répond aux normes les plus élevées. Nous sélectionnons les ingrédients les plus frais, utilisons des équipements à la pointe de la technologie et perfectionnons continuellement nos techniques pour rester à l'avant-garde de l'industrie culinaire. Chez Évasion Gusto, nous ne nous contentons pas de répondre à vos besoins; nous élevons votre expérience gastronomique.",
        galleryTitle: "Galerie",
        galleryDesc: "Explorez notre galerie pour voir l'art et l'attention aux détails qui entrent dans chaque plat que nous préparons. Des repas élégamment dressés aux buffets somptueux, la présentation de nos plats reflète notre engagement envers la qualité et la créativité. Qu'il s'agisse d'un amuse-gueule joliment garni, d'un dessert décadent ou d'un plateau de charcuterie méticuleusement arrangé, chaque image raconte l'histoire de notre excellence culinaire.",
        gallery1Title: "Amuse-gueules Délicieux",
        gallery2Title: "Plats Gourmets",
        gallery3Title: "Desserts Fins",
        gallery4Title: "Présentations Élégantes",
        gallery5Title: "Mise en Place du Buffet",
        gallery6Title: "Événements en Plein Air",
        gallery7Title: "Dégustations de Vins",
        gallery8Title: "Accords Bières",
        gallery9Title: "Plateaux de Charcuterie",
        gallery10Title: "Dîners Privés",
        gallery11Title: "Ateliers de Cuisine",
        gallery12Title: "Renforcement d'Équipe",
        contactTitle: "Contactez Évasion Gusto",
        contactDesc: "Prêt à commencer à planifier votre prochain événement ou avez-vous des questions sur nos services? Nous serions ravis de vous entendre. Visitez-nous, appelez-nous, ou envoyez-nous un e-mail dès aujourd'hui pour discuter de vos besoins en matière de restauration, demander un devis, ou planifier une consultation. Laissez Évasion Gusto apporter la magie de la gastronomie à votre table.",
        address: "Adresse : Rue Orger Meurice 12, 6500 Beaumont, Belgique",
        email: "E-mail : <a href=\"mailto:info@evasiongusto.be\">info@evasiongusto.be</a>",
        phone: "Téléphone : <a href=\"tel:+32491438890\">+32 (0) 491 43 88 90</a>"
    }
};

    // Translate function
    function translatePage(language) {
        document.querySelectorAll('[data-key]').forEach((element) => {
            const key = element.getAttribute('data-key');
            if (translations[language][key]) {
                if (element.tagName === 'A' || element.tagName === 'BUTTON' || element.tagName === 'P' || element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') {
                    element.innerHTML = translations[language][key];
                } else {
                    element.textContent = translations[language][key];
                }
            }
        });
    }

    // Set initial language
    const userLanguage = localStorage.getItem('language') || 'fr';
    document.getElementById('language-select').value = userLanguage;
    translatePage(userLanguage);

    // Language selection event listener
    document.getElementById('language-select').addEventListener('change', function () {
        const selectedLanguage = this.value;
        localStorage.setItem('language', selectedLanguage);
        translatePage(selectedLanguage);
    });

    // GDPR Consent Management
    const gdprPopup = document.getElementById('gdpr-consent-popup');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');
    const consentStatus = localStorage.getItem('gdpr-consent');

    if (!consentStatus) {
        gdprPopup.style.display = 'flex';
    }

    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('gdpr-consent', 'accepted');
        gdprPopup.style.display = 'none';
    });

    declineCookies.addEventListener('click', () => {
        localStorage.setItem('gdpr-consent', 'declined');
        gdprPopup.style.display = 'none';
    });

// Gallery functionality
    let currentImageIndex = 0;
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const galleryTitles = Array.from(galleryItems).map(item => item.nextElementSibling);
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = galleryItems[index].src;
        lightboxTitle.textContent = translations[userLanguage][galleryTitles[index].getAttribute('data-key')] || galleryTitles[index].textContent;
        lightbox.style.display = 'flex';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    function changeImage(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryItems.length - 1;
        } else if (currentImageIndex >= galleryItems.length) {
            currentImageIndex = 0;
        }
        lightboxImg.src = galleryItems[currentImageIndex].src;
        lightboxTitle.textContent = translations[userLanguage][galleryTitles[currentImageIndex].getAttribute('data-key')] || galleryTitles[currentImageIndex].textContent;
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        }
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    lightboxImg.addEventListener('touchstart', handleTouchStart, false);
    lightboxImg.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;

    function handleTouchStart(evt) {
        const firstTouch = evt.touches[0];
        xDown = firstTouch.clientX;
    }

    function handleTouchMove(evt) {
        if (!xDown) {
            return;
        }

        const xUp = evt.touches[0].clientX;
        const xDiff = xDown - xUp;

        if (xDiff > 0) {
            changeImage(1);
        } else {
            changeImage(-1);
        }

        xDown = null;
    }

    // Header shrink effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - header.offsetHeight,
                behavior: 'smooth'
            });
        });
    });

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });

    // Close hamburger menu after selection on mobile
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('show');
            }
        });
    });

    // Fade-in animation for sections
    const sections = document.querySelectorAll('.fade-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
