import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Heart, MailOpen, X } from 'lucide-react';
import { LOVE_LETTER_CONTENT } from '../data/bouquetContent';
import { triggerHaptic } from '../utils/haptics';

interface LoveLetterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoveLetter({ isOpen, onClose }: LoveLetterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEnvelopeOpened(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setEnvelopeOpened(true);
    }, prefersReducedMotion ? 50 : 420);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, prefersReducedMotion]);

  const handleOpenEnvelope = () => {
    if (!envelopeOpened) {
      triggerHaptic(20);
      setEnvelopeOpened(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#332026]/45 backdrop-blur-sm p-0 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="love-letter-title"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { y: 48, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { y: 40, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#FFFBF7] border border-[#B76E79]/25 shadow-2xl p-5 sm:p-8"
          >
            {/* Mobile bottom sheet drag handle */}
            <div className="w-10 h-1.5 rounded-full bg-[#B76E79]/30 mx-auto mb-4 sm:hidden" aria-hidden="true" />

            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#B76E79]/15">
              <div className="flex items-center gap-2.5">
                <MailOpen className="w-5 h-5 text-[#964857]" aria-hidden="true" />
                <h2
                  id="love-letter-title"
                  className="font-display text-2xl font-semibold text-[#332026]"
                >
                  My Love Letter
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close love letter"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[#FDF2F4] text-[#684C54] hover:text-[#332026] hover:bg-[#FCE7EC] transition-colors focus-visible:outline-2 focus-visible:outline-[#964857] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Animated Envelope Visual */}
            <div className="mt-5 flex flex-col items-center">
              <button
                type="button"
                onClick={handleOpenEnvelope}
                className="relative w-full max-w-[260px] h-28 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#964857] rounded-xl cursor-pointer"
                aria-label={envelopeOpened ? 'Envelope opened' : 'Tap to open envelope'}
              >
                {/* Envelope body */}
                <div className="relative w-48 h-24 rounded-b-xl bg-gradient-to-b from-[#FCE7EC] to-[#F7D3DC] border border-[#B76E79]/30 shadow-sm overflow-visible">
                  {/* Animated Top Flap */}
                  <motion.div
                    initial={false}
                    animate={{
                      rotateX: envelopeOpened ? 175 : 0,
                      zIndex: envelopeOpened ? 0 : 20,
                    }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      transformOrigin: 'top center',
                      transformStyle: 'preserve-3d',
                    }}
                    className="absolute top-0 left-0 right-0 h-14"
                  >
                    <svg viewBox="0 0 192 56" className="w-full h-full drop-shadow-sm" aria-hidden="true">
                      <polygon
                        points="0,0 192,0 96,52"
                        fill="#F4C7D2"
                        stroke="#D49B8E"
                        strokeWidth="1"
                      />
                    </svg>
                  </motion.div>

                  {/* Rising mini letter preview inside envelope */}
                  <motion.div
                    initial={false}
                    animate={{
                      y: envelopeOpened ? -18 : 6,
                      opacity: envelopeOpened ? 1 : 0.65,
                    }}
                    transition={{ duration: 0.55, delay: 0.15 }}
                    className="absolute inset-x-3 top-2 h-16 rounded-md bg-white border border-[#B76E79]/20 shadow-sm flex items-center justify-center"
                  >
                    <Heart className="w-5 h-5 text-[#C85D74] fill-[#C85D74]" aria-hidden="true" />
                  </motion.div>

                  {/* Envelope front pocket */}
                  <svg
                    viewBox="0 0 192 96"
                    className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                    aria-hidden="true"
                  >
                    <polygon points="0,0 96,54 0,96" fill="#FBE8ED" />
                    <polygon points="192,0 96,54 192,96" fill="#F8DDE4" />
                    <polygon points="0,96 96,48 192,96" fill="#F5CFD9" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Handwritten Letter Paper */}
            <motion.article
              initial={false}
              animate={{
                opacity: envelopeOpened ? 1 : 0.25,
                y: envelopeOpened ? 0 : 14,
              }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 rounded-2xl bg-white border border-[#B76E79]/20 p-5 sm:p-7 shadow-[0_6px_20px_rgba(183,110,121,0.08)]"
            >
              <p className="font-handwritten text-2xl sm:text-3xl text-[#964857]">
                {LOVE_LETTER_CONTENT.greeting}
              </p>

              <div className="mt-4 space-y-4 text-[15px] sm:text-base text-[#3E282F] leading-relaxed">
                {LOVE_LETTER_CONTENT.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#B76E79]/15 text-right">
                <p className="text-sm text-[#684C54]">{LOVE_LETTER_CONTENT.closing}</p>
                <p className="font-handwritten text-2xl text-[#964857] mt-1">
                  {LOVE_LETTER_CONTENT.signature}
                </p>
              </div>
            </motion.article>

            <div className="mt-5">
              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[48px] rounded-2xl bg-[#964857] text-white font-semibold text-sm hover:bg-[#823C4A] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#964857]"
              >
                Keep This Close ❤️
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
