import type { Metadata } from "next";
import { api, getContentBlock, type Testimonial } from "@/lib/api";
import TestimonialCard from "@/components/TestimonialCard";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what students and parents say about learning with Hafiz Quran Tutor.",
};

const DEFAULT_HERO_TITLE = "What Families Say About Us";
const DEFAULT_HERO_DESCRIPTION = "Real feedback from students and parents learning with our teachers, worldwide.";

const CATEGORY_ORDER = ["PARENT", "ADULT_STUDENT", "HIFZ_STUDENT"] as const;
const CATEGORY_LABELS: Record<string, string> = {
  PARENT: "From Parents",
  ADULT_STUDENT: "From Adult Students",
  HIFZ_STUDENT: "From Hifz Students",
};

function groupByCategory(testimonials: Testimonial[]) {
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
    ordered.push({ key: "OTHER", label: "More Reviews", items: uncategorized });
  }
  return ordered;
}

export default async function TestimonialsPage() {
  const [result, heroContent] = await Promise.all([
    api.testimonials.list().catch(() => null),
    getContentBlock("testimonials.hero"),
  ]);
  const testimonials = result?.data ?? [];
  const groups = groupByCategory(testimonials);
  const heroTitle = heroContent?.title || DEFAULT_HERO_TITLE;
  const heroDescription = heroContent?.content || DEFAULT_HERO_DESCRIPTION;

  return (
    <div>
      <PageHero eyebrow="Testimonials" title={heroTitle} description={heroDescription} />

      <section className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        {groups.length === 0 ? (
          <p className="text-center text-charcoal-light">No testimonials to show yet - check back soon.</p>
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
