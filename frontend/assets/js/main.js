/* ============================================
   main.js — Script principal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Formulaire de recherche rapide (page d'accueil)
  const searchForm = document.getElementById('quickSearchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const from = document.getElementById('fromCity').value;
      const to = document.getElementById('toCity').value;
      const date = document.getElementById('travelDate').value;

      // Rediriger vers la page de résultats
      window.location.href = `/pages/search.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`;
    });

    // Date minimale = aujourd'hui
    const dateInput = document.getElementById('travelDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }
  }
});