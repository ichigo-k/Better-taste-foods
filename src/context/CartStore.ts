import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "@/types";

interface CartItem extends ProductType {
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (product: ProductType, quantity?: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product, quantity = 1) => {
                set((state) => {
                    const existing = state.cart.find((item) => item.id === product.id);
                    if (existing) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    } else {
                        return { cart: [...state.cart, { ...product, quantity }] };
                    }
                });
            },

            removeFromCart: (id) => {
                set((state) => ({ cart: state.cart.filter((item) => item.id !== id) }));
            },

            updateQuantity: (id, quantity) => {
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                }));
            },

            clearCart: () => set({ cart: [] }),

            getTotalItems: () =>
                get().cart.reduce((total, item) => total + item.quantity, 0),

            getTotalPrice: () =>
                get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
        }),
        {
            name: "cart-storage",
        }
    )
);
