export interface MotionConfig {
    enable3D: boolean;
    enableScrollPin: boolean;
    enableCursorEffects: boolean;
    enableHeavyShaders: boolean;
}

// Conservative default for SSR and initial load.
// We start with everything DISABLED to ensure fast TTI and no heavy execution
// before we know the device capabilities.
export const conservativeMotionConfig: MotionConfig = {
    enable3D: false,
    enableScrollPin: false,
    enableCursorEffects: false,
    enableHeavyShaders: false,
};

// Target config for high-end devices
export const baseMotionConfig: MotionConfig = {
    enable3D: true,
    enableScrollPin: true,
    enableCursorEffects: true,
    enableHeavyShaders: true,
};
