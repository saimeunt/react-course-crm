import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const fetchCustomers = async () => {
  const customers = await prisma.customer.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
  return customers.map((customer) => ({
    ...customer,
    fullName: `${customer.firstName} ${customer.lastName}`,
    totalSpent: 0,
  }));
};

export const fetchCustomersWithTotalSpent = async () => {
  const customers = await prisma.customer.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: {
      orders: {
        include: {
          products: {
            select: {
              product: {
                select: { price: true },
              },
              quantity: true,
            },
          },
        },
      },
    },
  });
  return customers.map((customer) => ({
    ...customer,
    fullName: `${customer.firstName} ${customer.lastName}`,
    totalSpent: customer.orders.reduce(
      (previousValue, order) =>
        previousValue +
        order.products.reduce(
          (previousValue, { product, quantity }) =>
            previousValue + product.price * quantity,
          0,
        ),
      0,
    ),
  }));
};

export const fetchCustomer = cache(async (id: number) => {
  const customer = await prisma.customer.findUnique({
    where: { id, deletedAt: null },
  });
  if (!customer) {
    return null;
  }
  return {
    ...customer,
    fullName: `${customer.firstName} ${customer.lastName}`,
    totalSpent: 0,
  };
});

export const fetchOrders = async () => {
  const orders = await prisma.order.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: {
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profileUrl: true,
          deletedAt: true,
        },
      },
      products: {
        select: {
          product: {
            select: { id: true, name: true, price: true, imageUrl: true },
          },
          productId: true,
          quantity: true,
        },
      },
    },
  });
  return orders.map((order) => ({
    ...order,
    customer: {
      ...order.customer,
      fullName: `${order.customer.firstName} ${order.customer.lastName}`,
    },
    totalPrice: order.products.reduce(
      (previousValue, { product, quantity }) =>
        previousValue + product.price * quantity,
      0,
    ),
  }));
};

export const fetchOrder = async (id: number) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profileUrl: true,
          deletedAt: true,
        },
      },
      products: {
        select: {
          product: {
            select: { id: true, name: true, price: true, imageUrl: true },
          },
          productId: true,
          quantity: true,
        },
      },
    },
  });
  if (!order) {
    return null;
  }
  return {
    ...order,
    customer: {
      ...order.customer,
      fullName: `${order.customer.firstName} ${order.customer.lastName}`,
    },
    totalPrice: order.products.reduce(
      (previousValue, { product, quantity }) =>
        previousValue + product.price * quantity,
      0,
    ),
  };
};

export const fetchProducts = async () =>
  prisma.product.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
    },
  });
