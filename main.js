/* =============================================
   BHARAT SIDDHARTH YADAV — PORTFOLIO JS
   Three.js + GSAP + Custom Animations
   ============================================= */

// ── GSAP Plugin Registration ──────────────────
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ── Custom Cursor ─────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.05, ease: 'none' });
});

// Smooth follower
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  gsap.set(follower, { x: followerX, y: followerY });
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor scaling on hover
document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursor, { scale: 3, duration: 0.3, ease: 'back.out(2)' });
    gsap.to(follower, { scale: 0.3, opacity: 0.2, duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursor, { scale: 1, duration: 0.3 });
    gsap.to(follower, { scale: 1, opacity: 0.5, duration: 0.3 });
  });
});

// ── Navbar Scroll ─────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Reveal on Scroll ─────────────────────────
const revealEls = document.querySelectorAll('.reveal-up, .reveal-side');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger skill bars
      if (entry.target.classList.contains('skill-card')) {
        entry.target.classList.add('visible');
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '-30px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── Counter Animation ─────────────────────────
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  let start = 0;
  const duration = 1800;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + '+';
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + '+';
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count-num').forEach(el => counterObserver.observe(el));

// ── THREE.JS — Background Particle Field ─────
(function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.z = 50;

  // Grid of particles
  const count = 3000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color1 = new THREE.Color('#e8ff5a');
  const color2 = new THREE.Color('#5affe8');

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    const c = Math.random() < 0.5 ? color1 : color2;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animateBg() {
    requestAnimationFrame(animateBg);
    const t = performance.now() * 0.0003;
    particles.rotation.y = t * 0.3 + mx * 0.05;
    particles.rotation.x = t * 0.1 + my * 0.03;
    camera.position.y = -scrollY * 0.02;
    renderer.render(scene, camera);
  }
  animateBg();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
})();

// ── THREE.JS — Hero Orb ───────────────────────
(function initHeroOrb() {
  const canvas = document.getElementById('hero-orb');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.parentElement.offsetWidth, canvas.parentElement.offsetHeight);

  const scene = new THREE.Scene();
  const w = canvas.parentElement.offsetWidth;
  const h = canvas.parentElement.offsetHeight;
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
  camera.position.z = 5;

  // Wireframe sphere
  const geo = new THREE.IcosahedronGeometry(2, 4);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xe8ff5a,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  const sphere = new THREE.Mesh(geo, mat);
  scene.add(sphere);

  // Inner glowing sphere
  const innerGeo = new THREE.SphereGeometry(1.4, 64, 64);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x5affe8,
    transparent: true,
    opacity: 0.05,
    wireframe: true,
  });
  const innerSphere = new THREE.Mesh(innerGeo, innerMat);
  scene.add(innerSphere);

  // Floating dots around sphere
  const dotCount = 200;
  const dotGeo = new THREE.BufferGeometry();
  const dotPositions = new Float32Array(dotCount * 3);
  for (let i = 0; i < dotCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.1 + Math.random() * 0.8;
    dotPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    dotPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    dotPositions[i * 3 + 2] = r * Math.cos(phi);
  }
  dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
  const dotMat = new THREE.PointsMaterial({ color: 0xe8ff5a, size: 0.04, transparent: true, opacity: 0.8 });
  const dots = new THREE.Points(dotGeo, dotMat);
  scene.add(dots);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5);
    my = (e.clientY / window.innerHeight - 0.5);
  });

  function animateHero() {
    requestAnimationFrame(animateHero);
    const t = performance.now() * 0.0005;
    sphere.rotation.y = t * 0.4 + mx * 0.5;
    sphere.rotation.x = t * 0.2 + my * 0.3;
    innerSphere.rotation.y = -t * 0.3;
    innerSphere.rotation.z = t * 0.2;
    dots.rotation.y = t * 0.15;
    dots.rotation.x = t * 0.1;

    // Pulsing scale
    const pulse = 1 + Math.sin(t * 2) * 0.02;
    sphere.scale.setScalar(pulse);

    renderer.render(scene, camera);
  }
  animateHero();

  window.addEventListener('resize', () => {
    const w2 = canvas.parentElement.offsetWidth;
    const h2 = canvas.parentElement.offsetHeight;
    renderer.setSize(w2, h2);
    camera.aspect = w2 / h2;
    camera.updateProjectionMatrix();
  });
})();

