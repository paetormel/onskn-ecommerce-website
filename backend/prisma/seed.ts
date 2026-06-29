import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../src/lib/prisma.ts";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function main() {
  const adminPassword = await bcrypt.hash("Admin123!@#", 12);
  const customerPassword = await bcrypt.hash("Customer123!@#", 12);

  await prisma.$transaction(async (tx) => {
    await tx.orderItem.deleteMany();
    await tx.order.deleteMany();
    await tx.productImage.deleteMany();
    await tx.productVariant.deleteMany();
    await tx.productSection.deleteMany();
    await tx.productSkinType.deleteMany();
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
          fullName: "Admin User",
          email: "admin@shopify.local",
          passwordHash: adminPassword,
          role: "admin",
        },
      }),
      tx.user.create({
        data: {
          fullName: "Customer One",
          email: "customer1@shopify.local",
          passwordHash: customerPassword,
          role: "customer",
        },
      }),
      tx.user.create({
        data: {
          fullName: "Customer Two",
          email: "customer2@shopify.local",
          passwordHash: customerPassword,
          role: "customer",
        },
      }),
    ]);

    const categoryByName = new Map(
      categories.map((category) => [category.name, category])
    );
    const userByEmail = new Map(users.map((user) => [user.email, user]));

    const products = await Promise.all([
      tx.product.create({
        data: {
          name: "Aurora Noise-Canceling Headphones",
          slug: slugify("Aurora Noise-Canceling Headphones"),
          baseDescription:
            "Wireless headphones with active noise cancelation, soft ear cushions, and a 30-hour battery life.",
          texture: "Matte soft-touch finish",
          isActive: true,
          categoryId: categoryByName.get("Electronics")!.id,
          images: {
            create: [
              {
                url: "https://images.unsplash.com/photo-1518441902117-f0a885b5cbe9?auto=format&fit=crop&w=1200&q=80",
                type: "PRIMARY",
              },
            ],
          },
          variants: {
            create: [
              {
                sizeLabel: "Standard",
                sku: "AURORA-HDPH-STD",
                price: "199.99",
                compareAtPrice: "249.99",
                stock: 42,
              },
            ],
          },
          sections: {
            create: [
              {
                type: "DESCRIPTION",
                title: "Description",
                content:
                  "Immersive sound, adaptive noise cancelation, and a lightweight design built for all-day comfort.",
                order: 0,
              },
            ],
          },
        },
        include: {
          variants: true,
          images: true,
        },
      }),
      tx.product.create({
        data: {
          name: "Nova 14 Laptop",
          slug: slugify("Nova 14 Laptop"),
          baseDescription:
            "Slim 14-inch productivity laptop with fast storage, all-day battery life, and a bright display.",
          texture: "Aluminum chassis",
          isActive: true,
          categoryId: categoryByName.get("Electronics")!.id,
          images: {
            create: [
              {
                url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
                type: "PRIMARY",
              },
            ],
          },
          variants: {
            create: [
              {
                sizeLabel: "14-inch / 512GB",
                sku: "NOVA14-LAP-512",
                price: "1099.00",
                compareAtPrice: "1299.00",
                stock: 15,
              },
            ],
          },
          sections: {
            create: [
              {
                type: "DESCRIPTION",
                title: "Description",
                content:
                  "Built for work and study, with a lightweight body, fast SSD storage, and a vivid display.",
                order: 0,
              },
            ],
          },
        },
        include: {
          variants: true,
          images: true,
        },
      }),
      tx.product.create({
        data: {
          name: "Everyday Cotton Tee",
          slug: slugify("Everyday Cotton Tee"),
          baseDescription:
            "Soft unisex cotton shirt with a relaxed fit and breathable feel.",
          texture: "100% cotton jersey",
          isActive: true,
          categoryId: categoryByName.get("Fashion")!.id,
          images: {
            create: [
              {
                url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
                type: "PRIMARY",
              },
            ],
          },
          variants: {
            create: [
              {
                sizeLabel: "M",
                sku: "TEE-COTTON-M",
                price: "24.50",
                compareAtPrice: "29.00",
                stock: 120,
              },
            ],
          },
          sections: {
            create: [
              {
                type: "DESCRIPTION",
                title: "Description",
                content:
                  "An easy everyday staple with a clean fit and durable stitching.",
                order: 0,
              },
            ],
          },
        },
        include: {
          variants: true,
          images: true,
        },
      }),
      tx.product.create({
        data: {
          name: "Classic Denim Jacket",
          slug: slugify("Classic Denim Jacket"),
          baseDescription:
            "Layer-friendly denim jacket with a modern cut and durable hardware.",
          texture: "Washed denim",
          isActive: true,
          categoryId: categoryByName.get("Fashion")!.id,
          images: {
            create: [
              {
                url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1200&q=80",
                type: "PRIMARY",
              },
            ],
          },
          variants: {
            create: [
              {
                sizeLabel: "L",
                sku: "DENIM-JKT-L",
                price: "79.00",
                compareAtPrice: "99.00",
                stock: 65,
              },
            ],
          },
          sections: {
            create: [
              {
                type: "DESCRIPTION",
                title: "Description",
                content:
                  "An everyday layer with a timeless silhouette and versatile styling.",
                order: 0,
              },
            ],
          },
        },
        include: {
          variants: true,
          images: true,
        },
      }),
      tx.product.create({
        data: {
          name: "Cozy Velvet Sofa",
          slug: slugify("Cozy Velvet Sofa"),
          baseDescription:
            "Three-seater sofa with durable upholstery, deep cushions, and a lounge-ready profile.",
          texture: "Velvet upholstery",
          isActive: true,
          categoryId: categoryByName.get("Home & Living")!.id,
          images: {
            create: [
              {
                url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
                type: "PRIMARY",
              },
            ],
          },
          variants: {
            create: [
              {
                sizeLabel: "3-Seater",
                sku: "SOFA-VELVET-3S",
                price: "899.99",
                compareAtPrice: "1099.99",
                stock: 8,
              },
            ],
          },
          sections: {
            create: [
              {
                type: "DESCRIPTION",
                title: "Description",
                content:
                  "A comfortable centerpiece with plush seating and a sturdy frame for daily use.",
                order: 0,
              },
            ],
          },
        },
        include: {
          variants: true,
          images: true,
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
          total: "1215.99",
        },
      }),
    ]);

    await tx.orderItem.createMany({
      data: [
        {
          orderId: orders[0].id,
          productId: productByName.get("Nova 14 Laptop")!.id,
          variantId: productByName.get("Nova 14 Laptop")!.variants[0].id,
          quantity: 1,
          price: "1099.00",
        },
        {
          orderId: orders[0].id,
          productId: productByName.get("Aurora Noise-Canceling Headphones")!.id,
          variantId: productByName.get("Aurora Noise-Canceling Headphones")!.variants[0].id,
          quantity: 1,
          price: "199.99",
        },
        {
          orderId: orders[0].id,
          productId: productByName.get("Everyday Cotton Tee")!.id,
          variantId: productByName.get("Everyday Cotton Tee")!.variants[0].id,
          quantity: 1,
          price: "24.50",
        },
        {
          orderId: orders[1].id,
          productId: productByName.get("Cozy Velvet Sofa")!.id,
          variantId: productByName.get("Cozy Velvet Sofa")!.variants[0].id,
          quantity: 1,
          price: "899.99",
        },
        {
          orderId: orders[1].id,
          productId: productByName.get("Classic Denim Jacket")!.id,
          variantId: productByName.get("Classic Denim Jacket")!.variants[0].id,
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
