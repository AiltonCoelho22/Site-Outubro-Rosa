// Rolagem suave ao clicar nos links do menu
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').substring(1);
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

// Rotating phrases under hero
;(function(){
  const phrases = Array.from(document.querySelectorAll('.rotating-phrases .phrase'));
  if (!phrases.length) return;
  let idx = 0;
  const show = i => {
    phrases.forEach((p, j) => p.classList.toggle('active', j === i));
  }
  show(idx);
  setInterval(() => {
    idx = (idx + 1) % phrases.length;
    show(idx);
  }, 10000); // 10 seconds
})();

// Modal accessibility: close with Escape and trap focus simply
const donateModal = document.getElementById('donateModal');
const openDonate = document.getElementById('openDonate');
const ctaDoar = document.getElementById('ctaDoar');
const closeModal = document.getElementById('closeModal');

if (openDonate) openDonate.addEventListener('click', () => { donateModal.style.display = 'flex'; });
if (ctaDoar) ctaDoar.addEventListener('click', () => { donateModal.style.display = 'flex'; });
if (closeModal) closeModal.addEventListener('click', () => { donateModal.style.display = 'none'; });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && donateModal && donateModal.style.display === 'flex') {
    donateModal.style.display = 'none';
  }
});

// Menu Mobile com animações e gestos de toque
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const menuOverlay = document.getElementById('menuOverlay');
let touchStartX = 0;
let touchEndX = 0;

// Função para abrir o menu
const openMenu = () => {
  mainNav.classList.add('active');
  menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.querySelector('i').classList.remove('bi-list');
  menuToggle.querySelector('i').classList.add('bi-x-lg');
};

// Função para fechar o menu
const closeMenu = () => {
  mainNav.classList.remove('active');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = '';
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('i').classList.add('bi-list');
  menuToggle.querySelector('i').classList.remove('bi-x-lg');
};

// Gestão do menu mobile
if (menuToggle && mainNav) {
  // Click no botão do menu
  menuToggle.addEventListener('click', () => {
    if (mainNav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Eventos de toque para o menu
  mainNav.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  mainNav.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
  });

  mainNav.addEventListener('touchend', () => {
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > 50) { // Deslize para a esquerda
      closeMenu();
    }
  });

  // Fechar menu ao clicar no overlay
  menuOverlay.addEventListener('click', closeMenu);

  // Fechar menu com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      closeMenu();
    }
  });

  // Fechar menu ao clicar em links (em telas pequenas)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });
}

// Theme Toggle System
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
  document.documentElement.classList.toggle('dark-theme', isDark);
  localStorage.setItem('darkTheme', isDark);
  
  // Update button icon
  const icon = themeToggle.querySelector('i');
  icon.classList.remove('bi-sun', 'bi-moon-stars');
  icon.classList.add(isDark ? 'bi-sun' : 'bi-moon-stars');
}

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('darkTheme');
if (savedTheme !== null) {
  setTheme(savedTheme === 'true');
} else {
  setTheme(prefersDark.matches);
}

// Toggle theme on button click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark-theme');
    setTheme(!isDark);
  });
}

// Update theme if system preference changes
prefersDark.addEventListener('change', (e) => {
  setTheme(e.matches);
});