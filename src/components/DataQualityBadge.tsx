import { Product } from "@/lib/api";
import { calculateDataQuality } from "@/lib/dataQuality";
import { Database } from "lucide-react";

interface DataQualityBadgeProps {
    product: Product;
    className?: string;
    showLabel?: boolean;
}

export function DataQualityBadge({ product, className = "", showLabel = true }: DataQualityBadgeProps) {
    const { score, grade, missingFields } = calculateDataQuality(product);

    const styles = {
        A: "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
        B: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
        C: "text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
        D: "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    }[grade];

    return (
        <div className={`group relative inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium cursor-help ${styles} ${className}`}>
            <Database className="w-3 h-3" />
            {showLabel && <span>Data: {grade}</span>}

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-zinc-900 dark:bg-zinc-800 text-white p-3 rounded-lg shadow-xl text-xs hidden group-hover:block z-50 pointer-events-none">
                <div className="font-bold mb-1 border-b border-zinc-700 pb-1">Data Quality Score: {score}/100</div>
                {missingFields.length > 0 ? (
                    <>
                        <p className="mb-1 text-zinc-400">Missing information:</p>
                        <ul className="list-disc pl-4 space-y-0.5 text-zinc-300">
                            {missingFields.map(f => <li key={f}>{f}</li>)}
                        </ul>
                    </>
                ) : (
                    <p className="text-green-400">Excellent data completeness.</p>
                )}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-zinc-900 dark:bg-zinc-800"></div>
            </div>
        </div>
    );
}
