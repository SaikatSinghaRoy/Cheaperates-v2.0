'use client'
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import AnimateOnScroll from './AnimateOnScroll';


type CardProps = { step: string, title: string, description: any };

function Card({ step, title, description }: CardProps) {
    return (
        <div className="relative group overflow-hidden rounded-xl max-w-[340px] mx-auto">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none rounded-xl"></div>
            <div className="relative w-full h-full px-6 py-4 border border-white/10 rounded-xl">
                <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xl font-bold transition-colors duration-300 group-hover:text-(--primary)">
                        {step}
                    </span>
                    <span className="inline-block transition-transform duration-300 group-hover:rotate-45">
                        <BsArrowUpRight /></span>
                </div>

                <h3 className="font-bold mb-4">{title}</h3>

                <p className="text-[12px] text-gray-300 pb-2 ">{description}</p>
            </div>
        </div>
    );
}

export default function HowItWorks() {
    return (
        <section className="py-18 md:py-20 relative overflow-hidden">
            {/* Top gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-(--bg-dark) via-transparent to-transparent "></div>
            {/* top blurred blobs */}
            <div className="absolute top-0 left-0 w-[80%] h-[20%] bg-(--primary)/20 blur-[150px] rounded-full"></div>

            {/* bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-linear-to-t from-(--bg-dark) to-transparent"></div>
            {/* bottom blurred blobs */}
            <div className="absolute bottom-0 -right-[20%] w-[85%] h-[20%] bg-(--primary)/40 blur-[150px] rounded-full"></div>

            <div className="container relative mx-auto px-6">
                <p className="text-center mb-2 md:mb-4">
                    <span className="bg-(--primary)/10 text-(--primary) text-[9px] md:text-xs font-bold px-3 py-1 rounded-full">HOW IT WORKS</span>
                </p>
                
                <AnimateOnScroll>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-12 md:mb-18 text-center">
                    How Cheaperates Works
                </h2>
                </AnimateOnScroll>

                <div className="grid md:grid-cols-3 gap-8 mb-8 text-white">
                    {/* Card 1 */}
                    <AnimateOnScroll delay={0}>
                        <Card step="01" title="Open Website"
                            description={
                                <>Open your favorite browser, go to <Link href="/">Cheaperates.com</Link></>
                            }
                        />
                    </AnimateOnScroll>

                    {/* Card 2 */}
                    <AnimateOnScroll delay={0.15}>
                        <Card step="02" title="Browse Online Shops" description="Shop on your favorite websites as usual in your favorite online shop." />
                    </AnimateOnScroll>

                    {/* Card 3 */}
                    <AnimateOnScroll delay={0.3}>
                        <Card step="03" title="Compare Prices" description="Paste the link of the product to Cheaperates, and let AI comparing the price." />
                    </AnimateOnScroll>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Card 4 */}
                    <AnimateOnScroll delay={0.45}>
                        <Card step="04" title="Read Summaries" description="Click on the product to see a detailed summary, including specifications and reviews." /></AnimateOnScroll>

                    {/* Card 5 */}
                    <AnimateOnScroll delay={0.6}>
                        <Card step="05" title="Save and Buy" description="Choose the best deal and complete your purchase directly from the retailer's site." />
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}
