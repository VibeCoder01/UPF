"use client";

import { AlertTriangle, ArrowLeft, CheckCircle, Globe, Info, FlaskConical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToBasketButton } from "@/components/AddToBasketButton";
import { NutritionBadge } from "@/components/NutritionBadge";
import { DataQualityBadge } from "@/components/DataQualityBadge";
import { analyzeIngredients } from "@/lib/ingredients";
import { Product } from "@/lib/api";
import { useLayout } from "@/context/LayoutContext";

interface ProductPageClientProps {
    product: Product;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
    const { isFullWidth } = useLayout();
    const analysis = analyzeIngredients(product.ingredients_text || "");

    const getNovaColor = (nova: number) => {
        switch (nova) {
            case 1: return "bg-green-500";
            case 2: return "bg-yellow-400";
            case 3: return "bg-orange-500";
            case 4: return "bg-red-600";
            default: return "bg-gray-400";
        }
    };

    const getNovaLabel = (nova: number) => {
        switch (nova) {
            case 1: return "Unprocessed / Minimally Processed";
            case 2: return "Processed Culinary Ingredients";
            case 3: return "Processed Foods";
            case 4: return "Ultra-Processed Food (UPF)";
            default: return "Unknown";
        }
    };

    const getNovaDescription = (nova: number) => {
        switch (nova) {
            case 1: return "Unprocessed or minimally processed foods are edible parts of plants (seeds, fruits, leaves, stems, roots) or of animals (muscle, offal, eggs, milk), and also fungi, algae and water, after separation from nature.";
            case 2: return "Processed culinary ingredients, such as oils, butter, sugar and salt, are substances derived from Group 1 foods or from nature by processes that include pressing, refining, grinding, milling and drying.";
            case 3: return "Processed foods, such as bottled vegetables, canned fish, fruits in syrup, cheeses and freshly made breads, are made essentially by adding salt, oil, sugar or other substances from Group 2 to Group 1 foods.";
            case 4: return "Ultra-processed foods are formulations of ingredients, mostly of exclusive industrial use, typically created by series of industrial techniques and processes (hence 'ultra-processed').";
            default: return "";
        }
    };

    return (
        <div className={`${isFullWidth ? 'w-full' : 'container max-w-4xl mx-auto'} px-4 py-8`}>
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to products
            </Link>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-8 flex items-center justify-center min-h-[400px] relative">
                        {product.image_url ? (
                            <Image
                                src={product.image_url}
                                alt={product.product_name}
                                fill
                                className="object-contain p-4"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        ) : (
                            <div className="text-zinc-400 flex flex-col items-center">
                                <Info className="w-16 h-16 mb-4" />
                                <span className="text-lg">No Image Available</span>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    {product.brands ? (
                                        <Link
                                            href={`/brand/${encodeURIComponent(product.brands.split(',')[0])}`}
                                            className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            {product.brands}
                                        </Link>
                                    ) : (
                                        <span className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                                            Unknown Brand
                                        </span>
                                    )}
                                </div>
                                <DataQualityBadge product={product} />
                            </div>
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white leading-tight mb-4">
                                {product.product_name || "Unknown Product"}
                            </h1>

                            {product.categories_tags && product.categories_tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {product.categories_tags.slice(0, 3).map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/category/${encodeURIComponent(tag)}`}
                                            className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                        >
                                            {tag.replace('en:', '').replace(/-/g, ' ')}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {product.countries && (
                                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                                    <Globe className="w-4 h-4" />
                                    <span>Sold in: {product.countries}</span>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold shadow-sm ${getNovaColor(product.nova_group)}`}>
                                    {product.nova_group === 4 && <AlertTriangle className="w-5 h-5" />}
                                    {product.nova_group === 1 && <CheckCircle className="w-5 h-5" />}
                                    <span>NOVA {product.nova_group}</span>
                                </div>
                                <NutritionBadge nutriscore={product.nutriscore_grade} />
                            </div>

                            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 border border-zinc-100 dark:border-zinc-800 mb-8">
                                <h3 className={`font-bold mb-2 ${product.nova_group === 4 ? 'text-red-600 dark:text-red-400' : 'text-zinc-900 dark:text-white'}`}>
                                    {getNovaLabel(product.nova_group)}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {getNovaDescription(product.nova_group)}
                                </p>
                            </div>

                            {/* Explainability Section */}
                            {(analysis.isUpf || product.nova_group === 4) && (
                                <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-5 border border-red-100 dark:border-red-900/20 mb-8">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FlaskConical className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        <h3 className="font-bold text-red-700 dark:text-red-400">Why is this Ultra-Processed?</h3>
                                    </div>

                                    {analysis.redFlags.length > 0 || analysis.additives.length > 0 ? (
                                        <div className="space-y-3">
                                            <p className="text-sm text-red-600 dark:text-red-300">
                                                This product contains ingredients often found in ultra-processed foods:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.redFlags.map((flag) => (
                                                    <span key={flag} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-semibold rounded-md border border-red-200 dark:border-red-800">
                                                        {flag}
                                                    </span>
                                                ))}
                                                {analysis.additives.map((additive) => (
                                                    <span key={additive} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-semibold rounded-md border border-orange-200 dark:border-orange-800">
                                                        {additive}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-red-600 dark:text-red-300">
                                            Classified as NOVA 4 due to processing methods or category, even if specific marker ingredients weren't detected in the text.
                                        </p>
                                    )}

                                    <div className="mt-4 pt-3 border-t border-red-100 dark:border-red-900/20">
                                        <p className="text-xs text-red-500 dark:text-red-400 italic">
                                            Automated analysis based on ingredient list text. Always check the package.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="mt-auto">
                                <AddToBasketButton product={product} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ingredients Section */}
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-8">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Ingredients</h2>
                    <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl p-6 border border-zinc-100 dark:border-zinc-800">
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {product.ingredients_text || "Ingredients list not available."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { fetchProduct } from "@/lib/api";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ barcode: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { barcode } = await params;
    const product = await fetchProduct(barcode);

    if (!product) {
        notFound();
    }

    return <ProductPageClient product={product} />;
}
