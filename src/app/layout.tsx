import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
const SITE_DESCRIPTION =
  "Learn to read, recite, and memorize the Quran with certified teachers through personalized, one-to-one online classes - available worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hafiz Quran Tutor - Online Quran Learning Platform",
    template: "%s | Hafiz Quran Tutor",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Hafiz Quran Tutor",
    title: "Hafiz Quran Tutor - Online Quran Learning Platform",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Hafiz Quran Tutor - Online Quran Learning Platform",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
