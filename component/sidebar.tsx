import { UserButton } from "@neondatabase/auth/react";
import { CirclePile, LayoutDashboard, Package, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";


export default function Sidebar({ 
    currentPath = "/dashboard",
 }: { 
    currentPath: string;
 }) {
    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Inventory', href: '/inventory', icon: Package },
        { name: 'Add Product', href: '/add-product', icon: PlusCircle },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <div className="fixed top-0 left-0 min-h-screen w-65 text-white bg-purple-950 p-6 z-10"> 
            <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">  
                    <CirclePile className="w-6 h-6" />
                    <span className="text-lg font-semibold">Inventory App</span>
                </div>
            </div>
            <nav className="space-y-1">
                {navigation.map((item, key) => {
                    const Iconcomponent = item.icon;
                    const isActive = currentPath === item.href;
                    return (
                        <Link
                            href={item.href}
                            key={key}
                            className={`flex items-center space-x-3 py-2 px-3 rounded-lg ${
                                isActive ? "bg-purple-100 text-purple-950" : "hover:bg-purple-800 text-gray-300"
                            }`}
                        >
                            <Iconcomponent className="w-5 h-5" />
                            <span className="text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t-2 border-purple-400">
                <div className="flex items-center justify-center">
                    <UserButton className="text-gray-300 bg-purple-950 hover:bg-purple-800" />
                </div>
            </div>

        </div>
    )
}