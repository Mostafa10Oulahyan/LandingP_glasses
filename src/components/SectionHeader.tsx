import { motion } from 'framer-motion';

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  cta?: { href: string; label: string };
};

export default function SectionHeader({ eyebrow, title, description, align = 'left', cta }: Props) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start';
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end md:justify-between gap-8 ${
        align === 'center' ? 'md:flex-col md:items-center' : ''
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        className={`flex flex-col gap-4 ${alignment}`}
      >
        <div className="flex items-center gap-3 text-[11px] tracking-widest2 uppercase text-bordeaux-700 dark:text-gold-400">
          <span className="h-px w-8 bg-gold-400" />
          {eyebrow}
        </div>
        <h2 className="font-display kerning-tight text-[44px] md:text-[64px] leading-[1] text-ink max-w-[18ch]">
          {title}
        </h2>
        {description && (
          <p className="max-w-md text-[15px] leading-[1.7] text-smoke">{description}</p>
        )}
      </motion.div>
      {cta && (
        <a
          href={cta.href}
          className="group inline-flex items-center gap-2 text-[12px] tracking-widest2 uppercase text-ink link-underline"
        >
          {cta.label}
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </a>
      )}
    </div>
  );
}
