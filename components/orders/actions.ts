"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertOrderFormSchema } from "@/lib/types";

type UpsertOrderInput = { id: number } & z.infer<typeof upsertOrderFormSchema>;

export const upsertOrder = async ({
  id,
  customerId,
  status,
  products,
}: UpsertOrderInput) => {
  try {
    const validatedFields = upsertOrderFormSchema.safeParse({
      customerId,
      status,
      products,
    });
    if (!validatedFields.success) {
      return {
        message: "Oops, something went wrong!",
        description: "Invalid fields submitted.",
      };
    }
    const orderProducts =
      id !== 0
        ? await prisma.orderProduct.findMany({
            where: { orderId: id },
          })
        : [];
    const { id: orderId } = await prisma.order.upsert({
      where: { id },
      create: {
        ...validatedFields.data,
        products: { createMany: { data: products } },
      },
      update: {
        ...validatedFields.data,
        products: {
          createMany: {
            data: products.filter(
              ({ productId }) =>
                !orderProducts
                  .map((orderProduct) => orderProduct.productId)
                  .includes(productId),
            ),
          },
          updateMany: products.map(({ productId, quantity }) => ({
            where: { orderId: id, productId },
            data: { quantity },
          })),
          deleteMany: orderProducts
            .map((orderProduct) => orderProduct.productId)
            .filter(
              (productId) =>
                !products
                  .map((product) => product.productId)
                  .includes(productId),
            )
            .map((productId) => ({
              orderId: id,
              productId,
            })),
        },
      },
    });
    revalidatePath("/");
    revalidatePath("/orders");
    return {
      message: `Order successfuly ${id === 0 ? "created" : "updated"}.`,
      description: `Order #${orderId} ${id === 0 ? "created" : "updated"}.`,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Oops, something went wrong!",
      description: `Failed to ${id === 0 ? "create" : "update"} order.`,
    };
  }
};

export const deleteOrders = async (ids: number[]) => {
  try {
    const { count } = await prisma.order.updateMany({
      where: { id: { in: ids } },
      data: { deletedAt: new Date() },
    });
    revalidatePath("/");
    revalidatePath("/orders");
    return {
      message: `Order${count === 1 ? "" : "s"} successfuly deleted.`,
      description: `${count} order${count === 1 ? "" : "s"} deleted.`,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Oops, something went wrong!",
      description: `Failed to delete order${ids.length === 1 ? "" : "s"}.`,
    };
  }
};

export const undoDeleteOrders = async (ids: number[]) => {
  try {
    await prisma.order.updateMany({
      where: { id: { in: ids } },
      data: { deletedAt: null },
    });
    revalidatePath("/");
    revalidatePath("/orders");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
