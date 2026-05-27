'use client'
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import Navigation from "./Navigation";

type Props = {};

const navLinks = [
    { href: "/about", label: "About" },
    { href: "/deals", label: "Deals" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
];

const Header = (props: Props) => {
    const [scrolling, setScrolling] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolling ? "bg-[#0f1323]/80 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"} `}>

            <div className="container mx-auto px-6 py-6">
                <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-sm:max-w-[340px] mx-auto flex items-center justify-between">

                    {/* left - logo */}
                    <Link href="/" className="flex items-center gap-2">
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

                    {/* middle - desktop naviagtion */}
                    <div className="max-md:hidden md:flex justify-evenly items-center gap-3 lg:gap-7 text-white">
                        {navLinks.map((link, i) => {
                            const isActive = pathname === link.href;
                            return (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i + 0.3 }}
                                >
                                    <Link href={link.href} className={`relative text-sm font-medium transition-colors hover:text-(--primary) ${isActive ? "text-(--primary)" : "text-white"}`}>
                                        {link.label}
                                        {isActive && (
                                            <motion.span
                                                layoutId="underline"
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-(--primary) rounded-full"
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* right - button CTA */}
                    <motion.div whileTap={{ scale: 0.97 }}>
                        <Link href="/get-started" className="max-md:hidden md:block relative overflow-hidden px-6 py-3 rounded-md bg-(--primary) text-white text-sm font-bold transition-all group">
                            <span className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[120%] bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-500"></span>
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started
                                <span className="text-lg transition-transform duration-400 group-hover:rotate-45"><BsArrowUpRight /></span>
                            </span>
                        </Link>
                    </motion.div>

                    {/* toogle - mobile navigation */}
                    <div className="md:hidden">
                        <Navigation />
                    </div>

                </motion.nav>
            </div>
        </header >
    );
};

export default Header;
