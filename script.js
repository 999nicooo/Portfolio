document.addEventListener('DOMContentLoaded', function() {
    // Pulisci elementi problematici prima di inizializzare
    cleanupProblematicElements();
    
    // Initialize page loader first
    initPageLoader();
    
    // Initialize components
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initProjectFilters();
    initSkillBars();
    initCounters();
    initContactForm();
    initMobileMenu();
    initBackToTop();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Funzione per pulire elementi problematici
function cleanupProblematicElements() {
    // Rimuovi elementi con classi Tailwind che potrebbero interferire
    const problematicSelectors = [
        '.inline-flex.p-1.bg-gray-800.rounded-lg.glass-effect',
        '.bg-gray-800.rounded-lg',
        '.px-4.py-2.rounded-md',
        '[class*="glass-effect"][class*="bg-gray-800"]'
    ];
    
    problematicSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // Controlla se l'elemento ha solo un bottone di filtro inside
            const filterButton = element.querySelector('button[data-filter]');
            if (filterButton) {
                // Sposta il bottone fuori e rimuovi il wrapper
                element.parentNode.insertBefore(filterButton, element);
                element.remove();
            } else {
                element.remove();
            }
        });
    });
    
    // Trova e correggi eventuali bottoni di filtro
    const filterButtons = document.querySelectorAll('button[data-filter], .project-filter');
    filterButtons.forEach(button => {
        // Aggiungi le classi corrette
        button.classList.add('filter-btn');
        button.classList.remove('px-4', 'py-2', 'rounded-md', 'project-filter');
        
        // Assicurati che il primo bottone sia attivo
        if (button.getAttribute('data-filter') === 'all' || button.getAttribute('data-filter') === 'design') {
            button.classList.add('active');
        }
    });
    
    // Crea un container per i filtri se non esiste
    const existingContainer = document.querySelector('.filter-container');
    if (!existingContainer && filterButtons.length > 0) {
        const container = document.createElement('div');
        container.className = 'filter-container';
        
        // Trova la sezione progetti
        const projectSection = document.querySelector('#progetti, section[id*="project"]');
        if (projectSection) {
            const firstChild = projectSection.querySelector('.grid, .projects-grid');
            if (firstChild) {
                projectSection.insertBefore(container, firstChild);
                
                // Sposta tutti i bottoni nel container
                filterButtons.forEach(button => {
                    container.appendChild(button);
                });
            }
        }
    }
}

// Navigation active state
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// Typing effect
function initTypingEffect() {
    const element = document.getElementById('typing-text');
    if (!element) return;
    
    const phrases = [
        "Sviluppatore Full Stack appassionato",
        "Creo esperienze digitali moderne",
        "Trasformo idee in realtà",
        "Design e codice di qualità"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, 50);
            }
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        }
    }
    
    setTimeout(type, 1000);
}

// Scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Project filters - versione migliorata
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn, .project-filter, button[data-filter]');
    const projectItems = document.querySelectorAll('.project-item, [data-category]');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        if (item.style.opacity === '0') {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
    
    // Attiva il primo filtro di default
    if (filterButtons.length > 0) {
        const firstFilter = filterButtons[0];
        if (!document.querySelector('.filter-btn.active')) {
            firstFilter.classList.add('active');
            firstFilter.click();
        }
    }
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                progressBar.style.width = targetWidth + '%';
            }
        });
    }, { threshold: 0.1 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.1 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Invio in corso...';
        submitBtn.disabled = true;
        
        // Hide previous messages
        const alerts = form.querySelectorAll('.alert');
        alerts.forEach(alert => alert.remove());
        
        // Simulate form submission
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'alert alert-success';
            successMsg.textContent = 'Messaggio inviato con successo!';
            form.insertBefore(successMsg, form.firstChild);
            
            // Reset form
            form.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        }, 1500);
    });
}

// Mobile menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }
    
    // Close menu when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
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

// Page loader function
function initPageLoader() {
    const loader = document.getElementById('page-loader');
    const progress = document.getElementById('loader-progress');
    const percentage = document.querySelector('.loader-percentage');
    
    if (!loader || !progress) {
        // Se gli elementi del loader non esistono, rimuovi semplicemente qualsiasi overlay
        const existingLoader = document.querySelector('#page-loader, .loader, .loading-screen');
        if (existingLoader) {
            existingLoader.remove();
        }
        return;
    }
    
    let width = 0;
    
    // Simulate loading progress
    const interval = setInterval(() => {
        width += Math.random() * 15 + 5; // Variable speed
        
        if (width > 100) width = 100;
        
        progress.style.width = width + '%';
        if (percentage) {
            percentage.textContent = Math.floor(width) + '%';
        }
        
        if (width >= 100) {
            clearInterval(interval);
            
            // Hide loader after a brief delay
            setTimeout(() => {
                loader.classList.add('hidden');
                
                // Remove loader from DOM after transition
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 500);
        }
    }, 100);
}

// Fallback: remove any loader after 3 seconds maximum
setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
}, 3000);