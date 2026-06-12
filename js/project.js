// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Filter tabs
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const categories = card.dataset.category || '';
      const show = filter === 'all' || categories.includes(filter);
      card.style.transition = 'opacity 0.3s, transform 0.3s';
      if (show) {
        card.style.opacity = '1';
        card.style.transform = '';
        card.style.display = 'flex';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (!categories.includes(filter) && filter !== 'all') card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ── MODAL ──
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

// Project data — github is optional, leave as null if none
const projectData = {
  'Fish Density Monitoring Drone': {
    github: null,
    description: 'Autonomous drone platform built on Pixhawk and Raspberry Pi that uses computer vision to estimate fish density in water bodies. Designed for aquaculture and marine research applications.',
    components: ['Pixhawk', 'Raspberry Pi', 'OpenCV', 'Drone', 'Python', 'Camera Module']
  },
  'Crack Detection Using Computer Vision': {
    github: null,
    description: 'Edge-deployed crack inspection system on Raspberry Pi that processes camera feeds using OpenCV to detect surface cracks in real-time. Useful for structural health monitoring.',
    components: ['Raspberry Pi', 'OpenCV', 'Python', 'Camera Module', 'Image Processing']
  },
  'Human Detection for Disaster Response Drones': {
    github: 'https://github.com/Sahilpillai006/Human-detection',
    description: 'Computer vision system designed to detect humans in disaster-hit environments using drone footage. Built to assist search and rescue operations by automating human identification from aerial views.',
    components: ['Python', 'OpenCV', 'Computer Vision', 'Drone', 'Deep Learning']
  },
  'Sign Language Recognition System': {
    github: null,
    description: 'Real-time hand gesture recognition system trained on a CNN model to translate sign language into text. Built to assist communication for the hearing impaired community.',
    components: ['CNN', 'Python', 'OpenCV', 'Deep Learning', 'TensorFlow']
  },
  'Arduino based digital Clock': {
    github: null,
    description: 'Arduino Nano-based digital clock with 92 hand-soldered LEDs on a dot PCB, driven by multiplexing for efficient pin usage. Time is set manually via switches — built entirely from scratch as part of a STEAM activity, no off-the-shelf display modules involved.',
    components: ['Arduino Nano', 'C++', 'Multiplexing', '92 LEDs', 'Dot PCB', 'Switches']
  },
  'Mini Weather station': {
    github: null,
    description: 'ESP8266-based mini weather station using a DHT11 sensor and OLED display. Cycles through live temperature, humidity, heat index, comfort status and temperature trend on a 128×64 OLED. Also hosts a local web server accessible via browser at weatherstation.local — auto-refreshing every 5 seconds over WiFi, built entirely from scratch as part of a STEAM activity.',
    components: ['ESP8266', 'DHT11', 'OLED 128x64', 'Web Server', 'WiFi', 'C++']
  }
};

function openModal(card) {
  const title = card.querySelector('h3').textContent;
  const icon = card.querySelector('.card-icon').textContent;
  const statusEl = card.querySelector('.card-status');
  const data = projectData[title];

  // Banner
  document.getElementById('modal-icon').textContent = icon;

  // Header
  document.getElementById('modal-title').textContent = title;

  // Status — clone the badge
  const modalStatus = document.getElementById('modal-status');
  modalStatus.innerHTML = '';
  const badge = statusEl.cloneNode(true);
  modalStatus.appendChild(badge);

  // Description
  document.getElementById('modal-description').textContent = data.description;

  // Components/tags
  const tagsContainer = document.getElementById('modal-tags');
  tagsContainer.innerHTML = '';
  data.components.forEach(c => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = c;
    tagsContainer.appendChild(span);
  });

  // GitHub link
  const githubBtn = document.getElementById('modal-github');
  if (data.github) {
    githubBtn.href = data.github;
    githubBtn.classList.remove('modal-github-hidden');
  } else {
    githubBtn.classList.add('modal-github-hidden');
  }

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

cards.forEach(card => {
  card.addEventListener('click', () => openModal(card));
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});