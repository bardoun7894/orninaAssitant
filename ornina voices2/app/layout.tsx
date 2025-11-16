import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ORNINA AI ASSISTENT",
  description: "Modern AI assistant landing page with animated sound wave visualization",
  keywords: ["AI", "assistant", "ORNINA", "artificial intelligence"],
  authors: [{ name: "ORNINA" }],
  creator: "ORNINA",
  publisher: "ORNINA",
  robots: "index, follow",
  openGraph: {
    title: "ORNINA AI ASSISTENT",
    description: "Modern AI assistant landing page with animated sound wave visualization",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORNINA AI ASSISTENT",
    description: "Modern AI assistant landing page with animated sound wave visualization",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a1628" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
