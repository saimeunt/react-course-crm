import { faker } from "@faker-js/faker";
import { range } from "lodash";
import { format } from "date-fns";

export const ORDER_MIN_PRODUCTS = 1;
export const ORDER_MAX_PRODUCTS = 5;
export const CUSTOMERS_COUNT = 50;
export const PRODUCTS_COUNT = 20;
export const ORDER_PRODUCT_MIN_QUANTITY = 1;
export const ORDER_PRODUCT_MAX_QUANTITY = 10;
export const ORDERS_COUNT = 3;

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

export type OrderProduct = {
  productId: number;
  quantity: number;
  createdAt: Date;
};

export type Order = {
  id: number;
  customerId: number;
  status: OrderStatus;
  createdAt: Date;
  products: OrderProduct[];
};

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profileUrl: string;
  createdAt: Date;
};

let autoIncrementCounter = 0;

const autoIncrement = () => ++autoIncrementCounter;

export const createRandomOrder = (): Order => {
  const productsCount = faker.number.int({
    min: ORDER_MIN_PRODUCTS,
    max: ORDER_MAX_PRODUCTS,
  });
  const createdAt = faker.date.recent({ days: 90 });
  return {
    id: autoIncrement(),
    status: faker.helpers.arrayElement(orderStatusKeys),
    customerId: faker.number.int({ min: 1, max: CUSTOMERS_COUNT }),
    createdAt,
    products: faker.helpers
      .arrayElements(range(1, PRODUCTS_COUNT + 1), productsCount)
      .map((productId) => ({
        productId,
        quantity: faker.number.int({
          min: ORDER_PRODUCT_MIN_QUANTITY,
          max: ORDER_PRODUCT_MAX_QUANTITY,
        }),
        createdAt,
      })),
  };
};

export const createRandomCustomer = (recent = false): Customer => {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName(sex);
  return {
    id: autoIncrement(),
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    profileUrl: faker.image.personPortrait({ sex, size: 64 }),
    createdAt: recent
      ? faker.date.recent({ days: 90 })
      : faker.date.past({ refDate: "2023-01-01" }),
  };
};

export const logOrderProduct = (orderProduct: OrderProduct) => {
  console.log(`\tProduct #${orderProduct.productId}`);
  console.log(`\tQuantity: ${orderProduct.quantity}`);
};

export const logOrder = (order: Order) => {
  console.log(`Order #${order.id}`);
  console.log(`Status: ${orderStatuses[order.status]}`);
  console.log("Products:");
  order.products.forEach(logOrderProduct);
  console.log(`Created at: ${format(order.createdAt, "yyyy-MM-dd")}\n`);
};

export const logCustomer = (customer: Customer) => {
  console.log(`Customer #${customer.id}`);
  console.log(`Name: ${customer.firstName} ${customer.lastName}`);
  console.log(`Email: ${customer.email}`);
  console.log(`Profile URL: ${customer.profileUrl}`);
  console.log(`Created at: ${format(customer.createdAt, "yyyy-MM-dd")}\n`);
};

/* const orders = faker.helpers.multiple(createRandomOrder, {
  count: ORDERS_COUNT,
});

const customers = [
  ...faker.helpers.multiple(() => createRandomCustomer(), {
    count: CUSTOMERS_COUNT / 2,
  }),
  ...faker.helpers.multiple(() => createRandomCustomer(true), {
    count: CUSTOMERS_COUNT / 2,
  }),
];

orders.forEach(logOrder);
customers.forEach(logCustomer); */
