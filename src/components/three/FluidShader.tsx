"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// GLSL Vertex Shader
const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;

varying vec2 vUv;
varying float vElevation;

// Perlin Noise function (Simplified)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vUv = uv;

  vec3 pos = position;

  // Base wave movement
  float noiseFreq = 1.5;
  float noiseAmp = 0.6;
  vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.2, pos.y * noiseFreq + uTime * 0.2, uTime * 0.2);
  
  float elevation = snoise(noisePos.xy);
  
  // Mouse interaction ripple
  float dist = distance(vUv, uMouse);
  float ripple = smoothstep(0.4, 0.0, dist); // Ripple radius
  
  // Combine movements
  pos.z += elevation * noiseAmp;
  pos.z += ripple * 0.8 * sin(dist * 20.0 - uTime * 4.0); // Interactive ripple effect

  vElevation = pos.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// GLSL Fragment Shader
const fragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying vec2 vUv;
varying float vElevation;

void main() {
  // Mix colors based on elevation
  float mixStrength = (vElevation + 0.6) * 0.8;
  
  vec3 color = mix(uColor1, uColor2, mixStrength);
  color = mix(color, uColor3, smoothstep(0.0, 1.0, vElevation));

  // Add subtle grain/noise
  float noise = (fract(sin(dot(vUv, vec2(12.9898, 78.233)*2.0)) * 43758.5453) - 0.5) * 0.05;
  
  gl_FragColor = vec4(color + noise, 1.0);
}
`;

function FluidMesh() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { viewport, mouse } = useThree();

    // Uniforms
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uColor1: { value: new THREE.Color("#0f172a") }, // Deep Blue/Black Base
            uColor2: { value: new THREE.Color("#3b82f6") }, // Primary Blue
            uColor3: { value: new THREE.Color("#a855f7") }, // Purple Accent
        }),
        []
    );

    useFrame((state) => {
        if (!meshRef.current) return;

        // Update time
        uniforms.uTime.value = state.clock.getElapsedTime();

        // Update mouse (mapped 0 to 1)
        // Lerp for smoothness
        const targetX = (state.mouse.x + 1) / 2;
        const targetY = (state.mouse.y + 1) / 2;

        uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.1;
        uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.1;
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]}> {/* Tilted plane */}
            <planeGeometry args={[12, 12, 128, 128]} /> {/* High poly plane */}
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                wireframe={false} // Set true for cool tech effect
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

export default function FluidShaderCanvas() {
    return (
        <group>
            <FluidMesh />
        </group>
    );
}
