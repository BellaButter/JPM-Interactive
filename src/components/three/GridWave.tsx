"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Vertex Shader: Stronger distortion & line thickness
const vertexShader = `
uniform float uTime;
uniform vec3 uMousePos; // World position
uniform float uHover;

attribute float aRandom;
varying vec3 vColor;

void main() {
  vec3 pos = position; 

  // Interaction based on World Position
  // We compare the point's world position with the mouse's projected world position
  float dist = distance(pos.xy, uMousePos.xy);
  
  // Interaction Radius
  float radius = 6.0; 
  float influence = smoothstep(radius, 0.0, dist);

  // Elastic pull towards mouse
  vec3 dir = normalize(pos - uMousePos);
  
  // Push/Pull effect
  pos.x += dir.x * influence * 2.0;
  pos.y += dir.y * influence * 2.0;
  pos.z += influence * 4.0; // Lift up

  // Ambient wave
  pos.z += sin(pos.x * 0.4 + uTime) * 1.0 + cos(pos.y * 0.4 + uTime * 1.5) * 1.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Size
  gl_PointSize = (10.0 + influence * 30.0) * (25.0 / -mvPosition.z);

  // Colors
  vec3 colorBase = vec3(0.2, 0.3, 0.4); 
  vec3 colorActive = vec3(0.1, 0.9, 1.0); // Cyan
  vec3 colorHot = vec3(1.0, 0.2, 0.7); // Pink
  
  vColor = mix(colorBase, colorActive, influence * 0.7);
  vColor = mix(vColor, colorHot, influence * influence);
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);
  if (r > 1.0) discard;

  float glow = 1.0 - r;
  glow = pow(glow, 1.5);

  gl_FragColor = vec4(vColor, glow);
}
`;

function InteractiveGrid({ count = 60 }) {
    const pointsRef = useRef<THREE.Points>(null!);
    const { viewport, camera } = useThree();

    // Uniforms
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMousePos: { value: new THREE.Vector3(999, 999, 0) }
        }),
        []
    );

    // Global Mouse Tracker (Bypasses Canvas Overlay Issues)
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Convert screen pixel to -1..1 clip space
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Convert to World Space (at Z=0 plane approximation)
            // For a perspective camera looking at 0,0,0 from z=15
            // We can approximate or unproject properly.

            // Simple Approximation for this specific camera setup ([0,0,15])
            // Visible height at z=0 is approx: 2 * 15 * tan(60/2 * PI/180) ≈ 17.32
            // Visible width = height * aspect

            // Let's use the viewport data from useThree which is accurate at z=0
            const worldX = (x * viewport.width) / 2;
            const worldY = (y * viewport.height) / 2;

            uniforms.uMousePos.value.set(worldX, worldY, 0);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [viewport, uniforms]);

    const { positions, randoms } = useMemo(() => {
        const tempPos = [];
        const tempRand = [];
        const spacing = 0.6;
        const offset = (count * spacing) / 2;

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = i * spacing - offset;
                const y = j * spacing - offset;
                tempPos.push(x, y, 0);
                tempRand.push(Math.random());
            }
        }
        return {
            positions: new Float32Array(tempPos),
            randoms: new Float32Array(tempRand)
        };
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        uniforms.uTime.value = state.clock.getElapsedTime();
    });

    return (
        <points ref={pointsRef} rotation={[Math.PI / 6, 0, 0]}>
            <bufferGeometry>
                {/* @ts-ignore */}
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={positions.length / 3}
                    itemSize={3}
                />
                {/* @ts-ignore */}
                <bufferAttribute
                    attach="attributes-aRandom"
                    array={randoms}
                    count={randoms.length}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function GridWave() {
    return (
        <group>
            <InteractiveGrid count={80} />
        </group>
    );
}
