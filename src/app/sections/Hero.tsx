"use client";

import { motion } from "framer-motion";
import {Button} from "@/components/ui/button";
import Link from "next/link";


export default function Hero() {
    return (
        <section
            id="home"
            className="mt-3 relative w-full h-[40rem] flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-blue-50 to-white"
        >

            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                src="https://www.pexels.com/download/video/4791868/"
            ></video>


            <div className="absolute inset-0 bg-white/20 "></div>


            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 max-w-2xl px-4"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-extrabold text-4xl md:text-6xl text-gray-900 drop-shadow-sm"
                >
                    From Nature to You
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-bold text-3xl md:text-5xl mt-2 text-red-500"
                >
                    Pure at Every Step
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-6 text-gray-200 text-base md:text-xl leading-relaxed"
                >
                    Sustainably harvested and responsibly refined
                    bringing you the best of nature while caring for the planet.
                </motion.p>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <Link href="#about">
                            <Button className="p-6 text-lg">
                                Learn More
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Shop Now */}
                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <Link href={"#shop"}>
                            <Button className="p-6 text-lg" variant="secondary">
                                Shop Now
                            </Button>
                        </Link>

                    </motion.div>

                </div>
            </motion.div>

        </section>
    );
}