"use client";

import dynamic from "next/dynamic";

const CursorTrail = dynamic(() => import("@/components/cursor/CursorTrail"), { ssr: false });
const BackgroundMusic = dynamic(() => import("@/components/ui/BackgroundMusic"), { ssr: false });

export default function ClientOnlyComponents() {
    return (
        <>
            <CursorTrail />
            <BackgroundMusic />
        </>
    );
}
