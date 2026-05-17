'use client';
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
const WaterWave = dynamic(() => import("react-water-wave"), { ssr: false, loading: () => null });

const useWebGLSupport = () => {
    const [supported, setSupported] = useState(null);
    useEffect(() => {
        try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            setSupported(!!gl);
        } catch {
            setSupported(false);
        }
    }, []);
    return supported;
};

const useTouchToMouseBridge = (containerRef) => {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const getCanvas = () => container.querySelector("canvas");

        function dispatchMouseEvent(type, touch) {
            const canvas = getCanvas();
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            canvas.dispatchEvent(new MouseEvent(type, {
                bubbles: true,
                cancelable: true,
                clientX: touch.clientX,
                clientY: touch.clientY,
                screenX: touch.clientX - rect.left,
                screenY: touch.clientY - rect.top,
            }));
        }

        const onTouchStart = (e) => {
            const touch = e.touches[0];
            dispatchMouseEvent("mousemove", touch);
            dispatchMouseEvent("click", touch);
        };

        const onTouchMove = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            dispatchMouseEvent("mousemove", touch);
        };

        container.addEventListener("touchstart", onTouchStart, { passive: true });
        container.addEventListener("touchmove", onTouchMove, { passive: false });
        return () => {
            container.removeEventListener("touchstart", onTouchStart);
            container.removeEventListener("touchmove", onTouchMove);
        };
    }, [containerRef]);
};

const HERO_IMAGE_URL = "https://zhanfg2pg2.ufs.sh/f/c8fuuCqs4lu2CDsDw4kMGXUlPiRduax6DmCerHFV93bWK0Bq";
const HERO_STYLE = {
    position: "relative",
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url('${HERO_IMAGE_URL}')`,
};

function LandingContent({ scrollY }) {
    const heroOpacity = Math.max(1 - scrollY / 640, 0.24);
    const heroTranslate = Math.min(scrollY * 0.16, 100);
    const heroScale = 1 + Math.min(scrollY / 2600, 0.05);

    return (
        <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(13,58,32,0.24)_0%,rgba(6,14,9,0.5)_52%,rgba(4,10,6,0.85)_100%)] pointer-events-none" />
            <div className="relative z-10 flex max-w-[1280px] flex-col gap-12 px-6 py-24 sm:px-8 md:py-32 lg:flex-row items-start lg:gap-16" style={{ transform: `translateY(-${heroTranslate}px) scale(${heroScale})`, opacity: heroOpacity, transition: "transform 0.2s ease-out, opacity 0.2s ease-out", }}>
                <div className="lg:flex-1">
                    <div className="eyebrow mb-5 text-sm uppercase tracking-[0.28em] text-[#d7d7c6]/80">
                        ✦ Nature-First Escapes ✦
                    </div>

                    <h1 className="section-h mb-6 max-w-[14ch] text-[clamp(3rem,4.8vw,5.8rem)] leading-[0.95] tracking-[-0.04em] text-[#f4efe6]">
                        Find your next
                        <br />
                        <span className="gradient-text">mountain retreat</span>
                    </h1>

                    <p className="max-w-[42rem] text-base leading-[1.85] text-[rgba(244,239,230,0.84)] sm:text-lg">
                        Seamless booking for curated cabins, lodges, and forest hideaways — designed to reconnect you with the wild while keeping comfort front of mind.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <button className="btn-gold inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-semibold transition duration-300 hover:-translate-y-0.5">
                            Book a Spot →
                        </button>
                        <button className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold text-white/90 transition duration-300 hover:bg-white/15">
                            View itineraries
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function Landing() {
    const webgl = useWebGLSupport();
    const containerRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    useTouchToMouseBridge(containerRef);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (webgl === null || !webgl) {
        return (
            <section className="relative w-full overflow-hidden bg-cover bg-center" style={HERO_STYLE}>
                <LandingContent scrollY={scrollY} />
            </section>
        );
    }

    return (
        <section ref={containerRef} className="relative w-full overflow-hidden p-5 lg:p-24">
            <WaterWave imageUrl={HERO_IMAGE_URL} dropRadius={20} perturbance={0.03} resolution={512} style={{ ...HERO_STYLE, width: "100%", borderRadius: "3rem" }}>
                {() => <LandingContent scrollY={scrollY} />}
            </WaterWave>
        </section>
    );
}
