import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import ClientShell from "@/components/ClientShell";
import "./globals.css";

// Inter Variable with its optical-size axis: text cuts at body sizes,
// display cuts on headings, chosen automatically by size.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "zeriax — software engineer building web apps, CLI tools, and Discord bots. Self-hosting and free software enthusiast.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zeriax.com"),
  title: {
    default: "zeriax",
    template: "%s · zeriax",
  },
  description: siteDescription,
  openGraph: {
    title: "zeriax",
    description: siteDescription,
    type: "website",
    url: "https://zeriax.com",
    siteName: "zeriax",
  },
  twitter: {
    card: "summary",
    title: "zeriax",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
