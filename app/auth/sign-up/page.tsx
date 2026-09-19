'use client';

import { useActionState } from 'react';
import { signUpWithEmail } from './actions';
import SocialButtons from '../social-buttons';

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

  return (
    <form action={formAction}
      className="flex flex-col gap-5 min-h-screen items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">

      <div className="w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold text-gray-900">Create new account</h1>
      </div>

      <div className='flex flex-col gap-1.5 w-sm'>
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
        <input id="name" name="name" type="text" required placeholder="Jane Doe"
          className="block rounded-md w-full bg-purple-200/50 px-2 py-1.5 placeholder:text-purple-300 text-gray-600 outline-1 outline-white/10 focus:outline-indigo-500"
        />
      </div>

      <div className='flex flex-col gap-1.5 w-sm'>
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email address</label>
        <input id="email" name="email" type="email" required placeholder="jane@my-company.com"
          className="block rounded-md w-full bg-purple-200/50 px-2 py-1.5 placeholder:text-purple-300 text-gray-600 outline-1 outline-white/10  focus:outline-indigo-500"/>
      </div>

      <div className='flex flex-col gap-1.5 w-sm'>
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
        <input id="password" name="password" type="password" required placeholder="*****"
          className="block rounded-md w-full bg-purple-200/50 px-2 py-1.5 placeholder:text-purple-300 text-gray-600 outline-1 outline-white/10  focus:outline-indigo-500"/>
      </div>

      {state?.error && (
        <div className="rounded-md px-3 py-2 text-sm text-red-500">
          {state.error}
        </div>
      )}

      <button type="submit" disabled={isPending}
        className="flex w-sm justify-center rounded-md bg-purple-800 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-purple-600">
        {isPending ? 'Creating account...' : 'Create Account'}
      </button>
      <SocialButtons />
    </form>
  );
}