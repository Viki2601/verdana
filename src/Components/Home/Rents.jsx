'use client';
import { RENTS } from "../../../utils/data";

export default function RentsSection() {
    return (
        <section id="rents" className="relative overflow-hidden bg-[#060e09] py-20 sm:py-28">
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7fb069]/30 to-transparent" />
                <div className="absolute right-[-12%] top-[18%] h-[520px] w-[520px] rounded-full border border-[#c9a84c]/[0.06]" />
                <div className="absolute right-[-6%] top-[24%] h-[360px] w-[360px] rounded-full border border-[#7fb069]/[0.06]" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-8">
                <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
                    <div>
                        <div className="eyebrow mb-4 text-[#c9a84c]">✦ Flexible Rental Options</div>
                        <h2 className="section-h max-w-xl text-[#f4efe6]">Stay Your <em className="italic text-[#7fb069]">Way</em></h2>
                    </div>
                    <p className="max-w-xs border-l border-[#7fb069]/30 pl-4 text-sm leading-7 text-[#c0d4b8]/60">
                        From one quiet night to a season beneath the canopy, choose the pace that feels like yours.
                    </p>
                </div>

                <div className="mb-20 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {RENTS?.map((r, index) => (
                        <div key={r.label} className="group relative min-h-[238px] overflow-hidden border border-[#7fb069]/15 bg-[#0b2115]/70 p-6 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-[#c9a84c]/45 hover:bg-[#12351f] sm:p-7">
                            <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#c9a84c] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                            <span className="absolute right-6 top-6 font-mono text-[0.62rem] tracking-[0.2em] text-[#c0d4b8]/30">0{index + 1}</span>
                            <div className="relative flex h-full flex-col justify-between">
                                <div>
                                    <div className="mb-8 text-[2.15rem] drop-shadow-[0_0_12px_rgba(201,168,76,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:origin-left">
                                    {r.icon}
                                    </div>
                                    <div className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-[#c0d4b8]/55">{r.label}</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-[0.68rem] text-[#c0d4b8]/35">Starting from</div>
                                    <div className="text-[2.45rem] font-light leading-none tracking-tight" style={{ fontFamily: 'var(--font-cormorant)', color: '#c9a84c' }}>
                                    {r.from}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="group relative overflow-hidden border border-[#7fb069]/20 bg-[#091b10]">
                    <video src="https://zhanfg2pg2.ufs.sh/f/c8fuuCqs4lu23tdD53pRcn6sTu4vioaKWgMXG0rb89FPVDt3" autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full" style={{ objectFit: 'cover', objectPosition: 'start' }} />
                    <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(4,18,10,0.98)_0%,rgba(6,30,16,0.9)_45%,rgba(8,40,20,0.62)_100%)]" />
                    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, }} />
                    <div className="absolute right-[-80px] top-[-80px] h-[360px] w-[360px] rounded-full border border-[rgba(201,168,76,0.1)]" />
                    <div className="absolute right-[-40px] top-[-40px] h-[240px] w-[240px] rounded-full border border-[rgba(201,168,76,0.07)]" />
                    <div className="absolute right-0 top-0 h-full w-[50%] bg-[radial-gradient(ellipse_at_80%_40%,rgba(201,168,76,0.1)_0%,transparent_65%)]" />
                    <div className="relative z-10 flex min-h-[390px] flex-col justify-between gap-10 p-8 sm:p-12 lg:flex-row lg:items-end lg:p-14">

                        <div className="max-w-[42rem]">
                            <div className="eyebrow mb-5 flex items-center gap-2">
                                <span className="inline-block h-[1px] w-6 bg-[#c9a84c]" />
                                Seasonal Offer
                            </div>

                            <h3 className="mb-3 leading-[1.04] font-light" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.7rem, 5vw, 4.5rem)', }}>
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
                            <div className="flex items-center gap-2 border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] px-4 py-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
                                <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[#c9a84c]/80">Active Now</span>
                            </div>
                            <button className="group/btn relative overflow-hidden bg-[#c9a84c] px-8 py-3.5 text-sm font-semibold text-[#060e09] transition-all duration-300 hover:shadow-[0_0_32px_rgba(201,168,76,0.4)] hover:scale-[1.03]">
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