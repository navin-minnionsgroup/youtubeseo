export const WHATSAPP_LINK = "https://wa.me/917091172666/";

export const ADDONS = [
  {
    id: "thumbnail-pack",
    name: "Extra Thumbnail Design Pack",
    detail: "5 custom high-CTR thumbnails designed by experts",
    price: 999,
    mrp: 1999,
    qty: 1,
    tag: "Popular Addon",
    features: ["5 High-CTR Thumbnails", "A/B Testing Variants", "Source Files Included"],
  },
  {
    id: "competitor-audit",
    name: "Deep Competitor Audit",
    detail: "Comprehensive keyword & traffic analysis of top 3 rivals",
    price: 799,
    mrp: 1499,
    qty: 1,
    tag: "Pro Addon",
    features: ["Top 3 Competitor Breakdown", "Keyword Gap Report", "Tag Strategy Guide"],
  },
];

export function loadCart() {
  try {
    const saved = localStorage.getItem('youtubeseo_cart');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  // Default initial cart with the YouTube SEO Pack
  return [
    {
      id: "youtube-seo-pack",
      name: "YouTube SEO Pack",
      detail: "10 videos + full channel audit • One-time",
      price: 2000,
      mrp: 5999,
      qty: 1,
      tag: "Most popular",
      features: [
        "Channel audit + all fixes",
        "10 videos fully SEO optimized",
        "Keyword map for your niche",
        "Titles, descriptions, tags, hashtags"
      ],
    }
  ];
}

export function saveCart(items) {
  try {
    localStorage.setItem('youtubeseo_cart', JSON.stringify(items));
  } catch (e) {
    console.error(e);
  }
}

export function cartTotals(items, appliedCoupon) {
  let subtotal = 0;
  let mrpTotal = 0;

  items.forEach(item => {
    subtotal += item.price * item.qty;
    mrpTotal += item.mrp * item.qty;
  });

  let couponOff = 0;
  let code = '';

  if (appliedCoupon === 'RANK10') {
    couponOff = Math.round(subtotal * 0.10);
    code = '(RANK10)';
  } else if (appliedCoupon === 'TUBE500') {
    couponOff = 500;
    code = '(TUBE500)';
  }

  const total = Math.max(0, subtotal - couponOff);
  const savings = (mrpTotal - total);

  return {
    subtotal,
    mrpTotal,
    couponOff,
    code,
    total,
    savings
  };
}
export function clearCart() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function inr(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}