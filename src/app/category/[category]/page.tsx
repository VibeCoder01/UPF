import { fetchProductsByCategory } from "@/lib/api";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";

interface PageProps {
    params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const products = await fetchProductsByCategory(decodedCategory);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to all products
                </Link>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white capitalize">
                    Category: {decodedCategory.replace(/-/g, ' ').replace('en:', '')}
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                    Found {products.length} products
                </p>
            </div>

            {products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-12 text-center border border-zinc-200 dark:border-zinc-800">
                    <Info className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">No products found</h3>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        We couldn't find any products for this category in our database.
                    </p>
                </div>
            )}
        </div>
    );
}
