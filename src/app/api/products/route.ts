import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

/**
 * GET /api/products
 * Fetch all products from the database
 */
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { id: "desc" },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error getting products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

/**
 * POST /api/products
 * Create a new product and upload image to Supabase
 */
export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const price = Number(formData.get("price"));
        const discount = Number(formData.get("discount"));
        const outOfStock = formData.get("outOfStock") === "true";
        const image = formData.get("image") as File;

        if (!name || !price || !image) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }


        const fileExt = image.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const bucketName = process.env.SUPABASE_BUCKET!;

        const { error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(fileName, image, {
                cacheControl: "3600",
                upsert: false,
                contentType: image.type,
            });

        if (uploadError) {
            console.error(uploadError);
            return NextResponse.json(
                { error: "Image upload failed" },
                { status: 500 }
            );
        }


        const {
            data: { publicUrl },
        } = supabase.storage.from(bucketName).getPublicUrl(fileName);


        const newProduct = await prisma.product.create({
            data: {
                name,
                price,
                discount,
                outOfStock,
                image: publicUrl,
            },
        });

        return NextResponse.json(
            { message: "Product created successfully", product: newProduct },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST /api/products error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
