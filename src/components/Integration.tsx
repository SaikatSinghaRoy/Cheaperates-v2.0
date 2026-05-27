
'use client'
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const logos = [
    { src: "/logos/amazon.png",   alt: "Amazon",   size: "h-15 w-15 md:h-25 md:w-25", invert: true },
    { src: "/logos/flipkart.png", alt: "Flipkart", size: "h-10 w-10 md:h-20 md:w-20", invert: false },
    { src: "/logos/myntra.png",   alt: "Myntra",   size: "h-10 w-10 md:h-20 md:w-20", invert: false },
    { src: "/logos/meesho.png",   alt: "Meesho",   size: "h-15 w-15 md:h-25 md:w-25", invert: false },
];

export default function Integration() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section className="py-12 md:py-16 bg-(--bg-dark)" ref={ref}>
            <div className="container mx-auto px-6 text-center">

                {/* Title */}
                <motion.h2
                    className="text-white text-xl max-sm:mb-2 md:text-2xl font-bold mb-5"
                    initial={{ opacity: 0, y: -16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    Integration with
                </motion.h2>

                {/* Logos */}
                <div className="flex justify-center items-center flex-wrap gap-8 md:gap-16">
                    {logos.map((logo) => (
                        <motion.div
                            key={logo.alt}
                            className={`relative ${logo.size}`}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                            }}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                sizes="(max-width: 20px)"
                                className={`object-contain opacity-40 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 ${logo.invert ? "invert" : ""}`}
                            />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}