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
            <div className={`mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/5 px-4 py-3 shadow-[0_40px_120px_rgba(0,0,0,.18)] backdrop-blur-[28px] transition-all duration-500 ${scrolled ? "border-white/15 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,.25)]" : "border-white/10 bg-white/10"}`} style={{ WebkitBackdropFilter: "blur(28px)" }}>
                <a href="#" className="flex items-center gap-3 no-underline">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full text-[1.2rem] text-[#c9a84c] shadow-[0_10px_25px_rgba(0,0,0,.18)]">
                        🌿
                    </div>
                    <span className="header-brand text-[1.75rem] text-white">
                        Verdana
                    </span>
                </a>

                <nav className="hidden items-center gap-8 md:flex">
                    {nav?.map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-white/80 transition-colors duration-200 hover:text-[#c9a84c]">
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <button className="hidden rounded-full bg-gradient-to-r from-[#c9a84c] via-[#b99b3c] to-[#c9a84c] px-6 py-3 text-[0.78rem] font-semibold text-[#060e09] shadow-[0_12px_30px_rgba(201,168,76,.25)] transition-transform duration-300 hover:-translate-y-0.5 md:inline-flex">
                        Book a Spot ↗
                    </button>
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        onTouchEnd={(e) => { e.preventDefault(); setMenuOpen((prev) => !prev); }}
                        className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 transition hover:border-white/25 hover:bg-white/15 md:hidden"
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span className={`pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white transition-all duration-300 origin-center ${menuOpen ? "translate-y-[0px] rotate-45" : "-translate-y-2"}`} />
                        <span className={`pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white transition-all duration-300 origin-center ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                        <span className={`pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[0px] -rotate-45" : "translate-y-2"}`} />
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="mx-auto mt-3 max-w-[1280px] rounded-[2rem] border border-white/10 bg-black/5 p-5 shadow-[0_30px_80px_rgba(0,0,0,.2)] backdrop-blur-[28px] md:hidden" style={{ WebkitBackdropFilter: "blur(28px)" }}>
                    {nav.map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block rounded-3xl px-4 py-3 text-lg font-medium tracking-[0.08em] text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-[#c9a84c]">
                            {item}
                        </a>
                    ))}
                    <button className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#c9a84c] via-[#b99b3c] to-[#c9a84c] px-6 py-3 text-[0.78rem] font-semibold text-[#060e09] shadow-[0_12px_30px_rgba(201,168,76,.25)]">
                        Book a Spot ↗
                    </button>
                </div>
            )}
        </header>
    );
}