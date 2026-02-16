"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Device orientation for mobile AR (alpha, beta, gamma in degrees)
export type DeviceOrientationState = { alpha: number; beta: number; gamma: number } | null;

// Physics-enabled shape wrapper
function PhysicsShape({
    children,
    initialPosition,
    shapeId,
    allShapes
}: any) {
    const meshRef = useRef<THREE.Group>(null);
    const velocityRef = useRef(new THREE.Vector3());
    const scaleRef = useRef(1);
    const rotationVelocityRef = useRef(0);
    const prevMousePosRef = useRef(new THREE.Vector3());
    const { viewport, pointer } = useThree();

    // Register this shape's ref
    useEffect(() => {
        if (meshRef.current && allShapes) {
            const shapeData = {
                id: shapeId,
                ref: meshRef,
                velocityRef: velocityRef
            };
            allShapes.current = [...allShapes.current, shapeData];

            return () => {
                allShapes.current = allShapes.current.filter((s: any) => s.id !== shapeId);
            };
        }
    }, [shapeId, allShapes]);

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

        // 3. SEPARATION + COLLISION - spread out when nearby, soft bounce when touching
        const separationRadius = 2.8;
        const separationStrength = 0.035;
        const collisionRadius = 1.4;
        const repulsionStrength = 0.07;
        const bounceDamping = 0.25;

        if (allShapes?.current) {
            allShapes.current.forEach((otherShape: any) => {
                if (otherShape.id === shapeId || !otherShape.ref?.current) return;
                const otherMesh = otherShape.ref.current;
                const distance = mesh.position.distanceTo(otherMesh.position);
                if (distance < 0.01) return;

                const direction = new THREE.Vector3()
                    .subVectors(mesh.position, otherMesh.position)
                    .normalize();

                // Gentle repulsion when within separation radius (avoid clustering)
                if (distance < separationRadius) {
                    const push = (separationRadius - distance) * separationStrength;
                    velocity.add(direction.clone().multiplyScalar(push));
                }

                // Soft bounce when very close
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
    });

    return (
        <group ref={meshRef} position={initialPosition}>
            {children}
        </group>
    );
}

// Shape components
function CrossShape({ position, color, scale = 1, shapeId, allShapes }: any) {
    return (
        <PhysicsShape initialPosition={position} shapeId={shapeId} allShapes={allShapes}>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
                <group scale={scale}>
                    <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                        <cylinderGeometry args={[0.3, 0.3, 2, 32]} />
                        <meshPhysicalMaterial
                            color="#4488ff"
                            metalness={0}
                            roughness={0.15}
                            transmission={0.7}
                            thickness={2.5}
                            envMapIntensity={4}
                            clearcoat={0.7}
                            clearcoatRoughness={0.15}
                            transparent={true}
                            opacity={0.85}
                            ior={1.6}
                            iridescence={1}
                            iridescenceIOR={2.8}
                            iridescenceThicknessRange={[400, 2000]}
                            sheenColor="#ff44ff"
                            sheen={0.9}
                        />
                    </mesh>
                    <mesh castShadow receiveShadow>
                        <cylinderGeometry args={[0.3, 0.3, 2, 32]} />
                        <meshPhysicalMaterial
                            color="#4488ff"
                            metalness={0}
                            roughness={0.15}
                            transmission={0.7}
                            thickness={2.5}
                            envMapIntensity={4}
                            clearcoat={0.7}
                            clearcoatRoughness={0.15}
                            transparent={true}
                            opacity={0.85}
                            ior={1.6}
                            iridescence={1}
                            iridescenceIOR={2.8}
                            iridescenceThicknessRange={[400, 2000]}
                            sheenColor="#ff44ff"
                            sheen={0.9}
                        />
                    </mesh>
                </group>
            </Float>
        </PhysicsShape>
    );
}

function TorusShape({ position, color, scale = 1, shapeId, allShapes }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <PhysicsShape initialPosition={position} shapeId={shapeId} allShapes={allShapes}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
                    <torusGeometry args={[1, 0.4, 32, 64]} />
                    <meshPhysicalMaterial
                        color="#ff44ff"
                        metalness={0}
                        roughness={0.15}
                        transmission={0.7}
                        thickness={3}
                        envMapIntensity={4}
                        clearcoat={0.7}
                        clearcoatRoughness={0.15}
                        transparent={true}
                        opacity={0.85}
                        ior={1.6}
                        iridescence={1}
                        iridescenceIOR={2.8}
                        iridescenceThicknessRange={[400, 2000]}
                        sheenColor="#44ffff"
                        sheen={0.9}
                    />
                </mesh>
            </Float>
        </PhysicsShape>
    );
}

