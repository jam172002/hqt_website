export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-primary-100/60 bg-gradient-to-b from-primary-50 to-background">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent-700">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-primary-700 sm:text-4xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-charcoal-light">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
