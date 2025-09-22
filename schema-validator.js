/**
 * Osteria del Chianti - Schema.org Validator
 * 
 * Questo file contiene funzioni per verificare la validità dei dati strutturati Schema.org
 * implementati nel sito web dell'Osteria del Chianti.
 *
 * @author Osteria del Chianti Dev Team
 * @version 1.0.0
 */

/**
 * Verifica la validità dei dati strutturati Schema.org
 * 
 * Questa funzione controlla tutti gli script JSON-LD presenti nella pagina
 * e verifica che siano conformi allo standard Schema.org.
 * 
 * @returns {Object} Risultato della validazione con eventuali errori
 */
function validateStructuredData() {
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    const validationResults = [];
    
    if (jsonLdScripts.length === 0) {
        console.warn('Nessun dato strutturato Schema.org trovato nella pagina.');
        return { valid: false, errors: ['Nessun dato strutturato trovato'] };
    }
    
    jsonLdScripts.forEach((script, index) => {
        try {
            const data = JSON.parse(script.textContent);
            const result = validateSchemaObject(data);
            
            validationResults.push({
                index,
                type: data['@type'],
                valid: result.valid,
                errors: result.errors
            });
            
            // Aggiungi classe per indicare la validità nello script
            script.dataset.valid = result.valid;
            
            // Log del risultato
            if (result.valid) {
                console.log(`✅ Schema #${index} (${data['@type']}) è valido.`);
            } else {
                console.warn(`⚠️ Schema #${index} (${data['@type']}) contiene errori:`, result.errors);
            }
        } catch (error) {
            validationResults.push({
                index,
                valid: false,
                errors: [`Errore di parsing JSON: ${error.message}`]
            });
            console.error(`❌ Schema #${index} non è un JSON valido:`, error);
        }
    });
    
    const allValid = validationResults.every(result => result.valid);
    
    return {
        valid: allValid,
        results: validationResults
    };
}

/**
 * Verifica la validità di un oggetto Schema.org
 * 
 * @param {Object} schema - L'oggetto Schema.org da validare
 * @returns {Object} Risultato della validazione
 */
function validateSchemaObject(schema) {
    const errors = [];
    
    // Verifica campi obbligatori
    if (!schema['@context']) {
        errors.push('Campo @context mancante');
    } else if (schema['@context'] !== 'https://schema.org') {
        errors.push('Campo @context deve essere "https://schema.org"');
    }
    
    if (!schema['@type']) {
        errors.push('Campo @type mancante');
    }
    
    // Verifica in base al tipo
    switch (schema['@type']) {
        case 'Restaurant':
            if (!schema.name) errors.push('Campo name mancante per Restaurant');
            if (!schema.address) errors.push('Campo address mancante per Restaurant');
            break;
            
        case 'Menu':
        case 'MenuSection':
            if (!schema.name) errors.push(`Campo name mancante per ${schema['@type']}`);
            break;
            
        case 'MenuItem':
            if (!schema.name) errors.push('Campo name mancante per MenuItem');
            if (!schema.offers) errors.push('Campo offers mancante per MenuItem');
            break;
            
        case 'AboutPage':
        case 'ContactPage':
        case 'WebPage':
            if (!schema.mainEntity) errors.push(`Campo mainEntity mancante per ${schema['@type']}`);
            break;
    }
    
    // Verifica ricorsiva per oggetti annidati
    Object.keys(schema).forEach(key => {
        if (typeof schema[key] === 'object' && schema[key] !== null && !Array.isArray(schema[key]) && schema[key]['@type']) {
            const nestedResult = validateSchemaObject(schema[key]);
            if (!nestedResult.valid) {
                errors.push(`Errori nell'oggetto annidato ${key}: ${nestedResult.errors.join(', ')}`);
            }
        }
    });
    
    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Aggiunge un pulsante per testare i dati strutturati in modalità sviluppo
 */
function addValidationButton() {
    // Verifica se siamo in ambiente di sviluppo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const button = document.createElement('button');
        button.textContent = 'Verifica Schema.org';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.zIndex = '9999';
        button.style.padding = '8px 12px';
        button.style.backgroundColor = '#8B0000';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        
        button.addEventListener('click', function() {
            const result = validateStructuredData();
            
            // Mostra un messaggio all'utente
            if (result.valid) {
                alert('✅ Tutti i dati strutturati Schema.org sono validi!');
            } else {
                alert(`⚠️ Sono stati trovati ${result.results.filter(r => !r.valid).length} schemi non validi. Controlla la console per i dettagli.`);
            }
        });
        
        document.body.appendChild(button);
    }
}

// Aggiungi il pulsante quando il DOM è caricato
document.addEventListener('DOMContentLoaded', addValidationButton);

// Esporta le funzioni per l'uso globale
window.schemaValidator = {
    validate: validateStructuredData,
    validateObject: validateSchemaObject
};