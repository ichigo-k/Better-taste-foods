"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OrderModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: any;
}

export default function OrderModal({ open, onOpenChange, order }: OrderModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md w-full">
                <DialogHeader>
                    <DialogTitle>Order #{order.id}</DialogTitle>
                    <DialogDescription>
                        <p className="mt-2"><strong>Name:</strong> {order.name}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Address:</strong> {order.address}</p>
                        <p><strong>Total:</strong> GH₵ {order.total.toFixed(2)}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Reference:</strong> {order.reference || "-"}</p>
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Items</h4>
                    <ul className="space-y-2 max-h-64 overflow-y-auto">
                        {order.items.map((item: any, idx: number) => (
                            <li key={idx} className="flex justify-between border-b py-1">
                                <span>{item.name}</span>
                                <span>Qty: {item.quantity}</span>
                                <span>GH₵ {(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
