import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: session } = await auth.getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 to-violet-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Inventory Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your inventory tracking with our powerful, easy-to-use
            management system. Track products, monitor stock levels, and gain
            valuable insights.
          </p>
          <div className="flex gap-2 justify-center">
            <Link
              href="/auth/sign-up"
              className="bg-violet-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-violet-900 transition-colors"
            >
              Sign Up
            </Link>
            <Link
              href="/auth/sign-in"
              className="bg-violet-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-violet-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
