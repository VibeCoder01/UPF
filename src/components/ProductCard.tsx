"use client";

import { Product } from "@/lib/api";
import { AlertTriangle, CheckCircle, Globe, Info, Plus, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useBasket } from "@/hooks/useBasket";
import { getSwapSuggestions } from "@/lib/swaps";
import { NutritionBadge } from "./NutritionBadge";
import { DataQualityBadge } from "./DataQualityBadge";

interface ProductCardProps {
    product: Product;
    allProducts: Product[];
}

export function ProductCard({ product, allProducts }: ProductCardProps) {
    const [showIngredients, setShowIngredients] = useState(false);
    const { addToBasket, removeFromBasket, isInBasket } = useBasket();

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

    const [showSwaps, setShowSwaps] = useState(false);
    const swaps = useMemo(() => getSwapSuggestions(product, allProducts), [product, allProducts]);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 transition-transform hover:scale-[1.02] duration-300 flex flex-col h-full relative group/card">
            <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800 p-4 flex items-center justify-center rounded-t-xl overflow-hidden">
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
                <div className="absolute top-2 right-2 flex flex-col gap-2 items-end">
                    <div
                        className={`${getNovaColor(
                            product.nova_group
                        )} text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1`}
                    >
                        {product.nova_group === 4 && <AlertTriangle className="w-3 h-3" />}
                        {product.nova_group === 1 && <CheckCircle className="w-3 h-3" />}
                        NOVA {product.nova_group}
                    </div>
                    <NutritionBadge nutriscore={product.nutriscore_grade} />
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
                    <div className="mt-2">
                        <DataQualityBadge product={product} />
                    </div>
                </div>

                <div className="mt-auto space-y-2">
                    {swaps.length > 0 && (
                        <button
                            onClick={() => setShowSwaps(!showSwaps)}
                            className="w-full py-1.5 px-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                            <Sparkles className="w-3 h-3" />
                            {showSwaps ? "Hide Alternatives" : `View ${swaps.length} Better Choice${swaps.length > 1 ? 's' : ''}`}
                        </button>
                    )}

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowIngredients(!showIngredients)}
                            className="flex-1 py-2 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            {showIngredients ? "Hide Ingredients" : "Ingredients"}
                        </button>
                        <button
                            onClick={() => isInBasket(product.code) ? removeFromBasket(product.code) : addToBasket(product)}
                            className={`py-2 px-4 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${isInBasket(product.code)
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                                : "bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200"
                                }`}
                        >
                            {isInBasket(product.code) ? <CheckCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Swaps Panel */}
            {showSwaps && (
                <div className="px-5 pb-5 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/30">
                        <p className="text-xs font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Better Choices
                        </p>
                        <div className="space-y-2">
                            {swaps.map(swap => (
                                <div key={swap.code} className="relative group">
                                    <div className="flex gap-2 items-center bg-white dark:bg-zinc-900 p-2 rounded border border-green-100 dark:border-green-900/30 cursor-help transition-colors hover:border-green-300 dark:hover:border-green-700">
                                        <div className="relative w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded flex-shrink-0">
                                            {swap.image_url && (
                                                <img src={swap.image_url} alt={swap.product_name} className="w-full h-full object-contain p-0.5" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-zinc-900 dark:text-white truncate">{swap.product_name}</p>
                                            <p className="text-[10px] text-zinc-500 truncate">{swap.brands}</p>
                                        </div>
                                        <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${swap.nova_group === 1 ? 'bg-green-100 text-green-700' :
                                            swap.nova_group === 2 ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                            NOVA {swap.nova_group}
                                        </div>
                                    </div>

                                    {/* Hover Card */}
                                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="relative h-32 w-full mb-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                                            {swap.image_url ? (
                                                <img src={swap.image_url} alt={swap.product_name} className="h-full object-contain p-2" />
                                            ) : (
                                                <Info className="w-8 h-8 text-zinc-400" />
                                            )}
                                            <div className="absolute top-2 right-2">
                                                <NutritionBadge nutriscore={swap.nutriscore_grade} />
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-zinc-900 dark:text-white mb-1 leading-tight">{swap.product_name}</h4>
                                        <p className="text-xs text-zinc-500 mb-2">{swap.brands}</p>
                                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${swap.nova_group === 1 ? 'bg-green-100 text-green-700' :
                                            swap.nova_group === 2 ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                            {swap.nova_group === 1 && <CheckCircle className="w-3 h-3" />}
                                            NOVA {swap.nova_group}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

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
