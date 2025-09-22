export default {
  multipass: true, // Esegui più passaggi di ottimizzazione
  plugins: [
    // Rimuovi elementi e attributi non necessari
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Personalizza le opzioni del preset predefinito
          removeViewBox: false, // Mantieni viewBox per la scalabilità
          cleanupIDs: {
            minify: true, // Minimizza gli ID
            preserve: ['logo', 'main-icon'] // Preserva ID specifici
          },
          // Disabilita alcune ottimizzazioni che potrebbero causare problemi
          removeHiddenElems: false
        }
      }
    },
    // Rimuovi commenti
    'removeComments',
    // Comprimi i colori
    {
      name: 'convertColors',
      params: {
        currentColor: true // Converti colori in currentColor dove appropriato
      }
    },
    // Arrotonda i valori numerici
    {
      name: 'convertPathData',
      params: {
        floatPrecision: 2 // Precisione decimale per i dati dei percorsi
      }
    },
    // Rimuovi prefissi XML non necessari
    'removeXMLProcInst',
    // Ottimizza le trasformazioni
    'convertTransform',
    // Unisci gli stili
    'mergePaths',
    // Rimuovi gli attributi di stile vuoti
    'removeEmptyAttrs',
    // Rimuovi elementi nascosti
    'removeHiddenElems',
    // Rimuovi metadati non necessari
    'removeMetadata',
    // Rimuovi descrizioni non necessarie
    'removeDesc'
  ]
};