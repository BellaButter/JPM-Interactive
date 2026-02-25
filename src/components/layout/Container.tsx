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
                paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
                paddingRight: "clamp(1.5rem, 5vw, 4rem)",
            }}
        >
            {children}
        </div>
    );
}
