import type { ReactNode } from "react";
import "./globals.css";

import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="relative min-h-screen text-zinc-100 bg-zinc-950">
        {/* Glow + depth (mais vivo, sem exagero) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            backgroundImage: `
              radial-gradient(900px circle at 15% 12%, rgba(168, 85, 247, 0.20), transparent 60%),
              radial-gradient(800px circle at 85% 18%, rgba(34, 211, 238, 0.18), transparent 58%),
              linear-gradient(to bottom, rgba(9,9,11,1), rgba(9,9,11,1), rgba(24,24,27,0.92))
            `,
          }}
        />

        <ToastProvider>
          <Navigation />

          <main className="min-h-screen pt-6">{children}</main>

          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
