export function triggerHaptic(pattern: number | number[] = 20): void {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
  const prefersReduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore if blocked by browser permissions
    }
  }
}
