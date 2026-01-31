// ========================================
// NAVIGATION SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// ACTIVE LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// MENU MOBILE (HAMBURGER)
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    // Toggle menu
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fermer menu au clic sur lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Fermer menu si clic extérieur
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ========================================
// FORMULAIRE CONTACT → EMAIL
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Récupération des données
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone') || 'Non renseigné';
        const level = formData.get('level');
        const message = formData.get('message');

        // Validation
        if (!name || !email || !level || !message) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        // Construction de l'email
        const subject = `Demande de cours - ${level}`;
        const body = `Bonjour,

Nouvelle demande de cours particuliers :

Nom : ${name}
Email : ${email}
Téléphone : ${phone}
Niveau : ${level}

Message :
${message}

Cordialement,
${name}`;

        // Encodage pour mailto
        const mailtoLink = `mailto:studyzonejr@outlook.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Ouverture client email
        window.location.href = mailtoLink;

        // Message confirmation
        alert('Votre client email va s'ouvrir. Envoyez le message en cliquant sur "Envoyer".');

        // Reset formulaire
        this.reset();
    });
}

// ========================================
// ANIMATIONS ON SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes
document.querySelectorAll('.service-card, .pricing-card, .availability-card, .highlight-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// COUNTER ANIMATION (Stats)
// ========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const target = parseInt(entry.target.textContent);
            if (!isNaN(target)) {
                animateCounter(entry.target, target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    }
});

console.log('✅ StudyZone script chargé avec succès');
console.log('📧 Formulaire configuré pour: studyzonejr@outlook.fr');
