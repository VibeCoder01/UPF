import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { BasketProvider } from "@/hooks/useBasket";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "UPF Analyzer | Food Processing Insights",
  description: "Analyze food products for Ultra-Processed Food (UPF) content using the NOVA classification system.",
};

import { LayoutProvider } from "@/context/LayoutContext";

import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-zinc-50 dark:bg-zinc-950 min-h-screen`}
        suppressHydrationWarning
      >
        <ServiceWorkerRegister />
        <LayoutProvider>
          <BasketProvider>
            {children}
          </BasketProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}
