"use client";

import { useBasket } from "@/hooks/useBasket";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

export function BasketSummary() {
    const { basketStats } = useBasket();
    const { totalItems, novaDistribution, upfPercentage } = basketStats;

    if (totalItems === 0) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 text-center">
                <Info className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">Your basket is empty</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Add products to see a health analysis.</p>
            </div>
        );
    }

    const getVerdict = () => {
        if (upfPercentage < 20) return { text: "Excellent! Low in ultra-processed foods.", color: "text-green-600 dark:text-green-400" };
        if (upfPercentage < 50) return { text: "Moderate. Some ultra-processed foods present.", color: "text-yellow-600 dark:text-yellow-400" };
        return { text: "High in ultra-processed foods. Consider swapping some items.", color: "text-red-600 dark:text-red-400" };
    };

    const verdict = getVerdict();

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Basket Analysis</h2>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">UPF Content</span>
                    <span className={`text-lg font-bold ${verdict.color}`}>{upfPercentage}%</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                    <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${upfPercentage < 20 ? 'bg-green-500' : upfPercentage < 50 ? 'bg-yellow-400' : 'bg-red-500'
                            }`}
                        style={{ width: `${upfPercentage}%` }}
                    ></div>
                </div>
                <p className={`mt-2 text-sm font-medium ${verdict.color} flex items-center gap-2`}>
                    {upfPercentage >= 50 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    {verdict.text}
                </p>
            </div>

            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">NOVA Breakdown</h3>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                        <div className="text-xs text-green-700 dark:text-green-400 font-medium mb-1">Unprocessed (NOVA 1)</div>
                        <div className="text-2xl font-bold text-green-800 dark:text-green-300">{novaDistribution[1]}</div>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                        <div className="text-xs text-yellow-700 dark:text-yellow-400 font-medium mb-1">Culinary (NOVA 2)</div>
                        <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">{novaDistribution[2]}</div>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-900/30">
                        <div className="text-xs text-orange-700 dark:text-orange-400 font-medium mb-1">Processed (NOVA 3)</div>
                        <div className="text-2xl font-bold text-orange-800 dark:text-orange-300">{novaDistribution[3]}</div>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                        <div className="text-xs text-red-700 dark:text-red-400 font-medium mb-1">Ultra-Processed (NOVA 4)</div>
                        <div className="text-2xl font-bold text-red-800 dark:text-red-300">{novaDistribution[4]}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
