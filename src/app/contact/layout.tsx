import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact - JPM Interactive",
    description: "Get in touch with JPM Interactive. Let's build your next creative digital experience together.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
