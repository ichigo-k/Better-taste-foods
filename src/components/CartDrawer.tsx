"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartDrawer() {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <button className="relative p-2">
                    <ShoppingCart
                        size={22}
                        className="text-gray-700 hover:text-red-500 transition-colors"
                    />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
                </button>
            </DrawerTrigger>
            <DrawerContent className="fixed right-0 top-0 h-screen w-[90vw] sm:w-[400px] bg-white shadow-xl rounded-none border-l border-gray-200 flex flex-col z-[1000] animate-in slide-in-from-right duration-300">
                <DrawerHeader className="px-6 py-4 border-b">
                    <DrawerTitle className="text-xl font-semibold text-gray-800">
                        Your Cart
                    </DrawerTitle>
                </DrawerHeader>
                <div className="flex-1 overflow-y-auto p-6 text-gray-600 space-y-4">
                    <p>Your cart is currently empty 🛍️</p>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                        Continue Shopping
                    </Button>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
