// ===== Global Variables =====

// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ===== Custom Cursor =====
// const cursor = document.querySelector('.cursor');
// const cursorFollower = document.querySelector('.cursor-follower');

// if (cursor && cursorFollower) {
//     document.addEventListener('mousemove', (e) => {
//         cursor.style.left = e.clientX + 'px';
//         cursor.style.top = e.clientY + 'px';
//         
//         setTimeout(() => {
//             cursorFollower.style.left = e.clientX + 'px';
//             cursorFollower.style.top = e.clientY + 'px';
//         }, 100);
//     });

//     // Cursor effects on interactive elements
//     const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
//     interactiveElements.forEach(el => {
//         el.addEventListener('mouseenter', () => {
//             cursor.style.transform = 'scale(1.5)';
//             cursorFollower.style.transform = 'scale(1.5)';
//         });
//         
//         el.addEventListener('mouseleave', () => {
//             cursor.style.transform = 'scale(1)';
//             cursorFollower.style.transform = 'scale(1)';
//         });
//     });
// }

// ===== Navigation =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ===== Main Scroll Handler (Optimized) =====
function handleMainScroll() {
    // Sticky navbar
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update scroll progress bar
    updateScrollProgress();
    
    // Check animations
    checkCounterAnimation();
    updateBackToTop();
    updateActiveLink();
}

// Debounced scroll handler
const debouncedMainScroll = debounce(handleMainScroll, 10);
window.addEventListener('scroll', debouncedMainScroll, { passive: true });

// ===== Scroll Progress Bar =====
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercentage + '%';
    }
}

// Mobile menu toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
if (navMenu) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });
}

// Active navigation link on scroll
const sections = document.querySelectorAll('section');

// Use debounced scroll for active links
const updateActiveLink = debounce(() => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 100);

window.addEventListener('scroll', updateActiveLink);

// ===== Smooth Scroll =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');
let counterAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation on scroll (combined with main scroll handler)
function checkCounterAnimation() {
    if (counterAnimated) return;
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const sectionTop = aboutSection.offsetTop;
        if (window.scrollY + window.innerHeight > sectionTop + 200) {
            animateCounters();
            counterAnimated = true;
        }
    }
}





// ===== Project Modal =====
const projectModal = document.getElementById('project-modal');

const projectsData = [
    {
        title: 'E-Commerce Platform',
        description: 'A modern, full-featured e-commerce platform built with React and Node.js. Features include product catalog, shopping cart, secure checkout, user authentication, and admin dashboard.',
        role: 'Lead UI/UX Designer & Frontend Developer',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
        challenges: 'The main challenge was creating a seamless checkout experience while maintaining security. We implemented progressive disclosure and real-time validation to guide users through the process smoothly.'
    },
    {
        title: 'Banking App Redesign',
        description: 'Complete redesign of a mobile banking application focusing on simplicity, security, and accessibility. The new interface reduced user task completion time by 40%.',
        role: 'UI/UX Designer & Prototyping',
        tech: ['Figma', 'Adobe XD', 'User Research', 'Usability Testing'],
        challenges: 'Balancing security requirements with user convenience was key. We conducted extensive user testing to find the optimal balance between security and usability.'
    },
    {
        title: 'Brand Identity System',
        description: 'Comprehensive branding package for a tech startup including logo design, color palette, typography, brand guidelines, and marketing materials.',
        role: 'Brand Designer & Creative Director',
        tech: ['Illustrator', 'Photoshop', 'InDesign', 'Brand Strategy'],
        challenges: 'Creating a unique identity in a crowded tech market required deep understanding of the target audience and competitive landscape. We developed a distinctive visual language that resonates with their audience.'
    },
    {
        title: 'Portfolio Website',
        description: 'An interactive 3D portfolio website featuring WebGL animations, smooth transitions, and engaging user interactions. Built with Three.js and GSAP.',
        role: 'Full-Stack Developer & 3D Designer',
        tech: ['Three.js', 'GSAP', 'WebGL', 'Blender', 'React'],
        challenges: 'Optimizing 3D performance across devices while maintaining visual quality. Implemented progressive loading and adaptive quality settings based on device capabilities.'
    },
    {
        title: 'Fitness Tracker App',
        description: 'A comprehensive health and wellness mobile application with workout tracking, nutrition planning, progress analytics, and social features.',
        role: 'Mobile UI/UX Designer',
        tech: ['React Native', 'Firebase', 'HealthKit', 'Material Design'],
        challenges: 'Designing an intuitive data visualization system for complex health metrics. Created custom charts and graphs that make health data easy to understand at a glance.'
    },
    {
        title: 'Dashboard Analytics',
        description: 'Advanced analytics dashboard with real-time data visualization, customizable widgets, and comprehensive reporting tools for business intelligence.',
        role: 'Frontend Developer & Data Visualization Specialist',
        tech: ['Vue.js', 'D3.js', 'Chart.js', 'REST API', 'WebSockets'],
        challenges: 'Handling large datasets efficiently while maintaining smooth interactions. Implemented virtual scrolling, data aggregation, and intelligent caching strategies.'
    }
];

function openProjectModal(index) {
    const project = projectsData[index];
    
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;
    document.getElementById('modal-role').textContent = project.role;
    document.getElementById('modal-challenges').textContent = project.challenges;
    
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');
    
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});





// ===== Back to Top Button =====
const backToTop = document.getElementById('back-to-top');

function updateBackToTop() {
    if (!backToTop) return;
    
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}




// ===== Language Selector =====
const languageSelector = document.getElementById('language');

