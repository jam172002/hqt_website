import type { Metadata } from "next";
import Link from "next/link";
import { api } from "@/lib/api";
import { getContent, getSeo } from "@/lib/content";
import PageHero from "@/components/PageHero";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("pricing");
  return { title: seo.title, description: seo.description };
}

function formatPrice(price: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
  } catch {
    return `${currency} ${price}`;
  }
}

function billingLabel(period: string) {
  return { WEEKLY: "week", MONTHLY: "month", QUARTERLY: "quarter", YEARLY: "year" }[period] ?? period.toLowerCase();
}

export default async function PricingPage() {
  const [packages, { page: c }] = await Promise.all([api.packages.list().catch(() => []), getContent("pricing")]);
  const sorted = packages.slice().sort((a, b) => a.price - b.price);

  return (
    <div>
      <PageHero eyebrow={c.t("hero.eyebrow")} title={c.t("hero.title")} description={c.t("hero.description")} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {sorted.length === 0 ? (
          <p className="text-center text-charcoal-light">
            {c.t("cards.empty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col rounded-2xl border border-primary-100 bg-white p-8 shadow-sm"
              >
                <h3 className="font-heading text-lg font-semibold text-charcoal">{pkg.name}</h3>
                {pkg.description && (
                  <p className="mt-2 text-sm leading-6 text-charcoal-light">{pkg.description}</p>
                )}
                <p className="mt-6">
                  <span className="font-heading text-3xl font-bold text-primary-600">
                    {formatPrice(pkg.price, pkg.currency)}
                  </span>
                  <span className="text-sm text-charcoal-light"> / {billingLabel(pkg.billingPeriod)}</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm text-charcoal-light">
                  {pkg.classesPerPeriod != null && (
                    <li>
                      &bull;{" "}
                      {c.tf("cards.classesLine", { count: pkg.classesPerPeriod, period: billingLabel(pkg.billingPeriod) })}
                    </li>
                  )}
                  {pkg.classDurationMin != null && (
                    <li>&bull; {c.tf("cards.minutesLine", { minutes: pkg.classDurationMin })}</li>
                  )}
                  {c.list("cards.features").map((feature) => (
                    <li key={feature.text}>&bull; {feature.text}</li>
                  ))}
                </ul>
                <Link
                  href="/trial"
                  className="mt-8 rounded-full bg-primary-500 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-600"
                >
                  {c.t("cards.button")}
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
