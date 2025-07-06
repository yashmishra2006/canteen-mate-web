"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { authAPI, cartAPI, User as UserType } from "@/lib/api";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => {
      const currentUser = authAPI.getCurrentUser();
      setUser(currentUser);
    };

    const updateCartCount = () => {
      const count = cartAPI.getCartItemCount();
      setCartItemCount(count);
    };

    checkUser();
    updateCartCount();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkUser);
    
    // Update cart count periodically
    const interval = setInterval(updateCartCount, 1000);
    
    return () => {
      window.removeEventListener('storage', checkUser);
      clearInterval(interval);
    };
  }, []);

  const handleSignOut = async () => {
    const response = await authAPI.logout();
    if (response.success) {
      setUser(null);
      setCartItemCount(0);
      toast({
        title: "Success",
        description: response.message || "You have been signed out successfully.",
      });
      router.push("/");
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.error || "Failed to sign out",
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-red-100 text-red-600">
                        {getInitials(user.name || user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link href="/cart" className="mr-4">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
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
            {user ? (
              <>
                <Link 
                  href="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-50 hover:text-red-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PROFILE
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700 mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}