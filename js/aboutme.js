// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── PAGE ENTER ANIMATION ──
// Triggers expand animation if coming from index
if (document.referrer.includes('index.html') || document.referrer.endsWith('/')) {
  document.querySelector('.hero').classList.add('page-enter');
}