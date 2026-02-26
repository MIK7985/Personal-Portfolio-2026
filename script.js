document.addEventListener('DOMContentLoaded', () => {

    /* ═══════════════════════════════════════
       HERO CANVAS — floating particles
    ═══════════════════════════════════════ */
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, particles = [];

        const COLORS = ['rgba(157,78,221,', 'rgba(0,245,212,', 'rgba(241,91,181,'];

        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }

        function Particle() {
            this.reset = function() {
                this.x  = Math.random() * W;
                this.y  = Math.random() * H;
                this.r  = Math.random() * 1.6 + 0.3;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.alpha = Math.random() * 0.45 + 0.1;
                this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            };
            this.reset();
        }

        // spawn particles
        for (let i = 0; i < 90; i++) particles.push(new Particle());

        function draw() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) p.reset();

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color + p.alpha + ')';
                ctx.fill();
            });

            // draw faint connecting lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(157,78,221,' + (0.06 * (1 - dist / 110)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        resize();
        draw();
    }

    /* ═══════════════════════════════════════
       SCROLL PROGRESS
    ═══════════════════════════════════════ */
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
            progressBar.style.width = pct + '%';
        }, { passive: true });
    }

    /* ═══════════════════════════════════════
       THEME TOGGLE
    ═══════════════════════════════════════ */
    const themeBtn  = document.getElementById('theme-toggle');
    const sunIcon   = document.querySelector('.sun-icon');
    const moonIcon  = document.querySelector('.moon-icon');

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        sunIcon.style.display  = 'block';
        moonIcon.style.display = 'none';
    }

    themeBtn?.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        sunIcon.style.display  = isLight ? 'block' : 'none';
        moonIcon.style.display = isLight ? 'none'  : 'block';
    });

    /* ═══════════════════════════════════════
       NAVBAR SCROLL
    ═══════════════════════════════════════ */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    /* ═══════════════════════════════════════
       MOBILE MENU
    ═══════════════════════════════════════ */
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');
    const navItems  = document.querySelectorAll('.nav-item');

    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    navItems.forEach(item => item.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        hamburger.classList.remove('toggle');
    }));

    /* ═══════════════════════════════════════
       INTERSECTION OBSERVER
    ═══════════════════════════════════════ */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up, .skill-category, .section-title').forEach(el => observer.observe(el));

    /* ═══════════════════════════════════════
       ACTIVE NAV LINK
    ═══════════════════════════════════════ */
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 220) current = s.id; });
        navItems.forEach(item => item.classList.toggle('active', item.getAttribute('href') === `#${current}`));
    }, { passive: true });

    /* ═══════════════════════════════════════
       HERO ENTRANCE
    ═══════════════════════════════════════ */
    const heroEls = [
        document.querySelector('.greeting'),
        document.querySelector('.hero h1'),
        document.querySelector('.role-text'),
        document.querySelector('.hero-cta'),
        document.querySelector('.hero-chips'),
        document.querySelector('.hero-visual'),
    ];
    heroEls.forEach((el, i) => {
        if (!el) return;
        setTimeout(() => {
            el.style.opacity   = '1';
            el.style.transform = 'translateY(0)';
        }, 150 + i * 110);
    });

    /* ═══════════════════════════════════════
       TYPEWRITER — HERO DESC
    ═══════════════════════════════════════ */
    const heroDesc = document.querySelector('.hero-desc');
    if (heroDesc) {
        const txt = heroDesc.textContent.trim();
        heroDesc.textContent = '';
        let i = 0;
        const type = () => {
            if (i < txt.length) { heroDesc.textContent += txt[i++]; setTimeout(type, 28); }
        };
        setTimeout(type, 900);
    }

    /* ═══════════════════════════════════════
       SMOOTH CURSOR GLOW (lerp)
    ═══════════════════════════════════════ */
    if (window.innerWidth > 992) {
        const glow = document.createElement('div');
        Object.assign(glow.style, {
            position:'fixed', width:'360px', height:'360px', borderRadius:'50%',
            background:'radial-gradient(circle, rgba(157,78,221,0.11) 0%, rgba(0,245,212,0.04) 40%, transparent 70%)',
            pointerEvents:'none', transform:'translate(-50%,-50%)',
            zIndex:'1', willChange:'left,top',
        });
        document.body.appendChild(glow);

        let mx = 0, my = 0, gx = 0, gy = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        (function tick() {
            gx += (mx - gx) * 0.065;
            gy += (my - gy) * 0.065;
            glow.style.left = gx + 'px';
            glow.style.top  = gy + 'px';
            requestAnimationFrame(tick);
        })();
    }

    /* ═══════════════════════════════════════
       BACK TO TOP
    ═══════════════════════════════════════ */
    const backBtn = document.getElementById('back-to-top');
    if (backBtn) {
        window.addEventListener('scroll', () => backBtn.classList.toggle('show', window.scrollY > 300), { passive: true });
        backBtn.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }); });
    }

    /* ═══════════════════════════════════════
       CONTACT FORM FEEDBACK
    ═══════════════════════════════════════ */
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('button[type="submit"]');
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.75';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                btn.style.background = 'linear-gradient(135deg, #00f5d4, #00838f)';
                btn.style.opacity = '1';
                setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 3000);
            }, 1000);
        });
    }

    /* ═══════════════════════════════════════
       MAGNETIC BTN-ICON
    ═══════════════════════════════════════ */
    document.querySelectorAll('.btn-icon').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width  / 2) * 0.28;
            const y = (e.clientY - r.top  - r.height / 2) * 0.28;
            btn.style.transform = `translate(${x}px,${y}px) translateY(-4px) rotate(8deg)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    /* ═══════════════════════════════════════
       PROJECT CARD — tilt on mouse
    ═══════════════════════════════════════ */
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - 0.5;
            const y = (e.clientY - r.top)  / r.height - 0.5;
            card.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

});