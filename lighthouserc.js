module.exports = {
  ci: {
    collect: {
      // Configura gli URL da testare
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/menu.html',
        'http://localhost:3000/chi-siamo.html',
        'http://localhost:3000/contatti.html',
        'http://localhost:3000/prenota.html'
      ],
      // Configura le impostazioni di Chrome
      settings: {
        preset: 'desktop',
        // Puoi anche usare 'mobile' per test su dispositivi mobili
      },
      // Numero di volte che ogni pagina viene testata
      numberOfRuns: 3
    },
    upload: {
      // Opzioni per il caricamento dei risultati
      target: 'temporary-public-storage',
    },
    assert: {
      // Definisci le soglie minime per i punteggi
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', {minScore: 0.8}],
        'categories:accessibility': ['warn', {minScore: 0.9}],
        'categories:best-practices': ['warn', {minScore: 0.9}],
        'categories:seo': ['warn', {minScore: 0.9}],
        'categories:pwa': ['warn', {minScore: 0.7}],
        // Regole specifiche
        'first-contentful-paint': ['warn', {maxNumericValue: 2000}],
        'interactive': ['warn', {maxNumericValue: 3500}],
        'uses-responsive-images': 'off',
      }
    }
  }
};