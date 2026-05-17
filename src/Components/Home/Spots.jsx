'use client';
import { SPOTS } from "../../../utils/data";

export default function SpotsSection() {
    return (
        <section id="spots" className="bg-[linear-gradient(180deg,#060e09_0%,#0a1810_100%)] py-24">
            <div className="mx-auto max-w-[1280px] px-6 md:px-8">
                <div className="mb-14">
                    <div className="eyebrow mb-3">✦ Handpicked Destinations</div>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 className="section-h text-[#f4efe6]">
                            Where Will <em className="italic text-[#c9a84c]">You</em> Wander?
                        </h2>
                        <a href="#" className="text-[rgba(192,212,184,0.6)] text-sm uppercase tracking-[0.1em] border-b border-[rgba(192,212,184,0.25)] pb-1 transition hover:text-[#c9a84c]">
                            View All Spots →
                        </a>
                    </div>
                    <div className="nature-divider" />
                </div>

                <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {SPOTS?.map((spot, i) => (
                        <div
                            key={spot?.id}
                            className="group relative overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[#06110d]/50 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-2"
                            style={{ animationDelay: `${i * 0.1}s`, height: i === 0 || i === 3 ? 420 : 320 }}
                        >
                            <div className="absolute inset-0" style={{ background: spot?.gradient }} />
                            <div
                                className="absolute inset-0 opacity-60"
                                style={{
                                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E)\"",
                                }}
                            />
                            <div className="absolute inset-0 bg-[rgba(0,0,0,0.25)]" />
                            <div className="relative z-10 flex h-full flex-col justify-between p-6">
                                <div>
                                    <div className="mb-3 text-[0.7rem] uppercase tracking-[0.12em] text-[rgba(192,212,184,0.55)]">📍 {spot?.location}</div>
                                    <h3 className="mb-3 text-2xl font-[var(--font-cormorant)] font-normal leading-tight text-[#f4efe6]">
                                        {spot?.name}
                                    </h3>
                                    <p className="spot-desc hidden text-sm leading-6 text-[rgba(192,212,184,0.6)] group-hover:block">
                                        {spot?.desc}
                                    </p>
                                </div>

                                <div className="mt-6 flex items-center justify-between gap-4">
                                    <div>
                                        <span className="text-3xl font-[var(--font-cormorant)] font-semibold text-[#c9a84c]">{spot?.price}</span>
                                        <span className="ml-2 text-sm text-[rgba(192,212,184,0.5)]">{spot?.unit}</span>
                                    </div>
                                    <button className="rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/15 px-4 py-2 text-sm font-semibold text-[#c9a84c] transition hover:bg-[#c9a84c]/25">
                                        Explore →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}