import Link from "next/link";
import { firstImageUrl, type Teacher } from "@/lib/api";
import { getContent } from "@/lib/content";

export default async function TeacherCard({ teacher }: { teacher: Teacher }) {
  const { page: c } = await getContent("teachers");
  const initials = `${teacher.firstName.charAt(0)}${teacher.lastName.charAt(0)}`;
  // Public media reads are unauthenticated GETs served straight from the backend, so a plain
  // <img> (not next/image, which needs a fixed, pre-configured remote domain) is the simplest
  // correct choice for a URL whose host varies by environment (NEXT_PUBLIC_API_BASE_URL).
  const photoUrl = await firstImageUrl("TEACHER_PROFILE", teacher.id);

  return (
    <Link
      href={`/teachers/${teacher.id}`}
      className="flex flex-col items-center rounded-2xl border border-primary-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
    >
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt={`${teacher.firstName} ${teacher.lastName}`}
          className="h-20 w-20 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-500 font-heading text-2xl font-semibold text-white">
          {initials}
        </div>
      )}
      <h3 className="mt-4 font-heading text-base font-semibold text-charcoal">
        {teacher.firstName} {teacher.lastName}
      </h3>
      <p className="mt-1 text-sm font-medium text-accent-700">{teacher.qualification}</p>
      {teacher.experienceYears != null && (
        <p className="mt-1 text-xs text-charcoal-light">{c.tf("list.experienceCard", { years: teacher.experienceYears })}</p>
      )}
      <p className="mt-3 text-sm leading-6 text-charcoal-light">
        {teacher.shortBio ?? teacher.bio}
      </p>
    </Link>
  );
}
