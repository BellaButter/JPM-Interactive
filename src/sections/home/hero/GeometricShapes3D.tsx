"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface ShapeData {
    id: number;
    ref: React.RefObject<THREE.Object3D | null>;
    velocityRef: React.MutableRefObject<THREE.Vector3>;
}

interface PhysicsShapeProps {
    children: React.ReactNode;
    initialPosition: [number, number, number];
    shapeId: number;
    allShapesRef: React.MutableRefObject<ShapeData[]>;
}

interface SpecificShapeProps {
    position: [number, number, number];
    scale?: number;
    shapeId: number;
    allShapesRef: React.MutableRefObject<ShapeData[]>;
}

// Physics-enabled shape wrapper
function PhysicsShape({
    children,
    initialPosition,
    shapeId,
    allShapesRef
}: PhysicsShapeProps) {
    const meshRef = useRef<THREE.Group>(null);
    const velocityRef = useRef(new THREE.Vector3());
    const scaleRef = useRef(1);
    const rotationVelocityRef = useRef(0);
    const prevMousePosRef = useRef(new THREE.Vector3());
    const { viewport, pointer, invalidate } = useThree();

    // Register this shape's ref
    useEffect(() => {
        if (meshRef.current && allShapesRef) {
            const shapeData: ShapeData = {
                id: shapeId,
                ref: meshRef,
                velocityRef: velocityRef
            };
            allShapesRef.current = [...allShapesRef.current, shapeData];

            return () => {
                allShapesRef.current = allShapesRef.current.filter((s) => s.id !== shapeId);
            };
        }
    }, [shapeId, allShapesRef]);

    useFrame(() => {
        if (!meshRef.current) return;

        const mesh = meshRef.current;
        const velocity = velocityRef.current;

        const mouseX = (pointer.x * viewport.width) / 2;
        const mouseY = (pointer.y * viewport.height) / 2;
        const mousePos = new THREE.Vector3(mouseX, mouseY, 0);

        const mouseVelocity = new THREE.Vector3()
            .subVectors(mousePos, prevMousePosRef.current);
        prevMousePosRef.current.copy(mousePos);

        // 1. MOUSE INTERACTION - XY distance only (deep shapes respond same as front)
        const mouseDistanceXY = Math.hypot(
            mesh.position.x - mousePos.x,
            mesh.position.y - mousePos.y
        );
        const influenceRadius = 5;

        if (mouseDistanceXY < influenceRadius) {
            const influence = 1 - (mouseDistanceXY / influenceRadius);
            const pushStrength = influence * 0.18;

            if (mouseVelocity.length() > 0.001) {
                velocity.add(mouseVelocity.multiplyScalar(pushStrength));
            }

            const dx = mesh.position.x - mousePos.x;
            const dy = mesh.position.y - mousePos.y;
            const len = Math.hypot(dx, dy) || 0.001;
            velocity.add(new THREE.Vector3(
                (dx / len) * influence * 0.04,
                (dy / len) * influence * 0.04,
                0
            ));

            scaleRef.current = Math.min(scaleRef.current + 0.04, 1.2);
            if (mouseVelocity.length() > 0.01) {
                const angle = Math.atan2(mouseVelocity.y, mouseVelocity.x);
                rotationVelocityRef.current += angle * 0.0015;
            }
        } else {
            scaleRef.current = Math.max(scaleRef.current - 0.02, 1);
            rotationVelocityRef.current *= 0.97;
        }

        mesh.scale.setScalar(scaleRef.current);
        mesh.rotation.z += rotationVelocityRef.current;
        rotationVelocityRef.current *= 0.98;

        // 2. BOUNDARY - soft bounce
        const boundaryPadding = 1.5;
        const bounds = {
            left: -viewport.width / 2 + boundaryPadding,
            right: viewport.width / 2 - boundaryPadding,
            top: viewport.height / 2 - boundaryPadding,
            bottom: -viewport.height / 2 + boundaryPadding,
        };
        if (mesh.position.x < bounds.left) {
            mesh.position.x = bounds.left;
            velocity.x = -velocity.x * 0.35;
        } else if (mesh.position.x > bounds.right) {
            mesh.position.x = bounds.right;
            velocity.x = -velocity.x * 0.35;
        }
        if (mesh.position.y < bounds.bottom) {
            mesh.position.y = bounds.bottom;
            velocity.y = -velocity.y * 0.35;
        } else if (mesh.position.y > bounds.top) {
            mesh.position.y = bounds.top;
            velocity.y = -velocity.y * 0.35;
        }
        const zBounds = { min: -5, max: 2 };
        if (mesh.position.z < zBounds.min) {
            mesh.position.z = zBounds.min;
            velocity.z = -velocity.z * 0.35;
        } else if (mesh.position.z > zBounds.max) {
            mesh.position.z = zBounds.max;
            velocity.z = -velocity.z * 0.35;
        }

        // 3. SEPARATION + COLLISION
        const separationRadius = 2.8;
        const separationStrength = 0.035;
        const collisionRadius = 1.4;
        const repulsionStrength = 0.07;
        const bounceDamping = 0.25;

        if (allShapesRef?.current) {
            allShapesRef.current.forEach((otherShape) => {
                if (otherShape.id === shapeId || !otherShape.ref?.current) return;
                const otherMesh = otherShape.ref.current;
                const distance = mesh.position.distanceTo(otherMesh.position);
                if (distance < 0.01) return;

                const direction = new THREE.Vector3()
                    .subVectors(mesh.position, otherMesh.position)
                    .normalize();

                if (distance < separationRadius) {
                    const push = (separationRadius - distance) * separationStrength;
                    velocity.add(direction.clone().multiplyScalar(push));
                }

                if (distance < collisionRadius) {
                    const overlap = collisionRadius - distance;
                    velocity.add(direction.clone().multiplyScalar(overlap * repulsionStrength));

                    if (otherShape.velocityRef?.current) {
                        const otherVelocity = otherShape.velocityRef.current;
                        const relativeVelocity = new THREE.Vector3().subVectors(velocity, otherVelocity);
                        const velocityAlongNormal = relativeVelocity.dot(direction);
                        if (velocityAlongNormal < 0) {
                            velocity.sub(direction.clone().multiplyScalar(velocityAlongNormal * bounceDamping));
                        }
                    } else {
                        velocity.add(direction.clone().multiplyScalar(repulsionStrength * 0.3 * bounceDamping));
                    }
                    scaleRef.current = Math.min(scaleRef.current + 0.01, 1.15);
                    rotationVelocityRef.current += Math.atan2(direction.y, direction.x) * 0.003;
                }
            });
        }

        // 5. Damping
        velocity.multiplyScalar(0.94);
        mesh.position.add(velocity);

        // Demand render — only paint when physics produces visible movement
        invalidate();
    });

    return (
        <group ref={meshRef} position={initialPosition}>
            {children}
        </group>
    );
}

