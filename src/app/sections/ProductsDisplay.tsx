import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { ProductsDisplayProps } from "@/types";

export default function ProductsDisplay({ products }: ProductsDisplayProps) {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.map((item, index) => (
                <motion.div
                    key={item.id}
                    className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 relative group p-2 "
                    whileHover={{ y: -8 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >

                    <div className="relative w-full h-56 overflow-hidden">
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 rounded-lg"
                            priority
                        />
                        {item.outOfStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-semibold">
                                Out of Stock
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6 text-left">
                        <h3 className="text-xl uppercase font-semibold mb-2 text-gray-800 group-hover:text-red-500 transition-colors">
                            {item.name}
                        </h3>

                        <div className="flex flex-col  gap-2 mb-4">
                            <p className="text-red-500 font-bold text-3xl gap-2">
                                GH₵
                                {item.discount
                                    ? (item.price - item.price * item.discount / 100).toFixed(2)
                                    : item.price.toFixed(2)}
                            </p>
                            <div className={"flex  gap-2"}>
                                {item.discount > 0 && (
                                    <>
                                        <p className="line-through text-gray-400 text-sm">
                                            GH₵ {item.price.toFixed(2)}
                                        </p>
                                        <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                                        -{item.discount}%
                                    </span>
                                    </>
                                )}
                            </div>

                        </div>


                        <button
                            disabled={item.outOfStock}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                                ${
                                item.outOfStock
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white shadow-md hover:shadow-red-200"
                            }`}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            {item.outOfStock ? "Unavailable" : "Add to Cart"}
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
