import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { JsonLd } from "../components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freightiqapp.com"),
  title: {
    default: "FreightIQ",
    template: "%s | FreightIQ",
  },
  description: "Simple, fast maps and real driver intel for smoother deliveries.",
  icons: {
    icon: [
      {
        url: "/freightiq-sunrise-favicon-v1.ico",
        type: "image/x-icon",
        sizes: "16x16 32x32 48x48 256x256",
      },
      {
        url: "/freightiq-sunrise-icon-v1.png",
        type: "image/png",
        sizes: "1024x1024",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    title: "FreightIQ",
    description: "Simple, fast maps and real driver intel for smoother deliveries.",
    url: "https://freightiqapp.com",
    siteName: "FreightIQ",
    images: ["/freightiq-sunrise-icon-v1.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://freightiqapp.com/#organization",
              name: "FreightIQ",
              url: "https://freightiqapp.com",
              logo: "https://freightiqapp.com/freightiq-sunrise-icon-v1.png",
              sameAs: [
                "https://www.facebook.com/profile.php?id=61593729710264",
                "https://www.instagram.com/freightiqapp/",
                "https://x.com/FreightIQapp",
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://freightiqapp.com/#website",
              url: "https://freightiqapp.com",
              name: "FreightIQ",
              publisher: { "@id": "https://freightiqapp.com/#organization" },
            },
          ]}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
