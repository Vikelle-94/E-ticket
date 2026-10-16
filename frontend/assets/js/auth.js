/* ============================================
   auth.js — Gestion de la connexion (simulée pour le moment)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Formulaire de connexion
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;

      // ⚠️ Pour le moment, simulation — sera remplacé par un appel API
      const fakeUser = {
        id: 1,
        nom: 'Utilisateur Test',
        email: email,
        role: role
      };

      localStorage.setItem('user', JSON.stringify(fakeUser));
      localStorage.setItem('token', 'fake-jwt-token');

      // Redirection selon le rôle
      if (role === 'ADMIN') {
        window.location.href = '/pages/admin/dashboard.html';
      } else if (role === 'AGENT') {
        window.location.href = '/pages/agent/dashboard.html';
      } else {
        window.location.href = '/index.html';
      }
    });
  }
});