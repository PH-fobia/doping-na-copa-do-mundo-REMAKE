
// ====================================
// INTERACTIVE SCIENCE-THEMED WEBSITE
// ====================================

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

// Navigation functionality
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = link.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if (!targetSection) {
            console.warn(`Section with id "${targetId}" not found`);
            return;
        }
        
        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(s => {
            s.classList.remove('active');
        });
        
        // Add active class to clicked link and target section
        link.classList.add('active');
        targetSection.classList.add('active');
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ====================================
// ANIMATED PARTICLES BACKGROUND
// ====================================

function createParticles() {
    const body = document.body;
    const particleCount = 50; // Reduced for better performance

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '0';
        
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = `radial-gradient(circle, rgba(0, 217, 255, 0.8), transparent)`;
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px rgba(0, 217, 255, 0.6)';
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        particle.className = 'animated-particle';
        
        body.appendChild(particle);
    }
    
    // Add CSS animation for particles
    if (!document.querySelector('style[data-particles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-particles', 'true');
        style.textContent = `
            @keyframes float {
                0%, 100% { 
                    transform: translateY(0) translateX(0) scale(1);
                    opacity: 0.5;
                }
                25% { 
                    transform: translateY(-100px) translateX(50px) scale(1.2);
                    opacity: 0.8;
                }
                50% { 
                    transform: translateY(-200px) translateX(-50px) scale(0.8);
                    opacity: 1;
                }
                75% { 
                    transform: translateY(-100px) translateX(100px) scale(1.1);
                    opacity: 0.7;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ====================================
// SCROLL ANIMATIONS
// ====================================

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

// Observe all cards and highlight boxes
document.querySelectorAll('.card, .highlight-box').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// ====================================
// PARALLAX EFFECT ON SCROLL
// ====================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const elements = document.querySelectorAll('h1.section-title, h2.section-subtitle');
    
    elements.forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
});

// ====================================
// DYNAMIC GLOW EFFECT ON HOVER
// ====================================

document.querySelectorAll('.card, .highlight-box, .nav-link').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', x + 'px');
        element.style.setProperty('--mouse-y', y + 'px');
    });
    
    element.addEventListener('mouseenter', () => {
        element.style.setProperty('--glow-opacity', '0.8');
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.setProperty('--glow-opacity', '0');
    });
});

// ====================================
// RIPPLE EFFECT ON CLICK
// ====================================

document.querySelectorAll('.nav-link, .athlete-tag').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    // Create particles background
    createParticles();
});

// ====================================
// SMOOTH SCROLLING ENHANCEMENTS
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ====================================
// ACCESSIBILITY
// ====================================

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
});

console.log('🌍 Doping & Copa Science Website Loaded Successfully! ✨🏆');
