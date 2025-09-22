/**
 * Osteria del Chianti - Internazionalizzazione
 *
 * Questo file gestisce la funzionalità multilingua del sito web dell'Osteria del Chianti.
 * Include il caricamento delle traduzioni, il cambio di lingua e la persistenza della preferenza dell'utente.
 *
 * @author Osteria del Chianti Dev Team
 * @version 1.0.0
 */

let translations = {};
let currentLanguage = localStorage.getItem('language') || 'it';

/**
 * Carica le traduzioni per la lingua specificata
 * @param {string} lang - Codice della lingua (it, en)
 * @returns {Promise} - Promise che si risolve quando le traduzioni sono caricate
 */
async function loadTranslations(lang) {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {throw new Error(`Errore nel caricamento delle traduzioni: ${response.status}`);}
    translations = await response.json();
    return translations;
  } catch (error) {
    console.error('Errore nel caricamento delle traduzioni:', error);
    // Fallback alle traduzioni italiane se c'è un errore
    if (lang !== 'it') {return loadTranslations('it');}
    return {};
  }
}

/**
 * Cambia la lingua corrente e aggiorna l'interfaccia
 * @param {string} lang - Codice della lingua (it, en)
 * @returns {Promise} - Promise che si risolve quando la lingua è cambiata
 */
async function changeLanguage(lang) {
  if (lang === currentLanguage) {return;}

  try {
    await loadTranslations(lang);
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateInterface();
    document.documentElement.lang = lang;

    // Aggiorna il selettore della lingua se presente
    const langSelector = document.querySelector('#language-selector');
    if (langSelector) {langSelector.value = lang;}

    // Evento personalizzato per notificare il cambio lingua
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  } catch (error) {
    console.error('Errore nel cambio lingua:', error);
  }
}

/**
 * Ottiene una traduzione in base alla chiave
 * @param {string} key - Chiave della traduzione (formato: 'section.key')
 * @returns {string} - Testo tradotto o chiave originale se non trovata
 */
function t(key) {
  const keys = key.split('.');
  let result = translations;

  for (const k of keys) {
    if (result && result[k]) {
      result = result[k];
    } else {
      return key; // Ritorna la chiave se la traduzione non è trovata
    }
  }

  return typeof result === 'string' ? result : key;
}

/**
 * Aggiorna tutti gli elementi dell'interfaccia con le traduzioni
 */
function updateInterface() {
  // Aggiorna gli elementi con attributo data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = t(key);
  });

  // Aggiorna gli elementi con attributo data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = t(key);
  });

  // Aggiorna gli elementi con attributo data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    const key = element.getAttribute('data-i18n-title');
    element.title = t(key);
  });

  // Aggiorna gli elementi con attributo data-i18n-html
  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const key = element.getAttribute('data-i18n-html');
    element.innerHTML = t(key);
  });
}

/**
 * Crea il selettore della lingua nell'interfaccia
 * @param {string} containerId - ID del contenitore dove inserire il selettore
 * @param {Array} languages - Array di oggetti lingua {code, name}
 */
function createLanguageSelector(containerId, languages = [{code: 'it', name: 'Italiano'}, {code: 'en', name: 'English'}]) {
  const container = document.getElementById(containerId);
  if (!container) {return;}

  const select = document.createElement('select');
  select.id = 'language-selector';
  select.setAttribute('aria-label', 'Seleziona lingua');

  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    if (lang.code === currentLanguage) {option.selected = true;}
    select.appendChild(option);
  });

  select.addEventListener('change', (e) => changeLanguage(e.target.value));
  container.appendChild(select);
}

/**
 * Inizializza il sistema di internazionalizzazione
 */
async function initI18n() {
  await loadTranslations(currentLanguage);
  document.documentElement.lang = currentLanguage;
  updateInterface();
}

// Inizializza quando il DOM è caricato
document.addEventListener('DOMContentLoaded', initI18n);

// Esporta le funzioni per l'uso globale
window.i18n = {
  t,
  changeLanguage,
  getCurrentLanguage: () => currentLanguage,
  createLanguageSelector
};