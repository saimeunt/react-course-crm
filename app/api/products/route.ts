import { NextRequest, NextResponse } from "next/server";
import { upsertProductFormSchema } from "@/lib/types";
import { prisma } from "@/lib/prisma";

export const PUT = async (request: NextRequest) => {
  const { name, description, price, imageUrl } = await request.json();
  const validatedFields = upsertProductFormSchema.safeParse({
    name,
    description,
    price,
    imageUrl,
  });
  if (!validatedFields.success) {
    return NextResponse.json(
      {
        ok: false,
        error: validatedFields.error.errors
          .map(({ path, message }) => `${path.join("/")}: ${message}`)
          .join("\n"),
      },
      { status: 500 },
    );
  }
  const product = await prisma.product.create({
    data: validatedFields.data,
  });
  return NextResponse.json({
    ok: true,
    data: product,
  });
};
