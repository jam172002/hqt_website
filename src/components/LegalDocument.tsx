import PageHero from "@/components/PageHero";
import { getContent } from "@/lib/content";

/** Privacy Policy / Terms: banner, optional notice, then numbered sections - all editable in the admin panel. */
export default async function LegalDocument({ page }: { page: "privacy" | "terms" }) {
  const { page: c } = await getContent(page);
  const notice = c.t("notice.text");
  const items = c.list("body.items");

  return (
    <div>
      <PageHero eyebrow="Legal" title={c.t("hero.title")} description={c.t("hero.description") || undefined} />
      <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 text-charcoal-light sm:px-6 lg:px-8">
        {notice && <p className="text-sm italic text-charcoal-light/70">{notice}</p>}
        {items.map((item) => (
          <div key={item.heading}>
            <h2 className="font-heading text-lg font-semibold text-charcoal">{item.heading}</h2>
            <p className="mt-2 leading-7">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
