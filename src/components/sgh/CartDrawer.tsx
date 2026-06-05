import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { BRAND } from "@/lib/menu";

export function CartDrawer({ open, onClose, onCheckout }: { open: boolean; onClose: () => void; onCheckout: () => void }) {
  const { items, subtotal, delivery, total, inc, dec, remove } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(open), [open]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-2xl transition-transform duration-300 ${mounted ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-flame" />
            <h2 className="text-lg font-bold">Your Cart</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
              <div className="text-6xl">🛒</div>
              <p>Your cart is empty</p>
              <p className="text-xs">Add some sizzling items to get started</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={i.id} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-surface-elevated text-3xl">
                    {i.emoji}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="line-clamp-2 text-sm font-semibold">{i.name}</h4>
                      <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-border">
                        <button onClick={() => dec(i.id)} className="p-1.5 hover:text-flame">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-semibold">{i.qty}</span>
                        <button onClick={() => inc(i.id)} className="p-1.5 hover:text-flame">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-gold">Rs {i.qty * i.price}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border bg-surface-elevated px-5 py-4">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd>Rs {subtotal}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Delivery</dt>
                <dd>Rs {delivery}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
                <dt>Total</dt>
                <dd className="text-gold">Rs {total}</dd>
              </div>
            </dl>
            <button
              onClick={onCheckout}
              className="mt-4 w-full rounded-full bg-flame py-3 text-sm font-bold text-flame-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Checkout via WhatsApp
            </button>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">Hours {BRAND.hours} · COD available</p>
          </footer>
        )}
      </aside>
    </div>
  );
}
