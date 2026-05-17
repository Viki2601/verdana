'use client';
import { useState, useEffect } from 'react';
import { SPOTS } from "../../../utils/data";
import Carousel from "../Carousel/Carousel";
import { useReveal } from "../../hooks/useReveal";

export default function SpotsSection() {
    const { ref: sectionRef, isVisible } = useReveal();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const spotCards = SPOTS.map((spot) => (
        <div key={spot?.id} className="group relative overflow-hidden rounded-[36px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.35)] transition duration-500 hover:shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${spot?.image})`, backgroundColor: spot?.gradient, minHeight: '420px' }} />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/55 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,168,76,0.18),transparent_22%)] opacity-90" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
                <div>
                    <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-[#e6e6e0] backdrop-blur-xl">
                        {spot?.tag}
                    </span>
                    <div className="mt-5 mb-3 flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.18em] text-[#c9a84c]">
                        <span>📍</span>
                        <span>{spot?.location}</span>
                    </div>
                    <h3 className="text-3xl font-semibold leading-tight text-[#f4efe6]" style={{ fontFamily: "var(--font-cormorant)" }}>
                        {spot?.name}
                    </h3>
                    <p className="mt-4 max-w-[90%] text-sm leading-6 text-[#d4d6c8]/80">
                        {spot?.desc}
                    </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="space-x-2">
                        <span className="text-3xl font-semibold text-[#c9a84c]" style={{ fontFamily: "var(--font-cormorant)" }}>{spot?.price}</span>
                        <span className="text-sm text-[#d4d6c8]/70">{spot?.unit}</span>
                    </div>
                    <button className="rounded-full border border-[#c9a84c]/40 bg-[#0f1b12]/75 px-5 py-3 text-sm font-semibold text-[#f4efe6] transition duration-300 hover:border-[#c9a84c] hover:bg-[#c9a84c]/18 hover:text-white">
                        Explore →
                    </button>
                </div>
            </div>
        </div>
    ));

    return (
        <section ref={sectionRef} id="spots" className={`relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(201,168,76,0.12),transparent_35%),linear-gradient(180deg,#060e09_0%,#0a1810_100%)] py-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                <div className={`mb-14 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="eyebrow mb-3">✦ Handpicked Destinations</div>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 className="section-h text-[#f4efe6]">
                            Where Will <em className="italic text-[#c9a84c]">You</em> Wander?
                        </h2>
                        <a href="#" className="text-[rgba(192,212,184,0.7)] text-sm uppercase tracking-[0.14em] border-b border-[rgba(192,212,184,0.3)] pb-1 transition hover:text-[#c9a84c]">
                            View All Spots →
                        </a>
                    </div>
                    <div className="nature-divider" />
                </div>

                {isMobile ? (
                    <Carousel className="px-2" >
                        {spotCards}
                    </Carousel>
                ) : (
                    <div className={`grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {spotCards}
                    </div>
                )}
            </div>
        </section>
    );
}