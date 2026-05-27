'use client'
import Link from "next/link";
import Image from "next/image";

import { motion } from "motion/react";
import AnimateOnScroll from "./AnimateOnScroll";


const productLinks = ["Features", "How It Works", "Downloads"];
const resourceLinks = ["Blogs", "FAQ", "Documentation"];
const connectLinks = ["Email Support", "Twitter", "Contact Us"];

type Props = {};
const Footer = (props: Props) => {

    return (
        <footer className="bg-[#0B1120] text-gray-300 pt-12 pb-6 mb:pt-16 md:pb-8 relative">

            {/* TOP GRADIENT OVERLAY */}
            <div className="absolute top-0 left-0 right-0 h-[200px] bg-linear-to-b from-transparent to-[#0B1120]/90 pointer-events-none"></div>

            {/* main-footer */}
            <div className="container mx-auto px-8 relative z-10">


                {/* top-row */}
                <div className="flex md:flex-row flex-col justify-between">

                    {/* Logo + Description - Left */}
                    <AnimateOnScroll direction="left" className=" md:max-lg:w-1/2 lg:w-[65%] max-md:text-center ">
                        <Link href="/" className="flex items-center max-md:justify-center gap-2 mb-2 md:mb-4">
                            <div className="w-8 h-8 bg-transparent rounded-full flex items-center justify-center">
                                <Image
                                    src="/logo.png"
                                    alt="Cheaperates"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <span className="font-bold text-xl text-white">Cheaperates</span>
                        </Link>

                        <p className="text-gray-400 text-[12px] md:text-[14px]">
                            Your Ultimate Shopping Companion.
                        </p>
                    </AnimateOnScroll>

                    {/* Links - Right */}
                    <div className="flex flex-row justify-between mt-6 md:mt-2 md:max-lg:w-1/2 lg:w-[35%]">
                        {[
                            { title: "Product", links: productLinks },
                            { title: "Resources", links: resourceLinks },
                            { title: "Connect", links: connectLinks },
                        ].map((col, colIdx) => (
                            <AnimateOnScroll key={col.title} direction="right" delay={colIdx * 0.15}>
                                <h3 className="font-semibold mb-2 md:mb-4 text-(--primary)">{col.title}</h3>
                                <ul>
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <Link href="#" className="hover:text-[#607AFB] transition text-xs">
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <AnimateOnScroll direction="left">
                    <div className="w-full h-px bg-white/10 my-5 md:my-10"></div>
                </AnimateOnScroll>
                {/* <div className=" w-full h-px bg-white/10 my-5 md:my-10 ">Hello</div> */}

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-4 text-gray-500 text-[10px] md:text-sm">
                    <motion.p initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}> © {new Date().getFullYear()} Cheaperates. All rights reserved.</motion.p>

                    <div className="flex items-center gap-6">
                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} >
                            <Link href="#" className="hover:text-[#607AFB] transition">Privacy Policy</Link>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }} >
                            <Link href="#" className="hover:text-[#607AFB] transition">Terms of Service</Link>
                        </motion.div>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;