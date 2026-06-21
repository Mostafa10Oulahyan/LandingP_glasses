import { useRef } from 'react';
import { ShieldCheck, Truck, Gem, RefreshCcw } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';
import { scrollReveal } from '../animations/scrollReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';

const badges = [
  { icon: ShieldCheck, label: 'Secure Checkout', sub: 'Encrypted, PCI-DSS payments' },
  { icon: Truck, label: 'Free Shipping', sub: 'Complimentary over $180' },
  { icon: Gem, label: 'Premium Materials', sub: 'Acetate & Japanese titanium' },
  { icon: RefreshCcw, label: '30-Day Returns', sub: 'No-question, full refund' },
];

export default function TrustSection() {
  const root = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (grid.current) scrollReveal(grid.current, ':scope > *', { reduced, y: 30, stagger: 0.1 });
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section ref={root} className="bg-cream py-[64px] md:py-[120px]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div
          ref={grid}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6"
        >
          {badges.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-bordeaux-100 bg-cream p-7 transition-colors duration-500 hover:border-bordeaux-300 dark:border-ink/10 dark:hover:border-gold-400/30"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-bordeaux-50 text-bordeaux-700 transition-colors duration-500 group-hover:bg-bordeaux-700 group-hover:text-white dark:bg-ink/10 dark:text-gold-400">
                <Icon size={20} strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="font-display text-[22px] leading-tight">{label}</h3>
                <p className="mt-1.5 text-[13px] text-smoke">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
