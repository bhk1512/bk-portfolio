import type { Metadata, Viewport } from "next";
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

const SITE = "https://bharatkaushik.com";
// Unfurlers drop relative image paths silently, so og:image is absolute.
const OG_IMAGE = `${SITE}/og-image.png`;

export const viewport: Viewport = {
  themeColor: "#0B0A08",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Bharat Kaushik · Product Manager, SITA Labs",
  description:
    "Execution operator and systems builder with 7 years across " +
    "intelligence, national-scale operations, and enterprise digital " +
    "transformation. IIMA PGPX. Product Manager at SITA Labs, Gurugram.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/favicon-180.png" }],
  },
  openGraph: {
    title: "Bharat Kaushik",
    description: "I build tools for work that happens away from a desk.",
    url: SITE,
    siteName: "Bharat Kaushik",
    // The file is 2000x1050; the declared size is the 1.91:1 unfurl box.
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Bharat Kaushik. I build tools for work that happens away from a desk.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Kaushik",
    description: "I build tools for work that happens away from a desk.",
    images: [OG_IMAGE],
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


