/* ============================================
   i18n.js — Système bilingue FR / EN
   ============================================ */

let translations = {};
let currentLang = localStorage.getItem('lang') || 'fr';

/**
 * Charge le fichier de traduction correspondant
 */
async function loadTranslations(lang) {
  try {
    const response = await fetch(`/assets/locales/${lang}.json`);
    translations = await response.json();
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    applyTranslations();
    updateLangButton();
  } catch (error) {
    console.error('Erreur chargement traductions :', error);
  }
}

/**
 * Applique les traductions à tous les éléments avec data-i18n
 */
function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      // Pour les inputs, on traduit le placeholder
      if (el.tagName === 'INPUT') {
        el.placeholder = translations[key];
      } else {
        el.textContent = translations[key];
      }
    }
  });
}

/**
 * Met à jour le bouton de langue
 */
function updateLangButton() {
  const flag = document.getElementById('currentFlag');
  const label = document.getElementById('currentLang');

  if (flag && label) {
    if (currentLang === 'fr') {
      flag.src = '/assets/images/flag-fr.png';
      label.textContent = 'FR';
    } else {
      flag.src = '/assets/images/flag-en.png';
      label.textContent = 'EN';
    }
  }
}

/**
 * Change la langue
 */
function changeLanguage(lang) {
  loadTranslations(lang);
}

/**
 * Initialisation
 */
document.addEventListener('DOMContentLoaded', () => {
  loadTranslations(currentLang);

  // Gestion du dropdown de langue
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');

  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('active');
    });
  }

  if (langDropdown) {
    langDropdown.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', () => {
        const lang = item.getAttribute('data-lang');
        changeLanguage(lang);
        langDropdown.classList.remove('active');
      });
    });
  }

  // Fermer le dropdown au clic extérieur
  document.addEventListener('click', () => {
    if (langDropdown) langDropdown.classList.remove('active');
  });
});

// Exposer la fonction globalement
window.changeLanguage = changeLanguage;