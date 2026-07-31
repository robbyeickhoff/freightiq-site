import type { MetadataRoute } from "next";

const siteUrl = "https://freightiqapp.com";

const publicRoutes = [
  "",
  "/demo",
  "/real-example",
  "/early-access",
  "/contact",
  "/privacy",
  "/delete-account",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
  }));
}
