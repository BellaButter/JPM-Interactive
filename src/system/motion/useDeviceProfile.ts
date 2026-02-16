"use client";

import { useState, useEffect } from "react";

// Extend Navigator interface strictly for experimental API properties
interface ExtendedNavigator extends Navigator {
    deviceMemory?: number;
    hardwareConcurrency: number; // Must be required to match Navigator
}

export type PerformanceTier = "low" | "medium" | "high";

export interface DeviceProfile {
    isMobile: boolean;
    isLowEnd: boolean;
    hasFinePointer: boolean;
    performanceTier: PerformanceTier;
    cpuCores: number | undefined;
    memoryGB: number | undefined;
}

// Conservative SSR defaults to avoid hydration mismatch
// We assume a 'capable' desktop initially to render full content for SEO/SSR,
// then degrade gracefully on client if needed.
const defaultProfile: DeviceProfile = {
    isMobile: false,
    isLowEnd: false,
    hasFinePointer: true,
    performanceTier: "high",
    cpuCores: undefined,
    memoryGB: undefined,
};

/**
 * Hook to detect detailed device capabilities.
 * Determines performance tier based on CPU cores and RAM.
 */
export function useDeviceProfile(): DeviceProfile {
    // 1. Initialize with specific default state
    const [profile, setProfile] = useState<DeviceProfile>(defaultProfile);

    useEffect(() => {
        // Safe check for browser environment
        if (typeof window === "undefined" || typeof navigator === "undefined") {
            return;
        }

        const nav = navigator as ExtendedNavigator;

        // --- 1. Interaction Detection ---
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
        const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(nav.userAgent);

        const isMobile = isMobileUA || hasCoarsePointer;

        // --- 2. Hardware Detection ---
        // deviceMemory is in GB (RAM)
        // hardwareConcurrency is logical cores
        const cpuCores = nav.hardwareConcurrency;
        const memoryGB = nav.deviceMemory;

        // --- 3. Performance Tiering ---
        let tier: PerformanceTier = "high";
        let lowEnd = false;

        // Logic:
        // High: > 4 cores AND > 4GB RAM (Modern Desktop/High-end Mobile)
        // Mid:  <= 4 cores OR <= 4GB RAM 
        // Low:  < 4 cores OR < 2GB RAM (Old phones/Laptops)

        if (cpuCores && memoryGB) {
            if (cpuCores <= 4 || memoryGB <= 4) {
                tier = "medium";
            }
            if (cpuCores < 4 || memoryGB < 4) {
                tier = "low";
                lowEnd = true;
            }
        } else {
            // Fallback if APIs are missing (Safari/Firefox often hide this info):
            // If mobile -> assume medium
            // If desktop -> assume high
            if (isMobile) {
                tier = "medium";
            }
        }

        // --- 4. State Update ---
        setProfile({
            isMobile,
            isLowEnd: lowEnd,
            hasFinePointer,
            performanceTier: tier,
            cpuCores,
            memoryGB
        });

    }, []); // Run once on mount

    return profile;
}
