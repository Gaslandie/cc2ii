'use strict';
const navigation = document.getElementById('navigation');
// Survol à la souris sur grand écran ; clic conservé pour le tactile et le clavier.
const hoverNavigation = window.matchMedia('(min-width: 1400px) and (hover: hover) and (pointer: fine)');
navigation.querySelectorAll('.dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
  let closeTimer;
  dropdown.addEventListener('mouseenter', () => {
    if (!hoverNavigation.matches) return;
    clearTimeout(closeTimer);
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
