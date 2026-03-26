const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

function closeNav() {
  if (!nav || !menuBtn) return;
  nav.classList.remove('show');
  menuBtn.setAttribute('aria-expanded', 'false');
}

function toggleNav() {
  if (!nav || !menuBtn) return;
  const isOpen = nav.classList.toggle('show');
  menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

menuBtn?.addEventListener('click', toggleNav);

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('click', (event) => {
  if (!nav || !menuBtn) return;
  if (!nav.classList.contains('show')) return;
  if (nav.contains(event.target) || menuBtn.contains(event.target)) return;
  closeNav();
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

const messagePreview = document.getElementById('messagePreview');
const messageContent = document.getElementById('messageContent');

const introductionMessage =
  "Hello, I'm Clayton. Thank you for reaching out. I build elegant, high-performance web experiences and would love to learn about your goals. What timeline are you working with?";

function showMessagePreview(channel) {
  if (!messageContent || !messagePreview) return;
  messageContent.textContent = `Channel: ${channel}\n\n${introductionMessage}`;
  messagePreview.hidden = false;
}

const emailLink = document.getElementById('emailLink');
const whatsappLink = document.getElementById('whatsappLink');
const telegramLink = document.getElementById('telegramLink');
const callLink = document.getElementById('callLink');

emailLink?.addEventListener('click', () => showMessagePreview('Email'));
whatsappLink?.addEventListener('click', () => showMessagePreview('WhatsApp'));
telegramLink?.addEventListener('click', () => showMessagePreview('Telegram'));
callLink?.addEventListener('click', () => showMessagePreview('Call'));

const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if (!name || !email || !message) {
    if (formFeedback) formFeedback.textContent = 'Please complete all fields before sending.';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    if (formFeedback) formFeedback.textContent = 'Please provide a valid email address.';
    return;
  }

  if (formFeedback) {
    formFeedback.textContent = 'Thanks! Message ready to send. (Form submit is demo-only.)';
  }
  contactForm.reset();
});

const revealItems = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
