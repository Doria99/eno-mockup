/**
 * Osteria del Chianti - Script principale
 * 
 * Questo file contiene tutte le funzionalità JavaScript del sito web dell'Osteria del Chianti.
 * Include la gestione del menu mobile, lo smooth scrolling, l'ottimizzazione per dispositivi touch,
 * il lazy loading delle immagini, l'effetto di caricamento progressivo, la gestione del tema scuro,
 * e l'integrazione con il service worker per le funzionalità offline.
 *
 * @author Osteria del Chianti Dev Team
 * @version 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inizializza il sistema di internazionalizzazione
    if (window.i18n) {
        const savedLanguage = localStorage.getItem('language') || 'it';
        window.i18n.changeLanguage(savedLanguage);
        
        // Aggiorna i dati strutturati in base alla lingua
        updateStructuredData(savedLanguage);
        
        // Aggiorna i dati strutturati quando cambia la lingua
        document.addEventListener('languageChanged', function(e) {
            updateStructuredData(e.detail.language);
        });
    }
    
    /**
     * Gestione del menu mobile
     * 
     * Crea e gestisce il menu mobile per la navigazione su dispositivi con schermi piccoli.
     * Include la creazione dinamica del menu, la gestione dell'apertura/chiusura e
     * l'accessibilità da tastiera.
     */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Crea il menu mobile se non esiste
            if (!document.querySelector('.mobile-nav')) {
                const mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                mobileNav.setAttribute('role', 'navigation');
                mobileNav.setAttribute('aria-label', 'Menu mobile');

                // Clona il menu di navigazione
                const navClone = document.querySelector('nav ul').cloneNode(true);

                // Aggiungi il pulsante di chiusura
                const closeBtn = document.createElement('div');
                closeBtn.className = 'close-menu';
                closeBtn.setAttribute('role', 'button');
                closeBtn.setAttribute('aria-label', 'Chiudi menu');
                closeBtn.setAttribute('tabindex', '0');
                closeBtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';

                mobileNav.appendChild(closeBtn);
                mobileNav.appendChild(navClone);
                
                // Aggiungi il selettore della lingua al menu mobile
                if (window.i18n) {
                    const langContainer = document.createElement('div');
                    langContainer.id = 'mobile-language-container';
                    langContainer.className = 'language-selector';
                    mobileNav.appendChild(langContainer);
                    
                    // Crea il selettore della lingua per il menu mobile
                    window.i18n.createLanguageSelector('mobile-language-container', [
                        {code: 'it', name: 'Italiano'},
                        {code: 'en', name: 'English'}
                    ]);
                }
                
                body.appendChild(mobileNav);

                // Gestisci la chiusura del menu
                closeBtn.addEventListener('click', function() {
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = ''; // Ripristina lo scrolling
                });
                closeBtn.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        mobileNav.classList.remove('active');
                        document.body.style.overflow = ''; // Ripristina lo scrolling
                    }
                });

                // Chiudi il menu quando si clicca su un link
                const mobileLinks = mobileNav.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileNav.classList.remove('active');
                        document.body.style.overflow = ''; // Ripristina lo scrolling
                    });
                });
            }

            // Mostra il menu mobile
            const mobileNav = document.querySelector('.mobile-nav');
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // Previene lo scrolling quando il menu è aperto
        });
    }
    
    /**
     * Smooth scrolling per i link interni
     * 
     * Implementa lo scorrimento fluido quando si clicca su link che puntano ad ancore
     * all'interno della stessa pagina, migliorando l'esperienza utente.
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /**
     * Ottimizzazione per dispositivi touch
     * 
     * Rileva i dispositivi touch e aggiunge effetti di feedback visivo specifici
     * per migliorare l'esperienza utente su smartphone e tablet.
     */
    if (window.matchMedia('(pointer: coarse)').matches) {
        // Siamo su un dispositivo touch
        const touchElements = document.querySelectorAll('.piatto, .btn-prenota, nav a');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, {passive: true});
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            }, {passive: true});
        });
    }

    /**
     * Lazy loading delle immagini
     * 
     * Implementa il caricamento differito delle immagini per migliorare le prestazioni
     * della pagina, utilizzando sia l'API nativa del browser quando disponibile,
     * sia un'implementazione personalizzata come fallback.
     */
    if ('loading' in HTMLImageElement.prototype) {
        // Il browser supporta lazy-loading nativo
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            // Assicurati che tutte le immagini abbiano width e height
            if (!img.getAttribute('width') && !img.getAttribute('height')) {
                img.setAttribute('width', '100%');
                img.setAttribute('height', 'auto');
            }
        });
    } else {
        // Fallback per browser che non supportano lazy-loading nativo
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);

        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.classList.add('lazyload');
            img.setAttribute('data-src', img.src);
            img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        });
    }

    // Animazione per gli elementi quando entrano nel viewport - ottimizzata con IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // Smetti di osservare l'elemento dopo l'animazione
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Imposta lo stile iniziale per gli elementi da animare
        const elementsToAnimate = document.querySelectorAll('.piatto, .recensione-box, .prenota-content');
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    } else {
        // Fallback per browser che non supportano IntersectionObserver
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.piatto, .recensione-box, .prenota-content');

            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (elementPosition < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // Imposta lo stile iniziale per gli elementi da animare
        const elementsToAnimate = document.querySelectorAll('.piatto, .recensione-box, .prenota-content');
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        // Esegui l'animazione al caricamento e allo scroll
        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
    }

    // Prefetch delle pagine principali per migliorare la navigazione
    const prefetchLinks = () => {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => {
                const links = ['menu.html', 'chi-siamo.html', 'contatti.html', 'prenota.html'];
                links.forEach(url => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = url;
                    document.head.appendChild(link);
                });
            });
        }
    };

    // Esegui il prefetch dopo che la pagina è completamente caricata
    window.addEventListener('load', prefetchLinks);
    
    /**
     * Aggiorna i dati strutturati in base alla lingua selezionata
     * 
     * Modifica i dati strutturati JSON-LD in base alla lingua corrente
     * per garantire che i motori di ricerca ricevano informazioni localizzate.
     * 
     * @param {string} lang - Codice della lingua (it, en)
     */
    function updateStructuredData(lang) {
        const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
        
        if (jsonLdScripts.length === 0) return;
        
        jsonLdScripts.forEach(script => {
            try {
                const data = JSON.parse(script.textContent);
                
                // Traduci i campi in base al tipo di schema
                if (data['@type'] === 'Restaurant') {
                    if (lang === 'en') {
                        // Traduci in inglese
                        if (data.name === 'Osteria del Chianti') {
                            data.description = 'Authentic Tuscan cuisine in the heart of Chianti. Traditional dishes prepared with fresh, local ingredients.';
                        }
                        if (data.servesCuisine && Array.isArray(data.servesCuisine)) {
                            data.servesCuisine = data.servesCuisine.map(cuisine => 
                                cuisine === 'Toscana' ? 'Tuscan' : 
                                cuisine === 'Italiana' ? 'Italian' : cuisine
                            );
                        }
                    } else {
                        // Ripristina l'italiano
                        if (data.name === 'Osteria del Chianti') {
                            data.description = 'Autentica cucina toscana nel cuore del Chianti. Piatti tradizionali preparati con ingredienti freschi e locali.';
                        }
                        if (data.servesCuisine && Array.isArray(data.servesCuisine)) {
                            data.servesCuisine = data.servesCuisine.map(cuisine => 
                                cuisine === 'Tuscan' ? 'Toscana' : 
                                cuisine === 'Italian' ? 'Italiana' : cuisine
                            );
                        }
                    }
                }
                
                // Aggiorna lo script con i dati tradotti
                script.textContent = JSON.stringify(data);
            } catch (error) {
                console.error('Errore nell\'aggiornamento dei dati strutturati:', error);
            }
        });
    }
});