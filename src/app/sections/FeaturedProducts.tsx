"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EmptyProducts from "@/app/sections/EmptyProducts";
import ProductsDisplay from "@/app/sections/ProductsDisplay";

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            try {
                const res = await fetch("/api/products");
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return (
        <section id="shop" className="relative w-full py-20 text-gray-600">
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
                    Discover our finest salt selections — pure, natural, and sustainably crafted for better taste.
                </motion.p>

                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : products.length > 0 ? (
                    <ProductsDisplay products={products} />
                ) : (
                    <EmptyProducts />
                )}
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        </section>
    );
}
