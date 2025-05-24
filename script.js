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
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;
          
          // Add spectacular counter animation with color changes
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              
              // Add dynamic color based on progress
              const progress = current / target;
              const hue = 220 + (progress * 60); // Blue to purple transition
              counter.style.color = `hsl(${hue}, 91%, 60%)`;
              counter.style.textShadow = `0 0 ${10 + progress * 10}px hsla(${hue}, 91%, 60%, 0.8)`;
              counter.style.transform = `scale(${1 + progress * 0.1})`;
              
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
              // Final animation burst
              counter.style.animation = 'counterBurst 0.6s ease-out';
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
    initTextRevealAnimations();
  
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
  
  // Enhanced particles with interactive effects
  function createEnhancedParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const colors = [
      '#3b82f6', '#60a5fa', '#93c5fd', '#1d4ed8', 
      '#8b5cf6', '#a855f7', '#06b6d4', '#10b981'
    ];
    
    // Clear existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < 60; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 20 + 8;
      const shape = Math.random() > 0.5 ? '50%' : '0%'; // Circle or square
      
      particle.className = 'particle';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = shape;
      particle.style.background = `linear-gradient(45deg, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]})`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 25 + 15}s`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.opacity = `${Math.random() * 0.6 + 0.2}`;
      
      // Add random transform for more dynamic movement
      particle.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      container.appendChild(particle);
    }
  }
  
  // Create floating geometric shapes
  function createFloatingShapes() {
    const container = document.getElementById('floating-shapes');
    if (!container) return;
    
    const shapes = ['▲', '●', '■', '◆', '▼', '◇', '⬟', '⬢'];
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    
    for (let i = 0; i < 12; i++) {
      const shape = document.createElement('div');
      shape.className = 'floating-shape';
      shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      shape.style.color = colors[Math.floor(Math.random() * colors.length)];
      shape.style.fontSize = `${Math.random() * 30 + 20}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.animationDuration = `${Math.random() * 20 + 25}s`;
      shape.style.animationDelay = `${Math.random() * 10}s`;
      
      container.appendChild(shape);
    }
  }
  
  // Initialize cursor trail effect
  function initCursorTrail() {
    const trail = [];
    const trailLength = 8;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail';
      dot.style.opacity = (trailLength - i) / trailLength;
      dot.style.transform = `scale(${(trailLength - i) / trailLength})`;
      document.body.appendChild(dot);
      trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function updateTrail() {
      let x = mouseX, y = mouseY;
      
      trail.forEach((dot, index) => {
        dot.style.left = x - 10 + 'px';
        dot.style.top = y - 10 + 'px';
        
        const nextDot = trail[index + 1] || trail[0];
        x += (parseFloat(nextDot.style.left) - x) * 0.3;
        y += (parseFloat(nextDot.style.top) - y) * 0.3;
      });
      
      requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
  }
  
  // Initialize parallax effect for elements
  function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.card-3d, .glass-effect');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach((element, index) => {
        const rate = scrolled * (index % 3 + 1) * 0.02;
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }
  
  // Initialize magnetic hover effects
  function initMagneticHoverEffects() {
    const magneticElements = document.querySelectorAll('.magnetic-hover');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0px, 0px) scale(1)';
      });
    });
  }
  
  // Initialize enhanced project card effects
  function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-item');
    
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(59, 130, 246, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        ripple.style.pointerEvents = 'none';
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
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
  
  // Dynamic color theme based on time
  function initDynamicColorTheme() {
    const root = document.documentElement;
    let hue = 220; // Starting hue for blue
    
    setInterval(() => {
      hue = (hue + 0.5) % 360;
      root.style.setProperty('--dynamic-hue', hue);
    }, 100);
    
    // Add CSS custom properties for dynamic colors
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --dynamic-hue: 220;
        --dynamic-primary: hsl(var(--dynamic-hue), 91%, 60%);
        --dynamic-secondary: hsl(calc(var(--dynamic-hue) + 60), 91%, 60%);
      }
    `;
    document.head.appendChild(style);
  }
  
  // Initialize text reveal animations
  function initTextRevealAnimations() {
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'textReveal 1.5s ease forwards';
        }
      });
    }, { threshold: 0.1 });
    
    textRevealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }
  
  // Enhanced typing effect with sound-like visual feedback
  function setupTypingEffect() {
    const element = document.getElementById('typing-text');
    if (!element) return;
    
    const phrases = [
      "Creo esperienze digitali mozzafiato ✨",
      "Trasformo idee in magia del codice 🎯", 
      "Sviluppo il futuro, una riga alla volta 🚀",
      "Design che cattura, codice che affascina 💫"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 40;
    const pauseEnd = 2000;
    
    const typeText = () => {
      const currentPhrase = phrases[phraseIndex];
      
      // Add typing glow effect
      element.style.textShadow = '0 0 10px rgba(59, 130, 246, 0.8)';
      
      if (isDeleting) {
        element.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeText, 500);
        } else {
          setTimeout(typeText, deletingSpeed);
        }
      } else {
        element.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(typeText, pauseEnd);
        } else {
          setTimeout(typeText, typingSpeed);
        }
      }
      
      // Remove glow after typing
      setTimeout(() => {
        element.style.textShadow = '0 0 5px rgba(59, 130, 246, 0.5)';
      }, 100);
    };
    
    setTimeout(typeText, 1500);
  }
  
  // Initialize loader on page load with enhanced effects
  window.onload = function() {
    initEnhancedPageLoader();
  };
  
  // Enhanced page loader animation with spectacular effects
  function initEnhancedPageLoader() {
    const loader = document.getElementById('page-loader');
    const progress = document.getElementById('loader-progress');
    let width = 0;
    
    // Create floating geometric shapes
    createFloatingShapes();
    
    // Initialize cursor trail effect
    initCursorTrail();
    
    // Simulate loading progress with enhanced animation
    const interval = setInterval(() => {
      width += Math.random() * 8 + 2; // Variable speed for more natural loading
      progress.style.width = Math.min(width, 100) + '%';
      
      if (width >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.transform = 'scale(1.1)';
          setTimeout(() => {
            loader.style.display = 'none';
            // Start particles after loader finishes
            createEnhancedParticles();
            // Initialize parallax effect
            initParallaxEffect();
            // Initialize magnetic hover effects
            initMagneticHoverEffects();
          }, 800);
        }, 500);
      }
    }, 80);
  }
  
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