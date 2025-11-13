"use client";

import { ReactElement } from "react";
import { motion } from "framer-motion";
import { Leaf, Droplet, Heart, ShieldCheck } from "lucide-react";

const offers = [
    {
        icon: <Leaf className="w-10 h-10 text-red-500" />,
        title: "100% Natural Ingredients",
        desc: "Every grain is naturally harvested and free from additives, giving your meals the purity they deserve.",
    },
    {
        icon: <Droplet className="w-10 h-10 text-red-500" />,
        title: "Rich in Minerals",
        desc: "Our salts retain essential trace minerals that enhance both taste and nutrition.",
    },
    {
        icon: <Heart className="w-10 h-10 text-red-500" />,
        title: "Sustainably Harvested",
        desc: "We prioritize eco-friendly sourcing methods that protect marine life and the environment.",
    },
    {
        icon: <ShieldCheck className="w-10 h-10 text-red-500" />,
        title: "Quality You Can Trust",
        desc: "Each batch undergoes strict quality checks to ensure you enjoy only the best sea salt.",
    },
];

export default function WhatWeOffer(): ReactElement {
    return (
        <section id="offers" className="relative w-full py-20 bg-white text-gray-600">
            <div className="max-w-6xl mx-auto px-6 text-center">
                {/* Title */}
                <motion.h2
                    className="relative  p-1 text-4xl md:text-5xl font-bold mb-4 z-10 inline-block"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="relative z-10">What We Offer</span>
                    <span className="absolute inset-x-0 bottom-1 h-3  bg-gradient-to-r from-red-400 to-red-500 rounded-md -z-0"></span>
                </motion.h2>


                {/* Tagline */}
                <motion.p
                    className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Discover our commitment to purity, sustainability, and quality — making every meal taste better and feel better.
                </motion.p>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {offers.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl flex flex-col items-center text-center transition-all duration-300"
                            whileHover={{ y: -8 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Faint grid pattern background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
        </section>
    );
}
