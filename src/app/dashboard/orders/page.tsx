"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import OrderModal from "./OrderModal";
import { formatDistanceToNow } from "date-fns";

interface Order {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    status: string;
    reference?: string;
    createdAt: string;
    updatedAt: string;
    items: any[];
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/orders");
            if (!res.ok) new Error("Failed to fetch orders");
            const data: Order[] = await res.json();
            setOrders(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this order?")) return;
        try {
            const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
            if (!res.ok) new Error("Failed to delete order");
            setOrders((prev) => prev.filter((o) => o.id !== id));
            toast.success("Order deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete order");
        }
    };

    const openModal = (order: Order) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const groupedOrders = orders.reduce<Record<string, Order[]>>((acc, order) => {
        if (!acc[order.status]) acc[order.status] = [];
        acc[order.status].push(order);
        return acc;
    }, {});

    if (loading) return <p>Loading orders...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>

            {Object.keys(groupedOrders).length === 0 && <p>No orders found.</p>}

            {Object.entries(groupedOrders).map(([status, orders]) => (
                <div key={status} className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">{status} Orders</h2>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">ID</th>
                                <th className="px-4 py-2 border">Customer</th>
                                <th className="px-4 py-2 border">Total</th>
                                <th className="px-4 py-2 border">Reference</th>
                                <th className="px-4 py-2 border">Date</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{order.id}</td>
                                    <td className="px-4 py-2 border">{order.name}</td>
                                    <td className="px-4 py-2 border">GH₵ {order.total.toFixed(2)}</td>
                                    <td className="px-4 py-2 border">{order.reference || "-"}</td>
                                    <td className="px-4 py-2 border">
                                        {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                                    </td>
                                    <td className="px-4 py-2 border flex gap-2">
                                        <Button size="sm" variant="outline" onClick={() => openModal(order)}>
                                            <Eye size={16} />
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(order.id)}>
                                            <Trash2 size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

            {selectedOrder && (
                <OrderModal
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    order={selectedOrder}
                />
            )}
        </div>
    );
}
