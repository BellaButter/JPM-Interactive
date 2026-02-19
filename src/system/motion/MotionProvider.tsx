"use client";

import React, { createContext, useContext, useMemo, ReactNode, useState, useEffect } from "react";
import { MotionConfig, conservativeMotionConfig } from "./motion.config";
import { useReducedMotion } from "./useReducedMotion";
import { useDeviceProfile, DeviceProfile } from "./useDeviceProfile";
import { resolveMotionConfig } from "./motion.guard";

interface MotionContextValue {
    reducedMotion: boolean;
    deviceProfile: DeviceProfile;
    motionConfig: MotionConfig;
    interactionMode: "desktop" | "mobile";
    isReady: boolean;
    isPhone: boolean; // true only for phones (not tablet) — use for lightweight CTA / 3D count
}

const MotionContext = createContext<MotionContextValue | undefined>(undefined);

export function MotionProvider({ children }: { children: ReactNode }) {
    // 1. Hook into browser capabilities (Client-side detection)
    const reducedMotion = useReducedMotion();
    const deviceProfile = useDeviceProfile();

    // 2. State for Config
    // Start with strictly conservative config to match SSR
    const [finalConfig, setFinalConfig] = useState<MotionConfig>(conservativeMotionConfig);
    const [isReady, setIsReady] = useState(false);

    // 3. Effect to Resolve Config (Upgrade Phase)
    useEffect(() => {
        // Resolve the best possible config logic based on detections
        const computedConfig = resolveMotionConfig(conservativeMotionConfig, reducedMotion, deviceProfile);

        // Update state to trigger re-render with enhanced features
        setFinalConfig(computedConfig);
        setIsReady(true);
    }, [reducedMotion, deviceProfile]); // Re-run if these change (e.g. user plugs in mouse)

    // 4. Determine Interaction Mode
    const interactionMode = (deviceProfile.isMobile ? "mobile" : "desktop") as "desktop" | "mobile";

    // 5. Memoize Context Value
    const isPhone = deviceProfile.isPhone;
    const value = useMemo<MotionContextValue>(() => ({
        reducedMotion,
        deviceProfile,
        motionConfig: finalConfig,
        interactionMode,
        isReady,
        isPhone
    }), [reducedMotion, deviceProfile, finalConfig, interactionMode, isReady, isPhone]);

    return (
        <MotionContext.Provider value={value}>
            {children}
        </MotionContext.Provider>
    );
}

// Internal export mostly for testing, usually public API is useMotion
export function useMotionContext() {
    const context = useContext(MotionContext);
    if (!context) {
        throw new Error("useMotionContext must be used within a MotionProvider");
    }
    return context;
}
