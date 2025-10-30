"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductFormProps {
    onSuccess: (product: any) => void;
}

export default function ProductForm({ onSuccess }: ProductFormProps) {
    const [form, setForm] = useState({
        name: "",
        price: "",
        discount: "",
        outOfStock: false,
        image: null as File | null,
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();


            Object.entries(form).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value as any);
                }
            });

            const res = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                new Error(`Failed to add product: ${errorText}`);
            }

            const data = await res.json();
            onSuccess?.(data);

        } catch (err) {
            console.error("Error adding product:", err);
            alert("Error adding product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label className={"mb-2"}>Name</Label>
                <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
            </div>

            <div>
                <Label className={"mb-2"}>Price ($)</Label>
                <Input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                />
            </div>

            <div>
                <Label className={"mb-2"}>Discount (%)</Label>
                <Input
                    type="number"
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                />
            </div>

            <div>
                <Label className={"mb-2"}>Image</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
                />
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Add Product"}
            </Button>
        </form>
    );
}
