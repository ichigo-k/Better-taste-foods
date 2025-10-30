import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { reference } = await req.json();

    if (!reference) {
        return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }

    try {

        const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
        });

        const data = await verifyRes.json();

        if (!data.status || data.data.status !== "success") {
            return NextResponse.json({ error: "Payment not verified" }, { status: 400 });
        }

        const order = await prisma.order.update({
            where: { id: Number(params.id) },
            data: {
                status: "paid",
                reference: data.data.reference,
            },
        });

        return NextResponse.json({ message: "Payment verified", order });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
    }
}
