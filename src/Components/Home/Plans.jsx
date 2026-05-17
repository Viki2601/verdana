'use client';
import { PLANS } from "../../../utils/data";

export default function PlansSection() {
    return (
        <section id="plans" className="relative overflow-hidden bg-[linear-gradient(180deg,#070f0a_0%,#060e09_100%)] py-24">
            <div className="absolute left-[-8%] top-[70%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.07)_0%,transparent_70%)] animate-float" />
            <div className="mx-auto max-w-[1280px] px-6 md:px-8">
                <div className="mb-14 text-center">
                    <div className="eyebrow mb-3">✦ Choose Your Journey</div>
                    <h2 className="section-h text-[#f4efe6]">
                        Simple Pricing,<br />
                        <em className="gradient-text italic">Infinite Nature</em>
                    </h2>
                    <div className="nature-divider mx-auto mt-3" />
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {PLANS?.map((plan) => (
                        <div key={plan?.name} className={`relative overflow-hidden rounded-[28px] border p-8 transition duration-300 ${plan?.featured ? "scale-[1.03]" : ""}`} style={{ background: plan?.color, borderColor: plan?.border }}>
                            {plan?.featured && (
                                <div className="mb-5 inline-flex rounded-full border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.18)] px-4 py-2 text-[0.65rem] uppercase tracking-[0.14em] text-[#c9a84c]">
                                    ★ Most Popular
                                </div>
                            )}
                            <h3 className="mb-3 text-4xl font-[var(--font-cormorant)] font-light text-[#f4efe6]">{plan?.name}</h3>
                            <p className="mb-8 text-sm text-[rgba(192,212,184,0.75)]">{plan?.tagline}</p>

                            <div className="mb-8 flex items-end gap-2">
                                <span className={`text-[3rem] font-[var(--font-cormorant)] font-light ${plan?.featured ? "text-[#c9a84c]" : "text-[#f4efe6]"}`}>{plan?.price}</span>
                                <span className="text-sm text-[rgba(192,212,184,0.45)]">{plan?.period}</span>
                            </div>

                            <div className="mb-8 space-y-3">
                                {plan?.perks?.map((perk) => (
                                    <div key={perk} className="flex items-start gap-3 text-sm leading-6 text-[rgba(192,212,184,0.75)]">
                                        <span className="mt-1 text-[#7fb069]">✓</span>
                                        <span>{perk}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={plan?.featured ? "btn-gold w-full rounded-full py-4 text-sm font-semibold" : "w-full rounded-full border border-[rgba(127,176,105,0.3)] bg-transparent px-5 py-4 text-sm text-[rgba(192,212,184,0.85)] transition hover:border-[#7fb069]/60 hover:text-[#f4efe6]"}>
                                Get Started →
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
