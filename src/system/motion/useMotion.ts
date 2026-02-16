"use client";

import { useMotionContext } from "./MotionProvider";

/**
 * Public hook to access the global motion governance system.
 * Use this in any component to determine if it should render 3D, complex animations, or simplified fallbacks.
 * 
 * @returns {MotionContextValue} The current motion context value
 * @throws Will throw an error if used outside of <MotionProvider />
 */
export function useMotion() {
    return useMotionContext();
}
