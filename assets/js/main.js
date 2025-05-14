// MACOTO - Intermediarios de Seguros
// Archivo JavaScript principal - Versión Optimizada para mejor rendimiento

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    
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

    // *** IMPORTANTE: La funcionalidad de scroll ha sido movida a smooth-navigation.js ***

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

        // Parallax de fondo en scroll optimizado - DESHABILITADO en móviles para mejorar rendimiento
        if (!isMobile) {
            window.addEventListener('scroll', function() {
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
    }
    
    // Partículas optimizadas (menos y más eficientes)
    function initOptimizedParticles() {
        const servicesSection = document.querySelector('.services');
        
        if (servicesSection && !isMobile) {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'services-particles';
            servicesSection.appendChild(particlesContainer);
            
            // Reducir el número de partículas para mejor rendimiento
            const particleCount = isMobile ? 8 : 15; // Reducido aún más
            
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
        const size = Math.random() * 2 + 1; // Tamaños más pequeños
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Opacidad reducida
        particle.style.opacity = Math.random() * 0.2 + 0.05; // Menos visible
        
        // Usar will-change y transform3d para mejor rendimiento
        particle.style.willChange = 'transform';
        particle.style.transform = 'translate3d(0, 0, 0)';
        
        // Animación más lenta para mejor rendimiento
        const animDuration = Math.random() * 25 + 20; // Más lento
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
                    const rotateY = cardX * 0.003; // Efecto más sutil
                    const rotateX = -cardY * 0.003; // Efecto más sutil
                    
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
                element.style.opacity = '1'; // Mostrar de inmediato en fallback
                element.style.transform = 'none'; // No aplicar transformación
            });
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
            dotsContainer.style.display = 'flex';
            dotsContainer.style.justifyContent = 'center';
            dotsContainer.style.marginTop = '20px';
            
            testimonialItems.forEach((item, index) => {
                const dot = document.createElement('span');
                dot.className = 'slider-dot';
                dot.style.width = '12px';
                dot.style.height = '12px';
                dot.style.borderRadius = '50%';
                dot.style.background = 'rgba(100, 255, 218, 0.3)';
                dot.style.margin = '0 5px';
                dot.style.cursor = 'pointer';
                dot.style.transition = 'all 0.3s ease';
                
                if (index === 0) {
                    dot.style.background = 'rgba(100, 255, 218, 0.9)';
                    dot.style.transform = 'scale(1.2)';
                }
                
                dot.addEventListener('click', () => {
                    // Eliminar clase activa de todos los puntos
                    dotsContainer.querySelectorAll('.slider-dot').forEach(d => {
                        d.style.background = 'rgba(100, 255, 218, 0.3)';
                        d.style.transform = 'scale(1)';
                    });
                    
                    // Añadir clase activa al seleccionado
                    dot.style.background = 'rgba(100, 255, 218, 0.9)';
                    dot.style.transform = 'scale(1.2)';
                    
                    // Mostrar el testimonio seleccionado
                    testimonialItems.forEach((item, i) => {
                        if (i === index) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
                
                dotsContainer.appendChild(dot);
            });
            
            sliderContainer.appendChild(dotsContainer);
            
            // Mostrar solo el primer item por defecto
            testimonialItems.forEach((item, index) => {
                if (index === 0) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
            
            // Cambio automático optimizado
            let currentIndex = 0;
            let slideshowTimeout;
            
            function switchTestimonial() {
                // Incrementar índice
                currentIndex = (currentIndex + 1) % testimonialItems.length;
                
                // Actualizar puntos
                dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
                    if (i === currentIndex) {
                        dot.style.background = 'rgba(100, 255, 218, 0.9)';
                        dot.style.transform = 'scale(1.2)';
                    } else {
                        dot.style.background = 'rgba(100, 255, 218, 0.3)';
                        dot.style.transform = 'scale(1)';
                    }
                });
                
                // Ocultar el testimonio actual
                testimonialItems.forEach(item => {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                });
                
                // Mostrar el nuevo testimonio
                setTimeout(() => {
                    testimonialItems[currentIndex].style.display = 'block';
                    
                    // Forzar reflow
                    testimonialItems[currentIndex].offsetHeight;
                    
                    testimonialItems[currentIndex].style.opacity = '1';
                }, 350);
                
                // Programar siguiente cambio (más lento)
                slideshowTimeout = setTimeout(switchTestimonial, isMobile ? 8000 : 6000);
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