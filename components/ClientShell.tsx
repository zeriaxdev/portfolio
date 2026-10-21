"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import CornerNav from "@/components/CornerNav";
import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <ThemeProvider>
      <div className="shell">
        <CornerNav />
        <CommandPalette />
        <main key={pathname} className="flex-1 wrap">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
