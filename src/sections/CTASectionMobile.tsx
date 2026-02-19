"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";

const CINEMATIC_VIDEO_SRC = "/Cinematic/cinematic.mp4";
const CINEMATIC_POSTER_SRC = "/Cinematic/frame_0080.jpg";

const narrativeBlocks = [
    {
        id: "intro",
        headline: "JPM Interactive",
        subtext: "Where Technology Meets Creativity",
        sideText: {
            title: "Creative Digital Experiences",
            description: "At JPM Interactive, we don't follow trends for the sake of it. We believe in a different approach - one that's centered around you, your audience, and the art of creating a memorable, personalized experience."
        }
    }
];

export default function CTASectionMobile() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [videoShouldLoad, setVideoShouldLoad] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) setVideoShouldLoad(true);
            },
            { rootMargin: "100px 0px", threshold: 0 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const block = narrativeBlocks[0];

    return (
        <section
            ref={sectionRef}
            className="relative z-30 w-full pt-16 sm:pt-24 pb-12 sm:pb-20 bg-white"
        >
            <Container className="flex flex-col items-center gap-10 sm:gap-12">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-2">
                        {block.headline}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed font-light mb-6">
                        {block.subtext}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
                        {block.sideText?.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-8">
                        {block.sideText?.description}
                    </p>
                </div>

                <div className="relative w-full rounded-2xl shadow-xl overflow-hidden bg-black aspect-video max-w-2xl">
                    {videoShouldLoad ? (
                        <video
                            src={CINEMATIC_VIDEO_SRC}
                            poster={CINEMATIC_POSTER_SRC}
                            muted
                            playsInline
                            loop
                            autoPlay
                            className="w-full h-full object-cover"
                            aria-label="JPM Interactive Showcase"
                        />
                    ) : (
                        <img
                            src={CINEMATIC_POSTER_SRC}
                            alt="JPM Interactive Showcase"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Let&apos;s work together!
                    </h3>
                    <p className="text-base text-gray-600 mb-6">
                        Is your big idea waiting to build?
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 text-base sm:text-lg font-bold rounded-full min-w-[12rem] px-8 py-4 border-2 border-[#6192F8]/25 bg-white text-[#6192F8] touch-manipulation active:scale-[0.98] transition-transform"
                    >
                        Get In Touch
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </Container>
        </section>
    );
}
