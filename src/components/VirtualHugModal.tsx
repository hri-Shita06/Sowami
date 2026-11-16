import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Heart, X } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface VirtualHugModalProps {
  isOpen: boolean;
  hugCount: number;
  onSendAnotherHug: () => void;
  onClose: () => void;
}

export function VirtualHugModal({
  isOpen,
  hugCount,
  onSendAnotherHug,
  onClose,
}: VirtualHugModalProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#332026]/45 backdrop-blur-sm p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="virtual-hug-title"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { y: 40, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-[#FFFBF7] border border-[#B76E79]/25 p-6 sm:p-8 shadow-2xl text-center"
          >
            <div className="w-10 h-1.5 rounded-full bg-[#B76E79]/30 mx-auto mb-3 sm:hidden" aria-hidden="true" />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close virtual hug"
                className="min-h-[44px] min-w-[44px] rounded-full bg-[#FDF2F4] text-[#684C54] hover:text-[#332026] flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#964857]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Animated hugging heart emblem */}
            <div className="relative mx-auto w-36 h-32 flex items-center justify-center">
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [1, 1.12, 1] }
                }
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <svg viewBox="0 0 140 120" className="w-32 h-28" aria-hidden="true">
                  <defs>
                    <linearGradient id="hugHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F29BB0" />
                      <stop offset="100%" stopColor="#C85D74" />
                    </linearGradient>
                  </defs>
                  {/* Embracing warm ribbon arms */}
                  <motion.path
                    d="M22 66 C18 46, 38 36, 52 54 C58 62, 62 72, 68 78"
                    fill="none"
                    stroke="#D49B8E"
                    strokeWidth="9"
                    strokeLinecap="round"
                    animate={
                      prefersReducedMotion ? undefined : { x: [0, 4, 0] }
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.path
                    d="M118 66 C122 46, 102 36, 88 54 C82 62, 78 72, 72 78"
                    fill="none"
                    stroke="#B76E79"
                    strokeWidth="9"
                    strokeLinecap="round"
                    animate={
                      prefersReducedMotion ? undefined : { x: [0, -4, 0] }
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <path
                    d="M70 98 C70 98 34 74 34 49 C34 36 45 27 57 27 C64 27 68 31 70 36 C72 31 76 27 83 27 C95 27 106 36 106 49 C106 74 70 98 70 98 Z"
                    fill="url(#hugHeart)"
                  />
                </svg>
              </motion.div>
            </div>

            <h2
              id="virtual-hug-title"
              className="mt-2 font-display text-3xl font-semibold text-[#332026]"
            >
              Sending You the Warmest Hug, Sowami! 🤗
            </h2>

            <p className="mt-3 text-[15px] sm:text-base text-[#4A3239] leading-relaxed">
              Imagine me wrapping my arms around you right now, holding you tight, and whispering how proud I am of you and how deeply I love you.
            </p>

            <p className="mt-3 text-xs font-medium text-[#8A6D75] tabular-nums">
              Birthday hugs delivered: {hugCount}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic([35, 65, 40]);
                  onSendAnotherHug();
                }}
                className="flex-1 min-h-[48px] px-5 rounded-2xl bg-[#964857] text-white font-semibold text-sm hover:bg-[#823C4A] active:scale-[0.97] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#964857]"
              >
                <Heart className="w-4 h-4 fill-white" aria-hidden="true" />
                <span>Squeeze Tighter ❤️</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="min-h-[48px] px-5 rounded-2xl bg-[#FDF2F4] text-[#332026] font-medium text-sm hover:bg-[#FCE7EC] active:scale-[0.97] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#964857]"
              >
                Back to Bouquet
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
