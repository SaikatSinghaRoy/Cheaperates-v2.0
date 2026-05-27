"use client";
import { useRef } from "react";
import DealSection from "@/components/DealSection";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Integration from "@/components/Integration";
import Testimonials from "@/components/Testimonials";


export default function Home() {

    const targetRef = useRef<HTMLDivElement>(null);
    const scrollToTargetRef = () => {
        targetRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <>
            <Hero scrollToTargetRef = {scrollToTargetRef} />
            <Integration />
            <div ref={targetRef}>
                <HowItWorks />
            </div>
            
            <Features />
            <DealSection />
            <Testimonials />
            <FAQ />
        </>
    );
}