// Ano dinâmico no rodapé
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scrollspy: destaca o link do menu correspondente à seção visível
const sections = document.querySelectorAll('main section[id], main footer[id]');
const navLinks = document.querySelectorAll('.nav-link');

const setActive = (id) => {
  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.dataset.section === id);
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActive(entry.target.id);
    }
  });
}, {
  rootMargin: '-40% 0px -50% 0px',
  threshold: 0
});

sections.forEach(section => observer.observe(section));

// Rolagem suave ao clicar no menu (fallback extra além do CSS scroll-behavior)
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Menu mobile (hambúrguer)
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navOverlay = document.getElementById('nav-overlay');

if (navToggle && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (navOverlay) navOverlay.classList.remove('is-open');
  };

  const openMenu = () => {
    navMenu.classList.add('is-open');
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    if (navOverlay) navOverlay.classList.add('is-open');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Fecha o menu ao clicar em qualquer link dentro dele
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha o menu ao clicar no fundo escurecido
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);

  // Fecha o menu com a tecla Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Fecha o menu se a tela for redimensionada para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
}