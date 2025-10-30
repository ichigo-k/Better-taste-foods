"use client";

import { ProductType } from "@/types";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import EditProductModal from "./EditProductModal";
import { toast } from "sonner";

interface ProductTableProps {
    products: ProductType[];
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

export default function ProductTable({ products, setProducts }: ProductTableProps) {
    const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDelete = async (id: number) => {
        toast.custom((t) => (
            <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <p className="text-sm text-gray-800">Are you sure you want to delete this product?</p>
                <div className="flex gap-2 mt-2">
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={async () => {
                            toast.dismiss(t);
                            try {
                                const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
                                if (!res.ok) new Error("Failed to delete product");

                                setProducts((prev) => prev.filter((p) => p.id !== id));
                                toast.success("Product deleted successfully");
                            } catch (err) {
                                console.error(err);
                                toast.error("Error deleting product");
                            }
                        }}
                    >
                        Yes
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toast.dismiss(t)}>
                        No
                    </Button>
                </div>
            </div>
        ));
    };

    const handleEditClick = (product: ProductType) => {
        setEditingProduct(product);
        setIsEditModalOpen(true);
    };

    return (
        <>
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-300 shadow-sm">
                <table className="min-w-full table-auto border-collapse text-sm md:text-base">
                    <thead className="bg-gray-100">
                    <tr className="text-left text-gray-700 uppercase text-xs sm:text-sm">
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Price (Ghc)</th>
                        <th className="px-4 py-3">Discount (%)</th>
                        <th className="px-4 py-3">Stock</th>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((p) => (
                        <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                            <td className="px-4 py-3">{p.id}</td>
                            <td className="px-4 py-3 font-medium">{p.name}</td>
                            <td className="px-4 py-3">{p.price}</td>
                            <td className="px-4 py-3">{p.discount}%</td>
                            <td className="px-4 py-3">
                                {p.outOfStock ? (
                                    <span className="text-red-500 font-semibold">Out of Stock</span>
                                ) : (
                                    <span className="text-green-600 font-semibold">In Stock</span>
                                )}
                            </td>
                            <td className="px-4 py-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-12 h-12 object-cover rounded-md"
                                />
                            </td>
                            <td className="px-4 py-3 flex flex-wrap gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEditClick(p)}>
                                    Edit
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {editingProduct && (
                <EditProductModal
                    open={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                    product={editingProduct}
                    setProducts={setProducts}
                />
            )}
        </>
    );
}
