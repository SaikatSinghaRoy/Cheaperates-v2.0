'use client'

import { motion } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { TbArrowsDiff } from "react-icons/tb";
import { MdOutlineSummarize, MdOutlineBolt, MdOutlineSearch } from "react-icons/md";

import AnimateOnScroll from "@/components/AnimateOnScroll";

const steps = [
    { icon: TbArrowsDiff, title: "Compare Prices", desc: "Paste any product link and instantly see prices from multiple platforms side by side." },
    { icon: MdOutlineSummarize, title: "Read AI Summary", desc: "Get a quick breakdown of specs, pros, cons and user sentiment — no scrolling needed." },
    { icon: MdOutlineBolt, title: "Buy Smart", desc: "Pick the best deal and go straight to checkout on the retailer's site." },
];

export default function GetStartedPage() {
    const [keyword, setKeyword] = useState('');

    // New states for handling the API data
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!keyword.trim()) return;

        setLoading(true);
        setError(null);
        setResults([]); // Clear previous results

        try {
            // Hit the search API we built
            const res = await fetch(`/api/search?q=${encodeURIComponent(keyword)}`);
            const data = await res.json();

            if (data.success) {
                setResults(data.results);
            } else {
                setError(data.error || 'Failed to fetch deals');
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    // A helper boolean to know if we should hide the default page content
    const isSearchingOrHasResults = loading || error || results.length > 0;

    return (
        <section className="min-h-screen bg-(--bg-dark) pt-36 pb-20 relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-(--primary)/20 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-(--primary)/15 blur-[150px] rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero */}
                <p className="text-center mb-2">
                    <span className="bg-(--primary)/10 text-(--primary) text-[9px] md:text-xs font-bold px-3 py-1 rounded-full">GET STARTED</span>
                </p>
                <AnimateOnScroll>
                    <h1 className="text-4xl md:text-6xl font-thin text-white text-center mb-4">
                        Start Saving <span className="font-semibold">Today</span>
                    </h1>
                    <p className="text-gray-400 text-center max-w-xl mx-auto mb-10 max-lg:text-[12px]">
                        Cheaperates is free to use. No signup needed. Just type an exact item and start comparing.
                    </p>
                </AnimateOnScroll>

                {/* Search Bar */}
                <AnimateOnScroll delay={0.18}>
                    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-16">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="iPhone 16 Pro 256GB..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-6 pr-16 text-white text-[15px] focus:outline-none focus:border-(--primary) transition-colors"
                            required
                        />
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileTap={{ scale: 0.97 }}
                            className="absolute right-0 top-0 bottom-0 bg-(--primary) text-white px-5 py-3.5 rounded-xl transition-colors disabled:opacity-50"
                        >
                            <MdOutlineSearch size={25} />
                        </motion.button>
                    </form>
                </AnimateOnScroll>


                {/* --- DYNAMIC CONTENT AREA --- */}
                <>
                    {/* Loading State */}
                    {loading && (
                        <AnimateOnScroll>
                            <div className="text-center py-20">
                                <div className="animate-spin rounded-full h-14 w-14 border-b-3 border-(--primary) mx-auto mb-4"></div>
                                <p className="font-medium text-white">AI is scanning multiple platforms...</p>
                                <p className="text-sm mt-2 text-gray-400">Finding the exact match for "{keyword}"</p>
                            </div>
                        </AnimateOnScroll>
                    )}

                    {/* Error State */}
                    {error && (
                        <AnimateOnScroll>
                            <div className="text-red-400 text-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl max-w-xl mx-auto">
                                {error}
                            </div>
                        </AnimateOnScroll>
                    )}

                    {/* Results Grid */}
                    {!loading && results.length > 0 && (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((product, idx) => (
                                <motion.div key={idx}
                                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-(--primary)/40 transition-colors group"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 }}>

                                    {/* AI Extracted Product Header */}
                                    <h3 className="text-white text-xl font-bold mb-5 group-hover:text-(--primary) transition-colors">
                                        {product.brand !== 'Unknown' ? `${product.brand} ` : ''}
                                        {product.model !== 'Unknown'
                                            ? product.model
                                            : (product.deals?.[0]?.original_title || '').substring(0, 45) + '...'}
                                    </h3>

                                    {/* Platform Deals List */}
                                    <div className="space-y-3">
                                        {product.deals.map((deal: any, dealIdx: number) => (
                                            <motion.div key={dealIdx}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx/5 + dealIdx * 0.07 }}
                                                className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-white/20">
                                                <span className="font-bold text-[13px]">
                                                    On {deal.platform}
                                                </span>
                                                <div className="flex items-center gap-4">
                                                    <span className="font-extrabold text-lg text-white">{deal.price}</span>
                                                    <motion.a whileTap={{ scale: 0.90 }}
                                                        href={deal.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-4 py-2 bg-(--primary) text-white text-xs font-bold rounded-md hover:opacity-90"
                                                    >
                                                        Buy
                                                    </motion.a>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                </motion.div>
                            ))}
                        </div>

                    )}

                </>

                {/* --- DEFAULT CONTENT (Hidden when searching/viewing results) --- */}
                {!isSearchingOrHasResults && (
                    <>
                        {/* Steps */}
                        <div className="grid md:grid-cols-3 gap-8 mb-20 mt-25">
                            {steps.map(({ icon: Icon, title, desc }, i) => (
                                <AnimateOnScroll key={title} delay={i * 0.15}>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-(--primary)/40 transition-all group text-center h-full">
                                        <div className="w-14 h-14 rounded-full bg-(--primary)/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-(--primary)/20 transition-colors">
                                            <Icon className="text-(--primary) text-2xl" />
                                        </div>
                                        <h3 className="text-white font-bold mb-3">{title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>

                        {/* CTA */}
                        <AnimateOnScroll>
                            <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-12 max-w-2xl mx-auto">
                                <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">Find the best deals</h2>
                                <p className="text-gray-400 text-sm mb-8">Start comparing prices on any product in seconds.</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                        <Link
                                            href="/deals"
                                            className="inline-flex items-center gap-2 bg-(--primary) text-white font-bold py-3 px-8 rounded-lg relative overflow-hidden group"
                                        >
                                            <span className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[120%] bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-500" />
                                            Browse Deals
                                            <BsArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                        <Link
                                            href="/about"
                                            className="inline-flex items-center gap-2 border border-white/20 text-white font-bold py-3 px-8 rounded-lg hover:border-(--primary)/50 transition-colors"
                                        >
                                            Learn More
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    </>
                )}
            </div>
        </section>
    );
}