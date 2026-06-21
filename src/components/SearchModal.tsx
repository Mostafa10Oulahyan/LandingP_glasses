import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useSearchStore } from '../store/searchStore';
import { useQuickViewStore } from '../store/quickViewStore';
import { products } from '../data/products';
import { formatPrice } from '../types/product';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { cn } from '../utils/cn';

const ease = [0.2, 0.7, 0.2, 1] as const;
const SUGGESTIONS = ['Sunglasses', 'Optical', 'Limited', 'Titanium', 'Acetate'];

export default function SearchModal() {
  const { isOpen, close, query, setQuery } = useSearchStore();
  const openQuickView = useQuickViewStore((s) => s.open);
  const panelRef = useFocusTrap<HTMLDivElement>(isOpen, close);
  const inputRef = useRef<HTMLInputElement>(null);

  const [debounced, setDebounced] = useState(query);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 180);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 60);
  }, [isOpen]);

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return products.slice(0, 4);
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }, [debounced]);

  useEffect(() => setActive(0), [debounced]);

  const choose = (id: string) => {
    close();
    openQuickView(id);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      choose(results[active].id);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[130]"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          onKeyDown={onKeyDown}
        >
          <motion.div
            className="absolute inset-0 bg-obsidian/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />
          <motion.div
            ref={panelRef}
            className="absolute inset-x-0 top-0 mx-auto w-full max-w-3xl bg-cream text-ink shadow-2xl"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="flex items-center gap-4 border-b border-ink/10 px-6 py-5">
              <Search size={20} className="text-smoke" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search frames, collections…"
                aria-label="Search"
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-smoke/60"
              />
              <button
                onClick={close}
                aria-label="Close search"
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-bone"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
              {!debounced.trim() && (
                <div className="mb-5 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="rounded-full border border-ink/15 px-4 py-2 text-[11px] uppercase tracking-widest2 text-smoke hover:border-ink/40 hover:text-ink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {results.length === 0 ? (
                <p className="py-10 text-center text-smoke">
                  No frames match “{debounced}”.
                </p>
              ) : (
                <ul className="flex flex-col">
                  {results.map((p, i) => (
                    <li key={p.id}>
                      <button
                        onMouseEnter={() => setActive(i)}
                        onClick={() => choose(p.id)}
                        className={cn(
                          'flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition-colors',
                          i === active ? 'bg-bone' : 'hover:bg-bone/60'
                        )}
                      >
                        <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-bone">
                          <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                        </div>
                        <div className="flex-1">
                          <div className="font-display text-[18px] leading-tight">{p.name}</div>
                          <div className="text-[11px] uppercase tracking-widest2 text-smoke">
                            {p.category}
                          </div>
                        </div>
                        <div className="font-display text-[16px] text-bordeaux-700 dark:text-gold-400">
                          {formatPrice(p.price)}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-ink/10 px-6 py-3 text-[10px] uppercase tracking-widest2 text-smoke">
              <span className="mr-4">↑ ↓ to navigate</span>
              <span className="mr-4">↵ to open</span>
              <span>esc to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
