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
  const hamburgerIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>';
  const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>';

  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.innerHTML = open ? closeIcon : hamburgerIcon;
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Close menu when a nav link is tapped
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', false);
      navToggle.innerHTML = hamburgerIcon;
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}
