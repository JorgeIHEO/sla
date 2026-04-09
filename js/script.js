/* ── SLIDES ── */
const slides = [
  {concepto:'El deseo',        sub:'Conecta con lo que tu cliente desea sentir — antes de que lo piense.',  ideal:'Retail, moda, gastronomía, turismo, lifestyle'},
  {concepto:'La felicidad',    sub:'Conecta con alegría, nostalgia y emociones positivas.',                  ideal:'Alimentos, retail, marcas familiares, experiencias'},
  {concepto:'La seguridad',    sub:'Refuerza protección, confianza y estabilidad.',                          ideal:'Seguros, bancos, salud, inmobiliaria'},
  {concepto:'El bienestar',    sub:'Transforma hábitos en experiencias positivas.',                          ideal:'Higiene, salud, cuidado personal, wellness'},
  {concepto:'El vínculo',      sub:'Refuerza conexión, pertenencia y cuidado.',                              ideal:'Seguros de vida, educación, hogar'},
  {concepto:'La pertenencia',  sub:'Activa identidad, tribu y validación social.',                           ideal:'Moda urbana, deporte, comunidades'},
  {concepto:'La auto imagen',  sub:'Entrega control, proyección y seguridad personal.',                      ideal:'Belleza, cosmética, moda premium'},
  {concepto:'La autenticidad', sub:'Conecta con confianza, naturalidad y plenitud.',                         ideal:'Marcas personales, bienestar, lifestyle'},
  {concepto:null,              sub:'No vendes productos.',                                                    ideal:'Vendes emociones que el cliente quiere sentir.', final:true}
];

(function() {
  var cur = 0, DUR = 10000, FADE = 550;
  var wrap    = document.getElementById('slideFadeWrap');
  var elCon   = document.getElementById('slideConcepto');
  var elVende = document.querySelector('.slide-vende');
  var elSub   = document.getElementById('slideSub');
  var elIdeal = document.getElementById('slideIdeal');
  var elH1    = document.querySelector('.slide-h1-fixed');
  var bar     = document.getElementById('progressBar');

  /* Mobile imgs */
  function setSlide(idx) {
    var s = slides[idx];
    if (s.final) {
      elCon.textContent = 'No vendes productos.';
      elVende.style.display = 'none';
      elH1.style.fontSize = 'clamp(2.2rem,5vw,4.2rem)';
    } else {
      elCon.textContent = s.concepto;
      elVende.style.display = '';
      elH1.style.fontSize = '';
    }
    elSub.textContent   = s.sub;
    elIdeal.textContent = s.ideal;
  }

  function startBar() {
    bar.style.transition = 'none'; bar.style.width = '0%';
    bar.offsetWidth; /* reflow */
    bar.style.transition = 'width '+(DUR/1000)+'s linear';
    bar.style.width = '100%';
  }

  function goNext() {
    wrap.style.opacity = '0';
    setTimeout(function() {
      cur = (cur + 1) % slides.length;
      setSlide(cur);
      wrap.style.opacity = '1';
      startBar();
    }, FADE);
  }

  setSlide(0); startBar();
  setInterval(goNext, DUR);
  setTimeout(function() {
    var cta = document.getElementById('heroCta');
    if (cta) cta.style.opacity = '1';
  }, 2200);
})();

/* ── CARRUSELES ── */
const carousels = {
  dl365:    ['imagenes/portfolio-dl365-1.png','imagenes/portfolio-dl365-2.png','imagenes/portfolio-dl365-3.png'],
  rueda:    ['imagenes/portfolio-larueda-1.png','imagenes/portfolio-larueda-2.png','imagenes/portfolio-larueda-3.png'],
  interfaz: ['imagenes/portfolio-interfaz-1.png','imagenes/portfolio-interfaz-2.png','imagenes/portfolio-interfaz-3.png'],
  dossier:  ['imagenes/portfolio-dossier-1.png','imagenes/portfolio-dossier-2.png','imagenes/portfolio-dossier-3.png'],
  caso7:    ['imagenes/portfolio-caso7-1.png','imagenes/portfolio-caso7-2.png','imagenes/portfolio-caso7-3.png'],
  caso8:    ['imagenes/portfolio-caso8-1.png','imagenes/portfolio-caso8-2.png','imagenes/portfolio-caso8-3.png'],
  caso9:    ['imagenes/portfolio-caso9-1.png','imagenes/portfolio-caso9-2.png','imagenes/portfolio-caso9-3.png']
};
let carouselImgs = [], carouselIdx = 0;
function openCarousel(key) { carouselImgs = carousels[key]; carouselIdx = 0; renderCarousel(); document.getElementById('carouselModal').classList.add('open'); document.body.style.overflow='hidden'; }
function renderCarousel() {
  const track = document.getElementById('carouselTrack'), dots = document.getElementById('carouselDots');
  track.innerHTML = ''; dots.innerHTML = '';
  carouselImgs.forEach((src,i) => {
    const img = document.createElement('img'); img.src=src; img.className='carousel-img'+(i===carouselIdx?' active':''); img.alt='imagen '+(i+1); track.appendChild(img);
    const dot = document.createElement('span'); dot.className='carousel-dot'+(i===carouselIdx?' active':''); dot.onclick=()=>{carouselIdx=i;renderCarousel();}; dots.appendChild(dot);
  });
}
function carouselNext() { carouselIdx=(carouselIdx+1)%carouselImgs.length; renderCarousel(); }
function carouselPrev() { carouselIdx=(carouselIdx-1+carouselImgs.length)%carouselImgs.length; renderCarousel(); }
function closeCarouselModalDirect() { document.getElementById('carouselModal').classList.remove('open'); document.body.style.overflow=''; }
function closeCarouselModal(e) { if(e.target===document.getElementById('carouselModal')) closeCarouselModalDirect(); }

/* ── MODAL VIDEO ── */
function openVideoModal(src) { document.getElementById('modalVideoIframe').src=src; document.getElementById('videoModal').classList.add('open'); document.body.style.overflow='hidden'; }
function closeVideoModalDirect() { document.getElementById('modalVideoIframe').src=''; document.getElementById('videoModal').classList.remove('open'); document.body.style.overflow=''; }
function closeVideoModal(e) { if(e.target===document.getElementById('videoModal')) closeVideoModalDirect(); }
document.addEventListener('keydown', e => { if(e.key==='Escape'){closeVideoModalDirect();closeCarouselModalDirect();} });

/* ── REVEAL ── */
if (window.location.protocol !== 'file:') {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('will-animate'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e,i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 55);
        obs.unobserve(e.target);
      }
    });
  }, {threshold: 0.07, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── HAMBURGUESA ── */
(function() {
  var btn    = document.getElementById('navHamburger');
  var drawer = document.getElementById('navDrawer');
  var links  = drawer.querySelectorAll('.nav-drawer-link, .nav-drawer-cta');

  function openMenu() {
    btn.classList.add('open');
    drawer.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    btn.classList.remove('open');
    drawer.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function() {
    btn.classList.contains('open') ? closeMenu() : openMenu();
  });

  links.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* (CTA WhatsApp — no requiere JS) */
