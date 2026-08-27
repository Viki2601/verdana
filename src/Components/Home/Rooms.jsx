'use client';
import { ROOMS } from "../../../utils/data";
import { useReveal } from "../../hooks/useReveal";

export default function RoomsSection() {
    const { ref: sectionRef, isVisible } = useReveal();
    return (
        <section id="rooms" ref={sectionRef} className={`relative overflow-hidden bg-[#070f0a] py-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="absolute right-[-20%] top-1/2 h-175 w-175 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(26,92,53,0.1)_0%,transparent_70%)]" />
            <div className="relative mx-auto max-w-7xl px-6 md:px-8">
                <div className="mb-14 max-w-2xl">
                    <div className="eyebrow mb-3 text-[#a0b187]">✦ Your Sanctuary Awaits</div>
                    <h2 className="section-h text-[#f4efe6]">
                        Curated Stays 
                        <em className="italic text-[#7fb069]"> for Every Soul</em>
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-[#c8d3b7]/75">
                        Discover intimate retreats with immersive mood, premium finishes, and views that feel made just for you.
                    </p>
                    <div className="nature-divider mt-8" />
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {ROOMS?.map((room) => (
                        <div key={room?.id} className="group relative overflow-hidden rounded-4xl border border-white/10 bg-[#05100b]/70 shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.45)] min-h-85">
                            <div className="absolute inset-0 bg-center bg-cover group-hover:scale-105 transition-all duration-500 ease-linear" style={{ backgroundImage: `url(${room?.image})`, backgroundColor: room?.gradient }} />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/55 to-transparent" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,176,105,0.18),transparent_25%)] opacity-90" />
                            <div className="relative z-10 flex min-h-85 flex-col justify-end p-6">
                                <div className="w-full flex flex-col gap-3 sm:items-center sm:justify-between translate-y-18 group-hover:translate-y-0 transition-all duration-500">
                                    <div>
                                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.72rem] uppercase tracking-[0.24em] text-[#e6e6e0] backdrop-blur-xl">
                                            <span>{room?.icon}</span>
                                            <span>{room?.type}</span>
                                        </span>
                                        <p className="mt-2 text-sm leading-7 text-[#d4d6c8]/80">
                                            {room?.desc}
                                        </p>
                                    </div>
                                    <button className="cursor-pointer w-full rounded-full border border-[#7fb069]/30 bg-[#1a3b21]/80 py-3 text-sm font-semibold text-[#f4efe6] transition duration-300 hover:border-[#c9a84c] hover:bg-[#c9a84c]/15">
                                        Book Now
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