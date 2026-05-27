'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

const navItems = [
    { name: "About", href: "/about" },
    { name: "Deals", href: "/deals" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                if (isOpen) {
                    setIsOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (
        <nav className="bg-transparent p-3 relative" ref={navRef}>
            {/* <div className="flex justify-between items-center"> */}

                {/* Hamburger Icon (Visible on small screens) */}
                <motion.button className="text-(--primary) focus:outline-none" onClick={toggleMenu} whileTap={{ scale: 0.85 }}>
                    <AnimatePresence mode='wait' initial={false}>

                        {/* Icon for the Hamburger/Close state */}
                        {isOpen ? (
                            // when open shows Close icon (X)
                            <motion.svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                key="close" initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </motion.svg>
                        ) : (
                            // when closed shows Hamburger icon (3 bars)
                            <motion.svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                key="open" initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </motion.svg>
                        )}
                    </AnimatePresence>
                </motion.button>
            {/* </div> */}

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute bg-[#0B1120] top-full right-0 w-[100px] shadow-lg z-10 rounded-xl overflow-hidden border border-white/10"
                        initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        style={{ originY: 0 }}
                    >
                        <ul className="flex flex-col py-1">
                            {navItems.map((item, i) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 + 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={toggleMenu}
                                        className="block p-2 text-center text-white text-[12px] hover:text-(--primary)  transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