// ── THREE.JS — Contact Orb ────────────────────
(function initContactOrb() {
  const canvas = document.getElementById('contact-orb');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.parentElement.offsetWidth, canvas.parentElement.offsetHeight);

  const scene = new THREE.Scene();
  const w = canvas.parentElement.offsetWidth;
  const h = canvas.parentElement.offsetHeight;
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
  camera.position.z = 5;

  // Toroidal shape
  const torusGeo = new THREE.TorusGeometry(1.5, 0.5, 20, 80);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x5affe8,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  scene.add(torus);

  const torus2Geo = new THREE.TorusGeometry(2.1, 0.2, 12, 60);
  const torus2Mat = new THREE.MeshBasicMaterial({
    color: 0xe8ff5a,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  });
  const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
  torus2.rotation.x = Math.PI / 3;
  scene.add(torus2);

  function animateContact() {
    requestAnimationFrame(animateContact);
    const t = performance.now() * 0.0004;
    torus.rotation.x = t * 0.5;
    torus.rotation.y = t * 0.3;
    torus2.rotation.z = t * 0.4;
    torus2.rotation.y = -t * 0.2;
    renderer.render(scene, camera);
  }
  animateContact();

  window.addEventListener('resize', () => {
    const w2 = canvas.parentElement.offsetWidth;
    const h2 = canvas.parentElement.offsetHeight;
    renderer.setSize(w2, h2);
    camera.aspect = w2 / h2;
    camera.updateProjectionMatrix();
  });
})();

// ── GSAP — Hero Entrance ─────────────────────
window.addEventListener('load', () => {
  // Staggered hero text
  gsap.fromTo('.hero-name .line',
    { opacity: 0, y: 80, skewY: 4 },
    {
      opacity: 1, y: 0, skewY: 0,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.12,
      delay: 0.3,
    }
  );

  gsap.fromTo('.hero-tag',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', delay: 0.1 }
  );

  gsap.fromTo('.hero-sub',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: 0.6 }
  );

  gsap.fromTo('.hero-cta',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', delay: 0.8 }
  );

  gsap.fromTo('.hero-scroll',
    { opacity: 0 },
    { opacity: 1, duration: 1, delay: 1.2 }
  );

  gsap.fromTo('.hero-count',
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration: 1, ease: 'expo.out', delay: 1 }
  );

  gsap.fromTo('#navbar',
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', delay: 0.2 }
  );
});

// ── GSAP — Parallax & ScrollTrigger ──────────
gsap.to('.hero-inner', {
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
  y: 150,
  opacity: 0,
  ease: 'none',
});

// Section title parallax
gsap.utils.toArray('.section-title').forEach(title => {
  gsap.fromTo(title, { y: 40 }, {
    y: -20,
    scrollTrigger: {
      trigger: title,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    }
  });
});

// Timeline items stagger
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  gsap.fromTo(item,
    { opacity: 0, x: -50 },
    {
      opacity: 1, x: 0, duration: 0.8,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      delay: i * 0.1,
    }
  );
});

// Project cards magnetic effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    gsap.to(card, { rotateX: -y, rotateY: x, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  });
});

// Skill cards same treatment
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    gsap.to(card, { rotateX: -y, rotateY: x, duration: 0.3, ease: 'power2.out', transformPerspective: 600 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
});

// ── Smooth Nav Scrolling ──────────────────────
document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 80 },
        duration: 1.2,
        ease: 'expo.inOut',
      });
    }
  });
});

// ── Noise texture grain overlay ───────────────
(function addGrain() {
  const style = document.createElement('style');
  style.textContent = `
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 200;
      opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
  `;
  document.head.appendChild(style);
})();

// ── Marquee pause on hover ────────────────────
document.querySelectorAll('.marquee-inner').forEach(m => {
  m.addEventListener('mouseenter', () => { m.style.animationPlayState = 'paused'; });
  m.addEventListener('mouseleave', () => { m.style.animationPlayState = 'running'; });
});

// ── Active nav section highlight ─────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}

window.addEventListener('scroll', setActiveNav);

console.log('%cBharat Siddharth Yadav — Portfolio', 'color: #e8ff5a; font-family: monospace; font-size: 16px; font-weight: bold;');
console.log('%cbharatsiddharthyadav@gmail.com | +91-9589359892', 'color: #5affe8; font-family: monospace;');
