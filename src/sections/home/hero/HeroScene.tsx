"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { useMotion } from "@/system/motion/useMotion";

function SceneContent() {
    const meshRef = useRef<THREE.Group>(null);
    const mainMesh = useRef<THREE.Mesh>(null);
    const wireframeMesh = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    const { pointer, viewport, clock } = useThree();
    const { motionConfig } = useMotion();

    // Interaction Settings
    const intensity = motionConfig.enableHeavyShaders ? 0.2 : 0.05;

    useFrame((state) => {
        if (!meshRef.current || !lightRef.current || !mainMesh.current || !wireframeMesh.current) return;

        const time = state.clock.getElapsedTime();

        // 1. POINTER ROTATION (Lerped)
        // Smoothly interpolate rotation based on pointer
        const targetX = (pointer.y * viewport.height) / 100; // Very subtle vertical tilt
        const targetY = (pointer.x * viewport.width) / 10;   // Horizontal rotation

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY + time * 0.05, 0.05); // Add slow auto-rotation

        // 2. BREATHING ANIMATION
        // Gentle scale oscillation
        const breathe = 1 + Math.sin(time * 0.5) * 0.02;
        meshRef.current.scale.setScalar(breathe);

        // 3. PROXIMITY INTENSITY
        // Calculate distance from center (0,0) to pointer
        // Normalizing pointer distance (0 at center, ~1.4 at corners)
        const dist = Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y);
        const proximity = Math.max(0, 1 - dist); // 1 at center, 0 at edges

        // boost emissive on main mesh
        if (mainMesh.current.material instanceof THREE.MeshStandardMaterial) {
            mainMesh.current.material.emissiveIntensity = THREE.MathUtils.lerp(
                mainMesh.current.material.emissiveIntensity,
                0.1 + proximity * 0.3, // Baseline 0.1, max 0.4
                0.1
            );
        }

        // boost wireframe opacity
        if (wireframeMesh.current.material instanceof THREE.MeshBasicMaterial) {
            wireframeMesh.current.material.opacity = THREE.MathUtils.lerp(
                wireframeMesh.current.material.opacity,
                0.1 + proximity * 0.2, // Baseline 0.1, max 0.3
                0.1
            );
        }

        // 4. DRIFTING LIGHTS
        // Key light moves in a slow arc
        lightRef.current.position.x = Math.sin(time * 0.2) * 10;
        lightRef.current.position.z = Math.cos(time * 0.2) * 10;
        lightRef.current.position.y = Math.sin(time * 0.1) * 5;
    });

    return (
        <group ref={meshRef}>
            <Float
                speed={2}
                rotationIntensity={0.2}
                floatIntensity={0.5}
                floatingRange={[-0.2, 0.2]}
            >
                {/* 1. CORE SOLID FORM */}
                <mesh ref={mainMesh}>
                    <icosahedronGeometry args={[2, 1]} /> {/* Detail level 1 for architectural look */}
                    <meshStandardMaterial
                        color="#050505"
                        roughness={0.2}
                        metalness={0.9}
                        emissive="#1a2b4b"
                        emissiveIntensity={0.1}
                        flatShading={true} // Faceted look
                    />
                </mesh>

                {/* 2. WIREFRAME SHELL */}
                <mesh ref={wireframeMesh} scale={[1.02, 1.02, 1.02]}>
                    <icosahedronGeometry args={[2, 1]} />
                    <meshBasicMaterial
                        color="#3b82f6"
                        wireframe={true}
                        transparent
                        opacity={0.1}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            </Float>

            {/* CINEMATIC LIGHTING RIG */}

            {/* Drifting Key Light (Blue/Cyan) */}
            <pointLight
                ref={lightRef}
                color="#3b82f6"
                intensity={2}
                distance={40}
                decay={2}
            />

            {/* Rim Light (White/Cool) - Backlighting */}
            <spotLight
                position={[0, 10, -10]}
                angle={0.5}
                penumbra={1}
                intensity={1}
                color="#ffffff"
            />

            {/* Fill Light (Deep Purple/Blue) - Underlighting */}
            <pointLight
                position={[-5, -10, 5]}
                intensity={0.5}
                color="#1e1b4b"
            />
        </group>
    );
}

export default function HeroScene({ enable3D }: { enable3D: boolean }) {
    // Canvas is ALWAYS mounted.
    return (
        <div className="absolute inset-0 w-full h-full z-0 h-full w-full">
            {/* 4. BACKGROUND DEPTH (CSS Radial) */}
            <div
                className="absolute inset-0 z-[-1] pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, #111827 0%, #0a0a0a 70%)',
                    opacity: 0.8
                }}
            />

            <Canvas
                camera={{ position: [0, 0, 8], fov: 40 }} // Narrower FOV for cinematic look
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true, // Allow CSS background to show through
                    powerPreference: "high-performance",
                    toneMapping: THREE.ACESFilmicToneMapping, // Cinematic coloring
                    toneMappingExposure: 1.2
                }}
                onCreated={({ gl }) => {
                    // Transparent clear color so CSS gradient shows
                    gl.setClearColor("#000000", 0);
                }}
            >
                {/* 5. ATMOSPHERE */}
                <fog attach="fog" args={["#0a0a0a", 5, 25]} />

                {enable3D && (
                    <>
                        <SceneContent />
                        {/* Subtle Environment Reflection */}
                        <Environment preset="city" />
                    </>
                )}
            </Canvas>
        </div>
    );
}
