"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-gray-700">
            <Link href="/" className="hover:text-red-600 transition-colors font-medium">
              HOME
            </Link>
            <Link href="/menu" className="hover:text-red-600 transition-colors font-medium">
              MENU
            </Link>
            <Link href="/orders" className="hover:text-red-600 transition-colors font-medium">
              ORDERS
            </Link>
            <Link href="/contact" className="hover:text-red-600 transition-colors font-medium">
              CONTACT
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Login
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link href="/cart" className="mr-4">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-50 hover:text-red-600"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link 
              href="/menu" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-50 hover:text-red-600"
              onClick={() => setIsMenuOpen(false)}
            >
              MENU
            </Link>
            <Link 
              href="/orders" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-50 hover:text-red-600"
              onClick={() => setIsMenuOpen(false)}
            >
              ORDERS
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-50 hover:text-red-600"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </Link>
            <Link 
              href="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700 mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              LOGIN
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}