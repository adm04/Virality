/**
 * Vantage Virality OS - Sophisticated Tech Dots Background Engine
 * High-performance, Retina-crisp canvas rendering of a looped dynamic
 * white tech grid with pulsating micro-dots, moving constellation signals,
 * and elegant interactive cursor illumination.
 */
(function() {
  'use strict';

  let canvas = null;
  let ctx = null;
  let animId = null;
  let isRunning = false;
  let width = 0;
  let height = 0;
  let dpr = 1;

  // Configuration
  const GRID_GAP = 28;
  const NODE_COUNT = 38;
  const CONNECT_DIST = 110;
  const MOUSE_RADIUS = 130;

  let nodes = [];
  let mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, active: false };

  function initNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1.2,
        baseAlpha: Math.random() * 0.25 + 0.15,
        pulseSpeed: Math.random() * 0.002 + 0.001,
        phase: Math.random() * Math.PI * 2,
        color: i % 3 === 0 ? '5, 150, 105' : (i % 3 === 1 ? '79, 70, 229' : '15, 23, 42')
      });
    }
  }

  function resize() {
    if (!canvas) return;
    const parent = canvas.parentElement;
    width = parent ? parent.clientWidth : window.innerWidth;
    height = parent ? parent.clientHeight : window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    if (nodes.length === 0) {
      initNodes();
    }
  }

  function render(time) {
    if (!isRunning || !ctx) return;

    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    ctx.clearRect(0, 0, width, height);

    // 1. Sophisticated Ambient Gradient Background (Clean Off-White / Crisp Tech Light)
    const bgGrad = ctx.createRadialGradient(width * 0.5, height * 0.4, 40, width * 0.5, height * 0.5, Math.max(width, height) * 0.85);
    bgGrad.addColorStop(0, '#FFFFFF');
    bgGrad.addColorStop(0.55, '#F8FAFC');
    bgGrad.addColorStop(1, '#EEF2F6');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Micro Dot Grid Matrix with Looped Tech Wave
    const cols = Math.ceil(width / GRID_GAP) + 1;
    const rows = Math.ceil(height / GRID_GAP) + 1;
    const startX = (width % GRID_GAP) / 2;
    const startY = (height % GRID_GAP) / 2;

    for (let c = 0; c < cols; c++) {
      const gx = startX + c * GRID_GAP;
      for (let r = 0; r < rows; r++) {
        const gy = startY + r * GRID_GAP;

        // Wave pulse equation
        const wave = Math.sin(time * 0.0014 + gx * 0.008 + gy * 0.008);
        const wave2 = Math.cos(time * 0.0018 + gx * 0.006 - gy * 0.005);
        const combined = (wave + wave2) * 0.5;

        // Mouse proximity interaction
        let dotR = 1.05 + combined * 0.35;
        let dotAlpha = 0.11 + combined * 0.06;
        let dotColor = '71, 85, 105'; // slate-600

        if (mouse.active) {
          const dx = gx - mouse.x;
          const dy = gy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const factor = 1 - dist / MOUSE_RADIUS;
            dotR += factor * 1.8;
            dotAlpha += factor * 0.4;
            dotColor = '5, 150, 105'; // emerald highlight
          }
        }

        ctx.fillStyle = `rgba(${dotColor}, ${Math.max(0.04, Math.min(0.7, dotAlpha))})`;
        ctx.beginPath();
        ctx.arc(gx, gy, Math.max(0.6, dotR), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3. Floating Constellation Nodes & Connecting Tech Lines
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Bounce smoothly off boundaries
      if (node.x < 0) { node.x = 0; node.vx *= -1; }
      else if (node.x > width) { node.x = width; node.vx *= -1; }
      if (node.y < 0) { node.y = 0; node.vy *= -1; }
      else if (node.y > height) { node.y = height; node.vy *= -1; }

      // Connect nearby nodes with subtle tech data lines
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j];
        const dx = node.x - nodeB.x;
        const dy = node.y - nodeB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DIST) {
          const lineAlpha = (1 - dist / CONNECT_DIST) * 0.18;
          ctx.strokeStyle = `rgba(5, 150, 105, ${lineAlpha})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }
      }

      // Draw node with soft glow
      const pulse = Math.sin(time * node.pulseSpeed + node.phase);
      const curRadius = node.radius + pulse * 0.4;
      const curAlpha = node.baseAlpha + pulse * 0.08;

      // Outer soft aura
      ctx.fillStyle = `rgba(${node.color}, ${curAlpha * 0.25})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, curRadius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Inner sharp core
      ctx.fillStyle = `rgba(${node.color}, ${curAlpha})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, curRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Subtle Interactive Mouse Halo
    if (mouse.active) {
      const haloGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS * 1.2);
      haloGrad.addColorStop(0, 'rgba(5, 150, 105, 0.07)');
      haloGrad.addColorStop(0.6, 'rgba(79, 70, 229, 0.025)');
      haloGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    animId = requestAnimationFrame(render);
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    resize();
    animId = requestAnimationFrame(render);
  }

  function stop() {
    isRunning = false;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  function initTechDots() {
    canvas = document.getElementById('auth-tech-dots-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    if (!ctx) return;

    const overlay = document.getElementById('auth-portal-overlay');

    // Resize listener
    window.addEventListener('resize', resize, { passive: true });

    // Mouse tracking on overlay
    if (overlay) {
      overlay.addEventListener('mousemove', function(e) {
        const rect = overlay.getBoundingClientRect();
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.active = true;
      });

      overlay.addEventListener('mouseleave', function() {
        mouse.active = false;
        mouse.targetX = -9999;
        mouse.targetY = -9999;
      });

      // Observer: start/stop loop when auth portal opens/closes to save CPU
      const observer = new MutationObserver(function() {
        if (overlay.classList.contains('active')) {
          start();
        } else {
          stop();
        }
      });
      observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });

      if (overlay.classList.contains('active')) {
        start();
      }
    } else {
      start();
    }
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTechDots);
  } else {
    initTechDots();
  }

  // Export globally
  window.initAuthTechDots = initTechDots;
})();
