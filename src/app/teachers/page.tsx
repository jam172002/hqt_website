import type { Metadata } from "next";
import { api, getContentBlock } from "@/lib/api";
import TeacherCard from "@/components/TeacherCard";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Teachers",
  description: "Meet our certified, experienced Quran teachers available for one-to-one online classes.",
};

const DEFAULT_HERO_TITLE = "Learn From Qualified, Experienced Teachers";
const DEFAULT_HERO_DESCRIPTION =
  "Every teacher is certified in Quran recitation and Tajweed, and dedicated to giving each student individual attention.";

export default async function TeachersPage() {
  const [result, heroContent] = await Promise.all([
    api.teachers.list().catch(() => null),
    getContentBlock("teachers.hero"),
  ]);
  const teachers = result?.data ?? [];
  const heroTitle = heroContent?.title || DEFAULT_HERO_TITLE;
  const heroDescription = heroContent?.content || DEFAULT_HERO_DESCRIPTION;

  return (
    <div>
      <PageHero eyebrow="Our Teachers" title={heroTitle} description={heroDescription} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {teachers.length === 0 ? (
          <p className="text-center text-charcoal-light">Teacher profiles are currently unavailable. Please check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
