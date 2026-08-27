'use client';
import { PLANS } from "../../../utils/data";

export default function PlansSection() {
    return (
        <section id="plans" className="relative overflow-hidden bg-[linear-gradient(180deg,#07120b_0%,#060e09_100%)] pb-24 pt-36 sm:pb-32 sm:pt-44">
            <div className="absolute right-[-8%] top-[16%] h-[520px] w-[520px] rounded-full border border-[#c9a84c]/[0.06]" />
            <div className="absolute right-[-3%] top-[24%] h-[360px] w-[360px] rounded-full border border-[#7fb069]/[0.07]" />
            <div className="mx-auto max-w-[1280px] px-6 md:px-8">
                <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
                    <div>
                        <div className="eyebrow mb-4 text-[#c9a84c]">✦ Choose Your Journey</div>
                        <h2 className="section-h max-w-2xl text-[#f4efe6]">
                            Simple Pricing,<br /><em className="gradient-text italic"> Infinite Nature</em>
                        </h2>
                    </div>
                    <p className="max-w-xs border-l border-[#7fb069]/30 pl-4 text-sm leading-7 text-[#c0d4b8]/60">
                        One membership unlocks more places to pause, wander, and return to yourself.
                    </p>
                </div>

                <div className="grid items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {PLANS?.map((plan, index) => {
                        const featured = plan?.featured || index === 1;

                        return (
                        <div key={plan?.name} className={`group relative flex min-h-[510px] rounded-2xl flex-col overflow-hidden border p-7 transition duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 ${featured ? "border-[#c9a84c]/60 bg-[#173b23] shadow-[0_24px_80px_rgba(201,168,76,.12)] xl:-mt-4 xl:mb-4" : "border-[#7fb069]/15 bg-[#0b2115]/75 hover:border-[#7fb069]/40"}`} style={!featured ? { background: plan?.color, borderColor: plan?.border } : undefined}>
                            <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#c9a84c] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                            <div className="mb-4 flex items-start justify-between">
                            <span className="font-mono text-[0.62rem] tracking-[0.2em] text-[#c0d4b8]/30">0{index + 1}</span>
                            {featured && (
                                <div className="inline-flex rounded-lg border border-[#c9a84c]/40 bg-[#c9a84c]/[0.12] px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.14em] text-[#c9a84c]">
                                    ★ Recommended
                                </div>
                            )}
                            </div>
                            <h3 className="mb-2 text-4xl font-light text-[#f4efe6]" style={{ fontFamily: 'var(--font-cormorant)' }}>{plan?.name}</h3>
                            <p className="text-sm text-[#c0d4b8]/65">{plan?.tagline}</p>

                            <div className="mb-4 flex items-baseline gap-2 border-b border-[#7fb069]/15 pb-4">
                                <span className={`text-[3.4rem] font-light ${featured ? "text-[#c9a84c]" : "text-[#f4efe6]"}`} style={{ fontFamily: 'var(--font-cormorant)' }}>{plan?.price}</span>
                                <span className="text-xs text-[#c0d4b8]/45">{plan?.period}</span>
                            </div>

                            <div className="mb-4 flex-1 space-y-4">
                                {plan?.perks?.map((perk) => (
                                    <div key={perk} className="flex items-start gap-3 text-sm leading-6 text-[#c0d4b8]/75">
                                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center border border-[#7fb069]/40 text-[0.65rem] text-[#7fb069]">✓</span>
                                        <span>{perk}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={featured ? "btn-gold w-full py-4 text-sm font-semibold rounded-xl" : "rounded-xl w-full border border-[#7fb069]/30 bg-transparent px-5 py-4 text-sm text-[#c0d4b8]/85 transition hover:border-[#c9a84c]/60 hover:text-[#f4efe6]"}>
                                Choose {plan?.name} <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </button>
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
