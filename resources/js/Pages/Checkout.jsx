import { useMemo, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Landmark,
  Loader2,
  Lock,
  Mail,
  Phone,
  QrCode,
  ShieldCheck,
  Star,
  User,
  Link2 as YoutubeIcon,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { cn } from "@/lib/utils";
import {
  WHATSAPP_LINK,
  cartTotals,
  clearCart,
  inr,
  loadCart,
} from "@/lib/cart";
import { createPayuOrder, redirectToPayu } from "@/lib/payments";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

const inputCls =
  "h-11 w-full rounded-xl border border-neutral-200 bg-transparent px-3.5 text-sm font-semibold outline-none placeholder:font-medium placeholder:text-neutral-400 focus:border-[#FF0033] dark:border-neutral-700";

export default function Checkout() {
  const [items] = useState(() => loadCart());
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    channel: "",
    niche: "Vlogging",
    note: "",
  });
  const [pay, setPay] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({ num: "", exp: "", cvv: "", cname: "" });
  const [touched, setTouched] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [payError, setPayError] = useState("");

  const totals = useMemo(() => cartTotals(items, coupon), [items, coupon]);
  const count = items.reduce((s, i) => s + i.qty, 0);

  const set = (k, v) =>
    setForm((f) => ({ ...f, [k]: v }));

  const valid =
    form.name.trim().length >= 2 &&
    /.+@.+\..+/.test(form.email.trim()) &&
    form.phone.replace(/\D/g, "").length >= 10 &&
    form.channel.trim().length >= 4;

  const placeOrder = async () => {
    setTouched(true);
    setPayError("");
    if (!valid || placing) return;
    if (items.length === 0) return;
    setPlacing(true);
    try {
      const order = await createPayuOrder({
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          channel: form.channel,
          niche: form.niche,
          note: form.note,
        },
        items,
        coupon,
      });
      try {
        sessionStorage.setItem("trs_last_txnid", order.txnid);
        sessionStorage.setItem("trs_last_amount", String(order.amountPaise));
      } catch {
        /* ignore */
      }
      clearCart();
      redirectToPayu(order.payuUrl, order.params);
    } catch (e) {
      setPlacing(false);
      setPayError(e?.response?.data?.message || e.message || "Could not start payment. Please try again.");
    }
  };

  const err = (cond) =>
    touched && !cond
      ? "border-[#FF0033] focus:border-[#FF0033]"
      : "";

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
      <Head title="Secure Checkout - YouTube SEO" />

      {/* Header / Nav */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/85 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/85">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-[#FF0033]">
            <FaYoutube className="size-6" /> TubeRankSEO
          </Link>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Checkout</span>
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
              Secure checkout
            </span>
            <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
              Almost there — <span className="text-[#FF0033]">rank your channel</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 md:text-base dark:text-neutral-400">
              2-minute checkout. No password required. Delivery in 3–5 days.
            </p>
          </div>
        </section>

        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 pb-16 md:pb-24">
          {items.length === 0 ? (
            <div className="mx-auto mt-8 max-w-md rounded-3xl border bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-lg font-extrabold">No items to checkout</p>
              <p className="mt-1 text-sm text-neutral-500">Your cart is empty.</p>
              <Link href="/cart" className="mt-5 block">
                <button className="w-full rounded-2xl bg-[#FF0033] py-3 font-extrabold text-white hover:bg-[#cc0029] transition">
                  Go to cart
                </button>
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid items-start gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              {/* form */}
              <div className="space-y-4">
                <motion.div
                  {...fadeUp}
                  className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-7 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <h2 className="flex items-center gap-2 text-lg font-extrabold">
                    <span className="grid size-8 place-items-center rounded-xl bg-red-50 text-[#FF0033] dark:bg-red-950/50">
                      <User className="size-4" />
                    </span>
                    Your details
                  </h2>
                  <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[13px] font-bold">Full name *</label>
                      <div className="relative">
                        <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
                        <input
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder="Rohit Sharma"
                          className={cn(inputCls, "pl-9", err(form.name.trim().length >= 2))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[13px] font-bold">Phone (WhatsApp) *</label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
                        <input
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          placeholder="+91 98765 43210"
                          className={cn(inputCls, "pl-9", err(form.phone.replace(/\D/g, "").length >= 10))}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-[13px] font-bold">Email *</label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
                        <input
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          placeholder="you@gmail.com"
                          className={cn(inputCls, "pl-9", err(/.+@.+\..+/.test(form.email.trim())))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[13px] font-bold">Channel link *</label>
                      <div className="relative">
                        <YoutubeIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
                        <input
                          value={form.channel}
                          onChange={(e) => set("channel", e.target.value)}
                          placeholder="youtube.com/@yourchannel"
                          className={cn(inputCls, "pl-9", err(form.channel.trim().length >= 4))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[13px] font-bold">Niche</label>
                      <select
                        value={form.niche}
                        onChange={(e) => set("niche", e.target.value)}
                        className={cn(inputCls, "font-bold")}
                      >
                        {["Vlogging", "Tech", "Gaming", "Education", "Finance", "Fitness", "Cooking", "Travel", "Motivation", "Comedy", "Other"].map((n) => (
                          <option key={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-[13px] font-bold">
                        Goal / note <span className="font-medium text-neutral-400">(optional)</span>
                      </label>
                      <textarea
                        value={form.note}
                        onChange={(e) => set("note", e.target.value)}
                        rows={3}
                        placeholder="e.g. Want to rank for video editing keywords…"
                        className="w-full rounded-xl border border-neutral-200 bg-transparent px-3.5 py-3 text-sm font-medium outline-none placeholder:text-neutral-400 focus:border-[#FF0033] dark:border-neutral-700"
                      />
                    </div>
                  </div>
                  {touched && !valid && (
                    <p className="mt-3 text-xs font-bold text-[#FF0033]">
                      Please fill name, valid email, 10-digit phone & channel link.
                    </p>
                  )}
                </motion.div>

                <motion.div
                  {...fadeUp}
                  className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-7 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <h2 className="flex items-center gap-2 text-lg font-extrabold">
                    <span className="grid size-8 place-items-center rounded-xl bg-red-50 text-[#FF0033] dark:bg-red-950/50">
                      <Lock className="size-4" />
                    </span>
                    Payment method
                    <span className="ml-auto hidden items-center gap-1 text-[11px] font-bold text-emerald-600 sm:flex">
                      <ShieldCheck className="size-3.5" /> 100% secure
                    </span>
                  </h2>

                  <div className="mt-5 grid gap-3">
                    {(
                      [
                        { id: "upi", icon: QrCode, t: "UPI", d: "GPay / PhonePe / Paytm — instant & free", badge: "Recommended" },
                        { id: "card", icon: CreditCard, t: "Card", d: "Visa / Mastercard / RuPay" },
                        { id: "netbanking", icon: Landmark, t: "Netbanking", d: "All major Indian banks" },
                      ]
                    ).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setPay(m.id)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border p-4 text-left transition",
                          pay === m.id
                            ? "border-[#FF0033]/50 bg-red-50/60 dark:bg-red-950/20"
                            : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-800"
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-10 shrink-0 place-items-center rounded-xl",
                            pay === m.id ? "bg-[#FF0033] text-white" : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800"
                          )}
                        >
                          <m.icon className="size-5" />
                        </span>
                        <span className="flex-1">
                          <span className="flex items-center gap-2 text-sm font-extrabold">
                            {m.t}
                            {m.badge && (
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700 uppercase">
                                {m.badge}
                              </span>
                            )}
                          </span>
                          <span className="block text-xs text-neutral-500">{m.d}</span>
                        </span>
                        <span
                          className={cn(
                            "grid size-5 place-items-center rounded-full border-2",
                            pay === m.id ? "border-[#FF0033]" : "border-neutral-300 dark:border-neutral-700"
                          )}
                        >
                          {pay === m.id && <span className="size-2.5 rounded-full bg-[#FF0033]" />}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>

                <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-500 hover:text-[#FF0033]">
                  <ArrowLeft className="size-4" /> Back to cart
                </Link>
              </div>

              {/* summary */}
              <motion.aside
                {...fadeUp}
                className="overflow-hidden rounded-[2rem] border-2 border-[#FF0033] bg-white shadow-2xl shadow-red-600/15 lg:sticky lg:top-24 dark:bg-neutral-900"
              >
                <div className="flex items-center gap-2 bg-[#FF0033] px-6 py-3 text-white">
                  <FaYoutube className="size-4" />
                  <p className="text-[13px] font-extrabold tracking-wide uppercase">
                    YouTube SEO Pack • {count} item{count > 1 ? "s" : ""}
                  </p>
                  <div className="ml-auto flex items-center gap-1">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-black">4.9</span>
                  </div>
                </div>
                <div className="p-6 md:p-7">
                  <div className="space-y-3">
                    {items.map((i) => (
                      <div key={i.id} className="flex gap-3 rounded-2xl border border-neutral-200 p-3.5 dark:border-neutral-800">
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                          <FaYoutube className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-extrabold">{i.name} × {i.qty}</p>
                          <p className="truncate text-xs text-neutral-500">{i.detail}</p>
                        </div>
                        <p className="text-sm font-black">{inr(i.price * i.qty)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2 border-t border-dashed border-neutral-200 pt-5 text-sm dark:border-neutral-800">
                    <div className="flex justify-between font-semibold text-neutral-500">
                      <span>MRP</span>
                      <span className="line-through">{inr(totals.mrpTotal)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-neutral-500">
                      <span>Offer price</span>
                      <span>{inr(totals.subtotal)}</span>
                    </div>
                    <div className="flex items-end justify-between pt-1">
                      <span className="font-extrabold">To pay</span>
                      <span className="text-3xl font-black text-[#FF0033]">{inr(totals.total)}</span>
                    </div>
                    <p className="rounded-xl bg-emerald-50 px-3 py-2 text-center text-xs font-extrabold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                      You save {inr(totals.savings)} — one-time, no subscription
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <input
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value.toUpperCase());
                        setPayError("");
                      }}
                      placeholder="Coupon (RANK10 / TUBE500)"
                      className="h-11 w-full rounded-xl border border-neutral-200 bg-transparent px-3.5 text-sm font-bold uppercase outline-none placeholder:font-medium placeholder:normal-case placeholder:text-neutral-400 focus:border-[#FF0033] dark:border-neutral-700"
                    />
                  </div>
                  {totals.couponOff > 0 && (
                    <p className="mt-2 text-center text-xs font-extrabold text-emerald-600">
                      {totals.code} applied — you save {inr(totals.couponOff)} extra!
                    </p>
                  )}

                  {payError && (
                    <p role="alert" className="mt-4 rounded-xl bg-red-50 px-3 py-2.5 text-center text-[13px] font-bold text-[#cc0029] dark:bg-red-950/40 dark:text-red-400">
                      {payError}
                    </p>
                  )}

                  <button
                    onClick={placeOrder}
                    disabled={placing}
                    className="mt-6 h-13 w-full rounded-2xl bg-[#FF0033] text-base font-extrabold text-white hover:bg-[#cc0029] disabled:opacity-70 transition flex items-center justify-center gap-2"
                  >
                    {placing ? (
                      <><Loader2 className="size-5 animate-spin" /> Redirecting to PayU…</>
                    ) : (
                      <>Pay {inr(totals.total)} securely <ArrowRight className="size-4" /></>
                    )}
                  </button>

                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-neutral-500">
                    <Lock className="size-3.5" /> Secured by PayU • UPI / Cards / Netbanking
                  </p>

                  <div className="mt-5 space-y-2 text-[13px] font-semibold text-neutral-600 dark:text-neutral-300">
                    <p className="flex items-start gap-2">
                      <BadgeCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      15-day free support + rework if no movement.
                    </p>
                    <p className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      White-hat only. No bots, no password needed.
                    </p>
                  </div>

                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="block mt-4">
                    <button className="w-full rounded-2xl border py-3 font-bold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
                      Need help? WhatsApp us
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