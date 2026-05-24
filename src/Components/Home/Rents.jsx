'use client';
import { RENTS } from "../../../utils/data";

export default function RentsSection() {
    return (
        <section id="rents" className="bg-[#060e09] py-24 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(127,176,105,0.05)_0%,transparent_70%)]" />
                <div className="absolute right-[-5%] bottom-[5%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-8">
                <div className="mb-14">
                    <div className="eyebrow mb-3">✦ Flexible Rental Options</div>
                    <h2 className="section-h text-[#f4efe6]">Stay Your <em className="italic text-[#7fb069]">Way</em></h2>
                    <div className="nature-divider" />
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 mb-16">
                    {RENTS?.map((r) => (
                        <div key={r.label} className="group relative rounded-[18px] border border-[rgba(127,176,105,0.15)] bg-[rgba(13,43,26,0.25)] p-8 text-center transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-2 hover:border-[rgba(201,168,76,0.35)] hover:bg-[rgba(26,92,53,0.28)] overflow-hidden">
                            <span className="absolute top-0 left-0 w-[40px] h-[1px] bg-gradient-to-r from-[#c9a84c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="absolute top-0 left-0 h-[40px] w-[1px] bg-gradient-to-b from-[#c9a84c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
                            <div className="relative">
                                <div className="mb-4 text-[2.4rem] drop-shadow-[0_0_12px_rgba(201,168,76,0.3)] transition-transform duration-300 group-hover:scale-110">
                                    {r.icon}
                                </div>
                                <div className="mb-3 text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(192,212,184,0.45)]">{r.label}</div>
                                <div className="mb-2 text-[0.68rem] text-[rgba(192,212,184,0.35)]">Starting from</div>
                                <div className="text-[2.6rem] font-light leading-none tracking-tight" style={{ fontFamily: 'var(--font-cormorant)', color: '#c9a84c' }}>
                                    {r.from}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="group relative overflow-hidden rounded-[28px] border border-[rgba(127,176,105,0.2)]">
                    <video src="https://zhanfg2pg2.ufs.sh/f/c8fuuCqs4lu235oAC6pRcn6sTu4vioaKWgMXG0rb89FPVDt3" autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center' }} />
                    <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(4,18,10,0.96)_0%,rgba(6,30,16,0.88)_45%,rgba(8,40,20,0.70)_100%)]" />
                    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, }} />
                    <div className="absolute right-[-80px] top-[-80px] h-[360px] w-[360px] rounded-full border border-[rgba(201,168,76,0.1)]" />
                    <div className="absolute right-[-40px] top-[-40px] h-[240px] w-[240px] rounded-full border border-[rgba(201,168,76,0.07)]" />
                    <div className="absolute right-0 top-0 h-full w-[50%] bg-[radial-gradient(ellipse_at_80%_40%,rgba(201,168,76,0.1)_0%,transparent_65%)]" />
                    <div className="relative z-10 flex flex-col gap-8 p-10 sm:p-14 lg:flex-row lg:items-center lg:justify-between">

                        <div className="max-w-[42rem]">
                            <div className="eyebrow mb-5 flex items-center gap-2">
                                <span className="inline-block h-[1px] w-6 bg-[#c9a84c]" />
                                Seasonal Offer
                            </div>

                            <h3 className="mb-2 leading-[1.1] font-light" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', }}>
                                <span className="text-[#f4efe6] block">Monsoon Magic</span>
                                <span className="block font-semibold" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center 60%', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent', filter: 'brightness(1.3) saturate(1.2)', }}>
                                    30% off all retreats
                                </span>
                            </h3>

                            <div className="mb-5 flex items-center gap-3">
                                <span className="h-[1px] w-12 bg-gradient-to-r from-[#c9a84c] to-transparent" />
                                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#c9a84c]/50">Limited Season</span>
                            </div>

                            <p className="text-sm leading-[1.9] text-[rgba(192,212,184,0.6)] max-w-[30rem]">
                                The rain transforms every forest, lake and valley into something otherworldly. Book any retreat this season and receive an exclusive monsoon discount.
                            </p>
                        </div>

                        <div className="flex flex-col items-start gap-4 lg:items-end lg:shrink-0">
                            <div className="flex items-center gap-2 rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] px-4 py-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
                                <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[#c9a84c]/80">Active Now</span>
                            </div>
                            <button className="group/btn relative overflow-hidden rounded-full bg-[#c9a84c] px-8 py-3.5 text-sm font-semibold text-[#060e09] transition-all duration-300 hover:shadow-[0_0_32px_rgba(201,168,76,0.4)] hover:scale-[1.03]">
                                <span className="relative z-10">Claim Offer →</span>
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#e8c55a] to-[#c9a84c] transition-transform duration-300 group-hover/btn:translate-x-0" />
                            </button>
                            <span className="text-[0.65rem] text-[rgba(192,212,184,0.35)] tracking-wide">Valid until Aug 31, 2025</span>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.4)] to-transparent" />
                </div>
            </div>
        </section>
    );
}