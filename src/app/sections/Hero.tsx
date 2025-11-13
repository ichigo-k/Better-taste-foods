"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const words = ["Better", "Taste", "For", "A", "Better", "Life"];

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.25, delayChildren: 0.3 },
    },
};

const child = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function Hero() {
    // @ts-ignore
    return (
        <section
            id="home"
            className="mt-3 relative w-full h-[40rem] flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-blue-50 to-white"
        >
            <Image
                src={"/hero1.png"}
                alt={"hero"}
                height={1000}
                width={1000}
                className="absolute top-0 left-0 w-full h-full rounded-md"
            />

            <div className="absolute inset-0 bg-black/30 "></div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 max-w-2xl px-4"
            >
                {/* === Animated Heading === */}
                <motion.h1
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="font-extrabold text-4xl capitalize md:text-6xl text-white drop-shadow-sm z-[20] flex flex-wrap gap-2 justify-center"
                >
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            variants={child}
                            className={word === "Taste" || word === "Life" ? "text-red-500" : ""}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.h1>

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
                        <Link href={"#about"}>
                            <Button className="p-6 text-lg bg-red-500">Learn More</Button>
                        </Link>
                    </motion.div>

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
