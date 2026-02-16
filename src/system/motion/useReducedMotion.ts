"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if the user has requested the system to minimize the amount
 * of non-essential motion it uses.
 * 
 * Safe for SSR (Defaults to false).
 */
export function useReducedMotion(): boolean {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        // SSR Safe Check
        if (typeof window === "undefined" || !window.matchMedia) {
            return;
        }

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        // Set initial value
        setMatches(mediaQuery.matches);

        // Define listener
        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Modern event listener
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", listener);
            return () => mediaQuery.removeEventListener("change", listener);
        } else {
            // Fallback for older browsers (though unlikely needed for modern apps)
            mediaQuery.addListener(listener);
            return () => mediaQuery.removeListener(listener);
        }
    }, []);

    return matches;
}
