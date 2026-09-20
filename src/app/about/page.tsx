import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import TeacherCard from "@/components/TeacherCard";
import { api } from "@/lib/api";
import { getContent, getSeo } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("about");
  return { title: seo.title, description: seo.description };
}

export default async function AboutPage() {
  const [{ page: c }, teachersResult] = await Promise.all([
    getContent("about"),
    api.teachers.list().catch(() => null),
  ]);
  const teachers = teachersResult?.data.slice(0, 3) ?? [];
  const blocks = ["mission", "vision", "approach", "whyOnline"].map((key) => ({
    key,
    title: c.t(`${key}.title`),
    body: c.t(`${key}.text`),
  }));

  return (
    <div>
      <PageHero eyebrow={c.t("hero.eyebrow")} title={c.t("hero.title")} description={c.t("hero.description")} />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {blocks.map((block) => (
            <div key={block.key}>
              <h2 className="font-heading text-lg font-semibold text-primary-600">{block.title}</h2>
              <p className="mt-2 leading-7 text-charcoal-light">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      {teachers.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-charcoal">{c.t("teachers.heading")}</h2>
              <p className="mt-3 text-charcoal-light">{c.t("teachers.subheading")}</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/teachers" className="font-semibold text-primary-500 hover:text-primary-600">
                {c.t("teachers.viewAll")} &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary-50 p-8 text-center">
          <h2 className="font-heading text-xl font-semibold text-primary-700">{c.t("countries.heading")}</h2>
          <p className="mt-2 text-charcoal-light">{c.t("countries.text")}</p>
          <Link
            href="/trial"
            className="mt-6 inline-block rounded-full bg-primary-500 px-8 py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-primary-600"
          >
            {c.t("countries.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
