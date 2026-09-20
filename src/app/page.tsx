import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import { getContent, getSeo, whatsappLink } from "@/lib/content";
import CourseCard from "@/components/CourseCard";
import TeacherCard from "@/components/TeacherCard";
import TestimonialCard from "@/components/TestimonialCard";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("home");
  return { title: { absolute: seo.title }, description: seo.description };
}

export default async function Home() {
  const { global: g, page: c } = await getContent("home");
  const [coursesResult, teachersResult, testimonialsResult, faqsResult] = await Promise.all([
    api.courses.list().catch(() => null),
    api.teachers.list().catch(() => null),
    api.testimonials.list().catch(() => null),
    api.faqs.list().catch(() => []),
  ]);

  const courses = coursesResult?.data.slice(0, 6) ?? [];
  const teachers = teachersResult?.data.slice(0, 3) ?? [];
  const testimonials = testimonialsResult?.data.slice(0, 3) ?? [];
  const faqs = faqsResult.slice().sort((a, b) => a.sortOrder - b.sortOrder).slice(0, 5);

  const whatsapp = whatsappLink(g);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent-700">
              {c.t("hero.eyebrow")}
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-primary-700 sm:text-5xl">
              {c.t("hero.title")}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-charcoal-light">
              {c.t("hero.description")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/trial"
                className="w-full rounded-full bg-primary-500 px-8 py-3.5 text-center font-semibold text-white shadow-md transition-colors hover:bg-primary-600 sm:w-auto"
              >
                {c.t("hero.primaryButton")}
              </Link>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full border border-primary-200 bg-white px-8 py-3.5 text-center font-semibold text-primary-600 transition-colors hover:bg-primary-50 sm:w-auto"
              >
                {c.t("hero.whatsappButton")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights */}
      <section className="border-y border-primary-100/60 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {c.list("trust.items").map((item) => (
            <div key={item.title} className="text-center">
              <h3 className="font-heading text-sm font-semibold text-primary-600 sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-charcoal-light sm:text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      {courses.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal">{c.t("courses.heading")}</h2>
            <p className="mt-3 text-charcoal-light">
              {c.t("courses.subheading")}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/courses" className="font-semibold text-primary-500 hover:text-primary-600">
              {c.t("courses.viewAll")} &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="bg-primary-500">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-white">{c.t("whyUs.heading")}</h2>
          <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            {c.list("whyUs.items").map((reason) => (
              <li key={reason.text} className="flex items-start gap-3 text-primary-50">
                <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-400">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{reason.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-charcoal">{c.t("howItWorks.heading")}</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {c.list("howItWorks.steps").map((item, index) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-500 font-heading text-lg font-bold text-primary-700">
                {index + 1}
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-charcoal">{item.title}</h3>
              <p className="mt-1.5 text-sm text-charcoal-light">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teachers */}
      {teachers.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
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

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-charcoal">{c.t("testimonials.heading")}</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl font-bold text-charcoal">
              {c.t("faq.heading")}
            </h2>
            <div className="mt-10 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.id} className="group rounded-xl border border-primary-100 bg-background p-5">
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
            <div className="mt-8 text-center">
              <Link href="/faq" className="font-semibold text-primary-500 hover:text-primary-600">
                {c.t("faq.viewAll")} &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-primary-700">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white">
            {c.t("finalCta.heading")}
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/trial"
              className="w-full rounded-full bg-accent-500 px-8 py-3.5 text-center font-semibold text-primary-700 shadow-md transition-colors hover:bg-accent-400 sm:w-auto"
            >
              {c.t("finalCta.primaryButton")}
            </Link>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-white/30 px-8 py-3.5 text-center font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              {c.t("finalCta.whatsappButton")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
