// ─── NAV SCROLL ───────────────────────────────────────
const nav = document.querySelector('.site-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ─── MOBILE HAMBURGER ──────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    const open = navLinks.classList.contains('open');
    spans[0].style.transform = open ? 'rotate(45deg) translate(4px, 5px)' : '';
    spans[1].style.opacity  = open ? '0' : '1';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(4px, -5px)' : '';
  });
  // close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ─── ACTIVE NAV LINK ───────────────────────────────────
const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = new URL(a.href).pathname.replace(/\/$/, '') || '/';
  if (href === currentPath) a.classList.add('active');
});

// ─── FADE-UP INTERSECTION OBSERVER ─────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── FAQ ACCORDION ─────────────────────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ─── CONTACT FORM (Formspree-ready) ────────────────────
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // ── Replace YOUR_FORMSPREE_ID below with your actual Formspree endpoint ──
    // Sign up free at formspree.io → create form → copy the ID
    const endpoint = form.dataset.endpoint || 'https://formspree.io/f/YOUR_FORMSPREE_ID';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.reset();
        if (success) success.style.display = 'block';
        btn.textContent = 'Sent!';
      } else {
        btn.textContent = 'Error — try again';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error — try again';
      btn.disabled = false;
    }
  });
}
