import type { Metadata } from "next";
import { api, getContentBlock } from "@/lib/api";
import CourseCard from "@/components/CourseCard";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore our Quran Reading, Noorani Qaida, Tajweed, Hifz-ul-Quran, Quran Translation, and Islamic Studies courses.",
};

const DEFAULT_HERO_TITLE = "Quran Courses for Every Age and Level";
const DEFAULT_HERO_DESCRIPTION =
  "From first letters to full memorization - structured, one-to-one programs guided by qualified teachers.";

export default async function CoursesPage() {
  const [result, heroContent] = await Promise.all([
    api.courses.list().catch(() => null),
    getContentBlock("courses.hero"),
  ]);
  const courses = result?.data ?? [];
  const heroTitle = heroContent?.title || DEFAULT_HERO_TITLE;
  const heroDescription = heroContent?.content || DEFAULT_HERO_DESCRIPTION;

  return (
    <div>
      <PageHero eyebrow="Courses" title={heroTitle} description={heroDescription} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {courses.length === 0 ? (
          <p className="text-center text-charcoal-light">Courses are currently unavailable. Please check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
