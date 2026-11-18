import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BirthdayIntro } from './components/BirthdayIntro';
import { BloomingAnimation } from './components/BloomingAnimation';
import { FlowerBouquet } from './components/FlowerBouquet';
import { BirthdayMessage } from './components/BirthdayMessage';
import { LoveLetter } from './components/LoveLetter';
import { MusicPlayer, useRomanticAudioEngine } from './components/MusicPlayer';
import { VirtualHugModal } from './components/VirtualHugModal';
import { Footer } from './components/Footer';
import { FLOWER_NOTES, FlowerNote } from './data/bouquetContent';
import { triggerHaptic } from './utils/haptics';

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  const [giftEntered, setGiftEntered] = useState(false);
  const [bouquetOpened, setBouquetOpened] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  const [selectedFlower, setSelectedFlower] = useState<FlowerNote | null>(null);
  const [highlightFlowers, setHighlightFlowers] = useState(false);

  const [loveLetterOpen, setLoveLetterOpen] = useState(false);
  const [hugModalOpen, setHugModalOpen] = useState(false);
  const [hugCount, setHugCount] = useState(0);

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const bouquetSectionRef = useRef<HTMLDivElement | null>(null);

  // Audio only plays after explicit user interaction
  useRomanticAudioEngine(isMusicPlaying, isMuted);

  const handleOpenBouquet = () => {
    setBouquetOpened(true);
    setConfettiTrigger((c) => c + 1);
    setHighlightFlowers(true);
    window.setTimeout(() => {
      setSelectedFlower(FLOWER_NOTES[0]);
    }, 950);
    window.setTimeout(() => {
      setHighlightFlowers(false);
    }, 4200);
  };

  const handleTouchFlowersButton = () => {
    triggerHaptic(18);
    setHighlightFlowers(true);

    const currentIndex = selectedFlower
      ? FLOWER_NOTES.findIndex((f) => f.id === selectedFlower.id)
      : -1;
    const nextFlower = FLOWER_NOTES[(currentIndex + 1) % FLOWER_NOTES.length];
    setSelectedFlower(nextFlower);

    bouquetSectionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'center',
    });

    window.setTimeout(() => {
      setHighlightFlowers(false);
    }, 2500);
  };

  const handleToggleMusic = () => {
    triggerHaptic(15);
    setIsMusicPlaying((prev) => !prev);
  };

  const handleOpenHug = () => {
    triggerHaptic([35, 70, 40]);
    setHugCount((c) => c + 1);
    setConfettiTrigger((c) => c + 1);
    setHugModalOpen(true);
  };

  return (
    <div className="romantic-canvas min-h-screen-dvh w-full overflow-x-clip text-[#332026] relative">
      <BloomingAnimation
        isActive={bouquetOpened}
        confettiTrigger={confettiTrigger}
      />

      <AnimatePresence mode="wait">
        {!giftEntered ? (
          <BirthdayIntro
            key="birthday-intro"
            onOpenGift={() => setGiftEntered(true)}
          />
        ) : (
          <motion.div
            key="bouquet-experience"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col min-h-screen-dvh"
          >
            {/* Compact Mobile-First Sticky Top Bar (<= 56px, under 15% mobile height) */}
            <header className="sticky top-0 z-30 h-14 px-4 sm:px-8 bg-[#FFFBF7]/85 backdrop-blur-md border-b border-[#B76E79]/15 flex items-center justify-between gap-4">
              <span className="font-display text-lg sm:text-xl font-semibold text-[#332026] whitespace-nowrap shrink-0">
                For My Sowami
              </span>

              <MusicPlayer
                variant="header"
                isPlaying={isMusicPlaying}
                isMuted={isMuted}
                onTogglePlay={handleToggleMusic}
                onToggleMute={() => setIsMuted((m) => !m)}
              />
            </header>

            <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 pb-8">
              {/* Main Romantic Heading */}
              <motion.div
                initial={prefersReducedMotion ? false : { y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl mx-auto"
              >
                <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#332026] text-balance leading-[1.15]">
                  Happy Birthday, Sowami!"Amit Dasgupta":)❤️
                </h1>
                <p className="mt-2.5 sm:mt-3 text-sm sm:text-lg text-[#684C54] text-balance leading-relaxed">
                  To my Mr husband, my best friend, my favourite human, and my soulmate and my forever home.
                </p>
              </motion.div>

              {/* Bouquet + Post-Open Experience */}
              {!bouquetOpened ? (
                <div
                  ref={bouquetSectionRef}
                  className="mt-4 sm:mt-6 min-h-[64dvh] flex flex-col items-center justify-center"
                >
                  <FlowerBouquet
                    isOpened={false}
                    onOpenBouquet={handleOpenBouquet}
                    selectedFlower={selectedFlower}
                    onSelectFlower={setSelectedFlower}
                    highlightFlowers={highlightFlowers}
                  />
                </div>
              ) : (
                <div className="mt-6 sm:mt-10 space-y-10 sm:space-y-14">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Left Column: Centered Interactive Flower Bouquet */}
                    <div
                      ref={bouquetSectionRef}
                      className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-20"
                    >
                      <FlowerBouquet
                        isOpened={true}
                        onOpenBouquet={handleOpenBouquet}
                        selectedFlower={selectedFlower}
                        onSelectFlower={setSelectedFlower}
                        highlightFlowers={highlightFlowers}
                      />
                    </div>

                    {/* Right Column: Birthday Love Message + 5 Mobile-Friendly Interactive Buttons */}
                    <div className="lg:col-span-7 space-y-6">
                      <BirthdayMessage />

                      <MusicPlayer
                        variant="card"
                        isPlaying={isMusicPlaying}
                        isMuted={isMuted}
                        onTogglePlay={handleToggleMusic}
                        onToggleMute={() => setIsMuted((m) => !m)}
                      />

                      {/* 5 Interactive Birthday Surprises (Thumb-Friendly >= 48px buttons) */}
                      <section
                        aria-labelledby="surprises-heading"
                        className="rounded-3xl bg-white/75 backdrop-blur-md border border-[#B76E79]/20 p-5 sm:p-6 shadow-[0_10px_28px_rgba(150,72,87,0.05)]"
                      >
                        <h2
                          id="surprises-heading"
                          className="font-display text-2xl font-semibold text-[#332026]"
                        >
                          Little Surprises for Sowami
                        </h2>
                        <p className="mt-1 text-sm text-[#684C54]">
                          Tap any button below whenever you want a smile
                        </p>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              triggerHaptic(18);
                              setLoveLetterOpen(true);
                            }}
                            className="mobile-touch-target min-h-[50px] px-5 py-3 rounded-2xl bg-gradient-to-r from-[#B76E79] to-[#964857] text-white font-semibold text-sm sm:text-base shadow-[0_8px_20px_rgba(150,72,87,0.28)] hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center sm:justify-start gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#964857]"
                          >
                            <span>💌 Open My Love Letter</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleTouchFlowersButton}
                            className="mobile-touch-target min-h-[50px] px-5 py-3 rounded-2xl bg-[#FDF2F4] border border-[#B76E79]/25 text-[#332026] font-semibold text-sm sm:text-base hover:bg-[#FCE7EC] active:scale-[0.98] transition-all flex items-center justify-center sm:justify-start gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#964857]"
                          >
                            <span>🌹 Touch the Flowers</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleToggleMusic}
                            className="mobile-touch-target min-h-[50px] px-5 py-3 rounded-2xl bg-[#EFE9FA]/75 border border-[#8E74B8]/25 text-[#332026] font-semibold text-sm sm:text-base hover:bg-[#E7DDF8] active:scale-[0.98] transition-all flex items-center justify-center sm:justify-start gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8E74B8]"
                          >
                            <span>
                              {isMusicPlaying
                                ? '🎵 Pause Our Favourite Song'
                                : '🎵 Play Our Favourite Song'}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={handleOpenHug}
                            className="mobile-touch-target min-h-[50px] px-5 py-3 rounded-2xl bg-[#EBF4EA] border border-[#6B8E6B]/30 text-[#2E4630] font-semibold text-sm sm:text-base hover:bg-[#DFECDD] active:scale-[0.98] transition-all flex items-center justify-center sm:justify-start gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B7F5E]"
                          >
                            <span>🤗 Send Me a Virtual Hug</span>
                          </button>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              )}
            </main>

            {bouquetOpened && <Footer />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <LoveLetter
        isOpen={loveLetterOpen}
        onClose={() => setLoveLetterOpen(false)}
      />

      <VirtualHugModal
        isOpen={hugModalOpen}
        hugCount={hugCount}
        onSendAnotherHug={() => {
          setHugCount((c) => c + 1);
          setConfettiTrigger((c) => c + 1);
        }}
        onClose={() => setHugModalOpen(false)}
      />
    </div>
  );
}
