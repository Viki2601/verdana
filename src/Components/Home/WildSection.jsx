'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
    'https://zhanfg2pg2.ufs.sh/f/c8fuuCqs4lu2CdYCYykMGXUlPiRduax6DmCerHFV93bWK0Bq';

const TRIM_END = 10; // seconds to cut from end
const LERP = 0.1; // 0.05 = silky slow, 0.15 = snappy — 0.1 is the sweet spot

const PANELS = [
    {
        at: 0, end: 0.28,
        eyebrow: '✦ The Verdana Experience',
        heading: ['Let the', 'Wild', 'Find You'],
        italic: 1,
        sub: 'Scroll to journey through nature.',
    },
    {
        at: 0.26, end: 0.56,
        eyebrow: '✦ Zero Compromise',
        heading: ['Where Silence', 'is the', 'Amenity'],
        italic: 2,
        sub: 'Every retreat is assessed for light pollution, acoustic isolation, and ecological harmony before it joins our collection.',
    },
    {
        at: 0.54, end: 0.80,
        eyebrow: '✦ Certified Sanctuaries',
        heading: ['Nights Under', 'A Thousand', 'Stars'],
        italic: 1,
        sub: "All listed spots pass our Night Sky Standard. If you can't see the Milky Way, it doesn't make the list.",
    },
    {
        at: 0.78, end: 1.0,
        eyebrow: '✦ Your Escape Awaits',
        heading: ['340+ Retreats.', 'One', 'Decision.'],
        italic: 2,
        sub: null,
        cta: true,
    },
];

function panelOpacity(progress, at, end) {
    const fade = 0.055;
    if (progress <= at || progress >= end) return 0;
    if (progress < at + fade) return (progress - at) / fade;
    if (progress > end - fade) return (end - progress) / fade;
    return 1;
}

