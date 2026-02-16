"use client";

/**
 * Same width & padding as Navigation - keeps all page content aligned and centered.
 * Use inside <main className="flex flex-col items-center w-full"> for proper centering.
 */
export default function PageContainer({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`w-full max-w-[1600px] mx-auto ${className}`.trim()}
            style={{
                paddingLeft: "clamp(1.25rem, 5vw, 2rem)",
                paddingRight: "clamp(1.25rem, 5vw, 2rem)",
            }}
        >
            {children}
        </div>
    );
}
