/* ═══════════════════════════════════════
   STEINBERG LEIVA — Scripts
   v2.0 | js/script.js
═══════════════════════════════════════ */

// ── SHUFFLE PORTFOLIO ──────────────────
// Recoge todas las proj-card del masonry,
// las mezcla aleatoriamente y las redistribuye
// en las filas manteniendo la estructura visual.
(function shufflePortfolio(){
  const masonry = document.querySelector('.proj-masonry');
  if(!masonry) return;

  // Recoger todas las cards de todas las filas
  const allCards = Array.from(masonry.querySelectorAll('.proj-card'));
  if(allCards.length < 2) return;

  // Fisher-Yates shuffle
  for(let i = allCards.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
  }

  // Obtener los contenedores directos de cada card
  // (pueden ser .proj-row o .proj-col dentro de .proj-row--a)
  // Recoger los "slots" en orden DOM
  const slots = [];
  masonry.querySelectorAll('.proj-row').forEach(row => {
    row.querySelectorAll(':scope > .proj-card').forEach(c => slots.push(c));
    const col = row.querySelector('.proj-col');
    if(col) col.querySelectorAll(':scope > .proj-card').forEach(c => slots.push(c));
  });

  // Reinsertar cada card mezclada en su slot correspondiente
  slots.forEach((slot, i) => {
    const shuffled = allCards[i];
    if(!shuffled || slot === shuffled) return;
    slot.replaceWith(shuffled);
  });
})();


// ── CARRUSELES ────────────────────────
document.querySelectorAll('.proj-carousel').forEach(carousel => {
  const track = carousel.querySelector('.proj-carousel-track');
  const dots  = carousel.querySelectorAll('.dot');
  const total = track ? track.querySelectorAll('img').length : 0;
  if(total < 2) return; // imagen única: sin controles

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

  // Swipe táctil
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if(Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
});


// ── SMOOTH SCROLL ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});


// ── INTERSECTION ANIMATIONS ───────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.12});
document.querySelectorAll('.pilar,.proj-card,.bio-card,.porque-item').forEach(el => observer.observe(el));


// ── NAV SCROLL ────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if(!nav) return;
  nav.style.background = window.scrollY > 40
    ? 'rgba(240,238,233,0.98)'
    : 'rgba(240,238,233,0.97)';
  nav.style.backdropFilter = 'blur(16px)';
});


// ── FORMULARIO ────────────────────────
const form = document.querySelector('form');
if(form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Mensaje enviado correctamente');
    form.reset();
  });
}
