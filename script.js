// script.js - Funcionalidades completas para o site da Naylin Nunes Advocacia

// 1. MENU MOBILE RESPONSIVO
document.addEventListener('DOMContentLoaded', function() {
    // Criar botão hamburger para mobile
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Inserir botão hamburger após o logo
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    nav.appendChild(hamburger);

    // Toggle menu mobile
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-menu');
        hamburger.classList.toggle('active');
    });

    // Fechar menu ao clicar em link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-menu');
            hamburger.classList.remove('active');
        });
    });
});

// 2. SMOOTH SCROLL PARA LINKS DE NAVEGAÇÃO
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

// 3. HEADER SCROLL EFFECT
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrolled = window.scrollY > 100;
    
    if (scrolled) {
        header.style.background = 'rgba(248, 245, 242, 0.95)';
        header.style.backdropFilter = 'blur(25px)';
        header.style.boxShadow = '0 8px 40px rgba(0,0,0,0.12)';
    } else {
        header.style.background = 'linear-gradient(135deg, #f8f5f2 0%, #e8e2d9 100%)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
    }
});

// 4. ANIMAÇÕES SCROLL (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.service-card, .review-card, .about-container, .contact-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);
});

// 5. COUNTER ANIMAÇÃO PARA AVALIAÇÕES
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Animação do contador quando a seção hero entrar na tela
const ratingObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const ratingSpan = document.querySelector('.rating span');
            animateCounter(ratingSpan, 414);
            ratingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

ratingObserver.observe(document.querySelector('.hero'));

// 6. EFEITO PARALLAX NA SEÇÃO HERO
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${speed}px)`;
    }
});

// 7. EFEITO MOUSE FOLLOW nas estrelas da avaliação
const starsContainer = document.querySelector('.stars');
if (starsContainer) {
    starsContainer.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        
        this.style.background = `radial-gradient(circle at ${x}px 50%, #fbbf24 0%, #f59e0b 30%, transparent 50%)`;
    });
    
    starsContainer.addEventListener('mouseleave', function() {
        this.style.background = '';
    });
}

// 8. WHATSAPP FLOAT ANIMAÇÃO PULSE
function pulseEffect() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.animate([
            { transform: 'scale(1)', boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)' },
            { transform: 'scale(1.05)', boxShadow: '0 12px 40px rgba(37, 211, 102, 0.6)' },
            { transform: 'scale(1)', boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)' }
        ], {
            duration: 2000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }
}

// 9. COPY ENDEREÇO AO CLICAR
document.querySelectorAll('.contact-item strong').forEach(item => {
    item.addEventListener('click', function() {
        const text = this.textContent;
        navigator.clipboard.writeText(text).then(() => {
            showToast('Endereço copiado!');
        });
    });
});

// 10. TOAST NOTIFICAÇÕES
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #d4a574, #e8c89f);
        color: #2d1b14;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(212, 165, 116, 0.4);
        transform: translateX(400px);
        transition: all 0.3s;
    `;
    
    document.body.appendChild(toast);
    
    // Animação de entrada
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });
    
    // Remove após 3 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 11. ATIVAÇÃO DAS FUNCIONALIDADES
document.addEventListener('DOMContentLoaded', function() {
    pulseEffect();
    
    // Preloader (se quiser adicionar)
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    }
});

// 12. ACTIVE LINK NA NAVEGAÇÃO
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// 13. BACK TO TOP BUTTON
function createBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.className = 'back-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #d4a574, #e8c89f);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(212, 165, 116, 0.4);
    `;
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
    
    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar back to top
createBackToTop();