// Shape components — reduced segment counts for better performance
function CrossShape({ position, scale = 1, shapeId, allShapesRef }: SpecificShapeProps) {
    return (
        <PhysicsShape initialPosition={position} shapeId={shapeId} allShapesRef={allShapesRef}>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
                <group scale={scale}>
                    {/* reduced segments: 32 → 16 */}
                    <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                        <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
                        <meshPhysicalMaterial
                            color="#4488ff"
                            metalness={0.1}
                            roughness={0.2}
                            transmission={0.6}
                            thickness={1.5}
                            envMapIntensity={2}
                            clearcoat={0.3}
                            clearcoatRoughness={0.2}
                            transparent={true}
                            opacity={0.85}
                            ior={1.4}
                            iridescence={0.8}
                            sheenColor="#ff44ff"
                            sheen={0.5}
                        />
                    </mesh>
                    <mesh castShadow receiveShadow>
                        <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
                        <meshPhysicalMaterial
                            color="#4488ff"
                            metalness={0.1}
                            roughness={0.2}
                            transmission={0.6}
                            thickness={1.5}
                            envMapIntensity={2}
                            clearcoat={0.3}
                            clearcoatRoughness={0.2}
                            transparent={true}
                            opacity={0.85}
                            ior={1.4}
                            iridescence={0.8}
                            sheenColor="#ff44ff"
                            sheen={0.5}
                        />
                    </mesh>
                </group>
            </Float>
        </PhysicsShape>
    );
}

function TorusShape({ position, scale = 1, shapeId, allShapesRef }: SpecificShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { invalidate } = useThree();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.005;
            invalidate();
        }
    });

    return (
        <PhysicsShape initialPosition={position} shapeId={shapeId} allShapesRef={allShapesRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* reduced segments: (32, 64) → (16, 32) */}
                <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
                    <torusGeometry args={[1, 0.4, 16, 32]} />
                    <meshPhysicalMaterial
                        color="#ff44ff"
                        metalness={0.1}
                        roughness={0.2}
                        transmission={0.6}
                        thickness={1.5}
                        envMapIntensity={2}
                        clearcoat={0.3}
                        clearcoatRoughness={0.2}
                        transparent={true}
                        opacity={0.85}
                        ior={1.4}
                        iridescence={0.8}
                        sheenColor="#44ffff"
                        sheen={0.5}
                    />
                </mesh>
            </Float>
        </PhysicsShape>
    );
}

