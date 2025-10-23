"use client";

import { ReactElement } from "react";
import { motion } from "framer-motion";
import HorizontalCards from "@/app/sections/HorizontalCards";

export default function About(): ReactElement {
    return (
        <section
            id="about"
            className="relative w-full py-16 bg-red-500 text-white overflow-hidden flex flex-col items-center text-center px-6"
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(100,100,100,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(100,100,100,0.05)_1px,transparent_1px)] bg-[size:40px_40px] animate-[gridMove_20s_linear_infinite]" />


            {/* Title */}
            <motion.h2
                className="text-4xl md:text-5xl font-bold mb-4 relative z-10"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Who We Are
            </motion.h2>

            {/* Tagline */}
            <motion.p
                className="text-lg md:text-xl text-white/90 max-w-3xl relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                At <span className="font-semibold text-white">Better Taste Foods</span>, we
                believe that purity and flavor go hand in hand. Our mission is to bring
                naturally harvested sea salt, rich in minerals and sustainably produced,
                from the ocean straight to your table.
            </motion.p>

            {/* Subtext */}
            <motion.p
                className="text-base md:text-lg text-white/80 mt-6 max-w-2xl relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                Every crystal we craft tells a story of care, sustainability, and an
                unwavering commitment to quality ensuring that every meal you prepare
                is touched by the freshness of the sea.
            </motion.p>

            <HorizontalCards/>
        </section>
    );
}
