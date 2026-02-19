/**
 * Lightweight placeholder for CTASection while the real component (WebGL/video) loads.
 * Matches CTA non-pinned layout to avoid CLS.
 */
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function CTAPlaceholder() {
    return (
        <section
            className="relative z-30 isolate w-full min-w-full max-w-none text-gray-900 pt-16 sm:pt-24 pb-12 sm:pb-20 bg-white"
            aria-hidden
        >
            <Container className="h-full py-16 sm:py-20">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 gap-16 sm:gap-20">
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 sm:mb-6">
                            JPM Interactive
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed font-light mb-8">
                            Where Technology Meets Creativity
                        </p>
                        <div
                            className="w-full rounded-2xl bg-gray-100 aspect-video max-w-[48rem] mx-auto mb-8 sm:mb-12 flex items-center justify-center"
                        >
                            <span className="text-sm text-gray-400">Loading…</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-8">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                            Let&apos;s work together!
                        </h3>
                        <p className="text-base sm:text-lg text-gray-600">
                            Is your big idea waiting to build?
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-base sm:text-lg font-bold rounded-full px-8 py-4 border-2 border-[#6192F8]/25 bg-white text-[#6192F8]"
                        >
                            Get In Touch
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
