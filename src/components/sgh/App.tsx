import { useEffect, useMemo, useRef, useState } from "react";
import { Clock, Flame, MapPin, Phone, ShoppingBag, Truck } from "lucide-react";
import { toast } from "sonner";
import { CartProvider, useCart } from "@/lib/cart";
import { BRAND, CATEGORIES, DEALS, PRODUCTS, type Category } from "@/lib/menu";
import { ProductCard } from "./ProductCard";
import { CartDrawer } from "./CartDrawer";
import { CheckoutModal } from "./CheckoutModal";

type View = "home" | "menu" | "about" | "contact";

function Header({ view, setView, openCart }: { view: View; setView: (v: View) => void; openCart: () => void }) {
  const { count } = useCart();
  const [popped, setPopped] = useState(false);
  const prev = useRef(count);
  useEffect(() => {
    if (count > prev.current) {
      setPopped(true);
      const t = setTimeout(() => setPopped(false), 350);
      return () => clearTimeout(t);
    }
    prev.current = count;
  }, [count]);

  const nav: { id: View; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 glass border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button onClick={() => setView("home")} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-flame text-flame-foreground">
            <Flame className="h-5 w-5" />
          </div>
          <div className="text-left leading-tight">
            <div className="text-sm font-extrabold tracking-tight">SMOKEY GRILL</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Hut · Lahore</div>
          </div>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setView(n.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                view === n.id ? "text-flame" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
              {view === n.id && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-flame" />}
            </button>
          ))}
        </nav>

        <button
          onClick={openCart}
          className="relative inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-semibold hover:border-flame"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className={`flex h-5 min-w-5 items-center justify-center rounded-full bg-flame px-1.5 text-[10px] font-bold text-flame-foreground ${popped ? "animate-pop" : ""}`}>
              {count}
            </span>
          )}
        </button>
      </div>

      <div className="border-t border-border md:hidden">
        <div className="no-scrollbar flex gap-1 overflow-x-auto px-4 py-2">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setView(n.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                view === n.id ? "bg-flame text-flame-foreground" : "bg-secondary text-foreground"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function InfoChip({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-flame/15 text-flame">
        <Icon className="h-4 w-4" />
      </div>
      <div className="leading-tight">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-bold">{value}</div>
      </div>
    </div>
  );
}

function Home({ goMenu }: { goMenu: () => void }) {
  const { add } = useCart();
  const bestBurgers = useMemo(() => PRODUCTS.filter((p) => p.category === "Burgers").slice(0, 3), []);
  const bestShawarma = useMemo(
    () => [...PRODUCTS.filter((p) => p.category === "Shawarma").slice(0, 2), ...PRODUCTS.filter((p) => p.category === "Platter").slice(0, 1)],
    [],
  );

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,color-mix(in_oklab,var(--flame)_25%,transparent),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold">
                <Flame className="h-3.5 w-3.5" /> Open Now · {BRAND.hours}
              </span>
              <h1 className="mt-5 text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Sizzling Grills
                <br />
                <span className="bg-gradient-to-r from-flame via-gold to-flame bg-clip-text text-transparent">& Massive Deals</span>
              </h1>
              <p className="mt-5 max-w-md text-base text-muted-foreground">
                Flame-grilled burgers, juicy shawarmas and signature platters — crafted hot, delivered fast across Model Town, Lahore.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={goMenu}
                  className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold text-flame-foreground shadow-[0_10px_40px_-10px_var(--flame)] transition-all hover:scale-105"
                >
                  <ShoppingBag className="h-4 w-4" /> Order Now
                </button>
                <a
                  href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold hover:border-flame"
                >
                  <Phone className="h-4 w-4" /> {BRAND.phone}
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <InfoChip icon={Clock} label="Timings" value={BRAND.hours} />
                <InfoChip icon={Truck} label="Delivery" value={BRAND.delivery} />
                <InfoChip icon={Phone} label="Contact" value={BRAND.phone} />
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto aspect-square w-full max-w-md">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-flame/30 via-gold/20 to-transparent blur-3xl" />
                <div className="relative flex h-full w-full items-center justify-center rounded-[2.5rem] border border-border bg-gradient-to-br from-surface-elevated to-card">
                  <div className="text-[14rem] leading-none drop-shadow-[0_20px_60px_color-mix(in_oklab,var(--flame)_60%,transparent)]">
                    🍔
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Bestseller</div>
                  <div className="text-sm font-bold">Zinger Burger</div>
                  <div className="text-sm font-bold text-gold">Rs 300</div>
                </div>
                <div className="absolute -right-2 -top-2 rounded-2xl border border-gold/40 bg-gold/10 px-3 py-2 text-xs font-bold text-gold">
                  🔥 Smokey & Grilled
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deals */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Limited Time" title="Exclusive Top Deals" />
        <div className="grid gap-5 md:grid-cols-3">
          {DEALS.map((d) => (
            <div
              key={d.id}
              className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-surface-elevated p-6 transition-all hover:-translate-y-1 hover:border-flame/60"
            >
              <div className="absolute -right-10 -top-10 text-[10rem] opacity-10 transition-transform group-hover:scale-110">
                {d.emoji}
              </div>
              <span className="inline-block rounded-full bg-flame/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-flame">
                {d.badge}
              </span>
              <h3 className="mt-4 text-2xl font-extrabold">{d.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.subtitle}</p>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Only</div>
                  <div className="text-3xl font-extrabold text-gold">Rs {d.price}</div>
                </div>
                <button
                  onClick={() => {
                    add({ id: d.id, name: `${d.title} (Deal)`, price: d.price, emoji: d.emoji });
                    toast.success(`${d.title} added`, { duration: 1500 });
                  }}
                  className="rounded-full bg-flame px-4 py-2 text-xs font-bold text-flame-foreground transition-all hover:scale-105"
                >
                  + Add Deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best burgers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Customer Favourites" title="Best Selling Burgers" action={{ label: "View all", onClick: goMenu }} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bestBurgers.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Shawarma & platters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Signature" title="Shawarmas & Platters" action={{ label: "View all", onClick: goMenu }} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bestShawarma.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ eyebrow, title, action }: { eyebrow: string; title: string; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-flame">{eyebrow}</div>
        <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      </div>
      {action && (
        <button onClick={action.onClick} className="text-sm font-semibold text-gold hover:underline">
          {action.label} →
        </button>
      )}
    </div>
  );
}

function Menu() {
  const [active, setActive] = useState<Category>("Burgers");
  const filtered = useMemo(() => PRODUCTS.filter((p) => p.category === active), [active]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6">
      <div className="mb-6">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-flame">Full Menu</div>
        <h1 className="mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl">Pick Your Craving</h1>
      </div>

      <div className="sticky top-[64px] z-30 -mx-4 mb-8 glass px-4 py-3 sm:-mx-6 sm:px-6">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                active === c
                  ? "bg-flame text-flame-foreground shadow-[0_8px_24px_-8px_var(--flame)]"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-flame">About Us</div>
      <h1 className="mt-2 text-5xl font-extrabold tracking-tight sm:text-6xl">
        Smokey & Grilled <span className="text-gold">perfection</span> since 2024.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        At {BRAND.name}, every patty is flame-kissed and every shawarma is hand-rolled. Born in the heart of Model Town,
        Lahore, we built a kitchen obsessed with one thing — that real, smokey, char-grilled flavour you can't fake.
      </p>
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {[
          { t: "Flame Grilled", d: "Real charcoal flavour, every time.", e: "🔥" },
          { t: "Fresh Daily", d: "Hand-prepped, never frozen.", e: "🥩" },
          { t: "Fast Delivery", d: "Hot to your door in Model Town.", e: "🛵" },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl border border-border bg-card p-6">
            <div className="text-4xl">{x.e}</div>
            <div className="mt-3 text-lg font-bold">{x.t}</div>
            <div className="mt-1 text-sm text-muted-foreground">{x.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-flame">Get In Touch</div>
      <h1 className="mt-2 text-5xl font-extrabold tracking-tight sm:text-6xl">Visit or Call</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-flame">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-flame/15 text-flame">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone</div>
              <div className="text-lg font-bold">{BRAND.phone}</div>
            </div>
          </a>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-flame/15 text-flame">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Address</div>
              <div className="text-base font-semibold">{BRAND.address}</div>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-flame/15 text-flame">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Hours</div>
              <div className="text-base font-semibold">Daily · {BRAND.hours}</div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Model+Town+Block+Q+Commercial+Area+Lahore&output=embed"
            className="h-[400px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

function WhatsAppBubble() {
  return (
    <a
      href={`https://wa.me/${BRAND.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_-10px_#25D366] transition-transform hover:scale-110"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.555-5.338 11.89-11.893 11.89a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
      </svg>
    </a>
  );
}

function Shell() {
  const [view, setView] = useState<View>("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  return (
    <div className="min-h-screen">
      <Header view={view} setView={setView} openCart={() => setCartOpen(true)} />
      <main>
        {view === "home" && <Home goMenu={() => setView("menu")} />}
        {view === "menu" && <Menu />}
        {view === "about" && <About />}
        {view === "contact" && <Contact />}
      </main>

      <footer className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} {BRAND.name} · Model Town, Lahore · {BRAND.phone}
        </div>
      </footer>

      <WhatsAppBubble />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}

export default function SmokeyApp() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  );
}
