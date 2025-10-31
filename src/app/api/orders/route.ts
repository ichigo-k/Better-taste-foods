import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, address, cart, total } = body;

        if (!name || !email || !phone || !address || !cart?.length || !total) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const order = await prisma.order.create({
            data: {
                name,
                email,
                phone,
                address,
                total,
                items: cart,
                status: "pending",
            },
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
