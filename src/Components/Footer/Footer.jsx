'use client';
import { useEffect, useRef } from "react";

export default function Footer() {
    const footerRef = useRef(null);
    const revealRef = useRef(null);
    const bottomRef = useRef(null);
    const reveal = useRef({ target: 0, value: 0 });
    const rafId = useRef(null);

    useEffect(() => {
        const footer = footerRef.current;
        if (!footer) return;

        const onScroll = () => {
            const rect = footer.getBoundingClientRect();
            const vh = window.innerHeight;
            // 0 the moment the footer's top touches the bottom of the
            // viewport, 1 once it's scrolled a third of the way up.
            const progress = 1 - (rect.top - vh * 0.15) / (vh * 0.6);
            reveal.current.target = Math.min(1, Math.max(0, progress));
        };

        const tick = () => {
            const r = reveal.current;
            r.value += (r.target - r.value) * 0.08;
            const v = r.value.toFixed(4);
            // Same --reveal value drives both the wordmark clip and the
            // bottom bar fade — one scroll progress, two elements.
            revealRef.current?.style.setProperty("--reveal", v);
            bottomRef.current?.style.setProperty("--reveal", v);
            rafId.current = requestAnimationFrame(tick);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        rafId.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <footer ref={footerRef} className="relative overflow-hidden border-t border-[#7fb069]/15 bg-[#040a06] px-6 py-12 sm:px-8">
            <div className="relative w-full">
                <div ref={revealRef} className="pointer-events-none relative select-none overflow-hidden" style={{ "--reveal": 0 }}>
                    <span
                        className="header-footer block text-transparent"
                        style={{
                            fontSize: "clamp(2.5rem, 16vw, 9rem)",
                            whiteSpace: "nowrap",
                            WebkitTextStroke: "1px rgba(255,255,255,0.8)",
                            clipPath: "inset(0 calc((1 - var(--reveal)) * 100%) 0 0)",
                            transform: "translateY(calc((1 - var(--reveal)) * 24px))",
                            opacity: "calc(0.4 + var(--reveal) * 0.6)",
                        }}
                    >
                        VERDANA
                    </span>
                </div>

                <div ref={bottomRef} className="mt-10 flex flex-col gap-4 border-t border-[#7fb069]/10 pt-5 text-[0.62rem] uppercase tracking-[0.14em] text-[#c0d4b8] sm:flex-row sm:items-center sm:justify-between" style={{"--reveal": 0, opacity: "var(--reveal)", transform: "translateY(calc((1 - var(--reveal)) * 16px))",}}>
                    <span>© {new Date().getFullYear()} Verdana Retreats</span>
                    <div className="flex gap-6">
                        <a href="#" className="transition-colors hover:text-[#c9a84c]">Privacy</a>
                        <a href="#" className="transition-colors hover:text-[#c9a84c]">Terms</a>
                    </div>
                    <span className="text-[#c9a84c]">Made for the wild</span>
                </div>
            </div>
        </footer>
    );
}