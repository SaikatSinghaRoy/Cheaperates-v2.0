'use client'
import { useState } from "react";
import { motion } from "motion/react";
import { MdOutlineAlternateEmail, MdCall } from "react-icons/md";
import { TbBrandOffice } from "react-icons/tb";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Metadata } from "next";

const contactInfo = [
    { Icon: MdOutlineAlternateEmail, title: "Email", desc: "help@cheaperates.com" },
    { Icon: MdCall, title: "Phone", desc: "+123-456-789" },
    { Icon: TbBrandOffice, title: "Address", desc: "Bay Area, Seattle, USA" },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <section className="min-h-screen bg-(--bg-dark) pt-36 pb-20 relative overflow-hidden">
            {/* Blobs */}
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-(--primary)/20 blur-[150px] rounded-full" />
            <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-(--primary)/15 blur-[150px] rounded-full" />

            <div className="container mx-auto px-6 relative">
                {/* Heading */}
                <AnimateOnScroll>
                    <p className="text-center mb-2 md:mb-4">
                        <span className="bg-(--primary)/10 text-(--primary) text-[9px] md:text-xs font-bold px-3 py-1 rounded-full">CONTACT US</span>
                    </p>
                    <h1 className="text-4xl md:text-6xl font-thin text-white text-center mb-4">Get In Touch</h1>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.15}>

                    <p className="text-gray-400 text-center max-w-xl mx-auto mb-16 max-lg:text-[12px]">
                        Have a question or feedback? We'd love to hear from you.
                    </p>
                </AnimateOnScroll>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Form */}
                    <AnimateOnScroll direction="left">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            {sent ? (
                                <motion.div
                                    className="flex flex-col items-center justify-center h-full gap-4 text-center py-12"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <span className="text-5xl">✅</span>
                                    <h3 className="text-white text-xl font-bold">Message Sent!</h3>
                                    <p className="text-gray-400 text-sm">We'll get back to you shortly.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    <div>
                                        <label className="text-gray-400 text-xs mb-1 block">Name</label>
                                        <input
                                            type="text" required
                                            value={form.name}
                                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-(--primary) transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-xs mb-1 block">Email</label>
                                        <input
                                            type="email" required
                                            value={form.email}
                                            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-(--primary) transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-xs mb-1 block">Message</label>
                                        <textarea
                                            required rows={5}
                                            value={form.message}
                                            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-(--primary) transition-colors resize-none"
                                            placeholder="Your message..."
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className="w-full bg-(--primary) text-white font-bold py-3 rounded-lg relative overflow-hidden group"
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[120%] bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-500" />
                                        Send Message
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </AnimateOnScroll>

                    {/* Contact Info */}
                    <AnimateOnScroll direction="right" className="flex flex-col gap-6 justify-center">
                        {contactInfo.map(({ Icon, title, desc }) => (
                            <motion.div
                                key={title}
                                className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-xl p-5 group hover:border-(--primary)/40 transition-colors"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="text-2xl text-(--primary) group-hover:scale-110 transition-transform">
                                    <Icon />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-sm">{title}</h4>
                                    <p className="text-gray-400 text-xs">{desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}