"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ─── GLB Model — auto-fits + scroll-spin ────────────────────── */
function ChumModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
    const outerRef = useRef<THREE.Group>(null);
    const innerRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF("/3D/chum_chompkins_-_poppy_playtime_chapter_5.glb");
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        // Auto-fit: scale & center via bounding box
        const box = new THREE.Box3().setFromObject(scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        if (maxDim > 0 && innerRef.current) {
            const TARGET = 3.2; // larger character
            const s = TARGET / maxDim;
            innerRef.current.scale.setScalar(s);
            innerRef.current.position.set(-center.x * s, -center.y * s, -center.z * s);
        }

        // Boost env-map on all meshes
        scene.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (!mesh.isMesh) return;
            mesh.castShadow = true;
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m) => {
                if (m instanceof THREE.MeshStandardMaterial) {
                    m.envMapIntensity = 1.6;
                    m.needsUpdate = true;
                }
            });
        });
    }, [scene]);

    useFrame(({ clock }) => {
        if (!outerRef.current) return;
        const t = clock.getElapsedTime();
        const p = scrollProgress.current;

        // Scroll spins character + slow idle rotation
        // We use inner rotation for automated stuff, outer for manual controls if we wanted,
        // but OrbitControls will rotate the CAMERA around the group origin.
        outerRef.current.rotation.y = p * Math.PI * 2 + t * 0.08;
        outerRef.current.rotation.x = Math.sin(p * Math.PI) * 0.1;
    });

    return (
        <Float speed={1.25} floatIntensity={0.25} rotationIntensity={0.1}>
            <group ref={outerRef}>
                <group ref={innerRef}>
                    <primitive object={scene} />
                </group>
            </group>
        </Float>
    );
}

/* ─── Lighting — site blue/purple ───────────────────────────── */
function Lights() {
    return (
        <>
            <ambientLight intensity={2.2} color="#eef2ff" />
            <directionalLight position={[5, 10, 6]} intensity={3} color="#b4cdff"
                castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
            <pointLight position={[-4, 3, 4]} intensity={2.5} color="#c084fc" />
            <pointLight position={[6, -2, -3]} intensity={2.0} color="#6B9FF7" />
            <pointLight position={[0, -4, 3]} intensity={1.0} color="#dde8ff" />
        </>
    );
}

/* ─── Main export ────────────────────────────────────────────── */
export default function CTAScene3D({ scrollProgress }: {
    scrollProgress: React.MutableRefObject<number>;
}) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    if (!ready) return null;

    return (
        <div className="w-full h-full" style={{ cursor: "grab" }}>
            <Canvas
                camera={{ position: [0, 0.2, 6], fov: 44 }}
                shadows
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.25,
                }}
            >
                <Lights />
                <Environment preset="city" />
                <ChumModel scrollProgress={scrollProgress} />
                <ContactShadows
                    position={[0, -1.8, 0]}
                    opacity={0.18}
                    width={6}
                    height={6}
                    blur={2.5}
                    far={3}
                    color="#8B9FF8"
                />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableDamping={true}
                    dampingFactor={0.05}
                    rotateSpeed={0.8}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
}

useGLTF.preload("/3D/chum_chompkins_-_poppy_playtime_chapter_5.glb");
