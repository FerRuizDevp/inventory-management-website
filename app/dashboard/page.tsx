import { redirect as nextRedirect } from 'next/navigation'
import { auth } from '@/lib/auth/server'
import Sidebar from '@/component/sidebar';
import SignOutButton from './sign-out-button'

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const { data: session } = await auth.getSession();
    const user = session?.user;

    if (!user) {
        redirect('/auth/sign-in');
    }

    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-purple-50 to-purple-100 items-center justify-center">
                <Sidebar currentPath="/dashboard" />
            <h1 className="text-2xl font-bold text-gray-900">Welcome to your dashboard, <span className="text-purple-600 hover:text-purple-700">{user?.name || user?.email || "there"}</span>!</h1>
            {/* <div className="mt-6 flex items-center justify-center">
                <SignOutButton />
            </div> */}
        </div>
    )
}

function redirect(url: string) {
    return nextRedirect(url);
}
    