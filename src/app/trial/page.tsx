import type { Metadata } from "next";
import { api, getContentBlock } from "@/lib/api";
import PageHero from "@/components/PageHero";
import TrialForm from "@/components/TrialForm";

export const metadata: Metadata = {
  title: "Book Free Trial",
  description: "Book a free, no-obligation trial Quran class with one of our certified teachers.",
};

const DEFAULT_HERO_TITLE = "Book Your Free Trial Class";
const DEFAULT_HERO_DESCRIPTION =
  "Tell us about the student and preferred schedule, and our team will confirm a free trial class with a suitable teacher.";

export default async function TrialPage() {
  const [result, heroContent] = await Promise.all([
    api.courses.list().catch(() => null),
    getContentBlock("trial.hero"),
  ]);
  const courses = result?.data ?? [];
  const heroTitle = heroContent?.title || DEFAULT_HERO_TITLE;
  const heroDescription = heroContent?.content || DEFAULT_HERO_DESCRIPTION;

  return (
    <div>
      <PageHero eyebrow="Free Trial" title={heroTitle} description={heroDescription} />

      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <TrialForm courses={courses} />
      </section>
    </div>
  );
}
