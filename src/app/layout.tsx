import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getContent } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hafizqurantutor.com";

export async function generateMetadata(): Promise<Metadata> {
  const { global: g, page: home } = await getContent("home");
  const siteName = g.t("brand.siteName");
  const description = g.t("brand.siteDescription");
  const defaultTitle = home.t("seo.metaTitle") || siteName;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: defaultTitle, template: `%s | ${siteName}` },
    description,
    openGraph: { type: "website", siteName, title: defaultTitle, description },
    twitter: { card: "summary_large_image", title: defaultTitle, description },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { global: g } = await getContent();
  const navLinks = [
    { href: "/", label: g.t("header.navHome") },
    { href: "/about", label: g.t("header.navAbout") },
    { href: "/courses", label: g.t("header.navCourses") },
    { href: "/teachers", label: g.t("header.navTeachers") },
    { href: "/pricing", label: g.t("header.navPricing") },
    { href: "/faq", label: g.t("header.navFaq") },
    { href: "/contact", label: g.t("header.navContact") },
  ];

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header links={navLinks} trialLabel={g.t("header.trialButton")} brand={g.t("brand.siteName")} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
