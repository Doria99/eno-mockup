/**
 * @jest-environment jsdom
 */

import '../script.js';

describe('Test delle funzionalità principali', () => {
  // Configurazione del DOM per i test
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="mobile-menu-btn"></div>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="menu.html">Menu</a></li>
        </ul>
      </nav>
    `;
  });

  // Test per la creazione del menu mobile
  test('Crea il menu mobile quando si clicca sul pulsante', () => {
    // Simula il caricamento del DOM
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    // Simula il click sul pulsante del menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenuBtn.click();

    // Verifica che il menu mobile sia stato creato
    const mobileNav = document.querySelector('.mobile-nav');
    expect(mobileNav).not.toBeNull();
    expect(mobileNav.classList.contains('active')).toBe(true);
  });

  // Test per la chiusura del menu mobile
  test('Chiude il menu mobile quando si clicca sul pulsante di chiusura', () => {
    // Simula il caricamento del DOM
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    // Simula il click sul pulsante del menu mobile per crearlo
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenuBtn.click();

    // Verifica che il menu mobile sia stato creato
    const mobileNav = document.querySelector('.mobile-nav');
    expect(mobileNav).not.toBeNull();

    // Simula il click sul pulsante di chiusura
    const closeBtn = document.querySelector('.close-menu');
    closeBtn.click();

    // Verifica che il menu mobile sia stato chiuso
    expect(mobileNav.classList.contains('active')).toBe(false);
  });
});