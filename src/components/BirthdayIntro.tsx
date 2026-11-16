import { motion, useReducedMotion } from 'motion/react';
import { Gift } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface BirthdayIntroProps {
  onOpenGift: () => void;
}

export function BirthdayIntro({ onOpenGift }: BirthdayIntroProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleOpen = () => {
    triggerHaptic([25, 45, 35]);
    onOpenGift();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen-dvh w-full flex flex-col items-center justify-center px-6 py-10 overflow-hidden"
      aria-label="Birthday surprise welcome screen"
    >
      {/* Subtle floating ambient petals in welcome screen */}
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {[
            { left: '12%', top: '18%', delay: 0, size: 18, color: '#F6BEC9' },
            { left: '84%', top: '14%', delay: 0.8, size: 14, color: '#E9E1F8' },
            { left: '20%', top: '78%', delay: 1.4, size: 16, color: '#FFE8D6' },
            { left: '78%', top: '74%', delay: 0.4, size: 20, color: '#F6BEC9' },
          ].map((dot, idx) => (
            <motion.div
              key={idx}
              className="absolute rounded-full opacity-60 blur-[1px]"
              style={{
                left: dot.left,
                top: dot.top,
                width: dot.size,
                height: dot.size,
                backgroundColor: dot.color,
              }}
              animate={{
                y: [-8, 10, -8],
                x: [-4, 6, -4],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 4.8 + idx * 0.7,
                repeat: Infinity,
                delay: dot.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center">
        {/* Animated botanical heart emblem */}
        <motion.div
          initial={prefersReducedMotion ? false : { scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative flex items-center justify-center"
        >
          <div
            className="absolute w-36 h-36 rounded-full opacity-65 blur-2xl"
            style={{
              background:
                'radial-gradient(circle, rgba(246,190,201,0.75) 0%, rgba(233,225,248,0.45) 60%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          <svg
            viewBox="0 0 160 160"
            className={`w-32 h-32 sm:w-36 sm:h-36 relative z-10 ${
              prefersReducedMotion ? '' : 'animate-heartbeat'
            }`}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="introHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E68A9E" />
                <stop offset="55%" stopColor="#C85D74" />
                <stop offset="100%" stopColor="#9E4257" />
              </linearGradient>
              <linearGradient id="introLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A9C4A4" />
                <stop offset="100%" stopColor="#6D916D" />
              </linearGradient>
            </defs>

            {/* Delicate botanical wreath leaves behind heart */}
            <path
              d="M42 104 C28 90, 26 70, 38 56 C46 72, 50 88, 42 104 Z"
              fill="url(#introLeafGrad)"
              opacity="0.75"
            />
            <path
              d="M118 104 C132 90, 134 70, 122 56 C114 72, 110 88, 118 104 Z"
              fill="url(#introLeafGrad)"
              opacity="0.75"
            />
            <path
              d="M32 82 C20 75, 18 62, 26 52 C35 61, 38 72, 32 82 Z"
              fill="url(#introLeafGrad)"
              opacity="0.55"
            />
            <path
              d="M128 82 C140 75, 142 62, 134 52 C125 61, 122 72, 128 82 Z"
              fill="url(#introLeafGrad)"
              opacity="0.55"
            />

            {/* Main sculpted 3D-shaded heart */}
            <path
              d="M80 132 C80 132 26 98 26 60 C26 40 42 26 60 26 C70 26 76 31 80 38 C84 31 90 26 100 26 C118 26 134 40 134 60 C134 98 80 132 80 132 Z"
              fill="url(#introHeartGrad)"
            />
            {/* Soft inner highlight for 3D silk feel */}
            <path
              d="M44 45 C49 38, 59 37, 65 42 C57 45, 50 53, 47 64 C42 58, 41 51, 44 45 Z"
              fill="#FFFFFF"
              opacity="0.32"
            />
            {/* Tiny golden sparkle stars */}
            <circle cx="34" cy="34" r="2.2" fill="#D49B8E" opacity="0.85" />
            <circle cx="126" cy="36" r="2" fill="#D49B8E" opacity="0.85" />
            <circle cx="80" cy="18" r="2.5" fill="#E8B4B8" opacity="0.9" />
          </svg>
        </motion.div>

        {/* Main welcome heading */}
        <motion.h1
          initial={prefersReducedMotion ? false : { y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#332026] text-balance leading-[1.15]"
        >
          Hey, Sowami! ❤️
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? false : { y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-base sm:text-lg text-[#684C54] max-w-xs sm:max-w-sm leading-relaxed"
        >
          Someone special has prepared a little birthday surprise for you...
        </motion.p>

        {/* Tactile thumb-friendly primary CTA */}
        <motion.div
          initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 w-full max-w-xs"
        >
          <button
            type="button"
            onClick={handleOpen}
            className="btn-shimmer relative overflow-hidden w-full min-h-[54px] px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#B76E79] via-[#C36D7E] to-[#9E4E5E] text-white font-semibold text-base tracking-wide shadow-[0_12px_28px_-6px_rgba(158,78,94,0.45)] active:scale-[0.97] hover:brightness-105 transition-all duration-200 flex items-center justify-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#964857] cursor-pointer"
          >
            <Gift className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Tap to Open Your Gift 🎁</span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
