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
