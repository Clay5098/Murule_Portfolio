const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn?.addEventListener('click', () => {
  nav?.classList.toggle('show');
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

const messagePreview = document.getElementById('messagePreview');
const messageContent = document.getElementById('messageContent');

const introductionMessage = `Hello, I’m Clayton. Thank you for visiting my portfolio. I specialize in professional Forex/Commodity trading (GOLD, GBP/USD, EUR/USD), responsive web development, and high-impact video content production. I’d love to understand your goals and recommend a clear plan and next steps. What is the best time to connect for a quick consultation?`;

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
    nav.classList.remove('show');
  });
});
