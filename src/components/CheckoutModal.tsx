import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import { useCheckoutStore } from '../store/checkoutStore';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../types/product';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { cn } from '../utils/cn';
import SmartImage from './SmartImage';

const ease = [0.2, 0.7, 0.2, 1] as const;

type Step = 'contact' | 'shipping' | 'payment' | 'done';

const SHIPPING = {
  standard: { id: 'standard', label: 'Complimentary Delivery', detail: '5–7 business days · insured', price: 0 },
  express: { id: 'express', label: 'Signature Express', detail: '1–2 business days · hand-delivered', price: 24 },
} as const;
type ShipId = keyof typeof SHIPPING;

const STEPS: { id: Step; label: string }[] = [
  { id: 'contact', label: 'Details' },
  { id: 'shipping', label: 'Delivery' },
  { id: 'payment', label: 'Payment' },
];

const onlyDigits = (s: string) => s.replace(/\D/g, '');

export default function CheckoutModal() {
  const isOpen = useCheckoutStore((s) => s.isOpen);
  const close = useCheckoutStore((s) => s.close);
  const { lines, subtotal, clear } = useCartStore();
  const panelRef = useFocusTrap<HTMLDivElement>(isOpen, close);

  const [step, setStep] = useState<Step>('contact');
  const [ship, setShip] = useState<ShipId>('standard');
  const [placing, setPlacing] = useState(false);
  const [orderNo, setOrderNo] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postal: '',
    country: '',
    card: '',
    exp: '',
    cvc: '',
    nameOnCard: '',
  });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // reset to first step each time it opens
  useEffect(() => {
    if (isOpen) {
      setStep('contact');
      setPlacing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(timer.current);
    };
  }, [isOpen]);

  const sub = subtotal();
  const shipCost = SHIPPING[ship].price;
  const total = sub + shipCost;

  const contactValid =
    /\S+@\S+\.\S+/.test(form.email) &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.address.trim() &&
    form.city.trim() &&
    form.postal.trim() &&
    form.country.trim();

  const paymentValid =
    onlyDigits(form.card).length >= 15 &&
    /^\d{2}\s*\/\s*\d{2}$/.test(form.exp) &&
    onlyDigits(form.cvc).length >= 3 &&
    form.nameOnCard.trim();

  const placeOrder = () => {
    if (!paymentValid || placing) return;
    setPlacing(true);
    timer.current = setTimeout(() => {
      const n = 'CEO-' + onlyDigits(String(Date.now())).slice(-6);
      setOrderNo(n);
      setStep('done');
      setPlacing(false);
      clear();
    }, 1500);
  };

  const stepIndex = useMemo(() => STEPS.findIndex((s) => s.id === step), [step]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[130] grid place-items-center p-0 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Checkout"
        >
          <motion.div
            className="absolute inset-0 bg-obsidian/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
          />

          <motion.div
            ref={panelRef}
            className={cn(
              'relative flex max-h-[100dvh] w-full flex-col overflow-hidden bg-cream text-ink shadow-2xl sm:max-h-[88vh] sm:rounded-[24px]',
              step === 'done' ? 'max-w-xl' : 'max-w-5xl'
            )}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <span className="font-display text-lg tracking-tight">Crown Eye Optique</span>
                <span className="hidden items-center gap-1.5 text-[10px] uppercase tracking-widest2 text-smoke sm:flex">
                  <Lock size={11} /> Secure checkout
                </span>
              </div>
              <button
                onClick={close}
                aria-label="Close checkout"
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-bone"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className={cn(
                'grid min-h-0 flex-1 grid-cols-1 overflow-hidden',
                step !== 'done' && 'lg:grid-cols-[1fr_minmax(300px,380px)]'
              )}
            >
              {/* ---------- Left: steps ---------- */}
              <div className="flex min-h-0 flex-col overflow-y-auto px-5 py-6 md:px-10 md:py-9">
                {step !== 'done' ? (
                  <>
                    {/* Step indicator */}
                    <ol className="flex items-center gap-2">
                      {STEPS.map((s, i) => {
                        const active = i === stepIndex;
                        const done = i < stepIndex;
                        return (
                          <li key={s.id} className="flex flex-1 items-center gap-2">
                            <span
                              className={cn(
                                'grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-medium transition-colors',
                                done
                                  ? 'bg-gold-400 text-gold-900'
                                  : active
                                  ? 'bg-bordeaux-700 text-white'
                                  : 'bg-bone text-smoke'
                              )}
                            >
                              {done ? <Check size={13} /> : i + 1}
                            </span>
                            <span
                              className={cn(
                                'text-[10.5px] uppercase tracking-widest2',
                                active ? 'text-ink' : 'text-smoke'
                              )}
                            >
                              {s.label}
                            </span>
                            {i < STEPS.length - 1 && (
                              <span className="mx-1 hidden h-px flex-1 bg-ink/12 sm:block" />
                            )}
                          </li>
                        );
                      })}
                    </ol>

                    <AnimatePresence mode="wait">
                      {/* Step 1 — Contact & delivery */}
                      {step === 'contact' && (
                        <motion.div
                          key="contact"
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.3, ease }}
                          className="mt-9"
                        >
                          <h2 className="font-display text-[26px] leading-none">Where shall we send it?</h2>
                          <p className="mt-2 text-[13px] text-smoke">
                            Every order ships insured, signed for, and cradled in our archival case.
                          </p>

                          <div className="mt-7 space-y-4">
                            <Field label="Email" value={form.email} onChange={(v) => set('email', v)} type="email" placeholder="you@example.com" autoComplete="email" />
                            <div className="grid grid-cols-2 gap-4">
                              <Field label="First name" value={form.firstName} onChange={(v) => set('firstName', v)} autoComplete="given-name" />
                              <Field label="Last name" value={form.lastName} onChange={(v) => set('lastName', v)} autoComplete="family-name" />
                            </div>
                            <Field label="Address" value={form.address} onChange={(v) => set('address', v)} autoComplete="street-address" />
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                              <Field label="City" value={form.city} onChange={(v) => set('city', v)} autoComplete="address-level2" />
                              <Field label="Postal" value={form.postal} onChange={(v) => set('postal', v)} autoComplete="postal-code" />
                              <Field className="col-span-2 sm:col-span-1" label="Country" value={form.country} onChange={(v) => set('country', v)} autoComplete="country-name" />
                            </div>
                          </div>

                          <button
                            onClick={() => contactValid && setStep('shipping')}
                            disabled={!contactValid}
                            className="mt-8 w-full rounded-full bg-bordeaux-700 py-4 text-[12px] uppercase tracking-widest2 text-white transition-all duration-300 hover:bg-bordeaux-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Continue to delivery
                          </button>
                        </motion.div>
                      )}

                      {/* Step 2 — Shipping */}
                      {step === 'shipping' && (
                        <motion.div
                          key="shipping"
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.3, ease }}
                          className="mt-9"
                        >
                          <h2 className="font-display text-[26px] leading-none">Choose your delivery</h2>
                          <p className="mt-2 text-[13px] text-smoke">
                            Shipping to {form.city || 'your address'}, {form.country || ''}.
                          </p>

                          <div className="mt-7 space-y-3">
                            {(Object.keys(SHIPPING) as ShipId[]).map((id) => {
                              const opt = SHIPPING[id];
                              const active = ship === id;
                              return (
                                <button
                                  key={id}
                                  onClick={() => setShip(id)}
                                  aria-pressed={active}
                                  className={cn(
                                    'flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all',
                                    active
                                      ? 'border-bordeaux-700 bg-bordeaux-50/60 dark:bg-ink/30'
                                      : 'border-ink/12 hover:border-ink/30'
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'grid h-10 w-10 shrink-0 place-items-center rounded-full',
                                      active ? 'bg-bordeaux-700 text-white' : 'bg-bone text-ink'
                                    )}
                                  >
                                    <Truck size={17} />
                                  </span>
                                  <span className="flex-1">
                                    <span className="block font-display text-[17px] leading-tight">{opt.label}</span>
                                    <span className="block text-[12px] text-smoke">{opt.detail}</span>
                                  </span>
                                  <span className="font-display text-[15px]">
                                    {opt.price === 0 ? 'Free' : formatPrice(opt.price)}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="mt-8 flex items-center gap-3">
                            <button
                              onClick={() => setStep('contact')}
                              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink/40"
                              aria-label="Back to details"
                            >
                              <ArrowLeft size={17} />
                            </button>
                            <button
                              onClick={() => setStep('payment')}
                              className="flex-1 rounded-full bg-bordeaux-700 py-4 text-[12px] uppercase tracking-widest2 text-white transition-all duration-300 hover:bg-bordeaux-800 active:scale-[0.99]"
                            >
                              Continue to payment
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3 — Payment */}
                      {step === 'payment' && (
                        <motion.div
                          key="payment"
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.3, ease }}
                          className="mt-9"
                        >
                          <h2 className="font-display text-[26px] leading-none">Payment</h2>
                          <p className="mt-2 flex items-center gap-1.5 text-[13px] text-smoke">
                            <ShieldCheck size={14} className="text-gold-600" /> Encrypted — your details never touch our servers.
                          </p>

                          <div className="mt-7 space-y-4">
                            <Field
                              label="Card number"
                              value={form.card}
                              onChange={(v) => set('card', onlyDigits(v).slice(0, 16).replace(/(.{4})/g, '$1 ').trim())}
                              placeholder="0000 0000 0000 0000"
                              inputMode="numeric"
                              icon={<CreditCard size={15} className="text-smoke" />}
                              autoComplete="cc-number"
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <Field
                                label="Expiry"
                                value={form.exp}
                                onChange={(v) => {
                                  const d = onlyDigits(v).slice(0, 4);
                                  set('exp', d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d);
                                }}
                                placeholder="MM / YY"
                                inputMode="numeric"
                                autoComplete="cc-exp"
                              />
                              <Field
                                label="CVC"
                                value={form.cvc}
                                onChange={(v) => set('cvc', onlyDigits(v).slice(0, 4))}
                                placeholder="123"
                                inputMode="numeric"
                                autoComplete="cc-csc"
                              />
                            </div>
                            <Field label="Name on card" value={form.nameOnCard} onChange={(v) => set('nameOnCard', v)} autoComplete="cc-name" />
                          </div>

                          <div className="mt-8 flex items-center gap-3">
                            <button
                              onClick={() => setStep('shipping')}
                              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink/40"
                              aria-label="Back to delivery"
                            >
                              <ArrowLeft size={17} />
                            </button>
                            <button
                              onClick={placeOrder}
                              disabled={!paymentValid || placing}
                              aria-live="polite"
                              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-400 py-4 text-[12px] uppercase tracking-widest2 text-gold-900 transition-all duration-300 hover:bg-gold-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {placing ? (
                                <>
                                  <Loader2 size={15} className="animate-spin" /> Processing…
                                </>
                              ) : (
                                <>
                                  <Lock size={14} /> Pay {formatPrice(total)}
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  /* Confirmation */
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="flex flex-1 flex-col items-center justify-center py-12 text-center"
                  >
                    <span className="grid h-20 w-20 place-items-center rounded-full bg-gold-400 text-gold-900">
                      <Check size={34} className="animate-pop-in" />
                    </span>
                    <h2 className="mt-7 font-display text-[34px] leading-none">Thank you.</h2>
                    <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-smoke">
                      Your order is confirmed. A signed confirmation is on its way to{' '}
                      <span className="text-ink">{form.email}</span>.
                    </p>
                    <div className="mt-6 rounded-2xl border border-ink/12 px-6 py-4">
                      <span className="text-[10px] uppercase tracking-widest2 text-smoke">Order number</span>
                      <div className="mt-1 font-display text-2xl tracking-tight">{orderNo}</div>
                    </div>
                    <button
                      onClick={close}
                      className="mt-8 rounded-full bg-bordeaux-700 px-8 py-4 text-[12px] uppercase tracking-widest2 text-white transition-colors hover:bg-bordeaux-800"
                    >
                      Continue shopping
                    </button>
                  </motion.div>
                )}
              </div>

              {/* ---------- Right: order summary ---------- */}
              {step !== 'done' && (
                <aside className="hidden min-h-0 flex-col border-l border-ink/10 bg-bone lg:flex">
                  <div className="flex-1 overflow-y-auto px-7 py-8">
                    <h3 className="text-[11px] uppercase tracking-widest2 text-smoke">Order summary</h3>
                    <ul className="mt-5 space-y-4">
                      {lines.map((l) => (
                        <li key={l.lineId} className="flex gap-3">
                          <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-sand">
                            <SmartImage src={l.product.image} alt={l.product.name} ratio="4/5" />
                            <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-bordeaux-700 px-1 text-[10px] font-medium text-white">
                              {l.qty}
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col">
                            <span className="font-display text-[15px] leading-tight">{l.product.name}</span>
                            <span className="text-[11px] uppercase tracking-widest2 text-smoke">{l.size}</span>
                            <span className="mt-auto font-display text-[14px]">
                              {formatPrice(l.product.price * l.qty)}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-ink/10 px-7 py-6">
                    <Row label="Subtotal" value={formatPrice(sub)} />
                    <Row label="Shipping" value={shipCost === 0 ? 'Complimentary' : formatPrice(shipCost)} />
                    <div className="my-3 h-px bg-ink/10" />
                    <div className="flex items-end justify-between">
                      <span className="text-[11px] uppercase tracking-widest2 text-smoke">Total</span>
                      <span className="font-display text-[26px] leading-none">{formatPrice(total)}</span>
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1 text-[13px]">
      <span className="text-smoke">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  inputMode?: 'text' | 'numeric' | 'email';
  autoComplete?: string;
  icon?: React.ReactNode;
}

function Field({ label, value, onChange, type = 'text', placeholder, className, inputMode, autoComplete, icon }: FieldProps) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1.5 block text-[10.5px] uppercase tracking-widest2 text-smoke">{label}</span>
      <span className="relative block">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          className={cn(
            'w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-smoke/50 focus:border-bordeaux-700',
            icon && 'pr-11'
          )}
        />
        {icon && <span className="absolute right-4 top-1/2 -translate-y-1/2">{icon}</span>}
      </span>
    </label>
  );
}
