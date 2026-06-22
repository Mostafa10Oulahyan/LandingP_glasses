import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { useThemeStore } from '../store/themeStore';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
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
  const openWishlist = useWishlistStore((s) => s.open);
  const wishCount = useWishlistStore((s) => s.ids.length);
  const openSearch = useSearchStore((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

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
                scrolled ? 'h-16' : 'h-20'
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
              <button
                onClick={openSearch}
                aria-label="Search"
                className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <Search size={18} />
              </button>
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={openWishlist}
                aria-label={wishCount > 0 ? `Wishlist, ${wishCount} saved` : 'Wishlist'}
                className="relative hidden h-9 w-9 place-items-center rounded-full transition-colors hover:bg-ink/5 hover:text-ink md:grid"
              >
                <Heart size={18} className={wishCount > 0 ? 'fill-bordeaux-700 text-bordeaux-700' : ''} />
                {wishCount > 0 && (
                  <span
                    key={wishCount}
                    className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 animate-badge-pop place-items-center rounded-full bg-bordeaux-700 px-1 text-[9px] font-medium text-white"
                  >
                    {wishCount}
                  </span>
                )}
              </button>
              <button
                onClick={openCart}
                aria-label={cartCount > 0 ? `Shopping bag, ${cartCount} items` : 'Shopping bag'}
                className="relative grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span
                    key={cartCount}
                    className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 animate-badge-pop place-items-center rounded-full bg-bordeaux-700 px-1 text-[9px] font-medium text-white"
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer — portaled to <body> so it escapes the sticky header's
          stacking context (otherwise <main> paints over it and it looks transparent). */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-0 z-[130] flex flex-col bg-cream px-6 py-7 text-ink md:hidden"
            >
              <div className="flex items-center justify-between">
                <img
                  src="/ndadr-removebg-preview.png"
                  alt="Crown Eye Optique"
                  className="h-12 w-auto dark:brightness-0 dark:invert"
                />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full hover:bg-bone"
                >
                  <X />
                </button>
              </div>

              <nav className="mt-14 flex flex-col gap-7 font-display text-4xl">
                {links.map((l, i) => (
                  <motion.a
                    key={l.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.5 }}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="w-fit"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              {/* Quick actions */}
              <div className="mt-auto flex flex-col gap-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setOpen(false);
                      openWishlist();
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 py-3.5 text-[11px] uppercase tracking-widest2 transition-colors hover:border-ink/40"
                  >
                    <Heart size={15} className={wishCount > 0 ? 'fill-bordeaux-700 text-bordeaux-700' : ''} />
                    Wishlist{wishCount > 0 ? ` (${wishCount})` : ''}
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      openCart();
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-bordeaux-700 py-3.5 text-[11px] uppercase tracking-widest2 text-white transition-colors hover:bg-bordeaux-800"
                  >
                    <ShoppingBag size={15} /> Bag{cartCount > 0 ? ` (${cartCount})` : ''}
                  </button>
                </div>
                <div className="flex justify-between pt-3 text-[11px] uppercase tracking-widest2 text-smoke">
                  <span>EN · USD</span>
                  <span>hello@crowneyeoptique.com</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
