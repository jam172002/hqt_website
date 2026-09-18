import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getContentBlock } from "@/lib/api";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions governing use of Hafiz Quran Tutor's services.",
};

const DEFAULT_HERO_TITLE = "Terms & Conditions";

export default async function TermsPage() {
  const heroContent = await getContentBlock("legal.terms.hero");
  const heroTitle = heroContent?.title || DEFAULT_HERO_TITLE;

  return (
    <div>
      <PageHero eyebrow="Legal" title={heroTitle} description={heroContent?.content || undefined} />
      <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 text-charcoal-light sm:px-6 lg:px-8">
        <p className="text-sm italic text-charcoal-light/70">
          Last updated: this is a draft for review before publication. Please have it checked
          against your jurisdiction&apos;s requirements before launch.
        </p>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">1. Our Services</h2>
          <p className="mt-2 leading-7">
            Hafiz Quran Tutor provides one-to-one online Quran and Islamic Studies classes, including
            a free trial class, ongoing enrollment, scheduling, and progress tracking, delivered by
            teachers engaged by us.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">2. Free Trial</h2>
          <p className="mt-2 leading-7">
            The free trial class is offered at our discretion, subject to teacher availability, and
            does not obligate you to enroll further. Trial requests are reviewed and confirmed by our
            team before a class is scheduled.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">3. Enrollment &amp; Scheduling</h2>
          <p className="mt-2 leading-7">
            Enrollment begins once an admission is confirmed and a package is agreed. Classes are
            scheduled in the student&apos;s selected time zone; rescheduling or cancellation of a
            specific class is handled according to our scheduling policy communicated at enrollment.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">4. Payments</h2>
          <p className="mt-2 leading-7">
            Package pricing, billing period, and payment method will be confirmed with you before
            enrollment. Invoices are issued per billing period; continued access to scheduled classes
            is subject to payments being kept current.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">5. Conduct</h2>
          <p className="mt-2 leading-7">
            Students, parents, and teachers are expected to communicate respectfully. We reserve the
            right to suspend or end an enrollment in cases of abusive conduct, non-payment, or
            violation of these terms.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">6. Intellectual Property</h2>
          <p className="mt-2 leading-7">
            Course materials, curriculum, and website content are the property of Hafiz Quran Tutor
            or its licensors and may not be reproduced or redistributed without permission.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">7. Changes to These Terms</h2>
          <p className="mt-2 leading-7">
            We may update these terms from time to time. Continued use of our services after changes
            take effect constitutes acceptance of the revised terms.
          </p>
        </div>
      </section>
    </div>
  );
}
