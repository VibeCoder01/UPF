"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Product } from '@/lib/api';

export interface BasketItem extends Product {
    quantity: number;
}

interface BasketStats {
    totalItems: number;
    novaDistribution: Record<1 | 2 | 3 | 4, number>;
    upfPercentage: number; // Percentage of items that are NOVA 4
}

interface BasketContextType {
    basketItems: BasketItem[];
    addToBasket: (product: Product) => void;
    removeFromBasket: (code: string) => void;
    updateQuantity: (code: string, quantity: number) => void;
    clearBasket: () => void;
    basketStats: BasketStats;
    isInBasket: (code: string) => boolean;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: ReactNode }) {
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedBasket = localStorage.getItem('upf-basket');
        if (savedBasket) {
            try {
                setBasketItems(JSON.parse(savedBasket));
            } catch (e) {
                console.error("Failed to parse basket from localStorage", e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save to localStorage whenever basket changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('upf-basket', JSON.stringify(basketItems));
        }
    }, [basketItems, isInitialized]);

    const addToBasket = (product: Product) => {
        setBasketItems(prev => {
            const existing = prev.find(item => item.code === product.code);
            if (existing) {
                return prev.map(item =>
                    item.code === product.code
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromBasket = (code: string) => {
        setBasketItems(prev => prev.filter(item => item.code !== code));
    };

    const updateQuantity = (code: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromBasket(code);
            return;
        }
        setBasketItems(prev =>
            prev.map(item => item.code === code ? { ...item, quantity } : item)
        );
    };

    const clearBasket = () => {
        setBasketItems([]);
    };

    const isInBasket = (code: string) => {
        return basketItems.some(item => item.code === code);
    };

    // Calculate stats
    const basketStats: BasketStats = {
        totalItems: basketItems.reduce((acc, item) => acc + item.quantity, 0),
        novaDistribution: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
        },
        upfPercentage: 0,
    };

    basketItems.forEach(item => {
        const nova = item.nova_group as 1 | 2 | 3 | 4;
        if (nova >= 1 && nova <= 4) {
            basketStats.novaDistribution[nova] += item.quantity;
        }
    });

    if (basketStats.totalItems > 0) {
        basketStats.upfPercentage = Math.round(
            (basketStats.novaDistribution[4] / basketStats.totalItems) * 100
        );
    }

    return (
        <BasketContext.Provider value={{
            basketItems,
            addToBasket,
            removeFromBasket,
            updateQuantity,
            clearBasket,
            basketStats,
            isInBasket
        }}>
            {children}
        </BasketContext.Provider>
    );
}

export function useBasket() {
    const context = useContext(BasketContext);
    if (context === undefined) {
        throw new Error('useBasket must be used within a BasketProvider');
    }
    return context;
}
