"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Minus, 
  Plus, 
  Trash2,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { cartAPI, ordersAPI, authAPI, CartItem } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Delivery fee
  const deliveryFee = 20;

  // Load cart items
  useEffect(() => {
    const loadCart = () => {
      const items = cartAPI.getCart();
      setCartItems(items);
      setLoading(false);
    };

    loadCart();
  }, []);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate total
  const total = subtotal + (cartItems.length > 0 ? deliveryFee : 0);

  // Update item quantity
  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const response = await cartAPI.updateCartItem(itemId, newQuantity);
    if (response.success && response.data) {
      setCartItems(response.data);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.error || "Failed to update cart",
      });
    }
  };

  // Remove item from cart
  const removeItem = async (itemId: number) => {
    const response = await cartAPI.removeFromCart(itemId);
    if (response.success && response.data) {
      setCartItems(response.data);
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.error || "Failed to remove item",
      });
    }
  };

  // Place order
  const placeOrder = async () => {
    const user = authAPI.getCurrentUser();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to place an order.",
      });
      router.push("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty Cart",
        description: "Please add items to your cart before placing an order.",
      });
      return;
    }

    setPlacing(true);
    const response = await ordersAPI.createOrder(cartItems);
    
    if (response.success) {
      setCartItems([]);
      toast({
        title: "Order Placed Successfully",
        description: `Your order #${response.data?.id.slice(-6)} has been placed.`,
      });
      router.push("/orders");
    } else {
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: response.error || "Failed to place order",
      });
    }
    setPlacing(false);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">Add some delicious items to your cart</p>
          <Link href="/menu">
            <Button className="bg-red-600 hover:bg-red-700">
              Browse Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-red-600 font-medium">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                {cartItems.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">₹{deliveryFee}</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-red-600">₹{total}</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 mt-4"
                  onClick={placeOrder}
                  disabled={placing || cartItems.length === 0}
                >
                  {placing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                      Placing Order...
                    </div>
                  ) : (
                    <>
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}