// MACOTO - Intermediarios de Seguros
// Archivo JavaScript principal - Versión Mejorada

document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const header = document.querySelector('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const body = document.querySelector('body');
    
    // ÚNICA ADICIÓN: Eliminar las ruedas de los iconos de servicio
    const styleElement = document.createElement('style');
    styleElement.id = 'service-icon-fix';
    styleElement.textContent = `
        /* Solo elimina los pseudo-elementos ::after de los iconos de servicio */
        .service-card .service-icon::after {
            display: none !important;
            content: none !important;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Inicializar efectos
    initParallaxEffect();
    initServiceParticles();
    initFloatingElements();
    init3DCardEffect();
    initScrollAnimations();
    
    // Scroll Header Effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Toggle
    mobileToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
        mobileToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = mobileToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileToggle.textContent = '☰';
        }
    });

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Prevent default anchor behavior
            e.preventDefault();

            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileToggle.textContent = '☰';
            }

            // Get the target section id
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate the distance to scroll
                const offsetTop = targetSection.offsetTop - 80;

                // Smooth scroll to the target
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active class for nav links
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Update active nav link based on scroll position
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;

        // Get all sections
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = '#' + section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Reset error states
            [nameInput, emailInput, messageInput].forEach(input => {
                input.style.borderColor = '';
                const label = input.nextElementSibling;
                if (label) label.classList.remove('active');
            });

            // Validate name
            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
                nameInput.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.2)';
                isValid = false;
            }

            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                emailInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
                emailInput.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.2)';
                isValid = false;
            }

            // Validate message
            if (!messageInput.value.trim()) {
                messageInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
                messageInput.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.2)';
                isValid = false;
            }

            // If valid, submit the form with animation
            if (isValid) {
                // Show loading animation
                const formContainer = contactForm.parentElement;
                formContainer.style.opacity = '0.5';
                formContainer.style.transform = 'scale(0.95)';
                
                // Simulate form submission delay (would be replaced with actual AJAX)
                setTimeout(() => {
                    formContainer.innerHTML = `
                        <div class="success-message">
                            <div class="service-icon">✓</div>
                            <h3>¡Mensaje Enviado!</h3>
                            <p>Gracias por contactarnos. Responderemos a tu mensaje tan pronto como sea posible.</p>
                        </div>
                    `;
                    formContainer.style.opacity = '1';
                    formContainer.style.transform = 'scale(1)';
                }, 1000);
            }
        });

        // Label animation for form inputs
        const formInputs = document.querySelectorAll('.form-input');
        if (formInputs) {
            formInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    const label = this.nextElementSibling;
                    if (label) label.classList.add('active');
                });

                input.addEventListener('blur', function() {
                    const label = this.nextElementSibling;
                    if (label && !this.value) {
                        label.classList.remove('active');
                    }
                });

                // Check if input already has value on page load
                if (input.value) {
                    const label = input.nextElementSibling;
                    if (label) label.classList.add('active');
                }
            });
        }
    }

    // Parallax effect based on mouse movement
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        const parallaxElements = document.querySelectorAll('.parallax-mouse');
        
        if (hero && parallaxElements.length > 0) {
            hero.addEventListener('mousemove', function(e) {
                // Get mouse position
                const mouseX = e.clientX / window.innerWidth - 0.5;
                const mouseY = e.clientY / window.innerHeight - 0.5;
                
                // Apply transform to parallax elements
                parallaxElements.forEach(el => {
                    const speed = el.getAttribute('data-speed') || 20;
                    const x = mouseX * speed;
                    const y = mouseY * speed;
                    el.style.transform = `translate(${x}px, ${y}px)`;
                });
            });
        }

        // Add parallax scrolling effect
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const parallaxSections = document.querySelectorAll('.parallax-section');
            
            parallaxSections.forEach(section => {
                const speed = section.getAttribute('data-scroll-speed') || 0.1;
                const yPos = -scrollPosition * speed;
                section.style.backgroundPosition = `center ${yPos}px`;
            });
        });
    }

    // Create and animate service section particles
    function initServiceParticles() {
        const servicesSection = document.querySelector('.services');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'services-particles';
        
        if (servicesSection) {
            // Add particles container
            servicesSection.appendChild(particlesContainer);
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                createParticle(particlesContainer);
            }
        }
    }

    // Create a single particle
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random size
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation
        const animDuration = Math.random() * 20 + 10;
        particle.style.animation = `floatParticle ${animDuration}s linear infinite`;
        particle.style.animationDelay = `-${Math.random() * animDuration}s`;
        
        container.appendChild(particle);
    }

    // Create floating elements for visual effect
    function initFloatingElements() {
        const sections = document.querySelectorAll('.about, .testimonials, .contact');
        
        sections.forEach(section => {
            const elementsContainer = document.createElement('div');
            elementsContainer.className = 'floating-elements';
            
            // Add different shapes
            for (let i = 0; i < 10; i++) {
                createFloatingElement(elementsContainer);
            }
            
            section.appendChild(elementsContainer);
        });
    }

    // Create a single floating element
    function createFloatingElement(container) {
        const shapes = ['circle', 'triangle', 'square'];
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        
        const element = document.createElement('div');
        element.className = `floating-element floating-${shapeType}`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        element.style.left = `${posX}%`;
        element.style.top = `${posY}%`;
        
        // Random size
        const size = Math.random() * 50 + 20;
        
        if (shapeType === 'circle' || shapeType === 'square') {
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
        }
        
        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        element.style.animation = `float ${duration}s ease-in-out infinite`;
        element.style.animationDelay = `${delay}s`;
        
        container.appendChild(element);
    }

    // Initialize 3D card effect
    function init3DCardEffect() {
        const cards = document.querySelectorAll('.service-card, .testimonial-item, .contact-form');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                // Calculate mouse position relative to card center
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                // Calculate rotation values (max tilt is 10 degrees)
                const rotateY = mouseX * 0.01;
                const rotateX = -mouseY * 0.01;
                
                // Apply transform to card
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset transform when mouse leaves
                card.style.transform = '';
                card.style.transition = 'transform 0.5s ease-out';
            });
        });
    }

    // Scroll animations for elements
    function initScrollAnimations() {
        // Elements that will be animated on scroll
        const animatedElements = document.querySelectorAll('.service-card, .about-content, .about-image, .stat-item, .testimonial-item, .contact-info, .contact-form, .contact-detail');
        
        // Initial setup for animation elements
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        // Animation on scroll function
        const animateOnScroll = function() {
            animatedElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Run initial animation check
        animateOnScroll();
        
        // Listen for scroll to trigger animations
        window.addEventListener('scroll', animateOnScroll);
    }

    // Add reveal animations for hero section
    function revealHeroElements() {
        const heroElements = document.querySelectorAll('.hero-tag, .hero h1, .hero p, .hero-buttons');
        
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('reveal');
            }, 300 * index);
        });
    }
    
    // Run hero animations after page load
    window.addEventListener('load', revealHeroElements);

    // Add testimonial switching functionality
    initTestimonialSlider();

    function initTestimonialSlider() {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        const sliderContainer = document.querySelector('.testimonials-slider');
        
        if (testimonialItems.length > 1 && sliderContainer) {
            // Create navigation dots
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'slider-dots';
            
            testimonialItems.forEach((item, index) => {
                const dot = document.createElement('span');
                dot.className = 'slider-dot';
                if (index === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    // Remove active class from all items and dots
                    testimonialItems.forEach(tItem => tItem.classList.remove('active'));
                    dotsContainer.querySelectorAll('.slider-dot').forEach(d => d.classList.remove('active'));
                    
                    // Add active class to selected item and dot
                    testimonialItems[index].classList.add('active');
                    dot.classList.add('active');
                });
                
                dotsContainer.appendChild(dot);
            });
            
            sliderContainer.appendChild(dotsContainer);
            
            // Show only first item by default
            testimonialItems.forEach((item, index) => {
                if (index === 0) {
                    item.classList.add('active');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                }
            });
            
            // Auto-switching functionality
            let currentIndex = 0;
            
            function switchTestimonial() {
                testimonialItems.forEach(item => {
                    item.style.display = 'none';
                    item.classList.remove('active');
                });
                
                dotsContainer.querySelectorAll('.slider-dot').forEach(dot => {
                    dot.classList.remove('active');
                });
                
                currentIndex = (currentIndex + 1) % testimonialItems.length;
                
                testimonialItems[currentIndex].style.display = 'block';
                testimonialItems[currentIndex].classList.add('active');
                
                dotsContainer.querySelectorAll('.slider-dot')[currentIndex].classList.add('active');
            }
            
            // Switch testimonials every 6 seconds
            setInterval(switchTestimonial, 6000);
        }
    }
});


