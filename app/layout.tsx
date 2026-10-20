import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import ClientShell from "@/components/ClientShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
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
        className={`${geistSans.variable} ${ibmPlexMono.variable} antialiased font-sans`}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
