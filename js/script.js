/* ═══════════════════════════════════════
   STEINBERG LEIVA — Scripts
   v1.1 | js/script.js
═══════════════════════════════════════ */

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
  });
});

// Intersection animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:0.12});
document.querySelectorAll('.pilar,.proj-card,.bio-card,.porque-item').forEach(el => observer.observe(el));

// Nav scroll effect
window.addEventListener('scroll',() => {
  const nav = document.querySelector('nav');
  if(!nav) return;
  nav.style.background = window.scrollY > 40
    ? 'rgba(240,238,233,0.98)'
    : 'rgba(240,238,233,0.97)';
  nav.style.backdropFilter = 'blur(16px)';
});

// Formulario
const form = document.querySelector('form');
if(form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Mensaje enviado correctamente');
    form.reset();
  });
}

// ── CARRUSELES ──
document.querySelectorAll('.proj-carousel').forEach(carousel => {
  const track  = carousel.querySelector('.proj-carousel-track');
  const dots   = carousel.querySelectorAll('.dot');
  const total  = track.querySelectorAll('img').length;
  let current  = 0;

  function goTo(n){
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d,i) => d.classList.toggle('active', i === current));
  }

  carousel.querySelector('.next').addEventListener('click', () => goTo(current + 1));
  carousel.querySelector('.prev').addEventListener('click', () => goTo(current - 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Swipe táctil
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if(Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
});
