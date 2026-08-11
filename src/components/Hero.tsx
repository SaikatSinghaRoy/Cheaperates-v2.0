'use client'
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { TbArrowsDiff } from "react-icons/tb";
import { MdOutlineSummarize } from "react-icons/md";
import { FaBolt } from "react-icons/fa";
import Button from "./Button";



type PropsCard = { Icon: any, title: string, description: string };
const Card = ({ Icon, title, description }: PropsCard) => {
    return (
        <div className={`bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 group max-w-[340px] mx-auto`}>
            <span className="text-(--primary) text-3xl transition-transform duration-200 ease-out group-hover:scale-130 group-hover:-translate-y-0.5 inline-block "><Icon /></span>
            <h3 className="font-bold mb-3">{title}</h3>
            <p className="text-[12px] text-gray-300">{description}</p>
        </div>
    );
};

type Props = { scrollToTargetRef: any };

const Hero = ({ scrollToTargetRef }: Props) => {
    const card1props: PropsCard = {
        Icon: TbArrowsDiff,
        title: "Instant Price History",
        description: "Cheaperates highlights the best savings opportunities effortlessly."
    };
    const card2props: PropsCard = {
        Icon: MdOutlineSummarize,
        title: "Quick Product Description",
        description: "Access detailed product descriptions, specifications, and user reviews."
    };
    const card3props: PropsCard = {
        Icon: FaBolt,
        title: "User-Friendly and Efficient",
        description: "Spend less time searching and more time shopping with efficient browsing."
    };


    return (
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
            <div className="container mx-auto px-6 pt-45 md:pt-55 pb-16 relative">
                {/* top part - landing */}
                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* left-side */}
                    <motion.div className="md:w-1/2 text-center md:text-left" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} >
                        <div className="w-82/100 mx-auto">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="text-4xl md:text-7xl text-white mb-10">
                                <span className="font-thin max-sm:text-5xl">
                                    Discover
                                </span>
                                <br />
                                <span className="font-semibold">New Deals</span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.4 }} className="text-gray-300 max-lg:text-[12px] md:mb-20 mb-30 max-w-lg mx-auto md:mx-0">
                                Experience the Difference Today. Save money with
                                <Link href="/"> Cheaperates.com</Link>, find the
                                best deals, discounts within your reach.
                            </motion.p>

                            {/* buttons */}
                            <motion.div initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }} className="flex justify-center md:justify-start items-center gap-6">
                                <Button text="Get Started" link="/get-started" />

                                <button
                                    onClick={scrollToTargetRef}
                                    className="flex items-center gap-2 text-white font-medium group cursor-pointer"
                                >
                                    Learn More
                                    <span className="material-symbols-outlined transition-transform text-lg group-hover:translate-x-0.5 group-hover:text-xl">
                                        <BsArrowRight />
                                    </span>
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* right-side */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="md:w-1/2 max-w-[450px] w-9/10 mx-auto ">
                        <motion.div animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative w-9/10 aspect-square max-w-[450px] mx-auto rounded-xl shadow-2xl shadow-[#607afb]/40">
                            <Image
                                src="/landing.png"
                                alt="Cheaperates landing"
                                fill
                                sizes='(max-width: 450px)'
                                className="object-contain rounded-xl"
                                loading="eager"
                            />
                        </motion.div>
                    </motion.div>
                </div>

                {/* bottom - three cards */}
                <motion.div className="grid md:grid-cols-3 gap-8 mt-25 text-white"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } }
                    }}>

                    {[card1props, card2props, card3props].map((card, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                        >
                            <Card {...card} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </main >
    );
};

export default Hero;
