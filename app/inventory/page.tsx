import DeleteProductButton from "@/component/delete-product-button";
import Pagination from "@/component/pagination";
import Sidebar from "@/component/sidebar";
import { getCurrentUser } from "@/lib/auth/server";
import { db } from "@/src/prisma/db";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user!.id; // layout guarantees this exists

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = 10;

  const ProductModel = db.orm.public.Product as any;

  let query = ProductModel.where((p: any) => p.userId.eq(userId));

  if (q) {
    query = query.where((p: any) => p.name.ilike(`%${q}%`));
  }

  const [totalCountRows, products] = await Promise.all([
    query.select("id").all(),

    query
      .orderBy((p: any) => p.createdAt.desc())
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .select("id", "name", "sku", "price", "quantity", "lowStockAt")
      .all(),
  ]);

  const totalCount = totalCountRows.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="min-h-screen  bg-violet-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-5">
                Inventory
              </h1>
              <p className="text-sm text-gray-500">
                Manage your inventory items and track inventory levels.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form className="flex gap-2" action="/inventory" method="GET">
              <input
                name="q"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-gray-300 bg-gray-50 text-sm text-gray-600 rounded-lg focus:border-transparent"
              />
              <button className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
                Search
              </button>
            </form>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Low Stock At
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {products.map((product: any, key: any) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.name}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {product.sku || "-"}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-900">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-900">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {product.lowStockAt || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <DeleteProductButton
                        productId={product.id}
                        productName={product.name}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl="/inventory"
                searchParams={{ q, pageSize: String(pageSize) }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
