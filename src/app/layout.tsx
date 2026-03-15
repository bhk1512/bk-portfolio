import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Bharat Kaushik · Program & Ops · IIMA",
  description:
    "Execution operator and systems builder with 7 years across " +
    "intelligence, national-scale operations, and enterprise digital " +
    "transformation. IIMA PGPX. Currently exploring Senior Program, " +
    "Product Ops, and Founder's Office roles.",
  openGraph: {
    title: "Bharat Kaushik · Program & Ops · IIMA",
    description:
      "Execution operator building low-friction systems that turn " +
      "messy, human processes into auditable, decision-ready workflows.",
    url: "https://www.bharatkaushik.com",
    siteName: "Bharat Kaushik",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bharat Kaushik — Program & Ops · IIMA",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Kaushik · Program & Ops · IIMA",
    description:
      "Execution operator. Systems builder. IIMA MBA. " +
      "7 years across intelligence, national ops, and enterprise " +
      "transformation.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        data-gramm="false" // ask Grammarly not to mutate the DOM
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}


