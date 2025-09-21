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
  // Shows "Bharat Kaushik" by default; subpages can set their own titles and will render as "<Page> - Bharat Kaushik"
  title: { default: "Bharat Kaushik", template: "%s - Bharat Kaushik" },
  description:
    "Program & Operations leader blending strategy, tech, and execution to deliver measurable outcomes. IIMA MBA with cross-sector experience.",
  icons: { icon: "/favicon.svg" }, // put your icon at /public/favicon.svg
  themeColor: "#121212",
  metadataBase: new URL("https://your-domain.com"), // optional: update when you have a domain
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


