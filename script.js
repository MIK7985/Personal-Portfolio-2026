document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       THEME TOGGLE
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const body = document.body;

    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');

            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                localStorage.setItem('theme', 'dark');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        });
    }

    /* =========================================
       NAVIGATION STYLES ON SCROLL
       ========================================= */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    /* =========================================
       INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');

                // Animate skill progress bars
                if (entry.target.classList.contains('skill-progress')) {
                    entry.target.style.width = entry.target.getAttribute('data-width');
                }

                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .skill-progress');
    animatedElements.forEach(el => observer.observe(el));

    /* =========================================
       ACTIVE NAV LINK ON SCROLL
       ========================================= */
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    /* =========================================
       CURSOR GLOW EFFECT (OPTIONAL ENHANCEMENT)
       ========================================= */
    // Adds a subtle glow that follows the mouse on large screens
    if (window.innerWidth > 992) {
        const glow = document.createElement('div');
        glow.style.position = 'fixed';
        glow.style.width = '300px';
        glow.style.height = '300px';
        glow.style.background = 'radial-gradient(circle, rgba(138,43,226,0.15) 0%, rgba(0,0,0,0) 70%)';
        glow.style.borderRadius = '50%';
        glow.style.pointerEvents = 'none';
        glow.style.transform = 'translate(-50%, -50%)';
        glow.style.zIndex = '1';
        glow.style.transition = 'transform 0.1s ease-out';

        document.body.appendChild(glow);

        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }

    /* =========================================
       BACK TO TOP BUTTON
       ========================================= */
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* =========================================
       CONTACT FORM SUBMIT
       ========================================= */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Opening Mail Client...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.textContent = 'Done!';
                btn.style.background = 'linear-gradient(135deg, #00ffff, #00838f)';
                btn.style.color = 'white';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1000);
        });
    }

    /* =========================================
       3D TILT EFFECT (Vanilla Tilt)
       ========================================= */
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".glass-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
            scale: 1.02
        });
    }

    /* =========================================
       TYPEWRITER EFFECT FOR HERO DESCRIPTION
       ========================================= */
    const heroDesc = document.querySelector('.hero-desc');
    if (heroDesc) {
        const originalText = heroDesc.textContent;
        heroDesc.textContent = '';
        let i = 0;

        const typeWriter = () => {
            if (i < originalText.length) {
                heroDesc.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 40); // typing speed
            }
        };

        // Start after a short delay
        setTimeout(typeWriter, 500);
    }
});
