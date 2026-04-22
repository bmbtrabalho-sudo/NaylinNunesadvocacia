// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // 🔗 Smooth Scrolling para todos os links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 🌅 Efeito de Header ao fazer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrolled = window.scrollY > 100;
        
        if (scrolled) {
            header.style.background = 'rgba(30, 58, 138, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // ✨ Animações de entrada ao fazer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
        });
    }, observerOptions);

    // Observa seções principais
    const animateElements = document.querySelectorAll('.hero h1, .rating, .hero p, .hero-buttons, .about-content, .service-card, .review-card, .contact');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // 🎯 Efeito hover especial na foto da Dra. Naylin
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        aboutImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        aboutImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // 📱 Menu mobile (futuro - caso queira hamburger menu)
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 768 && navLinks) {
        // Código para menu mobile pode ser adicionado aqui
    }

    // 💫 Efeito de partículas no hero (opcional - performance otimizada)
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255,255,255,0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            left: ${Math.random() * 100}vw;
            animation: float 6s infinite linear;
        `;
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 6000);
    }

    // Animação de partículas sutis no hero
    if (window.innerWidth > 768) {
        setInterval(createParticle, 800);
    }

    // 🎵 Som suave de hover nos cards (opcional - desabilitado por padrão)
    const cards = document.querySelectorAll('.service-card, .review-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 📊 Contador de avaliações animado
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(start);
        }, 16);
    }

    // Ativa contador quando a seção de rating entrar na tela
    const ratingSpan = document.querySelector('.rating span');
    if (ratingSpan) {
        const ratingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(ratingSpan, 414);
                    ratingObserver.unobserve(entry.target);
                }
            });
        });
        ratingObserver.observe(ratingSpan);
    }

    // 🌐 WhatsApp click tracking (Analytics)
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Aqui você pode adicionar Google Analytics ou pixel do Facebook
            console.log('WhatsApp clicado! 📱');
            // gtag('event', 'whatsapp_click', { 'event_category': 'contact' });
        });
    });

    // 📱 Ajuste para dispositivos móveis
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('.nav-links').style.display = 'none';
        }
    });

    // 🚀 Performance: Preload de imagens críticas
    const img = new Image();
    img.src = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGxpQPazwFm3qHTCb64nPuBaV7Qac6UyUM8O5XEqcl9nyforlkWiCazVo4dK6aRQSWwXIAaU7nx_RHbW649FuU7jS3EtY5lEJQPSGOHEy-xVohEAz487I2ZhodpogAud40ngpF14okuc6A=w408-h544-k-no';

    console.log('🌟 Naylin Nunes Advocacia - Site carregado com sucesso!');
});