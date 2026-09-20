import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hafiz Quran Tutor",
    short_name: "Hafiz Quran",
    description: "One-to-one online Quran classes with certified teachers, worldwide.",
    start_url: "/",
    display: "standalone",
    background_color: "#030906",
    theme_color: "#0f5132",
    icons: [
      { src: "/pwa-icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/pwa-icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
