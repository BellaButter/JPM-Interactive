"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const VIDEO_ASPECT = 16 / 9;

type CTAVideoSceneProps = {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    videoReady: boolean;
};

export function CTAVideoScene({ videoRef, videoReady }: CTAVideoSceneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [texture, setTexture] = useState<THREE.VideoTexture | null>(null);
    const { viewport } = useThree();

    useEffect(() => {
        if (!videoReady || !videoRef.current) return;
        const video = videoRef.current;
        const tex = new THREE.VideoTexture(video);
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
        return () => {
            tex.dispose();
            setTexture(null);
        };
    }, [videoReady, videoRef]);

    useFrame(() => {
        if (texture) texture.needsUpdate = true;
    });

    if (!texture) return null;

    const vw = viewport.width;
    const vh = viewport.height;
    const viewAspect = vw / vh;
    const w = viewAspect >= VIDEO_ASPECT ? vw : vh * VIDEO_ASPECT;
    const h = viewAspect >= VIDEO_ASPECT ? vw / VIDEO_ASPECT : vh;

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <planeGeometry args={[w, h]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    );
}
