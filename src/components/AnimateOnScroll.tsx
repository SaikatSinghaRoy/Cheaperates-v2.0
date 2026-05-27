'use client'
import { motion, useInView } from "motion/react";
import { useRef } from 'react';

type Props = {
    children?: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'left' | 'right';
};




export default function AnimateOnScroll({ children, delay = 0, className, direction = 'up' }: Props) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
 

    const getInitial = () => {
        if (direction === 'left') return { opacity: 0, x: -50, y: 0 };
        if (direction === 'right') return { opacity: 0, x: 50,  y: 0 };
        return { opacity: 0, x: 0,   y: 40 };
    };

    return (
        <motion.div
          ref={ref}
          className={className}
          initial={getInitial()}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : getInitial()}
          transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
          {children}
        </motion.div>
    );
}