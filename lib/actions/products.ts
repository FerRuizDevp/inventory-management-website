'use server';

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/server";
import { db } from "@/src/prisma/db";

export async function deleteProduct(formData: FormData) {
    const user = await getCurrentUser();

    if (!user) {
        return;
    }

    const id = String(formData.get("id") || "");

    const ProductModel = db.orm.public.Product as any;

    await ProductModel
        .where({ id, userId: user.id })
        .deleteAll();

    revalidatePath("/inventory");
}