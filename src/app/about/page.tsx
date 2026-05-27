'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineAlternateEmail, MdCall } from "react-icons/md";
import { TbBrandOffice } from "react-icons/tb";
import { motion } from 'motion/react';
import AnimateOnScroll from "@/components/AnimateOnScroll";


type PropsCard = { Icon: any, title: string, description: string };
const Card = ({ Icon, title, description }: PropsCard) => {
    return (
        <div className={`bg-white/5 backdrop-blur-sm p-2.5 md:px-5 md:py-6 rounded-xl border border-white/10 group flex items-center w-[120px] md:w-[215px]`}>
            <div className="text-white transition-transform duration-200 ease-out group-hover:scale-130 group-hover:-translate-y-0.5 group-hover:text-(--primary) text-sm md:text-2xl"><Icon /></div>
            <div className="ml-1.5 md:ml-3">
                <h3 className="max-md:text-[10px] font-bold">{title}</h3>
                <p className="text-[7px] md:text-[12px] text-gray-300">{description}</p>
            </div>
        </div>
    );
};


type Props = {};
const page = (props: Props) => {
    return (
        <section>
            <main className="relative bg-(--bg-dark) overflow-hidden">
                {/* Top gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-(--bg-dark) via-transparent to-transparent "></div>

                {/* Top Blurred blobs */}
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-(--primary)/20 blur-[150px] rounded-full"></div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-linear-to-t from-(--bg-dark) to-transparent"></div>

                {/* Bottom Blurred blobs */}
                <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-(--primary)/20 blur-[150px] rounded-full"></div>

                {/* main-content */}
                <div className="container mx-auto pt-36 pb-20 px-6 md:pb-20 relative">
                    {/* top-row */}
                    <div className="flex flex-col items-center text-center">
                        <AnimateOnScroll>
                            <p className="text-center mb-2 md:mb-4">
                                <span className="bg-(--primary)/10 text-(--primary) text-[9px] md:text-xs font-bold px-3 py-1 rounded-full">ABOUT US</span>
                            </p>
                            <h1 className="text-4xl md:text-6xl font-thin text-white text-center mb-6">
                                About Cheaperates
                            </h1>
                        </AnimateOnScroll>
                        <AnimateOnScroll delay={0.15}>
                            <p className="text-gray-400 text-center max-md:max-w-[320px] max-lg:text-[12px] mb-10 md:mb-20 max-w-xl mx-auto md:mx-0">
                                Discover the story behind our journey, the principles that guides us, and how we are dedicated to make best savings opportuities for you.
                            </p>
                        </AnimateOnScroll>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-9/10 md:w-8/10 max-md:h-[180px] md:h-[300px] lg:h-[420px] xl:h-[480px] rounded-2xl shadow-2xl shadow-[#607afb]/40">
                            <Image
                                src="/about.jpg"
                                alt="About Us"
                                fill
                                sizes="(max-width: 1000px)"
                                className="object-cover rounded-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Our Story - Our target */}
            <section className="py-18 bg-(--bg-dark) overflow-hidden">
                <div className="container mx-auto px-6">

                    {/* Our Story */}
                    <div className="flex flex-col md:flex-row items-center mb-10 md:max-lg:gap-8">
                        <AnimateOnScroll direction="left" className="md:w-1/2">
                            <div className="w-[90%] md:max-w-[380px] mx-auto">
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
                                    Our Story
                                </h2>
                                <p className="text-gray-300 mb-10 max-lg:text-[12px] md:mb-15 max-w-lg mx-auto">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque recusandae illum soluta dolorem cupiditate, a facere. Nemo ex ipsum, numquam magni, optio dolorum voluptas similique, labore porro maiores obcaecati sapiente.
                                </p>
                            </div>
                        </AnimateOnScroll>
                        <AnimateOnScroll direction="right" className="md:w-1/2 w-85/100">
                            <div className="relative w-full aspect-square max-w-[380px] mx-auto">
                                <Image
                                    src="/story.jpg"
                                    alt="Best price found for a camera/camera-parts"
                                    fill
                                    sizes="(max-width: 380px)"
                                    className="object-cover shadow-2xl rounded-2xl"
                                />
                            </div>
                        </AnimateOnScroll>
                    </div>

                    {/* Our Target */}
                    <div className="flex flex-col md:flex-row-reverse items-center md:max-lg:gap-8">
                        <AnimateOnScroll direction="right" className="md:w-1/2">
                            <div className="w-[90%] md:max-w-[380px] mx-auto">
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
                                    Our Target
                                </h2>
                                <p className="text-gray-300 mb-10 max-lg:text-[12px] md:mb-15 max-w-lg mx-auto">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi corporis officiis consectetur sapiente odio suscipit quam numquam doloribus mollitia provident tenetur, labore, quo asperiores reiciendis quod. Consectetur vel eaque veritatis.
                                </p>
                            </div>
                        </AnimateOnScroll>
                        <AnimateOnScroll direction="left" className="md:w-1/2 w-85/100">
                            <div className="relative w-full aspect-square max-w-[380px] mx-auto">
                                <Image
                                    src="/target.jpg"
                                    alt="Key features of electronics"
                                    fill
                                    sizes="(max-width: 380px)"
                                    className="object-cover shadow-2xl rounded-2xl"
                                />
                            </div>
                        </AnimateOnScroll>
                    </div>

                </div>
            </section>

            <section className="relative py-8 md:py-15 overflow-hidden">
                {/* Top gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-(--bg-dark) via-transparent to-transparent "></div>
                {/* top blurred blobs */}
                <div className="absolute top-0 right-0 w-[80%] h-[50%] bg-(--primary)/20 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-0 -left-[20%] w-[85%] h-[40%] bg-(--primary)/40 blur-[150px] rounded-full"></div>

                <div className="container mx-auto px-6 relative flex justify-center">
                    <div className="flex flex-row items-center gap-3 md:gap-8 text-white">
                        {/* Card 1 */}
                        <AnimateOnScroll>
                            <Card Icon={MdOutlineAlternateEmail} title="Email" description="help@email.com" />
                        </AnimateOnScroll>

                        {/* Card 2 */}
                        <AnimateOnScroll delay={0.15}>
                            <Card Icon={MdCall} title="Phone" description="+123-456-789" />
                        </AnimateOnScroll>

                        {/* Card 3 */}
                        <AnimateOnScroll delay={0.3}>
                            <Card Icon={TbBrandOffice} title="Address" description="Bay Area, Seattle, USA" />
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default page;