export default function WildSection() {
    const wrapRef = useRef(null);
    const videoRef = useRef(null);

    // Scroll state
    const targetRef = useRef(0);   // desired video time (from scroll)
    const lerpedRef = useRef(0);   // current smoothed time (drives video)
    const rafRef = useRef(null);
    const maxTimeRef = useRef(0);   // duration − TRIM_END

    const [progress, setProgress] = useState(0);
    const [ready, setReady] = useState(false);

    /* ── Load video metadata ──────────────────────────────── */
    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;
        vid.pause();
        vid.currentTime = 0;

        const onReady = () => {
            maxTimeRef.current = Math.max(0, vid.duration - TRIM_END);
            setReady(true);
        };

        if (vid.readyState >= 1) {
            onReady();
        } else {
            vid.addEventListener('loadedmetadata', onReady, { once: true });
        }
    }, []);

    /* ── Scroll listener → sets targetRef only ─────────────
       No video seeking here — keeps scroll handler lightweight.
    ──────────────────────────────────────────────────────── */
    useEffect(() => {
        if (!ready) return;

        const onScroll = () => {
            const wrap = wrapRef.current;
            if (!wrap) return;

            const scrollable = wrap.offsetHeight - window.innerHeight; // 200vh
            const scrolled = Math.max(0, -wrap.getBoundingClientRect().top);
            const p = Math.min(1, Math.max(0, scrolled / scrollable));

            setProgress(p);
            targetRef.current = p * maxTimeRef.current;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [ready]);

    /* ── Continuous rAF lerp loop ────────────────────────────
       Runs independently of scroll. Every frame it moves
       lerpedRef a fixed fraction toward targetRef, then
       writes to vid.currentTime only when meaningful.
       This produces butter-smooth interpolation between any
       two seek points — no stutter, no frame cuts.
    ──────────────────────────────────────────────────────── */
    useEffect(() => {
        if (!ready) return;

        const loop = () => {
            const vid = videoRef.current;
            if (vid) {
                const diff = targetRef.current - lerpedRef.current;

                // Only drive the video while there's meaningful difference
                if (Math.abs(diff) > 0.001) {
                    lerpedRef.current += diff * LERP;

                    // Clamp within valid range
                    const clamped = Math.min(
                        Math.max(0, lerpedRef.current),
                        maxTimeRef.current
                    );
                    vid.currentTime = clamped;
                }
            }
            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [ready]);

    return (
        <div
            ref={wrapRef}
            style={{ position: 'relative', height: '300vh', background: '#060e09' }}
        >
            {/* Top blend */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 130,
                background: 'linear-gradient(to bottom, #060e09, transparent)',
                zIndex: 20, pointerEvents: 'none',
            }} />

            {/* ── Sticky viewport ─────────────────────────────── */}
            <div style={{
                position: 'sticky', top: 0,
                height: '100vh', overflow: 'hidden',
            }}>

                {/* Video */}
                <video
                    ref={videoRef}
                    src={VIDEO_URL}
                    muted
                    playsInline
                    preload="auto"
                    style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'center',
                        zIndex: 0,
                    }}
                />

                {/* Gradient overlays */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    background:
                        'linear-gradient(to bottom, rgba(6,14,9,0.40) 0%, rgba(6,14,9,0.18) 50%, rgba(6,14,9,0.65) 100%)',
                }} />
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 2,
                    background:
                        'radial-gradient(ellipse 78% 68% at 50% 50%, transparent 28%, rgba(6,14,9,0.48) 100%)',
                }} />

                {/* ── Scroll progress line ─────────────────────── */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: 2, background: 'rgba(180,220,185,0.10)', zIndex: 20,
                }}>
                    <div style={{
                        height: '100%',
                        width: `${progress * 100}%`,
                        background: 'linear-gradient(90deg, rgba(180,220,185,0.45), rgba(244,239,230,0.65))',
                        transition: 'width 0.03s linear',
                    }} />
                </div>

                {/* ── Scroll nudge ─────────────────────────────── */}
                <div style={{
                    position: 'absolute', bottom: '2.8rem', left: '50%',
                    transform: 'translateX(-50%)', zIndex: 20,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem',
                    opacity: progress < 0.04 ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                    pointerEvents: 'none',
                }}>
                    <span style={{
                        fontFamily: 'var(--font-jost)', fontSize: '0.56rem',
                        letterSpacing: '0.45em', textTransform: 'uppercase',
                        color: 'rgba(244,239,230,0.4)',
                    }}>Scroll</span>
                    <svg width="14" height="22" viewBox="0 0 14 22" fill="none"
                        style={{ animation: 'nudgeBounce 2s ease-in-out infinite' }}>
                        <rect x="5.5" y="0.5" width="3" height="13" rx="1.5"
                            stroke="rgba(244,239,230,0.3)" fill="none" />
                        <circle cx="7" cy="4.5" r="1.4" fill="rgba(244,239,230,0.45)">
                            <animate attributeName="cy" values="4.5;9.5;4.5" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <path d="M3 16l4 5 4-5" stroke="rgba(244,239,230,0.25)" fill="none" />
                    </svg>
                </div>

                {/* ── Content panels ────────────────────────────── */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <div style={{
                        position: 'relative', width: '100%',
                        maxWidth: '860px', padding: '0 40px', minHeight: '400px',
                    }}>
                        {PANELS.map((panel, pi) => {
                            const op = panelOpacity(progress, panel.at, panel.end);
                            const yDrift = op === 0
                                ? (progress < panel.at ? 28 : -28)
                                : 0;

                            return (
                                <div key={pi} style={{
                                    position: 'absolute', inset: 0,
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    gap: 0,
                                    opacity: op,
                                    transform: `translateY(${yDrift}px)`,
                                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                                    pointerEvents: op > 0.15 ? 'all' : 'none',
                                }}>

                                    {/* Eyebrow */}
                                    <p style={{
                                        fontFamily: 'var(--font-jost)',
                                        fontSize: 'clamp(0.54rem, 0.88vw, 0.64rem)',
                                        fontWeight: 400, letterSpacing: '0.5em',
                                        textTransform: 'uppercase',
                                        color: 'rgba(180,220,185,0.7)',
                                        margin: '0 0 1.3rem',
                                    }}>{panel.eyebrow}</p>

                                    {/* Heading */}
                                    <h2 style={{
                                        fontFamily: 'var(--font-cormorant)',
                                        fontSize: 'clamp(3rem, 7.5vw, 6.2rem)',
                                        fontWeight: 300, lineHeight: 1.06,
                                        letterSpacing: '0.04em', textAlign: 'center',
                                        color: '#f4efe6', margin: '0 0 0.4rem',
                                    }}>
                                        {panel.heading.map((word, wi) => (
                                            <span key={wi}>
                                                {wi === panel.italic
                                                    ? <em style={{ fontStyle: 'italic', color: 'rgba(210,240,215,0.88)' }}>{word}</em>
                                                    : word}
                                                {wi < panel.heading.length - 1 && <br />}
                                            </span>
                                        ))}
                                    </h2>

                                    {/* Ornament */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center',
                                        gap: '0.8rem', margin: '1.3rem 0 1.5rem',
                                    }}>
                                        <span style={{ display: 'block', width: '44px', height: '1px', background: 'rgba(180,220,185,0.28)' }} />
                                        <span style={{ fontSize: '0.45rem', color: 'rgba(180,220,185,0.48)' }}>✦</span>
                                        <span style={{ display: 'block', width: '44px', height: '1px', background: 'rgba(180,220,185,0.28)' }} />
                                    </div>

                                    {/* Body */}
                                    {panel.sub && (
                                        <p style={{
                                            fontFamily: 'var(--font-jost)',
                                            fontSize: 'clamp(0.82rem, 1.25vw, 0.95rem)',
                                            fontWeight: 300, lineHeight: 1.9,
                                            letterSpacing: '0.01em', textAlign: 'center',
                                            color: 'rgba(244,239,230,0.52)',
                                            maxWidth: '500px', margin: 0,
                                        }}>{panel.sub}</p>
                                    )}

                                    {/* CTA — last panel */}
                                    {panel.cta && (
                                        <div style={{
                                            display: 'flex', gap: '1.6rem',
                                            flexWrap: 'wrap', justifyContent: 'center',
                                            marginTop: '2rem',
                                        }}>
                                            <a href="#spots" style={{
                                                fontFamily: 'var(--font-jost)',
                                                fontSize: '0.66rem', fontWeight: 500,
                                                letterSpacing: '0.28em', textTransform: 'uppercase',
                                                color: '#060e09', background: '#f4efe6',
                                                padding: '0.9rem 2.2rem', textDecoration: 'none',
                                            }}>Explore Retreats</a>
                                            <a href="#plans" style={{
                                                fontFamily: 'var(--font-jost)',
                                                fontSize: '0.66rem', fontWeight: 400,
                                                letterSpacing: '0.28em', textTransform: 'uppercase',
                                                color: 'rgba(244,239,230,0.58)',
                                                textDecoration: 'none', alignSelf: 'center',
                                                borderBottom: '1px solid rgba(244,239,230,0.22)',
                                                paddingBottom: '2px',
                                            }}>View Plans →</a>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom blend */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: 170,
                    background: 'linear-gradient(to top, #060e09, transparent)',
                    zIndex: 15, pointerEvents: 'none',
                }} />
            </div>

            <style>{`
        @keyframes nudgeBounce {
          0%, 100% { transform: translateY(0);  opacity: 0.75; }
          50%       { transform: translateY(5px); opacity: 0.35; }
        }
      `}</style>
        </div>
    );
}