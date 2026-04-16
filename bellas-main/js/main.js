/* ============================================================
   main.js — JavaScript Global · Brasa & Alma
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Cursor customizado ---- */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (cursor && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    (function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    })();
  }

  /* ---- Navbar scroll ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const tick = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* ---- Link ativo automático ---- */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0];
    if (href && page === href) link.classList.add('active');
  });

  /* ---- Menu mobile ---- */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }

  /* ---- Fade-in on scroll ---- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  /* Disparar hero imediatamente */
  document.querySelectorAll('#hero .fade-in, .page-banner .fade-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 80 + i * 80);
  });
});

/* Fecha menu mobile — chamado via onclick nos links */
function closeMobile() {
  const m = document.getElementById('mobileMenu');
  if (m) m.classList.remove('open');
}
