import { motion, useReducedMotion } from 'motion/react';
import { BIRTHDAY_MESSAGE_PARAGRAPHS } from '../data/bouquetContent';

export function BirthdayMessage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      aria-labelledby="birthday-love-message-heading"
      className="w-full rounded-3xl bg-white/80 backdrop-blur-md border border-[#B76E79]/20 p-6 sm:p-8 shadow-[0_14px_34px_rgba(150,72,87,0.06)]"
    >
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#B76E79]/15">
        <h2
          id="birthday-love-message-heading"
          className="font-display text-2xl sm:text-3xl font-semibold text-[#332026]"
        >
          A Birthday Note for Sowami
        </h2>
        <span className="font-handwritten text-xl text-[#964857] shrink-0">
          With all my heart
        </span>
      </div>

      <div className="mt-5 space-y-4 text-[15px] sm:text-base text-[#4A3239] leading-[1.72]">
        {BIRTHDAY_MESSAGE_PARAGRAPHS.map((paragraph, index) => (
          <p
            key={index}
            className={
              index === 0
                ? 'font-display text-xl sm:text-2xl font-semibold text-[#332026]'
                : index === BIRTHDAY_MESSAGE_PARAGRAPHS.length - 1
                  ? 'font-medium text-[#964857] pt-1'
                  : ''
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
    </motion.section>
  );
}
