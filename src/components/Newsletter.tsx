import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="relative overflow-hidden bg-cream py-[64px] md:py-[120px]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[32px] bg-obsidian p-10 text-porcelain md:p-20">
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(700px_400px_at_85%_-20%,rgba(195,160,86,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 select-none font-display italic text-porcelain/[0.05] text-[28rem] leading-none">
            C
          </div>

          <div className="relative grid grid-cols-12 items-center gap-10">
            <div className="col-span-12 md:col-span-7">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest2 text-gold-400">
                <span className="h-px w-8 bg-gold-400" />
                The Crown Letter
              </div>
              <h2 className="mt-6 max-w-[18ch] font-display kerning-tight text-[40px] leading-[1] md:text-[60px]">
                Join the list. <span className="italic text-gold-400">See first.</span>
              </h2>
              <p className="mt-6 max-w-md text-[14.5px] leading-[1.8] text-porcelain/70">
                A quiet letter — twice a month. New chapters, archive restocks, atelier dispatches.
                $50 toward your first frame when you join.
              </p>
            </div>

            <div className="col-span-12 md:col-span-5">
              <motion.form
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                className="flex items-center gap-2 rounded-2xl border border-porcelain/15 bg-porcelain/[0.06] p-2"
              >
                <div className="flex flex-1 items-center gap-3 px-4">
                  <Mail size={16} className="text-porcelain/70" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    aria-label="Email address"
                    className="flex-1 bg-transparent py-4 text-[14px] text-porcelain outline-none placeholder:text-porcelain/40"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-gold-400 px-6 py-4 text-[11px] uppercase tracking-widest2 text-gold-900 transition-colors hover:bg-gold-500"
                >
                  {done ? (
                    <>
                      <Check size={14} /> Subscribed
                    </>
                  ) : (
                    <>Subscribe</>
                  )}
                </button>
              </motion.form>
              <p className="mt-4 text-[11px] uppercase tracking-widest2 text-porcelain/40">
                Unsubscribe anytime · No spam, ever
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
