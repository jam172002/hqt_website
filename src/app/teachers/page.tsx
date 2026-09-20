import type { Metadata } from "next";
import { api } from "@/lib/api";
import { getContent, getSeo } from "@/lib/content";
import TeacherCard from "@/components/TeacherCard";
import PageHero from "@/components/PageHero";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("teachers");
  return { title: seo.title, description: seo.description };
}

export default async function TeachersPage() {
  const [result, { page: c }] = await Promise.all([api.teachers.list().catch(() => null), getContent("teachers")]);
  const teachers = result?.data ?? [];

  return (
    <div>
      <PageHero eyebrow={c.t("hero.eyebrow")} title={c.t("hero.title")} description={c.t("hero.description")} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {teachers.length === 0 ? (
          <p className="text-center text-charcoal-light">{c.t("list.empty")}</p>
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
