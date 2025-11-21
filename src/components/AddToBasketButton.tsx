"use client";

import { useBasket } from "@/hooks/useBasket";
import { Product } from "@/lib/api";
import { CheckCircle, Plus, ShoppingBasket } from "lucide-react";

interface AddToBasketButtonProps {
    product: Product;
}

export function AddToBasketButton({ product }: AddToBasketButtonProps) {
    const { addToBasket, removeFromBasket, isInBasket } = useBasket();
    const inBasket = isInBasket(product.code);

    return (
        <button
            onClick={() => inBasket ? removeFromBasket(product.code) : addToBasket(product)}
            className={`w-full py-4 px-6 rounded-xl text-lg font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg ${inBasket
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 border border-green-200 dark:border-green-800"
                : "bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200"
                }`}
        >
            {inBasket ? (
                <>
                    <CheckCircle className="w-6 h-6" />
                    In Basket
                </>
            ) : (
                <>
                    <ShoppingBasket className="w-6 h-6" />
                    Add to Basket
                </>
            )}
        </button>
    );
}
