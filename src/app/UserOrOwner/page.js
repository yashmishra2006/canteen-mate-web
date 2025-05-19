'use client';

import Link from 'next/link';

export default function LoginSelector() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-100 to-white p-4">
      <div className="text-center bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-700 mb-8">Welcome to Canteen Mate</h1>
        <div className="flex flex-col space-y-4">
          <Link href="/loginUser">
            <button className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition">
              Login as User
            </button>
          </Link>
          <Link href="/loginOwner">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition">
              Login as Owner
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
