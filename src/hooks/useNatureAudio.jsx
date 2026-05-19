'use client';
import { useEffect, useRef, useCallback, useState } from 'react';

/* ══════════════════════════════════════════════════════════════
   useNatureAudio
   Procedurally synthesises a layered nature soundscape:
     1. Wind       — filtered pink noise, slow amplitude swell
     2. Insects    — chorus of slightly-detuned sine oscillators
                     (cicada / cricket texture)
     3. Birds      — stochastic chirp scheduler: short FM bursts
                     that feel like distant bird calls

   All synthesis is Web Audio API — no external files required.
   Returns { muted, toggle } for the UI button.
   Audio starts only after the first user gesture (autoplay policy).
══════════════════════════════════════════════════════════════ */

function buildWind(ctx, masterGain) {
    const sr = ctx.sampleRate, len = sr * 8;
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < len; i++) {
            const w = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759;
            b2 = 0.96900 * b2 + w * 0.1538520; b3 = 0.86650 * b3 + w * 0.3104856;
            b4 = 0.55000 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.0168980;
            d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
        }
    }
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 480;
    const gain = ctx.createGain(); gain.gain.value = 0.10;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.04;
    lfo.connect(lfoGain); lfoGain.connect(gain.gain);
    lfo.start();
    src.connect(lp); lp.connect(gain); gain.connect(masterGain);
    src.start();
    return () => { try { src.stop(); lfo.stop(); } catch (_) { } };
}

function buildInsects(ctx, masterGain) {
    const stops = [];
    const baseFreqs = [3180, 3210, 3240, 3260, 3290, 3320];
    baseFreqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f + (Math.random() - 0.5) * 30;
        const amLfo = ctx.createOscillator(); amLfo.frequency.value = 20 + i * 1.3;
        const amGain = ctx.createGain(); amGain.gain.value = 0;
        amLfo.connect(amGain.gain);
        const envGain = ctx.createGain(); envGain.gain.value = 0.012;
        amLfo.start(); osc.start();
        osc.connect(envGain); envGain.connect(masterGain);
        envGain.gain.setValueAtTime(0, ctx.currentTime);
        envGain.gain.linearRampToValueAtTime(0.012, ctx.currentTime + 3 + i * 0.7);
        stops.push(() => { try { osc.stop(); amLfo.stop(); } catch (_) { } });
    });
    return () => stops.forEach(s => s());
}

function scheduleBirdChirp(ctx, masterGain) {
    const t = ctx.currentTime;
    const dur = 0.06 + Math.random() * 0.10;
    const carrier = 2000 + Math.random() * 2200;
    const modDepth = 400 + Math.random() * 800;
    const modFreq = 60 + Math.random() * 120;
    const osc = ctx.createOscillator(); osc.type = 'sine';
    osc.frequency.value = carrier;
    const mod = ctx.createOscillator(); mod.type = 'sine';
    mod.frequency.value = modFreq;
    const modG = ctx.createGain(); modG.gain.value = modDepth;
    mod.connect(modG); modG.connect(osc.frequency);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.14 + Math.random() * 0.08, t + dur * 0.25);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const pan = ctx.createStereoPanner();
    pan.pan.value = (Math.random() - 0.5) * 1.4;
    osc.connect(env); env.connect(pan); pan.connect(masterGain);
    osc.start(t); mod.start(t);
    osc.stop(t + dur + 0.05); mod.stop(t + dur + 0.05);
}

function buildBirds(ctx, masterGain) {
    let alive = true;
    function scheduleNext() {
        if (!alive) return;
        scheduleBirdChirp(ctx, masterGain);
        if (Math.random() < 0.3) {
            setTimeout(() => { if (alive) scheduleBirdChirp(ctx, masterGain); },
                80 + Math.random() * 120);
        }
        const gap = 400 + Math.random() * 2800;
        setTimeout(scheduleNext, gap);
    }
    setTimeout(scheduleNext, 1200);
    return () => { alive = false; };
}

export function useNatureAudio() {
    const ctxRef = useRef(null);
    const masterRef = useRef(null);
    const stopsRef = useRef([]);
    const startedRef = useRef(false);
    const [muted, setMuted] = useState(false);

    const start = useCallback(() => {
        if (startedRef.current) return;
        startedRef.current = true;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const master = ctx.createGain();
            master.gain.setValueAtTime(0, ctx.currentTime);
            master.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 2.5);
            master.connect(ctx.destination);
            ctxRef.current = ctx;
            masterRef.current = master;

            stopsRef.current = [
                buildWind(ctx, master),
                buildInsects(ctx, master),
                buildBirds(ctx, master),
            ];
        } catch (_) { }
    }, []);

    useEffect(() => {
        const handler = () => {
            start();
            document.removeEventListener('pointerdown', handler);
            document.removeEventListener('keydown', handler);
        };
        document.addEventListener('pointerdown', handler, { once: true });
        document.addEventListener('keydown', handler, { once: true });
        return () => {
            document.removeEventListener('pointerdown', handler);
            document.removeEventListener('keydown', handler);
        };
    }, [start]);

    useEffect(() => () => {
        stopsRef.current.forEach(s => s());
        try { ctxRef.current?.close(); } catch (_) { }
    }, []);

    const toggle = useCallback(() => {
        setMuted(prev => {
            const next = !prev;
            if (masterRef.current && ctxRef.current) {
                const g = masterRef.current.gain;
                const t = ctxRef.current.currentTime;
                g.cancelScheduledValues(t);
                g.setValueAtTime(g.value, t);
                g.linearRampToValueAtTime(next ? 0 : 0.8, t + 0.4);
            }
            return next;
        });
    }, []);

    return { muted, toggle };
}