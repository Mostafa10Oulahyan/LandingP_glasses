import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const columns = [
  {
    title: 'Shop',
    links: ['Sunglasses', 'Optical Frames', 'New Arrivals', 'Best Sellers', 'Limited Editions', 'Gift Cards'],
  },
  {
    title: 'The House',
    links: ['Our Story', 'The Atelier', 'Sustainability', 'Press', 'Careers', 'Journal'],
  },
  {
    title: 'Care',
    links: ['Contact', 'Shipping & Returns', 'Lifetime Repair', 'Prescription Guide', 'Size Guide', 'FAQ'],
  },
];

const payments = ['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE', 'KLARNA'];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-obsidian pb-10 pt-20 text-porcelain">
      <div className="pointer-events-none absolute -bottom-12 left-0 right-0 select-none text-center md:-bottom-20">
        <span className="font-display italic text-porcelain/[0.04] text-[18vw] leading-none tracking-tight">
          Crown
        </span>
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-10 border-b border-porcelain/10 pb-16">
          <div className="col-span-12 md:col-span-4">
            <img
              src="/ndadr-removebg-preview.png"
              alt="Crown Eye Optique"
              className="h-20 w-auto brightness-0 invert"
            />
            <p className="mt-3 text-[10px] uppercase tracking-widest2 text-gold-400">
              Luxury Eyewear · Crowned with Vision
            </p>
            <p className="mt-6 max-w-sm text-[13.5px] leading-[1.7] text-porcelain/65">
              A contemporary luxury eyewear house. Hand-finished frames, made slowly, intended to be
              kept — and repaired — for life.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-porcelain/15 transition-colors hover:bg-porcelain hover:text-obsidian"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="col-span-6 md:col-span-2">
              <h4 className="mb-5 text-[11px] uppercase tracking-widest2 text-porcelain/50">{col.title}</h4>
              <ul className="space-y-3 text-[14px] text-porcelain/90">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="link-underline">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-12 md:col-span-2">
            <h4 className="mb-5 text-[11px] uppercase tracking-widest2 text-porcelain/50">Boutique</h4>
            <p className="text-[13.5px] leading-[1.7] text-porcelain/80">
              12 Avenue Montaigne<br />
              75008 Paris<br />
              France
            </p>
            <p className="mt-4 text-[13.5px] text-porcelain/80">
              <a className="link-underline" href="mailto:hello@crowneyeoptique.com">hello@crowneyeoptique.com</a>
              <br />
              <a className="link-underline" href="tel:+330000000000">+33 0 00 00 00 00</a>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 pt-8 text-[11px] uppercase tracking-widest2 text-porcelain/45 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} Crown Eye Optique</span>
            <a href="#" className="link-underline">Privacy</a>
            <a href="#" className="link-underline">Terms</a>
            <a href="#" className="link-underline">Cookies</a>
            <a href="#" className="link-underline">Accessibility</a>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-porcelain/40">Secure checkout</span>
            <div className="flex items-center gap-1.5">
              {payments.map((p) => (
                <span
                  key={p}
                  className="rounded border border-porcelain/15 px-2 py-1 text-[10px] text-porcelain/70"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
