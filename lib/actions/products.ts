'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/server";
import { db } from "@/src/prisma/db";
import { z } from "zod";

const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().nonnegative("Price must be non-negative"),
    quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
    sku: z.string().optional(),
    lowStockAt: z.coerce.number().int().min(0).optional(),
});

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

    revalidatePath("/dashboard/inventory");
}

export async function createProduct(formData: FormData) {
    const user = await getCurrentUser();
    if (!user) return;

    const parsed = ProductSchema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        quantity: formData.get("quantity"),
        sku: formData.get("sku") || undefined,
        lowStockAt: formData.get("lowStockAt") || undefined,
    });

    if (!parsed.success) {
        throw new Error("Validation failed");
    }

    const ProductModel = db.orm.public.Product as any;

    try {
        await ProductModel.create({
            ...parsed.data,
            userId: user.id,
        });
    } catch (error) {
        throw new Error("Failed to create product.");
    }

    redirect("/dashboard/inventory");
}