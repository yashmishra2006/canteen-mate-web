import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Clock, Award, BadgeCheck } from "lucide-react";
import FeaturedDishes from "@/components/home/featured-dishes";
import Testimonials from "@/components/home/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-red-600">CANTEEN MATE</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Enjoy the best food at affordable prices, experience fast service and quality ingredients in every meal we serve.
            </p>
            <Link href="/menu">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded-md flex items-center">
                View Our Extensive Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
                alt="Delicious Food"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-red-50 p-6 rounded-lg">
              <p className="text-red-600 font-bold text-4xl mb-2">500+</p>
              <p className="text-gray-700">Daily Orders</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg">
              <p className="text-red-600 font-bold text-4xl mb-2">50+</p>
              <p className="text-gray-700">Menu Items</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg">
              <p className="text-red-600 font-bold text-4xl mb-2">99%</p>
              <p className="text-gray-700">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Dishes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most ordered and loved dishes from our extensive menu. Try them today!
            </p>
          </div>
          
          <FeaturedDishes />
          
          <div className="text-center mt-12">
            <Link href="/menu">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                See All Dishes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Great Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a variety of services to make your canteen experience better.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Fast Delivery</h3>
                <p className="text-gray-600 text-center">
                  Get your food delivered quickly to your office or classroom, hot and fresh.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Quality Food</h3>
                <p className="text-gray-600 text-center">
                  We use only the freshest ingredients to prepare your meals with love and care.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <BadgeCheck className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Online Ordering</h3>
                <p className="text-gray-600 text-center">
                  Order ahead and skip the line with our easy-to-use online ordering system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied customers about their experience with CanteenMate.
            </p>
          </div>
          
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Order?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who use CanteenMate every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/menu">
              <Button className="bg-white text-red-600 hover:bg-gray-100">
                View Menu
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}