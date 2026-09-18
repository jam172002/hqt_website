import type { MetadataRoute } from "next";
import { api } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hafizqurantutor.com";

const STATIC_ROUTES = [
  "",
  "/about",
  "/courses",
  "/teachers",
  "/pricing",
  "/trial",
  "/testimonials",
  "/faq",
  "/contact",
  "/privacy-policy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const courseEntries: MetadataRoute.Sitemap = await api.courses
    .list()
    .then((result) =>
      result.data.map((course) => ({
        url: `${SITE_URL}/courses/${course.slug}`,
        lastModified: new Date(),
      })),
    )
    .catch(() => []);

  return [...staticEntries, ...courseEntries];
}
