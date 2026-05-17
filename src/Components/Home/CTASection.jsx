'use client';
import { useState, useEffect, useRef } from "react";

export default function CTASection() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [focused, setFocused] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const handle = (e) => {
            const rect = el.getBoundingClientRect();
            setMousePos({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
            });
        };
        el.addEventListener("mousemove", handle);
        return () => el.removeEventListener("mousemove", handle);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#040a06] py-28 sm:py-36"
        >
            {/* ── Dynamic radial that follows mouse ── */}
            <div
                className="pointer-events-none absolute inset-0 transition-all duration-700 ease-out"
                style={{
                    background: `radial-gradient(700px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(26,92,53,0.09) 0%, transparent 65%)`,
                }}
            />

            {/* ── Static ambient orbs ── */}
            <div className="pointer-events-none absolute -left-28 top-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-[#1a5c35] opacity-[0.055] blur-[100px]" />
            <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full bg-[#c9a84c] opacity-[0.04] blur-[90px]" />

            {/* ── Decorative horizontal rules ── */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,.25)] to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(127,176,105,.15)] to-transparent" />

            {/* ── Floating leaf marks ── */}
            {[
                { top: '14%', left: '8%', size: '2rem', rotate: '-20deg', opacity: 0.07 },
                { top: '70%', left: '5%', size: '1.4rem', rotate: '10deg', opacity: 0.05 },
                { top: '20%', right: '9%', size: '1.8rem', rotate: '30deg', opacity: 0.06 },
                { top: '65%', right: '6%', size: '1.2rem', rotate: '-15deg', opacity: 0.04 },
            ].map((s, i) => (
                <span
                    key={i}
                    className="pointer-events-none absolute select-none"
                    style={{
                        top: s.top, left: s.left, right: s.right,
                        fontSize: s.size,
                        transform: `rotate(${s.rotate})`,
                        opacity: s.opacity,
                    }}
                >
                    🌿
                </span>
            ))}

            {/* ── Content ── */}
            <div className="relative mx-auto max-w-[680px] px-6 text-center">

                {/* Eyebrow pill */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,76,.2)] bg-[rgba(201,168,76,.06)] px-5 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9a84c] shadow-[0_0_6px_#c9a84c]" />
                    <span className="text-[0.68rem] tracking-[0.22em] uppercase text-[#c9a84c] font-medium">
                        Stay in the Loop
                    </span>
                </div>

                {/* Headline */}
                <h2 className="mb-5 font-serif text-[2.8rem] sm:text-[3.6rem] lg:text-[4.2rem] font-light leading-[1.1] tracking-[-0.01em] text-[#f4efe6]">
                    The Wild Has
                    <br />
                    <em
                        className="not-italic"
                        style={{
                            background: 'linear-gradient(135deg, #c9a84c 0%, #f0d080 45%, #c9a84c 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontStyle: 'italic',
                        }}
                    >
                        Much to Whisper
                    </em>
                </h2>

                {/* Sub-copy */}
                <p className="mx-auto mb-10 max-w-[46ch] text-[0.85rem] leading-[1.9] text-[rgba(192,212,184,.5)]">
                    Join 12,000+ nature lovers who receive curated retreat recommendations,
                    seasonal offers and trail stories — no spam, ever.
                </p>

                {/* Form / Success */}
                {!sent ? (
                    <div className="mx-auto flex max-w-[500px] flex-col gap-3 sm:flex-row">
                        <div
                            className="relative flex-1 transition-all duration-200"
                            style={{
                                filter: focused
                                    ? 'drop-shadow(0 0 14px rgba(201,168,76,0.12))'
                                    : 'none',
                            }}
                        >
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                onKeyDown={(e) => e.key === 'Enter' && email && setSent(true)}
                                className="w-full rounded-xl border border-[rgba(127,176,105,.18)] bg-[rgba(255,255,255,.04)] px-5 py-4 text-[0.82rem] text-[#f4efe6] placeholder-[rgba(192,212,184,.3)] outline-none transition-all duration-200 focus:border-[rgba(201,168,76,.35)] focus:bg-[rgba(255,255,255,.06)]"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => email && setSent(true)}
                            className="group relative shrink-0 overflow-hidden rounded-xl bg-[#c9a84c] px-7 py-4 text-[0.82rem] font-semibold tracking-[0.04em] text-[#040a06] transition-all duration-200 hover:bg-[#d9bc6a] active:scale-[0.97]"
                        >
                            {/* Shimmer */}
                            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-500 group-hover:translate-x-[200%]" />
                            <span className="relative flex items-center gap-2">
                                Subscribe
                                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                            </span>
                        </button>
                    </div>
                ) : (
                    <div className="mx-auto inline-flex items-center gap-3 rounded-xl border border-[rgba(127,176,105,.2)] bg-[rgba(26,92,53,.15)] px-7 py-4">
                        <span className="text-xl">🌱</span>
                        <span className="text-[0.82rem] tracking-[0.04em] text-[#a8d4a0]">
                            Welcome to the wild, wanderer.
                        </span>
                    </div>
                )}

                {/* Trust micro-copy */}
                {!sent && (
                    <p className="mt-5 text-[0.68rem] tracking-[0.08em] text-[rgba(192,212,184,.22)] uppercase">
                        Free forever · Unsubscribe any time
                    </p>
                )}

                {/* Stat row */}
                <div className="mt-14 flex flex-wrap justify-center gap-px overflow-hidden rounded-2xl border border-[rgba(127,176,105,.1)]">
                    {[
                        { value: '12k+', label: 'Subscribers' },
                        { value: '340+', label: 'Retreats listed' },
                        { value: '4.9 ★', label: 'Avg. retreat rating' },
                    ].map(({ value, label }, i) => (
                        <div
                            key={label}
                            className="flex flex-1 min-w-[110px] flex-col items-center gap-1 bg-[rgba(255,255,255,.025)] px-6 py-5"
                        >
                            <span className="font-serif text-[1.4rem] font-light text-[#c9a84c]">{value}</span>
                            <span className="text-[0.66rem] tracking-[0.12em] uppercase text-[rgba(192,212,184,.35)]">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}