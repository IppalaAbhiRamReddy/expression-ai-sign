// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMobile = document.querySelector('.nav-mobile');
const hamburger = document.querySelector('.hamburger');

mobileMenuBtn.addEventListener('click', () => {
    navMobile.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Smooth scrolling for navigation links
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
        // Close mobile menu if open
        navMobile.classList.remove('active');
    });
});

// Header shrink on scroll
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Language dropdown functionality
const languageDropdown = document.querySelector('.dropdown');
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!languageDropdown.contains(e.target)) {
        dropdownContent.style.opacity = '0';
        dropdownContent.style.visibility = 'hidden';
        dropdownContent.style.transform = 'translateY(-10px)';
    }
});

// Language selection
document.querySelectorAll('[data-lang]').forEach(langOption => {
    langOption.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = e.target.getAttribute('data-lang');
        const langText = e.target.textContent;
        
        // Update button text (keeping the globe icon)
        dropdownBtn.innerHTML = `<span class="globe-icon">🌐</span> ${langText.split(' ')[0] || 'EN'}`;
        
        // Here you would typically implement actual language switching
        console.log('Language switched to:', selectedLang);
        
        // Close dropdown
        dropdownContent.style.opacity = '0';
        dropdownContent.style.visibility = 'hidden';
        dropdownContent.style.transform = 'translateY(-10px)';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step, .stat').forEach(el => {
    observer.observe(el);
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing! We\'ll keep you updated.');
            e.target.querySelector('input[type="email"]').value = '';
        }
    });
}

// Demo video play button
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        alert('Demo video would start playing here!');
    });
}

// CTA buttons functionality
document.querySelectorAll('.btn-primary, .btn-cta').forEach(btn => {
    if (btn.textContent.includes('Start Translating') || btn.textContent.includes('Create Free Account')) {
        btn.addEventListener('click', () => {
            alert('Welcome! Sign-up functionality would be implemented here.');
        });
    }
});

document.querySelectorAll('.btn-outline, .btn-outline-white').forEach(btn => {
    if (btn.textContent.includes('Watch Demo') || btn.textContent.includes('Learn More')) {
        btn.addEventListener('click', () => {
            alert('Demo video or additional information would be shown here.');
        });
    }
});

// Add loading animation for page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add smooth hover effects for cards
document.querySelectorAll('.feature-card, .step').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        navMobile.classList.remove('active');
    }
    
    // Enter key on focused elements
    if (e.key === 'Enter' && e.target.classList.contains('dropdown-btn')) {
        e.target.click();
    }
});

// Focus management for accessibility
document.querySelectorAll('.nav-link, .btn, .dropdown-btn').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #2563eb';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

console.log('SignVerse website loaded successfully!');
