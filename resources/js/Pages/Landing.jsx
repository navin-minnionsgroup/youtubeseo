import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  Tag,
  FileText,
  Image as ImageIcon,
  BarChart3,
  CheckCircle2,
  Play,
  ArrowRight,
  Menu,
  X,
  Star,
  Zap,
  Target,
  Users,
  ChevronDown,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PAY_LINK = "/checkout";
const CART_LINK = '/cart'
const WHATSAPP_LINK = "https://wa.me/917091172666/";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
      <Head title="YouTube SEO Service — Rank #1, Get More Views" />
      <Header />
      <main>
        <Hero />
        <LogoStrip />
        <Problems />
        <Services />
        <HowItWorks />
        <Results />
        <Pricing />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function Container({ children, className }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 md:px-8", className)}>
      {children}
    </div>
  );
}

function SectionTag({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-red-600 uppercase dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
      <Zap className="size-3" />
      {children}
    </span>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Results", href: "#results" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/85 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/85">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img
            className="h-8 md:h-10 w-auto"
            src="/youtube-seo-logo.svg"
            alt="YouTube SEO Logo"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-neutral-600 md:flex dark:text-neutral-300">
          {links.map((l) => (
            <a key={l.name} href={l.href} className="transition hover:text-[#FF0033]">
              {l.name}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="rounded-full">
              Talk to expert
            </Button>
          </a>
          <Link href={CART_LINK}>
            <Button className="rounded-full bg-[#FF0033] text-white hover:bg-[#cc0029]">
              Get SEO — ₹2,000 <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        <button
          className="grid size-10 place-items-center rounded-lg border md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open && (
        <div className="border-t bg-white px-5 py-4 md:hidden dark:bg-neutral-950">
          <div className="flex flex-col gap-3 text-sm font-semibold">
            {links.map((l) => (
              <a key={l.name} href={l.href} onClick={() => setOpen(false)}>
                {l.name}
              </a>
            ))}
            <Link href={CART_LINK} onClick={() => setOpen(false)}>
              <Button className="mt-2 w-full bg-[#FF0033] text-white">
                Get SEO — ₹2,000
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_50%_-6rem,rgba(255,0,51,0.12),transparent),radial-gradient(40rem_24rem_at_90%_10rem,rgba(255,0,51,0.07),transparent)]"
      />
      <Container className="grid items-center gap-12 pt-12 pb-14 md:pt-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-bold text-white dark:bg-white dark:text-neutral-900">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              Trusted by 8,718+ Creators
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance md:text-6xl"
          >
            Rank higher on YouTube. Get more{" "}
            <span className="relative inline-block text-[#FF0033]">
              views & subs
              <svg
                viewBox="0 0 220 12"
                className="absolute -bottom-1 left-0 w-full"
                aria-hidden
              >
                <path
                  d="M3 9C60 3 160 3 217 8"
                  stroke="#FF0033"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.35"
                />
              </svg>
            </span>{" "}
            with SEO.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-400"
          >
            Stop uploading into the void. We optimize your titles, descriptions,
            tags, thumbnails & channel so YouTube search + suggested videos send
            you consistent traffic — starting at just{" "}
            <strong className="text-neutral-900 dark:text-white">₹2,000</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
          >
            <Link href={CART_LINK}>
              <Button
                size="lg"
                className="h-13 w-full rounded-full bg-[#FF0033] px-7 text-base font-bold text-white hover:bg-[#cc0029] sm:w-auto"
              >
                <Play className="size-4 fill-current" /> Pay now ₹2,000
              </Button>
            </Link>
            <a href="#process">
              <Button
                size="lg"
                variant="outline"
                className="h-13 w-full rounded-full px-7 text-base font-bold sm:w-auto"
              >
                See how it works
              </Button>
            </a>
          </motion.div>

          <div className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-neutral-200 overflow-hidden rounded-2xl border bg-neutral-50 dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900/60">
            {[
              { k: "+50%", v: "avg. view lift" },
              { k: "15 days", v: "to see movement" },
              { k: "4.9/5", v: "creator rating" },
            ].map((s) => (
              <div key={s.v} className="px-4 py-4 text-center">
                <p className="text-xl font-extrabold md:text-2xl">{s.k}</p>
                <p className="text-xs font-medium text-neutral-500">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, rotate: 1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <img src="/creator.png" alt="YouTube Creator" className="w-full h-auto rounded-3xl" />
          <div className="absolute -top-4 -right-2 rotate-3 rounded-2xl border bg-white px-4 py-2.5 shadow-xl md:-right-5 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-xs font-bold">🔥 +12,400 views this week</p>
          </div>
          <div className="absolute -bottom-4 -left-2 -rotate-2 rounded-2xl border bg-white px-4 py-2.5 shadow-xl md:-left-5 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-xs font-bold">✅ 94/100 SEO score</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function LogoStrip() {
  const niches = [
    "Vlogging",
    "Tech",
    "Gaming",
    "Education",
    "Finance",
    "Fitness",
    "Cooking",
    "Travel",
    "Motivation",
    "Comedy",
  ];
  return (
    <section className="border-y border-neutral-200/70 bg-neutral-50 py-6 dark:border-neutral-800 dark:bg-neutral-900/40">
      <Container>
        <p className="text-center text-xs font-bold tracking-[0.18em] text-neutral-500 uppercase">
          Trusted by creators across every niche
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {niches.map((n) => (
            <span
              key={n}
              className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-semibold text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
            >
              {n}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Problems() {
  const items = [
    {
      icon: TrendingUp,
      title: "Views stuck under 500?",
      text: "You post consistently but YouTube never pushes your videos to search or suggested. It's not your content — it's discoverability.",
    },
    {
      icon: Users,
      title: "Subs not growing?",
      text: "Random views don't convert. Without keyword targeting + packaging, the right audience never finds you.",
    },
    {
      icon: Target,
      title: "Guessing titles & tags?",
      text: "Copying competitors and stuffing keywords in 2026 kills reach. You need data-backed SEO, not guesswork.",
    },
  ];
  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <SectionTag>The real problem</SectionTag>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
            Great videos deserve more than 200 views
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">
            96% of small channels fail not because of quality — but because
            nobody can find them.
          </p>
        </motion.div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-red-50 text-[#FF0033] dark:bg-red-950/50">
                <c.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {c.text}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Search,
      title: "Keyword Research",
      text: "High-volume, low-competition keywords mapped to every video so you rank faster with less effort.",
    },
    {
      icon: FileText,
      title: "Titles + Descriptions",
      text: "Click-worthy, SEO-rich titles & 300-word optimized descriptions written to rank and convert.",
    },
    {
      icon: Tag,
      title: "Tags, Hashtags & Chapters",
      text: "Clean tag architecture, hashtags & timestamp chapters that boost suggested traffic.",
    },
    {
      icon: ImageIcon,
      title: "Thumbnail CTR Audit",
      text: "We audit & redesign direction for thumbnails to push CTR from 2% to 6–9%.",
    },
    {
      icon: BarChart3,
      title: "Channel Audit + Fixes",
      text: "Banner, about, playlists, branding, defaults & settings — full channel-level SEO cleanup.",
    },
    {
      icon: TrendingUp,
      title: "Competitor Gap Analysis",
      text: "We reverse-engineer what's working in your niche and build a 15-day ranking plan.",
    },
  ];
  return (
    <section id="services" className="bg-neutral-950 py-16 text-white md:py-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <SectionTag>What you get</SectionTag>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
              Everything YouTube SEO, done-for-you
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-neutral-400 md:text-right">
            One package. No retainer. No upsell trap. We optimize up to 10
            videos + your full channel.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-[#FF0033]/50 hover:bg-white/[0.07]"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-[#FF0033]/15 text-red-400 transition group-hover:bg-[#FF0033] group-hover:text-white">
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl bg-[#FF0033] p-6 md:flex-row md:p-8">
          <div>
            <p className="text-lg font-extrabold md:text-xl">
              Includes custom cover design + 15-day ranking support
            </p>
            <p className="text-sm text-white/80">
              Pay once. Keep the growth forever.
            </p>
          </div>
          <Link href={CART_LINK}>
            <Button className="rounded-full bg-white px-6 font-extrabold text-[#FF0033] hover:bg-neutral-100">
              Claim for ₹2,000 <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Pay & share channel link",
      text: "Checkout in 2 minutes. Share your channel URL + target audience on WhatsApp. No password needed.",
    },
    {
      n: "02",
      title: "We audit + optimize",
      text: "In 3–5 days we deliver keyword map, optimized titles/descriptions/tags, playlists & channel fixes.",
    },
    {
      n: "03",
      title: "Rank & grow in 15 days",
      text: "Watch impressions, CTR & views climb. We support tweaks for 15 days till you see movement.",
    },
  ];
  return (
    <section id="process" className="py-16 md:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionTag>Simple process</SectionTag>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            Live in 3 steps. No tech headache.
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">
            Built for busy creators — you keep creating, we handle ranking.
          </p>
          <div className="mt-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/60">
            <p className="text-sm font-extrabold">Sample audit checklist we fix:</p>
            <ul className="mt-3 space-y-2.5 text-sm">
              {[
                "Titles missing main keyword (fixed)",
                "Descriptions under 100 words (expanded to 300+)",
                "No chapters, no hashtags (added)",
                "Playlists unorganized (restructured)",
                "Channel tags + defaults missing (configured)",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  <span className="text-neutral-700 dark:text-neutral-300">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5 rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <span className="text-4xl font-black text-neutral-200 md:text-5xl dark:text-neutral-800">
                {s.n}
              </span>
              <div>
                <h3 className="text-lg font-extrabold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {s.text}
                </p>
              </div>
            </motion.div>
          ))}
          <Link href={PAY_LINK} className="block">
            <Button className="h-12 w-full rounded-2xl bg-neutral-900 text-base font-bold text-white dark:bg-white dark:text-neutral-900">
              Start Step 1 — Pay ₹2,000
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

function Results() {
  const stats = [
    { k: "8,718+", v: "channels optimized" },
    { k: "+50%", v: "average view increase" },
    { k: "3–5 days", v: "delivery time" },
    { k: "4.9★", v: "average rating" },
  ];
  return (
    <section id="results" className="border-y border-neutral-200/70 bg-neutral-50 py-16 md:py-24 dark:border-neutral-800 dark:bg-neutral-900/40">
      <Container>
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <SectionTag>Proof, not promises</SectionTag>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            Creators see movement in weeks
          </h2>
        </motion.div>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.v}
              className="rounded-3xl border border-neutral-200 bg-white p-5 text-center dark:border-neutral-800 dark:bg-neutral-950"
            >
              <p className="text-2xl font-black md:text-3xl">{s.k}</p>
              <p className="mt-1 text-xs font-semibold text-neutral-500">{s.v}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Pricing() {
  const features = [
    "Channel audit + all fixes",
    "10 videos fully SEO optimized",
    "Keyword map for your niche",
    "Titles, descriptions, tags, hashtags",
    "Thumbnail CTR direction + cover design",
    "Playlists + channel settings setup",
    "Results in 15 days",
    "WhatsApp support included",
    "One-time payment — no subscription",
    "Satisfaction guaranteed",
  ];
  return (
    <section id="pricing" className="py-16 md:py-24">
      <Container>
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <SectionTag>Simple pricing</SectionTag>
          <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
            One plan. Everything included.
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">
            Agencies charge ₹15,000+/month. You pay once and keep the rankings.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="relative mx-auto mt-10 max-w-xl overflow-hidden rounded-[2rem] border-2 border-[#FF0033] bg-white shadow-2xl shadow-red-600/15 dark:bg-neutral-900"
        >
          <div className="bg-[#FF0033] px-6 py-3 text-center text-sm font-extrabold tracking-wide text-white uppercase">
            Most popular — 8,718+ creators chose this
          </div>
          <div className="p-7 md:p-9">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-lg font-extrabold">YouTube SEO Pack</p>
                <p className="text-sm text-neutral-500">One-time • 10 videos + channel</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-neutral-400 line-through">₹5,999</p>
                <p className="text-4xl font-black text-[#FF0033]">₹2,000</p>
              </div>
            </div>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {features.map((f) => (
                <p key={f} className="flex items-start gap-2 text-[13px] font-semibold">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  {f}
                </p>
              ))}
            </div>
            <Link href={CART_LINK} className="mt-7 block">
              <Button className="h-13 w-full rounded-2xl bg-[#FF0033] text-base font-extrabold text-white hover:bg-[#cc0029]">
                Pay now ₹2,000 — Rank my channel
              </Button>
            </Link>
            <p className="mt-3 text-center text-xs font-medium text-neutral-500">
              Secure checkout • UPI / Cards accepted • No password required
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      name: "Rohit Sharma",
      niche: "Tech • 84K subs",
      text: "My oldest video went from #14 to #2 in 11 days. CTR jumped from 2.4% to 7.8%. Best ₹2,000 I've spent on YouTube.",
    },
    {
      name: "Priya Nair",
      niche: "Cooking • 212K subs",
      text: "They restructured my playlists + descriptions and suggested traffic literally doubled. I finally hit monetization.",
    },
    {
      name: "Aman Verma",
      niche: "Gaming • 46K subs",
      text: "No fake views, no bots — pure SEO. Impressions up 212% in 3 weeks. Support on WhatsApp is genuinely fast.",
    },
  ];
  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-neutral-900 text-sm font-extrabold text-white dark:bg-white dark:text-neutral-900">
                  {t.name[0]}
                </span>
                <span>
                  <span className="block text-sm font-extrabold">{t.name}</span>
                  <span className="block text-xs text-neutral-500">{t.niche}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Faq() {
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = [
    {
      q: "How does YouTube SEO actually help?",
      a: "YouTube is the world's 2nd largest search engine. We optimize titles, descriptions, tags, chapters and channel settings so your videos rank higher in search + get pushed in suggested videos. More impressions → higher CTR → more views & subs.",
    },
    {
      q: "Do you need my password?",
      a: "No. You either give editor access or we send you copy-paste optimized text + checklist. Most creators just implement our sheet in 30 minutes, or we do it via secure editor access.",
    },
    {
      q: "How soon will I see results?",
      a: "Most channels see impression/CTR movement in 7–15 days. Ranking jumps depend on competition, but our average is +50% views within 30 days when you keep uploading.",
    },
    {
      q: "Is this a monthly subscription?",
      a: "No — it's a one-time ₹2,000 pack covering 10 videos + full channel audit. You can reorder for new videos or upgrade to monthly if you want ongoing SEO.",
    },
    {
      q: "Is this safe? Any bots or fake views?",
      a: "100% white-hat and YouTube-compliant. No bots, no sub4sub, no fake views. Only metadata, packaging, keyword & channel optimization that YouTube rewards.",
    },
  ];
  return (
    <section id="faq" className="bg-neutral-50 py-16 md:py-24 dark:bg-neutral-900/40">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionTag>FAQ</SectionTag>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Still have questions?
          </h2>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            Chat with our YouTube team — replies in under 10 minutes (9am–9pm IST).
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="mt-5 rounded-full font-bold">
              Chat on WhatsApp <ArrowRight className="size-4" />
            </Button>
          </a>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <div
                key={f.q}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white transition dark:bg-neutral-950",
                  open
                    ? "border-[#FF0033]/40"
                    : "border-neutral-200 dark:border-neutral-800"
                )}
              >
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[15px] font-extrabold"
                >
                  {f.q}
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 transition-transform",
                      open && "rotate-180 text-[#FF0033]"
                    )}
                  />
                </button>
                {open && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-neutral-950 px-6 py-12 text-center text-white md:py-16">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(30rem_16rem_at_50%_0%,rgba(255,0,51,0.35),transparent)]"
          />
          <FaYoutube className="relative mx-auto size-12 text-[#FF0033]" />
          <h2 className="relative mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
            Ready to make YouTube find you?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-neutral-400">
            Join 8,718+ creators ranking higher with done-for-you SEO. Pay once,
            grow for months.
          </p>
          <div className="relative mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={PAY_LINK}>
              <Button className="h-12 rounded-full bg-[#FF0033] px-8 font-extrabold text-white hover:bg-[#cc0029]">
                Pay now ₹2,000
              </Button>
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="h-12 rounded-full border-white/20 bg-transparent px-8 font-bold text-white hover:bg-white/10 hover:text-white"
              >
                Talk to expert first
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-10 text-sm dark:border-neutral-800">
      <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="flex items-center gap-2 font-extrabold">
          <span className="grid size-7 place-items-center rounded-lg bg-[#FF0033] text-white">
            <FaYoutube className="size-4" />
          </span>
          TubeRankSEO by Minnions Marketing
        </p>
        <div className="flex gap-5 font-semibold text-neutral-500">
          <a href="#services" className="hover:text-[#FF0033]">Services</a>
          <a href="#pricing" className="hover:text-[#FF0033]">Pricing</a>
          <a href="#faq" className="hover:text-[#FF0033]">FAQ</a>
          <Link href={PAY_LINK} className="hover:text-[#FF0033]">Pay now</Link>
        </div>
        <p className="text-xs text-neutral-400">
          © 2026 Minnions Marketing. White-hat SEO only.
        </p>
      </Container>
    </footer>
  );
}