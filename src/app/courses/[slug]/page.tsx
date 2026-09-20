import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError, api, firstImageUrl } from "@/lib/api";
import { getContent } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const course = await api.courses.bySlug(slug);
    return { title: course.name, description: course.shortDescription };
  } catch {
    return { title: "Course" };
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let course;
  try {
    course = await api.courses.bySlug(slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }

  const imageUrl = await firstImageUrl("COURSE", course.id);
  const { page: c } = await getContent("courses");

  return (
    <div>
      <section className="border-b border-primary-100/60 bg-gradient-to-b from-primary-50 to-background">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={`${course.name} course`}
              className="mx-auto mb-6 h-48 w-full max-w-2xl rounded-2xl object-cover shadow-md"
            />
          )}
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent-700">
            {c.t("detail.eyebrow")}
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-primary-700 sm:text-4xl">
            {course.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-charcoal-light">
            {course.shortDescription}
          </p>
          <Link
            href="/trial"
            className="mt-7 inline-block rounded-full bg-primary-500 px-8 py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-primary-600"
          >
            {c.t("detail.trialButton")}
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-xl font-semibold text-charcoal">{c.t("detail.aboutHeading")}</h2>
          <p className="mt-3 leading-7 text-charcoal-light">{course.description}</p>

          {course.sections.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-xl font-semibold text-charcoal">{c.t("detail.curriculumHeading")}</h2>
              <ol className="mt-4 space-y-4">
                {course.sections
                  .slice()
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((section, i) => (
                    <li key={section.id} className="rounded-xl border border-primary-100 bg-white p-4">
                      <p className="font-heading text-sm font-semibold text-primary-600">
                        {i + 1}. {section.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-charcoal-light">{section.description}</p>
                    </li>
                  ))}
              </ol>
            </div>
          )}

          {course.faqs.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-xl font-semibold text-charcoal">{c.t("detail.faqHeading")}</h2>
              <div className="mt-4 space-y-3">
                {course.faqs
                  .slice()
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((faq) => (
                    <details key={faq.id} className="group rounded-xl border border-primary-100 bg-white p-4">
                      <summary className="cursor-pointer font-heading text-sm font-semibold text-charcoal">
                        {faq.question}
                      </summary>
                      <p className="mt-2 text-sm leading-6 text-charcoal-light">{faq.answer}</p>
                    </details>
                  ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-primary-100 bg-white p-6">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent-700">
              {c.t("detail.detailsHeading")}
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              {course.suitableFor && (
                <div>
                  <dt className="font-medium text-charcoal">{c.t("detail.suitableLabel")}</dt>
                  <dd className="text-charcoal-light">{course.suitableFor}</dd>
                </div>
              )}
              {course.ageGroup && (
                <div>
                  <dt className="font-medium text-charcoal">{c.t("detail.ageLabel")}</dt>
                  <dd className="text-charcoal-light">{course.ageGroup}</dd>
                </div>
              )}
              {course.teachingMethod && (
                <div>
                  <dt className="font-medium text-charcoal">{c.t("detail.methodLabel")}</dt>
                  <dd className="text-charcoal-light">{course.teachingMethod}</dd>
                </div>
              )}
              {course.classFormat && (
                <div>
                  <dt className="font-medium text-charcoal">{c.t("detail.formatLabel")}</dt>
                  <dd className="text-charcoal-light">{course.classFormat}</dd>
                </div>
              )}
            </dl>
          </div>

          {course.teachers.length > 0 && (
            <div className="rounded-2xl border border-primary-100 bg-white p-6">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent-700">
                {c.t("detail.teachersHeading")}
              </h3>
              <ul className="mt-4 space-y-3">
                {course.teachers.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/teachers/${t.id}`}
                      className="flex items-center gap-3 rounded-lg p-1.5 -m-1.5 transition-colors hover:bg-primary-50"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-xs font-semibold text-white">
                        {t.firstName.charAt(0)}
                        {t.lastName.charAt(0)}
                      </span>
                      <span className="text-sm font-medium text-charcoal">
                        {t.firstName} {t.lastName}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
