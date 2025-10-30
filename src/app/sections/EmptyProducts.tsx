"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";

export default function EmptyProducts() {
    return (
        <section className="w-full flex flex-col items-center justify-center text-center  px-4">
            <motion.div
                animate={{
                    y: [0, -15, 0],
                }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                className="p-6 inline-block"
            >
                <Package size={200} className="text-red-600 " />
            </motion.div>




            <motion.h3
        initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="text-2xl font-semibold text-gray-500 mb-4"
        >
        Nothing to See Here... Yet!
      </motion.h3>

    {/* Message */}
    <motion.p
        initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.6 }}
    className="max-w-lg text-gray-400 text-sm leading-relaxed"
        >
        Our team is working tirelessly behind the scenes to bring you a handpicked
    selection of fresh, high-quality products.
        <br />
    </motion.p>

    </section>
);
}
