"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AnimateOnScroll from "./AnimateOnScroll";
import { AnimatePresence, motion } from 'motion/react';

const faqs = [
    {
        question: "What is Cheaperates?",
        answer:
            "Cheaperates is a browser extension that compares product prices across multiple platforms and provides AI-powered summaries directly on product pages.",
    },
    {
        question: "Does Cheaperates work on all websites?",
        answer:
            "Cheaperates works on major marketplaces like Amazon, Flipkart, Myntra, Meesho, and many more. Support for additional sites is continuously expanding.",
    },
    {
        question: "Is this free to use?",
        answer:
            "Yes! Cheaperates is completely free. You can asscess it from the any brower of your choice and start using it instantly.",
    },
    {
        question: "How does the price comparison work?",
        answer:
            "Cheaperates automatically scans leading marketplaces and fetches real-time pricing data to show you the lowest available price.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <section className="py-15 md:py-20 bg-(--bg-dark) transition-colors">
            <div className="container mx-auto px-6 max-w-3xl relative max-md:px-12">

                {/* Heading */}
                <p className="text-center mb-2 md:mb-4">
                    <span className="bg-(--primary)/10 text-(--primary) text-[9px] md:text-xs font-bold px-3 py-1 rounded-full">FREQUENTLY ASKED QUESTIONS</span>
                </p>
                <AnimateOnScroll>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-center text-white mb-6">
                        Answer to all Your Questions
                    </h2>
                </AnimateOnScroll>

                <AnimateOnScroll delay={0.15}>
                    <p className="text-center text-gray-400 mx-auto mb-14 max-w-xl max-lg:text-[12px] max-md:max-w-[340px]">
                        Everything you need to know about how Cheaperates works and how it helps you shop smarter.
                    </p>
                </AnimateOnScroll>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((item, index) => (
                        <AnimateOnScroll delay={index * 0.15} key={index} >
                            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-md hover:shadow-[#607AFB33] transition-all">
                                {/* question */}
                                <button onClick={() => toggle(index)}
                                    className="w-full flex items-center justify-between px-4 py-3 md:px-6 md:py-5 text-left">
                                    <span className="font-semibold text-white max-lg:text-[12px] md:text-lg">
                                        {item.question}
                                    </span>

                                    <span className={` text-[#607AFB] transition-transform duration-300 
                                ${openIndex === index ? "rotate-135" : "rotate-0"}`}>
                                        <FaPlus />
                                    </span>
                                </button>

                                {/* answer */}
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-4 md:px-6 overflow-hidden"
                                        >
                                            <p className="text-gray-300 max-md:text-[10px] md:text-[14px] pb-4 md:pb-6">
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>

            </div>
        </section>
    );
}
