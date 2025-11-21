"use client";

import { useBasket } from "@/hooks/useBasket";
import { BasketSummary } from "@/components/BasketSummary";
import { ProductCard } from "@/components/ProductCard";
import { Trash2, Minus, Plus, ArrowLeft, Maximize2, Minimize2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BasketPage() {
    const { basketItems, removeFromBasket, updateQuantity, clearBasket } = useBasket();
    const [isFullWidth, setIsFullWidth] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("upf-basket-layout-fullwidth");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Validate it's a boolean
                if (typeof parsed === 'boolean') {
                    setIsFullWidth(parsed);
                } else {
                    console.warn("Invalid basket layout preference, using default");
                    localStorage.removeItem("upf-basket-layout-fullwidth");
                }
            } catch (e) {
                console.error("Failed to parse basket layout preference", e);
                localStorage.removeItem("upf-basket-layout-fullwidth");
            }
        }
    }, []);

    const toggleFullWidth = () => {
        setIsFullWidth(prev => {
            const newValue = !prev;
            localStorage.setItem("upf-basket-layout-fullwidth", JSON.stringify(newValue));
            return newValue;
        });
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 p-6 lg:p-8">
            <div className={`${isFullWidth ? 'w-full' : 'max-w-7xl mx-auto'}`}>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight">Your Basket</h1>
                    </div>
                    <button
                        onClick={toggleFullWidth}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium"
                    >
                        {isFullWidth ? (
                            <>
                                <Minimize2 className="w-4 h-4" />
                                Standard Width
                            </>
                        ) : (
                            <>
                                <Maximize2 className="w-4 h-4" />
                                Full Width
                            </>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Basket Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {basketItems.length > 0 ? (
                            <>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                        {basketItems.length} items
                                    </span>
                                    <button
                                        onClick={clearBasket}
                                        className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Clear Basket
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {basketItems.map((item) => (
                                        <div key={item.code} className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                            {/* Reusing ProductCard logic but simplified for list view */}
                                            <div className="flex-1 flex gap-4 w-full">
                                                <div className="relative w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex-shrink-0">
                                                    {item.image_url && (
                                                        <img
                                                            src={item.image_url}
                                                            alt={item.product_name}
                                                            className="w-full h-full object-contain p-1"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-semibold mb-1">
                                                        {item.brands}
                                                    </p>
                                                    <h3 className="font-bold text-zinc-900 dark:text-white leading-tight mb-1">
                                                        {item.product_name}
                                                    </h3>
                                                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${item.nova_group === 1 ? 'bg-green-100 text-green-700' :
                                                        item.nova_group === 2 ? 'bg-yellow-100 text-yellow-700' :
                                                            item.nova_group === 3 ? 'bg-orange-100 text-orange-700' :
                                                                'bg-red-100 text-red-700'
                                                        }`}>
                                                        NOVA {item.nova_group}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                                <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.code, item.quantity - 1)}
                                                        className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.code, item.quantity + 1)}
                                                        className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromBasket(item.code)}
                                                    className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 border-dashed">
                                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Your basket is empty</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 mb-6">Start adding products to analyze your shopping list.</p>
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
                                >
                                    Browse Products
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <BasketSummary />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
