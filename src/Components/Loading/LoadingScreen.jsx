'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './LoadingScreen.module.css';

/* ── Realistic cumulus SVG clouds ─────────────────────────────
   Technique: stacked circles for puff volume, warm shadow ellipse
   for the flat underbelly, a subtle drop-shadow filter for depth.
   No external blur on the wrapper — the SVG renders crisp.
──────────────────────────────────────────────────────────────── */

const CloudA = () => (
  <svg viewBox="0 0 960 400" xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', width: '100%', height: '100%' }}>
    <defs>
      {/* Soft drop-shadow for 3-D lift */}
      <filter id="cA-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="rgba(160,140,110,0.30)" />
      </filter>
      {/* Inner shading mask — darkens the lower interior */}
      <radialGradient id="cA-shade" cx="50%" cy="80%" r="55%" fx="50%" fy="90%">
        <stop offset="0%"   stopColor="rgba(195,185,165,0.45)" />
        <stop offset="55%"  stopColor="rgba(220,215,205,0.15)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    <g filter="url(#cA-shadow)">
      {/* ── Underbelly — warm cream-grey, flat ── */}
      <ellipse cx="480" cy="345" rx="428" ry="44"
        fill="rgba(210,198,178,0.88)" />

      {/* ── Main puff body ── */}
      <circle cx="165" cy="275" r="90"  fill="rgba(248,248,246,0.88)" />
      <circle cx="282" cy="212" r="122" fill="rgba(252,252,250,0.94)" />
      <circle cx="420" cy="178" r="150" fill="#ffffff" />
      <circle cx="565" cy="184" r="138" fill="#ffffff" />
      <circle cx="698" cy="218" r="115" fill="rgba(252,252,250,0.94)" />
      <circle cx="795" cy="270" r="86"  fill="rgba(248,248,246,0.88)" />

      {/* ── Gap fillers for smooth silhouette ── */}
      <circle cx="348" cy="228" r="88"  fill="rgba(255,255,255,0.95)" />
      <circle cx="490" cy="206" r="98"  fill="#ffffff" />
      <circle cx="630" cy="235" r="80"  fill="rgba(255,255,255,0.95)" />

      {/* ── Interior shading overlay ── */}
      <ellipse cx="480" cy="300" rx="420" ry="120" fill="url(#cA-shade)" />
    </g>
  </svg>
);

const CloudB = () => (   /* tall & full — top / bottom pairs */
  <svg viewBox="0 0 740 500" xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', width: '100%', height: '100%' }}>
    <defs>
      <filter id="cB-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="rgba(155,135,105,0.28)" />
      </filter>
      <radialGradient id="cB-shade" cx="50%" cy="78%" r="52%">
        <stop offset="0%"   stopColor="rgba(190,178,155,0.42)" />
        <stop offset="55%"  stopColor="rgba(215,208,195,0.14)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    <g filter="url(#cB-shadow)">
      <ellipse cx="370" cy="440" rx="328" ry="48" fill="rgba(208,195,172,0.86)" />

      <circle cx="118" cy="362" r="84"  fill="rgba(247,247,245,0.87)" />
      <circle cx="228" cy="288" r="118" fill="rgba(252,252,250,0.93)" />
      <circle cx="370" cy="244" r="152" fill="#ffffff" />
      <circle cx="512" cy="286" r="120" fill="rgba(252,252,250,0.93)" />
      <circle cx="618" cy="360" r="86"  fill="rgba(247,247,245,0.87)" />

      <circle cx="294" cy="296" r="90"  fill="rgba(255,255,255,0.95)" />
      <circle cx="444" cy="292" r="94"  fill="rgba(255,255,255,0.95)" />

      <ellipse cx="370" cy="390" rx="318" ry="110" fill="url(#cB-shade)" />
    </g>
  </svg>
);

const CloudC = () => (   /* medium, flatter — secondary left / right */
  <svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', width: '100%', height: '100%' }}>
    <defs>
      <filter id="cC-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="7" stdDeviation="12" floodColor="rgba(155,138,110,0.26)" />
      </filter>
      <radialGradient id="cC-shade" cx="50%" cy="80%" r="50%">
        <stop offset="0%"   stopColor="rgba(188,175,152,0.40)" />
        <stop offset="55%"  stopColor="rgba(215,208,195,0.12)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    <g filter="url(#cC-shadow)">
      <ellipse cx="400" cy="282" rx="366" ry="38" fill="rgba(206,193,170,0.84)" />

      <circle cx="128" cy="238" r="76"  fill="rgba(247,247,245,0.86)" />
      <circle cx="232" cy="194" r="104" fill="rgba(252,252,250,0.93)" />
      <circle cx="354" cy="172" r="126" fill="#ffffff" />
      <circle cx="476" cy="178" r="115" fill="#ffffff" />
      <circle cx="592" cy="204" r="98"  fill="rgba(252,252,250,0.93)" />
      <circle cx="674" cy="243" r="72"  fill="rgba(247,247,245,0.86)" />
      <circle cx="412" cy="194" r="78"  fill="rgba(255,255,255,0.95)" />

      <ellipse cx="400" cy="256" rx="358" ry="90" fill="url(#cC-shade)" />
    </g>
  </svg>
);

const CloudD = () => (   /* compact wispy — secondary top / bottom */
  <svg viewBox="0 0 620 280" xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', width: '100%', height: '100%' }}>
    <defs>
      <filter id="cD-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="rgba(150,132,105,0.24)" />
      </filter>
      <radialGradient id="cD-shade" cx="50%" cy="78%" r="50%">
        <stop offset="0%"   stopColor="rgba(185,172,148,0.38)" />
        <stop offset="55%"  stopColor="rgba(212,205,192,0.12)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    <g filter="url(#cD-shadow)">
      <ellipse cx="310" cy="248" rx="276" ry="36" fill="rgba(204,190,165,0.82)" />

      <circle cx="105" cy="206" r="67"  fill="rgba(246,246,244,0.86)" />
      <circle cx="202" cy="166" r="95"  fill="rgba(252,252,250,0.92)" />
      <circle cx="316" cy="146" r="118" fill="#ffffff" />
      <circle cx="430" cy="163" r="97"  fill="rgba(252,252,250,0.92)" />
      <circle cx="522" cy="203" r="70"  fill="rgba(246,246,244,0.86)" />
      <circle cx="260" cy="182" r="70"  fill="rgba(255,255,255,0.94)" />
      <circle cx="372" cy="177" r="74"  fill="rgba(255,255,255,0.94)" />

      <ellipse cx="310" cy="224" rx="268" ry="82" fill="url(#cD-shade)" />
    </g>
  </svg>
);

const SHAPE_MAP = { A: CloudA, B: CloudB, C: CloudC, D: CloudD };

const CLOUDS = [
  { id: 'l1', cls: 'cloudL1', disperse: 'disperseLeft',   shape: 'A' },
  { id: 'l2', cls: 'cloudL2', disperse: 'disperseLeft',   shape: 'C' },
  { id: 'r1', cls: 'cloudR1', disperse: 'disperseRight',  shape: 'A' },
  { id: 'r2', cls: 'cloudR2', disperse: 'disperseRight',  shape: 'C' },
  { id: 't1', cls: 'cloudT1', disperse: 'disperseTop',    shape: 'B' },
  { id: 't2', cls: 'cloudT2', disperse: 'disperseTop',    shape: 'D' },
  { id: 'b1', cls: 'cloudB1', disperse: 'disperseBottom', shape: 'B' },
  { id: 'b2', cls: 'cloudB2', disperse: 'disperseBottom', shape: 'D' },
];

/* ── Pink-noise wind generator ────────────────────────────────
   Separated so it can be called after a user gesture.
────────────────────────────────────────────────────────────── */
function startWind() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const sr = ctx.sampleRate, len = sr * 4;
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99886*b0 + w*0.0555179; b1 = 0.99332*b1 + w*0.0750759;
        b2 = 0.96900*b2 + w*0.1538520; b3 = 0.86650*b3 + w*0.3104856;
        b4 = 0.55000*b4 + w*0.5329522; b5 = -0.7616 *b5 - w*0.0168980;
        d[i] = (b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11; b6 = w*0.115926;
      }
    }
    const src  = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp   = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 600;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.8);
    src.connect(lp); lp.connect(gain); gain.connect(ctx.destination);
    src.start();
    return { ctx, gain };
  } catch (_) { return null; }
}

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress]   = useState(0);
  const [phase, setPhase]         = useState('gather');

  const tickRef     = useRef(null);
  const dispatchRef = useRef(null);
  const audioRef    = useRef(null);
  const audioReady  = useRef(false);  // guard: start wind only once

  /* ── Start wind on first user gesture (autoplay policy) ──── */
  useEffect(() => {
    const tryStart = () => {
      if (audioReady.current) return;
      audioReady.current = true;
      audioRef.current = startWind();
      document.removeEventListener('pointerdown', tryStart);
      document.removeEventListener('keydown',     tryStart);
    };
    document.addEventListener('pointerdown', tryStart, { once: true });
    document.addEventListener('keydown',     tryStart, { once: true });
    return () => {
      document.removeEventListener('pointerdown', tryStart);
      document.removeEventListener('keydown',     tryStart);
    };
  }, []);

  /* ── Gather → Loading after clouds settle ─────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setPhase('loading'), 2700);
    return () => clearTimeout(t);
  }, []);

  /* ── Progress tick ─────────────────────────────────────────── */
  useEffect(() => {
    if (phase !== 'loading') return;
    let current = 0;
    const tick = () => {
      current += Math.random() * 2.8 + 0.4;
      if (current >= 100) {
        setProgress(100);
        dispatchRef.current = setTimeout(() => {
          setPhase('disperse');
          if (audioRef.current) {
            const { ctx, gain } = audioRef.current;
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.0);
          }
          dispatchRef.current = setTimeout(() => onComplete(), 1500);
        }, 600);
        return;
      }
      setProgress(Math.floor(current));
      tickRef.current = setTimeout(tick, 55 + Math.random() * 45);
    };
    tickRef.current = setTimeout(tick, 120);
    return () => clearTimeout(tickRef.current);
  }, [phase]);

  useEffect(() => () => {
    clearTimeout(dispatchRef.current);
    try { audioRef.current?.ctx?.close(); } catch (_) {}
  }, []);

  const isDisperse = phase === 'disperse';

  return (
    <div className={`${styles.root} ${isDisperse ? styles.dispersing : ''}`} aria-hidden="true">
      <div className={styles.bg} />

      {CLOUDS.map(({ id, cls, disperse, shape }) => {
        const ShapeComp = SHAPE_MAP[shape];
        return (
          <div
            key={id}
            className={[
              styles.cloud,
              styles[cls],
              isDisperse ? styles[disperse] : '',
            ].join(' ')}
          >
            <ShapeComp />
          </div>
        );
      })}

      <div className={styles.textVignette} />
      <div className={styles.fogGlow} />

      <div className={[styles.content, phase !== 'gather' ? styles.contentVisible : ''].join(' ')}>
        <p className={styles.eyebrow}>Nature Retreats</p>
        <h1 className={styles.brand}>Verdana</h1>
        <div className={styles.ornament}>
          <span className={styles.ornLine} />
          <span className={styles.ornLeaf}>✦</span>
          <span className={styles.ornLine} />
        </div>
        <div className={styles.progressWrap}>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.pct}>{progress}&thinsp;%</span>
        </div>
        <p className={styles.tagline}>Into the Wild</p>
      </div>
    </div>
  );
}