function CylinderShape({ position, color, scale = 1, shapeId, allShapes }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <PhysicsShape initialPosition={position} shapeId={shapeId} allShapes={allShapes}>
            <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.5}>
                <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
                    <cylinderGeometry args={[0.8, 0.8, 1.5, 64]} />
                    <meshPhysicalMaterial
                        color="#ff4488"
                        metalness={0}
                        roughness={0.15}
                        transmission={0.7}
                        thickness={2}
                        envMapIntensity={4}
                        clearcoat={0.7}
                        clearcoatRoughness={0.15}
                        transparent={true}
                        opacity={0.85}
                        ior={1.6}
                        iridescence={1}
                        iridescenceIOR={2.8}
                        iridescenceThicknessRange={[400, 2000]}
                        sheenColor="#ffff44"
                        sheen={0.9}
                    />
                </mesh>
            </Float>
        </PhysicsShape>
    );
}

// Scene component with shape tracking
function Scene({ isMobile = false }: { isMobile?: boolean }) {
    const allShapesRef = useRef<any[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Desktop: 10 shapes. Mobile: fewer & smaller for less crowding
    const desktopShapes = [
        { id: 1, Component: CrossShape, position: [-2, 1, 0] as [number, number, number], color: "#ffffff", scale: 1 },
        { id: 2, Component: TorusShape, position: [2, -1, -1] as [number, number, number], color: "#ffffff", scale: 0.8 },
        { id: 3, Component: CylinderShape, position: [0, 2, -2] as [number, number, number], color: "#ffffff", scale: 0.6 },
        { id: 4, Component: CrossShape, position: [-3, -2, 1] as [number, number, number], color: "#ffffff", scale: 0.7 },
        { id: 5, Component: TorusShape, position: [3, 2, 0] as [number, number, number], color: "#ffffff", scale: 0.9 },
        { id: 6, Component: CylinderShape, position: [1, -2, -1] as [number, number, number], color: "#ffffff", scale: 0.5 },
        { id: 7, Component: CrossShape, position: [0, 0, 0] as [number, number, number], color: "#ffffff", scale: 1.2 },
        { id: 8, Component: TorusShape, position: [-1.5, -1.5, -1.5] as [number, number, number], color: "#ffffff", scale: 0.75 },
        { id: 9, Component: CylinderShape, position: [2.5, 0.5, -0.5] as [number, number, number], color: "#ffffff", scale: 0.65 },
        { id: 10, Component: CrossShape, position: [-2.5, 2.5, 0.5] as [number, number, number], color: "#ffffff", scale: 0.85 },
    ];

    const mobileScale = 0.42;
    const mobilePosScale = 0.65;
    const mobileShapes = desktopShapes.slice(0, 6).map((s, i) => ({
        ...s,
        id: s.id,
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
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
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
                    color={shape.color}
                    scale={shape.scale}
                    shapeId={shape.id}
                    allShapes={allShapesRef}
                />
            ))}
        </>
    );
}

// Mobile AR: apply device orientation to camera (tilt to look around)
function DeviceOrientationCamera({ orientation }: { orientation: DeviceOrientationState }) {
    const { camera } = useThree();
    const smoothRef = useRef({ y: 0, x: 0 });
    const deg2rad = Math.PI / 180;

    useFrame(() => {
        if (!orientation) return;
        const { alpha, beta, gamma } = orientation;
        // Gamma = left/right tilt -> yaw (Y). Beta = front/back -> pitch (X).
        const targetY = (gamma ?? 0) * deg2rad;
        const targetX = ((beta ?? 0) - 90) * deg2rad;
        const smooth = 0.08;
        smoothRef.current.y += (targetY - smoothRef.current.y) * smooth;
        smoothRef.current.x += (targetX - smoothRef.current.x) * smooth;
        camera.rotation.order = "YXZ";
        camera.rotation.y = smoothRef.current.y;
        camera.rotation.x = smoothRef.current.x;
    });

    return null;
}

// Main component
export default function GeometricShapes3D({
    isMobile = false,
    deviceOrientation = null
}: {
    isMobile?: boolean;
    deviceOrientation?: DeviceOrientationState;
}) {
    const cameraZ = isMobile ? 12 : 8;
    const cameraFov = isMobile ? 48 : 50;

    return (
        <div className="absolute inset-0">
            <Canvas
                camera={{ position: [0, 0, cameraZ], fov: cameraFov }}
                shadows
                gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.55
                }}
            >
                {/* ไม่ใส่ background เพื่อให้โปร่งใส — gradient fixed ของหน้าโผล่ผ่าน ไม่มีเส้นรอยต่อ */}
                <Scene isMobile={isMobile} />
                {deviceOrientation && <DeviceOrientationCamera orientation={deviceOrientation} />}
            </Canvas>
        </div>
    );
}
