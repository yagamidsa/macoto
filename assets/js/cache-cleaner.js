// cache-cleaner.js
// Script para borrar cookies, caché y datos almacenados cada vez que se carga la página

(function() {
    console.log("Iniciando limpieza de caché y cookies...");
    
    // 1. Borrar todas las cookies
    function deleteAllCookies() {
        const cookies = document.cookie.split(";");
        
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname;
        }
        
        console.log("Cookies borradas");
    }
    
    // 2. Borrar localStorage
    function clearLocalStorage() {
        try {
            localStorage.clear();
            console.log("localStorage borrado");
        } catch (e) {
            console.log("Error al borrar localStorage:", e);
        }
    }
    
    // 3. Borrar sessionStorage
    function clearSessionStorage() {
        try {
            sessionStorage.clear();
            console.log("sessionStorage borrado");
        } catch (e) {
            console.log("Error al borrar sessionStorage:", e);
        }
    }
    
    // 4. Agregar parámetro único a la URL para evitar caché
    function addNoCacheParam() {
        if (window.location.search.indexOf('nocache') === -1) {
            // Solo añadir si no está ya
            const timestamp = new Date().getTime();
            const currentUrl = window.location.href;
            const separator = currentUrl.indexOf('?') !== -1 ? '&' : '?';
            
            // Almacenar que ya hemos ejecutado la limpieza en esta sesión
            try {
                sessionStorage.setItem('cacheCleared', 'true');
            } catch (e) {
                // Si falla sessionStorage, usar una variable global
                window.CACHE_CLEARED = true;
            }
            
            // No redirigir si venimos de una recarga forzada
            if (document.referrer === currentUrl || 
                document.referrer === currentUrl + separator + 'nocache=' + (timestamp - 1)) {
                console.log("No redirigiendo, parece una recarga reciente");
                return;
            }
            
            // Solo redirigir si no hemos limpiado el caché antes
            let alreadyCleared = false;
            try {
                alreadyCleared = sessionStorage.getItem('cacheCleared') === 'true';
            } catch (e) {
                alreadyCleared = window.CACHE_CLEARED === true;
            }
            
            if (!alreadyCleared) {
                console.log("Redirigiendo con parámetro nocache...");
                window.location.href = currentUrl + separator + 'nocache=' + timestamp;
            }
        } else {
            console.log("Ya tenemos parámetro nocache, no redirigiendo");
        }
    }
    
    // 5. Forzar recarga sin caché si es la primera vez
    function forceRefresh() {
        // Si no hay un parámetro nocache, pero es la primera carga de la página
        if (window.location.search.indexOf('nocache') === -1 && 
            !sessionStorage.getItem('pageLoaded')) {
            
            // Marcar que la página se ha cargado
            sessionStorage.setItem('pageLoaded', 'true');
            
            // Recargar la página con bypass de caché
            console.log("Forzando recarga sin caché...");
            window.location.reload(true);
        }
    }
    
    // 6. Agregar encabezados meta para controlar caché
    function addNoCacheMetaTags() {
        // Crear meta tags para no cachear
        const metaCache = document.createElement('meta');
        metaCache.setAttribute('http-equiv', 'Cache-Control');
        metaCache.setAttribute('content', 'no-cache, no-store, must-revalidate');
        
        const metaPragma = document.createElement('meta');
        metaPragma.setAttribute('http-equiv', 'Pragma');
        metaPragma.setAttribute('content', 'no-cache');
        
        const metaExpires = document.createElement('meta');
        metaExpires.setAttribute('http-equiv', 'Expires');
        metaExpires.setAttribute('content', '0');
        
        // Insertar meta tags
        if (document.head) {
            document.head.appendChild(metaCache);
            document.head.appendChild(metaPragma);
            document.head.appendChild(metaExpires);
            console.log("Meta tags de no-cache agregados");
        }
    }
    
    // Ejecutar todas las funciones de limpieza
    deleteAllCookies();
    clearLocalStorage();
    clearSessionStorage();
    addNoCacheMetaTags();
    addNoCacheParam();
    
    // Si nada funciona, mostrar instrucciones al usuario
    console.log("----------------------------------------");
    console.log("Si sigues sin ver los cambios, por favor:");
    console.log("1. Abre las herramientas de desarrollador (F12)");
    console.log("2. Haz clic derecho en el botón de recarga");
    console.log("3. Selecciona 'Vaciar caché y recargar forzadamente'");
    console.log("----------------------------------------");
    
})();