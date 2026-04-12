// Immy's Cafe — main.js
// Minimal JS: print, share, mobile nav toggle

// Print recipe
function printRecipe() {
  window.print();
}

// Share recipe (Web Share API with clipboard fallback)
async function shareRecipe(title, url) {
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
    } catch (e) {
      // User cancelled — no-op
    }
  } else {
    await navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  }
}

// Mobile nav toggle
const navToggle = document.querySelector('.mobile-nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open);
  });
}
