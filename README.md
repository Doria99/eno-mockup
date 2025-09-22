# Osteria del Chianti - Sito Web

## Descrizione del Progetto

Questo progetto è un sito web responsive per l'"Osteria del Chianti", una trattoria tipica toscana situata nel cuore di Firenze. Il sito è progettato per offrire un'esperienza utente ottimale su tutti i dispositivi, con particolare attenzione all'accessibilità, alle prestazioni e all'ottimizzazione SEO.

### Caratteristiche Principali

- **Design Responsive**: Ottimizzato per desktop, tablet e dispositivi mobili
- **Tema Scuro**: Supporto automatico per il tema scuro in base alle preferenze del sistema
- **Accessibilità**: Conforme alle linee guida WCAG per garantire l'accesso a tutti gli utenti
- **Ottimizzazione Performance**: Caricamento lazy delle immagini, ottimizzazione CSS critico, precaricamento risorse
- **PWA Ready**: Configurato come Progressive Web App per l'installazione sui dispositivi
- **SEO Ottimizzato**: Metadati completi, dati strutturati Schema.org, sitemap XML

## Struttura del Progetto

```
├── index.html              # Homepage del sito
├── menu.html               # Pagina del menu
├── chi-siamo.html          # Pagina informativa sul ristorante
├── contatti.html           # Pagina dei contatti
├── prenota.html            # Pagina per le prenotazioni
├── styles.css              # Foglio di stile principale
├── script.js               # JavaScript principale
├── sw.js                   # Service Worker per funzionalità offline
├── manifest.json           # Manifest per PWA
├── images/                 # Directory delle immagini
│   ├── logo.svg            # Logo del ristorante
│   ├── tavolata.jpg        # Immagine principale
│   └── ...                 # Altre immagini
└── __tests__/              # Test automatizzati
```

## Tecnologie Utilizzate

- **HTML5**: Markup semantico per una struttura chiara e accessibile
- **CSS3**: Stili moderni con variabili CSS, media queries e container queries
- **JavaScript**: Interattività e funzionalità dinamiche
- **Font Awesome**: Icone vettoriali
- **Google Fonts**: Tipografia web ottimizzata
- **Schema.org**: Dati strutturati per migliorare la visibilità nei motori di ricerca

## Strumenti di Sviluppo

### Linting e Qualità del Codice

- **ESLint**: Controllo della qualità del codice JavaScript
- **Stylelint**: Controllo della qualità del codice CSS
- **HTMLHint**: Controllo della qualità del codice HTML

### Test e Analisi

- **Jest**: Framework per i test automatizzati di JavaScript
- **Lighthouse**: Analisi delle prestazioni, accessibilità, SEO e PWA
- **Axe**: Test di accessibilità automatizzati

### Ottimizzazione

- **Terser**: Minificazione del codice JavaScript
- **PostCSS** con **CSSO**: Minificazione del codice CSS
- **Imagemin**: Ottimizzazione delle immagini
- **SVGO**: Ottimizzazione delle immagini SVG

### Sviluppo

- **Browser-Sync**: Server di sviluppo con ricaricamento automatico

## Comandi Disponibili

```bash
# Avviare il server di sviluppo
npm run dev

# Eseguire il linting di tutti i file
npm run lint

# Correggere automaticamente i problemi di linting
npm run lint:fix

# Eseguire i test automatizzati
npm run test

# Costruire il progetto (linting + minificazione)
npm run build

# Build completa con ottimizzazione immagini
npm run build:full

# Minificare i file JavaScript e CSS
npm run minify

# Ottimizzare le immagini
npm run optimize-images

# Ottimizzare i file SVG
npm run optimize-svg

# Eseguire analisi Lighthouse
npm run lighthouse

# Eseguire test di accessibilità
npm run test:a11y

# Eseguire tutte le analisi
npm run analyze
```

## Installazione

1. Clona il repository
   ```bash
   git clone https://github.com/username/eno-mockup.git
   cd eno-mockup
   ```

2. Installa le dipendenze
   ```bash
   npm install
   ```

3. Avvia il server di sviluppo
   ```bash
   npm run dev
   ```

## Contribuire

Le contribuzioni sono benvenute! Per favore, segui questi passaggi:

1. Forka il repository
2. Crea un branch per la tua feature (`git checkout -b feature/amazing-feature`)
3. Committa i tuoi cambiamenti (`git commit -m 'Aggiunta una nuova feature'`)
4. Pusha al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

## Licenza

Questo progetto è distribuito con licenza ISC. Vedi il file `LICENSE` per maggiori informazioni.

## Contatti

Per qualsiasi domanda o suggerimento, contatta il team di sviluppo all'indirizzo email: dev@osteriadelchianti.it