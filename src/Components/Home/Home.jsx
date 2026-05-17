'use client';

// import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CTASection from "./CTASection";
import Landing from "./Landing";
import PlansSection from "./Plans";
import RentsSection from "./Rents";
import RoomsSection from "./Rooms";
import SpotsSection from "./Spots";

export default function Home() {
    return (
        <div className="bg-[#060e09] text-[#f4efe6]">
            <Header />
            <Landing />
            <SpotsSection />
            <RoomsSection />
            <PlansSection />
            <RentsSection />
            <CTASection />
            {/* <Footer /> */}
        </div>
    );
}