"use client";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
const Dither = dynamic(() => import("@/components/other/Dither"), { ssr: false });
import { useEffect, useRef, useState } from "react";
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

const TARGET: [number, number, number] = [0.3, 0.3, 0.6];
const BLACK: [number, number, number] = [0, 0, 0];
const DURATION = 1000;

function BackgroundDither() {
  const [mounted, setMounted] = useState(false);
  const [waveColor, setWaveColor] = useState<[number, number, number]>(BLACK);
  const [isDark, setIsDark] = useState(true);
  const waveColorRef = useRef<[number, number, number]>(BLACK);
  const visibleRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && (e.target as Element).tagName === "BODY") {
        e.preventDefault();

        const nowVisible = !visibleRef.current;
        visibleRef.current = nowVisible;
        if (nowVisible) setMounted(true);

        // Snapshot current color as animation start (use ref, not stale state)
        let startColor: [number, number, number] = [...waveColorRef.current] as [number, number, number];
        const endColor = nowVisible ? TARGET : BLACK;
        let startTime: number | null = null;

        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        const animate = (time: number) => {
          if (!startTime) startTime = time;
          const t = Math.min((time - startTime) / DURATION, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const color: [number, number, number] = [
            startColor[0] + (endColor[0] - startColor[0]) * eased,
            startColor[1] + (endColor[1] - startColor[1]) * eased,
            startColor[2] + (endColor[2] - startColor[2]) * eased,
          ];
          waveColorRef.current = color;
          setWaveColor(color);
          if (t < 1) rafRef.current = requestAnimationFrame(animate);
          else rafRef.current = 0;
        };

        rafRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        opacity: 0.75,
        zIndex: -1,
        pointerEvents: "none",
        filter: isDark ? undefined : "invert(1) hue-rotate(180deg)",
      }}
    >
      <Dither
        waveColor={waveColor}
        disableAnimation={false}
        enableMouseInteraction={false}
        colorNum={7.2}
        waveAmplitude={0.3}
        waveFrequency={3}
        waveSpeed={0.05}
      />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const style = "font-size: 3em;";
  console.info("%cWhat are you looking for here?", style);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${ibmPlexMono.variable} antialiased bg-zinc-50 font-sans text-zinc-900 selection:bg-zinc-900 selection:text-zinc-50 dark:bg-black dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900`}
      >
        <BackgroundDither />
        <ThemeProvider>
          <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-between px-6 py-12 sm:py-24">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
