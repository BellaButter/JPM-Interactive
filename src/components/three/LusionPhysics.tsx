"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { gsap } from "gsap";

const damp = 0.95;
const mouseRadius = 4;
const mouseForce = 0.5;

function CustomLusionPhysics({ count = 40 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!);
    const { viewport, mouse } = useThree();

    // Spawn objects ONLY ONCE in random positions (Spread out immediately)
    const particles = useRef<any[]>([]);

    // Initialize with safe spread
    useMemo(() => {
        const temp = [];
        // Use a wide spread, assume 1920x1080 safe area roughly to start
        const width = 15;
        const height = 10;

        for (let i = 0; i < count; i++) {
            const scale = 0.5 + Math.random() * 0.6;
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * width,
                    (Math.random() - 0.5) * height,
                    (Math.random() - 0.5) * 4
                ),
                velocity: new THREE.Vector3(0, 0, 0), // Start still
                scale,
                mass: scale,
                radius: scale * 0.5
            });
        }
        particles.current = temp;
    }, [count]);

    // Fade in effect on mount
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.opacity = 0;
            gsap.to(materialRef.current, {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out"
            });
        }
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Gradient Colors
    const colors = useMemo(() => {
        const array = new Float32Array(count * 3);
        const color = new THREE.Color();
        for (let i = 0; i < count; i++) {
            if (i % 3 === 0) color.set("#3b82f6");
            else if (i % 3 === 1) color.set("#06b6d4");
            else color.set("#a855f7");
            color.toArray(array, i * 3);
        }
        return array;
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Use live viewport for walls, but provide default if loading
        const width = (viewport.width || 10) / 2;
        const height = (viewport.height || 10) / 2;
        const depth = 4;

        // Mouse to 3D
        const mouseX = (state.mouse.x * (viewport.width || 10)) / 2;
        const mouseY = (state.mouse.y * (viewport.height || 10)) / 2;
        const mouseVec = new THREE.Vector3(mouseX, mouseY, 0);

        particles.current.forEach((p, i) => {
            // 1. Mouse Interaction (Active Always)
            const distToMouse = p.position.distanceTo(mouseVec);
            if (distToMouse < mouseRadius) {
                const repulse = new THREE.Vector3().subVectors(p.position, mouseVec).normalize();
                if (isNaN(repulse.x)) repulse.set(1, 0, 0);
                const force = (mouseRadius - distToMouse) * mouseForce;
                p.velocity.add(repulse.multiplyScalar(force / p.mass));
            }

            // 2. Object Collision
            for (let j = i + 1; j < count; j++) {
                const p2 = particles.current[j];
                const distSq = p.position.distanceToSquared(p2.position);
                const minDist = p.radius + p2.radius;

                if (distSq < minDist * minDist) {
                    const dist = Math.sqrt(distSq);
                    let normal = new THREE.Vector3().subVectors(p.position, p2.position);
                    if (dist < 0.0001) normal = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, 0).normalize();
                    else normal.divideScalar(dist);

                    const overlap = minDist - dist;
                    const separation = normal.clone().multiplyScalar(overlap * 0.5);
                    p.position.add(separation);
                    p2.position.sub(separation);

                    const impulse = normal.multiplyScalar(0.05);
                    p.velocity.add(impulse);
                    p2.velocity.sub(impulse);
                }
            }

            // 3. Wall Constraints
            if (p.position.x > width - p.radius) { p.position.x = width - p.radius; p.velocity.x *= -0.7; }
            if (p.position.x < -width + p.radius) { p.position.x = -width + p.radius; p.velocity.x *= -0.7; }

            if (p.position.y > height - p.radius) { p.position.y = height - p.radius; p.velocity.y *= -0.7; }
            if (p.position.y < -height + p.radius) { p.position.y = -height + p.radius; p.velocity.y *= -0.7; }

            if (p.position.z > depth) { p.position.z = depth; p.velocity.z *= -0.7; }
            if (p.position.z < -depth) { p.position.z = -depth; p.velocity.z *= -0.7; }

            // 4. Update
            p.velocity.multiplyScalar(damp);
            p.velocity.clampLength(0, 0.5);
            p.position.add(p.velocity);

            // Apply
            dummy.position.copy(p.position);

            // Rotation follows velocity
            dummy.rotation.x += p.velocity.y * 2;
            dummy.rotation.y += p.velocity.x * 2;

            dummy.scale.set(p.scale, p.scale, p.scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.5, 32, 32]}>
                <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
            </sphereGeometry>
            <meshPhysicalMaterial
                ref={materialRef}
                vertexColors
                transparent // Allow fading
                roughness={0.2}
                metalness={0.7}
                clearcoat={1}
                clearcoatRoughness={0.2}
            />
        </instancedMesh>
    );
}

