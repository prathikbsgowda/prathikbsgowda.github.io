// ── CANVAS PARTICLE NETWORK ──
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 12000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1
    });
  }
}
initParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(168,212,245,0.5)';
    ctx.fill();
  });
  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach(b => {
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(168,212,245,${0.18 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── TYPEWRITER ──
const roles = ['AI/ML Engineer', 'Data Scientist', 'GenAI Developer', 'MLOps Engineer'];
let ri = 0, ci = 0, deleting = false;
const el = document.getElementById('typedRole');

function typeWriter() {
  const word = roles[ri];
  if (!deleting) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeWriter, 1800); return; }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeWriter, deleting ? 60 : 100);
}
typeWriter();

// ── COUNT-UP STATS ──
function countUp(el, target, suffix) {
  const isFloat = target % 1 !== 0;
  const duration = 1800, step = 16;
  const steps = duration / step;
  let current = 0, count = 0;
  const timer = setInterval(() => {
    count++;
    current = target * (count / steps);
    el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + (count >= steps ? suffix : '');
    if (count >= steps) { el.textContent = target + suffix; clearInterval(timer); }
  }, step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        countUp(el, parseFloat(el.dataset.target), el.dataset.suffix || '');
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── EXPERIENCE TABS ──
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── BACK TO TOP ──
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 300));
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── RESUME DOWNLOAD ──
document.getElementById('downloadBtn').addEventListener('click', () => {
  const a = document.createElement('a');
  a.href = 'docs/Prathik_B_S_AIML_Resume.pdf';
  a.download = 'Prathik_B_S_AIML_Resume.pdf';
  a.click();
});
