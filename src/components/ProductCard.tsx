"use client";

import { Product } from "@/lib/api";
import { AlertTriangle, CheckCircle, Globe, Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [showIngredients, setShowIngredients] = useState(false);

    const getNovaColor = (nova: number) => {
        switch (nova) {
            case 1:
                return "bg-green-500";
            case 2:
                return "bg-yellow-400";
            case 3:
                return "bg-orange-500";
            case 4:
                return "bg-red-600";
            default:
                return "bg-gray-400";
        }
    };

    const getNovaLabel = (nova: number) => {
        switch (nova) {
            case 1:
                return "Unprocessed / Minimally Processed";
            case 2:
                return "Processed Culinary Ingredients";
            case 3:
                return "Processed Foods";
            case 4:
                return "Ultra-Processed Food (UPF)";
            default:
                return "Unknown";
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-transform hover:scale-[1.02] duration-300 flex flex-col h-full">
            <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800 p-4 flex items-center justify-center">
                {product.image_url ? (
                    <Image
                        src={product.image_url}
                        alt={product.product_name}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="text-zinc-400 flex flex-col items-center">
                        <Info className="w-12 h-12 mb-2" />
                        <span>No Image</span>
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <div
                        className={`${getNovaColor(
                            product.nova_group
                        )} text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1`}
                    >
                        {product.nova_group === 4 && <AlertTriangle className="w-3 h-3" />}
                        {product.nova_group === 1 && <CheckCircle className="w-3 h-3" />}
                        NOVA {product.nova_group}
                    </div>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4 flex-1">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold mb-1">
                        {product.brands || "Unknown Brand"}
                    </p>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight mb-2 line-clamp-2">
                        {product.product_name || "Unknown Product"}
                    </h3>
                    <p className={`text-sm font-medium ${product.nova_group === 4 ? 'text-red-600 dark:text-red-400' : 'text-zinc-600 dark:text-zinc-300'}`}>
                        {getNovaLabel(product.nova_group)}
                    </p>
                    {product.countries && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                            <Globe className="w-3 h-3" />
                            <span>{product.countries}</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto">
                    <button
                        onClick={() => setShowIngredients(!showIngredients)}
                        className="w-full py-2 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        {showIngredients ? "Hide Ingredients" : "Show Ingredients"}
                    </button>
                </div>
            </div>

            {showIngredients && (
                <div className="px-5 pb-5 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-700/50 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-h-40 overflow-y-auto custom-scrollbar">
                        <p className="font-semibold mb-1 text-zinc-900 dark:text-zinc-200">Ingredients:</p>
                        {product.ingredients_text ? (
                            product.ingredients_text
                        ) : (
                            <span className="italic">Ingredients list not available.</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
