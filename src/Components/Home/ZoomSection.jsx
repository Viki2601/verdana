'use client';
import { useEffect, useRef, useState } from 'react';

/*
  EXACT RECREATION OF PRISMIC EXAMPLE #26
  ─────────────────────────────────────────────────────────────
  Layer stack (bottom → top):

  [0] Background image     — slow zoom  scale(1 → 1.45)
  [1] Bg darkening overlay — 0 → 0.82 opacity
  [2] TEXT                 — always present, revealed by overlay moving away
  [3] Forest PNG overlay   — scale(1 → 2) + translateZ(0 → 250px) within
                             perspective:500px container. Starts covering text.
                             As it zooms, dark edges fly off-screen, center
                             clearing opens up → text revealed underneath.
  [4] Edge vignette        — permanent soft edge darkening
  ─────────────────────────────────────────────────────────────

  The mask-image on the overlay creates the "clearing in center" effect:
  • Center: mask is 0 → overlay is transparent → text shows through
  • Edges:  mask is 1 → overlay fully visible → dark trees hide text
  As it scales 2×, the edge dark zone moves off-screen, center fills viewport.
*/

const BG = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=2400&q=90&auto=format&fit=crop';
const OVERLAY = 'https://uploads-ssl.webflow.com/5cff83ac2044e22cb8cf2f11/5d13364599bb70e3560cc4e5_background-min%203.png';

export default function ZoomSection() {
    const wrapRef = useRef(null);
    const bgRef = useRef(null);
    const overlayRef = useRef(null);
    const darkRef = useRef(null);
    const rafRef = useRef(null);
    const [progress, setProgress] = useState(0);

    /* ── Keep the visual layers in sync with the section's scroll range. ── */
    useEffect(() => {
        const update = () => {
            rafRef.current = null;
            const wrap = wrapRef.current;
            if (!wrap) return;

            const scrollable = Math.max(1, wrap.offsetHeight - window.innerHeight);
            const scrolled = Math.max(0, -wrap.getBoundingClientRect().top);
            const nextProgress = Math.min(1, Math.max(0, scrolled / scrollable));
            setProgress(nextProgress);

            if (bgRef.current) {
                bgRef.current.style.transform = `scale(${1 + nextProgress * 0.45})`;
            }

            if (darkRef.current) {
                darkRef.current.style.opacity = String(Math.min(0.82, nextProgress * 1.1));
            }

            if (overlayRef.current) {
                const scale = 1 + nextProgress;
                const z = nextProgress * 280;
                overlayRef.current.style.transform = `scale(${scale}) translateZ(${z}px)`;
            }
        };

        const onScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(update);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        update();
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    /* ── Text opacity: revealed as overlay edges fly off ─── */
    // Starts subtly visible (center clearing), fully revealed at p > 0.55
    const textOp = progress < 0.1 ? 0.15 + progress * 0.5 : progress < 0.55 ? 0.2 + ((progress - 0.1) / 0.45) * 0.8 : 1;

    // Subtle upward drift as text reveals
    const textY = progress < 0.55 ? 20 - (progress / 0.55) * 20 : 0;

    return (
        <div ref={wrapRef} style={{ position: 'relative', height: '300vh' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 140, zIndex: 30, pointerEvents: 'none', background: 'linear-gradient(to bottom, #060e09, transparent)', }} />
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#060e09', }}>

                {/* ── [0] Background image ─────────────────────────── */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', }}>
                    <img ref={bgRef} src={BG} alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transformOrigin: 'center center', transform: `scale(${1 + progress * 0.45})`, willChange: 'transform', display: 'block', }} />
                </div>

                {/* ── [1] Background darkening overlay ─────────────── */}
                <div ref={darkRef} style={{ position: 'absolute', inset: 0, zIndex: 1, background: '#060e09', opacity: Math.min(0.82, progress * 1.1), pointerEvents: 'none', }} />

                {/* ── [2] TEXT — lives BEHIND forest overlay ────────── */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: textOp, transform: `translateY(${textY}px)`, pointerEvents: 'none', }}>
                    <p style={{ fontFamily: 'var(--font-jost)', fontSize: 'clamp(0.54rem, 0.9vw, 0.65rem)', fontWeight: 400, letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(180,220,185,0.75)', margin: '0 0 1.5rem', }}>✦ Step Into the Wilderness</p>
                    <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 300, lineHeight: 1.0, letterSpacing: '0.04em', textAlign: 'center', color: '#f4efe6', margin: '0 0 1rem', textShadow: '0 4px 60px rgba(6,14,9,0.9), 0 0 120px rgba(6,14,9,0.7)', }}>
                        Into the<br />
                        Heart of<br />
                        <em style={{ fontStyle: 'italic', color: 'rgba(200,235,205,0.9)' }}>
                            Nature
                        </em>
                    </h2>

                    {/* Ornament */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', margin: '1.8rem 0 1.6rem', }}>
                        <span style={{ display: 'block', width: '56px', height: '1px', background: 'rgba(180,220,185,0.3)' }} />
                        <span style={{ fontSize: '0.45rem', color: 'rgba(180,220,185,0.5)' }}>✦</span>
                        <span style={{ display: 'block', width: '56px', height: '1px', background: 'rgba(180,220,185,0.3)' }} />
                    </div>

                    <p style={{ fontFamily: 'var(--font-jost)', fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', fontWeight: 300, lineHeight: 1.9, letterSpacing: '0.015em', textAlign: 'center', color: 'rgba(244,239,230,0.6)', maxWidth: '480px', margin: '0 0 2.4rem', }}>
                        Every retreat we list is visited, lived in, and judged against
                        a single question — does it make you feel genuinely far from the world?
                    </p>
                </div>

                {/* ── [3] Forest overlay — zooms away to reveal text ────── */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 3, overflow: 'hidden', perspective: '500px', }}>
                    <img ref={overlayRef} src={OVERLAY} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transformOrigin: 'center center', transform: `scale(${1 + progress}) translateZ(${progress * 280}px)`, willChange: 'transform', maskImage: `radial-gradient(ellipse 42% 42% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.65) 42%, rgba(0,0,0,1) 62%)`, WebkitMaskImage: `radial-gradient(ellipse 42% 42% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.65) 42%, rgba(0,0,0,1) 62%)`, display: 'block', }} />
                </div>

                {/* ── [4] Permanent edge vignette (always-on polish) ── */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 4, background: 'radial-gradient(ellipse 80% 75% at 50% 50%, transparent 35%, rgba(6,14,9,0.5) 100%)', pointerEvents: 'none', }} />

                {/* Progress bar */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(180,220,185,0.08)', zIndex: 20, }}>
                    <div style={{ height: '100%', width: `${progress * 100}%`, background: 'linear-gradient(90deg, rgba(180,220,185,0.4), rgba(244,239,230,0.6))', transition: 'width 0.04s linear', }} />
                </div>

                {/* Bottom blend into next section */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, zIndex: 15, pointerEvents: 'none', background: 'linear-gradient(to top, #060e09, transparent)', }} />
            </div>

            {/* Bottom blend */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, zIndex: 30, pointerEvents: 'none', background: 'linear-gradient(to top, #060e09, transparent)', }} />

            <style>{`
        @keyframes zNudge {
          0%, 100% { transform: translateY(0);   opacity: 0.7; }
          50%       { transform: translateY(5px); opacity: 0.3; }
        }
      `}</style>
        </div>
    );
}