function CustomTorusPhysics({ count = 15 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!);
    const { viewport, mouse } = useThree();

    // Spawn spread out instantly
    const particles = useRef<any[]>([]);
    useMemo(() => {
        const temp = [];
        const width = 15;
        const height = 10;
        for (let i = 0; i < count; i++) {
            const scale = 0.6 + Math.random() * 0.4;
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * width,
                    (Math.random() - 0.5) * height,
                    (Math.random() - 0.5) * 2
                ),
                velocity: new THREE.Vector3(0, 0, 0),
                scale,
                radius: scale * 0.8
            });
        }
        particles.current = temp;
    }, [count]);

    // Fade in
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.opacity = 0;
            gsap.to(materialRef.current, {
                opacity: 0.6, // Glass is semi-transparent
                duration: 2,
                ease: "power2.out",
                delay: 0.2
            });
        }
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const width = (viewport.width || 10) / 2;
        const height = (viewport.height || 10) / 2;
        const depth = 4;

        const mouseX = (state.mouse.x * (viewport.width || 10)) / 2;
        const mouseY = (state.mouse.y * (viewport.height || 10)) / 2;
        const mouseVec = new THREE.Vector3(mouseX, mouseY, 0);

        particles.current.forEach((p, i) => {
            // Mouse
            const distToMouse = p.position.distanceTo(mouseVec);
            if (distToMouse < mouseRadius) {
                const repulse = new THREE.Vector3().subVectors(p.position, mouseVec).normalize();
                if (isNaN(repulse.x)) repulse.set(1, 0, 0);
                const force = (mouseRadius - distToMouse) * mouseForce * 0.8;
                p.velocity.add(repulse.multiplyScalar(force));
            }

            // Wall Collision
            if (p.position.x > width - p.radius) { p.position.x = width - p.radius; p.velocity.x *= -0.7; }
            if (p.position.x < -width + p.radius) { p.position.x = -width + p.radius; p.velocity.x *= -0.7; }
            if (p.position.y > height - p.radius) { p.position.y = height - p.radius; p.velocity.y *= -0.7; }
            if (p.position.y < -height + p.radius) { p.position.y = -height + p.radius; p.velocity.y *= -0.7; }
            if (p.position.z > depth) { p.position.z = depth; p.velocity.z *= -0.7; }
            if (p.position.z < -depth) { p.position.z = -depth; p.velocity.z *= -0.7; }

            // Update
            p.velocity.multiplyScalar(damp);
            p.velocity.clampLength(0, 0.4);
            p.position.add(p.velocity);

            dummy.position.copy(p.position);
            dummy.rotation.x += p.velocity.y * 3;
            dummy.rotation.y += p.velocity.x * 3;
            dummy.scale.set(p.scale, p.scale, p.scale);

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <torusGeometry args={[0.5, 0.2, 16, 32]} />
            <meshPhysicalMaterial
                ref={materialRef}
                color="#ffffff"
                transparent
                roughness={0.1}
                metalness={0.2}
                transmission={0.6}
                thickness={1}
                opacity={0} // Start invisible
            />
        </instancedMesh>
    );
}

export default function LusionPhysics() {
    return (
        <group>
            <CustomLusionPhysics count={40} />
            <CustomTorusPhysics count={15} />

            <Environment preset="city" />
            <directionalLight position={[5, 10, 5]} intensity={1.5} />
            <ambientLight intensity={0.4} />
        </group>
    );
}
