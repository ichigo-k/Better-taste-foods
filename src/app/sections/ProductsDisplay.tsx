import {motion} from "framer-motion";
import Image from "next/image";
import {ShoppingCart} from "lucide-react";
import {ProductsDisplayProps} from "@/types";

export default function ProductsDisplay( {products}: ProductsDisplayProps){
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((item, index) => (
                <motion.div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
                    whileHover={{ y: -6 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    {/* Image */}
                    <div className="relative w-full h-56">
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        {item.outOfStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-semibold">
                                Out of Stock
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="p-6 text-left">
                        <h3 className="text-lg font-semibold mb-1">{item.name}</h3>

                        <div className="flex items-center gap-2">
                            <p className="text-[#0099ff] font-bold text-lg">
                                ${item.discount ? (item.price - item.price * item.discount / 100).toFixed(2) : item.price.toFixed(2)}
                            </p>
                            {item.discount > 0 && (
                                <>
                                    <p className="line-through text-gray-400 text-sm">${item.price.toFixed(2)}</p>
                                    <span className="bg-[#0099ff]/10 text-[#0099ff] text-xs font-medium px-2 py-1 rounded-full">
                        -{item.discount}%
                      </span>
                                </>
                            )}
                        </div>

                        {/* Button */}
                        <button
                            disabled={item.outOfStock}
                            className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${
                                item.outOfStock
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-[#0099ff] hover:bg-[#007acc] text-white"
                            }`}
                        >
                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}