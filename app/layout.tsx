import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
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
  title: "FreightIQ",
  description: "Simple, fast maps and real driver intel for smoother deliveries.",
  icons: {
    icon: "/freightiq-icon.png",
    apple: "/freightiq-icon.png",
  },
  openGraph: {
    title: "FreightIQ",
    description: "Simple, fast maps and real driver intel for smoother deliveries.",
    url: "https://freightiqapp.com",
    siteName: "FreightIQ",
    images: ["/freightiq-icon.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
