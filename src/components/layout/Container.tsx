export default function Container({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`w-full mx-auto ${className}`}
            style={{
                maxWidth: "1600px",
                paddingLeft: "clamp(1.25rem, 5vw, 2rem)",
                paddingRight: "clamp(1.25rem, 5vw, 2rem)",
            }}
        >
            {children}
        </div>
    );
}
