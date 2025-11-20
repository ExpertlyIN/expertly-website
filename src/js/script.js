/* ================================================
   EXPERTLY WEBSITE - INTERACTIVE FUNCTIONALITY
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Expertly Website Loaded Successfully');

    // ===============================
    // ===============================

    var host = window.location.hostname;


    // ===============================
    // SMOOTH SCROLLING FOR NAVIGATION
    // ===============================
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Link clicked:', this.textContent, 'href:', this.getAttribute('href'));
            const targetId = this.getAttribute('href');
            // Only handle internal anchor links
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===============================
    // NAVBAR SCROLL EFFECT
    // ===============================
    
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===============================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===============================
    
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.solution-card, .feature, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===============================
    // HERO SECTION DYNAMIC TYPING EFFECT
    // ===============================
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        
        // Add typing cursor effect to blue text
        const blueSpan = heroTitle.querySelector('.text-blue');
        if (blueSpan) {
            blueSpan.style.borderRight = '3px solid #2563eb';
            blueSpan.style.animation = 'blink 1s infinite';
            
            // Add blink animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes blink {
                    0%, 50% { border-color: #2563eb; }
                    51%, 100% { border-color: transparent; }
                }
            `;
            document.head.appendChild(style);
            
            // Remove cursor after 3 seconds
            setTimeout(() => {
                blueSpan.style.borderRight = 'none';
                blueSpan.style.animation = 'none';
            }, 3000);
        }
    }

    // ===============================
    // PERFORMANCE MONITORING
    // ===============================
    
    // Log page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
            
            // Log to analytics (replace with actual analytics service)
            // Analytics could be added here for tracking user interactions
        }
    });

    // ===============================
    // MOBILE MENU TOGGLE (Future Enhancement)
    // ===============================
    
    // Mobile menu functionality can be added here when needed
    function initMobileMenu() {
        // Mobile menu toggle logic
        // This can be expanded based on design requirements
    }

    // ===============================
    // UTILITY FUNCTIONS
    // ===============================
    
    // Debounce function for performance
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
    
    // Optimized scroll handler
    const optimizedScrollHandler = debounce(function() {
        // Additional scroll-based functionality can be added here
    }, 10);
    
    window.addEventListener('scroll', optimizedScrollHandler);

    console.log('All interactive features initialized successfully');
});

/* ================================================
   ADDITIONAL FEATURES FOR FUTURE ENHANCEMENT
   ================================================ */

// Function to add dynamic content loading
function loadDynamicContent() {
    // API calls for dynamic content can be added here
    // For example: loading latest security updates, news, etc.
}

// Function to handle cookie consent (if needed)
function initCookieConsent() {
    // Cookie consent logic can be added here
}

// Function to integrate with analytics
function initAnalytics() {
    // Google Analytics or other analytics integration
}

// Export functions for testing (if using module system)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadDynamicContent,
        initCookieConsent,
        initAnalytics
    };
}
