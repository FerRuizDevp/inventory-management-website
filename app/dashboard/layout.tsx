import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/server";
import Sidebar from "@/component/sidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 to-violet-100">
      <Sidebar currentPath="/dashboard" />
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
