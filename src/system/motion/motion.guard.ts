import { MotionConfig, conservativeMotionConfig } from "./motion.config";
import { DeviceProfile } from "./useDeviceProfile";

/**
 * Resolves the final motion configuration based on user preference and device capability.
 * This acts as the central logic gate for feature flags.
 * 
 * STRATEGY: Start conservative, then upgrade if safe.
 */
export function resolveMotionConfig(
    baseConfig: MotionConfig,
    reducedMotion: boolean,
    deviceProfile: DeviceProfile
): MotionConfig {

    // 1. Critical Safeguard: Reduced Motion Preference
    // If user explicitly requests reduced motion, we stay conservative.
    if (reducedMotion) {
        return conservativeMotionConfig;
    }

    // Start with conservative defaults
    const config = { ...conservativeMotionConfig };

    // 2. Upgrade 3D: If NOT low-end
    // We enable 3D for mid-tier and up.
    if (!deviceProfile.isLowEnd) {
        config.enable3D = true;
    }

    // 3. Upgrade Cursor: If Fine Pointer AND Not Mobile
    // Cursor effects only make sense with a mouse.
    if (deviceProfile.hasFinePointer && !deviceProfile.isMobile) {
        config.enableCursorEffects = true;
    }

    // 4. Upgrade Scroll Pinning: Desktop and Mobile (full-screen CTA scroll experience)
    config.enableScrollPin = true;

    // 5. Upgrade Heavy Shaders: Only High Tier
    // Expensive fragment shaders are reserved for powerful devices.
    if (deviceProfile.performanceTier === "high") {
        config.enableHeavyShaders = true;
    }

    return config;
}
