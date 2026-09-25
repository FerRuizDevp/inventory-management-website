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
      .select("price", "quantity", "createdAt")
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
              <p className="text-base font-semibold text-gray-500">
                Welcome back,{" "}
                <span className="text-violet-600">{user?.name}</span>! Here is
                an overview of your inventory.
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
        </div>
      </main>
    </div>
  );
}
