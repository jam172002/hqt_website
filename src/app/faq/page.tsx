import type { Metadata } from "next";
import { api, getContentBlock } from "@/lib/api";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about our online Quran classes.",
};

const DEFAULT_HERO_TITLE = "Frequently Asked Questions";
const DEFAULT_HERO_DESCRIPTION = "Can't find your answer here? Reach out on WhatsApp or through our Contact page.";

export default async function FaqPage() {
  const [faqs, heroContent] = await Promise.all([
    api.faqs.list().catch(() => []),
    getContentBlock("faq.hero"),
  ]);
  const sorted = faqs.slice().sort((a, b) => a.sortOrder - b.sortOrder);
  const heroTitle = heroContent?.title || DEFAULT_HERO_TITLE;
  const heroDescription = heroContent?.content || DEFAULT_HERO_DESCRIPTION;

  return (
    <div>
      <PageHero eyebrow="FAQ" title={heroTitle} description={heroDescription} />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {sorted.length === 0 ? (
          <p className="text-center text-charcoal-light">FAQs are being updated - check back soon.</p>
        ) : (
          <div className="space-y-3">
            {sorted.map((faq) => (
              <details key={faq.id} className="group rounded-xl border border-primary-100 bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-sm font-semibold text-charcoal">
                  {faq.question}
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    className="h-5 w-5 flex-shrink-0 text-primary-500 transition-transform group-open:rotate-45"
                  >
                    <path strokeLinecap="round" d="M10 4v12M4 10h12" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-6 text-charcoal-light">{faq.answer}</p>
              </details>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
