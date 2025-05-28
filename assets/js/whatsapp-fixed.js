// Header fijo con efecto blur y botón de WhatsApp - Versión optimizada para móviles
// Corrige el solapamiento en dispositivos móviles y resuelve problemas en todos los dispositivos

(function() {
    console.log("Inicializando header fijo con blur y botón WhatsApp - Versión optimizada para móviles...");
    
    // 1. CREAR ESTILOS CSS MEJORADOS PARA DIFERENTES TAMAÑOS DE PANTALLA
    const style = document.createElement('style');
    style.id = 'fixed-header-whatsapp-styles-mobile-optimized';
    style.innerHTML = `
        /* Estilos para el header fijo con efecto blur */
        header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            z-index: 9999 !important;
            background-color: rgba(10, 25, 47, 0.8) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
            transition: all 0.3s ease !important;
        }
        
        /* Asegurar que la primera sección tenga suficiente padding-top para compensar el header fijo */
        section:first-of-type {
            padding-top: 100px !important;
        }
        
        /* Reducir tamaño del header al hacer scroll */
        header.scrolled {
            padding: 10px 0 !important;
            background-color: rgba(10, 25, 47, 0.9) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
        }
        
        /* Estilo básico para el botón de WhatsApp - se posicionará según el dispositivo */
        #whatsapp-header-container {
            position: absolute !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            z-index: 1000 !important;
            width: 40px !important;
            height: 40px !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            transition: all 0.3s ease !important;
        }
        
        /* DESKTOP: Posicionamiento para escritorio grande */
        @media screen and (min-width: 1367px) {
            #whatsapp-header-container {
                right: 20px !important;
            }
            
            /* Asegurar espacio en el contenedor del header */
            header .container, .header-container {
                padding-right: 70px !important;
            }
            
            /* Añadir margen al menú de navegación para evitar solapamiento */
            nav ul {
                margin-right: 40px !important;
            }
        }
        
        /* LAPTOP: Posicionamiento específico para portátiles */
        @media screen and (min-width: 769px) and (max-width: 1366px) {
            #whatsapp-header-container {
                right: 15px !important;
            }
            
            /* Espacio extra para el contenedor del header */
            header .container, .header-container {
                padding-right: 60px !important;
            }
            
            /* Más margen para el menú de navegación */
            nav ul {
                margin-right: 50px !important;
            }
            
            /* Espacio para el último elemento del menú */
            nav ul li:last-child {
                margin-right: 10px !important;
            }
        }
        
        /* MOBILE: Posicionamiento para móviles - OPTIMIZADO PARA EVITAR SOLAPAMIENTO */
        @media screen and (max-width: 768px) {
            #whatsapp-header-container {
                right: 100px !important; /* AUMENTADO DE 70px A 100px PARA EVITAR SOLAPAMIENTO */
                width: 35px !important; /* Ligeramente más pequeño en móvil */
                height: 35px !important;
                z-index: 1000 !important;
            }
            
            /* Para móviles muy pequeños, mover aún más a la izquierda */
            @media screen and (max-width: 400px) {
                #whatsapp-header-container {
                    right: 80px !important; /* Menos margen en pantallas más pequeñas */
                }
            }
            
            /* Ocultar el botón cuando el menú móvil está abierto */
            nav.active ~ #whatsapp-header-container,
            body.mobile-menu-open #whatsapp-header-container,
            header:has(nav.active) #whatsapp-header-container {
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }
            
            /* Asegurar que el botón hamburguesa tenga un z-index mayor */
            .mobile-toggle {
                z-index: 10002 !important;
                position: relative !important;
            }
        }
        
        /* Estilos del botón de WhatsApp */
        #whatsapp-header-button {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 50% !important;
            background: rgba(10, 25, 47, 0.7) !important;
            color: #64ffda !important;
            border: 2px solid #64ffda !important;
            box-shadow: 0 0 15px rgba(100, 255, 218, 0.5) !important;
            transition: all 0.3s ease !important;
            text-decoration: none !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        #whatsapp-header-button:hover {
            background: rgba(100, 255, 218, 0.1) !important;
            transform: translateY(-3px) !important;
            box-shadow: 0 0 25px rgba(100, 255, 218, 0.8) !important;
        }
        
        #whatsapp-header-button svg {
            color: #64ffda !important;
            filter: drop-shadow(0 0 5px rgba(100, 255, 218, 0.7)) !important;
            width: 22px !important;
            height: 22px !important;
            transition: all 0.3s ease !important;
        }
        
        /* Ajustar tamaño del SVG para móvil */
        @media screen and (max-width: 768px) {
            #whatsapp-header-button svg {
                width: 20px !important;
                height: 20px !important;
            }
        }
        
        #whatsapp-header-button:hover svg {
            filter: drop-shadow(0 0 8px rgba(100, 255, 218, 0.9)) !important;
            transform: scale(1.2) !important;
        }
        
        #whatsapp-header-button::after {
            content: '' !important;
            position: absolute !important;
            top: -2px !important;
            left: -2px !important;
            right: -2px !important;
            bottom: -2px !important;
            border-radius: 50% !important;
            background: linear-gradient(120deg, #64ffda, #38a89d, #0a9396) !important;
            z-index: -1 !important;
            opacity: 0 !important;
            transition: opacity 0.3s ease !important;
            animation: gradientFlow 3s linear infinite !important;
        }
        
        #whatsapp-header-button:hover::after {
            opacity: 1 !important;
        }
        
        /* Asegurar que la animación de gradiente esté disponible */
        @keyframes gradientFlow {
            0% { background-position: 0% 50% !important; }
            50% { background-position: 100% 50% !important; }
            100% { background-position: 0% 50% !important; }
        }
    `;
    
    // 2. CREAR EL BOTÓN DE WHATSAPP
    const whatsappContainer = document.createElement('div');
    whatsappContainer.id = 'whatsapp-header-container';
    
    const whatsappButton = document.createElement('a');
    whatsappButton.id = 'whatsapp-header-button';
    whatsappButton.href = 'https://wa.me/573102759430?text=Hola%20MACOTO,%20me%20gustaría%20recibir%20más%20información%20sobre%20sus%20servicios.';
    whatsappButton.setAttribute('target', '_blank');
    whatsappButton.setAttribute('rel', 'noopener noreferrer');
    whatsappButton.setAttribute('aria-label', 'Contactar por WhatsApp');
    whatsappButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
    `;
    
    whatsappContainer.appendChild(whatsappButton);
    
    // 3. INSERTAR ESTILOS
    function addStyles() {
        if (document.head) {
            // Eliminar estilos duplicados
            const existingStyles = document.querySelectorAll('[id*="fixed-header-whatsapp-styles"]');
            existingStyles.forEach(el => el.remove());
            
            document.head.appendChild(style);
            console.log("Estilos optimizados para móviles añadidos");
        } else {
            // Reintentar si head aún no está disponible
            setTimeout(addStyles, 10);
        }
    }
    
    // 4. INSERTAR BOTÓN EN EL HEADER
    function insertWhatsAppButton() {
        // Buscar el header
        const header = document.querySelector('header');
        
        if (header) {
            // Eliminar botones WhatsApp existentes
            const existingButtons = document.querySelectorAll('#whatsapp-header-container, .whatsapp-float, .whatsapp-float-new, .whatsapp-float-forced, [href*="wa.me"]');
            existingButtons.forEach(button => {
                if (button.id !== 'whatsapp-header-button') {
                    button.remove();
                }
            });
            
            // Verificar si el botón ya existe en el header
            if (!header.querySelector('#whatsapp-header-container')) {
                // Si no existe, añadirlo
                header.appendChild(whatsappContainer);
                console.log("Botón WhatsApp insertado en el header");
            }
            
            // Ajustar posición según el tamaño de la pantalla
            updatePositionBasedOnScreenSize();
            
            return true;
        }
        
        return false;
    }
    
    // 5. CONFIGURAR EFECTO DE SCROLL Y MENÚ MÓVIL
    function setupScrollAndMenuEffects() {
        const header = document.querySelector('header');
        if (!header) return false;
        
        // Función para manejar el evento de scroll
        function handleScroll() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Aplicar inicialmente
        handleScroll();
        
        // Añadir evento de scroll
        window.addEventListener('scroll', handleScroll);
        
        // Manejo del menú móvil
        const mobileToggle = document.querySelector('.mobile-toggle');
        const nav = document.querySelector('nav');
        
        if (mobileToggle && nav) {
            mobileToggle.addEventListener('click', function() {
                document.body.classList.toggle('mobile-menu-open');
                
                // Control directo de la visibilidad del botón cuando el menú está abierto
                if (nav.classList.contains('active')) {
                    const whatsappContainer = document.getElementById('whatsapp-header-container');
                    if (whatsappContainer) {
                        whatsappContainer.style.opacity = '0';
                        whatsappContainer.style.visibility = 'hidden';
                    }
                } else {
                    const whatsappContainer = document.getElementById('whatsapp-header-container');
                    if (whatsappContainer) {
                        whatsappContainer.style.opacity = '1';
                        whatsappContainer.style.visibility = 'visible';
                    }
                }
            });
            
            // Capturar el estado inicial del menú móvil
            if (nav.classList.contains('active')) {
                document.body.classList.add('mobile-menu-open');
            }
        }
        
        return true;
    }
    
    // 6. AJUSTAR POSICIÓN SEGÚN TAMAÑO DE PANTALLA
    function updatePositionBasedOnScreenSize() {
        const width = window.innerWidth;
        const container = document.getElementById('whatsapp-header-container');
        if (!container) return;
        
        // Posicionamiento basado en el tamaño de la pantalla
        if (width <= 400) {
            // Móvil muy pequeño
            container.style.right = '80px';
            container.style.width = '35px';
            container.style.height = '35px';
        } else if (width <= 768) {
            // Móvil
            container.style.right = '100px'; // AJUSTADO PARA EVITAR SOLAPAMIENTO
            container.style.width = '35px';
            container.style.height = '35px';
        } else if (width <= 1366) {
            // Portátil
            container.style.right = '15px';
            container.style.width = '40px';
            container.style.height = '40px';
            
            // Ajustar espacios en el contenedor y menú
            const headerContainer = document.querySelector('header .container') || document.querySelector('.header-container');
            if (headerContainer) {
                headerContainer.style.paddingRight = '60px';
            }
            
            const navUl = document.querySelector('nav ul');
            if (navUl) {
                navUl.style.marginRight = '50px';
            }
        } else {
            // Escritorio grande
            container.style.right = '20px';
            container.style.width = '40px';
            container.style.height = '40px';
            
            // Ajustar espacios en el contenedor y menú
            const headerContainer = document.querySelector('header .container') || document.querySelector('.header-container');
            if (headerContainer) {
                headerContainer.style.paddingRight = '70px';
            }
            
            const navUl = document.querySelector('nav ul');
            if (navUl) {
                navUl.style.marginRight = '40px';
            }
        }
        
        console.log(`Posición del botón ajustada para ancho de pantalla: ${width}px`);
    }
    
    // 7. INICIALIZAR TODO
    function initialize() {
        // Primero añadir los estilos
        addStyles();
        
        // Intentar insertar el botón y configurar el efecto de scroll
        const buttonInserted = insertWhatsAppButton();
        const effectsSetup = setupScrollAndMenuEffects();
        
        // Si todo se ha configurado correctamente, detener la inicialización
        if (buttonInserted && effectsSetup) {
            clearInterval(initInterval);
            console.log("Header fijo con blur y botón WhatsApp inicializados correctamente - Optimizado para móviles");
        }
    }
    
    // Intentar inicializar inmediatamente
    initialize();
    
    // Si no funciona inmediatamente, intentar cada 50ms hasta que funcione
    const initInterval = setInterval(initialize, 50);
    
    // 8. VERIFICACIÓN PERIÓDICA Y EVENTO DE RESIZE
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM cargado, iniciando verificaciones y evento de resize");
        
        // Eliminar scripts antiguos
        document.querySelectorAll('script[src*="whatsapp"], script[src*="header-blur-whatsapp"]').forEach(script => {
            if (script.src.includes('whatsapp-forced.js') || 
                script.src.includes('whatsapp-immediate.js') ||
                script.src.includes('whatsapp-menu-synced.js') ||
                script.src.includes('fixed-header-blur-whatsapp.js') ||
                script.src.includes('fixed-header-blur-whatsapp-corrected.js') ||
                script.src.includes('fixed-header-blur-whatsapp-final.js')) {
                
                script.remove();
                console.log("Script antiguo eliminado:", script.src);
            }
        });
        
        // Verificar periódicamente que todo esté en su lugar
        function verifySetup() {
            const header = document.querySelector('header');
            const container = document.getElementById('whatsapp-header-container');
            const nav = document.querySelector('nav');
            
            // Verificar si el botón existe y está en el header
            if (header && (!container || !header.contains(container))) {
                console.log("El botón WhatsApp no está en el header, reinsertando...");
                insertWhatsAppButton();
            }
            
            // Verificar estado del menú móvil y ajustar visibilidad del botón
            if (nav && nav.classList.contains('active') && container) {
                container.style.opacity = '0';
                container.style.visibility = 'hidden';
            } else if (nav && !nav.classList.contains('active') && container) {
                container.style.opacity = '1';
                container.style.visibility = 'visible';
            }
            
            // Asegurar que los estilos estén presentes
            if (!document.getElementById('fixed-header-whatsapp-styles-mobile-optimized')) {
                console.log("Estilos perdidos, reinsertando...");
                addStyles();
            }
        }
        
        // Verificar cada 2 segundos
        setInterval(verifySetup, 2000);
        
        // Observador de mutaciones para detectar cambios en el menú móvil
        if (window.MutationObserver) {
            const nav = document.querySelector('nav');
            if (nav) {
                const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.attributeName === 'class') {
                            const container = document.getElementById('whatsapp-header-container');
                            if (container) {
                                if (nav.classList.contains('active')) {
                                    container.style.opacity = '0';
                                    container.style.visibility = 'hidden';
                                } else {
                                    container.style.opacity = '1';
                                    container.style.visibility = 'visible';
                                }
                            }
                        }
                    });
                });
                
                observer.observe(nav, { attributes: true });
            }
        }
        
        // Evento de resize para actualizar posición
        let resizeTimeout;
        window.addEventListener('resize', function() {
            // Usar throttling para evitar demasiadas actualizaciones
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updatePositionBasedOnScreenSize, 100);
        });
    });
})();