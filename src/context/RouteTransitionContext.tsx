"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type RouteTransitionContextType = {
    isTransitioningToWorks: boolean;
    worksPageReady: boolean;
    startWorksTransition: () => void;
    setWorksPageReady: () => void;
    clearTransition: () => void;
};

const RouteTransitionContext = createContext<RouteTransitionContextType | null>(null);

export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isTransitioningToWorks, setIsTransitioningToWorks] = useState(false);
    const [worksPageReady, setWorksPageReadyState] = useState(false);

    const startWorksTransition = useCallback(() => {
        setWorksPageReadyState(false);
        setIsTransitioningToWorks(true);
        router.push("/works");
    }, [router]);

    const setWorksPageReady = useCallback(() => setWorksPageReadyState(true), []);

    const clearTransition = useCallback(() => {
        setIsTransitioningToWorks(false);
        setWorksPageReadyState(false);
    }, []);

    return (
        <RouteTransitionContext.Provider
            value={{
                isTransitioningToWorks,
                worksPageReady,
                startWorksTransition,
                setWorksPageReady,
                clearTransition,
            }}
        >
            {children}
        </RouteTransitionContext.Provider>
    );
}

export function useRouteTransition() {
    const ctx = useContext(RouteTransitionContext);
    if (!ctx) return null;
    return ctx;
}
