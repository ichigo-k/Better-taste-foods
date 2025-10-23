'use client';
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-gray-800 text-gray-300 py-10 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto text-center"
            >

                <h3 className="text-xl font-semibold text-white mb-3">
                    Thank you for visiting
                </h3>
                <p className="text-gray-400 mb-6">
                    We’re committed to bringing you the finest salt, sugar,palm oil and other natural products  sustainably sourced and carefully crafted.
                </p>

                <div className="w-24 h-[2px] bg-red-500 mx-auto mb-6 rounded-full"></div>


                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    Built with <Heart className="text-red-500 w-4 h-4" /> by
                    <span className="text-white font-medium">Hany.Net IT Solutions</span>
                </p>

                <p className="text-xs text-gray-600 mt-2">
                    © {new Date().getFullYear()} All rights reserved.
                </p>
            </motion.div>
        </footer>
    );
}
