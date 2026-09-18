import type { Metadata } from "next";
import { Fragment } from "react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { getContentBlock } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Hafiz Quran Tutor by WhatsApp, email, or our contact form.",
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567";
const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+923001234567";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@hafizqurantutor.com";

const DEFAULT_HERO_TITLE = "Get in Touch";
const DEFAULT_HERO_DESCRIPTION = "Questions about courses, pricing, or scheduling? We're here to help, worldwide, every day.";
const DEFAULT_HOURS_TITLE = "Working Hours";
const DEFAULT_HOURS_LINES = [
  "Support team: Monday - Saturday, 9:00 AM - 9:00 PM (GMT+5).",
  "Classes run worldwide, every day of the week, in the student's own time zone.",
];

export default async function ContactPage() {
  const [heroContent, hoursContent] = await Promise.all([
    getContentBlock("contact.hero"),
    getContentBlock("contact.hours"),
  ]);
  const heroTitle = heroContent?.title || DEFAULT_HERO_TITLE;
  const heroDescription = heroContent?.content || DEFAULT_HERO_DESCRIPTION;
  const hoursTitle = hoursContent?.title || DEFAULT_HOURS_TITLE;
  // Admin enters working-hours copy as separate lines; each becomes its own <br/>-separated line here.
  const hoursLines = hoursContent?.content ? hoursContent.content.split("\n") : DEFAULT_HOURS_LINES;

  return (
    <div>
      <PageHero eyebrow="Contact" title={heroTitle} description={heroDescription} />

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border border-primary-100 bg-white p-6">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent-700">
              WhatsApp
            </h3>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              +{WHATSAPP_NUMBER}
            </a>
          </div>
          <div className="rounded-2xl border border-primary-100 bg-white p-6">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent-700">
              Phone
            </h3>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="mt-2 block text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              {PHONE_NUMBER}
            </a>
          </div>
          <div className="rounded-2xl border border-primary-100 bg-white p-6">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent-700">
              Email
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 block text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="rounded-2xl border border-primary-100 bg-white p-6">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent-700">
              {hoursTitle}
            </h3>
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
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
