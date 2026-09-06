import type { MetadataRoute } from "next";

const siteUrl = "https://freightiqapp.com";

const publicRoutes = [
  { path: "", lastModified: "2026-09-06" },
  { path: "/demos", lastModified: "2026-09-06" },
  { path: "/resources", lastModified: "2026-09-06" },
  {
    path: "/resources/get-new-delivery-drivers-up-to-speed-faster",
    lastModified: "2026-09-06",
  },
  {
    path: "/resources/prepare-for-an-unfamiliar-commercial-delivery-stop",
    lastModified: "2026-09-06",
  },
  {
    path: "/resources/find-the-correct-truck-entrance-and-receiving-area",
    lastModified: "2026-09-06",
  },
  { path: "/resources/street-address-vs-delivery-zone", lastModified: "2026-09-06" },
  { path: "/demo", lastModified: "2026-09-06" },
  { path: "/driver", lastModified: "2026-09-06" },
  { path: "/real-example", lastModified: "2026-09-06" },
  { path: "/why", lastModified: "2026-09-06" },
  { path: "/faq", lastModified: "2026-09-06" },
  { path: "/founding-drivers-program", lastModified: "2026-09-06" },
  { path: "/early-access", lastModified: "2026-07-23" },
  { path: "/contact", lastModified: "2026-09-06" },
  { path: "/privacy", lastModified: "2026-09-05" },
  { path: "/community-guidelines", lastModified: "2026-09-06" },
  { path: "/delete-account", lastModified: "2026-09-06" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: route.lastModified,
  }));
}
