import { useEffect, useMemo, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface BloomingAnimationProps {
  isActive: boolean;
  confettiTrigger: number;
}

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: 'rect' | 'petal' | 'heart';
  opacity: number;
}

const CONFETTI_COLORS = [
  '#F4A9B8',
  '#E07A91',
  '#D49B8E',
  '#B76E79',
  '#C8B6E8',
  '#F9C5A7',
  '#88A987',
  '#FFF2E6',
];

export function BloomingAnimation({ isActive, confettiTrigger }: BloomingAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger celebratory canvas confetti whenever confettiTrigger increments
  useEffect(() => {
    if (confettiTrigger === 0 || prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const count = width < 640 ? 70 : 110;

    const pieces: ConfettiPiece[] = Array.from({ length: count }, (_, idx) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.65;
      const speed = 5 + Math.random() * 9.5;
      const shapes: Array<'rect' | 'petal' | 'heart'> = ['petal', 'heart', 'rect'];
      return {
        x: width * 0.5 + (Math.random() - 0.5) * 90,
        y: height * 0.45 + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: 6 + Math.random() * 7,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.16,
        color: CONFETTI_COLORS[idx % CONFETTI_COLORS.length],
        shape: shapes[idx % shapes.length],
        opacity: 1,
      };
    });

    let rafId = 0;
    let frame = 0;

    const drawHeart = (c: CanvasRenderingContext2D, s: number) => {
      c.beginPath();
      c.moveTo(0, s * 0.35);
      c.bezierCurveTo(-s * 0.5, -s * 0.25, -s, s * 0.25, 0, s);
      c.bezierCurveTo(s, s * 0.25, s * 0.5, -s * 0.25, 0, s * 0.35);
      c.fill();
    };

    const tick = () => {
      frame += 1;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      let alive = false;
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.19; // gentle gravity
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        if (frame > 85) {
          p.opacity = Math.max(0, p.opacity - 0.015);
        }

        if (p.opacity > 0.02 && p.y < window.innerHeight + 60) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          if (p.shape === 'heart') {
            drawHeart(ctx, p.size * 0.9);
          } else if (p.shape === 'petal') {
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.65, p.size * 0.38, 0, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(-p.size * 0.5, -p.size * 0.28, p.size, p.size * 0.55);
          }
          ctx.restore();
        }
      }

      if (alive && frame < 240) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [confettiTrigger, prefersReducedMotion]);

  // Precomputed floating hearts, falling petals, and subtle sparkles
  const floatingHearts = useMemo(
    () => [
      { left: '8%', size: 16, duration: 11, delay: 0, color: '#E88B9D' },
      { left: '22%', size: 13, duration: 13.5, delay: 2.2, color: '#D49B8E' },
      { left: '42%', size: 15, duration: 12, delay: 4.5, color: '#F2A5B5' },
      { left: '66%', size: 18, duration: 14, delay: 1.3, color: '#C8B6E8' },
      { left: '83%', size: 14, duration: 10.8, delay: 3.1, color: '#E88B9D' },
      { left: '92%', size: 15, duration: 12.6, delay: 5.4, color: '#F9C5A7' },
    ],
    []
  );

  const fallingPetals = useMemo(
    () => [
      { left: '14%', width: 13, height: 9, duration: 12.5, delay: 0.4, color: '#F6BEC9' },
      { left: '34%', width: 11, height: 8, duration: 14.2, delay: 2.8, color: '#FAD4C0' },
      { left: '56%', width: 14, height: 10, duration: 11.8, delay: 1.5, color: '#F2A5B5' },
      { left: '74%', width: 12, height: 8, duration: 13.4, delay: 4.2, color: '#E9E1F8' },
      { left: '88%', width: 13, height: 9, duration: 12.1, delay: 6.1, color: '#F6BEC9' },
    ],
    []
  );

  const sparkles = useMemo(
    () => [
      { left: '18%', top: '26%', delay: 0.2 },
      { left: '79%', top: '22%', delay: 1.1 },
      { left: '12%', top: '58%', delay: 1.8 },
      { left: '86%', top: '54%', delay: 0.7 },
      { left: '50%', top: '16%', delay: 2.4 },
    ],
    []
  );

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 w-full h-full"
        aria-hidden="true"
      />

      {!prefersReducedMotion && (
        <div
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Continuous floating hearts */}
          {floatingHearts.map((heart, idx) => (
            <motion.div
              key={`heart-${idx}`}
              className="absolute bottom-[-36px]"
              style={{ left: heart.left }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: '-112vh',
                x: [0, 14, -12, 8, 0],
                opacity: [0, 0.55, 0.5, 0],
              }}
              transition={{
                duration: heart.duration,
                repeat: Infinity,
                delay: heart.delay,
                ease: 'linear',
              }}
            >
              <svg
                width={heart.size}
                height={heart.size}
                viewBox="0 0 24 24"
                fill={heart.color}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          ))}

          {/* Falling flower petals (intensified after bouquet opens) */}
          {isActive &&
            fallingPetals.map((petal, idx) => (
              <motion.div
                key={`petal-${idx}`}
                className="absolute top-[-24px]"
                style={{
                  left: petal.left,
                  width: petal.width,
                  height: petal.height,
                  backgroundColor: petal.color,
                  borderRadius: '60% 40% 65% 35% / 55% 45% 55% 45%',
                }}
                initial={{ y: 0, opacity: 0, rotate: 0 }}
                animate={{
                  y: '110vh',
                  x: [0, 28, -22, 18, 0],
                  rotate: [0, 120, 240, 360],
                  opacity: [0, 0.72, 0.65, 0],
                }}
                transition={{
                  duration: petal.duration,
                  repeat: Infinity,
                  delay: petal.delay,
                  ease: 'linear',
                }}
              />
            ))}

          {/* Magical sparkles around the canvas */}
          {isActive &&
            sparkles.map((sp, idx) => (
              <motion.div
                key={`sparkle-${idx}`}
                className="absolute"
                style={{ left: sp.left, top: sp.top }}
                animate={{
                  scale: [0.4, 1.15, 0.4],
                  opacity: [0.15, 0.85, 0.15],
                  rotate: [0, 45, 90],
                }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  delay: sp.delay,
                  ease: 'easeInOut',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#D49B8E">
                  <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
                </svg>
              </motion.div>
            ))}
        </div>
      )}
    </>
  );
}
