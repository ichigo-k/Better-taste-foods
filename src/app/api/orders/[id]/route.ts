import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

// DELETE /api/orders/[id]
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
        }

        await prisma.order.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting order:", error);
        return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
    }
}
