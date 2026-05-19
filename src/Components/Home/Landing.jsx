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

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check, { passive: true });
        return () => window.removeEventListener("resize", check);
    }, []);
    return isMobile;
};

const useTouchToMouseBridge = (containerRef, enabled) => {
    useEffect(() => {
        if (!enabled) return;
        const container = containerRef.current;
        if (!container) return;
        const getCanvas = () => container.querySelector("canvas");

        function dispatchMouseEvent(type, touch) {
            const canvas = getCanvas();
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            canvas.dispatchEvent(new MouseEvent(type, {
                bubbles: true, cancelable: true,
                clientX: touch.clientX, clientY: touch.clientY,
                screenX: touch.clientX - rect.left, screenY: touch.clientY - rect.top,
            }));
        }

        const onTouchStart = (e) => {
            dispatchMouseEvent("mousemove", e.touches[0]);
            dispatchMouseEvent("click", e.touches[0]);
        };
        const onTouchMove = (e) => dispatchMouseEvent("mousemove", e.touches[0]);
        container.addEventListener("touchstart", onTouchStart, { passive: true });
        container.addEventListener("touchmove", onTouchMove, { passive: true });
        return () => {
            container.removeEventListener("touchstart", onTouchStart);
            container.removeEventListener("touchmove", onTouchMove);
        };
    }, [containerRef, enabled]);
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

const LEFT_TREES = [
    {
        src: "https://zhanfg2pg2.ufs.sh/f/c8fuuCqs4lu2nFLJ18sOh8o7lMFsbAcerJSRd2ET6mCjIGW1",
        className: "h-[520px] sm:h-[620px] w-[320px] sm:w-[380px] rounded-[40px] min-w-[250px]",
        style: { marginBottom: '-220px', marginRight: '-524px' },
    },
    {
        src: "https://zhanfg2pg2.ufs.sh/f/c8fuuCqs4lu24Qh0d1JCaVyhz0b7D3v8HMJO9eW2cx4ojFgt",
        className: "h-[520px] sm:h-[620px] w-[320px] sm:w-[380px] rounded-[40px] min-w-[250px]",
        style: { marginBottom: '-180px', marginRight: '-512px' },
    },
    {
        src: "https://zhanfg2pg2.ufs.sh/f/c8fuuCqs4lu2bLVWjQ64ZSAgU1jEw3BthvWKm9qFD4TNXYIb",
        className: "h-[520px] sm:h-[620px] w-[320px] sm:w-[380px] rounded-[40px] min-w-[250px]",
        style: { marginBottom: '-80px', marginRight: '400px' },
    },
    {
        src: "https://zhanfg2pg2.ufs.sh/f/c8fuuCqs4lu2H74mdEu6esjuhNMCvDq9kPfLXYSmFaEOoHR5",
        className: "h-[420px] sm:h-[500px] w-[280px] sm:w-[340px] rounded-[36px] min-w-[250px]",
        style: { marginBottom: '-100px', marginLeft: '-320px' },
    },
    {
        src: "https://zhanfg2pg2.ufs.sh/f/c8fuuCqs4lu2Buu0TUEGlbupVxAHtyOkTLm0DJ38cYEUZS7I",
        className: "h-[1720px] sm:h-[500px] w-[280px] sm:w-[340px] rounded-[36px] min-w-[1210px]",
        style: { marginBottom: '-100px', marginLeft: '-870px' },
    },
];

function TreeCorners({ scrollY }) {
    const treeOpacity = Math.max(0, 1 - scrollY / 260);
    const treeShift = Math.min(scrollY * 0.24, 180);
    const treeY = Math.min(scrollY * 0.08, 36);

    return (
        <div className="pointer-events-none absolute left-0 bottom-0 z-20 hidden lg:flex items-end gap-1 sm:gap-2 px-4 pb-4 sm:px-6" style={{ opacity: treeOpacity, transform: `translate3d(-${treeShift}px, ${treeY}px, 0)`, transition: 'transform 0.2s ease-out, opacity 0.2s ease-out', }}>
            {LEFT_TREES.map((tree, i) => (
                <div key={i} className={`${tree.className} bg-contain bg-no-repeat bg-center`} style={{ ...tree.style, backgroundImage: `url(${tree.src})` }} />
            ))}
        </div>
    );
}

/* ── Mobile ripple — pure CSS, zero grain ────────────────────────
   A set of expanding ring keyframes centered on last touch point.
   Looks like calm water rings, no WebGL artifacts.
──────────────────────────────────────────────────────────────── */
function MobileRippleCanvas() {
    const [ripples, setRipples] = useState([]);
    const idRef = useRef(0);

    const addRipple = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : e;
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const id = idRef.current++;
        setRipples(r => [...r, { id, x, y }]);
        setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 1800);
    };

    return (
        <div className="absolute inset-0 z-[1] overflow-hidden" onTouchStart={addRipple} onClick={addRipple} style={{ cursor: 'crosshair' }}>
            {ripples.map(rp => (
                <span key={rp.id} style={{ position: 'absolute', left: rp.x, top: rp.y, transform: 'translate(-50%, -50%)', width: 10, height: 10, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.55)', animation: 'mobileRipple 1.8s ease-out forwards', pointerEvents: 'none', }} />
            ))}
            <style>{`
                @keyframes mobileRipple {
                    0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.7; }
                    60%  { transform: translate(-50%,-50%) scale(18);  opacity: 0.25; }
                    100% { transform: translate(-50%,-50%) scale(28);  opacity: 0; }
                }
            `}</style>
        </div>
    );
}

