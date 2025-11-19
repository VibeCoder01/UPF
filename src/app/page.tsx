import { InfoSidebar } from "@/components/InfoSidebar";
import { ProductGrid } from "@/components/ProductGrid";
import { fetchProducts } from "@/lib/api";
import { Sparkles } from "lucide-react";

export const revalidate = 86400;

export default async function Home() {
  const products = await fetchProducts(3000);

  return (
    <main className="h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex lg:gap-12 overflow-hidden">
        {/* Left Sidebar - Hidden on mobile, visible and scrollable on desktop */}
        <div className="hidden lg:block w-80 shrink-0 h-full overflow-y-auto pr-2">
          <InfoSidebar />
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 h-full overflow-y-auto pb-10">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-10 space-y-4">
            <div className="inline-flex items-center justify-center p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full mb-4">
              <span className="px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
                Food Analysis
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white">
              UPF Analyzer
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Discover the processing level of common food products.
              <br className="hidden md:block" />
              Powered by the <span className="font-semibold text-zinc-900 dark:text-white">NOVA classification system</span>.
            </p>
          </div>

          <ProductGrid products={products} />

          <div className="mt-20 text-center border-t border-zinc-200 dark:border-zinc-800 pt-10">
            <p className="text-zinc-500 dark:text-zinc-500 text-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Data provided by OpenFoodFacts
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
