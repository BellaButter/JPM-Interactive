"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useBrush } from "@/lib/use-shader-fx";
import { useMotion } from "@/system/motion/useMotion";

function BrushScene() {
  const { size, viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  const [updateBrush] = useBrush({
    size: { width: size.width, height: size.height },
    dpr: viewport.dpr,
    isSizeUpdate: true,
  });

  useFrame((state) => {
    if (size.width <= 0 || size.height <= 0) return;
    const tex = updateBrush(state, {
      isCursor: true,
      radius: 0.008,
      dissipation: 0.76,
      brushAlpha: 0.18,
      color: new THREE.Vector3(0.42, 0.6, 0.96),
      pressure: 1.0,
    });
    const mesh = meshRef.current;
    if (!mesh) return;
    const mat = Array.isArray(mesh.material)
      ? mesh.material[0]
      : mesh.material;
    if (mat && "map" in mat) {
      (mat as THREE.MeshBasicMaterial).map = tex;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function BrushCursor() {
  const { reducedMotion, motionConfig, isReady } = useMotion();
  const cursorStyleRef = useRef<string>("");

  const showCursor =
    isReady &&
    !reducedMotion &&
    motionConfig.enableCursorEffects;

  useEffect(() => {
    if (showCursor) {
      cursorStyleRef.current = document.body.style.cursor;
      document.body.style.cursor = "none";
    }
    return () => {
      document.body.style.cursor = cursorStyleRef.current;
    };
  }, [showCursor]);

  if (!showCursor) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 1], fov: 50 }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <BrushScene />
      </Canvas>
    </div>
  );
}
