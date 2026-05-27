'use client'
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-(--primary) text-white flex items-center justify-center shadow-lg shadow-[#607afb]/30"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{   opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{  scale: 0.9 }}
                    aria-label="Scroll to top"
                >
                    <FaArrowUp size={14} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}