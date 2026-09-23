import { db } from './db';

async function main() {
  const demoUserId = "4f999b1d-5b33-45c3-bdeb-1f3fa6c59f09";

  const products = Array.from({ length: 25 }).map((_, i) => ({
    userId: demoUserId,
    name: `Product ${i + 1}`,
    price: (Math.random() * 90 + 10).toFixed(2) as any,
    quantity: Math.floor(Math.random() * 20),
    lowStockAt: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
  }));

  await db.orm.public.Product.createAll(products as any);

  console.log("Seed data created successfully!");
  console.log(`Created 25 products for user ID: ${demoUserId}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});