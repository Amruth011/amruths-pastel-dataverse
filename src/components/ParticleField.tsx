import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
  angle: number;
  speed: number;
  hue: number;
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const trailRef = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  const createParticles = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 6000), 180);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.8 + 0.5,
        baseX: x, baseY: y,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.003 + 0.001,
        hue: 40 + Math.random() * 15, // gold range
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = rect?.width || window.innerWidth;
      const h = rect?.height || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      particlesRef.current = createParticles(w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleLeave);

    const magnetRadius = 140;
    const connectDist = 100;

    const animate = () => {
      const w = canvas.width / (Math.min(window.devicePixelRatio, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio, 2));
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 1;
      const t = timeRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;

      // Update cursor trail
      const trail = trailRef.current;
      if (mx > 0 && my > 0) {
        trail.unshift({ x: mx, y: my, alpha: 0.5 });
        if (trail.length > 20) trail.pop();
      }
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].alpha *= 0.88;
        if (trail[i].alpha < 0.01) trail.splice(i, 1);
      }

      // Draw cursor trail
      if (trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
          ctx.lineTo(trail[i].x, trail[i].y);
        }
        ctx.strokeStyle = `hsla(46, 78%, 59%, 0.15)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw cursor glow
      if (mx > 0 && my > 0) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, magnetRadius);
        glow.addColorStop(0, 'hsla(46, 78%, 59%, 0.03)');
        glow.addColorStop(1, 'hsla(46, 78%, 59%, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(mx - magnetRadius, my - magnetRadius, magnetRadius * 2, magnetRadius * 2);
      }

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Circular wave motion
        p.angle += p.speed;
        const waveX = Math.cos(p.angle + t * 0.005) * 20;
        const waveY = Math.sin(p.angle * 1.3 + t * 0.004) * 15;

        // Target position
        let tx = p.baseX + waveX;
        let ty = p.baseY + waveY;

        // Magnetic cursor effect
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < magnetRadius && mx > 0) {
          const force = (1 - dist / magnetRadius) * 2.5;
          tx = p.x + dx * force * 0.08;
          ty = p.y + dy * force * 0.08;
        }

        // Smooth interpolation
        p.x += (tx - p.x) * 0.04;
        p.y += (ty - p.y) * 0.04;

        // Wrap
        if (p.x < -10) { p.x = w + 10; p.baseX = w + 10; }
        if (p.x > w + 10) { p.x = -10; p.baseX = -10; }
        if (p.y < -10) { p.y = h + 10; p.baseY = h + 10; }
        if (p.y > h + 10) { p.y = -10; p.baseY = -10; }

        // Glow near cursor
        const nearCursor = dist < magnetRadius && mx > 0;
        const glowAlpha = nearCursor ? 0.3 + (1 - dist / magnetRadius) * 0.7 : 0.2;
        const r = nearCursor ? p.radius * (1 + (1 - dist / magnetRadius) * 0.8) : p.radius;

        // Draw particle with gradient
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        grad.addColorStop(0, `hsla(${p.hue}, 78%, 59%, ${glowAlpha})`);
        grad.addColorStop(0.4, `hsla(${p.hue}, 78%, 59%, ${glowAlpha * 0.5})`);
        grad.addColorStop(1, `hsla(${p.hue}, 78%, 59%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 78%, 62%, ${glowAlpha})`;
        ctx.fill();

        // Connection lines (only check ahead to avoid duplicates)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cx = p.x - p2.x;
          const cy = p.y - p2.y;
          const cd = Math.sqrt(cx * cx + cy * cy);
          if (cd < connectDist) {
            const alpha = (1 - cd / connectDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(0, 0%, 70%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
};

export default ParticleField;
