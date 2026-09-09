import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const THEME_BOOTSTRAP = `
try {
  var stored = localStorage.getItem("theme");
  if (stored === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }
} catch (e) {}
`;

export const metadata: Metadata = {
  title: "Bharat Kaushik · Product Manager, SITA Labs",
  description:
    "Execution operator and systems builder with 7 years across " +
    "intelligence, national-scale operations, and enterprise digital " +
    "transformation. IIMA PGPX. Product Manager at SITA Labs, Gurugram.",
  openGraph: {
    title: "Bharat Kaushik · Product Manager, SITA Labs",
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
        alt: "Bharat Kaushik — Product Manager, SITA Labs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Kaushik · Product Manager, SITA Labs",
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body
        data-gramm="false" // ask Grammarly not to mutate the DOM
        className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}


