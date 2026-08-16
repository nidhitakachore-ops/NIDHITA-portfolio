// nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// mobile menu
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  const open = mobileMenu.style.display === 'flex';
  mobileMenu.style.display = open ? 'none' : 'flex';
});
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.style.display = 'none'));

// reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// skill bars fill on view
const skillSection = document.getElementById('skills');
const skillIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.getAttribute('data-fill') + '%';
      });
      skillIO.disconnect();
    }
  });
}, { threshold: 0.2 });
if (skillSection) skillIO.observe(skillSection);

// timeline fill
const tlContainer = document.getElementById('tlContainer');
const tlFill = document.getElementById('tlFill');
const tlIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      tlFill.style.height = '100%';
      tlIO.disconnect();
    }
  });
}, { threshold: 0.2 });
if (tlContainer) tlIO.observe(tlContainer);

// copy to clipboard
const toast = document.getElementById('toast');
let toastTimer;
document.querySelectorAll('[data-copy]').forEach(card => {
  card.addEventListener('click', async () => {
    const val = card.getAttribute('data-copy');
    const label = card.getAttribute('data-label') || 'Copied';
    try {
      await navigator.clipboard.writeText(val);
      toast.textContent = label + ' copied — ' + val;
    } catch (e) {
      toast.textContent = val;
    }
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  });
});
