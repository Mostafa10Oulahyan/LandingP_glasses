import { gsap, SplitText, ScrollTrigger } from '../hooks/useGSAP';

interface TextRevealOptions {
  /** scroll trigger start, default 'top 85%' */
  start?: string;
  /** extra stagger between lines */
  stagger?: number;
  /** also split the emphasis element into chars for a finer reveal */
  emphasisSelector?: string;
  reduced?: boolean;
}

/**
 * Line-by-line masked reveal. Splits into lines (cheap, a11y-safe); optionally
 * splits a single emphasis element into chars. Caller is responsible for
 * setting aria-label on the container + aria-hidden on split children.
 *
 * Returns a cleanup fn that reverts the SplitText DOM mutations.
 */
export function textReveal(el: HTMLElement, opts: TextRevealOptions = {}) {
  const { start = 'top 85%', stagger = 0.12, emphasisSelector, reduced = false } = opts;

  if (reduced) {
    gsap.fromTo(
      el,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.6, scrollTrigger: { trigger: el, start } }
    );
    return () => {};
  }

  const split = new SplitText(el, { type: 'lines', linesClass: 'split-line' });
  // wrap each line's content so we can translate it under the mask
  const inners = split.lines.map((line: Element) => {
    const inner = document.createElement('span');
    inner.className = 'split-child';
    inner.append(...Array.from(line.childNodes));
    line.appendChild(inner);
    return inner;
  });

  let charSplit: any = null;
  const tl = gsap.timeline({ scrollTrigger: { trigger: el, start } });

  tl.from(inners, {
    yPercent: 120,
    duration: 1,
    ease: 'power4.out',
    stagger,
  });

  if (emphasisSelector) {
    const emphasis = el.querySelector<HTMLElement>(emphasisSelector);
    if (emphasis) {
      charSplit = new SplitText(emphasis, { type: 'chars' });
      tl.from(
        charSplit.chars,
        { yPercent: 100, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.025 },
        '-=0.5'
      );
    }
  }

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    charSplit?.revert?.();
    split.revert();
  };
}
