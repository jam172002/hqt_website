import { cache } from "react";
import defaults from "./content-defaults.json";

/**
 * All editable website wording comes from the admin panel's "Site Content"
 * screens via GET /cms/site. If the API cannot be reached, the bundled
 * defaults (an export of the original wording) are used so pages never break.
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api/v1";

type ListItem = Record<string, string>;
type SectionValues = Record<string, string | ListItem[]>;
type PageContent = Record<string, SectionValues>;
type AllContent = Record<string, PageContent>;

const DEFAULTS = defaults as unknown as AllContent;

/** Read-only accessor for one page's sections: `c.t("hero.title")`, `c.list("trust.items")`. */
export class Content {
  constructor(private readonly page: PageContent) {}

  /** Text of `section.field`, or an empty string. */
  t(path: string): string {
    const [section, field] = path.split(".");
    const value = this.page[section]?.[field];
    return typeof value === "string" ? value : "";
  }

  /** Items of a list field (`section.field`), or an empty list. */
  list(path: string): ListItem[] {
    const [section, field] = path.split(".");
    const value = this.page[section]?.[field];
    return Array.isArray(value) ? value : [];
  }

  /** Replaces {placeholders} in a text field, e.g. tf("card.years", { years: 5 }). */
  tf(path: string, vars: Record<string, string | number>): string {
    return this.t(path).replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
  }
}

const load = cache(async (pagesKey: string): Promise<AllContent> => {
  const pages = pagesKey.split(",");
  try {
    const res = await fetch(`${API_BASE_URL}/cms/site?pages=${encodeURIComponent(pagesKey)}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    return (await res.json()) as AllContent;
  } catch {
    return Object.fromEntries(pages.map((p) => [p, DEFAULTS[p] ?? {}]));
  }
});

/** Content for the sitewide settings (menu, footer, contact details) plus, optionally, one page. */
export async function getContent(page?: string): Promise<{ global: Content; page: Content }> {
  const key = page && page !== "global" ? `global,${page}` : "global";
  const all = await load(key);
  const globalContent = new Content(all.global ?? DEFAULTS.global);
  return { global: globalContent, page: new Content(page ? (all[page] ?? DEFAULTS[page] ?? {}) : {}) };
}

/** Search-result title/description for a page (used by generateMetadata). */
export async function getSeo(page: string): Promise<{ title: string; description: string }> {
  const { page: c } = await getContent(page);
  return { title: c.t("seo.metaTitle"), description: c.t("seo.metaDescription") };
}

/** wa.me link for the configured WhatsApp number, with an optional pre-filled message. */
export function whatsappLink(globalContent: Content, message?: string): string {
  const number = globalContent.t("contact.whatsappNumber").replace(/\D/g, "");
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
