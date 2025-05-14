/**
 * MACOTO - Navegación suave mejorada
 * Este script proporciona una navegación más suave entre las secciones
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos de navegación (tanto el menú principal como los enlaces del footer)
    const navLinks = document.querySelectorAll('nav ul li a, .footer-col ul li a[href^="#"]');
    
    // Configuración de la velocidad de desplazamiento (mayor número = más lento)
    const scrollDuration = 800; // en milisegundos
    
    // Desplazamiento suave personalizado
    function smoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        // Cerrar menú móvil si está abierto
        const nav = document.querySelector('nav');
        const mobileToggle = document.querySelector('.mobile-toggle');
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (mobileToggle) mobileToggle.textContent = '☰';
        }
        
        // Calcular posición de inicio y distancia a recorrer
        const headerOffset = 80; // compensar la altura del header fijo
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        
        let startTime = null;
        
        // Función de animación con curva de aceleración/desaceleración
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Función de aceleración/desaceleración para un movimiento más natural
            // (esta función comienza lento, acelera en el medio y desacelera al final)
            const ease = function(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            };
            
            window.scrollTo(0, startPosition + distance * ease(progress));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                // Actualizar URL sin recargar la página (opcional)
                if (history.pushState) {
                    history.pushState(null, null, target);
                }
                
                // Actualizar clases activas de navegación
                updateActiveNavLink();
            }
        }
        
        // Iniciar animación
        requestAnimationFrame(animation);
    }
    
    // Agregar eventos de clic a todos los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Solo aplicar a enlaces de anclaje internos
            if (targetId.startsWith('#')) {
                smoothScroll(targetId, scrollDuration);
            }
        });
    });
    
    // Función para actualizar el enlace activo según la posición de scroll
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150; // Compensación para detectar mejor la sección actual
        const menuLinks = document.querySelectorAll('nav ul li a'); // Solo aplicar al menú principal
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = '#' + section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Actualizar enlace activo al cargar la página
    updateActiveNavLink();
    
    // Actualizar enlace activo al hacer scroll (con limitación de frecuencia)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(function() {
            updateActiveNavLink();
            scrollTimeout = null;
        }, 100);
    });
});