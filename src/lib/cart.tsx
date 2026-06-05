import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartItem = { id: string; name: string; price: number; qty: number; emoji: string };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  add: (i: Omit<CartItem, "qty">) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
    const delivery = items.length ? 100 : 0;
    return {
      items,
      count,
      subtotal,
      delivery,
      total: subtotal + delivery,
      add: (i) =>
        setItems((prev) => {
          const ex = prev.find((p) => p.id === i.id);
          if (ex) return prev.map((p) => (p.id === i.id ? { ...p, qty: p.qty + 1 } : p));
          return [...prev, { ...i, qty: 1 }];
        }),
      inc: (id) => setItems((p) => p.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))),
      dec: (id) =>
        setItems((p) =>
          p.flatMap((i) => (i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i])),
        ),
      remove: (id) => setItems((p) => p.filter((i) => i.id !== id)),
      clear: () => setItems([]),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
};
