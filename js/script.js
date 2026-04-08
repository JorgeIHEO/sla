/* ═══════════════════════════════════════
   STEINBERG LEIVA — Scripts
   v4.0 | js/script.js
═══════════════════════════════════════ */

// ── CARRUSELES ────────────────────────────────────────────────────
document.querySelectorAll('.proj-carousel').forEach(carousel => {
  const track = carousel.querySelector('.proj-carousel-track');
  const dots  = carousel.querySelectorAll('.dot');
  const total = track ? track.querySelectorAll('img').length : 0;
  if(total < 2) return;

  let current = 0;

  function goTo(n){
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  const btnNext = carousel.querySelector('.next');
  const btnPrev = carousel.querySelector('.prev');
  if(btnNext) btnNext.addEventListener('click', () => goTo(current + 1));
  if(btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if(Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
});


// ── SMOOTH SCROLL ─────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});


// ── INTERSECTION ANIMATIONS ───────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.1});
document.querySelectorAll('.pilar,.proj-card,.bio-card').forEach(el => observer.observe(el));


// ── NAV SCROLL ────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if(!nav) return;
  nav.style.background = window.scrollY > 40
    ? 'rgba(240,238,233,0.98)'
    : 'rgba(240,238,233,0.97)';
  nav.style.backdropFilter = 'blur(16px)';
});


// ── MENÚ HAMBURGUESA ──────────────────────────────────────────────
const burger  = document.getElementById('navBurger');
const navMenu = document.getElementById('navMenu');

if(burger && navMenu){
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    navMenu.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    navMenu.setAttribute('aria-hidden', !isOpen);
  });

  // Cerrar menú al hacer click en cualquier link interno
  navMenu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      navMenu.setAttribute('aria-hidden', 'true');
    });
  });

  // Cerrar menú al hacer scroll
  window.addEventListener('scroll', () => {
    if(navMenu.classList.contains('open')){
      burger.classList.remove('open');
      navMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      navMenu.setAttribute('aria-hidden', 'true');
    }
  }, {passive:true});
}


// ── FORMULARIO ────────────────────────────────────────────────────
const form = document.querySelector('form');
if(form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Mensaje enviado correctamente');
    form.reset();
  });
}
