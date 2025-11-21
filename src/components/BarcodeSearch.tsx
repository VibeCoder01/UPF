"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BarcodeSearch() {
    const [barcode, setBarcode] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (barcode.trim()) {
            router.push(`/product/${barcode.trim()}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
                type="text"
                placeholder="Enter barcode..."
                className="block w-full pl-9 pr-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg leading-5 bg-white dark:bg-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 text-sm transition duration-150 ease-in-out"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
            />
        </form>
    );
}
