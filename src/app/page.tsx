import Link from "next/link";
import { api, getContentBlock } from "@/lib/api";
import CourseCard from "@/components/CourseCard";
import TeacherCard from "@/components/TeacherCard";
import TestimonialCard from "@/components/TestimonialCard";

const DEFAULT_HERO_TITLE = "Learn the Quran Online with Certified, One-to-One Teachers";
const DEFAULT_HERO_DESCRIPTION =
  "Quran Reading, Tajweed, Hifz, Translation, and Islamic Studies — personalized " +
  "classes for children, adults, and families, anywhere in the world.";
const DEFAULT_HERO_CTA_LABEL = "Book Free Trial";

const TRUST_HIGHLIGHTS = [
  { title: "Qualified Quran Teachers", desc: "Certified, experienced teachers of Quran and Tajweed." },
  { title: "One-to-One Classes", desc: "Every class is individual, personalized attention only." },
  { title: "Flexible Timings", desc: "Choose a schedule that fits your timezone, any day." },
  { title: "Students Worldwide", desc: "Trusted by families across dozens of countries." },
];

const WHY_CHOOSE_US = [
  "Individual attention in every class",
  "Experienced, certified teachers",
  "Flexible scheduling across time zones",
  "Fully online, learn from anywhere",
  "Available to students worldwide",
];

const HOW_IT_WORKS = [
  { step: "1", title: "Register", desc: "Tell us a little about the student and preferred schedule." },
  { step: "2", title: "Book Free Trial", desc: "Try a class with no cost and no obligation." },
  { step: "3", title: "Meet Your Teacher", desc: "Get matched with a qualified teacher for your goals." },
  { step: "4", title: "Start Learning", desc: "Begin regular one-to-one classes on your schedule." },
];

export default async function Home() {
  const [coursesResult, teachersResult, testimonialsResult, faqsResult, heroContent] = await Promise.all([
    api.courses.list().catch(() => null),
    api.teachers.list().catch(() => null),
    api.testimonials.list().catch(() => null),
    api.faqs.list().catch(() => []),
    getContentBlock("home.hero"),
  ]);

  const courses = coursesResult?.data.slice(0, 6) ?? [];
  const teachers = teachersResult?.data.slice(0, 3) ?? [];
  const testimonials = testimonialsResult?.data.slice(0, 3) ?? [];
  const faqs = faqsResult.slice().sort((a, b) => a.sortOrder - b.sortOrder).slice(0, 5);

  const heroTitle = heroContent?.title || DEFAULT_HERO_TITLE;
  const heroDescription = heroContent?.content || DEFAULT_HERO_DESCRIPTION;
  const heroCtaLabel = (heroContent?.data?.ctaLabel as string | undefined) || DEFAULT_HERO_CTA_LABEL;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent-700">
              Online Quran Learning Platform
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-primary-700 sm:text-5xl">
              {heroTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-charcoal-light">
              {heroDescription}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/trial"
                className="w-full rounded-full bg-primary-500 px-8 py-3.5 text-center font-semibold text-white shadow-md transition-colors hover:bg-primary-600 sm:w-auto"
              >
                {heroCtaLabel}
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full border border-primary-200 bg-white px-8 py-3.5 text-center font-semibold text-primary-600 transition-colors hover:bg-primary-50 sm:w-auto"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights */}
      <section className="border-y border-primary-100/60 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {TRUST_HIGHLIGHTS.map((item) => (
            <div key={item.title} className="text-center">
              <h3 className="font-heading text-sm font-semibold text-primary-600 sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-charcoal-light sm:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      {courses.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal">Our Courses</h2>
            <p className="mt-3 text-charcoal-light">
              Structured programs for every stage of the Quran learning journey.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/courses" className="font-semibold text-primary-500 hover:text-primary-600">
              View All Courses &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="bg-primary-500">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-white">Why Choose Us</h2>
          <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((reason) => (
              <li key={reason} className="flex items-start gap-3 text-primary-50">
                <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-400">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-charcoal">How It Works</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-500 font-heading text-lg font-bold text-primary-700">
                {item.step}
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-charcoal">{item.title}</h3>
              <p className="mt-1.5 text-sm text-charcoal-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teachers */}
      {teachers.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-charcoal">Meet Our Teachers</h2>
              <p className="mt-3 text-charcoal-light">Experienced, certified, and dedicated to every student.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/teachers" className="font-semibold text-primary-500 hover:text-primary-600">
                View All Teachers &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-charcoal">What Families Say</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl font-bold text-charcoal">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.id} className="group rounded-xl border border-primary-100 bg-background p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-sm font-semibold text-charcoal">
                    {faq.question}
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      className="h-5 w-5 flex-shrink-0 text-primary-500 transition-transform group-open:rotate-45"
                    >
                      <path strokeLinecap="round" d="M10 4v12M4 10h12" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-charcoal-light">{faq.answer}</p>
                </details>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/faq" className="font-semibold text-primary-500 hover:text-primary-600">
                View All FAQs &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-primary-700">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white">
            Start Your Quran Learning Journey Today
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/trial"
              className="w-full rounded-full bg-accent-500 px-8 py-3.5 text-center font-semibold text-primary-700 shadow-md transition-colors hover:bg-accent-400 sm:w-auto"
            >
              Book Free Trial
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-white/30 px-8 py-3.5 text-center font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
