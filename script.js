// Sidebar toggle
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
if (menuBtn && sidebar) {
  menuBtn.addEventListener('click', () => { sidebar.classList.toggle('active'); });
}

// Typing animation (dynamic)
const typingEl = document.getElementById('typing');
const texts = ["AI/ML Enthusiast", "Web Developer", "Python / Django Learner"];
let tIndex = 0, cIndex = 0;
function typeWriter() {
  if (!typingEl) return;
  const current = texts[tIndex];
  cIndex++;
  typingEl.textContent = current.slice(0, cIndex);
  if (cIndex === current.length) {
    tIndex = (tIndex + 1) % texts.length;
    cIndex = 0;
    setTimeout(typeWriter, 1000);
  } else {
    setTimeout(typeWriter, 140);
  }
}
typeWriter();

// Reveal on scroll
const sections = document.querySelectorAll('.animated-section');
const projectCards = document.querySelectorAll('.project-card');
const skillFills = document.querySelectorAll('.skill-fill');

function reveal() {
  const triggerBottom = window.innerHeight / 1.2;
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < triggerBottom) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });

  projectCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < triggerBottom) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });

  // Animate skill fill widths once when visible
  skillFills.forEach(fill => {
    const parent = fill.closest('.skill-group');
    if (!parent) return;
    const top = parent.getBoundingClientRect().top;
    if (top < triggerBottom && !fill.dataset.animated) {
      const width = fill.dataset.fill || getComputedStyle(fill).width;
      fill.style.width = fill.getAttribute('data-fill') || '60%';
      fill.dataset.animated = 'true';
    }
  });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Smooth scroll sidebar links
const navLinks = document.querySelectorAll('.sidebar nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    const top = target.offsetTop - 20;
    window.scrollTo({ top, behavior: 'smooth' });
    sidebar.classList.remove('active');
  });
});

// Highlight active section
const allSections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY || window.pageYOffset;
  allSections.forEach(section => {
    const top = section.offsetTop - 110;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => link.classList.remove('active-link'));
      const activeLink = document.querySelector(`.sidebar nav a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active-link');
    }
  });
});
