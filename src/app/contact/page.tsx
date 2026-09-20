import type { Metadata } from "next";
import { Fragment } from "react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { getContent, getSeo, whatsappLink } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("contact");
  return { title: seo.title, description: seo.description };
}

export default async function ContactPage() {
  const { global: g, page: c } = await getContent("contact");
  const whatsappNumber = g.t("contact.whatsappNumber").replace(/\D/g, "");
  const phone = g.t("contact.phoneNumber");
  const email = g.t("contact.email");
  const hoursLines = c.list("info.hours").map((line) => line.text);

  const boxTitle = "font-heading text-sm font-semibold uppercase tracking-wide text-accent-700";
  const boxLink = "mt-2 block text-sm font-medium text-primary-600 hover:text-primary-700";

  return (
    <div>
      <PageHero eyebrow={c.t("hero.eyebrow")} title={c.t("hero.title")} description={c.t("hero.description")} />

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border border-primary-100 bg-white p-6">
            <h3 className={boxTitle}>{c.t("info.whatsappLabel")}</h3>
            <a href={whatsappLink(g)} target="_blank" rel="noopener noreferrer" className={boxLink}>
              +{whatsappNumber}
            </a>
          </div>
          <div className="rounded-2xl border border-primary-100 bg-white p-6">
            <h3 className={boxTitle}>{c.t("info.phoneLabel")}</h3>
            <a href={`tel:${phone}`} className={boxLink}>
              {phone}
            </a>
          </div>
          <div className="rounded-2xl border border-primary-100 bg-white p-6">
            <h3 className={boxTitle}>{c.t("info.emailLabel")}</h3>
            <a href={`mailto:${email}`} className={boxLink}>
              {email}
            </a>
          </div>
          <div className="rounded-2xl border border-primary-100 bg-white p-6">
            <h3 className={boxTitle}>{c.t("info.hoursTitle")}</h3>
            <p className="mt-2 text-sm text-charcoal-light">
              {hoursLines.map((line, i) => (
                <Fragment key={i}>
                  {line}
                  {i < hoursLines.length - 1 && <br />}
                </Fragment>
              ))}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ContactForm
            labels={{
              submit: c.t("form.submitButton"),
              sending: c.t("form.sendingText"),
              successTitle: c.t("form.successTitle"),
              successText: c.t("form.successText"),
            }}
          />
        </div>
      </section>
    </div>
  );
}
