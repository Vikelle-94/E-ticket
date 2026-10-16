/* ============================================
   footer.js — Chargement du footer
   ============================================ */

async function loadFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  try {
    const response = await fetch('/components/footer.html');
    const html = await response.text();
    placeholder.innerHTML = html;

    // Réappliquer les traductions après injection
    if (typeof applyTranslations === 'function') {
      applyTranslations();
    }
  } catch (error) {
    console.error('Erreur chargement footer :', error);
  }
}

document.addEventListener('DOMContentLoaded', loadFooter);