"use client";

export default function HeroFallback() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0d0d12] pointer-events-none z-0">
            {/* Fallback Gradient - Subtle and Deep */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#11111a] to-[#05050a]" />

            {/* Decorative Grid - Low Opacity */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
}
