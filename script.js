document.addEventListener('DOMContentLoaded', () => {

  // Navigation scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  }, { passive: true });

  // Mobile menu
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Menu tabs
  const tabs = document.querySelectorAll('.menu__tab');
  const panels = document.querySelectorAll('.menu__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${target}`).classList.add('active');
    });
  });

  // Scroll reveal
  const revealElements = document.querySelectorAll(
    '.about__content, .about__image, .locations__header, .location-card, ' +
    '.beers__header, .beer-card, .menu__header, .contact__header, .contact__card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = nav.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Parallax hero
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }

});
