const body = document.body;
const burger = document.getElementById('burger');
const menu = document.getElementById('menuPanel');
const header = document.getElementById('header');

burger.addEventListener('click', () => {
  const open = body.classList.toggle('menu-open');
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  menu.setAttribute('aria-hidden', String(!open));
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded','false');
  menu.setAttribute('aria-hidden','true');
}));
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8), {passive:true});

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, {threshold:.12, rootMargin:'0px 0px -4% 0px'});
document.querySelectorAll('.reveal,.reveal-img').forEach(el => io.observe(el));

const parallax = document.querySelector('.full-image img');
if (parallax && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  addEventListener('scroll', () => {
    const r = parallax.parentElement.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) {
      const p = (innerHeight - r.top) / (innerHeight + r.height);
      parallax.style.transform = `scale(1.045) translateY(${(p-.5)*18}px)`;
    }
  }, {passive:true});
}
