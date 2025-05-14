document.addEventListener('DOMContentLoaded', function() {
    // Create particles for background
    createParticles();
    
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
  
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
  
    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
      });
  
      closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
  
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
        });
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
  
  // Create particles for background
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#1d4ed8'];
    
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 15 + 5;
      
      particle.className = 'particle';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(particle);
    }
  }
  
  // Typing effect
  function setupTypingEffect() {
    const element = document.getElementById('typing-text');
    if (!element) return;
    
    const phrases = [
      "Creo siti web responsive e accattivanti ✨",
      "Risolvo problemi con il codice 💻",
      "Trasformo idee in realtà digitali 🚀"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseEnd = 1500;
    
    const typeText = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        // Deleting text
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
        // Typing text
        element.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(typeText, pauseEnd);
        } else {
          setTimeout(typeText, typingSpeed);
        }
      }
    };
    
    setTimeout(typeText, 1000);
  }
  
  // Initialize loader on page load
  window.onload = function() {
    initPageLoader();
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