function CylinderShape({ position, scale = 1, shapeId, allShapesRef }: SpecificShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { invalidate } = useThree();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            invalidate();
        }
    });

    return (
        <PhysicsShape initialPosition={position} shapeId={shapeId} allShapesRef={allShapesRef}>
            <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.5}>
                {/* reduced segments: 64 → 32 */}
                <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
                    <cylinderGeometry args={[0.8, 0.8, 1.5, 32]} />
                    <meshPhysicalMaterial
                        color="#ff4488"
                        metalness={0.1}
                        roughness={0.2}
                        transmission={0.6}
                        thickness={1.5}
                        envMapIntensity={2}
                        clearcoat={0.3}
                        clearcoatRoughness={0.2}
                        transparent={true}
                        opacity={0.85}
                        ior={1.4}
                        iridescence={0.8}
                        sheenColor="#ffff44"
                        sheen={0.5}
                    />
                </mesh>
            </Float>
        </PhysicsShape>
    );
}

// Scene component with shape tracking
function Scene({ isMobile = false }: { isMobile?: boolean }) {
    const allShapesRef = useRef<ShapeData[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Desktop: 10 shapes. Mobile: fewer & smaller for less crowding
    const desktopShapes = [
        { id: 1, Component: CrossShape, position: [-2, 1, 0] as [number, number, number], scale: 1 },
        { id: 2, Component: TorusShape, position: [2, -1, -1] as [number, number, number], scale: 0.8 },
        { id: 3, Component: CylinderShape, position: [0, 2, -2] as [number, number, number], scale: 0.6 },
        { id: 4, Component: CrossShape, position: [-3, -2, 1] as [number, number, number], scale: 0.7 },
        { id: 5, Component: TorusShape, position: [3, 2, 0] as [number, number, number], scale: 0.9 },
        { id: 6, Component: CylinderShape, position: [1, -2, -1] as [number, number, number], scale: 0.5 },
        { id: 7, Component: CrossShape, position: [0, 0, 0] as [number, number, number], scale: 1.2 },
        { id: 8, Component: TorusShape, position: [-1.5, -1.5, -1.5] as [number, number, number], scale: 0.75 },
        { id: 9, Component: CylinderShape, position: [2.5, 0.5, -0.5] as [number, number, number], scale: 0.65 },
        { id: 10, Component: CrossShape, position: [-2.5, 2.5, 0.5] as [number, number, number], scale: 0.85 },
    ];

    const mobileScale = 0.42;
    const mobilePosScale = 0.65;
    const mobileShapes = desktopShapes.slice(0, 4).map((s) => ({
        ...s,
        position: [s.position[0] * mobilePosScale, s.position[1] * mobilePosScale, s.position[2]] as [number, number, number],
        scale: s.scale * mobileScale
    }));

    const shapes = isMobile ? mobileShapes : desktopShapes;

    if (!mounted) return null;

    return (
        <>
            {/* Intense colorful lighting for deep vibrant colors */}
            <ambientLight intensity={1.5} />

            <directionalLight
                position={[10, 10, 5]}
                intensity={3}
                color="#ffffff"
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            <directionalLight
                position={[-10, -10, -5]}
                intensity={2.5}
                color="#ff00ff"
                castShadow
            />

            <pointLight position={[0, 5, -5]} intensity={3.5} color="#00ffff" castShadow />
            <pointLight position={[-5, 3, 3]} intensity={3} color="#ff00ff" />
            <pointLight position={[5, -3, 3]} intensity={3} color="#ffff00" />

            {/* Ground Plane for Shadows (invisible) */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -5, 0]}
                receiveShadow
            >
                <planeGeometry args={[50, 50]} />
                <shadowMaterial opacity={0.15} />
            </mesh>

            {shapes.map((shape) => (
                <shape.Component
                    key={shape.id}
                    position={shape.position}
                    scale={shape.scale}
                    shapeId={shape.id}
                    allShapesRef={allShapesRef}
                />
            ))}
        </>
    );
}

// Main component
export default function GeometricShapes3D({ isMobile = false }: { isMobile?: boolean }) {
    const cameraZ = isMobile ? 12 : 8;
    const cameraFov = isMobile ? 48 : 50;

    return (
        <div className="absolute inset-0">
            <Canvas
                camera={{ position: [0, 0, cameraZ], fov: cameraFov }}
                shadows={!isMobile}
                frameloop="demand"             // Only render when invalidated
                dpr={isMobile ? [1, 1] : [1, 1.5]}
                gl={{
                    antialias: !isMobile,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.55,
                    powerPreference: "high-performance",
                }}
            >
                <React.Suspense fallback={null}>
                    <Scene isMobile={isMobile} />
                </React.Suspense>
            </Canvas>
        </div>
    );
}
