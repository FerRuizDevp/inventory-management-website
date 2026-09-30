import ProductsChart from "@/component/product-chart";
import { getCurrentUser } from "@/lib/auth/server";
import { db } from "@/src/prisma/db";
import { TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user!.id; // layout guarantees this exists

  const ProductModel = db.orm.public.Product as any;

  const [totalProductsRows, lowStockRows, allProducts] = await Promise.all([
    ProductModel.where((p: any) => p.userId.eq(userId))
      .select("id")
      .all(),

    ProductModel.where((p: any) => p.userId.eq(userId))
      .where((p: any) => p.lowStockAt.isNotNull())
      .where((p: any) => p.quantity.lte(5))
      .select("id")
      .all(),

    ProductModel.where((p: any) => p.userId.eq(userId))
      .select("name", "price", "quantity", "createdAt", "lowStockAt")
      .all(),
  ]);

  const totalProducts = totalProductsRows.length;
  const lowStock = lowStockRows.length;

  const totalValue = allProducts.reduce(
    (
      sum: number,
      product: {
        price: string | number | null;
        quantity: string | number | null;
      },
    ) => sum + Number(product.price) * Number(product.quantity),
    0,
  );

  const inStockCount = allProducts.filter(
    (product: any) =>
      Number(product.quantity) > 0 &&
      Number(product.quantity) > Number(product.lowStockAt || 5),
  ).length;
  const lowStockCount = allProducts.filter(
    (product: any) =>
      Number(product.quantity) > 0 &&
      Number(product.quantity) <= Number(product.lowStockAt || 5),
  ).length;
  const outOfStockCount = allProducts.filter(
    (product: any) => Number(product.quantity) === 0,
  ).length;

  const inStockPercentage = totalProducts
    ? Math.round((inStockCount / totalProducts) * 100)
    : 0;
  const lowStockPercentage = totalProducts
    ? Math.round((lowStockCount / totalProducts) * 100)
    : 0;
  const outOfStockPercentage = totalProducts
    ? Math.round((outOfStockCount / totalProducts) * 100)
    : 0;

  const now = new Date();

  const weeklyProductsData = [];

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    weekEnd.setHours(23, 59, 59, 999);

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(2, "0")}/${String(weekStart.getDate() + 1).padStart(2, "0")}`;

    const weekProduct = allProducts.filter(
      (product: { createdAt: string | number | Date }) => {
        const productDate = new Date(product.createdAt);
        return productDate >= weekStart && productDate <= weekEnd;
      },
    );

    weeklyProductsData.push({ week: weekLabel, products: weekProduct.length });
  }

  const recent = [...allProducts]
    .sort(
      (a: any, b: any) =>
        Number(new Date(b.createdAt || 0)) - Number(new Date(a.createdAt || 0)),
    )
    .slice(0, 5);

  console.log(totalValue);

  return (
    <div>
      <main>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-5">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back,{" "}
                <span className="text-violet-600 font-semibold">
                  {user?.name}
                </span>
                ! Here is an overview of your inventory.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Key Metrics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Key Metrics
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {totalProducts}
                </div>
                <div className="text-sm text-gray-600">Total Products</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +{totalProducts}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  ${Number(totalValue).toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +${Number(totalValue).toFixed(0)}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {lowStock}
                </div>
                <div className="text-sm text-gray-600">Low Stock</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">+{lowStock}</span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
            </div>
          </div>
          {/* Inventory over time */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                New products per week
              </h2>
            </div>
            <div className="h-48">
              <ProductsChart data={weeklyProductsData} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Stock Levels */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Stock Levels
              </h2>
            </div>
            <div className="space-y-3">
              {recent.map((product, key) => {
                const quantity = Number(product.quantity ?? 0);
                const threshold = Number(product.lowStockAt ?? 5);
                const stockLevel =
                  quantity === 0 ? 0 : quantity <= threshold ? 1 : 2;

                const bgColors = [
                  "bg-red-600",
                  "bg-yellow-600",
                  "bg-green-600",
                ];
                const textColors = [
                  "text-red-600",
                  "text-yellow-600",
                  "text-green-600",
                ];

                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {product.name}
                      </span>
                    </div>
                    <div
                      className={`text-sm font-medium ${textColors[stockLevel]}`}
                    >
                      {quantity} units
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Efficiency */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Efficiency
              </h2>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* background track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  {/* out of stock segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#9333ea"
                    strokeWidth="10"
                    strokeDasharray={`${(outOfStockPercentage / 100) * 251.2} 251.2`}
                    strokeDashoffset={
                      -((inStockPercentage + lowStockPercentage) / 100) * 251.2
                    }
                    strokeLinecap="round"
                  />
                  {/* low stock segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#c4b5fd"
                    strokeWidth="10"
                    strokeDasharray={`${(lowStockPercentage / 100) * 251.2} 251.2`}
                    strokeDashoffset={-(inStockPercentage / 100) * 251.2}
                    strokeLinecap="round"
                  />
                  {/* in stock segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="10"
                    strokeDasharray={`${(inStockPercentage / 100) * 251.2} 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {inStockPercentage}%
                    </div>
                    <div className="text-sm text-gray-600">In Stock</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-violet-600" />
                  <span>In Stock ({inStockPercentage}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-violet-300" />
                  <span>Low Stock ({lowStockPercentage}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <span>Out of Stock ({outOfStockPercentage}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
