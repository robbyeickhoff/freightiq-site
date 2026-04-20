import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FreightIQ",
  description:
    "Know the stop before you get there. Real delivery intel from drivers who’ve been there.",
  openGraph: {
    title: "FreightIQ",
    description:
      "Know the stop before you get there. Real delivery intel from drivers who’ve been there.",
    url: "https://freightiqapp.com",
    siteName: "FreightIQ",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
