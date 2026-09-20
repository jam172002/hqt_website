import Link from "next/link";
import { getContent, whatsappLink } from "@/lib/content";

export default async function Footer() {
  const { global: g } = await getContent();

  const columns = [
    {
      title: g.t("footer.exploreTitle"),
      links: [
        { href: "/about", label: g.t("header.navAbout") },
        { href: "/courses", label: g.t("header.navCourses") },
        { href: "/teachers", label: g.t("header.navTeachers") },
        { href: "/pricing", label: g.t("header.navPricing") },
      ],
    },
    {
      title: g.t("footer.supportTitle"),
      links: [
        { href: "/faq", label: g.t("header.navFaq") },
        { href: "/contact", label: g.t("header.navContact") },
        { href: "/trial", label: g.t("header.trialButton") },
        { href: "/testimonials", label: "Testimonials" },
      ],
    },
    {
      title: g.t("footer.legalTitle"),
      links: [
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms & Conditions" },
      ],
    },
  ];

  return (
    <footer className="border-t border-primary-100/60 bg-primary-700 text-primary-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-emblem.png" alt="" width={36} height={36} className="h-9 w-9 rounded-lg" />
              <span className="font-heading text-base font-semibold text-white">{g.t("brand.siteName")}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-primary-100/80">{g.t("brand.tagline")}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-primary-100/80">
              <li>
                <a href={whatsappLink(g)} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp: +{g.t("contact.whatsappNumber").replace(/\D/g, "")}
                </a>
              </li>
              <li>
                <a href={`tel:${g.t("contact.phoneNumber")}`} className="hover:text-white">
                  {g.t("contact.phoneNumber")}
                </a>
              </li>
              <li>
                <a href={`mailto:${g.t("contact.email")}`} className="hover:text-white">
                  {g.t("contact.email")}
                </a>
              </li>
            </ul>
          </div>

          {columns.map((col) => (
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
          <p>
            &copy; {new Date().getFullYear()} {g.t("footer.copyright")}
          </p>
          <p>{g.t("footer.bottomLine")}</p>
        </div>
      </div>
    </footer>
  );
}
