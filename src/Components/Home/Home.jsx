'use client';
import { useNatureAudio } from "@/hooks/useNatureAudio";
import AudioToggle from "../AudioToggle/AudioToggle";
import Header from "../Header/Header";
import CTASection from "./CTASection";
import Landing from "./Landing";
import PlansSection from "./Plans";
import RentsSection from "./Rents";
import RoomsSection from "./Rooms";
import SpotsSection from "./Spots";
import WildSection from "./WildSection";
import ZoomSection from "./ZoomSection";

export default function Home() {
    const { muted, toggle } = useNatureAudio();

    return (
        <div className="bg-[#060e09] text-[#f4efe6]">
            <Header />
            <Landing />
            <SpotsSection />
            <RoomsSection />
            <ZoomSection />
            <PlansSection />
            <RentsSection />
            <WildSection />
            <CTASection />
            <AudioToggle muted={muted} toggle={toggle} />
        </div>
    );
}