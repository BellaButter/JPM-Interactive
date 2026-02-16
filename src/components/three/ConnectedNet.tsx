"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function ConnectedNet() {
    const linesRef = useRef<THREE.LineSegments>(null!);
    const pointsRef = useRef<THREE.Points>(null!);
    const { viewport } = useThree();

    // Configuration
    const particleCount = 80;
    const connectionDist = 3.5;
    const maxConnections = 8;

    // Mouse state
    const targetMouse = useRef(new THREE.Vector2(0, 0));
    const currentMouse = useRef(new THREE.Vector2(0, 0));

    // Global Mouse Listener
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            targetMouse.current.set(x * viewport.width / 2, y * viewport.height / 2);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [viewport]);

    // Initialize particles: Full screen spread
    const particles = useMemo(() => {
        const temp = [];
        // Use a large enough area to cover screens
        const width = 25;
        const height = 15;

        for (let i = 0; i < particleCount; i++) {
            temp.push({
                x: (Math.random() - 0.5) * width,
                y: (Math.random() - 0.5) * height,
                vx: (Math.random() - 0.5) * 0.02,
                vy: (Math.random() - 0.5) * 0.02,
                size: Math.random() * 0.5 + 0.5
            });
        }
        return temp;
    }, []);

    // Buffers
    const maxLineVertices = particleCount * 20;
    const positions = useMemo(() => new Float32Array(particleCount * 3), []);
    const linePositions = useMemo(() => new Float32Array(maxLineVertices * 3), []);
    const lineColors = useMemo(() => new Float32Array(maxLineVertices * 3), []);

    useFrame((state) => {
        if (!pointsRef.current || !linesRef.current) return;

        currentMouse.current.lerp(targetMouse.current, 0.1);

        let vertexIndex = 0;

        // Bounce limits (Full screen)
        const limitX = 12.5;
        const limitY = 7.5;

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            // Soft Wall Bouncing (Wider limits)
            if (p.x > limitX) { p.x = limitX; p.vx *= -1; }
            if (p.x < -limitX) { p.x = -limitX; p.vx *= -1; }
            if (p.y > limitY) { p.y = limitY; p.vy *= -1; }
            if (p.y < -limitY) { p.y = -limitY; p.vy *= -1; }

            // Mouse Repel
            const dx = p.x - currentMouse.current.x;
            const dy = p.y - currentMouse.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 5.0) {
                const force = (5.0 - dist) * 0.015;
                const angle = Math.atan2(dy, dx);
                p.vx += Math.cos(angle) * force;
                p.vy += Math.sin(angle) * force;
            }

            p.vx *= 0.98;
            p.vy *= 0.98;

            positions[i * 3] = p.x;
            positions[i * 3 + 1] = p.y;
            positions[i * 3 + 2] = 0;

            // Connections
            for (let j = i + 1; j < particleCount; j++) {
                const p2 = particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (dist2 < connectionDist) {
                    if (vertexIndex >= maxLineVertices) continue;

                    const alpha = 1.0 - (dist2 / connectionDist);
                    if (alpha > 0) {
                        linePositions[vertexIndex * 3] = p.x;
                        linePositions[vertexIndex * 3 + 1] = p.y;
                        linePositions[vertexIndex * 3 + 2] = 0;

                        lineColors[vertexIndex * 3] = 0.2;
                        lineColors[vertexIndex * 3 + 1] = 0.5;
                        lineColors[vertexIndex * 3 + 2] = 1.0;

                        vertexIndex++;

                        linePositions[vertexIndex * 3] = p2.x;
                        linePositions[vertexIndex * 3 + 1] = p2.y;
                        linePositions[vertexIndex * 3 + 2] = 0;

                        lineColors[vertexIndex * 3] = 0.6;
                        lineColors[vertexIndex * 3 + 1] = 0.3;
                        lineColors[vertexIndex * 3 + 2] = 0.9;

                        vertexIndex++;
                    }
                }
            }
        });

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        linesRef.current.geometry.setDrawRange(0, vertexIndex);
        linesRef.current.geometry.attributes.position.needsUpdate = true;
        linesRef.current.geometry.attributes.color.needsUpdate = true;
    });

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    {/* @ts-ignore */}
                    <bufferAttribute
                        attach="attributes-position"
                        array={positions}
                        count={particleCount}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.12}
                    color="#ffffff"
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    {/* @ts-ignore */}
                    <bufferAttribute
                        attach="attributes-position"
                        array={linePositions}
                        count={maxLineVertices}
                        itemSize={3}
                    />
                    {/* @ts-ignore */}
                    <bufferAttribute
                        attach="attributes-color"
                        array={lineColors}
                        count={maxLineVertices}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.3}
                    linewidth={1}
                />
            </lineSegments>
        </group>
    );
}
