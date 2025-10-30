"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore } from "@/context/AuthContext";
import { ProductType } from "@/types";
import { Button } from "@/components/ui/button";
import EmptyProducts from "@/app/sections/EmptyProducts";
import AddProductModal from "@/app/dashboard/components/AddProductModal";
import ProductTable from "@/app/dashboard/components/ProductTable";

export default function AdminDashboard() {
    const { user } = useAuthStore();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products");
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <ProtectedRoute>
            <main className="md:p-4 md:p-10  ">

                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left"
                    >
                        Welcome back, {user?.name || "Admin"} 👋
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="px-5 py-2 text-sm md:text-base font-medium bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-all"
                        >
                            + Add Product
                        </Button>
                    </motion.div>
                </div>


                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    {loading ? (
                        <p className="text-gray-500 text-center py-10">Loading products...</p>
                    ) : products.length === 0 ? (
                        <div className="mt-20">
                            <EmptyProducts />
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-2xl shadow-md bg-white">
                            <ProductTable products={products} setProducts={setProducts} />
                        </div>
                    )}
                </motion.section>


                <AddProductModal
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    setProducts={setProducts}
                />
            </main>
        </ProtectedRoute>
    );
}
