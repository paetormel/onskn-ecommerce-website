import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../src/lib/prisma.ts";

async function main() {
  const adminPassword = await bcrypt.hash("Admin123!@#", 12);
  const customerPassword = await bcrypt.hash("Customer123!@#", 12);

  await prisma.$transaction(async (tx) => {
    await tx.orderItem.deleteMany();
    await tx.order.deleteMany();
    await tx.product.deleteMany();
    await tx.category.deleteMany();
    await tx.user.deleteMany();

    const categories = await Promise.all([
      tx.category.create({
        data: { name: "Electronics" },
      }),
      tx.category.create({
        data: { name: "Fashion" },
      }),
      tx.category.create({
        data: { name: "Home & Living" },
      }),
    ]);

    const users = await Promise.all([
      tx.user.create({
        data: {
          email: "admin@shopify.local",
          password: adminPassword,
          role: "ADMIN",
        },
      }),
      tx.user.create({
        data: {
          email: "customer1@shopify.local",
          password: customerPassword,
          role: "CUSTOMER",
        },
      }),
      tx.user.create({
        data: {
          email: "customer2@shopify.local",
          password: customerPassword,
          role: "CUSTOMER",
        },
      }),
    ]);

    const categoryByName = new Map(categories.map((category) => [category.name, category]));
    const userByEmail = new Map(users.map((user) => [user.email, user]));

    const products = await Promise.all([
      tx.product.create({
        data: {
          name: "Aurora Noise-Canceling Headphones",
          description: "Wireless headphones with active noise cancelation and 30-hour battery life.",
          price: "199.99",
          stock: 42,
          categoryId: categoryByName.get("Electronics")!.id,
        },
      }),
      tx.product.create({
        data: {
          name: "Nova 14 Laptop",
          description: "Slim 14-inch productivity laptop for work and study.",
          price: "1099.00",
          stock: 15,
          categoryId: categoryByName.get("Electronics")!.id,
        },
      }),
      tx.product.create({
        data: {
          name: "Everyday Cotton Tee",
          description: "Soft unisex cotton shirt with a relaxed fit.",
          price: "24.50",
          stock: 120,
          categoryId: categoryByName.get("Fashion")!.id,
        },
      }),
      tx.product.create({
        data: {
          name: "Classic Denim Jacket",
          description: "Layer-friendly denim jacket with a modern cut.",
          price: "79.00",
          stock: 65,
          categoryId: categoryByName.get("Fashion")!.id,
        },
      }),
      tx.product.create({
        data: {
          name: "Cozy Velvet Sofa",
          description: "Three-seater sofa with durable upholstery and deep cushions.",
          price: "899.99",
          stock: 8,
          categoryId: categoryByName.get("Home & Living")!.id,
        },
      }),
    ]);

    const productByName = new Map(products.map((product) => [product.name, product]));

    const orders = await Promise.all([
      tx.order.create({
        data: {
          userId: userByEmail.get("customer1@shopify.local")!.id,
          status: "PAID",
          total: "1323.49",
        },
      }),
      tx.order.create({
        data: {
          userId: userByEmail.get("customer2@shopify.local")!.id,
          status: "PROCESSING",
          total: "1224.99",
        },
      }),
    ]);

    await tx.orderItem.createMany({
      data: [
        {
          orderId: orders[0].id,
          productId: productByName.get("Nova 14 Laptop")!.id,
          quantity: 1,
          price: "1099.00",
        },
        {
          orderId: orders[0].id,
          productId: productByName.get("Aurora Noise-Canceling Headphones")!.id,
          quantity: 1,
          price: "199.99",
        },
        {
          orderId: orders[0].id,
          productId: productByName.get("Everyday Cotton Tee")!.id,
          quantity: 1,
          price: "24.50",
        },
        {
          orderId: orders[1].id,
          productId: productByName.get("Cozy Velvet Sofa")!.id,
          quantity: 1,
          price: "899.99",
        },
        {
          orderId: orders[1].id,
          productId: productByName.get("Classic Denim Jacket")!.id,
          quantity: 4,
          price: "79.00",
        },
      ],
    });
  });

  console.log("Seed completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
