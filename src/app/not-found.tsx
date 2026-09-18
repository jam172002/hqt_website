import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent-700">404</p>
      <h1 className="mt-3 font-heading text-3xl font-bold text-primary-700 sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-charcoal-light">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-primary-500 px-8 py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-primary-600"
        >
          Back to Home
        </Link>
        <Link
          href="/courses"
          className="rounded-full border border-primary-200 bg-white px-8 py-3.5 font-semibold text-primary-600 transition-colors hover:bg-primary-50"
        >
          Browse Courses
        </Link>
      </div>
    </div>
  );
}
