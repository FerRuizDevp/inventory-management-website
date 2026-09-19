'use client';

import { authClient } from '@/lib/auth/client';

export default function SocialButtons() {
    const handleSignIn = async (provider: 'github' | 'google') => {
        try {
            await authClient.signIn.social({ provider, callbackURL: '/dashboard' });
        } catch (error) {
            console.error('Error signing in with OAuth:', error);
        }
    };

    return (
        <div className="flex flex-col gap-2 w-sm">
            <div className="flex flex-col gap-3 w-sm text-center text-gray-500 m-4">Or sign in with</div>
            <button type="button" onClick={() => handleSignIn('github')}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-purple-600 border-2 border-purple-600 hover:bg-purple-50 transition-colors">
                <img
                    src="https://cdn.simpleicons.org/github/333333"
                    alt="GitHub"
                    className="h-5 w-5"
                />
                Sign in with GitHub
            </button>
            <button type="button" onClick={() => handleSignIn('google')}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-purple-600 border-2 border-purple-600 hover:bg-purple-50 transition-colors">
                <img
                    src="https://cdn.simpleicons.org/google/333333"
                    alt="Google"
                    className="h-5 w-5"
                />
                Sign in with Google
            </button>
        </div>
    );
}
