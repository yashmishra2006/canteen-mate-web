import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 bg-gradient-to-b from-green-100 to-white text-gray-800">
      
      {/* Hero Section */}
      <section className="text-center mt-20">
        <h1 className="text-5xl font-bold mb-4 text-green-700">Welcome to Canteen Mate</h1>
        <p className="text-lg max-w-xl mx-auto mb-6">
          Your smart companion to order, track, and enjoy your favorite meals from the campus canteen without waiting in line.
        </p>
        <Link href={"/UserOrOwner"} className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-green-700 transition">
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="mt-24 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">📱 Easy Ordering</h3>
          <p>Place orders from your phone and skip the queue.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">🍔 Live Menu</h3>
          <p>Check real-time menu updates and food availability.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">📦 Pickup Alerts</h3>
          <p>Get notified when your food is ready for pickup.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Join hundreds of students using Canteen Mate!</h2>
        <p className="mb-6">Order smart. Eat smart.</p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-green-700 transition">
          Sign Up Now
        </button>
      </section>

      {/* Footer */}
      <footer className="mt-32 w-full text-center text-sm text-gray-500">
        © 2025 Canteen Mate. All rights reserved.
      </footer>
    </main>
  );
}
