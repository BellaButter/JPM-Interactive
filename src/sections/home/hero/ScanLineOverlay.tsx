"use client";

export default function ScanLineOverlay() {
    return (
        <div
            className="scan-line-overlay"
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 100,
                opacity: 0.15,
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: `repeating-linear-gradient(
                        0deg,
                        transparent 0px,
                        rgba(255, 255, 255, 0.03) 1px,
                        transparent 2px,
                        transparent 4px
                    )`,
                    animation: 'scan 8s linear infinite',
                }}
            />
            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(100%); }
                }
            `}</style>
        </div>
    );
}
