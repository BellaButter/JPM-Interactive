import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Articles - JPM Interactive",
    description: "Articles and insights from JPM Interactive on creative technology, digital experiences, and interactive solutions.",
};

export default function ContentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="font-articles">{children}</div>;
}