function LandingContent({ scrollY }) {
    const heroOpacity = Math.max(1 - scrollY / 640, 0.24);
    const heroTranslate = Math.min(scrollY * 0.16, 100);
    const heroScale = 1 + Math.min(scrollY / 2600, 0.05);

    return (
        <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(13,58,32,0.24)_0%,rgba(6,14,9,0.5)_52%,rgba(4,10,6,0.85)_100%)] pointer-events-none" />
            <div className="relative z-10 flex max-w-7xl flex-col gap-12 px-6 py-24 sm:px-8 md:py-32 lg:flex-row items-start lg:gap-16" style={{ transform: `translateY(-${heroTranslate}px) scale(${heroScale})`, opacity: heroOpacity, transition: "transform 0.2s ease-out, opacity 0.2s ease-out", }}>
                <div className="lg:flex-1">
                    <div className="eyebrow mb-5 text-sm uppercase tracking-[0.28em] text-[#d7d7c6]/80">✦ Nature-First Escapes ✦</div>
                    <h1 className="section-h mb-6 max-w-[14ch] text-[clamp(3rem,4.8vw,5.8rem)] leading-[0.95] tracking-[-0.04em] text-[#f4efe6]">
                        Find your next
                        <br />
                        <span className="gradient-text">mountain retreat</span>
                    </h1>
                    <p className="max-w-2xl text-base leading-[1.85] text-[rgba(244,239,230,0.84)] sm:text-lg">
                        Seamless booking for curated cabins, lodges, and forest hideaways — designed to reconnect you with the wild while keeping comfort front of mind.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <button className="cursor-pointer btn-gold inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-semibold transition duration-300 hover:-translate-y-0.5">
                            Book a Spot →
                        </button>
                        <button className="cursor-pointer inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold text-white/90 transition duration-300 hover:bg-white/15">
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
    const isMobile = useIsMobile();
    const containerRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    useTouchToMouseBridge(containerRef, !isMobile && !!webgl);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isMobile) {
        return (
            <section className="relative w-full overflow-hidden" style={HERO_STYLE}>
                <MobileRippleCanvas />
                <LandingContent scrollY={scrollY} />
                <TreeCorners scrollY={scrollY} />
            </section>
        );
    }

    if (webgl === null || webgl === false) {
        return (
            <section className="relative w-full overflow-hidden bg-cover bg-center" style={HERO_STYLE}>
                <LandingContent scrollY={scrollY} />
                <TreeCorners scrollY={scrollY} />
            </section>
        );
    }

    return (
        <section ref={containerRef} className="relative w-full overflow-hidden p-5 lg:p-24">
            <TreeCorners scrollY={scrollY} />
            <WaterWave imageUrl={HERO_IMAGE_URL} dropRadius={20} perturbance={0.03} resolution={512} style={{ ...HERO_STYLE, width: "100%", borderRadius: "3rem" }}>
                {() => <LandingContent scrollY={scrollY} />}
            </WaterWave>
        </section>
    );
};