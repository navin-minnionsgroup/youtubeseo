import { useMemo, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Trash2,
  Truck,
  Zap,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import {
  ADDONS,
  WHATSAPP_LINK,
  cartTotals,
  inr,
  loadCart,
  saveCart
} from "@/lib/cart";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

export default function Cart() {
  const [items, setItems] = useState(() => loadCart());
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  const update = (next) => {
    setItems(next);
    saveCart(next);
  };

  const totals = useMemo(() => cartTotals(items, applied), [items, applied]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const addonIds = new Set(items.map((i) => i.id));
  const availableAddons = ADDONS.filter((a) => !addonIds.has(a.id));

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    if (code === "RANK10" || code === "TUBE500") {
      setApplied(code);
      setCouponMsg(
        code === "RANK10" ? "RANK10 applied — 10% off!" : "TUBE500 applied — ₹500 off!"
      );
    } else {
      setApplied("");
      setCouponMsg("Invalid code. Try RANK10 or TUBE500.");
    }
  };

  const inc = (id) =>
    update(items.map((i) => (i.id === id ? { ...i, qty: Math.min(5, i.qty + 1) } : i)));
  const dec = (id) =>
    update(items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)));
  const remove = (id) => update(items.filter((i) => i.id !== id));

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
      <Head title="Secure Cart - YouTube SEO" />

      {/* Header / Nav */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/85 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/85">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-[#FF0033]">
            <FaYoutube className="size-6" /> TubeRankSEO
          </Link>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ShoppingCart className="size-4 text-[#FF0033]" />
            <span>{count} items</span>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_50%_-6rem,rgba(255,0,51,0.12),transparent),radial-gradient(40rem_24rem_at_90%_10rem,rgba(255,0,51,0.07),transparent)]"
          />
          <div className="mx-auto w-full max-w-6xl px-5 md:px-8 relative pt-10 pb-6 text-center md:pt-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-red-600 uppercase dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
              <Zap className="size-3" /> Secure cart
            </span>
            <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
              Your cart, ready to <span className="text-[#FF0033]">rank higher</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base dark:text-neutral-400">
              One-time payment. No subscription. 8,718+ creators already ranked with this pack.
            </p>
          </div>
        </section>

        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 pb-16 md:pb-24">
          {items.length === 0 ? (
            <motion.div
              {...fadeUp}
              className="mx-auto mt-8 max-w-xl rounded-[2rem] border border-neutral-200 bg-white p-10 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            >
              <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-red-50 text-[#FF0033] dark:bg-red-950/50">
                <ShoppingCart className="size-6" />
              </span>
              <h2 className="mt-4 text-2xl font-extrabold">Your cart is empty</h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Add the YouTube SEO Pack to start ranking in 15 days.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/#pricing">
                  <button className="rounded-full bg-[#FF0033] px-6 py-3 font-extrabold text-white hover:bg-[#cc0029] transition">
                    View pack — ₹2,000
                  </button>
                </Link>
              </div>
              <button
                className="mt-4 font-bold text-sm text-[#FF0033] underline"
                onClick={() => {
                  const fresh = [
                    {
                      id: "youtube-seo-pack",
                      name: "YouTube SEO Pack",
                      detail: "10 videos + full channel audit • One-time",
                      price: 2000,
                      mrp: 5999,
                      qty: 1,
                      tag: "Most popular",
                      features: [],
                    },
                  ];
                  update(fresh);
                }}
              >
                Restore YouTube SEO Pack
              </button>
            </motion.div>
          ) : (
            <div className="mt-8 grid items-start gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6 dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <div className="flex gap-4">
                      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#FF0033] text-white shadow-lg shadow-red-600/25">
                        <FaYoutube className="size-7" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-extrabold md:text-lg">{item.name}</h3>
                          {item.tag && (
                            <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-[11px] font-bold text-white dark:bg-white dark:text-neutral-900">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-[13px] font-medium text-neutral-500">
                          {item.detail}
                        </p>
                        {item.features && item.features.length > 0 && (
                          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                            {item.features.slice(0, 4).map((f) => (
                              <li
                                key={f}
                                className="flex items-start gap-1.5 text-[13px] font-semibold text-neutral-700 dark:text-neutral-300"
                              >
                                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                              <button
                                onClick={() => dec(item.id)}
                                className="grid size-8 place-items-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                aria-label="Decrease"
                              >
                                <Minus className="size-4" />
                              </button>
                              <span className="w-7 text-center text-sm font-extrabold">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => inc(item.id)}
                                className="grid size-8 place-items-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                aria-label="Increase"
                              >
                                <Plus className="size-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => remove(item.id)}
                              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-bold text-neutral-500 transition hover:bg-red-50 hover:text-[#FF0033]"
                            >
                              <Trash2 className="size-4" /> Remove
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-neutral-400 line-through">
                              {inr(item.mrp * item.qty)}
                            </p>
                            <p className="text-xl font-black text-[#FF0033]">
                              {inr(item.price * item.qty)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {availableAddons.length > 0 && (
                  <motion.div
                    {...fadeUp}
                    className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-5 sm:p-6 dark:border-neutral-700 dark:bg-neutral-900/60"
                  >
                    <p className="flex items-center gap-2 text-sm font-extrabold">
                      <Zap className="size-4 text-[#FF0033]" /> Frequently added with SEO Pack
                    </p>
                    <div className="mt-4 space-y-3">
                      {availableAddons.map((a) => (
                        <div
                          key={a.id}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950"
                        >
                          <div>
                            <p className="text-sm font-extrabold">{a.name}</p>
                            <p className="text-xs text-neutral-500">{a.detail}</p>
                            <p className="mt-1 text-sm font-black text-[#FF0033]">
                              {inr(a.price)}{" "}
                              <span className="text-xs font-bold text-neutral-400 line-through">
                                {inr(a.mrp)}
                              </span>
                            </p>
                          </div>
                          <button
                            className="rounded-full border px-4 py-2 text-xs font-bold flex items-center gap-1 hover:border-[#FF0033] hover:text-[#FF0033] transition"
                            onClick={() => update([...items, { ...a }])}
                          >
                            <Plus className="size-4" /> Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div {...fadeUp} className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
                    <p className="text-sm font-extrabold">Have a coupon?</p>
                    <div className="mt-3 flex gap-2">
                      <input
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="RANK10 / TUBE500"
                        className="h-10 w-full rounded-xl border border-neutral-200 bg-transparent px-3 text-sm font-bold uppercase outline-none placeholder:font-semibold placeholder:normal-case focus:border-[#FF0033] dark:border-neutral-700"
                      />
                      <button
                        onClick={applyCoupon}
                        className="h-10 shrink-0 px-4 rounded-xl bg-neutral-900 font-bold text-white dark:bg-white dark:text-neutral-900"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMsg && (
                      <p
                        className={`mt-2 text-xs font-bold ${applied ? "text-emerald-600" : "text-[#FF0033]"}`}
                      >
                        {couponMsg}
                      </p>
                    )}
                  </div>
                  <div className="rounded-3xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className="size-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs font-extrabold">4.9/5 • 8,718+ creators</p>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-[13px] font-semibold text-neutral-600 dark:text-neutral-300">
                      <li className="flex items-center gap-2">
                        <Lock className="size-3.5 text-emerald-600" /> Secure checkout • UPI / Cards
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="size-3.5 text-emerald-600" /> White-hat only • No password needed
                      </li>
                      <li className="flex items-center gap-2">
                        <Truck className="size-3.5 text-emerald-600" /> Delivery in 3–5 days + 15-day support
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-500 hover:text-[#FF0033]"
                >
                  <ArrowLeft className="size-4" /> Continue shopping
                </Link>
              </div>

              <motion.aside
                {...fadeUp}
                className="overflow-hidden rounded-[2rem] border-2 border-[#FF0033] bg-white shadow-2xl shadow-red-600/15 lg:sticky lg:top-24 dark:bg-neutral-900"
              >
                <div className="bg-[#FF0033] px-6 py-3 text-center text-[13px] font-extrabold tracking-wide text-white uppercase">
                  You save {inr(totals.savings)} today
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="text-lg font-extrabold">Order summary</h3>
                  <p className="text-[13px] text-neutral-500">
                    {count} item{count > 1 ? "s" : ""} • One-time payment
                  </p>

                  <div className="mt-5 space-y-2.5 border-t border-dashed border-neutral-200 pt-5 text-sm dark:border-neutral-800">
                    {items.map((i) => (
                      <div key={i.id} className="flex justify-between gap-3 font-semibold">
                        <span className="text-neutral-600 dark:text-neutral-300">
                          {i.name} × {i.qty}
                        </span>
                        <span className="font-extrabold">{inr(i.price * i.qty)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-semibold text-neutral-500">
                      <span>Subtotal</span>
                      <span className="line-through">{inr(totals.mrpTotal)}</span>
                    </div>
                    {totals.couponOff > 0 && (
                      <div className="flex justify-between font-bold text-emerald-600">
                        <span>Coupon {totals.code}</span>
                        <span>− {inr(totals.couponOff)}</span>
                      </div>
                    )}
                    <div className="flex items-end justify-between pt-2">
                      <span className="font-extrabold">Total</span>
                      <span className="text-3xl font-black text-[#FF0033]">
                        {inr(totals.total)}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout" className="mt-6 block">
                    <button className="h-13 w-full rounded-2xl bg-[#FF0033] text-base font-extrabold text-white hover:bg-[#cc0029] transition flex items-center justify-center gap-2">
                      Proceed to checkout <ArrowRight className="size-4" />
                    </button>
                  </Link>

                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-neutral-500">
                    <Lock className="size-3.5" /> Secure checkout • UPI / Cards accepted
                  </p>

                  <div className="mt-5 rounded-2xl bg-neutral-50 p-4 text-[13px] dark:bg-neutral-800/60">
                    <p className="flex items-start gap-2 font-semibold">
                      <BadgeCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      Satisfaction guaranteed — if we miss delivery, you get priority rework free.
                    </p>
                  </div>

                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="block mt-3">
                    <button className="w-full rounded-2xl border py-3 font-bold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
                      Questions? Chat on WhatsApp
                    </button>
                  </a>
                </div>
              </motion.aside>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}