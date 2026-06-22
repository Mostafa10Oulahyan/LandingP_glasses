import { useState, type ImgHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

/**
 * Branded fallback shown when a product image fails to load — a hand-drawn
 * acetate frame on cream, so a card never collapses to an empty white box.
 */
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'>
      <rect width='800' height='1000' fill='%23F2EEE7'/>
      <g fill='none' stroke='%23751F2B' stroke-width='10' stroke-linecap='round'>
        <rect x='150' y='430' width='200' height='140' rx='52'/>
        <rect x='450' y='430' width='200' height='140' rx='52'/>
        <path d='M350 480 q50 -34 100 0'/>
        <path d='M150 470 q-46 6 -58 40'/>
        <path d='M650 470 q46 6 58 40'/>
      </g>
      <circle cx='400' cy='505' r='5' fill='%23C3A056'/>
      <text x='400' y='640' font-family='Georgia, serif' font-size='30' fill='%23751F2B' text-anchor='middle' opacity='0.7'>Crown Eye Optique</text>
    </svg>`
  );

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** aspect ratio applied to the wrapper, e.g. "4/5" */
  ratio?: string;
  /** wrapper className (ratio box + bg) */
  wrapperClassName?: string;
  /** eager for above-the-fold imagery */
  eager?: boolean;
}

/**
 * Image with graceful failure: shimmer while loading, branded fallback on
 * error, consistent aspect-ratio box, lazy by default. Replaces bare <img>.
 */
export default function SmartImage({
  src,
  alt = '',
  ratio,
  wrapperClassName,
  className,
  eager,
  ...rest
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn('relative h-full w-full overflow-hidden bg-bone', wrapperClassName)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {/* shimmer placeholder */}
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-img-shimmer bg-[linear-gradient(110deg,rgb(var(--c-bone)),45%,rgb(var(--c-sand)),55%,rgb(var(--c-bone)))] bg-[length:200%_100%]" />
      )}
      <img
        src={failed ? FALLBACK : src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!failed) {
            setFailed(true);
            setLoaded(true);
          }
        }}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...rest}
      />
    </div>
  );
}
