/**
 * Función optimizada para scroll de navegación
 * Esta función reemplaza el comportamiento de scroll predeterminado
 * para evitar trabados y mejorar el rendimiento
 */

function installSmoothScrolling() {
    // Obtener todos los enlaces que apuntan a anclajes internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Prevenir el comportamiento de enlace predeterminado
            e.preventDefault();

            // Obtener el destino
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignorar enlaces vacíos

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return; // Salir si no se encuentra el elemento

            // Obtener la posición del elemento
            const headerOffset = 80; // Altura del header fijo
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Usar scrollTo directo sin comportamiento suave
            window.scrollTo({
                top: offsetPosition,
                behavior: 'auto' // Usar 'auto' en lugar de 'smooth'
            });

            // Actualizar URL sin recargar (opcional, para mantener la usabilidad)
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId; // Fallback
            }

            // Si existe un menú móvil abierto, cerrarlo
            const mobileNav = document.querySelector('nav.active');
            const mobileToggle = document.querySelector('.mobile-toggle');
            if (mobileNav) {
                mobileNav.classList.remove('active');
                if (mobileToggle) mobileToggle.textContent = '☰';
            }
        });
    });

    // También desactivar cualquier smooth scroll existente
    document.documentElement.style.scrollBehavior = 'auto';

    // Arreglo para el scroll trabado en Safari y algunos navegadores móviles
    window.addEventListener('scroll', function () {
        // Este es un truco para forzar una actualización en el navegador
        // y evitar el comportamiento "elástico" que causa trabados
        document.body.style.pointerEvents = 'none';
        setTimeout(() => {
            document.body.style.pointerEvents = 'auto';
        }, 100);
    }, { passive: true }); // Usar passive: true para mejor rendimiento
}

// Instalar la solución una vez que el DOM esté listo
document.addEventListener('DOMContentLoaded', installSmoothScrolling);

// Asegurarse de que también funcione después de AJAX o cambios dinámicos
window.addEventListener('load', installSmoothScrolling);