import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Renzo Rico — Data Scientist",
  description:
    "Data scientist building AI-powered products end to end. Python, LLMs, ML, NLP, SQL — from data collection to deployment.",
  metadataBase: new URL("https://renzorico.com"),
  openGraph: {
    title: "Renzo Rico — Data Scientist",
    description:
      "Building AI-powered products end to end. Python, LLMs, ML, NLP, SQL.",
    url: "https://renzorico.com",
    siteName: "renzorico.com",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Renzo Rico — Data Scientist",
    description:
      "Building AI-powered products end to end. Python, LLMs, ML, NLP, SQL.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
