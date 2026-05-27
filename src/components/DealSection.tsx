import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import AnimateOnScroll from "./AnimateOnScroll";

type Props = {};

export default function DealSection({ }: Props) {
    return (
        <section className="py-15 bg-(--bg-dark) overflow-hidden">
            <div className="container mx-auto px-6">
                {/* top row */}
                <div className="flex flex-col md:flex-row items-center mb-10">
                    <AnimateOnScroll direction="left" className="md:w-1/2">
                        <div className="w-[90%] md:max-w-[410px] mx-auto mb-10">
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
                            Find the Best Deals Instantly
                            </h2>
                            <p className="text-gray-300 mb-10 max-lg:text-[12px] md:mb-15 max-w-lg mx-auto">
                                Compare prices from various online retailers in
                                real-time, ensuring you always get the best deal
                                available.
                            </p>
                            <Button text="Get Started" link="/get-started" />
                        </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll direction="right" className="md:w-1/2 w-9/10">
                        <div className="relative w-full aspect-square max-w-[410px] mx-auto rounded-2xl">
                            <Image
                                src="/image1.jpg"
                                alt="Best price found for a camera/camera-parts"
                                fill
                                sizes="(max-width: 410px)"
                                className="object-cover shadow-2xl rounded-2xl opacity-90"
                            />
                        </div>
                    </AnimateOnScroll>
                </div>


                {/* bottom row */}
                <div className="flex flex-col md:flex-row-reverse items-center overflow-hidden">
                    <AnimateOnScroll direction="right" className="md:w-1/2">
                        <div className="w-[90%] md:max-w-[410px] mx-auto mb-10">
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
                            Detailed Product Insights
                            </h2>
                            <p className="text-gray-300 mb-10 max-lg:text-[12px] md:mb-15 max-w-lg mx-auto">
                                Get detailed summaries that compile crucial
                                information, helping you make confident
                                purchasing decisions quickly and easily.
                            </p>
                            <Button link="/get-started" text="Get Started" />
                        </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll direction="left" className="md:w-1/2 w-9/10">
                        <div className="relative w-full aspect-square max-w-[410px] mx-auto rounded-xl">
                            <Image
                                src="/image2.jpg"
                                alt="Key features of electronics"
                                fill
                                sizes="(max-width: 410px)"
                                className="object-cover shadow-2xl rounded-2xl"
                            />
                        </div>
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}
