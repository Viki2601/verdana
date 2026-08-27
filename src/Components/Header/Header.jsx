'use client';
import { useEffect, useState } from "react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const nav = ["Spots", "Rooms", "Plans", "Rents"];

    return (
        <header className="fixed inset-x-0 top-4 z-50 px-4">
            {/* Distortion filter — gives the glass a subtle refractive "bend" like
                Apple's Liquid Glass. Chrome/Edge render the displacement; Safari/Firefox
                silently ignore the url() and fall back to the plain blur, which still
                looks correct because of the gradient + highlight layers below. */}
            <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
                <filter id="liquid-glass-refraction" x="-30%" y="-30%" width="160%" height="160%">
                    {/* Low frequency = big, smooth blobs, which is what makes straight
                        lines visibly *curve* as they pass through the glass, instead of
                        just looking noisy. This is the main thing that reads as "liquid"
                        rather than "frosted". */}
                    <feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves="1" seed="12" result="noise" />
                    <feGaussianBlur in="noise" stdDeviation="6" result="softNoise" />
                    <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="45" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>

            <div
                className={`liquid-glass relative mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-3xl px-4 py-3 transition-[background,box-shadow,border-color] duration-500 ${scrolled ? "liquid-glass--scrolled" : ""}`}
            >
                {/* Refractive blur layer */}
                <span className="liquid-glass__blur" />
                {/* Dark tint — guarantees text stays legible no matter what's
                    scrolling behind the header (bright sky, snow, light photos) */}
                <span className="liquid-glass__tint" />
                {/* Top-left specular highlight — a contained catch-light, not a wash */}
                <span className="liquid-glass__sheen" />
                {/* Hairline edge light */}
                <span className="liquid-glass__edge" />

                <a href="#" className="relative z-10 flex items-center gap-3 no-underline">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full text-[1.2rem] text-[#c9a84c] shadow-[0_10px_25px_rgba(0,0,0,.18)]">
                        🌿
                    </div>
                    <span className="header-brand text-[1.75rem] text-white">Verdana</span>
                </a>

                <nav className="relative z-10 hidden items-center gap-8 md:flex">
                    {nav?.map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-white/80 transition-colors duration-200 hover:text-[#c9a84c]">
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="relative z-10 flex items-center gap-3">
                    <button className="hidden rounded-full bg-gradient-to-r from-[#c9a84c] via-[#b99b3c] to-[#c9a84c] px-6 py-3 text-[0.78rem] font-semibold text-[#060e09] shadow-[0_12px_30px_rgba(201,168,76,.25)] transition-transform duration-300 hover:-translate-y-0.5 md:inline-flex">
                        Book a Spot
                    </button>
                    <button type="button" onClick={() => setMenuOpen(!menuOpen)} onTouchEnd={(e) => { e.preventDefault(); setMenuOpen((prev) => !prev); }} className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 transition hover:border-white/25 hover:bg-white/15 md:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>
                        <span className={`pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white transition-all duration-300 origin-center ${menuOpen ? "translate-y-[0px] rotate-45" : "-translate-y-2"}`} />
                        <span className={`pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white transition-all duration-300 origin-center ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                        <span className={`pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[0px] -rotate-45" : "translate-y-2"}`} />
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="liquid-glass relative mx-auto mt-3 max-w-[1280px] rounded-[2rem] p-5 md:hidden">
                    <span className="liquid-glass__blur" />
                    <span className="liquid-glass__tint" />
                    <span className="liquid-glass__sheen" />
                    <span className="liquid-glass__edge" />
                    <div className="relative z-10">
                        {nav.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block rounded-3xl px-4 py-3 text-lg font-medium tracking-[0.08em] text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-[#c9a84c]">
                                {item}
                            </a>
                        ))}
                        <button className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#c9a84c] via-[#b99b3c] to-[#c9a84c] px-6 py-3 text-[0.78rem] font-semibold text-[#060e09] shadow-[0_12px_30px_rgba(201,168,76,.25)]">
                            Book a Spot
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .liquid-glass {
                    isolation: isolate;
                    overflow: hidden;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.16);
                    /* The outer shadow gives it lift off the page; the two inset
                       lines are the "dome" bevel — a bright line where light catches
                       the top rim, a dark one where the underside falls into shadow.
                       That pairing is what makes glass read as a solid, curved object
                       instead of a flat panel with a blur on it. */
                    box-shadow:
                        0 24px 60px rgba(0, 0, 0, 0.35),
                        0 1.5px 0 rgba(255, 255, 255, 0.4) inset,
                        0 -1.5px 0 rgba(0, 0, 0, 0.35) inset;
                }

                .liquid-glass--scrolled {
                    border-color: rgba(255, 255, 255, 0.22);
                    box-shadow:
                        0 24px 60px rgba(0, 0, 0, 0.45),
                        0 1.5px 0 rgba(255, 255, 255, 0.45) inset,
                        0 -1.5px 0 rgba(0, 0, 0, 0.4) inset;
                }

                /* The actual blur + refraction. Sitting on its own layer (instead of
                   on the container) lets us push the blur strength up without also
                   blurring the tint/sheen/edge layers drawn on top of it. Dropped
                   brightness() entirely — it was pushing already-bright hero photos
                   (sky, snow) toward blown-out white. */
                .liquid-glass__blur {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    border-radius: inherit;
                    backdrop-filter: blur(22px) saturate(160%) url(#liquid-glass-refraction);
                    -webkit-backdrop-filter: blur(22px) saturate(160%);
                }

                /* Constant dark tint at the brand color, UNDER the highlight layers.
                   This is what keeps white nav text legible no matter what's
                   scrolling behind — bright sky, snow, light product photos — and is
                   also what was missing before: without it, "glass" just means
                   "whatever's behind, blurred," with no material identity of its own. */
                .liquid-glass__tint {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                    pointer-events: none;
                    border-radius: inherit;
                    background: rgba(6, 14, 9, 0.38);
                }

                .liquid-glass--scrolled .liquid-glass__tint {
                    background: rgba(6, 14, 9, 0.5);
                }

                /* Contained catch-light in the top-left, like light hitting a curved
                   surface — a highlight, not a wash across the whole bar. Plain
                   opacity instead of mix-blend-mode so it can't blow out against
                   bright backdrops. */
                .liquid-glass__sheen {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    pointer-events: none;
                    border-radius: inherit;
                    background: radial-gradient(80% 100% at 12% -10%, rgba(255, 255, 255, 0.35), transparent 50%);
                }

                /* Hairline rim light that traces the top/left edge, fading out
                   toward the bottom/right — the beveled lip of real glass. */
                .liquid-glass__edge {
                    position: absolute;
                    inset: 0;
                    z-index: 3;
                    pointer-events: none;
                    border-radius: inherit;
                    padding: 1px;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0) 35%, rgba(255, 255, 255, 0) 65%, rgba(255, 255, 255, 0.18));
                    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                }

                @media (prefers-reduced-transparency: reduce) {
                    .liquid-glass__blur {
                        backdrop-filter: none;
                        -webkit-backdrop-filter: none;
                    }
                    .liquid-glass .liquid-glass__tint {
                        background: rgba(6, 14, 9, 0.92);
                    }
                }
            `}</style>
        </header>
    );
}