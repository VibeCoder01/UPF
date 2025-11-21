"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface LayoutContextType {
    isFullWidth: boolean;
    toggleFullWidth: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
    const [isFullWidth, setIsFullWidth] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("upf-layout-fullwidth");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Validate it's a boolean
                if (typeof parsed === 'boolean') {
                    setIsFullWidth(parsed);
                } else {
                    console.warn("Invalid layout preference, using default");
                    localStorage.removeItem("upf-layout-fullwidth");
                }
            } catch (e) {
                console.error("Failed to parse layout preference", e);
                localStorage.removeItem("upf-layout-fullwidth");
            }
        }
    }, []);

    const toggleFullWidth = () => {
        setIsFullWidth((prev) => {
            const newValue = !prev;
            localStorage.setItem("upf-layout-fullwidth", JSON.stringify(newValue));
            return newValue;
        });
    };

    return (
        <LayoutContext.Provider value={{ isFullWidth, toggleFullWidth }}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayout() {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
}
