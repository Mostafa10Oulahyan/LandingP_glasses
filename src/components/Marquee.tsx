const words = [
  'Acetate', '✦', 'Titanium', '✦', 'Hand-polished', '✦', 'Numbered', '✦',
  'Crown-finished', '✦', 'Anti-reflective', '✦', 'Carl Zeiss', '✦', 'Bespoke fit',
];

/**
 * The one intentional looping element on the page. Kept unhurried (60s) and
 * paused on hover so it never reads as "energetic".
 */
export default function Marquee() {
  return (
    <section
      aria-hidden
      className="group bg-cream py-8 overflow-hidden border-y border-ink/[0.07]"
    >
      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-10 pr-10 font-display text-3xl md:text-5xl text-ink/85"
          >
            {words.map((w, j) => (
              <span
                key={j}
                className={w === '✦' ? 'text-gold-400 text-2xl' : 'italic font-light'}
              >
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
