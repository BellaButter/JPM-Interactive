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
            className={`${className}`.trim()}
            style={{
                width: "100%",
                maxWidth: "1600px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
                paddingRight: "clamp(1.5rem, 5vw, 4rem)",
                boxSizing: "border-box",
            }}
        >
            {children}
        </div>
    );
}
