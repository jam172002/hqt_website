import Link from "next/link";
import { firstImageUrl, type Course } from "@/lib/api";

export default async function CourseCard({ course }: { course: Course }) {
  const imageUrl = await firstImageUrl("COURSE", course.id);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- dynamic, backend-served image; see note in TeacherCard.
        <img src={imageUrl} alt={`${course.name} course`} className="h-36 w-full object-cover" />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {!imageUrl && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-xl font-heading font-semibold text-primary-500">
            {course.name.charAt(0)}
          </div>
        )}
        <h3 className="mt-4 font-heading text-lg font-semibold text-charcoal group-hover:text-primary-600">
          {course.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-charcoal-light">{course.shortDescription}</p>
        {course.suitableFor && (
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-accent-700">
            {course.suitableFor}
          </p>
        )}
        <span className="mt-4 text-sm font-semibold text-primary-500 group-hover:text-primary-600">
          Learn More &rarr;
        </span>
      </div>
    </Link>
  );
}
