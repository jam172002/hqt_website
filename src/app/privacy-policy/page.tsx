import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getContentBlock } from "@/lib/api";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Hafiz Quran Tutor collects, uses, and protects your information.",
};

const DEFAULT_HERO_TITLE = "Privacy Policy";

export default async function PrivacyPolicyPage() {
  const heroContent = await getContentBlock("legal.privacy.hero");
  const heroTitle = heroContent?.title || DEFAULT_HERO_TITLE;

  return (
    <div>
      <PageHero eyebrow="Legal" title={heroTitle} description={heroContent?.content || undefined} />
      <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 text-charcoal-light sm:px-6 lg:px-8">
        <p className="text-sm italic text-charcoal-light/70">
          Last updated: this is a draft policy for review before publication. Please have it checked
          against your jurisdiction&apos;s requirements before launch.
        </p>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">1. Information We Collect</h2>
          <p className="mt-2 leading-7">
            When you request a free trial, contact us, or register for an account, we collect
            information such as the student&apos;s name and age, a parent or guardian&apos;s name,
            country, WhatsApp/phone number, email address, and preferred class schedule. Once
            enrolled, we also record attendance, lesson notes, homework, progress, and payment
            history in connection with the classes provided.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">2. How We Use Information</h2>
          <p className="mt-2 leading-7">
            We use this information to respond to inquiries, schedule and deliver classes, match
            students with suitable teachers, communicate about classes and account activity, process
            payments, and improve our services. We do not sell personal information to third parties.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">3. Children&apos;s Information</h2>
          <p className="mt-2 leading-7">
            Many of our students are children. Accounts and profiles for children are created and
            managed by a parent or guardian, who consents to the collection described in this policy
            on the child&apos;s behalf. We only collect information about a child that is necessary
            to provide our educational services.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">4. Communication Channels</h2>
          <p className="mt-2 leading-7">
            We may contact you by email, WhatsApp, phone, or in-app messaging regarding trial
            requests, class scheduling, homework, payments, and general announcements.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">5. Data Security</h2>
          <p className="mt-2 leading-7">
            We take reasonable technical and organizational measures to protect personal information
            against unauthorized access, alteration, or loss, including encrypted transmission and
            access controls limiting staff access to what is needed for their role.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">6. Your Rights</h2>
          <p className="mt-2 leading-7">
            You may request access to, correction of, or deletion of your personal information, or
            that of a child in your care, by contacting us using the details on our Contact page.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-charcoal">7. Changes to This Policy</h2>
          <p className="mt-2 leading-7">
            We may update this policy from time to time. Material changes will be posted on this
            page with an updated effective date.
          </p>
        </div>
      </section>
    </div>
  );
}
