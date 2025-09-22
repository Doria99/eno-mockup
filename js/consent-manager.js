/**
 * Gestore del consenso per analytics - Osteria del Chianti
 * 
 * Questo script fornisce un'interfaccia utente semplice per gestire il consenso
 * agli analytics rispettosi della privacy. Anche se Plausible non richiede consenso
 * per il GDPR, questo componente offre massima trasparenza agli utenti.
 */

// Stili CSS per il banner del consenso
const consentStyles = `
  .consent-banner {
    position: fixed;
    bottom: 20px;
    left: 20px;
    max-width: 375px;
    background-color: var(--color-light);
    border: 1px solid var(--color-secondary);
    border-radius: 8px;
    padding: 15px 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    font-family: var(--font-secondary);
    display: none;
  }

  .consent-banner h3 {
    font-family: var(--font-primary);
    color: var(--color-primary);
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  .consent-banner p {
    margin-bottom: 15px;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .consent-buttons {
    display: flex;
    gap: 10px;
  }

  .consent-btn {
    padding: 8px 15px;
    border-radius: 4px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }

  .consent-accept {
    background-color: var(--color-primary);
    color: white;
  }

  .consent-accept:hover {
    background-color: var(--color-accent);
  }

  .consent-decline {
    background-color: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
  }

  .consent-decline:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

// Funzione per creare e mostrare il banner del consenso
function showConsentBanner() {
  // Verifica se l'utente ha già espresso una preferenza
  if (localStorage.getItem('analytics-consent-shown') === 'true') {
    return;
  }

  // Aggiungi gli stili CSS
  const styleEl = document.createElement('style');
  styleEl.textContent = consentStyles;
  document.head.appendChild(styleEl);

  // Crea il banner
  const banner = document.createElement('div');
  banner.className = 'consent-banner';
  banner.innerHTML = `
    <h3>Rispettiamo la tua privacy</h3>
    <p>Utilizziamo strumenti di analytics rispettosi della privacy che non raccolgono dati personali e non utilizzano cookie di tracciamento.</p>
    <div class="consent-buttons">
      <button class="consent-btn consent-accept">Accetto</button>
      <button class="consent-btn consent-decline">Non accetto</button>
    </div>
  `;

  // Aggiungi il banner al documento
  document.body.appendChild(banner);

  // Mostra il banner con un leggero ritardo
  setTimeout(() => {
    banner.style.display = 'block';
  }, 1500);

  // Gestisci il click sul pulsante di accettazione
  banner.querySelector('.consent-accept').addEventListener('click', () => {
    if (window.privacyAnalytics) {
      window.privacyAnalytics.setConsent(true);
    }
    localStorage.setItem('analytics-consent-shown', 'true');
    localStorage.setItem('analytics-consent', 'true');
    banner.style.display = 'none';
  });

  // Gestisci il click sul pulsante di rifiuto
  banner.querySelector('.consent-decline').addEventListener('click', () => {
    if (window.privacyAnalytics) {
      window.privacyAnalytics.setConsent(false);
    }
    localStorage.setItem('analytics-consent-shown', 'true');
    localStorage.setItem('analytics-consent', 'false');
    banner.style.display = 'none';
  });
}

// Inizializza il gestore del consenso al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
  // Mostra il banner del consenso dopo un breve ritardo
  setTimeout(showConsentBanner, 2000);
});