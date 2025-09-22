// Configurazione per i test di accessibilità con Axe
export default {
  // Regole da applicare durante i test
  rules: [
    // Regole per la conformità WCAG 2.1 AA
    { id: 'wcag2a', enabled: true },
    { id: 'wcag2aa', enabled: true },
    // Disabilita alcune regole specifiche se necessario
    // { id: 'color-contrast', enabled: false },
  ],
  // Elementi da escludere dai test
  exclude: [
    // Esempio: escludere elementi di terze parti
    '.third-party-widget',
  ],
  // Opzioni per i report
  reporter: [
    'v2',
    {
      // Opzioni per il reporter v2
      outputDir: './reports/accessibility',
      reportFileName: 'accessibility-report.json',
    },
  ],
  // Configurazioni specifiche per i test
  testConfig: {
    // Imposta un timeout per i test
    timeout: 10000,
    // Imposta la modalità di esecuzione
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'best-practice'],
    },
  },
};