// component/sidebar.tsx
"use client";

import { UserButton } from "@neondatabase/auth/react";
import {
  CirclePile,
  LayoutDashboard,
  Package,
  PlusCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Inventory", href: "/dashboard/inventory", icon: Package },
    { name: "Add Product", href: "/dashboard/add-product", icon: PlusCircle },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="fixed top-0 left-0 min-h-screen w-65 text-white bg-violet-950 p-6 z-10">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <CirclePile className="w-6 h-6" />
          <span className="text-lg font-semibold">Inventory App</span>
        </div>
      </div>
      <nav className="space-y-1">
        {navigation.map((item, key) => {
          const Iconcomponent = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={key}
              className={`flex items-center space-x-3 py-2 px-3 rounded-lg ${
                isActive
                  ? "bg-violet-100 text-violet-950"
                  : "hover:bg-violet-800 text-gray-300"
              }`}
            >
              <Iconcomponent className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t-2 border-violet-400">
        <div className="flex items-center justify-center">
          <UserButton className="text-gray-300 bg-violet-950 hover:bg-violet-800" />
        </div>
      </div>
    </div>
  );
}
