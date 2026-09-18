import Link from "next/link";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/courses", label: "Courses" },
      { href: "/teachers", label: "Teachers" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact Us" },
      { href: "/trial", label: "Book Free Trial" },
      { href: "/testimonials", label: "Testimonials" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-primary-100/60 bg-primary-700 text-primary-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 font-heading text-base font-bold text-primary-700">
                H
              </span>
              <span className="font-heading text-base font-semibold text-white">
                Hafiz Quran Tutor
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-primary-100/80">
              One-to-one online Quran classes with certified teachers, for students of every age,
              anywhere in the world.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent-400">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-100/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-primary-100/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Hafiz Quran Tutor. All rights reserved.</p>
          <p>Worldwide online classes &middot; Available every day of the week</p>
        </div>
      </div>
    </footer>
  );
}
