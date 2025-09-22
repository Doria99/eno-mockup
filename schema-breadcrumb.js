/**
 * Osteria del Chianti - Schema.org Breadcrumb
 *
 * Questo file contiene funzioni per aggiungere automaticamente dati strutturati BreadcrumbList
 * a tutte le pagine del sito web dell'Osteria del Chianti.
 *
 * @author Osteria del Chianti Dev Team
 * @version 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
  // Aggiungi breadcrumb strutturati alla pagina corrente
  addBreadcrumbStructuredData();

  // Aggiorna i breadcrumb quando cambia la lingua
  if (window.i18n) {
    document.addEventListener('languageChanged', function(e) {
      updateBreadcrumbStructuredData(e.detail.language);
    });
  }
});

/**
 * Aggiunge dati strutturati BreadcrumbList alla pagina corrente
 */
function addBreadcrumbStructuredData() {
  // Ottieni il percorso della pagina corrente
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop();
  const lang = document.documentElement.lang || 'it';

  // Crea l'oggetto breadcrumb
  const breadcrumbData = createBreadcrumbData(pageName, lang);

  // Verifica se esiste già un breadcrumb strutturato
  let breadcrumbScript = document.querySelector('script[data-breadcrumb="true"]');

  if (!breadcrumbScript) {
    // Crea un nuovo script se non esiste
    breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.setAttribute('data-breadcrumb', 'true');
    document.head.appendChild(breadcrumbScript);
  }

  // Aggiorna il contenuto dello script
  breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
}

/**
 * Aggiorna i dati strutturati BreadcrumbList in base alla lingua
 *
 * @param {string} lang - Codice della lingua (it, en)
 */
function updateBreadcrumbStructuredData(lang) {
  const breadcrumbScript = document.querySelector('script[data-breadcrumb="true"]');
  if (!breadcrumbScript) {return;}

  try {
    const data = JSON.parse(breadcrumbScript.textContent);
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();

    // Aggiorna il breadcrumb con la nuova lingua
    const updatedData = createBreadcrumbData(pageName, lang);
    breadcrumbScript.textContent = JSON.stringify(updatedData);
  } catch (error) {
    console.error('Errore nell\'aggiornamento dei breadcrumb strutturati:', error);
  }
}

/**
 * Crea l'oggetto dati strutturati BreadcrumbList
 *
 * @param {string} pageName - Nome del file della pagina corrente
 * @param {string} lang - Codice della lingua (it, en)
 * @returns {Object} Oggetto dati strutturati BreadcrumbList
 */
function createBreadcrumbData(pageName, lang) {
  const baseUrl = 'https://www.osteriadelchianti.it';
  const breadcrumbItems = [];

  // Aggiungi sempre la home come primo elemento
  breadcrumbItems.push({
    '@type': 'ListItem',
    'position': 1,
    'name': lang === 'en' ? 'Home' : 'Home',
    'item': baseUrl + '/index.html'
  });

  // Aggiungi la pagina corrente se non è la home
  if (pageName !== 'index.html' && pageName !== '') {
    let pageTitle = '';
    let pageUrl = baseUrl + '/' + pageName;

    // Determina il titolo della pagina in base al nome del file e alla lingua
    switch (pageName) {
    case 'menu.html':
      pageTitle = lang === 'en' ? 'Menu' : 'Menu';
      break;
    case 'chi-siamo.html':
      pageTitle = lang === 'en' ? 'About Us' : 'Chi Siamo';
      break;
    case 'contatti.html':
      pageTitle = lang === 'en' ? 'Contact' : 'Contatti';
      break;
    case 'prenota.html':
      pageTitle = lang === 'en' ? 'Book a Table' : 'Prenota un Tavolo';
      break;
    default:
      pageTitle = pageName.replace('.html', '');
    }

    breadcrumbItems.push({
      '@type': 'ListItem',
      'position': 2,
      'name': pageTitle,
      'item': pageUrl
    });
  }

  // Crea l'oggetto BreadcrumbList
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems
  };
}