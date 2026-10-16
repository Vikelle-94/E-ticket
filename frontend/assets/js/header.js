/* ============================================
   header.js — Chargement et gestion du header
   ============================================ */

/**
 * Injecte le header dans la page
 */
async function loadHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;

  try {
    const response = await fetch('/components/header.html');
    const html = await response.text();
    placeholder.innerHTML = html;

    // Réappliquer les traductions après injection
    if (typeof applyTranslations === 'function') {
      applyTranslations();
    }

    // Gérer le menu mobile
    setupMobileMenu();

    // Gérer le menu utilisateur
    setupUserMenu();
  } catch (error) {
    console.error('Erreur chargement header :', error);
  }
}

/**
 * Menu mobile (hamburger)
 */
function setupMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('mainNav');

  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
}

/**
 * Menu utilisateur (si connecté)
 */
function setupUserMenu() {
  const userBtn = document.getElementById('userBtn');
  const userDropdown = document.getElementById('userDropdown');

  // Vérifier si un utilisateur est connecté
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (user) {
    // Afficher le menu utilisateur, cacher les boutons connexion
    document.getElementById('authButtons').style.display = 'none';
    document.getElementById('userMenu').style.display = 'block';
    document.getElementById('userName').textContent = user.nom;

    // Bouton déconnexion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/index.html';
      });
    }
  }

  // Toggle du dropdown
  if (userBtn && userDropdown) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      userDropdown.classList.remove('active');
    });
  }
}

// Charger le header au démarrage
document.addEventListener('DOMContentLoaded', loadHeader);