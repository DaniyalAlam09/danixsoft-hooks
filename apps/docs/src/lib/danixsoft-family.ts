// "More from DanixSoft" — the DanixSoft product family, shared by every
// DanixSoft product site. This exact file is copied into each app; keep the
// copies identical.
//
// Source of truth: https://www.danixsoft.com/products.json, generated in the
// DanixSoft repo (scripts/generate-products.js). To list a new product, add it
// there — every site picks it up on its next build, and refreshes daily after
// that. FALLBACK (a snapshot of that file) is used if the fetch fails, so the
// footer never breaks and builds never depend on danixsoft.com being up.

export interface FamilyProduct {
  id: string;
  name: string;
  tagline: string;
  category: string;
  url: string;
  live: boolean;
}

export interface DanixSoftFamily {
  company: {
    name: string;
    url: string;
    tagline: string;
    about: string;
    founder: { name: string; url: string };
  };
  products: FamilyProduct[];
}

const SOURCE = "https://www.danixsoft.com/products.json";

// Snapshot of products.json (2026-09-30).
const FALLBACK: DanixSoftFamily = {
  "company": {
    "name": "DanixSoft",
    "url": "https://www.danixsoft.com",
    "tagline": "AI-powered product engineering",
    "about": "DanixSoft is a Lahore-based software engineering studio building SaaS products, custom software, AI features, and web and mobile apps for startups and growing businesses worldwide.",
    "founder": {
      "name": "Daniyal Alam",
      "url": "https://ceo.danixsoft.com"
    }
  },
  "products": [
    {
      "id": "framewise",
      "name": "Framewise",
      "tagline": "AI website builder: describe a business, get a finished site",
      "category": "AI product",
      "url": "https://framewise.danixsoft.com",
      "live": true
    },
    {
      "id": "repo-dive",
      "name": "Repo Dive",
      "tagline": "A daily training system for reading production code",
      "category": "SaaS product",
      "url": "https://repo-dive.danixsoft.com",
      "live": true
    },
    {
      "id": "danixsoft-hooks",
      "name": "@danixsoft/hooks",
      "tagline": "An open-source, tree-shakeable React hooks library",
      "category": "Open source",
      "url": "https://react-hooks.danixsoft.com",
      "live": true
    },
    {
      "id": "bulkreach",
      "name": "BulkReach",
      "tagline": "Multi-tenant bulk and scheduled messaging for Slack and WhatsApp",
      "category": "SaaS product",
      "url": "https://www.danixsoft.com/case-studies/bulkreach-slack-whatsapp-bulk-messaging",
      "live": false
    },
    {
      "id": "outreachpro",
      "name": "OutreachPro",
      "tagline": "Cold email outreach through your own Gmail or Outlook mailbox",
      "category": "SaaS product",
      "url": "https://outreach.danixsoft.com",
      "live": true
    },
    {
      "id": "chatcart",
      "name": "Chatcart",
      "tagline": "Order management for shops that sell on WhatsApp and Instagram",
      "category": "SaaS product",
      "url": "https://chatcart.danixsoft.com",
      "live": true
    },
    {
      "id": "rollcall",
      "name": "RollCall",
      "tagline": "Fee vouchers, payments and WhatsApp reminders for private schools",
      "category": "SaaS product",
      "url": "https://rollcall.danixsoft.com",
      "live": true
    },
    {
      "id": "duesheet",
      "name": "Duesheet",
      "tagline": "Proposals, invoices and a client portal for freelancers who bill internationally",
      "category": "SaaS product",
      "url": "https://duesheet.danixsoft.com",
      "live": true
    },
    {
      "id": "showup",
      "name": "Showup",
      "tagline": "Online booking and WhatsApp reminders for private clinics",
      "category": "SaaS product",
      "url": "https://showup.danixsoft.com",
      "live": true
    },
    {
      "id": "praiseboard",
      "name": "Praiseboard",
      "tagline": "Collect video and text testimonials with one link and embed them anywhere",
      "category": "SaaS product",
      "url": "https://praiseboard.danixsoft.com",
      "live": true
    }
  ]
};

const isHttps = (v: unknown): v is string => typeof v === "string" && /^https:\/\//.test(v);
const isText = (v: unknown): v is string => typeof v === "string" && v.length > 0 && v.length < 300;

function parse(json: unknown): DanixSoftFamily | null {
  if (!json || typeof json !== "object") return null;
  const { company, products } = json as Partial<DanixSoftFamily>;
  if (!company || !isText(company.name) || !isHttps(company.url) || !isText(company.about)) return null;
  if (!company.founder || !isText(company.founder.name) || !isHttps(company.founder.url)) return null;
  if (!Array.isArray(products)) return null;
  const valid = products.filter(
    (p): p is FamilyProduct =>
      !!p && isText(p.id) && isText(p.name) && isText(p.tagline) && isText(p.category) && isHttps(p.url)
  );
  return valid.length ? { company: { ...FALLBACK.company, ...company }, products: valid } : null;
}

/**
 * The DanixSoft family, minus the product with `excludeId` (the site calling
 * it). Never throws: any network/shape problem falls back to the snapshot.
 */
export async function getDanixSoftFamily(excludeId?: string): Promise<DanixSoftFamily> {
  let family = FALLBACK;
  try {
    const res = await fetch(SOURCE, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) family = parse(await res.json()) ?? FALLBACK;
  } catch {
    // offline build, DNS failure, timeout — keep the snapshot
  }
  return { ...family, products: family.products.filter((p) => p.id !== excludeId) };
}
