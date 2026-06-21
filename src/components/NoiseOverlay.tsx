/**
 * Barely-perceptible grain over the whole viewport.
 * Fixed, non-interactive, opacity <= 0.03, overlay blend.
 */
export default function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{
        backgroundImage: 'var(--grain)',
        backgroundRepeat: 'repeat',
        opacity: 0.03,
        mixBlendMode: 'overlay',
      }}
    />
  );
}
