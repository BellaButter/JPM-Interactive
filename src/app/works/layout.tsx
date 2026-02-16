import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Works - JPM Interactive",
    description: "Explore our portfolio of interactive experiences, LED visuals, touch screen solutions, and multimedia design.",
};

export default function WorksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
