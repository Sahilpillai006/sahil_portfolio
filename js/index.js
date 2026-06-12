// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Typewriter for name
const name = "Sahil B Pillai.";
let i = 0;
const target = document.getElementById('typed-name');
function type() {
  if (i < name.length) {
    target.textContent += name[i++];
    setTimeout(type, 80);
  }
}
setTimeout(type, 900);

// Popup
const overlay = document.getElementById('popup-overlay');
const connectBtn = document.getElementById('connect-btn');
const closeBtn = document.getElementById('popup-close');
const bottomConnect = document.getElementById('bottom-connect');

function openPopup() {
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closePopup() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

connectBtn.addEventListener('click', openPopup);
bottomConnect.addEventListener('click', (e) => { e.preventDefault(); openPopup(); });
closeBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });

// ── PAGE TRANSITION ──
function navigateWithTransition(url, animClass) {
  document.body.classList.add(animClass);
  setTimeout(() => { window.location.href = url; }, 285);
}

// Intercept Profile/About link in side nav
document.querySelector('.side-nav a[href="aboutme.html"]')
  .addEventListener('click', (e) => {
    e.preventDefault();
    navigateWithTransition('aboutme.html', 'page-exit-circle');
  });

// Intercept Projects link in side nav
document.querySelector('.side-nav a[href="projects.html"]')
  .addEventListener('click', (e) => {
    e.preventDefault();
    navigateWithTransition('projects.html', 'page-exit-none');
  });