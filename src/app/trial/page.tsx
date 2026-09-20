import type { Metadata } from "next";
import { api } from "@/lib/api";
import { getContent, getSeo, whatsappLink } from "@/lib/content";
import PageHero from "@/components/PageHero";
import TrialForm from "@/components/TrialForm";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("trial");
  return { title: seo.title, description: seo.description };
}

export default async function TrialPage() {
  const [result, { global: g, page: c }] = await Promise.all([api.courses.list().catch(() => null), getContent("trial")]);
  const courses = result?.data ?? [];
  const labels = {
    submit: c.t("form.submitButton"),
    submitting: c.t("form.submittingText"),
    successTitle: c.t("form.successTitle"),
    successText: c.t("form.successText"),
    whatsappButton: c.t("form.whatsappButton"),
    whatsappHref: whatsappLink(g, c.t("form.whatsappMessage")),
  };

  return (
    <div>
      <PageHero eyebrow={c.t("hero.eyebrow")} title={c.t("hero.title")} description={c.t("hero.description")} />

      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <TrialForm courses={courses} labels={labels} />
      </section>
    </div>
  );
}
