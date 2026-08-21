import type { MetadataRoute } from "next";

const siteUrl = "https://freightiqapp.com";

const publicRoutes = [
  "",
  "/demos",
  "/resources",
  "/resources/get-new-delivery-drivers-up-to-speed-faster",
  "/demo",
  "/driver",
  "/real-example",
  "/why",
  "/faq",
  "/founding-drivers-program",
  "/early-access",
  "/contact",
  "/privacy",
  "/community-guidelines",
  "/delete-account",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
  }));
}
