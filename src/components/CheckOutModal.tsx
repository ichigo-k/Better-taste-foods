"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

interface CheckoutModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCartChange: (open: boolean) => void;
    cart: any[];
    totalPrice: number;
    clearCart: () => void;
}

export default function CheckoutModal({
                                          open,
                                          onOpenChange,
                                          onCartChange,
                                          cart,
                                          totalPrice,
                                          clearCart,
                                      }: CheckoutModalProps) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePay = async () => {
        if (!form.name || !form.email || !form.phone || !form.address) {
            toast.error("Please fill in all fields");
            return;
        }

        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, cart, total: totalPrice }),
        });

        const order = await res.json();
        if (!res.ok) {
            toast.error("Failed to create order");
            return;
        }

        onOpenChange(false)
        onCartChange(false)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const PaystackPop = (await import("@paystack/inline-js")).default;
        const paystack = new PaystackPop();


        paystack.newTransaction({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
            email: form.email,
            amount: totalPrice * 100,
            currency: "GHS",
            metadata: {
                name: form.name,
                phone: form.phone,
                orderId: order.id,
            },
            onSuccess: async (response: any) => {
                try {
                    await fetch(`/api/orders/${order.id}/verify`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ reference: response.reference }),
                    });
                    toast.success("Payment successful");
                    clearCart();
                    onOpenChange(false);
                } catch {
                    toast.error("Failed to verify payment");
                }
            },
            onCancel: () => {
                toast.info("Payment cancelled");
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md z-[700]">
                <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                </DialogHeader>

                <div className="space-y-3 mt-3 ">
                    <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
                    <Input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} />
                    <Input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
                    <Input name="address" placeholder="Address" value={form.address} onChange={handleChange} />

                    <div className="mt-4">
                        <Button
                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                            onClick={handlePay}
                        >
                            Pay GH₵ {totalPrice.toFixed(2)}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
