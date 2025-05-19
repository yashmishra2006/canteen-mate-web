'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-green-600 text-white">
        <div className="text-2xl font-bold">Canteen Mate</div>
        <div className="space-x-6 text-base">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/UserLogin" className="hover:underline">Login</Link>
          <Link href="/UserSignup" className="hover:underline">Signup</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gradient-to-r from-green-50 to-white">
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-4xl font-bold text-green-800 mb-6">
            Hassle-free Food Ordering with Canteen Mate 🍽️
          </h1>
          <p className="text-gray-700 mb-6 text-lg">
            Skip the queues, order ahead, and get your meal right on time. Whether you're a student or staff, Canteen Mate brings your canteen to your fingertips.
          </p>
          <Link href="/UserLogin">
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition">
              Get Started
            </button>
          </Link>
        </div>

        <img
          src="/canteen-illustration.svg"
          alt="Canteen Illustration"
          className="w-full md:w-1/2"
        />
      </section>

      {/* Features Section */}
      <section className="px-10 py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-10">Why Canteen Mate?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            title="Instant Ordering"
            desc="Order your food in a few clicks and skip the long lines."
          />
          <FeatureCard
            title="Live Menu & Availability"
            desc="See what's cooking in real-time and plan your meals ahead."
          />
          <FeatureCard
            title="Easy Payments"
            desc="Pay online securely and grab your food without delay."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-6 text-center">
        © {new Date().getFullYear()} Canteen Mate. All rights reserved.
      </footer>
    </main>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="p-6 border rounded-xl shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-green-700 mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
