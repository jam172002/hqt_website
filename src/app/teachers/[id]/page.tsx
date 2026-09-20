import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError, api, firstImageUrl } from "@/lib/api";
import { getContent } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const teacher = await api.teachers.byId(id);
    return {
      title: `${teacher.firstName} ${teacher.lastName}`,
      description: teacher.shortBio ?? teacher.bio,
    };
  } catch {
    return { title: "Teacher" };
  }
}

export default async function TeacherDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let teacher;
  try {
    teacher = await api.teachers.byId(id);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }

  const photoUrl = await firstImageUrl("TEACHER_PROFILE", teacher.id);
  const { page: c } = await getContent("teachers");
  const initials = `${teacher.firstName.charAt(0)}${teacher.lastName.charAt(0)}`;

  return (
    <div>
      <section className="border-b border-primary-100/60 bg-gradient-to-b from-primary-50 to-background">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt={`${teacher.firstName} ${teacher.lastName}`}
              className="h-28 w-28 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary-500 font-heading text-3xl font-semibold text-white shadow-md">
              {initials}
            </div>
          )}
          <h1 className="mt-5 font-heading text-3xl font-bold text-primary-700 sm:text-4xl">
            {teacher.firstName} {teacher.lastName}
          </h1>
          <p className="mt-2 font-medium text-accent-700">{teacher.qualification}</p>
          {teacher.experienceYears != null && (
            <p className="mt-1 text-sm text-charcoal-light">{c.tf("detail.experienceLine", { years: teacher.experienceYears })}</p>
          )}
          <Link
            href="/trial"
            className="mt-7 inline-block rounded-full bg-primary-500 px-8 py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-primary-600"
          >
            {c.t("detail.trialButton")}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
        <div>
          <h2 className="font-heading text-xl font-semibold text-charcoal">{c.t("detail.aboutHeading")}</h2>
          <p className="mt-3 leading-7 text-charcoal-light">{teacher.bio}</p>
        </div>

        {teacher.teachingPhilosophy && (
          <div>
            <h2 className="font-heading text-xl font-semibold text-charcoal">{c.t("detail.philosophyHeading")}</h2>
            <p className="mt-3 leading-7 text-charcoal-light">{teacher.teachingPhilosophy}</p>
          </div>
        )}

        <div className="rounded-2xl border border-primary-100 bg-white p-6">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent-700">
            {c.t("detail.qualificationsHeading")}
          </h2>
          <p className="mt-3 text-sm leading-6 text-charcoal-light">{teacher.qualification}</p>
        </div>
      </section>
    </div>
  );
}
