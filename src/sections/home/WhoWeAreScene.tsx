"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";

// ลูกบาศก์ดำ (cuboid) — ใช้ Standard + แสงให้เห็นมิติ
function FloatingCube({ position }: { position: [number, number, number] }) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_, t) => {
        if (ref.current) {
            ref.current.rotation.x = t * 0.12;
            ref.current.rotation.y = t * 0.18;
        }
    });
    return (
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.3}>
            <mesh ref={ref} position={position} castShadow>
                <boxGeometry args={[0.35, 0.45, 0.28]} />
                <meshStandardMaterial
                    color="#0f172a"
                    metalness={0.6}
                    roughness={0.35}
                    envMapIntensity={1}
                />
            </mesh>
        </Float>
    );
}

// แหวนน้ำเงิน (ring/torus)
function FloatingRing({ position }: { position: [number, number, number] }) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_, t) => {
        if (ref.current) {
            ref.current.rotation.x = t * 0.15;
            ref.current.rotation.y = t * 0.2;
        }
    });
    return (
        <Float speed={1.5} floatIntensity={0.25}>
            <mesh ref={ref} position={position}>
                <torusGeometry args={[0.32, 0.06, 24, 48]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    emissive="#1d4ed8"
                    emissiveIntensity={0.4}
                    metalness={0.3}
                    roughness={0.4}
                />
            </mesh>
        </Float>
    );
}

// สามเหลี่ยม (pyramid / tetrahedron) สีฟ้า
function FloatingTriangle({ position }: { position: [number, number, number] }) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_, t) => {
        if (ref.current) ref.current.rotation.y = t * 0.2;
    });
    return (
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.28}>
            <mesh ref={ref} position={position}>
                <coneGeometry args={[0.3, 0.55, 3]} />
                <meshStandardMaterial
                    color="#22d3ee"
                    emissive="#0e7490"
                    emissiveIntensity={0.25}
                    metalness={0.2}
                    roughness={0.5}
                />
            </mesh>
        </Float>
    );
}

// กากบาท (+) สีฟ้าอ่อน
function FloatingPlus({ position }: { position: [number, number, number] }) {
    const ref = useRef<THREE.Group>(null);
    useFrame((_, t) => {
        if (ref.current) ref.current.rotation.z = t * 0.15;
    });
    return (
        <Float speed={1} floatIntensity={0.2}>
            <group ref={ref} position={position}>
                <mesh>
                    <boxGeometry args={[0.12, 0.4, 0.12]} />
                    <meshStandardMaterial
                        color="#38bdf8"
                        emissive="#0284c7"
                        emissiveIntensity={0.2}
                        metalness={0.2}
                        roughness={0.5}
                    />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <boxGeometry args={[0.12, 0.4, 0.12]} />
                    <meshStandardMaterial
                        color="#38bdf8"
                        emissive="#0284c7"
                        emissiveIntensity={0.2}
                        metalness={0.2}
                        roughness={0.5}
                    />
                </mesh>
            </group>
        </Float>
    );
}

// เส้นเชื่อมโทนม่วงอ่อน
function ConnectingLines() {
    const points = [
        [-0.6, 0.4, 0.1],
        [0.1, 0.1, 0.2],
        [0.65, -0.35, 0.05],
        [0.3, -0.55, -0.1],
        [-0.45, -0.15, 0.05],
        [-0.6, 0.4, 0.1],
    ] as [number, number, number][];
    return <Line points={points} color="#a78bfa" lineWidth={1} />;
}

function ConnectingLinesAlt() {
    const points = [
        [0.5, 0.5, -0.05],
        [-0.25, 0.02, 0.15],
        [0.45, -0.45, 0.08],
    ] as [number, number, number][];
    return <Line points={points} color="#c4b5fd" lineWidth={0.8} />;
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 2, 4]} intensity={1.2} castShadow />
            <pointLight position={[-2, 1, 2]} intensity={0.7} color="#3b82f6" />
            <pointLight position={[2, -1, 2]} intensity={0.5} color="#8b5cf6" />

            {/* รูปทรงหลัก: 2 แหวน, 2 คิวบ์, 2 สามเหลี่ยม, 1 กากบาท */}
            <FloatingRing position={[-0.5, 0.35, 0.15]} />
            <FloatingRing position={[0.55, -0.3, 0.1]} />
            <FloatingCube position={[-0.7, -0.4, 0.2]} />
            <FloatingCube position={[0.7, 0.45, 0.15]} />
            <FloatingTriangle position={[-0.35, -0.5, 0.25]} />
            <FloatingTriangle position={[0.5, 0.5, 0.2]} />
            <FloatingPlus position={[0, 0, 0.3]} />

            <ConnectingLines />
            <ConnectingLinesAlt />
        </>
    );
}

export default function WhoWeAreScene() {
    return (
        <div className="w-full h-full min-h-[280px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-[#1e1b4b] border border-white/10 shadow-xl">
            <Canvas
                camera={{ position: [0, 0, 2.8], fov: 42 }}
                gl={{ antialias: true, alpha: true }}
                shadows
            >
                <color attach="background" args={["transparent"]} />
                <Scene />
            </Canvas>
        </div>
    );
}
