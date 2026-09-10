document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initPetalsCanvas();
});

/* ==========================================================================
   1. FONDO DE ESTRELLAS Y DESTELLOS
   ========================================================================== */
function initStars() {
  const container = document.getElementById('stars-container');
  if (!container) return;
  container.innerHTML = '';
  const count = 50;
  
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star-dot');
    
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
    star.style.setProperty('--delay', `${Math.random() * 3}s`);
    
    container.appendChild(star);
  }
}

/* ==========================================================================
   2. ANIMACIÓN DE PÉTALOS FLOTANTES EN CANVAS
   ========================================================================== */
let petalsCanvas, ctx;
let petals = [];

function initPetalsCanvas() {
  petalsCanvas = document.getElementById('petals-canvas');
  if (!petalsCanvas) return;
  ctx = petalsCanvas.getContext('2d');

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  petals = [];
  for (let i = 0; i < 30; i++) {
    petals.push(createPetalObject());
  }

  requestAnimationFrame(animatePetals);
}

function resizeCanvas() {
  if (!petalsCanvas) return;
  petalsCanvas.width = window.innerWidth;
  petalsCanvas.height = window.innerHeight;
}

function createPetalObject() {
  return {
    x: Math.random() * (petalsCanvas ? petalsCanvas.width : 1000),
    y: Math.random() * (petalsCanvas ? petalsCanvas.height : 1000) - (petalsCanvas ? petalsCanvas.height : 1000),
    size: Math.random() * 10 + 7,
    speedY: Math.random() * 1.2 + 0.5,
    speedX: Math.random() * 0.8 - 0.4,
    rotation: Math.random() * 360,
    rotSpeed: Math.random() * 1.5 - 0.75,
    opacity: Math.random() * 0.6 + 0.4,
    color: Math.random() > 0.35 ? '#FFD700' : '#FFA500'
  };
}

function animatePetals() {
  if (!ctx || !petalsCanvas) return;
  ctx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);

  petals.forEach(p => {
    p.y += p.speedY;
    p.x += Math.sin(p.y * 0.01) + p.speedX;
    p.rotation += p.rotSpeed;

    if (p.y > petalsCanvas.height + 20) {
      p.y = -20;
      p.x = Math.random() * petalsCanvas.width;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size / 3, -p.size, 0, -p.size);
    ctx.bezierCurveTo(p.size / 3, -p.size, p.size / 2, -p.size / 2, 0, 0);
    ctx.fill();
    ctx.restore();
  });

  requestAnimationFrame(animatePetals);
}
