"use client";

import { Product } from "@/lib/api";
import { ProductCard } from "./ProductCard";
import { useMemo, useState } from "react";
import { Filter, Globe, Search } from "lucide-react";

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<string>("all");
    const [selectedNovaGroups, setSelectedNovaGroups] = useState<Set<number>>(new Set([1, 2, 3, 4]));

    // Extract unique countries from products
    const countries = useMemo(() => {
        const countrySet = new Set<string>();
        products.forEach((product) => {
            if (product.countries) {
                // Split by comma in case multiple countries are listed
                product.countries.split(',').forEach((country) => {
                    const trimmed = country.trim();
                    if (trimmed) countrySet.add(trimmed);
                });
            }
        });
        return Array.from(countrySet).sort();
    }, [products]);

    const toggleNovaGroup = (group: number) => {
        const newSet = new Set(selectedNovaGroups);
        if (newSet.has(group)) {
            newSet.delete(group);
        } else {
            newSet.add(group);
        }
        setSelectedNovaGroups(newSet);
    };

    const filteredProducts = products.filter((product) => {
        // Search filter
        const query = searchQuery.toLowerCase();
        const name = product.product_name?.toLowerCase() || "";
        const brands = product.brands?.toLowerCase() || "";
        const matchesSearch = name.includes(query) || brands.includes(query);

        // Country filter
        const matchesCountry = selectedCountry === "all" ||
            (product.countries && product.countries.includes(selectedCountry));

        // NOVA filter - show if selected
        const matchesNova = selectedNovaGroups.has(product.nova_group);

        return matchesSearch && matchesCountry && matchesNova;
    });

    const getNovaColor = (nova: number) => {
        switch (nova) {
            case 1: return "bg-green-500";
            case 2: return "bg-yellow-400";
            case 3: return "bg-orange-500";
            case 4: return "bg-red-600";
            default: return "bg-gray-400";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                {/* Top row: Search and Country */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-zinc-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products or brands..."
                            className="block w-full pl-10 pr-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg leading-5 bg-white dark:bg-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm transition duration-150 ease-in-out"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Country Filter */}
                    <div className="relative sm:w-48">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-5 w-5 text-zinc-400" />
                        </div>
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg leading-5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm transition duration-150 ease-in-out"
                        >
                            <option value="all">All Countries</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* NOVA Filter Checkboxes */}
                <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        <Filter className="h-4 w-4" />
                        <span>NOVA Groups:</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {[1, 2, 3, 4].map((group) => (
                            <label
                                key={group}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedNovaGroups.has(group)}
                                    onChange={() => toggleNovaGroup(group)}
                                    className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-600 text-zinc-900 focus:ring-2 focus:ring-zinc-500"
                                />
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${getNovaColor(group)}`}></div>
                                    <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                                        {group === 1 && "Unprocessed"}
                                        {group === 2 && "Culinary"}
                                        {group === 3 && "Processed"}
                                        {group === 4 && "Ultra-Processed"}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.code} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                        No products found matching your filters
                    </p>
                </div>
            )}
        </div>
    );
}
