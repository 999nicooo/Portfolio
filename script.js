document.addEventListener('DOMContentLoaded', function() {
    // Initialize dynamic color theme
    initDynamicColorTheme();
    
    // Start typing effect
    setupTypingEffect();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Mobile menu toggle - AGGIORNATO
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
  
    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        // MODIFICATO: ora fa il toggle del menu invece di solo aprirlo
        mobileMenuBtn.addEventListener('click', () => {
          // Controlla se il menu è già attivo
          if (mobileMenu.classList.contains('active')) {
            // Se è attivo, lo chiudiamo
            mobileMenu.classList.remove('active');
            mobileMenu.style.transform = 'translateX(100%)';
          } else {
            // Se non è attivo, lo apriamo
            mobileMenu.classList.add('active');
            mobileMenu.style.transform = 'translateX(0)';
          }
        });
    
        closeMenuBtn.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          mobileMenu.style.transform = 'translateX(100%)';
        });
    
        // Fix per i link del menu mobile
        mobileLinks.forEach(link => {
          link.addEventListener('click', (e) => {
            // Prima rimuovi la classe active
            mobileMenu.classList.remove('active');
            // Poi nascondi il menu con transform
            mobileMenu.style.transform = 'translateX(100%)';
            
            // Aggiungi un breve ritardo prima di navigare per permettere all'animazione di completarsi
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
              e.preventDefault();
              setTimeout(() => {
                const target = document.querySelector(href);
                if (target) {
                  window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                  });
                }
              }, 300);
            }
          });
        });

        // AGGIUNTO: chiudi il menu quando si clicca fuori da esso
        document.addEventListener('click', function(e) {
          // Verifica se il menu è attivo
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            // Verifica se il click è avvenuto fuori dal menu e non sul pulsante del menu
            let clickedInsideMenu = mobileMenu.contains(e.target);
            let clickedOnMenuButton = mobileMenuBtn.contains(e.target);
            
            if (!clickedInsideMenu && !clickedOnMenuButton) {
              // Chiudi il menu
              mobileMenu.classList.remove('active');
              mobileMenu.style.transform = 'translateX(100%)';
            }
          }
        });
      }
  
    // Project filtering
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectItems = document.querySelectorAll('.project-item');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
  
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('opacity-100');
      } else {
        backToTopButton.classList.remove('opacity-100');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          const duration = 1500;
          const increment = target / (duration / 16); // 60fps
          let current = 0;
          
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };
          
          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    });
    
    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
    
    // Initialize enhanced project card effects
    initProjectCardEffects();
  
    // Initialize text reveal animations
    initTextRevealAnimation();
  
    // Form submission
    const contactForm = document.getElementById('contact-form');
    const submitText = document.getElementById('submit-text');
    const submitLoading = document.getElementById('submit-loading');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
  
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitText.textContent = 'Invio in corso...';
        submitLoading.classList.remove('hidden');
        formSuccess.classList.add('hidden');
        formError.classList.add('hidden');
        
        // Simulate form submission (replace with actual form submission in production)
        setTimeout(() => {
          // Hide loading state
          submitLoading.classList.add('hidden');
          submitText.textContent = 'Invia messaggio';
          
          // Show success message (In production, show success or error based on response)
          formSuccess.classList.remove('hidden');
          
          // Reset form
          contactForm.reset();
        }, 1500);
      });
    }
  });
  
  // Create particles for background (legacy function - replaced by enhanced version)
  function createParticles() {
    // This function is now called from initEnhancedPageLoader
    createEnhancedParticles();
  }
  
  // Enhanced particles with better visuals and performance
  function createEnhancedParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const colors = [
      '#3b82f6', '#60a5fa', '#93c5fd', '#1d4ed8', 
      '#8b5cf6', '#a855f7', '#c084fc', '#06b6d4'
    ];
    
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 60; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 12 + 4;
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      particle.className = 'particle';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 25 + 15}s`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      
      // Add different shapes
      if (shape === 'square') {
        particle.style.borderRadius = '20%';
      } else if (shape === 'triangle') {
        particle.style.borderRadius = '0';
        particle.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
      }
      
      // Add glow effect
      particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.backgroundColor}`;
      
      container.appendChild(particle);
    }
  }

  // Initialize dynamic color theme
  function initDynamicColorTheme() {
    const root = document.documentElement;
    let hue = 220; // Starting hue for blue
    
    setInterval(() => {
      hue = (hue + 0.5) % 360;
      root.style.setProperty('--dynamic-hue', hue);
    }, 100);
  }

  // Initialize enhanced project card effects
  function initProjectCardEffects() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-20px) rotateX(10deg) rotateY(5deg) scale(1.05)';
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(59, 130, 246, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
      
      // Mouse move effect for 3D tilt
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });
    });
  }

  // Enhanced page loader with spectacular effects
  function initEnhancedPageLoader() {
    const loader = document.getElementById('page-loader');
    const progress = document.getElementById('loader-progress');
    let width = 0;
    
    // Create loader particles
    const loaderParticles = document.createElement('div');
    loaderParticles.style.position = 'absolute';
    loaderParticles.style.top = '0';
    loaderParticles.style.left = '0';
    loaderParticles.style.width = '100%';
    loaderParticles.style.height = '100%';
    loaderParticles.style.pointerEvents = 'none';
    loader.appendChild(loaderParticles);
    
    // Add floating particles to loader
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = '#3b82f6';
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
      particle.style.opacity = '0.6';
      loaderParticles.appendChild(particle);
    }
    
    // Simulate loading progress with smooth animation
    const interval = setInterval(() => {
      width += Math.random() * 8 + 2; // Random increment for realistic loading
      if (width > 100) width = 100;
      
      progress.style.width = width + '%';
      
      if (width >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.transform = 'scale(1.1)';
          setTimeout(() => {
            loader.style.display = 'none';
            // Initialize particles after loading
            createEnhancedParticles();
            initFloatingShapes();
            initCursorTrail();
            initParallaxEffect();
            initMagneticElements();
          }, 800);
        }, 500);
      }
    }, 150);
  }

  // Initialize floating geometric shapes
  function initFloatingShapes() {
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'floating-shapes';
    document.body.appendChild(shapesContainer);
    
    const shapes = ['▲', '●', '■', '◆', '★'];
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    
    setInterval(() => {
      if (shapesContainer.children.length < 8) {
        const shape = document.createElement('div');
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        shape.className = 'floating-shape';
        shape.textContent = randomShape;
        shape.style.left = Math.random() * 100 + '%';
        shape.style.fontSize = Math.random() * 20 + 15 + 'px';
        shape.style.color = randomColor;
        shape.style.opacity = '0.1';
        shape.style.animationDuration = Math.random() * 10 + 15 + 's';
        
        shapesContainer.appendChild(shape);
        
        // Remove shape after animation
        setTimeout(() => {
          if (shape.parentNode) {
            shape.remove();
          }
        }, 25000);
      }
    }, 3000);
  }

  // Initialize cursor trail effect
  function initCursorTrail() {
    const trail = [];
    const trailLength = 8;
    
    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail';
      dot.style.opacity = (i + 1) / trailLength;
      dot.style.transform = `scale(${(i + 1) / trailLength})`;
      document.body.appendChild(dot);
      trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    setInterval(() => {
      let x = mouseX, y = mouseY;
      
      trail.forEach((dot, index) => {
        dot.style.left = x - 10 + 'px';
        dot.style.top = y - 10 + 'px';
        
        if (index < trail.length - 1) {
          const nextDot = trail[index + 1];
          const nextX = parseFloat(nextDot.style.left) + 10;
          const nextY = parseFloat(nextDot.style.top) + 10;
          
          x += (nextX - x) * 0.3;
          y += (nextY - y) * 0.3;
        }
      });
    }, 16);
  }

  // Initialize parallax effect
  function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-element, .card-3d, .glass-effect');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach((element, index) => {
        const rate = scrolled * (index % 3 + 1) * 0.02;
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  // Initialize magnetic elements
  function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic-hover');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.3;
        const moveY = y * 0.3;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = '';
      });
    });
  }

  // Initialize text reveal animation
  function initTextRevealAnimation() {
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'textReveal 2s ease forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    textRevealElements.forEach(element => {
      observer.observe(element);
    });
  }

  // Add ripple effect CSS if not exists
  if (!document.querySelector('#ripple-keyframes')) {
    const style = document.createElement('style');
    style.id = 'ripple-keyframes';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize loader on page load with enhanced effects
  window.onload = function() {
    initEnhancedPageLoader();
  };
  
  // Page loader animation
  function initPageLoader() {
    const loader = document.getElementById('page-loader');
    const progress = document.getElementById('loader-progress');
    let width = 0;
    
    // Simulate loading progress
    const interval = setInterval(() => {
      width += 5;
      progress.style.width = width + '%';
      
      if (width >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }, 300);
      }
    }, 100);
  }