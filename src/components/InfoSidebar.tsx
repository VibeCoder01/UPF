"use client";

import { ExternalLink, Info, ShoppingBasket, Maximize2, Minimize2 } from "lucide-react";
import Link from "next/link";
import { useBasket } from "@/hooks/useBasket";
import { useLayout } from "@/context/LayoutContext";
import { BarcodeSearch } from "./BarcodeSearch";

export function InfoSidebar() {
    const { basketStats } = useBasket();
    const { isFullWidth, toggleFullWidth } = useLayout();

    return (
        <aside className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
                    <Info className="w-5 h-5 text-blue-500" />
                    <h2 className="font-bold text-lg">What is UPF?</h2>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    <strong>Ultra-Processed Foods (UPF)</strong> are industrial formulations made entirely or mostly from substances extracted from foods (oils, fats, sugar, starch, and proteins), derived from food constituents (hydrogenated fats and modified starch), or synthesized in laboratories from food substrates or other organic sources (flavor enhancers, colors, and food additives used to make the product hyper-palatable).
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    They often contain little or no whole food and are typically high in energy, fat, sugar, or sodium.
                </p>

                <div className="mb-6">
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Find Product</h3>
                    <BarcodeSearch />
                </div>

                <div className="mb-6">
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Layout</h3>
                    <button
                        onClick={toggleFullWidth}
                        className="flex items-center justify-between w-full p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white dark:bg-zinc-900 rounded-full shadow-sm">
                                {isFullWidth ? (
                                    <Minimize2 className="w-5 h-5 text-zinc-900 dark:text-white" />
                                ) : (
                                    <Maximize2 className="w-5 h-5 text-zinc-900 dark:text-white" />
                                )}
                            </div>
                            <span className="font-medium text-zinc-900 dark:text-white">
                                {isFullWidth ? "Standard Width" : "Full Width"}
                            </span>
                        </div>
                    </button>
                </div>

                <Link href="/basket" className="flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors group">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-zinc-900 rounded-full shadow-sm">
                            <ShoppingBasket className="w-5 h-5 text-zinc-900 dark:text-white" />
                        </div>
                        <span className="font-medium text-zinc-900 dark:text-white">Your Basket</span>
                    </div>
                    <div className="bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold px-2 py-1 rounded-full">
                        {basketStats.totalItems}
                    </div>
                </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h2 className="font-bold text-lg mb-4 text-zinc-900 dark:text-white">The NOVA System</h2>
                <div className="space-y-4">
                    <div className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full bg-green-500 shrink-0"></div>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-200">Group 1: Unprocessed</span>
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-500 pl-5">
                            Edible parts of plants or animals, or fungi, algae, and water.
                        </p>
                    </div>

                    <div className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full bg-yellow-400 shrink-0"></div>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-200">Group 2: Culinary Ingredients</span>
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-500 pl-5">
                            Oils, butter, sugar, and salt derived from Group 1 foods.
                        </p>
                    </div>

                    <div className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full bg-orange-500 shrink-0"></div>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-200">Group 3: Processed</span>
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-500 pl-5">
                            Group 1 foods preserved with Group 2 ingredients (canned veg, cheese, bread).
                        </p>
                    </div>

                    <div className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full bg-red-600 shrink-0"></div>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-200">Group 4: Ultra-Processed</span>
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-500 pl-5">
                            Industrial formulations with 5+ ingredients, additives, and little whole food.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h2 className="font-bold text-lg mb-4 text-zinc-900 dark:text-white">Nutri-Score</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    Nutri-Score is a nutritional rating system that classifies food products from A (best nutritional quality) to E (poorest nutritional quality).
                </p>
                <div className="flex items-center justify-between gap-1">
                    {['A', 'B', 'C', 'D', 'E'].map((grade) => (
                        <div key={grade} className={`flex-1 h-8 flex items-center justify-center text-white font-bold text-xs rounded ${grade === 'A' ? 'bg-[#038141]' :
                                grade === 'B' ? 'bg-[#85BB2F]' :
                                    grade === 'C' ? 'bg-[#FECB02]' :
                                        grade === 'D' ? 'bg-[#EE8100]' :
                                            'bg-[#E63E11]'
                            }`}>
                            {grade}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-sm mb-3 text-zinc-900 dark:text-zinc-200">Learn More</h3>
                <ul className="space-y-3 text-sm">
                    <li>
                        <Link href="/about-nova" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                            About NOVA System
                        </Link>
                    </li>
                    <li>
                        <Link href="/disclaimer" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                            Disclaimer
                        </Link>
                    </li>
                    <li className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                        <a
                            href="https://world.openfoodfacts.org/nova"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            <ExternalLink className="w-3 h-3" />
                            OpenFoodFacts: NOVA
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.fao.org/3/ca5644en/ca5644en.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            <ExternalLink className="w-3 h-3" />
                            FAO Report on UPF
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
