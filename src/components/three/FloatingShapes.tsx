"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

function InstancedSpringShapes({ count = 30 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const { viewport } = useThree();

    // Create physics calibration
    const particles = useMemo(() => {
        const temp = [];
        const width = 12; // Spread width
        const height = 8; // Spread height

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * width;
            const y = (Math.random() - 0.5) * height;
            const z = (Math.random() - 0.5) * 4;
            const scale = 0.5 + Math.random() * 0.8;

            temp.push({
                home: new THREE.Vector3(x, y, z), // The position it wants to return to
                position: new THREE.Vector3(x, y, z), // Current position
                velocity: new THREE.Vector3(0, 0, 0),
                scale
            });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Mouse position in 3D
        const mouseX = (state.mouse.x * viewport.width) / 2;
        const mouseY = (state.mouse.y * viewport.height) / 2;
        const mousePos = new THREE.Vector3(mouseX, mouseY, 0);

        particles.forEach((particle, i) => {
            // 1. Calculate Force from Mouse (Repulsion)
            const dist = particle.position.distanceTo(mousePos);
            const repulsionRadius = 4;

            if (dist < repulsionRadius) {
                const force = (repulsionRadius - dist) * 0.15; // Force strength
                const angle = Math.atan2(particle.position.y - mouseY, particle.position.x - mouseX);
                particle.velocity.x += Math.cos(angle) * force;
                particle.velocity.y += Math.sin(angle) * force;
            }

            // 2. Spring Force (Return to Home)
            const springStrength = 0.05;
            const homeDx = particle.home.x - particle.position.x;
            const homeDy = particle.home.y - particle.position.y;
            const homeDz = particle.home.z - particle.position.z;

            particle.velocity.x += homeDx * springStrength;
            particle.velocity.y += homeDy * springStrength;
            particle.velocity.z += homeDz * springStrength;

            // 3. Apply Velocity & Damping (Friction)
            const damping = 0.92; // How fast it slows down (0.9 = fast, 0.99 = slow)
            particle.velocity.multiplyScalar(damping);
            particle.position.add(particle.velocity);

            // 4. Update Matrix
            dummy.position.copy(particle.position);

            // Add subtle rotation based on velocity
            dummy.rotation.x += particle.velocity.y * 0.2 + 0.01;
            dummy.rotation.y += particle.velocity.x * 0.2 + 0.01;

            dummy.scale.set(particle.scale, particle.scale, particle.scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, 0, -2]}>
            <torusGeometry args={[0.6, 0.25, 16, 32]} />
            <meshPhysicalMaterial
                color="#3b82f6"
                roughness={0.1}
                metalness={0.9}
                clearcoat={1}
                clearcoatRoughness={0.1}
                emissive="#1e3a8a"
                emissiveIntensity={0.2}
            />
        </instancedMesh>
    );
}

function SecondarySpringShapes({ count = 15 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const { viewport } = useThree();

    const particles = useMemo(() => {
        const temp = [];
        const width = 10;
        const height = 6;

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * width;
            const y = (Math.random() - 0.5) * height;
            const z = (Math.random() - 0.5) * 5;
            const scale = 0.4 + Math.random() * 0.6;

            temp.push({
                home: new THREE.Vector3(x, y, z),
                position: new THREE.Vector3(x, y, z),
                velocity: new THREE.Vector3(0, 0, 0),
                scale
            });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const mouseX = (state.mouse.x * viewport.width) / 2;
        const mouseY = (state.mouse.y * viewport.height) / 2;
        const mousePos = new THREE.Vector3(mouseX, mouseY, 0);

        particles.forEach((particle, i) => {
            // 1. Mouse Repulsion
            const dist = particle.position.distanceTo(mousePos);
            const repulsionRadius = 3;

            if (dist < repulsionRadius) {
                const force = (repulsionRadius - dist) * 0.12;
                const angle = Math.atan2(particle.position.y - mouseY, particle.position.x - mouseX);
                particle.velocity.x += Math.cos(angle) * force;
                particle.velocity.y += Math.sin(angle) * force;
            }

            // 2. Spring Force
            const springStrength = 0.04; // Slower return
            particle.velocity.x += (particle.home.x - particle.position.x) * springStrength;
            particle.velocity.y += (particle.home.y - particle.position.y) * springStrength;
            particle.velocity.z += (particle.home.z - particle.position.z) * springStrength;

            // 3. Damping
            particle.velocity.multiplyScalar(0.95); // Glidier feel
            particle.position.add(particle.velocity);

            dummy.position.copy(particle.position);
            dummy.rotation.x += particle.velocity.y * 0.1 + 0.02;
            dummy.rotation.y += particle.velocity.x * 0.1 + 0.02;
            dummy.scale.set(particle.scale, particle.scale, particle.scale);

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, 0, -3]}>
            <icosahedronGeometry args={[0.7, 0]} />
            <meshPhysicalMaterial
                color="#a855f7"
                roughness={0.2}
                metalness={0.6}
                transmission={0.4}
                thickness={1.5}
            />
        </instancedMesh>
    );
}

export default function FloatingShapes() {
    return (
        <group>
            {/* Primary Blue Torus - Springy */}
            <InstancedSpringShapes count={30} />

            {/* Secondary Purple Icosahedron - Glassy */}
            <SecondarySpringShapes count={20} />

            {/* Studio Lighting */}
            <Environment preset="city" />
            <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        </group>
    );
}
