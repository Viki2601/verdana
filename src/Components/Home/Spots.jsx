'use client';
import { useState, useEffect, useRef } from 'react';
import { SPOTS } from "../../../utils/data";
import Carousel from "../Carousel/Carousel";
import { useReveal } from "../../hooks/useReveal";

function SpotCard({ spot }) {
    const [hovered, setHovered] = useState(false);
    const videoRef = useRef(null);

    const handleEnter = () => {
        setHovered(true);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => { });
        }
    };

    const handleLeave = () => {
        setHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.35)] cursor-pointer" style={{ minHeight: '300px', height: '300px' }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <div className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-opacity duration-500" style={{ backgroundImage: `url(${spot?.image})`, backgroundColor: spot?.gradient, opacity: hovered ? 0 : 1, }} />
            <video ref={videoRef} src={spot?.video} muted loop playsInline preload="none" className="absolute inset-0 w-full h-full transition-opacity duration-500" style={{ objectFit: 'cover', objectPosition: 'center', opacity: hovered ? 1 : 0, }} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            {/* <div className="absolute inset-0 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at top left, rgba(201,168,76,0.18), transparent 22%)', opacity: hovered ? 0 : 0.9, }} /> */}

            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8">
                <div>
                    <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-[#e6e6e0] backdrop-blur-xl transition-all duration-500 ease-in-out" style={{ transform: hovered ? 'translateX(360px)' : 'translateX(0)', }}>
                        {spot?.tag}
                    </span>
                    <div className="mt-5 mb-3 flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.18em] text-[#c9a84c] transition-all duration-500 ease-in-out" style={{ transform: hovered ? 'translateY(-96px)' : 'translateY(0)', }}>
                        <span>📍</span>
                        <span>{spot?.location}</span>
                    </div>
                    <h3 className="text-3xl font-semibold leading-tight text-[#f4efe6] transition-all duration-500 ease-in-out" style={{ fontFamily: 'var(--font-cormorant)', transform: hovered ? 'translateX(-360px)' : 'translateX(0)' }}>
                        {spot?.name}
                    </h3>
                    <p className="mt-4 max-w-[90%] text-sm leading-6 text-[#d4d6c8]/80 transition-all duration-500 ease-in-out" style={{ opacity: hovered ? 0 : 1, pointerEvents: hovered ? 'none' : 'auto', }}>
                        {spot?.desc}
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="transition-all duration-500 ease-in-out" style={{ transform: hovered ? 'translateY(10px)' : 'translateY(0)', opacity: hovered ? 0 : 1, pointerEvents: 'none', }}>
                        <span className="text-3xl font-semibold text-[#c9a84c]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                            {spot?.price}
                        </span>
                        <span className="text-sm text-[#d4d6c8]/70 ml-2">{spot?.unit}</span>
                    </div>
                    <button className="rounded-full border px-5 py-3 text-sm font-semibold text-[#f4efe6] transition-all duration-300 whitespace-nowrap" style={{ borderColor: hovered ? spot?.accent : 'rgba(201,168,76,0.4)', background: hovered ? `${spot?.accent}28` : 'rgba(15,27,18,0.75)', boxShadow: hovered ? `0 0 24px ${spot?.accent}40` : 'none', }}>
                        Explore →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function SpotsSection() {
    const { ref: sectionRef, isVisible } = useReveal();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const spotCards = SPOTS.map((spot) => (
        <SpotCard key={spot?.id} spot={spot} />
    ));

    return (
        <section ref={sectionRef} id="spots" className={`relative overflow-hidden py-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ background: 'radial-gradient(circle at top left, rgba(201,168,76,0.12), transparent 35%), linear-gradient(180deg,#060e09 0%,#0a1810 100%)', }}>
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                <div className={`mb-14 transition-all duration-1000 delay-100${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                    <Carousel className="px-2">{spotCards}</Carousel>
                ) : (
                    <div className={`grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {spotCards}
                    </div>
                )}
            </div>
        </section>
    );
}