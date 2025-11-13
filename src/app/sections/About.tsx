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
            <div className="absolute inset-0 bg-[linear-gradient(rgba(100,100,100,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(100,100,100,0.05)_1px,transparent_1px)] bg-[size:40px_40px] animate-[gridMove_20s_linear_infinite]" >
            </div>


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
                are passionate about sourcing and crafting ingredients that inspire
                creativity in every kitchen. From farm-fresh produce to naturally processed
                essentials, our goal is to deliver pure, authentic, and flavorful
                ingredients you can trust.
            </motion.p>

            {/* Subtext */}
            <motion.p
                className="text-base md:text-lg text-white/80 mt-6 max-w-2xl relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                Each ingredient we offer reflects our dedication to quality,
                sustainability, and taste ensuring that every dish you create
                carries the essence of natural goodness and wholesome flavor.
            </motion.p>

            <HorizontalCards />
        </section>
    );
}
