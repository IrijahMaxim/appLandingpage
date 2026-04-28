/* ---- Navbar scroll behaviour ---- */
const navbar    = document.getElementById('navbar');
const scrollBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 80);
    scrollBtn.classList.toggle('show', y > 400);
    updateActiveLink();
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Mobile menu ---- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn   = document.getElementById('mobileClose');
const mLinks     = mobileMenu.querySelectorAll('a');

function openMenu()  { mobileMenu.classList.add('open');  document.body.style.overflow = 'hidden'; }
function closeMenu() { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }

hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
mLinks.forEach(l => l.addEventListener('click', closeMenu));

/* ---- Menu tabs ---- */
const tabs   = document.querySelectorAll('.m-tab');
const panels = document.querySelectorAll('.menu-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        document.getElementById(target).classList.add('active');
    });
});

/* ---- Scroll fade-in animation ---- */
const fadeEls = document.querySelectorAll('.fade-up');
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
fadeEls.forEach(el => io.observe(el));

/* ---- Active nav link on scroll ---- */
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a');
    const pos      = window.scrollY + 120;
    sections.forEach(sec => {
        if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
            links.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === '#' + sec.id);
            });
        }
    });
}

/* ---- Lazy-load product photos ---- */
document.querySelectorAll('.prod-photo').forEach(img => {
    img.addEventListener('load', () => img.classList.add('loaded'));
    if (img.complete) img.classList.add('loaded');
});
