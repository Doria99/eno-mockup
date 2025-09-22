# Analytics Rispettosi della Privacy - Documentazione

## Panoramica

Questo documento descrive l'implementazione di analytics rispettosi della privacy nel sito web dell'Osteria del Chianti utilizzando Plausible Analytics.

## Caratteristiche principali

- **Rispetto della privacy**: Nessuna raccolta di dati personali
- **Nessun cookie**: Non utilizza cookie di tracciamento
- **Conforme al GDPR**: Non richiede banner per i cookie
- **Leggero**: Script di dimensioni ridotte (< 1KB)
- **Open source**: Codice sorgente disponibile pubblicamente

## Implementazione

L'implementazione utilizza Plausible Analytics, una soluzione di analytics alternativa a Google Analytics che rispetta la privacy degli utenti.

### File di configurazione

Il file `js/privacy-analytics.js` contiene la configurazione per Plausible Analytics. Lo script:

1. Carica Plausible Analytics in modo asincrono
2. Configura il dominio per il tracciamento
3. Offre funzionalità opzionali per la gestione del consenso

### Integrazione nelle pagine

Lo script è stato integrato in tutte le pagine principali del sito:

- `index.html` (Home)
- `prenota.html` (Prenotazioni)
- `menu.html` (Menu)
- `chi-siamo.html` (Chi Siamo)
- `contatti.html` (Contatti)

## Dati raccolti

Plausible Analytics raccoglie solo dati anonimi e aggregati:

- Pagine visitate
- Referrer (da dove provengono i visitatori)
- Dispositivo/browser (informazioni generali)
- Paese di provenienza

**Non vengono raccolti**:
- Indirizzi IP completi
- Identificatori univoci
- Dati personali
- Informazioni di contatto

## Dashboard e reportistica

Per accedere ai dati di analytics:

1. Accedere a [Plausible.io](https://plausible.io)
2. Utilizzare le credenziali dell'account Plausible
3. Selezionare il sito "osteriadelchianti.it" dalla dashboard

## Conformità GDPR

Poiché Plausible Analytics non raccoglie dati personali e non utilizza cookie, non è necessario:

- Mostrare banner per i cookie
- Richiedere il consenso esplicito dell'utente
- Implementare meccanismi di opt-out

Tuttavia, per massima trasparenza, è consigliabile menzionare l'utilizzo di analytics nella pagina della privacy policy del sito.

## Personalizzazione

Per modificare la configurazione di Plausible Analytics:

1. Aprire il file `js/privacy-analytics.js`
2. Modificare il valore di `data-domain` con il dominio effettivo del sito
3. Personalizzare le opzioni di consenso se necessario

## Supporto

Per ulteriori informazioni su Plausible Analytics, consultare la [documentazione ufficiale](https://plausible.io/docs).