const translations = {
    en: {
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-projects': 'Projects',
        'nav-skills': 'Skills',
        'nav-testimonials': 'Testimonials',
        'nav-blog': 'Blog',
        'nav-contact': 'Contact',
        'section-skills': 'Skills & Expertise',
        'tech-stack-title': 'Technologies I Work With',
        'skill-html': 'HTML & CSS',
        'skill-javascript': 'JavaScript',
        'skill-frontend': 'Frontend Development',
        'skill-backend': 'Backend Development'
    },
    es: {
        'nav-home': 'Inicio',
        'nav-about': 'Acerca de',
        'nav-projects': 'Proyectos',
        'nav-skills': 'Habilidades',
        'nav-testimonials': 'Testimonios',
        'nav-blog': 'Blog',
        'nav-contact': 'Contacto',
        'section-skills': 'Habilidades y Experiencia',
        'tech-stack-title': 'Tecnologías con las que Trabajo',
        'skill-html': 'HTML y CSS',
        'skill-javascript': 'JavaScript',
        'skill-frontend': 'Desarrollo Frontend',
        'skill-backend': 'Desarrollo Backend'
    },
    fr: {
        'nav-home': 'Accueil',
        'nav-about': 'À propos',
        'nav-projects': 'Projets',
        'nav-skills': 'Compétences',
        'nav-testimonials': 'Témoignages',
        'nav-blog': 'Blog',
        'nav-contact': 'Contact',
        'section-skills': 'Compétences et Expertise',
        'tech-stack-title': 'Technologies que j\'utilise',
        'skill-html': 'HTML et CSS',
        'skill-javascript': 'JavaScript',
        'skill-frontend': 'Développement Frontend',
        'skill-backend': 'Développement Backend'
    }
};

// Function to change language
function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Save language preference
    localStorage.setItem('language', lang);
}

languageSelector.addEventListener('change', (e) => {
    const lang = e.target.value;
    changeLanguage(lang);
    
    // Show notification
    const langNames = { en: 'English', es: 'Español', fr: 'Français' };
    showNotification(`Language changed to ${langNames[lang] || lang.toUpperCase()}`);
});

// ===== Scroll Animations (AOS - Animate On Scroll) =====
function handleScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    console.log('Found', elements.length, 'AOS elements');
    
    elements.forEach(element => {
        // Add aos-animate class to all elements immediately
        element.classList.add('aos-animate');
    });
    console.log('Added aos-animate class to all elements');
}

// Trigger scroll animations on load
window.addEventListener('load', handleScrollAnimations);

// ===== Lazy Loading Images =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// ===== Performance Optimization =====
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll animations
const debouncedScrollAnimations = debounce(handleScrollAnimations, 50);
window.addEventListener('scroll', debouncedScrollAnimations, { passive: true });

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    // Trigger initial animations
    handleScrollAnimations();
    handleMainScroll();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize language
    const savedLanguage = localStorage.getItem('language') || 'en';
    if (languageSelector) {
        languageSelector.value = savedLanguage;
        changeLanguage(savedLanguage);
    }
});

// ===== Notification System =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconClass = type === 'success' ? 'check-circle' : 
                     type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${iconClass}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Tooltip System =====
let activeTooltip = null;

function initTooltips() {
    const tooltipElements = document.querySelectorAll('.tech-item[title]');
    
    tooltipElements.forEach(element => {
        // Store original title
        const originalTitle = element.getAttribute('title');
        element.setAttribute('data-tooltip', originalTitle);
        element.removeAttribute('title');
        
        element.addEventListener('mouseenter', (e) => {
            // Remove any existing tooltip first
            removeActiveTooltip();
            
            const tooltipText = element.getAttribute('data-tooltip');
            if (!tooltipText) return;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            // Position tooltip with scroll offset
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            // Calculate position
            const tooltipLeft = rect.left + scrollLeft + (rect.width / 2) - (tooltip.offsetWidth / 2);
            const tooltipTop = rect.top + scrollTop - tooltip.offsetHeight - 10;
            
            tooltip.style.left = Math.max(10, tooltipLeft) + 'px';
            tooltip.style.top = tooltipTop + 'px';
            
            // Store reference
            activeTooltip = tooltip;
            element.currentTooltip = tooltip;
            
            // Show tooltip
            setTimeout(() => tooltip.classList.add('show'), 10);
        });
        
        element.addEventListener('mouseleave', (e) => {
            // Check if mouse is moving to the tooltip itself
            const relatedTarget = e.relatedTarget;
            if (relatedTarget && relatedTarget.classList && relatedTarget.classList.contains('tooltip')) {
                return;
            }
            removeActiveTooltip();
        });
    });
}

function removeActiveTooltip() {
    if (activeTooltip) {
        activeTooltip.classList.remove('show');
        const tooltipToRemove = activeTooltip;
        setTimeout(() => {
            if (tooltipToRemove && tooltipToRemove.parentNode) {
                tooltipToRemove.remove();
            }
        }, 200);
        activeTooltip = null;
    }
}

// Remove tooltip on scroll
window.addEventListener('scroll', () => {
    removeActiveTooltip();
}, { passive: true });

// ===== Prevent Right Click on Images (Optional) =====
// Uncomment if you want to protect your images
/*
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
*/

// ===== Print Styles =====
window.addEventListener('beforeprint', () => {
    // Expand all sections before printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ===== Service Worker (PWA Support) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to register service worker for PWA
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
        */
    });
}

console.log('%c🎨 Portfolio Website Loaded Successfully!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cDesigned and Developed with ❤️', 'color: #8b5cf6; font-size: 14px;');

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: Toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
});

// ===== Smooth Scroll for All Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});