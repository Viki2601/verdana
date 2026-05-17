'use client';
import { ROOMS } from "../../../utils/data";

export default function RoomsSection() {
    return (
        <section id="rooms" className="relative overflow-hidden bg-[#070f0a] py-24">
            <div className="absolute right-[-20%] top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(26,92,53,0.1)_0%,transparent_70%)]" />
            <div className="relative mx-auto max-w-[1280px] px-6 md:px-8">
                <div className="mb-14">
                    <div className="eyebrow mb-3">✦ Your Sanctuary Awaits</div>
                    <h2 className="section-h text-[#f4efe6]">
                        Curated Stays<br />
                        <em className="italic text-[#7fb069]">for Every Soul</em>
                    </h2>
                    <div className="nature-divider" />
                </div>

                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {ROOMS?.map((room, i) => (
                        <div key={i} className="group overflow-hidden rounded-[20px] border border-[rgba(127,176,105,0.15)] bg-[#06120e]/70 transition duration-400 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-2 hover:border-[#c9a84c]/30 hover:shadow-[0_24px_56px_rgba(0,0,0,.5)]">
                            <div className="relative flex h-[200px] items-center justify-center text-[3.5rem]" style={{ background: room?.gradient }}>
                                <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E)\"" }} />
                                <span className="relative drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">{room?.icon}</span>
                            </div>

                            <div className="rounded-b-[20px] bg-[rgba(13,43,26,0.4)] p-6 backdrop-blur-sm">
                                <h3 className="mb-2 text-2xl font-[var(--font-cormorant)] font-normal text-[#f4efe6]">{room?.type}</h3>
                                <p className="mb-4 text-sm leading-7 text-[rgba(192,212,184,0.6)]">{room?.desc}</p>
                                <div className="flex flex-wrap gap-4 text-[0.7rem] uppercase tracking-[0.08em] text-[rgba(192,212,184,0.45)]">
                                    <span>👤 {room.guests}</span>
                                    <span>📐 {room.size}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}