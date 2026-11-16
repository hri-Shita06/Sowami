import { useEffect, useRef } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface MusicPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  variant?: 'header' | 'card';
}

// Gentle romantic birthday melody in F Major (frequency in Hz, duration in beats)
const MELODY_NOTES: Array<[number, number]> = [
  // "Happy birthday to you"
  [261.63, 0.75],
  [261.63, 0.35],
  [293.66, 1.0],
  [261.63, 1.0],
  [349.23, 1.0],
  [329.63, 1.8],
  // "Happy birthday to you"
  [261.63, 0.75],
  [261.63, 0.35],
  [293.66, 1.0],
  [261.63, 1.0],
  [392.0, 1.0],
  [349.23, 1.8],
  // "Happy birthday, my love"
  [261.63, 0.75],
  [261.63, 0.35],
  [523.25, 1.0],
  [440.0, 1.0],
  [349.23, 1.0],
  [329.63, 1.0],
  [293.66, 1.8],
  // "Happy birthday to you"
  [466.16, 0.75],
  [466.16, 0.35],
  [440.0, 1.0],
  [349.23, 1.0],
  [392.0, 1.0],
  [349.23, 2.2],
];

// Warm accompanying bass/chord roots matching the 4 phrases
const CHORD_ROOTS: Record<number, number[]> = {
  0: [174.61, 220.0, 261.63], // F major
  4: [196.0, 246.94, 329.63], // C7 feel
  6: [196.0, 233.08, 329.63],
  11: [174.61, 220.0, 261.63], // F major
  12: [174.61, 220.0, 261.63],
  15: [174.61, 233.08, 293.66], // Bb major
  19: [174.61, 233.08, 293.66],
  23: [196.0, 261.63, 329.63],
  24: [174.61, 220.0, 261.63],
};

/**
 * Self-contained Web Audio synthesizer playing a soft music-box & harp birthday serenade.
 * Only plays after explicit user interaction.
 */
export function useRomanticAudioEngine(isPlaying: boolean, isMuted: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  useEffect(() => {
    if (masterGainRef.current && ctxRef.current) {
      const targetGain = isMuted ? 0 : 0.24;
      masterGainRef.current.gain.setTargetAtTime(
        targetGain,
        ctxRef.current.currentTime,
        0.05
      );
    }
  }, [isMuted]);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (ctxRef.current && ctxRef.current.state === 'running') {
        ctxRef.current.suspend().catch(() => {});
      }
      return;
    }

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!ctxRef.current) {
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.value = isMuted ? 0 : 0.24;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterGainRef.current = master;
    }

    const ctx = ctxRef.current;
    const master = masterGainRef.current!;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    let cancelled = false;
    const beatMs = 470;

    const playTone = (freq: number, durSec: number, vol: number, type: OscillatorType) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(vol, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec);

      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      osc.stop(now + durSec + 0.05);
    };

    const scheduleNext = () => {
      if (cancelled) return;
      const idx = stepRef.current % MELODY_NOTES.length;
      const [freq, beats] = MELODY_NOTES[idx];
      const durSec = Math.max(0.45, (beats * beatMs) / 1000 * 1.15);

      // Soft bell-like music box voice + warm sine overtone
      playTone(freq, durSec, 0.42, 'sine');
      playTone(freq * 2, durSec * 0.65, 0.08, 'triangle');

      // Gentle harp chord arpeggio on phrase transitions
      const chord = CHORD_ROOTS[idx];
      if (chord) {
        chord.forEach((chordFreq, cIdx) => {
          window.setTimeout(() => {
            if (!cancelled && ctx.state === 'running') {
              playTone(chordFreq, 1.35, 0.11, 'sine');
            }
          }, cIdx * 70);
        });
      }

      stepRef.current += 1;
      timerRef.current = window.setTimeout(scheduleNext, beats * beatMs);
    };

    scheduleNext();

    return () => {
      cancelled = true;
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, isMuted]);

  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
      }
    };
  }, []);
}

export function MusicPlayer({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
  variant = 'header',
}: MusicPlayerProps) {
  if (variant === 'header') {
    return (
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => {
            triggerHaptic(15);
            onTogglePlay();
          }}
          aria-label={isPlaying ? 'Pause birthday song' : 'Play birthday song'}
          className="min-h-[44px] px-3.5 rounded-full bg-white/85 border border-[#B76E79]/25 text-[#332026] text-xs font-medium flex items-center gap-1.5 shadow-sm hover:bg-[#FDF2F4] active:scale-[0.97] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#964857] whitespace-nowrap shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-[#964857]" aria-hidden="true" />
          ) : (
            <Play className="w-3.5 h-3.5 text-[#964857] fill-[#964857]" aria-hidden="true" />
          )}
          <span>{isPlaying ? 'Pause Song' : 'Play Song'}</span>
        </button>

        {isPlaying && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic(12);
              onToggleMute();
            }}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            className="min-h-[44px] min-w-[44px] rounded-full bg-white/85 border border-[#B76E79]/25 text-[#684C54] hover:text-[#332026] flex items-center justify-center shadow-sm active:scale-[0.97] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#964857]"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#964857]" />}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-[#B76E79]/20 p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 rounded-xl bg-[#FDF2F4] border border-[#B76E79]/20 flex items-center justify-center shrink-0">
          <Music className="w-5 h-5 text-[#964857]" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#332026] truncate">
            Birthday Music Box Serenade
          </p>
          <p className="text-xs text-[#684C54] truncate">
            {isPlaying
              ? isMuted
                ? 'Muted — tap speaker to hear melody'
                : 'Playing soft acoustic melody'
              : 'Tap play to listen while you read'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => {
            triggerHaptic(15);
            onToggleMute();
          }}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          className="min-h-[44px] min-w-[44px] rounded-xl bg-[#FDF2F4] text-[#684C54] hover:text-[#332026] flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#964857]"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={() => {
            triggerHaptic(15);
            onTogglePlay();
          }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className="min-h-[44px] min-w-[44px] rounded-xl bg-[#964857] text-white hover:bg-[#823C4A] flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#964857]"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
        </button>
      </div>
    </div>
  );
}
