import { z } from "zod";

const customerSchema = z.object({
  id: z.number().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  profileUrl: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  fullName: z.string(),
  totalSpent: z.number().min(0),
});

export type Customer = z.infer<typeof customerSchema>;

export const customerSubSchema = customerSchema.pick({
  id: true,
  firstName: true,
  lastName: true,
  fullName: true,
  profileUrl: true,
  deletedAt: true,
});

export const upsertCustomerFormSchema = customerSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
});

export const productSchema = z.object({
  id: z.number().min(1),
  name: z.string().min(1),
  description: z.string(),
  price: z.number().min(1).max(1000).multipleOf(0.01),
  imageUrl: z.string().url(),
});

export type Product = z.infer<typeof productSchema>;

export const productSubSchema = productSchema.pick({
  id: true,
  name: true,
  price: true,
  imageUrl: true,
});

export const upsertProductFormSchema = productSchema.pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
});

export const orderProductSchema = z.object({
  productId: z.number().min(1),
  product: productSubSchema,
  quantity: z.number().min(1).max(10),
});

export const orderStatusKeys = [
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;

export type OrderStatus = (typeof orderStatusKeys)[number];

export const orderStatuses: Record<OrderStatus, string> = {
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
} as const;

type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | null
  | undefined;

export const orderStatusesBadgeVariants: Record<OrderStatus, BadgeVariant> = {
  IN_PROGRESS: "outline",
  COMPLETED: "default",
  CANCELLED: "destructive",
} as const;

export const ORDER_MIN_PRODUCTS = 1;
export const ORDER_MAX_PRODUCTS = 5;

export const orderSchema = z.object({
  id: z.number().min(1),
  customerId: z.number().min(1),
  customer: customerSubSchema,
  status: z.enum(orderStatusKeys),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  products: z
    .array(orderProductSchema)
    .min(ORDER_MIN_PRODUCTS)
    .max(ORDER_MAX_PRODUCTS),
  totalPrice: z.number().min(0),
});

export type Order = z.infer<typeof orderSchema>;

export const upsertOrderFormSchema = orderSchema
  .pick({
    customerId: true,
    status: true,
  })
  .extend({
    products: z
      .array(
        orderProductSchema.pick({
          productId: true,
          quantity: true,
        }),
      )
      .min(1)
      .max(5),
  });
