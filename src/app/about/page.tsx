import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getContentBlock } from "@/lib/api";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Hafiz Quran Tutor's mission, teaching approach, and commitment to online Quran education.",
};

const DEFAULT_INTRO_TITLE = "Trusted Online Quran Education, Worldwide";
const DEFAULT_INTRO_DESCRIPTION =
  "Hafiz Quran Tutor connects students and families with certified teachers for personalized, one-to-one Quran classes.";

/** `key` is the CMS content block backing that section, or null for ones not yet CMS-managed. */
const DEFAULT_SECTIONS: { key: string | null; title: string; body: string }[] = [
  {
    key: "about.mission",
    title: "Our Mission",
    body: "To make authentic, high-quality Quran education accessible to every student, anywhere in the world, through personal, one-to-one online classes with qualified teachers.",
  },
  {
    key: "about.vision",
    title: "Our Vision",
    body: "A global community of confident Quran readers, huffaz, and lifelong learners, connected to their faith no matter where they live.",
  },
  {
    key: null,
    title: "Our Teaching Approach",
    body: "Every class is one-to-one. Teachers adapt pace and method to each student's age, ability, and goals - whether that's learning to read for the first time or completing Hifz.",
  },
  {
    key: null,
    title: "Why Online Quran Learning",
    body: "Online classes remove the barrier of distance and give families the flexibility to schedule around school, work, and time zones - without compromising on quality or individual attention.",
  },
];

export default async function AboutPage() {
  const [introContent, missionContent, visionContent] = await Promise.all([
    getContentBlock("about.intro"),
    getContentBlock("about.mission"),
    getContentBlock("about.vision"),
  ]);
  const introTitle = introContent?.title || DEFAULT_INTRO_TITLE;
  const introDescription = introContent?.content || DEFAULT_INTRO_DESCRIPTION;

  const contentByKey: Record<string, typeof missionContent> = {
    "about.mission": missionContent,
    "about.vision": visionContent,
  };
  const sections = DEFAULT_SECTIONS.map(({ key, title, body }) => {
    const override = key ? contentByKey[key] : null;
    return { title: override?.title || title, body: override?.content || body };
  });

  return (
    <div>
      <PageHero eyebrow="About Us" title={introTitle} description={introDescription} />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-heading text-lg font-semibold text-primary-600">{section.title}</h2>
              <p className="mt-2 leading-7 text-charcoal-light">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-primary-50 p-8 text-center">
          <h2 className="font-heading text-xl font-semibold text-primary-700">Countries We Serve</h2>
          <p className="mt-2 text-charcoal-light">
            We teach students across dozens of countries, with flexible timing designed around every time zone.
          </p>
          <Link
            href="/trial"
            className="mt-6 inline-block rounded-full bg-primary-500 px-8 py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-primary-600"
          >
            Book Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
