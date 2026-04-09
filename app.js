/* =============================================
   app.js — CV Personal
   Práctica: DOM, eventos, Intersection Observer
   ============================================= */

// ── 1. Tema claro/oscuro ──────────────────────
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Recuperar preferencia guardada
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') body.classList.add('light');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  // Guardar preferencia en localStorage
  const isLight = body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


// ── 2. Scroll reveal (Intersection Observer) ──
// Agregar clase 'reveal' a elementos que queremos animar al entrar en pantalla
const revealTargets = document.querySelectorAll(
  '.timeline-item, .skill-card, .project-card, .contact-item, .section-header'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // solo una vez
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach(el => observer.observe(el));


// ── 3. Nav activo al hacer scroll ────────────
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--accent)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));


// ── 4. Nav backdrop al hacer scroll ──────────
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 50
    ? 'rgba(13,13,13,0.95)'
    : 'rgba(13,13,13,0.7)';

  // En tema claro
  if (body.classList.contains('light')) {
    nav.style.background = window.scrollY > 50
      ? 'rgba(245,240,232,0.97)'
      : 'rgba(245,240,232,0.75)';
  }
}, { passive: true });


// ── 5. Smooth reveal de los skills ───────────
// Agregar delay escalonado a las cards al aparecer
document.querySelectorAll('.skills-grid .skill-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.projects-grid .project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});


// ── 6. Año dinámico en el footer ─────────────
const footer = document.querySelector('.footer span:last-child');
if (footer) {
  footer.textContent = footer.textContent.replace('2026', new Date().getFullYear());
}


// ── 7. Easter egg en consola ──────────────────
console.log('%c👋 ¡Hola, dev! Este CV está construido con HTML, CSS y JS vanilla.', 'color: #c8f135; font-size: 14px;');
console.log('%cMirá el código fuente en: github.com/tu-usuario/tu-repo', 'color: #888; font-size: 12px;');