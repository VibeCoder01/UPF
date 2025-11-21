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
            setIsFullWidth(JSON.parse(saved));
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
