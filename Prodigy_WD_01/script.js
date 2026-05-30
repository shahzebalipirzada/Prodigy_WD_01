(() => {
  const links = document.querySelectorAll('[data-scroll]');
  const sections = document.querySelectorAll('main section[id]');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if (!('IntersectionObserver' in window)) {
    return;
  }

  const navLinks = Array.from(links);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-active', isActive);
      });
    });
  }, {
    threshold: 0.35,
    rootMargin: '-10% 0px -55% 0px'
  });

  sections.forEach((section) => observer.observe(section));
})();
