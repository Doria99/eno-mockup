# Osteria del Chianti - Mockup

## Strumenti di Linting e Ottimizzazione

Questo progetto include diversi strumenti per garantire la qualità del codice e ottimizzare le prestazioni del sito web.

### Linting

Il progetto utilizza i seguenti strumenti di linting:

- **ESLint**: Per il controllo della qualità del codice JavaScript
- **Stylelint**: Per il controllo della qualità del codice CSS
- **HTMLHint**: Per il controllo della qualità del codice HTML

### Test

- **Jest**: Framework per i test automatizzati di JavaScript

### Ottimizzazione

- **Terser**: Minificazione del codice JavaScript
- **PostCSS** con **CSSO**: Minificazione del codice CSS
- **Imagemin**: Ottimizzazione delle immagini
- **Browser-Sync**: Server di sviluppo con ricaricamento automatico

## Comandi Disponibili

```bash
# Eseguire il linting di tutti i file
npm run lint

# Correggere automaticamente i problemi di linting
npm run lint:fix

# Eseguire i test automatizzati
npm run test

# Costruire il progetto (linting + minificazione)
npm run build

# Minificare i file JavaScript e CSS
npm run minify

# Ottimizzare le immagini
npm run optimize-images

# Avviare il server di sviluppo
npm run dev
```

## Configurazione

Il progetto include i seguenti file di configurazione:

- `.eslintrc.json` e `eslint.config.js`: Configurazione di ESLint
- `.stylelintrc.json`: Configurazione di Stylelint
- `.htmlhintrc`: Configurazione di HTMLHint
- `postcss.config.js`: Configurazione di PostCSS per la minificazione CSS
- `jest.config.js`: Configurazione di Jest per i test automatizzati
- `imagemin.config.js`: Configurazione di Imagemin per l'ottimizzazione delle immagini

## Migliorie Suggerite

Ecco alcune migliorie che potrebbero essere implementate per migliorare ulteriormente il progetto:

### Ottimizzazione PWA

- **Icone PWA complete**: Aggiungere le icone mancanti per tutte le dimensioni richieste
- **Strategia di caching avanzata**: Implementare strategie di caching più sofisticate nel Service Worker (Stale-While-Revalidate, Network-First per contenuti dinamici)
- **Notifiche push**: Aggiungere supporto per notifiche push per eventi speciali o promozioni
- **Modalità offline migliorata**: Creare pagine di fallback specifiche per la navigazione offline

### Accessibilità

- **Test di accessibilità**: Integrare strumenti come Axe o Pa11y per test automatizzati di accessibilità
- **ARIA landmarks**: Migliorare l'uso di attributi ARIA in tutto il sito
- **Contrasto colori**: Verificare e migliorare il contrasto dei colori per conformità WCAG AA/AAA
- **Navigazione da tastiera**: Migliorare l'esperienza di navigazione da tastiera

### Performance

- **Lazy loading nativo**: Utilizzare l'attributo `loading="lazy"` per le immagini
- **Font optimization**: Implementare `font-display: swap` e subset dei font
- **Critical CSS**: Estrarre e inline il CSS critico per il rendering iniziale
- **Lighthouse CI**: Integrare test Lighthouse nel processo di build

### CI/CD

- **GitHub Actions/GitLab CI**: Configurare pipeline di CI/CD per automazione
- **Deploy automatico**: Configurare deploy automatico su hosting (Netlify, Vercel, ecc.)
- **Test pre-commit**: Aggiungere hook pre-commit per linting e test

### Sicurezza

- **Content Security Policy**: Implementare header CSP
- **Subresource Integrity**: Aggiungere attributi SRI per risorse esterne
- **HTTPS**: Assicurarsi che il sito sia servito su HTTPS

### Altre Migliorie

- **Internazionalizzazione**: Aggiungere supporto multilingua
- **Schema.org markup**: Implementare dati strutturati per SEO
- **Analytics**: Integrare analytics rispettosi della privacy (Plausible, Fathom)
- **Ottimizzazione SVG**: Comprimere ulteriormente le immagini SVG con SVGO# eno-mockup
