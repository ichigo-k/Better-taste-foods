"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // assuming you're using shadcn/ui

export default function CTA() {
    return (
        <section className="relative bg-gradient-to-r from-red-500 to-red-400 text-white py-10 px-6 text-center overflow-hidden rounded-t-2xl shadow-lg">
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-20"></div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-2xl mx-auto"
            >
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                    Quality You Can Taste, Sustainability You Can Trust
                </h2>

                <p className="text-white/90 mb-8 text-lg leading-relaxed">
                    From salt and sugar to premium palm oil — we’re redefining what it means to be pure, natural, and responsibly sourced.
                </p>

                <Link href={"#shop"}>
                    <Button
                        className="bg-white text-red-600 hover:bg-red-50 px-8 py-5 text-lg font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        Explore Our Products
                    </Button>
                </Link>

            </motion.div>
        </section>
    );
}
