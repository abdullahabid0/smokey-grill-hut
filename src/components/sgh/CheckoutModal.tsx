import { useState } from "react";
import { X, MessageCircle, Wallet, CreditCard } from "lucide-react";
import { useCart } from "@/lib/cart";
import { BRAND } from "@/lib/menu";
import { toast } from "sonner";

type PayMethod = "whatsapp" | "cod" | "online";

const METHOD_LABEL: Record<PayMethod, string> = {
  whatsapp: "WhatsApp Order",
  cod: "Cash on Delivery",
  online: "Pay Online (Card)",
};

export function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, subtotal, delivery, total, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState<PayMethod>("whatsapp");

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;

    if (method === "online") {
      toast.info("Online card payments coming soon — please use WhatsApp or COD for now.");
      return;
    }

    const lines = items.map((i, idx) => `${idx + 1}. ${i.name} x${i.qty} — Rs ${i.qty * i.price}`).join("\n");
    const msg =
      `*🔥 New Order — ${BRAND.name}*\n\n` +
      `*Items:*\n${lines}\n\n` +
      `Subtotal: Rs ${subtotal}\nDelivery: Rs ${delivery}\n*Total: Rs ${total}*\n\n` +
      `*Customer:* ${name}\n*Phone:* ${phone}\n*Address:* ${address}\n*Payment:* ${METHOD_LABEL[method]}`;
    const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    toast.success("Redirecting to WhatsApp…");
    clear();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 hover:bg-secondary">
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-bold">Checkout</h3>
        <p className="mt-1 text-xs text-muted-foreground">We'll send your order via WhatsApp</p>

        <form onSubmit={submit} className="mt-5 space-y-3">
          <Field label="Full Name" value={name} onChange={setName} placeholder="Ali Khan" />
          <Field label="WhatsApp / Phone" value={phone} onChange={setPhone} placeholder="03XX XXXXXXX" type="tel" />
          <Field label="Delivery Address" value={address} onChange={setAddress} placeholder="House #, Street, Area, Lahore" textarea />
          <div className="rounded-2xl border border-border bg-card p-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment</span>
              <span className="font-semibold">Cash on Delivery</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-2 text-base font-bold">
              <span>Total</span>
              <span className="text-gold">Rs {total}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={!name || !phone || !address || !items.length}
            className="w-full rounded-full bg-flame py-3 text-sm font-bold text-flame-foreground transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            Confirm Order via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", textarea,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; textarea?: boolean }) {
  const cls = "w-full rounded-xl border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-flame focus:ring-2 focus:ring-flame/30";
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea required rows={2} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      ) : (
        <input required type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}
