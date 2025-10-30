"use server";

import prisma from "@/lib/PrismaClient";

export async function checkUserAllowed(email: string | undefined) {
    try {
        if(!email){
            return false
        }
        const allowed = await prisma.allowedUser.findFirst({
            where: { email },
        });
        return !!allowed;
    } catch (error) {
        console.error("Error checking allowed users:", error);
        return false;
    }
}
