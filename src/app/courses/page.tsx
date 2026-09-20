import type { Metadata } from "next";
import { api } from "@/lib/api";
import { getContent, getSeo } from "@/lib/content";
import CourseCard from "@/components/CourseCard";
import PageHero from "@/components/PageHero";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("courses");
  return { title: seo.title, description: seo.description };
}

export default async function CoursesPage() {
  const [result, { page: c }] = await Promise.all([api.courses.list().catch(() => null), getContent("courses")]);
  const courses = result?.data ?? [];

  return (
    <div>
      <PageHero eyebrow={c.t("hero.eyebrow")} title={c.t("hero.title")} description={c.t("hero.description")} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {courses.length === 0 ? (
          <p className="text-center text-charcoal-light">{c.t("list.empty")}</p>
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
