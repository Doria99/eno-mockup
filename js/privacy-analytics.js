/**
 * Configurazione Plausible Analytics - Soluzione rispettosa della privacy
 * 
 * Questo script configura Plausible Analytics, uno strumento di analisi web
 * che rispetta la privacy degli utenti e non utilizza cookie.
 * 
 * Caratteristiche principali:
 * - Non raccoglie dati personali
 * - Non utilizza cookie
 * - Conforme al GDPR e non richiede banner per i cookie
 * - Leggero e veloce (< 1KB)
 * - Open source
 */

// Funzione per inizializzare Plausible Analytics
function initPrivacyAnalytics() {
  // Verifica se l'utente ha dato il consenso (opzionale, Plausible non richiede consenso per GDPR)
  const hasConsent = localStorage.getItem('analytics-consent') === 'true';
  
  // Plausible non richiede consenso per GDPR, ma possiamo comunque rispettare la scelta dell'utente
  if (hasConsent !== false) {
    // Crea lo script di Plausible
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = 'osteriadelchianti.it'; // Sostituire con il dominio effettivo
    script.src = 'https://plausible.io/js/script.js';
    
    // Aggiungi lo script al documento
    document.head.appendChild(script);
    
    console.log('Analytics rispettosi della privacy inizializzati');
  }
}

// Funzione per gestire il consenso dell'utente (opzionale)
function setAnalyticsConsent(consent) {
  localStorage.setItem('analytics-consent', consent);
  
  // Se l'utente ha dato il consenso, inizializza analytics
  if (consent === true) {
    initPrivacyAnalytics();
  } else {
    console.log('Analytics rispettosi della privacy disabilitati per scelta dell\'utente');
  }
}

// Inizializza analytics al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
  initPrivacyAnalytics();
});

// Esponi funzioni per gestire il consenso (opzionale)
window.privacyAnalytics = {
  setConsent: setAnalyticsConsent
};