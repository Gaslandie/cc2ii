'use strict';
const navigation = document.getElementById('navigation');
// Survol à la souris sur grand écran ; clic conservé pour le tactile et le clavier.
const hoverNavigation = window.matchMedia('(min-width: 1400px) and (hover: hover) and (pointer: fine)');
// Bootstrap donne le focus au déclencheur même au survol de la souris.
// Le repère de focus doit revenir dès que l'on utilise le clavier.
document.addEventListener('keydown', () => {
  navigation.querySelectorAll('.pointer-focus').forEach(link => link.classList.remove('pointer-focus'));
}, true);
navigation.querySelectorAll('.dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
  toggle.addEventListener('pointerdown', () => toggle.classList.add('pointer-focus'));
  let closeTimer;
  dropdown.addEventListener('mouseenter', () => {
    if (!hoverNavigation.matches) return;
    clearTimeout(closeTimer);
    toggle.classList.add('pointer-focus');
    navigation.querySelectorAll('.dropdown').forEach(other => {
      if (other !== dropdown) bootstrap.Dropdown.getOrCreateInstance(other.querySelector('[data-bs-toggle="dropdown"]')).hide();
    });
    bootstrap.Dropdown.getOrCreateInstance(toggle).show();
  });
  dropdown.addEventListener('mouseleave', () => {
    if (!hoverNavigation.matches) return;
    closeTimer = setTimeout(() => {
      if (!dropdown.matches(':hover')) {
        bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
      }
    }, 180);
  });
});

// Quatre images : défilement automatique, suspendu au survol ou au clavier.
const heroCarousel = document.getElementById('hero-carousel');
if (heroCarousel) {
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const carousel = new bootstrap.Carousel(heroCarousel, {interval: 7000, ride: false, pause: false, touch: true});
let heroHovered = false;
function updateRotation() {
  carousel.pause();
  if (!motionPreference.matches && !document.hidden && !heroHovered && !heroCarousel.contains(document.activeElement)) carousel.cycle();
}
heroCarousel.addEventListener('mouseenter', () => {heroHovered = true; updateRotation();});
heroCarousel.addEventListener('mouseleave', () => {heroHovered = false; updateRotation();});
heroCarousel.addEventListener('focusin', updateRotation);
heroCarousel.addEventListener('focusout', () => setTimeout(updateRotation, 0));
document.getElementById('hero-prev').addEventListener('click', () => carousel.prev());
document.getElementById('hero-next').addEventListener('click', () => carousel.next());
heroCarousel.querySelectorAll('[data-hero-slide]').forEach(button => button.addEventListener('click', () => carousel.to(Number(button.dataset.heroSlide))));
heroCarousel.addEventListener('slid.bs.carousel', event => {
  heroCarousel.querySelectorAll('[data-hero-slide]').forEach((button,index) => button.setAttribute('aria-current', String(index === event.to)));
});
motionPreference.addEventListener('change', updateRotation);
document.addEventListener('visibilitychange', updateRotation);
updateRotation();

}

// Référence MDN Intersection Observer, 28/10/2026 : apparition à l'entrée
// dans le viewport. Material Motion inaccessible sans JS lors de la comparaison.
const pageMotionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const revealAnimations = new Set();
function playMotion(element, frames, options) {
  const animation = element.animate(frames, options);
  revealAnimations.add(animation);
  animation.onfinish = animation.oncancel = () => revealAnimations.delete(animation);
  return animation;
}
if ('IntersectionObserver' in window && typeof Element.prototype.animate === 'function') {
  const revealObserver = new IntersectionObserver(entries => {
    let order = 0;
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      revealObserver.unobserve(element);
      const pending = element.classList.contains('reveal-pending');
      element.classList.remove('reveal-pending');
      if (!pending || pageMotionPreference.matches || element.contains(document.activeElement)) return;
      playMotion(element, [
        {opacity: 0, transform: 'translateY(38px)'},
        {opacity: 1, transform: 'translateY(0)'}
      ], {duration: 900, delay: Math.min(order++, 3) * 110, fill: 'backwards', easing: 'cubic-bezier(.22,.61,.36,1)'});
    });
  }, {threshold: .08, rootMargin: '0px 0px -35px 0px'});
  document.querySelectorAll('.intro-section .row > div, .section-heading, .expertise-grid > div, .sectors-heading, .sector-grid > div, .strengths-section .row > div, .location-image, .location-copy, .contact-section .row > div').forEach(element => {
    // Ne jamais masquer après coup un élément déjà visible au chargement.
    if (!pageMotionPreference.matches && element.getBoundingClientRect().top >= innerHeight) {
      element.classList.add('reveal-pending');
      revealObserver.observe(element);
    }
  });
  document.addEventListener('focusin', event => {
    const element = event.target.closest('.reveal-pending');
    if (element) {element.classList.remove('reveal-pending'); revealObserver.unobserve(element);}
    revealAnimations.forEach(animation => {
      if (animation.effect.target.contains(event.target)) animation.cancel();
    });
  });
  function animateHero(slide) {
    if (pageMotionPreference.matches || !slide) return;
    slide.getAnimations({subtree:true}).forEach(animation => {
      if (revealAnimations.has(animation)) animation.cancel();
    });
    playMotion(slide.querySelector('.hero-text-card'), [
      {opacity: 0, transform: 'translateY(32px)'},
      {opacity: 1, transform: 'translateY(0)'}
    ], {duration: 1100, easing: 'cubic-bezier(.22,.61,.36,1)'});
    playMotion(slide.querySelector('.hero-image'), [
      {transform: 'scale(1.065)'}, {transform: 'scale(1)'}
    ], {duration: 5500, easing: 'cubic-bezier(.2,.65,.3,1)'});
  }
  if (heroCarousel) {
    animateHero(heroCarousel.querySelector('.carousel-item.active'));
    heroCarousel.addEventListener('slide.bs.carousel', event => animateHero(event.relatedTarget));
  }
  pageMotionPreference.addEventListener('change', () => {
    if (pageMotionPreference.matches) {
      revealObserver.disconnect();
      document.querySelectorAll('.reveal-pending').forEach(element => element.classList.remove('reveal-pending'));
      revealAnimations.forEach(animation => animation.cancel());
    }
  });
}
