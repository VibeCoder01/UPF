import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "UPF Analyzer | Food Processing Insights",
  description: "Analyze food products for Ultra-Processed Food (UPF) content using the NOVA classification system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-zinc-50 dark:bg-black selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
        {children}
      </body>
    </html>
  );
}
