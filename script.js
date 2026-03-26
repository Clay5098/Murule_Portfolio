const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn?.addEventListener('click', () => {
  nav?.classList.toggle('show');
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

const messagePreview = document.getElementById('messagePreview');
const messageContent = document.getElementById('messageContent');

const introductionMessage = `Hello, I’m Clayton. Thank you for visiting my portfolio. I specialize in professional web applications, UX, and scalable business solutions. I’d love to understand your goals and recommend a clear plan and next steps. What is the best time to connect for a quick consultation?`;

function showMessagePreview(channel) {
  if (!messageContent || !messagePreview) return;

  messageContent.textContent = `Channel: ${channel} → Message from Clayton:\n\n${introductionMessage}`;
  messagePreview.style.display = 'block';
}

const emailLink = document.getElementById('emailLink');
const whatsappLink = document.getElementById('whatsappLink');
const telegramLink = document.getElementById('telegramLink');
const callLink = document.getElementById('callLink');

emailLink?.addEventListener('click', () => showMessagePreview('Email'));
whatsappLink?.addEventListener('click', () => showMessagePreview('WhatsApp'));
telegramLink?.addEventListener('click', () => showMessagePreview('Telegram'));
callLink?.addEventListener('click', () => showMessagePreview('Call'));

const links = document.querySelectorAll('.nav a');
links.forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('show');
  });
});

const sections = document.querySelectorAll('.section');

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

const pageDots = document.getElementById('pageDots');
const page = document.querySelector('.page');
let activeIndex = 0;
let scrollLocked = false;

function createPageDots() {
  if (!pageDots) return;
  pageDots.innerHTML = '';
  sections.forEach((section, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Scroll to ${section.id}`);
    if (index === 0) button.classList.add('active');
    button.addEventListener('click', () => {
      scrollToSectionIndex(index);
    });
    pageDots.appendChild(button);
  });
}

function setActiveDot(index) {
  activeIndex = index;
  const dots = pageDots?.querySelectorAll('button');
  if (!dots) return;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function scrollToSectionIndex(index) {
  const target = sections[index];
  if (!target) return;
  activeIndex = index;
  setActiveDot(index);
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollByStep(direction) {
  if (scrollLocked) return;
  let nextIndex = activeIndex;
  if (direction === 'next') nextIndex = Math.min(sections.length - 1, activeIndex + 1);
  if (direction === 'prev') nextIndex = Math.max(0, activeIndex - 1);
  if (nextIndex !== activeIndex) {
    scrollLocked = true;
    scrollToSectionIndex(nextIndex);
    setTimeout(() => { scrollLocked = false; }, 750);
  }
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        const index = Array.from(sections).indexOf(entry.target);
        if (index >= 0) setActiveDot(index);
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => sectionObserver.observe(section));
createPageDots();

if (page) {
  page.addEventListener('wheel', (event) => {
    if (scrollLocked) {
      event.preventDefault();
      return;
    }
    if (Math.abs(event.deltaY) < 20) return;
    event.preventDefault();
    if (event.deltaY > 0) {
      scrollByStep('next');
    } else {
      scrollByStep('prev');
    }
  }, { passive: false });
}

document.addEventListener('keydown', (event) => {
  const keys = ['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp', 'Home', 'End'];
  if (!keys.includes(event.key)) return;
  if (document.activeElement && ['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(document.activeElement.tagName)) return;

  event.preventDefault();
  if (event.key === 'ArrowDown' || event.key === 'PageDown') scrollByStep('next');
  if (event.key === 'ArrowUp' || event.key === 'PageUp') scrollByStep('prev');
  if (event.key === 'Home') scrollToSectionIndex(0);
  if (event.key === 'End') scrollToSectionIndex(sections.length - 1);
});

