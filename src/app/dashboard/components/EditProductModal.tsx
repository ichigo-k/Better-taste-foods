"use client";

import React, { useState, useEffect } from "react";
import { ProductType } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {toast} from "sonner";

interface EditProductModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: ProductType;
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

export default function EditProductModal({ open, onOpenChange, product, setProducts }: EditProductModalProps) {
    const [form, setForm] = useState({
        name: "",
        price: 0,
        discount: 0,
        outOfStock: false,
        image: null as File | null,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                price: product.price,
                discount: product.discount,
                outOfStock: product.outOfStock,
                image: null,
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, files } = e.target as HTMLInputElement;
        if (type === "file" && files) {
            setForm((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: type === "number" ? parseFloat(value) : value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("price", form.price.toString());
            formData.append("discount", form.discount.toString());
            formData.append("outOfStock", form.outOfStock ? "true" : "false");
            if (form.image) formData.append("image", form.image);

            const res = await fetch(`/api/products/${product.id}`, {
                method: "PUT",
                body: formData,
            });

            if (!res.ok) new Error("Failed to update product");
            const updated = await res.json();

            setProducts((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
            );
            onOpenChange(false);
        } catch (err) {
            console.error(err);
            toast("Error updating product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>Update product details below</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2" encType="multipart/form-data">
                    <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                    />
                    <Input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price"
                    />
                    <Input
                        name="discount"
                        type="number"
                        value={form.discount}
                        onChange={handleChange}
                        placeholder="Discount (%)"
                    />
                    <select
                        name="outOfStock"
                        value={form.outOfStock ? "true" : "false"}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, outOfStock: e.target.value === "true" }))
                        }
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="false">In Stock</option>
                        <option value="true">Out of Stock</option>
                    </select>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="border p-2 rounded-md w-full"
                    />

                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
