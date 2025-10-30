"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCartStore } from "@/context/CartStore";
import { useState } from "react";
import CheckoutModal from "@/components/CheckOutModal";


export default function CartDrawer() {
    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const clearCart = useCartStore((state) => state.clearCart);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <Drawer direction="right">
                <DrawerTrigger asChild>
                    <button className="relative p-2">
                        <ShoppingCart size={22} className="text-gray-700 hover:text-red-500 transition-colors" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
                        )}
                    </button>
                </DrawerTrigger>

                <DrawerContent className="fixed right-0 top-0 h-screen w-[90vw] sm:w-[400px] bg-white shadow-xl border-l border-gray-200 flex flex-col z-[100] animate-in slide-in-from-right duration-300">
                    <DrawerHeader className="px-6 py-4 border-b">
                        <DrawerTitle className="text-xl font-semibold text-gray-800">Your Cart</DrawerTitle>
                    </DrawerHeader>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-center mt-10">Your cart is empty 🛍️</p>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover rounded-md" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-md font-semibold text-gray-800">{item.name}</h4>
                                        <p className="text-sm text-gray-500">GH₵ {(item.price * (1 - item.discount / 100)).toFixed(2)}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => addToCart(item, -1)}
                                                className="bg-gray-200 hover:bg-gray-300 w-6 h-6 flex items-center justify-center rounded-full"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => addToCart(item, 1)}
                                                className="bg-gray-200 hover:bg-gray-300 w-6 h-6 flex items-center justify-center rounded-full"
                                            >
                                                <Plus size={14} />
                                            </button>
                                            <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 hover:text-red-600">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-6 border-t space-y-4">
                            <div className="flex justify-between text-gray-700 font-semibold">
                                <span>Total:</span>
                                <span>GH₵ {totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button className="w-full bg-red-500 hover:bg-red-600 text-white" onClick={() => setCheckoutOpen(true)}>
                                    Checkout
                                </Button>
                                <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800" onClick={clearCart}>
                                    Clear Cart
                                </Button>
                            </div>
                        </div>
                    )}
                </DrawerContent>
            </Drawer>


            <CheckoutModal
                open={checkoutOpen}
                onOpenChange={setCheckoutOpen}
                cart={cart}
                totalPrice={totalPrice}
                clearCart={clearCart}
            />
        </>
    );
}
