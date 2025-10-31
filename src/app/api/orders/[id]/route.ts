import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const orderId = parseInt(id);

        if (isNaN(orderId)) {
            return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
        }

        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        await prisma.order.delete({ where: { id: orderId } });

        return NextResponse.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error("Delete order error:", error);
        return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
    }
}
