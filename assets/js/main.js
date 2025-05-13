// MACOTO - Intermediarios de Seguros
// Archivo JavaScript principal

document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const header = document.querySelector('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

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
            });

            // Validate name
            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = 'red';
                isValid = false;
            }

            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                emailInput.style.borderColor = 'red';
                isValid = false;
            }

            // Validate message
            if (!messageInput.value.trim()) {
                messageInput.style.borderColor = 'red';
                isValid = false;
            }

            // If valid, submit the form
            if (isValid) {
                // Here you would normally submit the form or use AJAX
                // For now, let's just show a success message
                const formContainer = contactForm.parentElement;
                formContainer.innerHTML = '<div class="success-message"><div class="service-icon">✓</div><h3>¡Mensaje Enviado!</h3><p>Gracias por contactarnos. Responderemos a tu mensaje tan pronto como sea posible.</p></div>';
            }
        });
    }

    // Animation on scroll effect for elements
    const animateOnScroll = function () {
        const animatedElements = document.querySelectorAll('.service-card, .about-content, .about-image, .testimonial-item');

        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial setup for animation elements
    const setupAnimations = function () {
        const animatedElements = document.querySelectorAll('.service-card, .about-content, .about-image, .testimonial-item');

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.8s ease-out';
        });
    };

    // Run setup and initial animation check
    setupAnimations();
    animateOnScroll();

    // Listen for scroll to trigger animations
    window.addEventListener('scroll', animateOnScroll);
});