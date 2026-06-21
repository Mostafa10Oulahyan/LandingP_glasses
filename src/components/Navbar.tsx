import { useEffect, useState } from 'react';
import { Menu, Moon, Search, ShoppingBag, Sun, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { useThemeStore } from '../store/themeStore';
import { useCartStore } from '../store/cartStore';
import { useSearchStore } from '../store/searchStore';

const links = [
  { label: 'Sunglasses', href: '#collections' },
  { label: 'Optical', href: '#collections' },
  { label: 'New Arrivals', href: '#best' },
  { label: 'The Atelier', href: '#story' },
  { label: 'Journal', href: '#gallery' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const openCart = useCartStore((s) => s.open);
  const cartCount = useCartStore((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const openSearch = useSearchStore((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-500',
        scrolled ? 'nav-blur' : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-500',
            scrolled ? 'h-16' : 'h-20'
          )}
        >
          {/* Left — menu (mobile) + links */}
          <div className="flex items-center gap-8">
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="text-ink/80 hover:text-ink md:hidden"
            >
              <Menu size={22} />
            </button>
            <nav className="hidden items-center gap-7 text-[12.5px] uppercase tracking-widest text-ink/75 md:flex">
              {links.slice(0, 3).map((l) => (
                <a key={l.label} href={l.href} className="link-underline transition-colors hover:text-ink">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Center — logo */}
          <a href="#" aria-label="Crown Eye Optique — home" className="absolute left-1/2 -translate-x-1/2">
            <img
              src="/ndadr-removebg-preview.png"
              alt="Crown Eye Optique"
              className={cn(
                'w-auto transition-all duration-500 dark:brightness-0 dark:invert',
                scrolled ? 'h-12' : 'h-16'
              )}
            />
          </a>

          {/* Right — links + icons */}
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-7 text-[12.5px] uppercase tracking-widest text-ink/75 md:flex">
              {links.slice(3).map((l) => (
                <a key={l.label} href={l.href} className="link-underline transition-colors hover:text-ink">
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4 text-ink/80">
              <button onClick={openSearch} aria-label="Search" className="hover:text-ink">
                <Search size={18} />
              </button>
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                className="hover:text-ink"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button aria-label="Account" className="hidden hover:text-ink md:inline">
                <User size={18} />
              </button>
              <button onClick={openCart} aria-label="Open bag" className="relative hover:text-ink">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-bordeaux-700 px-1 text-[9px] font-medium text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-cream px-6 py-8 md:hidden"
          >
            <div className="flex items-center justify-between">
              <img
                src="/ndadr-removebg-preview.png"
                alt="Crown Eye Optique"
                className="h-12 w-auto dark:brightness-0 dark:invert"
              />
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-8 font-display text-4xl">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  href={l.href}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="absolute bottom-10 left-6 right-6 flex justify-between text-[11px] uppercase tracking-widest2 text-smoke">
              <span>EN · USD</span>
              <span>hello@crowneyeoptique.com</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
