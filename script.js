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


// ── FORMULARIO ────────────────────────────────────────────────────
const form = document.querySelector('form');
if(form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Mensaje enviado correctamente');
    form.reset();
  });
}


// ── TRUST BAR — ANIMACIÓN TIPO CONTADOR ──────────────────────────
function animateTrustNumbers(){
  const items = [
    { el: document.querySelectorAll('.trust-num')[0], final: '2019', prefix: '',  suffix: '', isYear: true },
    { el: document.querySelectorAll('.trust-num')[1], final: '60',   prefix: '+', suffix: '', isYear: false },
    { el: document.querySelectorAll('.trust-num')[2], final: null,   prefix: '',  suffix: '', isText: 'RM & V' },
  ];

  items.forEach(({ el, final, prefix, suffix, isYear, isText }) => {
    if(!el) return;

    if(isText){
      // Typewriter para el texto RM & V
      const text = 'RM & V';
      el.textContent = '';
      let i = 0;
      const type = () => {
        if(i <= text.length){
          el.textContent = text.slice(0, i);
          i++;
          setTimeout(type, 80);
        }
      };
      setTimeout(type, 400);
      return;
    }

    if(isYear){
      // Contador para el año
      const start = 2000;
      const end   = 2019;
      const duration = 1400;
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const value    = Math.floor(start + (end - start) * eased);
        el.textContent = prefix + value + suffix;
        if(progress < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + end + suffix;
      };
      setTimeout(() => requestAnimationFrame(tick), 200);
      return;
    }

    // Contador numérico normal (+60)
    const end      = parseInt(final);
    const duration = 1200;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = Math.floor(end * eased);
      el.textContent = prefix + value + suffix;
      if(progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + end + suffix;
    };
    setTimeout(() => requestAnimationFrame(tick), 300);
  });
}

// Disparar cuando trust-bar entra en viewport
const trustObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      animateTrustNumbers();
      trustObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const trustBar = document.querySelector('.trust-bar');
if(trustBar) trustObserver.observe(trustBar);
