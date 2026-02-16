"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { useMotion } from "@/system/motion/useMotion";

function CinematicIcosahedron() {
    const meshRef = useRef<THREE.Group>(null);
    const mainMesh = useRef<THREE.Mesh>(null);
    const wireframeMesh = useRef<THREE.Mesh>(null);

    const { pointer, viewport, clock } = useThree();

    // State for physics/animation that doesn't trigger re-renders
    const state = useRef({
        prevPointer: new THREE.Vector2(0, 0),
        velocity: 0,
        targetScale: 1
    });

    useFrame((_, delta) => {
        if (!meshRef.current || !mainMesh.current || !wireframeMesh.current) return;

        const time = clock.getElapsedTime();

        // --- 1. FIELD CALCULATIONS ---

        // Distance from center (0,0) to pointer (normalized -1 to 1)
        // We use this to determine "Intensity" of the field
        const dist = Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y);

        // Intensity: 1 at center, 0 at edges/corners. Clamped.
        // We multiply dist by 1.2 to slightly gently falloff before the very edge
        const intensity = THREE.MathUtils.clamp(1 - dist * 1.2, 0, 1);

        // Velocity Calculation
        const dx = pointer.x - state.current.prevPointer.x;
        const dy = pointer.y - state.current.prevPointer.y;
        const rawVelocity = Math.sqrt(dx * dx + dy * dy);

        // Smooth velocity
        state.current.velocity = THREE.MathUtils.lerp(state.current.velocity, rawVelocity, 0.1);
        state.current.prevPointer.copy(pointer);

        // --- 2. VISUAL RESPONSES ---

        // Rotation: Base rotation + Proximity amplification
        // If user is interacting (intensity high), we dampen the auto-rotation and favor the mouse look
        const targetRotX = (pointer.y * viewport.height) / 80;
        const targetRotY = (pointer.x * viewport.width) / 50;

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY + time * 0.05, 0.05);

        // Emissive Intensity (Main Mesh)
        if (mainMesh.current.material instanceof THREE.MeshStandardMaterial) {
            // Base 0.1, Max 0.4 based on field intensity
            const targetEmissive = 0.1 + intensity * 0.3;
            mainMesh.current.material.emissiveIntensity = THREE.MathUtils.lerp(
                mainMesh.current.material.emissiveIntensity,
                targetEmissive,
                0.1
            );
        }

        // Wireframe Opacity
        if (wireframeMesh.current.material instanceof THREE.MeshBasicMaterial) {
            // Base 0.05, Max 0.35 based on field intensity
            const targetOpacity = 0.05 + intensity * 0.3;
            wireframeMesh.current.material.opacity = THREE.MathUtils.lerp(
                wireframeMesh.current.material.opacity,
                targetOpacity,
                0.1
            );
        }

        // Scale Pulse (Velocity Based)
        // If moving fast, trigger a slight ripple (scale up then decay)
        if (state.current.velocity > 0.02) {
            state.current.targetScale = 1.05;
        } else {
            state.current.targetScale = 1;
        }

        // Breathing + Velocity Pulse
        const breathe = 1 + Math.sin(time * 0.5) * 0.03;
        const finalScale = THREE.MathUtils.lerp(meshRef.current.scale.x, state.current.targetScale * breathe, 0.1);
        meshRef.current.scale.setScalar(finalScale);
    });

    return (
        <group ref={meshRef}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Core Dark Mirror */}
                <mesh ref={mainMesh}>
                    <icosahedronGeometry args={[2.5, 0]} />
                    <meshStandardMaterial
                        color="#050505"
                        metalness={0.95}
                        roughness={0.1}
                        emissive="#1a2b4b"
                        emissiveIntensity={0.1}
                        envMapIntensity={1}
                    />
                </mesh>

                {/* Wireframe Glow Shell */}
                <mesh ref={wireframeMesh} scale={[1.05, 1.05, 1.05]}>
                    <icosahedronGeometry args={[2.5, 1]} />
                    <meshBasicMaterial
                        color="#3b82f6"
                        wireframe={true}
                        transparent={true}
                        opacity={0.05}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            </Float>
        </group>
    );
}

function ReactiveParticles() {
    const pointsRef = useRef<THREE.Points>(null);
    const { pointer } = useThree();
    const count = 200; // Small custom group

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 25;   // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 25; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z (mostly behind)
        }
        return pos;
    }, []);

    useFrame(() => {
        if (!pointsRef.current) return;

        // Slight rotation following mouse
        pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, pointer.y * 0.1, 0.02);
        pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, pointer.x * 0.1, 0.02);

        // Scale reaction based on simple pointer distance factor calculated in parent
        // Just keeping it subtle here:
        // If pointer is near center, maybe expand slightly? 
        // Let's keep it simple: constant subtle drift.
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#4b5563"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
}

function MovingLights() {
    const lightRef = useRef<THREE.PointLight>(null);

    useFrame(({ clock }) => {
        if (!lightRef.current) return;
        const t = clock.getElapsedTime() * 0.2;

        lightRef.current.position.x = Math.sin(t) * 15;
        lightRef.current.position.z = Math.cos(t) * 15;
    });

    return (
        <>
            <pointLight ref={lightRef} color="#3b82f6" intensity={2} distance={40} position={[10, 10, 10]} />
            <spotLight position={[0, 15, -10]} intensity={1.5} color="#ffffff" angle={0.5} penumbra={1} />
            <pointLight position={[-10, -10, 5]} intensity={0.5} color="#4c1d95" />
        </>
    );
}

export default function HeroCanvas() {
    const { motionConfig } = useMotion();

    if (!motionConfig.enable3D) return null;

    return (
        <Canvas
            camera={{ position: [0, 0, 9], fov: 35 }}
            dpr={[1, 1.5]}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                toneMapping: THREE.ACESFilmicToneMapping
            }}
            onCreated={({ gl }) => {
                gl.setClearColor("#000000", 0);
            }}
        >
            <fog attach="fog" args={["#0a0a0a", 8, 25]} />

            <CinematicIcosahedron />
            <ReactiveParticles />
            <MovingLights />

            <Environment preset="city" />
        </Canvas>
    );
}
