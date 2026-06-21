import { motion } from 'framer-motion';
import { Award, Globe2, RotateCcw, ShieldCheck } from 'lucide-react';
import SectionHeader from './SectionHeader';

const items = [
  {
    icon: Award,
    title: 'Hand-finished frames',
    body: 'Seven days of polishing. Six pairs of hands. Every frame signed, dated and numbered before it leaves the atelier.',
    pill: 'N°01',
  },
  {
    icon: Globe2,
    title: 'Complimentary worldwide shipping',
    body: 'Express delivery in a reusable case. Carbon-neutral logistics across 60+ countries.',
    pill: 'N°02',
  },
  {
    icon: RotateCcw,
    title: '30-day, no-question returns',
    body: 'Try them on your own terms. If the fit isn’t right, we’ll cover the return — and the re-cut.',
    pill: 'N°03',
  },
  {
    icon: ShieldCheck,
    title: 'Secure checkout · Lifetime repair',
    body: 'PCI-DSS encrypted payments. Every Crown Eye Optique frame is backed by complimentary repair for life.',
    pill: 'N°04',
  },
];

export default function WhyChoose() {
  return (
    <section className="relative bg-cream py-[64px] md:py-[120px]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHeader
          eyebrow="The House Promise"
          title={
            <>
              Why choose{' '}
              <span className="italic text-bordeaux-700 dark:text-gold-400">Crown Eye Optique.</span>
            </>
          }
          description="A house built on patience, materials and quiet conviction — not seasonal noise."
        />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-ink/[0.08] bg-ink/[0.08] md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.08 }}
                className="group relative flex flex-col gap-6 bg-cream p-8 transition-colors duration-500 hover:bg-bone md:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-bordeaux-700 text-white transition-colors duration-500 group-hover:bg-gold-400 group-hover:text-gold-900">
                    <Icon size={18} />
                  </span>
                  <span className="text-[10px] uppercase tracking-widest2 text-bordeaux-700 dark:text-gold-400">
                    {it.pill}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-[24px] leading-tight text-ink">{it.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-[1.7] text-smoke">{it.body}</p>
                </div>
                <div className="mt-auto flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-ink/60 transition-colors group-hover:text-ink">
                  <span>Learn more</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-widest2 text-smoke md:justify-between">
          <Badge label="Carl Zeiss Lenses" />
          <Badge label="Premium Acetate" />
          <Badge label="Japanese Titanium" />
          <Badge label="B-Corp Certified" />
          <Badge label="PCI-DSS Secure" />
        </div>
      </div>
    </section>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-6 bg-gold-400" />
      <span>{label}</span>
    </div>
  );
}
