"use client";

export default function NoiseGrain() {
    return (
        <div
            className="noise-grain"
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 90,
                opacity: 0.05,
                mixBlendMode: 'overlay',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                animation: 'grain 0.5s steps(6) infinite',
            }}
        >
            <style jsx>{`
                @keyframes grain {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-5%, -10%); }
                    30% { transform: translate(3%, -15%); }
                    50% { transform: translate(12%, 9%); }
                    70% { transform: translate(9%, 4%); }
                    90% { transform: translate(-1%, 7%); }
                }
            `}</style>
        </div>
    );
}
