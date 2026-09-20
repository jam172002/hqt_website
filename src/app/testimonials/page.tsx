import type { Metadata } from "next";
import { api, type Testimonial } from "@/lib/api";
import { getContent, getSeo, type Content } from "@/lib/content";
import TestimonialCard from "@/components/TestimonialCard";
import PageHero from "@/components/PageHero";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("testimonials");
  return { title: seo.title, description: seo.description };
}

const CATEGORY_ORDER = ["PARENT", "ADULT_STUDENT", "HIFZ_STUDENT"] as const;
function groupByCategory(testimonials: Testimonial[], c: Content) {
  const CATEGORY_LABELS: Record<string, string> = {
    PARENT: c.t("groups.parents"),
    ADULT_STUDENT: c.t("groups.adults"),
    HIFZ_STUDENT: c.t("groups.hifz"),
  };
  const groups = new Map<string, Testimonial[]>();
  const uncategorized: Testimonial[] = [];

  for (const t of testimonials) {
    if (!t.category) {
      uncategorized.push(t);
      continue;
    }
    const existing = groups.get(t.category) ?? [];
    existing.push(t);
    groups.set(t.category, existing);
  }

  const ordered: Array<{ key: string; label: string; items: Testimonial[] }> = [];
  for (const cat of CATEGORY_ORDER) {
    const items = groups.get(cat);
    if (items?.length) ordered.push({ key: cat, label: CATEGORY_LABELS[cat], items });
  }
  for (const [cat, items] of groups) {
    if (!(CATEGORY_ORDER as readonly string[]).includes(cat)) {
      ordered.push({ key: cat, label: cat, items });
    }
  }
  if (uncategorized.length) {
    ordered.push({ key: "OTHER", label: c.t("groups.other"), items: uncategorized });
  }
  return ordered;
}

export default async function TestimonialsPage() {
  const [result, { page: c }] = await Promise.all([api.testimonials.list().catch(() => null), getContent("testimonials")]);
  const testimonials = result?.data ?? [];
  const groups = groupByCategory(testimonials, c);

  return (
    <div>
      <PageHero eyebrow={c.t("hero.eyebrow")} title={c.t("hero.title")} description={c.t("hero.description")} />

      <section className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        {groups.length === 0 ? (
          <p className="text-center text-charcoal-light">{c.t("groups.empty")}</p>
        ) : (
          groups.map((group) => (
            <div key={group.key}>
              {groups.length > 1 && (
                <h2 className="mb-6 font-heading text-xl font-semibold text-charcoal">{group.label}</h2>
              )}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
