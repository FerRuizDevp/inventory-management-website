import { auth } from '@/lib/auth/server';
import Link from 'next/link';

// Server components using auth methods must be rendered dynamically
export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: session } = await auth.getSession();

  if (session?.user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-violet-50 to-violet-100 flex items-center justify-center">
        <h1 className="mb-4 text-4xl text-violet-950">
          Logged in as <span className="font-bold underline">{session.user.name}</span>
        </h1>
      </div>
    );
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
            <Link
              href="#"
              className="bg-white text-violet-600 px-8 py-3 rounded-lg font-semibold border-2 border-violet-600 hover:bg-violet-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ** This page is a server component that checks if the user is logged in using the auth library. If the user is logged in, it displays their name. If not, it shows a landing page with options to sign up, sign in, or learn more about the inventory management system.

// ** TO-DO: Adaprt the Sign-up and Sign-in pages to have the same styling as the landing page. 
