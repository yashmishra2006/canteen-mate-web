'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginUser() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // You can add login logic here (e.g., validation, API call)

    // Redirect to Home page
    router.push("/Home");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-100 to-white p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Login to Canteen Mate</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="form-checkbox rounded text-green-600" />
              <span>Remember me</span>
            </label>
            <Link href="#" className="text-sm text-green-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
          >
            Log In
          </button>
        </form>

        {/* Sign up link */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/OwnerSignup" className="text-green-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
