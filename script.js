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
        ctaViewMenu: "Discover This Week's Menu",
        ctaContact: "Request a Quote",
        followUsFooter: "Follow us on Facebook",
        intro: "Évasion Gusto: Elevate Your Culinary Journey",
        introDesc: "Based in Beaumont, we proudly serve Beaumont, Sivry, Rance, Chimay, Mons, the SHAPE NATO area, and other surrounding regions. Premium Catering Services Tailored to Your Needs. We offer a variety of services, including private chef experiences, takeout food, full-service catering, cooking classes, and beer and wine tastings. Our dedication to partnering with local producers ensures the freshest ingredients and top-quality service—all at an affordable price.",
        followUs: "Follow us on Facebook",
        thisWeekTitle: "This Week's Menu",
        thisWeekDesc: "This week, Évasion Gusto presents an exquisite selection of dishes crafted with the freshest seasonal ingredients sourced from local producers and other high-quality partners. Explore our weekly menu and discover new favorites that will delight your taste buds. We welcome your feedback and invite you to suggest specific dishes you'd like to see us prepare for you, your family, and your guests.",
        thisWeekLink: "Discover the Full Menu of This Week",
        viewMenuButton: "📄 View This Week's Menu",
        servicesTitle: "Our Exquisite Services",
        service1Title: "Wine and Beer Tasting",
        service1Desc: "Savor carefully selected wine and beer tastings. We also offer the option to organize private events featuring beer or wine tastings paired with thoughtfully chosen food. Our wine and beer expert curates a sensory journey that blends flavors and aromas, providing an educational and deeply enjoyable experience. During these tastings, we emphasize understanding the products you will be enjoying, offering a mini presentation to explore their origins and craftsmanship. We can tailor your experience to focus on specific grape varieties, wine-producing regions, or countries. Whether you are a connoisseur or a casual enthusiast, our tastings are designed to broaden your horizons and deepen your appreciation of fine beverages.",
        service2Title: "Take Away Food and Food Delivery",
        service2Desc: "Enjoy the luxury of gourmet meals at home. Our take-away and food delivery service brings freshly prepared, restaurant-quality dishes directly to your door. Each meal is crafted with the finest ingredients and carefully packaged to ensure it arrives in perfect condition. Ideal for busy professionals, family dinners, or special occasions, our service offers convenience without compromising quality.",
        service3Title: "Event Organization",
        service3Desc: "Transform any venue into the perfect setting for your event. Whether it's an intimate gathering or a grand celebration, we bring your vision to life. We collaborate closely with you to design and execute every detail of a custom-tailored menu, ensuring all food allergies and intolerances are carefully considered and clearly indicated. Our goal is to create unforgettable experiences that reflect your style and preferences, delivering a stress-free and seamless event.",
        service4Title: "Private Chef Services",
        service4Desc: "Experience the art of fine dining in the comfort of your home with your partner, family, or friends. We offer customized menus and prepare exquisite meals tailored to your tastes. Enjoy a restaurant-quality culinary experience without leaving your home—perfect for intimate dinners, special celebrations, or simply indulging in gourmet cuisine. We handle everything from ingredient sourcing to cleanup, allowing you to relax and savor the occasion.",
        service5Title: "Culinary Workshops",
        service5Desc: "Develop your culinary skills with our interactive workshops. From mastering techniques to exploring new recipes, we guide you every step of the way. Whether you're a novice eager to acquire basic skills or an experienced cook aiming to learn advanced techniques, our workshops offer hands-on learning in a fun and engaging environment. Discover the joy of cooking and take home the knowledge to impress your loved ones.",
        service6Title: "Team Building Workshops",
        service6Desc: "Strengthen team spirit with our food-focused team-building activities. Engage in cooking, cheese making, brewing, and charcuterie while bonding with your team. Our workshops are designed to foster collaboration, creativity, and communication, offering a unique and enjoyable way for teams to connect and grow together. Perfect for team-building days, or any group looking to combine fun with learning.",
        aboutTitle: "About Évasion Gusto",
        aboutDesc1: "At Évasion Gusto, we are passionate about creating exceptional culinary experiences. Based in Beaumont, we proudly serve Beaumont, Sivry, Rance, Chimay, Mons, the SHAPE NATO area, and surrounding regions. We take pride in delivering customized catering solutions that exceed expectations. Our dedicated team combines creativity, expertise, and a love of food to offer you the best in catering services.",
        aboutDesc2: "Our cooking is primarily influenced by Greek, Belgian, French, Japanese, and North American cuisines. We offer tailored solutions that range from simple grilled meat preparations to complex dishes plated to perfection and paired with the appropriate wine, beer, or other beverages. Évasion Gusto was founded to share the joy of exploring diverse culinary techniques and to provide professional-quality knowledge at an affordable price.",
        aboutDesc3: "At Évasion Gusto, we don't just meet your needs; we elevate your dining experience.",
        galleryTitle: "Gallery",
        galleryDesc: "Explore our gallery to see the art and attention to detail that goes into every dish we prepare. From elegantly plated meals to sumptuous buffets, our food presentation reflects our commitment to quality and creativity. Whether it's a beautifully garnished appetizer, a decadent dessert, or a meticulously arranged charcuterie board, each image tells the story of our culinary excellence.",
        gallery1Title: "Padrón pepper",
        gallery2Title: "Mousaka",
        gallery3Title: "Padrón pepper",
        gallery4Title: "Quiche lorraine camembert-ham",
        gallery5Title: "Grilled gambas",
        gallery6Title: "Pan fried gambas",
        gallery7Title: "Roasted Duck with potatoes",
        gallery8Title: "Beer Pairings",
        gallery9Title: "Charcuterie Boards",
        gallery10Title: "Edible decorations",
        gallery11Title: "Cooking Workshops",
        gallery12Title: "Team Building",
        contactTitle: "Contact Évasion Gusto",
        contactDesc: "Ready to start planning your next event or have questions about our services? We would love to hear from you. Call us, or email us today to discuss your catering needs, request a quote, or schedule a consultation. Let Évasion Gusto bring the magic of fine dining to your table.",
        addressLabel: "Address",
        addressValue: "Rue Orger Meurice 12, 6500 Beaumont, Belgium",
        emailLabel: "Email",
        phoneLabel: "Phone",
        whatsappLabel: "WhatsApp",
        swipeInstruction: "← Swipe to navigate →"
    },
    fr: {
        home: "Accueil",
        thisWeek: "Cette Semaine",
        services: "Services",
        about: "À Propos",
        gallery: "Galerie",
        contact: "Contact",
        ctaViewMenu: "Découvrez le Menu de Cette Semaine",
        ctaContact: "Demander un Devis",
        followUsFooter: "Suivez-nous sur Facebook",
        intro: "Évasion Gusto: Élevez Votre Voyage Culinaire",
        introDesc: "Basés à Beaumont, nous servons fièrement Beaumont, Sivry, Rance, Chimay, Mons, la région de l'OTAN SHAPE, ainsi que d'autres régions environnantes. Services de restauration de haut de gamme adaptés à vos besoins. Nous proposons une variété de services, y compris des expériences avec un chef privé, des plats à emporter, un service de restauration complet, des cours de cuisine, ainsi que des dégustations de bières et de vins. Notre engagement à collaborer avec des producteurs locaux garantit des ingrédients frais et un service de haute qualité, le tout à un prix abordable.",
        followUs: "Suivez-nous sur Facebook",
        thisWeekTitle: "Menu de Cette Semaine",
        thisWeekDesc: "Cette semaine, Évasion Gusto vous propose une sélection exquise de plats élaborés avec les ingrédients saisonniers les plus frais, provenant de producteurs locaux et d'autres partenaires de haute qualité. Découvrez notre menu hebdomadaire et laissez-vous séduire par de nouveaux favoris qui raviront vos papilles. Nous apprécions vos retours et nous vous invitons à suggérer des plats spécifiques que vous souhaiteriez que nous préparions pour vous, votre famille et vos invités.",
        thisWeekLink: "Découvrez le Menu Complet de Cette Semaine",
        viewMenuButton: "📄 Voir le Menu de Cette Semaine",
        servicesTitle: "Nos Services Exquis",
        service1Title: "Dégustation de Vins et Bières",
        service1Desc: "Savourez des dégustations de vins et de bières soigneusement sélectionnés. Nous offrons également la possibilité d'organiser des événements privés avec des dégustations de bières ou de vins accompagnées de mets judicieusement choisis. Notre expert en vins et bières crée un voyage sensoriel qui associe saveurs et arômes, offrant une expérience à la fois éducative et profondément agréable. Lors de ces dégustations, nous mettons l'accent sur la compréhension des produits que vous allez déguster, en vous proposant une mini présentation pour explorer leurs origines et leur savoir-faire. Nous pouvons personnaliser votre expérience en fonction de cépages spécifiques, de régions viticoles ou de pays. Que vous soyez un connaisseur ou un amateur occasionnel, nos dégustations sont conçues pour élargir vos horizons et approfondir votre appréciation des boissons de qualité.",
        service2Title: "Plats à Emporter et Livraison de Repas",
        service2Desc: "Profitez du luxe de repas gastronomiques à domicile. Notre service de plats à emporter et de livraison apporte des plats fraîchement préparés de qualité restaurant directement à votre porte. Chaque repas est élaboré avec les meilleurs ingrédients et soigneusement emballé pour garantir qu'il arrive en parfait état. Idéal pour les professionnels occupés, les dîners en famille ou les occasions spéciales, notre service offre commodité sans compromettre la qualité.",
        service3Title: "Organisation d'Événements",
        service3Desc: "Transformez n'importe quel lieu en cadre parfait pour votre événement. Qu'il s'agisse d'une réunion intime ou d'une grande célébration, nous donnons vie à votre vision. Nous travaillons en étroite collaboration avec vous pour concevoir et exécuter chaque détail d'un menu sur mesure, en tenant compte de toutes les allergies et intolérances alimentaires, et en les indiquant clairement. Notre objectif est de créer des expériences inoubliables qui reflètent votre style et vos préférences, garantissant un événement sans stress et parfaitement orchestré.",
        service4Title: "Services de Chef Privé",
        service4Desc: "Découvrez l'art de la haute cuisine dans le confort de votre domicile, avec votre partenaire, votre famille ou vos amis. Nous proposons des menus personnalisés et préparons des repas exquis adaptés à vos goûts. Profitez d'une expérience culinaire digne d'un restaurant sans quitter votre maison—idéal pour des dîners intimes, des célébrations spéciales, ou simplement pour savourer une cuisine gastronomique. Nous nous occupons de tout, de l'approvisionnement des ingrédients, du nettoyage de la cuisine, vous permettant de vous détendre et de profiter pleinement de l'occasion.",
        service5Title: "Ateliers Culinaires",
        service5Desc: "Développez vos compétences culinaires avec nos ateliers interactifs. De la maîtrise des techniques à l'exploration de nouvelles recettes, nous vous accompagnons à chaque étape. Que vous soyez un débutant désireux d'acquérir des compétences de base ou un cuisinier expérimenté cherchant à apprendre des techniques avancées, nos ateliers offrent un apprentissage pratique dans une ambiance ludique et engageante. Découvrez le plaisir de cuisiner et repartez avec le savoir-faire pour impressionner vos proches.",
        service6Title: "Ateliers de Renforcement d'Équipe",
        service6Desc: "Renforcez l'esprit d'équipe avec nos activités de team-building axées sur la cuisine. Participez à des ateliers de cuisine, de fabrication de fromage, de brassage, et de charcuterie tout en renforçant les liens avec votre équipe. Nos ateliers sont conçus pour favoriser la collaboration, la créativité et la communication, offrant une manière unique et agréable pour les équipes de se connecter et de grandir ensemble. Idéal pour les journées de team-building ou tout groupe souhaitant allier plaisir et apprentissage.",
        aboutTitle: "À propos d'Évasion Gusto",
        aboutDesc1: "Chez Évasion Gusto, nous sommes passionnés par la création d'expériences culinaires exceptionnelles. Basés à Beaumont, nous servons fièrement Beaumont, Sivry, Rance, Chimay, Mons, la région de l'OTAN SHAPE et les régions environnantes. Nous mettons un point d'honneur à offrir des solutions de restauration personnalisées qui surpassent les attentes. Notre équipe dévouée allie créativité, expertise et amour de la cuisine pour vous offrir le meilleur des services traiteur.",
        aboutDesc2: "Notre cuisine est principalement influencée par les traditions culinaires grecques, belges, françaises, japonaises et nord-américaines. Nous proposons des solutions sur mesure, allant des préparations simples de viandes grillées aux plats complexes dressés avec perfection et accompagnés de vin, de bière ou d'autres boissons appropriées. Évasion Gusto a été fondée pour partager la joie de l'exploration des techniques culinaires variées et pour offrir des connaissances de qualité professionnelle à un prix abordable.",
        aboutDesc3: "Chez Évasion Gusto, nous ne nous contentons pas de répondre à vos besoins; nous élevons votre expérience gastronomique.",
        galleryTitle: "Galerie",
        galleryDesc: "Notre cuisine est principalement influencée par les traditions grecque, belge, française, japonaise et nord-américaine. Nous proposons des solutions sur mesure, allant de la simple préparation de viandes grillées à des plats complexes dressés à la perfection et accompagnés du vin, de la bière ou d'autres boissons appropriés. Évasion Gusto a été fondé pour partager le plaisir de découvrir différentes préparations culinaires et offrir un savoir-faire de qualité professionnelle à un prix abordable.",
        gallery1Title: "Poivron Padrón",
        gallery2Title: "Mousaka",
        gallery3Title: "Poivron Padrón",
        gallery4Title: "Quiche lorraine camembert-jambon",
        gallery5Title: "Gambas grillées",
        gallery6Title: "Gambas poêlées",
        gallery7Title: "Canard rôti au four",
        gallery8Title: "Accords Bières",
        gallery9Title: "Plateaux de Charcuterie",
        gallery10Title: "Décorations comestibles",
        gallery11Title: "Ateliers de Cuisine",
        gallery12Title: "Renforcement d'Équipe",
        contactTitle: "Contactez Évasion Gusto",
        contactDesc: "Prêt à commencer à planifier votre prochain événement ou avez-vous des questions sur nos services? Nous serons ravis de vous écouter. Appelez-nous, ou envoyez-nous un e-mail dès aujourd'hui pour discuter de vos besoins en matière de restauration, demander un devis, ou planifier une consultation. Laissez Évasion Gusto apporter la magie de la gastronomie à votre table.",
        addressLabel: "Adresse",
        addressValue: "Rue Orger Meurice 12, 6500 Beaumont, Belgique",
        emailLabel: "E-mail",
        phoneLabel: "Téléphone",
        whatsappLabel: "WhatsApp",
        swipeInstruction: "← Glissez pour naviguer →"
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
    translatePage(userLanguage);

    // Update language button display
    function updateLanguageButton(lang) {
        const langButton = document.getElementById('lang-button');
        const flagSpan = langButton.querySelector('.lang-flag');
        const textSpan = langButton.querySelector('.lang-text');

        if (lang === 'fr') {
            flagSpan.textContent = '🇫🇷';
            textSpan.textContent = 'FR';
        } else {
            flagSpan.textContent = '🇬🇧';
            textSpan.textContent = 'EN';
        }
    }

    updateLanguageButton(userLanguage);

    // Language switcher dropdown toggle
    const langButton = document.getElementById('lang-button');
    const langDropdown = document.getElementById('lang-dropdown');

    langButton.addEventListener('click', function(e) {
        e.stopPropagation();
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        langDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.language-switcher')) {
            langButton.setAttribute('aria-expanded', 'false');
            langDropdown.classList.remove('active');
        }
    });

    // Language selection event listener
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLanguage = this.getAttribute('data-lang');
            localStorage.setItem('language', selectedLanguage);
            translatePage(selectedLanguage);
            updateLanguageButton(selectedLanguage);

            // Close dropdown
            langButton.setAttribute('aria-expanded', 'false');
            langDropdown.classList.remove('active');

            // Announce language change to screen readers
            const announcement = document.getElementById('language-announcement');
            if (announcement) {
                announcement.textContent = `Language changed to ${selectedLanguage === 'en' ? 'English' : 'French'}`;
                setTimeout(() => {
                    announcement.textContent = '';
                }, 1000);
            }

            // Update HTML lang attribute
            document.documentElement.lang = selectedLanguage;
        });
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
    const galleryItems = document.querySelectorAll('.gallery-item picture img, .gallery-item img');
    const galleryTitles = Array.from(galleryItems).map(item => {
        // Get the parent picture element if it exists, then get the next sibling
        const parent = item.parentElement.tagName === 'PICTURE' ? item.parentElement : item;
        return parent.nextElementSibling;
    });
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');

    let previouslyFocusedElement;

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = galleryItems[index].src;
        lightboxImg.alt = galleryItems[index].alt || 'Gallery image';
        lightboxTitle.textContent = translations[userLanguage][galleryTitles[index].getAttribute('data-key')] || galleryTitles[index].textContent;
        lightbox.style.display = 'flex';

        // Store previously focused element for accessibility
        previouslyFocusedElement = document.activeElement;

        // Focus the lightbox for keyboard navigation
        setTimeout(() => {
            const closeButton = lightbox.querySelector('.close');
            if (closeButton) closeButton.focus();
        }, 100);
    }

    function closeLightbox() {
        lightbox.style.display = 'none';

        // Return focus to previously focused element
        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }

    function changeImage(direction) {
        // Fade out current image
        lightboxImg.style.opacity = '0';
        lightboxTitle.style.opacity = '0';

        setTimeout(() => {
            currentImageIndex += direction;
            if (currentImageIndex < 0) {
                currentImageIndex = galleryItems.length - 1;
            } else if (currentImageIndex >= galleryItems.length) {
                currentImageIndex = 0;
            }

            lightboxImg.src = galleryItems[currentImageIndex].src;
            lightboxTitle.textContent = translations[userLanguage][galleryTitles[currentImageIndex].getAttribute('data-key')] || galleryTitles[currentImageIndex].textContent;

            // Fade in new image
            setTimeout(() => {
                lightboxImg.style.opacity = '1';
                lightboxTitle.style.opacity = '1';
            }, 50);
        }, 200);
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

        // Prevent default to stop background from moving
        evt.preventDefault();

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
        const isExpanded = navLinks.classList.toggle('show');
        // Update ARIA attribute for accessibility
        hamburger.setAttribute('aria-expanded', isExpanded);
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

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        // Show/hide button based on scroll position and footer proximity
        window.addEventListener('scroll', () => {
            const footer = document.querySelector('.footer');
            const scrollPosition = window.scrollY + window.innerHeight;
            const footerTop = footer.offsetTop;
            const distanceFromFooter = footerTop - scrollPosition;

            // Show button if scrolled down more than 500px and not near footer
            if (window.scrollY > 500 && distanceFromFooter > 100) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active Menu Highlighting based on scroll position
    const navLinksElements = document.querySelectorAll('.nav-links a[href^="#"]');
    const sectionElements = document.querySelectorAll('section[id]');

    function highlightActiveSection() {
        const scrollY = window.scrollY;
        const headerOffset = header.offsetHeight;

        sectionElements.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                // Remove active class from all links
                navLinksElements.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Update active section on scroll
    window.addEventListener('scroll', highlightActiveSection);

    // Initial highlight on page load
    highlightActiveSection();

    // Lazy Loading for All Images (Gallery and Services)
    const lazyLoadImages = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const picture = img.closest('picture');

                    if (picture) {
                        const source = picture.querySelector('source[data-srcset]');

                        // Load WebP source
                        if (source && source.dataset.srcset) {
                            source.srcset = source.dataset.srcset;
                            source.removeAttribute('data-srcset');
                        }
                    }

                    // Load JPG/image fallback
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }

                    // Add loaded class for fade-in effect
                    img.classList.add('lazy-loaded');

                    // Stop observing this image
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px' // Start loading 100px before entering viewport
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    };

    // Initialize lazy loading
    lazyLoadImages();

    // Make lightbox functions globally available
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
    window.changeImage = changeImage;
});
