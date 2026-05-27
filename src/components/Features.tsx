
import AnimateOnScroll from './AnimateOnScroll';

import { MdOutlinePriceChange, MdOutlineChecklist, MdOutlineBolt } from "react-icons/md";

type CardProps = { Icon: any, title: string, description: string }

function FeatureCard({ Icon, title, description }: CardProps) {
    return (
        <div className="group rounded-2xl max-w-[340px] mx-auto overflow-hidden border border-white/20 hover:border-[#607afb]/50 transition-all duration-300 shadow-sm hover:shadow-[#607afb]">
            <div className="relative p-6 pb-8 w-full h-full rounded-2xl bg-white/5 backdrop-blur-md">
                <span className="text-white text-3xl mb-4 block group-hover:text-(--primary) transition-all duration-300"><Icon /></span>

                <h3 className="font-semibold text-white mb-3">
                    {title}
                </h3>

                <p className="text-gray-400 text-[12px]/[15px]">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function Features() {
    return (
        <section className="py-15 md:py-20 bg-(--bg-dark) transition-colors">
            <div className="container mx-auto px-6">

                {/* Section Heading */}
                <AnimateOnScroll><h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-6">Powerful Features</h2></AnimateOnScroll>

                <AnimateOnScroll delay={0.15}>
                    <p className="text-center text-gray-400 max-lg:text-[12px] max-md:max-w-[355px] max-w-2xl mx-auto mb-16">
                        Cheaperates provides advanced browsing assistance to help you discover better deals,
                        analyze products faster, and save money with every purchase.
                    </p>
                </AnimateOnScroll>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-10">

                    {/* Feature 1 */}
                    <AnimateOnScroll delay={0}>
                        <FeatureCard Icon={MdOutlinePriceChange} title="Smart Price Comparison" description="Instantly compare prices from multiple platforms and discover the best available deals with no extra effort." />
                    </AnimateOnScroll>

                    {/* FeatureCard 2 */}
                    <AnimateOnScroll delay={0.15}>
                        <FeatureCard Icon={MdOutlineChecklist} title="Summarized Reviews" description="Get fast AI-generated summaries for product features, reviews, pros, and cons — all without scrolling endlessly." />
                    </AnimateOnScroll>

                    {/* FeatureCard 3 */}
                    <AnimateOnScroll delay={0.3}>
                        <FeatureCard Icon={MdOutlineBolt} title="Real-Time Assistance" description="Comparify works instantly as you browse, giving you insights, alternatives, and deal suggestions in real-time." />
                    </AnimateOnScroll>

                </div>
            </div>
        </section>
    );
}
