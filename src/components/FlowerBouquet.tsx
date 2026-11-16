import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { FLOWER_NOTES, FlowerNote } from '../data/bouquetContent';
import { triggerHaptic } from '../utils/haptics';

interface FlowerBouquetProps {
  isOpened: boolean;
  onOpenBouquet: () => void;
  selectedFlower: FlowerNote | null;
  onSelectFlower: (flower: FlowerNote) => void;
  highlightFlowers: boolean;
}

export function FlowerBouquet({
  isOpened,
  onOpenBouquet,
  selectedFlower,
  onSelectFlower,
  highlightFlowers,
}: FlowerBouquetProps) {
  const prefersReducedMotion = useReducedMotion();

  const findFlower = (id: string) =>
    FLOWER_NOTES.find((f) => f.id === id) || FLOWER_NOTES[0];

  const handleFlowerTap = (id: string) => {
    if (!isOpened) return;
    triggerHaptic(18);
    onSelectFlower(findFlower(id));
  };

  const handleOpenClick = () => {
    triggerHaptic([30, 50, 70]);
    onOpenBouquet();
  };

  const getFlowerSpring = (delay: number) =>
    prefersReducedMotion
      ? { duration: 0.25 }
      : {
          type: 'spring' as const,
          stiffness: 150,
          damping: 14,
          delay,
        };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Centerpiece Interactive 3D-Styled Bouquet */}
      <div className="relative w-full bouquet-stage-size mx-auto flex flex-col items-center">
        {/* Soft warm radiant halo behind the bouquet */}
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] aspect-square rounded-full blur-3xl"
          animate={{
            opacity: isOpened ? 0.85 : 0.45,
            scale: isOpened ? 1.06 : 0.92,
          }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            background:
              'radial-gradient(circle, rgba(252,213,221,0.75) 0%, rgba(255,232,214,0.55) 45%, rgba(233,225,248,0.35) 75%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <svg
          viewBox="0 0 420 460"
          className="relative z-10 w-full h-auto select-none overflow-visible drop-shadow-[0_18px_36px_rgba(125,68,80,0.14)]"
          role="img"
          aria-label={
            isOpened
              ? 'An open birthday flower bouquet with roses, a sunflower, a lavender tulip, a peach lily, and baby’s breath. Tap any flower to read a romantic note.'
              : 'A wrapped birthday flower bouquet tied with a rose-gold ribbon.'
          }
        >
          <defs>
            {/* Wrapping paper gradients */}
            <linearGradient id="wrapBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9ECE6" />
              <stop offset="55%" stopColor="#F2DCD4" />
              <stop offset="100%" stopColor="#E4C4BA" />
            </linearGradient>
            <linearGradient id="wrapFrontLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDEBF0" />
              <stop offset="55%" stopColor="#F7D8DF" />
              <stop offset="100%" stopColor="#E8BEC8" />
            </linearGradient>
            <linearGradient id="wrapFrontRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF6F2" />
              <stop offset="60%" stopColor="#F6E1D9" />
              <stop offset="100%" stopColor="#E4C5BC" />
            </linearGradient>
            <linearGradient id="tissueInner" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFDFB" />
              <stop offset="100%" stopColor="#FBE6EC" />
            </linearGradient>

            {/* Rose-gold ribbon */}
            <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5B6AE" />
              <stop offset="50%" stopColor="#C17884" />
              <stop offset="100%" stopColor="#9B4D5D" />
            </linearGradient>

            {/* Foliage gradients */}
            <linearGradient id="leafGreen1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A6C4A1" />
              <stop offset="100%" stopColor="#5D845F" />
            </linearGradient>
            <linearGradient id="leafGreen2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BDD4B8" />
              <stop offset="100%" stopColor="#759B76" />
            </linearGradient>

            {/* Velvet crimson rose gradients */}
            <radialGradient id="crimsonOuter" cx="42%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#EE8198" />
              <stop offset="55%" stopColor="#C94965" />
              <stop offset="100%" stopColor="#8E2841" />
            </radialGradient>
            <radialGradient id="crimsonInner" cx="45%" cy="38%" r="60%">
              <stop offset="0%" stopColor="#F5A3B5" />
              <stop offset="60%" stopColor="#D65A76" />
              <stop offset="100%" stopColor="#9E314B" />
            </radialGradient>

            {/* Blush pink rose gradients */}
            <radialGradient id="blushOuter" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFF0F4" />
              <stop offset="55%" stopColor="#F5B2C2" />
              <stop offset="100%" stopColor="#D4748B" />
            </radialGradient>
            <radialGradient id="blushInner" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFE6ED" />
              <stop offset="65%" stopColor="#EA95AA" />
              <stop offset="100%" stopColor="#C46179" />
            </radialGradient>

            {/* Sunflower gradients */}
            <linearGradient id="sunPetal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE27A" />
              <stop offset="65%" stopColor="#F4B63F" />
              <stop offset="100%" stopColor="#D6831E" />
            </linearGradient>
            <radialGradient id="sunCore" cx="42%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#7C523B" />
              <stop offset="70%" stopColor="#4F3021" />
              <stop offset="100%" stopColor="#351E14" />
            </radialGradient>

            {/* Lavender tulip gradient */}
            <linearGradient id="tulipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EFE9FC" />
              <stop offset="50%" stopColor="#C7B0EA" />
              <stop offset="100%" stopColor="#8C6DB9" />
            </linearGradient>
            <linearGradient id="tulipInner" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DFD0F7" />
              <stop offset="100%" stopColor="#7656A6" />
            </linearGradient>

            {/* Peach lily gradient */}
            <linearGradient id="lilyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF7F2" />
              <stop offset="52%" stopColor="#FBC6AD" />
              <stop offset="100%" stopColor="#DF8B73" />
            </linearGradient>
          </defs>

          {/* 1. Back Wrapping Paper Cone */}
          <motion.g
            animate={{
              scale: isOpened ? 1.04 : 0.96,
              y: isOpened ? 8 : 0,
            }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '210px 350px' }}
          >
            <polygon
              points="210,418 76,188 152,140 268,140 344,188"
              fill="url(#wrapBackGrad)"
              stroke="#E2BEB4"
              strokeWidth="1.5"
            />
            {/* Soft inner tissue paper */}
            <path
              d="M95 190 Q150 132 210 144 Q270 132 325 190 L210 355 Z"
              fill="url(#tissueInner)"
              opacity="0.92"
            />
          </motion.g>

          {/* 2. Stems & Soft Green Eucalyptus Foliage */}
          <g className={isOpened && !prefersReducedMotion ? 'animate-breeze-alt' : ''}>
            {/* Stems tucked in paper */}
            <path d="M210 210 L210 385" stroke="#5E825E" strokeWidth="6" strokeLinecap="round" />
            <path d="M148 215 L205 375" stroke="#6B8E6B" strokeWidth="5" strokeLinecap="round" />
            <path d="M275 215 L215 375" stroke="#6B8E6B" strokeWidth="5" strokeLinecap="round" />
            <path d="M158 145 L202 360" stroke="#799E79" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M266 150 L218 360" stroke="#799E79" strokeWidth="4.5" strokeLinecap="round" />

            {/* Layered eucalyptus & leaves */}
            <motion.g
              animate={{
                scale: isOpened ? 1 : 0.78,
                opacity: isOpened ? 1 : 0.8,
              }}
              transition={{ duration: 0.65, delay: 0.12 }}
              style={{ transformOrigin: '210px 260px' }}
            >
              <path d="M118 228 C82 200, 74 166, 98 144 C118 166, 126 196, 118 228 Z" fill="url(#leafGreen1)" />
              <path d="M304 228 C340 200, 348 166, 324 144 C304 166, 296 196, 304 228 Z" fill="url(#leafGreen1)" />
              <path d="M138 158 C118 122, 122 88, 146 74 C156 102, 152 132, 138 158 Z" fill="url(#leafGreen2)" />
              <path d="M282 158 C302 122, 298 88, 274 74 C264 102, 268 132, 282 158 Z" fill="url(#leafGreen2)" />
              <path d="M210 128 C196 92, 200 62, 210 48 C220 62, 224 92, 210 128 Z" fill="url(#leafGreen1)" opacity="0.88" />
              <ellipse cx="96" cy="212" rx="14" ry="9" transform="rotate(-35 96 212)" fill="url(#leafGreen2)" />
              <ellipse cx="324" cy="212" rx="14" ry="9" transform="rotate(35 324 212)" fill="url(#leafGreen2)" />
            </motion.g>
          </g>

          {/* 3. FLOWERS — Bloom one by one when opened! */}

          {/* 3A. Baby's Breath Clusters (Tap target) */}
          <motion.g
            animate={{
              scale: isOpened ? 1 : 0.35,
              opacity: isOpened ? 1 : 0.35,
            }}
            transition={getFlowerSpring(0.75)}
            style={{ transformOrigin: '210px 180px' }}
            onClick={() => handleFlowerTap('babys-breath')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFlowerTap('babys-breath');
              }
            }}
            role={isOpened ? 'button' : undefined}
            tabIndex={isOpened ? 0 : -1}
            aria-label="Tap Baby's Breath & Greenery for a romantic note"
            className={isOpened ? 'cursor-pointer outline-none' : ''}
          >
            {[
              [104, 178],
              [118, 162],
              [94, 192],
              [316, 178],
              [302, 162],
              [326, 192],
              [210, 96],
              [194, 106],
              [226, 106],
            ].map(([cx, cy], idx) => (
              <g key={idx}>
                <circle cx={cx} cy={cy} r="7.5" fill="#FFFFFF" stroke="#F4D7DF" strokeWidth="1.2" />
                <circle cx={cx} cy={cy} r="2.2" fill="#F2C894" />
              </g>
            ))}
            {isOpened && <circle cx="106" cy="176" r="32" fill="transparent" />}
            {isOpened && <circle cx="314" cy="176" r="32" fill="transparent" />}
          </motion.g>

          {/* 3B. Lavender Tulip (Upper Left) */}
          <motion.g
            animate={{
              scale: isOpened ? 1 : 0.42,
              y: isOpened ? 0 : 28,
              rotate: isOpened ? -12 : -4,
            }}
            transition={getFlowerSpring(0.45)}
            style={{ transformOrigin: '154px 136px' }}
            onClick={() => handleFlowerTap('lavender-tulip')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFlowerTap('lavender-tulip');
              }
            }}
            role={isOpened ? 'button' : undefined}
            tabIndex={isOpened ? 0 : -1}
            aria-label="Tap Lavender Tulip for a romantic note"
            className={isOpened ? 'cursor-pointer outline-none' : ''}
          >
            <g className={isOpened && !prefersReducedMotion ? 'animate-breeze' : ''}>
              {/* Highlight ring when active or guided */}
              {(selectedFlower?.id === 'lavender-tulip' || highlightFlowers) && isOpened && (
                <circle
                  cx="154"
                  cy="128"
                  r="40"
                  fill="none"
                  stroke="#8E74B8"
                  strokeWidth="2.5"
                  strokeDasharray="5 4"
                  opacity="0.75"
                />
              )}
              <path d="M154 92 C132 104, 130 144, 154 156 C178 144, 176 104, 154 92 Z" fill="url(#tulipInner)" />
              <path d="M154 156 C126 146, 120 114, 138 98 C146 116, 148 138, 154 156 Z" fill="url(#tulipGrad)" />
              <path d="M154 156 C182 146, 188 114, 170 98 C162 116, 160 138, 154 156 Z" fill="url(#tulipGrad)" />
              <path d="M154 158 C142 138, 142 110, 154 94 C166 110, 166 138, 154 158 Z" fill="#EFE9FC" opacity="0.65" />
              <circle cx="154" cy="128" r="38" fill="transparent" />
            </g>
          </motion.g>

          {/* 3C. Peach Blossom Lily (Upper Right) */}
          <motion.g
            animate={{
              scale: isOpened ? 1 : 0.42,
              y: isOpened ? 0 : 28,
              rotate: isOpened ? 12 : 4,
            }}
            transition={getFlowerSpring(0.58)}
            style={{ transformOrigin: '266px 136px' }}
            onClick={() => handleFlowerTap('peach-lily')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFlowerTap('peach-lily');
              }
            }}
            role={isOpened ? 'button' : undefined}
            tabIndex={isOpened ? 0 : -1}
            aria-label="Tap Peach Blossom Lily for a romantic note"
            className={isOpened ? 'cursor-pointer outline-none' : ''}
          >
            <g className={isOpened && !prefersReducedMotion ? 'animate-breeze-alt' : ''}>
              {(selectedFlower?.id === 'peach-lily' || highlightFlowers) && isOpened && (
                <circle
                  cx="266"
                  cy="128"
                  r="42"
                  fill="none"
                  stroke="#D9826C"
                  strokeWidth="2.5"
                  strokeDasharray="5 4"
                  opacity="0.75"
                />
              )}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <path
                  key={deg}
                  d="M266 128 C254 102, 260 82, 266 78 C272 82, 278 102, 266 128 Z"
                  fill="url(#lilyGrad)"
                  stroke="#F4B29D"
                  strokeWidth="0.8"
                  transform={`rotate(${deg} 266 128)`}
                />
              ))}
              {/* Lily stamens */}
              <circle cx="266" cy="128" r="7" fill="#FFE6B3" />
              <circle cx="260" cy="118" r="2.2" fill="#D9822B" />
              <circle cx="272" cy="118" r="2.2" fill="#D9822B" />
              <circle cx="266" cy="138" r="2.2" fill="#D9822B" />
              <circle cx="266" cy="128" r="40" fill="transparent" />
            </g>
          </motion.g>

          {/* 3D. Blush Garden Rose (Middle Left) */}
          <motion.g
            animate={{
              scale: isOpened ? 1 : 0.45,
              y: isOpened ? 0 : 24,
            }}
            transition={getFlowerSpring(0.28)}
            style={{ transformOrigin: '142px 206px' }}
            onClick={() => handleFlowerTap('pink-rose')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFlowerTap('pink-rose');
              }
            }}
            role={isOpened ? 'button' : undefined}
            tabIndex={isOpened ? 0 : -1}
            aria-label="Tap Blush Garden Rose for a romantic note"
            className={isOpened ? 'cursor-pointer outline-none' : ''}
          >
            <g className={isOpened && !prefersReducedMotion ? 'animate-breeze' : ''}>
              {(selectedFlower?.id === 'pink-rose' || highlightFlowers) && isOpened && (
                <circle
                  cx="142"
                  cy="206"
                  r="44"
                  fill="none"
                  stroke="#DF7A92"
                  strokeWidth="2.5"
                  strokeDasharray="5 4"
                  opacity="0.8"
                />
              )}
              <circle cx="142" cy="206" r="36" fill="url(#blushOuter)" />
              <path d="M110 202 C110 176, 146 168, 166 184 C154 196, 128 202, 110 202 Z" fill="#FFE6EE" opacity="0.8" />
              <path d="M174 206 C174 232, 138 242, 118 224 C132 214, 158 208, 174 206 Z" fill="#DA7E94" opacity="0.7" />
              <circle cx="142" cy="206" r="24" fill="url(#blushInner)" />
              <path d="M126 202 C132 186, 156 188, 158 204 C152 216, 132 216, 126 202 Z" fill="#FAD2DC" />
              <path d="M134 205 C138 197, 150 198, 150 206 C146 212, 136 212, 134 205 Z" fill="#C46179" />
              <circle cx="142" cy="206" r="40" fill="transparent" />
            </g>
          </motion.g>

          {/* 3E. Golden Sunflower (Middle Right) */}
          <motion.g
            animate={{
              scale: isOpened ? 1 : 0.45,
              y: isOpened ? 0 : 24,
            }}
            transition={getFlowerSpring(0.38)}
            style={{ transformOrigin: '278px 206px' }}
            onClick={() => handleFlowerTap('sunflower')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFlowerTap('sunflower');
              }
            }}
            role={isOpened ? 'button' : undefined}
            tabIndex={isOpened ? 0 : -1}
            aria-label="Tap Golden Sunflower for a romantic note"
            className={isOpened ? 'cursor-pointer outline-none' : ''}
          >
            <g className={isOpened && !prefersReducedMotion ? 'animate-breeze-alt' : ''}>
              {(selectedFlower?.id === 'sunflower' || highlightFlowers) && isOpened && (
                <circle
                  cx="278"
                  cy="206"
                  r="46"
                  fill="none"
                  stroke="#D99326"
                  strokeWidth="2.5"
                  strokeDasharray="5 4"
                  opacity="0.8"
                />
              )}
              {Array.from({ length: 16 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="278"
                  cy="172"
                  rx="7.5"
                  ry="19"
                  fill="url(#sunPetal)"
                  stroke="#D98B1E"
                  strokeWidth="0.6"
                  transform={`rotate(${i * 22.5} 278 206)`}
                />
              ))}
              <circle cx="278" cy="206" r="19" fill="url(#sunCore)" />
              <circle cx="278" cy="206" r="13" fill="none" stroke="#8C5F43" strokeWidth="1.5" strokeDasharray="2 3" />
              <circle cx="278" cy="206" r="42" fill="transparent" />
            </g>
          </motion.g>

          {/* 3F. Center Velvet Heart Rose (Hero Bloom) */}
          <motion.g
            animate={{
              scale: isOpened ? 1 : 0.48,
              y: isOpened ? 0 : 20,
            }}
            transition={getFlowerSpring(0.15)}
            style={{ transformOrigin: '210px 180px' }}
            onClick={() => handleFlowerTap('crimson-rose')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFlowerTap('crimson-rose');
              }
            }}
            role={isOpened ? 'button' : undefined}
            tabIndex={isOpened ? 0 : -1}
            aria-label="Tap Velvet Heart Rose for a romantic note"
            className={isOpened ? 'cursor-pointer outline-none' : ''}
          >
            <g className={isOpened && !prefersReducedMotion ? 'animate-breeze' : ''}>
              {(selectedFlower?.id === 'crimson-rose' || highlightFlowers) && isOpened && (
                <circle
                  cx="210"
                  cy="180"
                  r="50"
                  fill="none"
                  stroke="#B76E79"
                  strokeWidth="2.8"
                  strokeDasharray="6 4"
                  opacity="0.85"
                />
              )}
              <circle cx="210" cy="180" r="42" fill="url(#crimsonOuter)" />
              <path d="M172 174 C174 142, 218 136, 240 156 C224 170, 192 174, 172 174 Z" fill="#F496AA" opacity="0.65" />
              <path d="M248 184 C244 216, 200 226, 180 202 C196 192, 228 188, 248 184 Z" fill="#8C233C" opacity="0.7" />
              <circle cx="210" cy="180" r="28" fill="url(#crimsonInner)" />
              <path d="M188 176 C196 154, 228 156, 232 178 C222 194, 196 194, 188 176 Z" fill="#E36E88" />
              <path d="M198 178 C202 166, 220 168, 220 180 C216 188, 202 188, 198 178 Z" fill="#9E2D47" />
              <path d="M204 179 C206 173, 215 174, 215 180 C213 184, 206 184, 204 179 Z" fill="#FCE1E7" opacity="0.5" />
              <circle cx="210" cy="180" r="46" fill="transparent" />
            </g>
          </motion.g>

          {/* 4. Front Wrapping Paper Flaps — Unwrap outward when opened! */}
          <motion.g
            animate={{
              rotate: isOpened ? -16 : 0,
              x: isOpened ? -16 : 0,
              y: isOpened ? 10 : 0,
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '210px 418px' }}
          >
            <path
              d="M78 214 L210 422 L212 276 Q142 260 78 214 Z"
              fill="url(#wrapFrontLeft)"
              stroke="#E2B7C1"
              strokeWidth="1.4"
            />
          </motion.g>

          <motion.g
            animate={{
              rotate: isOpened ? 16 : 0,
              x: isOpened ? 16 : 0,
              y: isOpened ? 10 : 0,
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '210px 418px' }}
          >
            <path
              d="M342 214 L210 422 L208 276 Q278 260 342 214 Z"
              fill="url(#wrapFrontRight)"
              stroke="#DFBEB4"
              strokeWidth="1.4"
            />
          </motion.g>

          {/* 5. Rose-Gold Satin Ribbon & Bow */}
          <motion.g
            animate={{
              y: isOpened ? 8 : 0,
              scale: isOpened ? 0.96 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '210px 330px' }}
          >
            {/* Ribbon band */}
            <path
              d="M158 318 Q210 332 262 318 L256 334 Q210 348 164 334 Z"
              fill="url(#ribbonGrad)"
            />
            {/* Left & Right Bow Loops */}
            <motion.path
              animate={{
                rotate: isOpened ? -12 : 0,
                scaleX: isOpened ? 1.08 : 1,
              }}
              transition={{ duration: 0.7 }}
              style={{ transformOrigin: '210px 328px' }}
              d="M208 326 C180 302, 152 312, 162 336 C170 350, 194 342, 208 330 Z"
              fill="url(#ribbonGrad)"
            />
            <motion.path
              animate={{
                rotate: isOpened ? 12 : 0,
                scaleX: isOpened ? 1.08 : 1,
              }}
              transition={{ duration: 0.7 }}
              style={{ transformOrigin: '210px 328px' }}
              d="M212 326 C240 302, 268 312, 258 336 C250 350, 226 342, 212 330 Z"
              fill="url(#ribbonGrad)"
            />
            {/* Ribbon tails */}
            <path d="M206 332 L182 396 L196 390 L210 336 Z" fill="#AE5C6C" />
            <path d="M214 332 L238 396 L224 390 L210 336 Z" fill="#9B4D5D" />
            {/* Center knot */}
            <circle cx="210" cy="328" r="9.5" fill="#B76E79" stroke="#F6D8DE" strokeWidth="1.2" />
          </motion.g>
        </svg>

        {/* Initial Unwrap CTA — shown before opening */}
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="open-cta"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.45 }}
              className="mt-4 w-full max-w-xs px-2"
            >
              <button
                type="button"
                onClick={handleOpenClick}
                className="btn-shimmer relative overflow-hidden w-full min-h-[54px] px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#B76E79] via-[#C96B7D] to-[#9E4E5E] text-white font-semibold text-base shadow-[0_14px_30px_-6px_rgba(158,78,94,0.48)] active:scale-[0.97] hover:brightness-105 transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#964857] cursor-pointer"
              >
                <Sparkles className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Open Your Birthday Surprise ❤️</span>
              </button>
              <p className="mt-3 text-xs sm:text-sm text-[#684C54] text-center">
                Tap above to unwrap your blooms
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="flower-note-slot"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-3 w-full px-1"
            >
              {selectedFlower ? (
                <motion.div
                  key={selectedFlower.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-white/85 backdrop-blur-md border border-[#B76E79]/25 p-4 sm:p-5 shadow-[0_8px_24px_rgba(150,72,87,0.08)] text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-[#8A6D75] flex items-center gap-1.5">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: selectedFlower.accentColor }}
                          aria-hidden="true"
                        />
                        <span>{selectedFlower.name}</span>
                        <span aria-hidden="true">·</span>
                        <span>{selectedFlower.meaning}</span>
                      </p>
                      <p className="mt-2 text-sm sm:text-base text-[#332026] leading-relaxed">
                        {selectedFlower.message}
                      </p>
                    </div>
                    <Heart
                      className="w-4 h-4 shrink-0 mt-0.5 text-[#C85D74] fill-[#C85D74]"
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-2xl bg-white/65 backdrop-blur-sm border border-[#B76E79]/18 px-4 py-3 text-center">
                  <p className="text-sm text-[#684C54]">
                    Tap any flower in the bouquet to read a secret love note
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
