import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/menu";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-flame/60 hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--flame)_45%,transparent)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-surface-elevated to-surface">
        <div className="absolute inset-0 flex items-center justify-center text-7xl transition-transform duration-500 group-hover:scale-110">
          {p.emoji}
        </div>
        {p.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gold-foreground">
            {p.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground">{p.name}</h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gold">Rs {p.price}</span>
          <button
            onClick={() => {
              add({ id: p.id, name: p.name, price: p.price, emoji: p.emoji });
              toast.success(`${p.name} added`, { duration: 1500 });
            }}
            className="inline-flex items-center gap-1 rounded-full bg-flame px-3 py-1.5 text-xs font-bold text-flame-foreground transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
