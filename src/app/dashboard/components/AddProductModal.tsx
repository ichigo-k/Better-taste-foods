"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import React from "react";

interface AddProductModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    setProducts: React.Dispatch<any>;
}

export default function AddProductModal({ open, onOpenChange, setProducts }: AddProductModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>

                <ProductForm
                    onSuccess={(newProduct) => {
                        setProducts((prev: any) => [...prev, newProduct]);
                        onOpenChange(false);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
