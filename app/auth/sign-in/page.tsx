'use client';

import { useActionState } from 'react';
import { signInWithEmail } from './actions';
import SocialButtons from '../social-buttons';

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <form action={formAction}
      className="flex flex-col gap-5 min-h-screen items-center justify-center bg-linear-to-br from-violet-50 to-violet-100">

      <div className="w-sm">
       <h1 className="mt-10 text-center text-2xl/9 font-bold text-gray-900">Sign in to your account</h1>
      </div>

      <div className='flex flex-col gap-1.5 w-sm'>
        <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email address</label>
        <input id="email" name="email" type="email" required placeholder="john@my-company.com"
          className="block rounded-md w-full bg-violet-200/50 px-2 py-1.5 placeholder:text-violet-300 text-gray-600 outline-1 outline-white/10  focus:outline-indigo-500"/>
      </div>

      <div className='flex flex-col gap-1.5 w-sm'>
        <label htmlFor="password" className="block text-sm font-medium text-gray-100">Password</label>
        <input id="password" name="password" type="password" required placeholder="*****"
          className="block rounded-md w-full bg-violet-200/50 px-2 py-1.5 placeholder:text-violet-300 text-gray-600 outline-1 outline-white/10  focus:outline-indigo-500"/>
      </div>

      {state?.error && (
        <div className="rounded-md px-3 py-2 text-sm text-red-500">
          {state.error}
        </div>
      )}

      <button type="submit" disabled={isPending}
        className="flex w-sm justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-violet-400">
        Sign in
      </button>
      <SocialButtons />
    </form>
  );
}