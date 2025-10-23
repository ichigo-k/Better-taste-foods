"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import EmptyProducts from "@/app/sections/EmptyProducts";
import ProductsDisplay from "@/app/sections/ProductsDisplay";

export default function FeaturedProducts() {
    // 🧂 Dummy product data
    const products = [
        {
            id: 1,
            name: "Pure Sea Salt Crystals",
            price: 12.99,
            discount: 10,
            outOfStock: false,
            image: "https://picsum.photos/seed/salt1/400/300",
        },
        {
            id: 2,
            name: "Mineral-Rich Flake Salt",
            price: 9.49,
            discount: 0,
            outOfStock: false,
            image: "https://picsum.photos/seed/salt2/400/300",
        },
        {
            id: 3,
            name: "Himalayan Pink Salt",
            price: 15.99,
            discount: 20,
            outOfStock: false,
            image: "https://picsum.photos/seed/salt3/400/300",
        },
        {
            id: 4,
            name: "Smoked Sea Salt Blend",
            price: 18.99,
            discount: 0,
            outOfStock: true,
            image: "https://picsum.photos/seed/salt4/400/300",
        },
        {
            id: 5,
            name: "Ocean Harvest Salt Bag",
            price: 7.99,
            discount: 5,
            outOfStock: false,
            image: "https://picsum.photos/seed/salt5/400/300",
        },
        {
            id: 6,
            name: "Gourmet Salt Sampler Pack",
            price: 22.99,
            discount: 15,
            outOfStock: false,
            image: "https://picsum.photos/seed/salt6/400/300",
        },
    ];

    return (
        <section id="shop" className="relative w-full py-20  text-gray-900">
            <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Featured Products
                </motion.h2>


                <motion.p
                    className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Discover our finest salt selections pure, natural, and sustainably crafted for better taste.
                </motion.p>


                {products.length > 0 ? (
                   <ProductsDisplay products={products}/>
                ) : (
                   <EmptyProducts/>
                )}
            </div>


            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        </section>
    );
}
