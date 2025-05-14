// MACOTO - Intermediarios de Seguros
// Archivo JavaScript principal - Versión Optimizada para mejor rendimiento

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
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
    
    // Detectar si es un dispositivo móvil o de baja potencia
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowPower = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Inicializar efectos con rendimiento optimizado
    if (!isLowPower) {
        initOptimizedEffects();
    }
    
    // Scroll Header Effect - Optimizado con throttle
    let lastScrollY = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (lastScrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            
            ticking = true;
        }
    });

    // Mobile Navigation Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && mobileToggle) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = mobileToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileToggle.textContent = '☰';
            }
        }
    });

    // Smooth scroll para enlaces de anclaje - optimizado para rendimiento
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                // Cerrar menú móvil si está abierto
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileToggle.textContent = '☰';
                }

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // SOLUCIÓN: Usar scrollIntoView en lugar de scrollTo para mejor rendimiento
                    // y usar un timeout para evitar bloqueo de UI
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'auto', // Cambiado de 'smooth' a 'auto' para evitar trabado
                            block: 'start'
                        });
                        
                        // Actualizar clases activas
                        navLinks.forEach(navLink => navLink.classList.remove('active'));
                        this.classList.add('active');
                    }, 10);
                }
            });
        });
    }

    // Actualizar enlace activo según posición de scroll - Optimizado con throttle
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(function() {
            updateActiveNavLink();
            scrollTimeout = null;
        }, 100);
    });
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100; // Compensación para header
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validación básica
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Reiniciar estados de error
            [nameInput, emailInput, messageInput].forEach(input => {
                if (input) {
                    input.style.borderColor = '';
                    const label = input.nextElementSibling;
                    if (label) label.classList.remove('active');
                }
            });

            // Validar nombre
            if (nameInput && !nameInput.value.trim()) {
                nameInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
                nameInput.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.2)';
                isValid = false;
            }

            // Validar email
            if (emailInput) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    emailInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
                    emailInput.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.2)';
                    isValid = false;
                }
            }

            // Validar mensaje
            if (messageInput && !messageInput.value.trim()) {
                messageInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
                messageInput.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.2)';
                isValid = false;
            }

            // Si es válido, enviar formulario con animación
            if (isValid) {
                const formContainer = contactForm.parentElement;
                formContainer.style.opacity = '0.5';
                formContainer.style.transform = 'scale(0.95)';
                
                // Simular envío del formulario
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

        // Animación para etiquetas del formulario
        const formInputs = document.querySelectorAll('.form-input');
        if (formInputs.length > 0) {
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

                // Verificar si el input ya tiene valor al cargar
                if (input.value) {
                    const label = input.nextElementSibling;
                    if (label) label.classList.add('active');
                }
            });
        }
    }

    // FUNCIONES DE EFECTOS OPTIMIZADOS
    function initOptimizedEffects() {
        initOptimizedParallax();
        initOptimizedParticles();
        init3DCardsEffect();
        initScrollAnimations();
        initTestimonialSlider();
    }
    
    // Parallax optimizado
    function initOptimizedParallax() {
        const hero = document.querySelector('.hero');
        const parallaxElements = document.querySelectorAll('.parallax-mouse');
        
        if (hero && parallaxElements.length > 0 && !isMobile) {
            let mouseX = 0, mouseY = 0;
            let rafId = null;
            
            hero.addEventListener('mousemove', function(e) {
                // Actualizar posición pero no renderizar todavía
                mouseX = e.clientX / window.innerWidth - 0.5;
                mouseY = e.clientY / window.innerHeight - 0.5;
                
                if (!rafId) {
                    rafId = requestAnimationFrame(updateElements);
                }
            });
            
            function updateElements() {
                parallaxElements.forEach(el => {
                    const speed = el.getAttribute('data-speed') || 20;
                    const x = mouseX * speed;
                    const y = mouseY * speed;
                    
                    // Usar transform3d para aceleración por hardware
                    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                });
                
                rafId = null;
            }
        } else if (parallaxElements.length > 0 && isMobile) {
            // En móviles, deshabilitar para mejor rendimiento
            parallaxElements.forEach(el => {
                el.style.transform = 'none';
            });
        }

        // Parallax de fondo en scroll optimizado
        window.addEventListener('scroll', function() {
            if (isMobile) return; // Desactivar en móviles
            
            requestAnimationFrame(function() {
                const parallaxSections = document.querySelectorAll('.parallax-section');
                const scrollPosition = window.scrollY;
                
                parallaxSections.forEach(section => {
                    const speed = section.getAttribute('data-scroll-speed') || 0.1;
                    const yPos = -scrollPosition * speed;
                    section.style.backgroundPosition = `center ${yPos}px`;
                });
            });
        });
    }
    
    // Partículas optimizadas (menos y más eficientes)
    function initOptimizedParticles() {
        const servicesSection = document.querySelector('.services');
        
        if (servicesSection && !isMobile) {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'services-particles';
            servicesSection.appendChild(particlesContainer);
            
            // Reducir el número de partículas para mejor rendimiento
            const particleCount = isMobile ? 12 : 25;
            
            for (let i = 0; i < particleCount; i++) {
                createParticle(particlesContainer);
            }
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Tamaño reducido para mejor rendimiento
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Usar will-change y transform3d para mejor rendimiento
        particle.style.willChange = 'transform';
        particle.style.transform = 'translate3d(0, 0, 0)';
        
        // Animación más lenta para mejor rendimiento
        const animDuration = Math.random() * 20 + 15;
        particle.style.animation = `floatParticle ${animDuration}s linear infinite`;
        particle.style.animationDelay = `-${Math.random() * animDuration}s`;
        
        container.appendChild(particle);
    }
    
    // Efecto 3D de tarjetas optimizado
    function init3DCardsEffect() {
        const cards = document.querySelectorAll('.service-card, .testimonial-item, .contact-form');
        
        if (cards.length > 0 && !isMobile) {
            cards.forEach(card => {
                // Indicar al navegador que este elemento cambiará
                card.style.willChange = 'transform';
                
                let rafId = null;
                let cardX = 0, cardY = 0;
                
                card.addEventListener('mousemove', function(e) {
                    const cardRect = card.getBoundingClientRect();
                    const cardCenterX = cardRect.left + cardRect.width / 2;
                    const cardCenterY = cardRect.top + cardRect.height / 2;
                    
                    cardX = e.clientX - cardCenterX;
                    cardY = e.clientY - cardCenterY;
                    
                    if (!rafId) {
                        rafId = requestAnimationFrame(updateCard);
                    }
                });
                
                function updateCard() {
                    // Reducir intensidad del efecto
                    const rotateY = cardX * 0.005;
                    const rotateX = -cardY * 0.005;
                    
                    // Usar transform3d para aceleración por hardware
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
                    
                    rafId = null;
                }
                
                card.addEventListener('mouseleave', function() {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
                });
            });
        }
    }
    
    // Animaciones de scroll optimizadas con IntersectionObserver
    function initScrollAnimations() {
        // Elementos que serán animados
        const animatedElements = document.querySelectorAll('.service-card, .about-content, .about-image, .stat-item, .testimonial-item, .contact-info, .contact-form, .contact-detail');
        
        // Usar IntersectionObserver para mejor rendimiento
        if ('IntersectionObserver' in window && animatedElements.length > 0) {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animar cuando sea visible
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Dejar de observar una vez animado
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Configurar elementos y observar
            animatedElements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                element.style.willChange = 'opacity, transform';
                
                observer.observe(element);
            });
        } else {
            // Fallback para navegadores sin soporte
            animatedElements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            });
            
            let scrollThrottleTimeout;
            function scrollHandler() {
                if (scrollThrottleTimeout) return;
                
                scrollThrottleTimeout = setTimeout(() => {
                    const scrollPosition = window.scrollY + window.innerHeight * 0.8;
                    
                    animatedElements.forEach(element => {
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                        
                        if (scrollPosition > elementPosition) {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                        }
                    });
                    
                    scrollThrottleTimeout = null;
                }, 100);
            }
            
            // Ejecutar una vez y agregar listener
            scrollHandler();
            window.addEventListener('scroll', scrollHandler);
        }
    }
    
    // Slider de testimonios optimizado
    function initTestimonialSlider() {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        const sliderContainer = document.querySelector('.testimonials-slider');
        
        if (testimonialItems.length > 1 && sliderContainer) {
            // Crear navegación con puntos
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'slider-dots';
            
            testimonialItems.forEach((item, index) => {
                const dot = document.createElement('span');
                dot.className = 'slider-dot';
                if (index === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    // Eliminar clase activa de todos los items y puntos
                    testimonialItems.forEach(tItem => tItem.classList.remove('active'));
                    dotsContainer.querySelectorAll('.slider-dot').forEach(d => d.classList.remove('active'));
                    
                    // Añadir clase activa al seleccionado
                    testimonialItems[index].classList.add('active');
                    dot.classList.add('active');
                    
                    // Mostrar el seleccionado
                    testimonialItems.forEach((item, i) => {
                        if (i === index) {
                            item.style.display = 'block';
                            item.style.opacity = '1';
                        } else {
                            item.style.display = 'none';
                            item.style.opacity = '0';
                        }
                    });
                });
                
                dotsContainer.appendChild(dot);
            });
            
            sliderContainer.appendChild(dotsContainer);
            
            // Mostrar solo el primer item por defecto
            testimonialItems.forEach((item, index) => {
                if (index === 0) {
                    item.classList.add('active');
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                }
            });
            
            // Cambio automático optimizado
            let currentIndex = 0;
            let slideshowTimeout;
            
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
                
                // Animar con opacity
                requestAnimationFrame(() => {
                    testimonialItems[currentIndex].style.opacity = '1';
                });
                
                dotsContainer.querySelectorAll('.slider-dot')[currentIndex].classList.add('active');
                
                // Usar menos frecuente cambio en móviles para ahorrar batería
                const interval = isMobile ? 8000 : 6000;
                slideshowTimeout = setTimeout(switchTestimonial, interval);
            }
            
            // Iniciar slideshow con retraso
            slideshowTimeout = setTimeout(switchTestimonial, 6000);
            
            // Detener slideshow al interactuar
            sliderContainer.addEventListener('mouseenter', () => {
                clearTimeout(slideshowTimeout);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                slideshowTimeout = setTimeout(switchTestimonial, 6000);
            });
        }
    }
});