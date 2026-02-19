/**
 * Lightweight placeholder for HeroSection while the real component (with 3D/GSAP) loads.
 * Matches hero layout (h-screen) to avoid CLS.
 */
export default function HeroPlaceholder() {
    return (
        <section
            id="hero"
            className="relative w-full h-screen overflow-hidden flex items-center justify-center"
            aria-hidden
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff] via-[#e8f0ff] to-[#f3e8ff]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <h1 className="text-center">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-slate-700 mb-5 sm:mb-8">
                        <span className="inline-block mr-5 sm:mr-8 md:mr-10">Crafting</span>
                        <span className="inline-block">Interactive</span>
                    </div>
                    <div className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-tight">
                        <span className="inline-block bg-gradient-to-r from-[#5B8DEF] via-[#8B5CF6] to-[#C084FC] bg-clip-text text-transparent">
                            Experiences
                        </span>
                    </div>
                </h1>
                <p className="mt-12 text-xs text-slate-500 uppercase tracking-wider">Loading…</p>
            </div>
        </section>
    );
}
