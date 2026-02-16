"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";
// Import RoundedBoxGeometry from three-stdlib (bundled usually)
import { RoundedBoxGeometry } from "three-stdlib";

// Extend so we can use <roundedBoxGeometry /> in JSX
extend({ RoundedBoxGeometry });

export default function KineticField() {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const { viewport } = useThree();

    // Configuration
    const rows = 20;
    const cols = 35; // Wider for screen
    const count = rows * cols;
    const spacing = 0.8;

    // Mouse state
    const mouse = useRef(new THREE.Vector2(0, 0));
    const targetMouse = useRef(new THREE.Vector2(0, 0));

    // Global Mouse Listener for accuracy
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            // Map to approximate world coordinate at z=0
            targetMouse.current.set(x * viewport.width / 2, y * viewport.height / 2);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [viewport]);

    // Initialize positions
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const basePositions = useMemo(() => {
        const positions = [];
        const offsetX = (cols * spacing) / 2;
        const offsetY = (rows * spacing) / 2;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                positions.push({
                    x: j * spacing - offsetX,
                    y: i * spacing - offsetY,
                    z: 0
                });
            }
        }
        return positions;
    }, [rows, cols]);

    const colors = useMemo(() => {
        const c = new Float32Array(count * 3);
        const color = new THREE.Color();
        const baseColor = new THREE.Color("#1e293b"); // Slate 800

        for (let i = 0; i < count; i++) {
            color.copy(baseColor);
            color.toArray(c, i * 3);
        }
        return c;
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Smooth mouse
        mouse.current.lerp(targetMouse.current, 0.1);

        const time = state.clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
            const { x, y } = basePositions[i];

            // Distance from mouse
            const dx = x - mouse.current.x;
            const dy = y - mouse.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Interaction Radius
            const radius = 6.0;
            const influence = Math.max(0, 1 - dist / radius); // 0 to 1
            const easedInfluence = THREE.MathUtils.smoothstep(influence, 0, 1);

            // Wave Animation
            const waveZ = Math.sin(x * 0.5 + time) * Math.sin(y * 0.5 + time) * 0.5;

            // Interactive Movement
            // Lift up and rotate towards mouse
            const z = waveZ + easedInfluence * 2.0;

            // Rotation: Look at mouse + ambient spin
            const rotX = easedInfluence * (dy * 0.5) + Math.cos(time * 0.5 + x) * 0.2;
            const rotY = easedInfluence * (-dx * 0.5) + Math.sin(time * 0.5 + y) * 0.2;

            // Scale: Pop up when interacts
            const scale = 1 + easedInfluence * 0.5;

            dummy.position.set(x, y, z);
            dummy.rotation.set(rotX, rotY, 0);
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();

            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, 0, -2]}>
            {/* @ts-ignore */}
            <roundedBoxGeometry args={[0.5, 0.5, 0.1, 4, 0.05]} /> {/* Thin Tiles, smaller radius */}
            <meshPhysicalMaterial
                color="#cbd5e1" // Light Slate
                emissive="#0f172a"
                roughness={0.2}
                metalness={0.8}
                reflectivity={0.5}
                clearcoat={1}
            />
        </instancedMesh>
    );
}
