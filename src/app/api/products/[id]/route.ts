import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";
import { supabase } from "@/lib/supabaseClient";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const productId = parseInt(id);
        if (isNaN(productId)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const formData = await req.formData();

        const name = formData.get("name") as string;
        const price = parseFloat(formData.get("price") as string);
        const discount = parseFloat(formData.get("discount") as string);
        const outOfStock = formData.get("outOfStock") === "true";

        const updatedData: any = { name, price, discount, outOfStock };

        const imageFile = formData.get("image") as File | null;

        if (imageFile && imageFile.size > 0) {
            const bucket = process.env.SUPABASE_BUCKET!;
            const fileExt = imageFile.name.split(".").pop();
            const fileName = `product-${Date.now()}.${fileExt}`;


            if (product.image) {
                const oldFilePath = product.image.split(`/storage/v1/object/public/${bucket}/`)[1];
                if (oldFilePath) {
                    await supabase.storage.from(bucket).remove([oldFilePath]);
                }
            }


            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(fileName, imageFile, { cacheControl: "3600", upsert: true });

            if (uploadError) {
                console.error("Image upload error:", uploadError.message);
                return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
            }

            const publicUrl = supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl;
            updatedData.image = publicUrl;
        }

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: updatedData,
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Update product error:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const productId = parseInt(id);

        if (isNaN(productId)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const bucket = process.env.SUPABASE_BUCKET!;
        if (product.image) {
            const filePath = product.image.split(`/storage/v1/object/public/${bucket}/`)[1];
            if (filePath) {
                const { error: deleteError } = await supabase.storage.from(bucket).remove([filePath]);
                if (deleteError) {
                    console.error("Error deleting image:", deleteError.message);
                }
            }
        }

        await prisma.product.delete({ where: { id: productId } });

        return NextResponse.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete product error:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
