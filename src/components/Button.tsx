'use client'
import Link from "next/link";
import { motion } from "motion/react";

type Props = { text: string; link: string };
const Button = ({ text, link }: Props) => {
    return (
        <motion.div whileTap={{ scale: 0.97 }}>
            <Link
                href={link}
                className="inline-block bg-(--primary) relative overflow-hidden text-white font-bold py-3 px-7 max-sm:px-8 max-sm:py-4 rounded-lg transition-opacity group"
            >
                <span className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[120%] bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-500"></span>
                {text}
            </Link>
        </motion.div>
    );
};

export default Button;
