"use server";
import { prisma } from "@/lib/prisma";
import { upsertProductFormSchema } from "@/lib/types";

export const createProduct = async (formData: FormData) => {
  try {
    const image = formData.get("image") as File;
    const base64Data = Buffer.from(await image.arrayBuffer()).toString(
      "base64",
    );
    const validatedFields = upsertProductFormSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      imageUrl: `data:image/jpeg;base64,${base64Data}`,
    });
    if (validatedFields.success) {
      await prisma.product.create({
        data: validatedFields.data,
      });
    } else {
      console.error(validatedFields.error);
    }
  } catch (error) {
    console.error(error);
  }
};
