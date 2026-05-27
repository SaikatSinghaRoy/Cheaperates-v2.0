'use client'
import { useState } from "react";
import { motion } from "motion/react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { MdOutlineSearch } from "react-icons/md";

const categories = ["All", "Electronics", "Fashion", "Home", "Sports"];

const deals = [
    { title: "Sony WH-1000XM5", category: "Electronics", discount: "32%", price: "₹24,990", original: "₹36,990", store: "Amazon" },
    { title: "Nike Air Max 270", category: "Fashion", discount: "40%", price: "₹5,999", original: "₹9,999", store: "Flipkart" },
    { title: "Instant Pot Duo", category: "Home", discount: "25%", price: "₹6,499", original: "₹8,599", store: "Amazon" },
    { title: "boAt Airdopes 141", category: "Electronics", discount: "50%", price: "₹999", original: "₹1,999", store: "Meesho" },
    { title: "Adidas Track Jacket", category: "Sports", discount: "35%", price: "₹2,099", original: "₹3,199", store: "Myntra" },
    { title: "Philips Air Fryer", category: "Home", discount: "28%", price: "₹7,499", original: "₹10,399", store: "Flipkart" },
];

export default function DealsPage() {
    const [active, setActive] = useState("All");
    const [search, setSearch] = useState("");

    const filtered = deals.filter(d =>
        (active === "All" || d.category === active) &&
        d.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="min-h-screen bg-(--bg-dark) pt-36 pb-20 relative overflow-hidden">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-(--primary)/20 blur-[150px] rounded-full" />
            <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-(--primary)/15 blur-[150px] rounded-full" />

            <div className="container mx-auto px-6 relative">
                {/* Heading */}
                <AnimateOnScroll>
                    <p className="text-center mb-2">
                        <span className="bg-(--primary)/10 text-(--primary) text-[9px] md:text-xs font-bold px-3 py-1 rounded-full">TODAY'S DEALS</span>
                    </p>
                    <h1 className="text-4xl md:text-6xl font-thin text-white text-center mb-4">Best Deals Right Now</h1>
                    <p className="text-gray-400 text-center max-w-xl mx-auto mb-10 max-lg:text-[12px]">
                        Handpicked savings from across the web — updated daily.
                    </p>
                </AnimateOnScroll>

                {/* Search */}
                <AnimateOnScroll delay={0.15}>
                    <div className="relative max-w-md mx-auto mb-8">
                        <MdOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Search deals..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-(--primary) transition-colors"
                        />
                    </div>
                </AnimateOnScroll>

                {/* Category Filter */}
                <AnimateOnScroll delay={0.25}>
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map(cat => (
                            <motion.button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${active === cat
                                    ? "bg-(--primary) border-(--primary) text-white"
                                    : "border-white/20 text-gray-400 hover:border-(--primary)/50 hover:text-white"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </AnimateOnScroll>

                {/* Deals Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.length === 0 ? (
                        <p className="col-span-3 text-center text-gray-500 py-20">No deals found.</p>
                    ) : filtered.map((deal, i) => (
                        <motion.div
                            key={deal.title}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-(--primary)/40 transition-colors group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07 }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs bg-(--primary)/15 text-(--primary) px-2 py-1 rounded-full font-medium">{deal.category}</span>
                                <span className="text-xs bg-green-500/15 text-green-400 px-2 py-1 rounded-full font-bold">{deal.discount} OFF</span>
                            </div>
                            <h3 className="text-white font-semibold mb-3 group-hover:text-(--primary) transition-colors">{deal.title}</h3>
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-white text-xl font-bold">{deal.price}</span>
                                <span className="text-gray-500 text-sm line-through">{deal.original}</span>
                            </div>
                            <p className="text-gray-500 text-xs">via {deal.store}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}