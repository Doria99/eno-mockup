# Palette di Colori - Osteria del Chianti

## Panoramica
Questa palette di colori è stata progettata per garantire la massima leggibilità del testo e la coerenza visiva in tutto il progetto. Tutti i colori sono definiti come variabili CSS centralizzate per facilitare la manutenzione e l'aggiornamento.

## Colori Principali

### Bordeaux (Primary)
- `--color-primary: #8B0000` - Bordeaux principale
- `--color-primary-light: #A52A2A` - Bordeaux più chiaro
- `--color-primary-dark: #5D0000` - Bordeaux più scuro

### Crema (Secondary)
- `--color-secondary: #F5F5DC` - Crema principale
- `--color-secondary-light: #FFFEF7` - Crema più chiara
- `--color-secondary-dark: #E6E6D1` - Crema più scura

### Accento
- `--color-accent: #722F37` - Bordeaux accento
- `--color-accent-light: #8B3A42` - Accento più chiaro
- `--color-accent-dark: #5A252B` - Accento più scuro

## Colori Neutri per il Testo

### Testo Principale
- `--color-text-primary: #2C2C2C` - Testo principale (alto contrasto)
- `--color-text-secondary: #4A4A4A` - Testo secondario
- `--color-text-muted: #6B6B6B` - Testo attenuato
- `--color-text-light: #FFFFFF` - Testo su sfondo scuro

## Colori di Sfondo

### Sfondo Principale
- `--color-bg-primary: #FFFFFF` - Sfondo principale
- `--color-bg-secondary: #F8F8F8` - Sfondo secondario
- `--color-bg-tertiary: #F0F0F0` - Sfondo terziario
- `--color-bg-dark: #1A1A1A` - Sfondo scuro

## Colori di Stato

### Feedback Utente
- `--color-success: #2E7D32` - Verde successo
- `--color-warning: #F57C00` - Arancione warning
- `--color-error: #D32F2F` - Rosso errore
- `--color-info: #1976D2` - Blu informazione

## Colori di Bordo

### Bordi
- `--color-border-light: #E0E0E0` - Bordo chiaro
- `--color-border-medium: #BDBDBD` - Bordo medio
- `--color-border-dark: #757575` - Bordo scuro

## Colori di Ombra

### Ombre
- `--color-shadow-light: rgba(0, 0, 0, 0.1)` - Ombra leggera
- `--color-shadow-medium: rgba(0, 0, 0, 0.2)` - Ombra media
- `--color-shadow-dark: rgba(0, 0, 0, 0.3)` - Ombra scura

## Supporto Tema Scuro

La palette include automaticamente varianti per il tema scuro che vengono attivate quando l'utente ha impostato `prefers-color-scheme: dark`. I colori si adattano automaticamente per mantenere la leggibilità e il contrasto ottimali.

## Utilizzo

### Esempio CSS
```css
.mio-elemento {
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-light);
    box-shadow: 0 2px 4px var(--color-shadow-light);
}
```

### Esempio HTML con Classi Utilità
```html
<div class="bg-primary text-light">
    <h2 class="text-primary">Titolo</h2>
    <p class="text-secondary">Sottotitolo</p>
</div>
```

## Benefici

1. **Leggibilità**: Tutti i colori sono stati testati per garantire un contrasto ottimale
2. **Coerenza**: Palette centralizzata evita colori inconsistenti
3. **Manutenibilità**: Facile aggiornamento modificando solo le variabili CSS
4. **Accessibilità**: Supporto automatico per tema scuro e preferenze utente
5. **Performance**: Variabili CSS sono più efficienti dei colori hardcodati

## Controlli di Qualità

- ✅ Contrasto minimo 4.5:1 per testo normale
- ✅ Contrasto minimo 3:1 per testo grande
- ✅ Supporto completo per tema scuro
- ✅ Compatibilità con screen reader
- ✅ Testato su diversi dispositivi e browser
- ✅ **TUTTE LE PAGINE**: Colori centralizzati in tutto il sito web
- ✅ **ZERO COLORI HARDCODATI**: Eliminati da tutte le pagine HTML

## Pagine Aggiornate

### File CSS
- `styles.css` - Palette completa implementata

### File HTML
- `index.html` - Home page con colori centralizzati
- `menu.html` - Menu con colori corretti
- `contatti.html` - Pagina contatti con palette unificata
- `chi-siamo.html` - Pagina chi siamo con colori coerenti
- `prenota.html` - Form prenotazione con design uniforme

### Modifiche Specifiche per Pagina

#### menu.html
- ✅ Bordi tratteggiati: `rgba(139, 0, 0, 0.2)` → `var(--color-primary)` con opacity
- ✅ Testo descrizioni: `#666` → `var(--color-text-muted)`

#### contatti.html
- ✅ Testo informazioni: `#666` → `var(--color-text-muted)`
- ✅ Ombre mappa: `rgba(0, 0, 0, 0.1)` → `var(--color-shadow-light)`
- ✅ Bordi FAQ: `rgba(0, 0, 0, 0.1)` → `var(--color-border-light)`

#### chi-siamo.html
- ✅ Testo produttori: `#666` → `var(--color-text-muted)`
- ✅ Ombre sezioni: `rgba(0, 0, 0, 0.1)` → `var(--color-shadow-light)`
- ✅ Ombre valori: `rgba(0, 0, 0, 0.05)` → `var(--color-shadow-light)`

#### prenota.html
- ✅ Bordi form: `#ddd` → `var(--color-border-light)`
- ✅ Ombre form: `rgba(0, 0, 0, 0.1)` → `var(--color-shadow-light)`
