
// Global Variables
let currentPage = 'home';
let isLightTheme = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupThemeToggle();
    setupScrollAnimations();
    setupAccordion();
    setupContactForm();
    setupMediaItems();
    setupTimeline();
    setupMobileMenu();
    
    // Show loading overlay briefly
    showLoadingOverlay();
    setTimeout(hideLoadingOverlay, 800);
    
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        toggleTheme();
    }
    
    console.log('Anneliese Michel Case website initialized');
}

// Navigation System
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const buttons = document.querySelectorAll('[data-page]');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                navigateToPage(targetPage);
            }
        });
    });
    
    // Handle button clicks
    buttons.forEach(button => {
        if (!button.classList.contains('nav-link')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetPage = this.getAttribute('data-page');
                if (targetPage) {
                    navigateToPage(targetPage);
                }
            });
        }
    });
    
    // Handle scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const sectionOverview = document.querySelector('.section-overview');
            if (sectionOverview) {
                sectionOverview.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.page) {
            showPage(e.state.page, false);
        }
    });
    
    // Set initial page state
    const initialPage = window.location.hash.slice(1) || 'home';
    navigateToPage(initialPage, true);
}

function navigateToPage(pageId, replaceState = false) {
    if (pageId === currentPage) return;
    
    showLoadingOverlay();
    
    setTimeout(() => {
        showPage(pageId, !replaceState);
        hideLoadingOverlay();
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Update URL
        if (!replaceState) {
            window.history.pushState({page: pageId}, '', `#${pageId}`);
        } else {
            window.history.replaceState({page: pageId}, '', `#${pageId}`);
        }
        
        // Close mobile menu if open
        closeMobileMenu();
        
    }, 300);
}

function showPage(pageId, addToHistory = true) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink && activeLink.classList.contains('nav-link')) {
            activeLink.classList.add('active');
        }
        
        // Trigger page-specific animations
        triggerPageAnimations(pageId);
    }
}

function triggerPageAnimations(pageId) {
    switch(pageId) {
        case 'timeline':
            animateTimelineItems();
            break;
        case 'religious':
            // Religious page is ready
            break;
        case 'analysis':
            animateAnalysisCards();
            break;
        case 'media':
            animateMediaItems();
            break;
        case 'contact':
            // Contact page is ready
            break;
        default:
            // Home page animations
            break;
    }
}

// Theme Toggle System
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    isLightTheme = !isLightTheme;
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (isLightTheme) {
        body.classList.add('light-theme');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
}

// Mobile Menu
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu when clicking on a navigation link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
    }
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .media-item, .debate-card, .reference-item, .analysis-column'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Timeline Animations
function setupTimeline() {
    // Timeline items will be animated when the timeline page becomes active
}

function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 200);
    });
}

// Accordion System
function setupAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = '0';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
                const content = accordionItem.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

// Contact Form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    
    let isValid = true;
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    switch(field.id) {
        case 'name':
            if (!value) {
                showError(field, 'Name is required');
            } else if (value.length < 2) {
                showError(field, 'Name must be at least 2 characters');
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                showError(field, 'Email is required');
            } else if (!emailRegex.test(value)) {
                showError(field, 'Please enter a valid email address');
            }
            break;
            
        case 'message':
            if (!value) {
                showError(field, 'Message is required');
            } else if (value.length < 10) {
                showError(field, 'Message must be at least 10 characters');
            }
            break;
    }
}

function showError(field, message) {
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        field.style.borderColor = '#ff6b6b';
    }
}

function clearError(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        field.style.borderColor = 'var(--border-color)';
    }
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    showLoadingOverlay();
    
    // Simulate form submission
    setTimeout(() => {
        hideLoadingOverlay();
        
        // Show success message
        alert('Thank you for your message! This is a demonstration form. In a real implementation, your message would be sent to the site administrator.');
        
        // Reset form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Clear any error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        // Reset field borders
        document.querySelectorAll('input, textarea').forEach(field => {
            field.style.borderColor = 'var(--border-color)';
        });
        
    }, 2000);
}

// Media Items
function setupMediaItems() {
    const mediaItems = document.querySelectorAll('.media-item');
    
    mediaItems.forEach(item => {
        const btn = item.querySelector('.media-btn');
        
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            const type = item.querySelector('.media-type').textContent;
            
            showMediaModal(title, description, type);
        });
        
        item.addEventListener('click', function() {
            const btn = this.querySelector('.media-btn');
            btn.click();
        });
    });
}

function showMediaModal(title, description, type) {
    const modal = createModal(title, description, type);
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    backdrop.addEventListener('click', () => closeModal(modal));
    
    // ESC key to close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

function createModal(title, description, type) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-header">
                <h2>${title}</h2>
                <span class="modal-type">${type}</span>
            </div>
            <div class="modal-body">
                <p>${description}</p>
                <div class="modal-disclaimer">
                    <strong>Note:</strong> This is a historical case study website. 
                    Media adaptations often take creative liberties with the actual events.
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
        }
        
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            background: var(--bg-secondary);
            border-radius: var(--border-radius);
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-dark);
        }
        
        .modal-overlay.active .modal-content {
            transform: translate(-50%, -50%) scale(1);
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 30px;
            height: 30px;
            border: none;
            background: none;
            color: var(--text-color);
            font-size: 1.2rem;
            cursor: pointer;
            border-radius: 50%;
            transition: var(--transition);
        }
        
        .modal-close:hover {
            background: var(--bg-tertiary);
        }
        
        .modal-header {
            margin-bottom: 1.5rem;
        }
        
        .modal-header h2 {
            color: var(--text-color);
            margin-bottom: 0.5rem;
            font-size: 1.3rem;
        }
        
        .modal-type {
            background: var(--accent-color);
            color: var(--bg-primary);
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .modal-body p {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .modal-disclaimer {
            background: var(--bg-primary);
            padding: 1rem;
            border-radius: var(--border-radius);
            border-left: 4px solid var(--accent-color);
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        
        .modal-disclaimer strong {
            color: var(--text-color);
        }
    `;
    
    document.head.appendChild(style);
    
    return modal;
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

function animateMediaItems() {
    const mediaItems = document.querySelectorAll('.media-item');
    
    mediaItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Analysis Cards Animation
function animateAnalysisCards() {
    const cards = document.querySelectorAll('.analysis-column, .debate-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Loading Overlay
function showLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.add('active');
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.remove('active');
}

// Smooth Scrolling for Internal Links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Arrow keys for page navigation
    if (e.altKey) {
        const pages = ['home', 'timeline', 'religious', 'analysis', 'media', 'contact'];
        const currentIndex = pages.indexOf(currentPage);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            navigateToPage(pages[currentIndex - 1]);
        } else if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
            navigateToPage(pages[currentIndex + 1]);
        }
    }
});

// Handle Window Resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Page Visibility API
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause any animations or videos
        console.log('Page hidden');
    } else {
        // Page is visible, resume animations
        console.log('Page visible');
    }
});

// Performance Monitoring
window.addEventListener('load', function() {
    // Log page load time for debugging
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Console message for developers
console.log('%cAnneliese Michel Case Study Website', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cThis website presents historical facts about a tragic case. All information is based on documented evidence and court records.', 'color: #888;');


