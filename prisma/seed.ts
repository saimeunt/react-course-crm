import { range } from "lodash";
import { faker } from "@faker-js/faker";
import { prisma } from "@/lib/prisma";
import {
  productSchema,
  ORDER_MIN_PRODUCTS,
  ORDER_MAX_PRODUCTS,
  orderProductSchema,
  orderStatusKeys,
} from "@/lib/types";

const PRODUCTS_COUNT = 20;
const PAST_CUSTOMERS_COUNT = 50;
const RECENT_CUSTOMERS_COUNT = 50;
const ORDERS_COUNT = 500;

const createRandomProduct = () => ({
  name: faker.commerce.product(),
  description: faker.commerce.productDescription(),
  price: Number(
    faker.commerce.price({
      min: productSchema.shape.price.minValue ?? undefined,
      max: productSchema.shape.price.maxValue ?? undefined,
    }),
  ),
  imageUrl: faker.image.urlPicsumPhotos({
    width: 64,
    height: 64,
    blur: 0,
    grayscale: false,
  }),
  createdAt: faker.date.past({ refDate: "2021-01-01" }),
});

const createRandomOrder = () => {
  const productsCount = faker.number.int({
    min: ORDER_MIN_PRODUCTS,
    max: ORDER_MAX_PRODUCTS,
  });
  const createdAt = faker.date.recent({ days: 90 });
  return {
    status: faker.helpers.arrayElement(orderStatusKeys),
    customerId: faker.number.int({ min: 1, max: PAST_CUSTOMERS_COUNT }),
    createdAt,
    products: {
      create: faker.helpers
        .arrayElements(range(1, PRODUCTS_COUNT + 1), productsCount)
        .map((productId) => ({
          productId,
          quantity: faker.number.int({
            min: orderProductSchema.shape.quantity.minValue ?? undefined,
            max: orderProductSchema.shape.quantity.maxValue ?? undefined,
          }),
          createdAt,
        })),
    },
  };
};

const createRandomCustomer = (recent = false) => {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName(sex);
  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    profileUrl: faker.image.personPortrait({ sex, size: 64 }),
    createdAt: recent
      ? faker.date.recent({ days: 90 })
      : faker.date.past({ refDate: "2023-01-01" }),
  };
};

const main = async () => {
  await prisma.$transaction([
    prisma.product.createMany({
      data: faker.helpers.multiple(createRandomProduct, {
        count: PRODUCTS_COUNT,
      }),
    }),
    prisma.customer.createMany({
      data: [
        ...faker.helpers.multiple(() => createRandomCustomer(), {
          count: PAST_CUSTOMERS_COUNT,
        }),
        ...faker.helpers.multiple(() => createRandomCustomer(true), {
          count: RECENT_CUSTOMERS_COUNT,
        }),
      ],
    }),
    ...faker.helpers
      .multiple(createRandomOrder, {
        count: ORDERS_COUNT,
      })
      .map((order) => prisma.order.create({ data: order })),
  ]);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
