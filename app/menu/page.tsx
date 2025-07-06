"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Minus } from "lucide-react";
import { menuAPI, cartAPI, MenuItem } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Food categories
const categories = [
  { id: "all", name: "All Items" },
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
  { id: "snacks", name: "Snacks" },
  { id: "beverages", name: "Beverages" },
  { id: "desserts", name: "Desserts" },
];

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const { toast } = useToast();

  // Load menu items
  useEffect(() => {
    const loadMenuItems = async () => {
      setLoading(true);
      const response = await menuAPI.getMenuItems();
      if (response.success && response.data) {
        setMenuItems(response.data);
        setFilteredItems(response.data);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.error || "Failed to load menu items",
        });
      }
      setLoading(false);
    };

    loadMenuItems();
  }, [toast]);

  // Load cart data
  useEffect(() => {
    const loadCart = () => {
      const cartItems = cartAPI.getCart();
      const cartMap: { [key: number]: number } = {};
      cartItems.forEach(item => {
        cartMap[item.id] = item.quantity;
      });
      setCart(cartMap);
      setTotalCartItems(cartAPI.getCartItemCount());
      setTotalCartValue(cartAPI.getCartTotal());
    };

    loadCart();
  }, []);

  // Filter items based on active tab and search query
  useEffect(() => {
    let filtered = menuItems;

    // Filter by category
    if (activeTab !== "all") {
      filtered = filtered.filter(item => item.category === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [menuItems, activeTab, searchQuery]);

  // Add item to cart
  const addToCart = async (item: MenuItem) => {
    const response = await cartAPI.addToCart(item);
    if (response.success) {
      setCart(prevCart => ({
        ...prevCart,
        [item.id]: (prevCart[item.id] || 0) + 1,
      }));
      setTotalCartItems(cartAPI.getCartItemCount());
      setTotalCartValue(cartAPI.getCartTotal());
      toast({
        title: "Added to Cart",
        description: `${item.name} has been added to your cart.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.error || "Failed to add item to cart",
      });
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: number) => {
    const currentQuantity = cart[itemId] || 0;
    if (currentQuantity <= 1) {
      const response = await cartAPI.removeFromCart(itemId);
      if (response.success) {
        setCart(prevCart => {
          const newCart = { ...prevCart };
          delete newCart[itemId];
          return newCart;
        });
      }
    } else {
      const response = await cartAPI.updateCartItem(itemId, currentQuantity - 1);
      if (response.success) {
        setCart(prevCart => ({
          ...prevCart,
          [itemId]: currentQuantity - 1,
        }));
      }
    }
    setTotalCartItems(cartAPI.getCartItemCount());
    setTotalCartValue(cartAPI.getCartTotal());
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Our Menu</h1>
        <p className="text-gray-600 max-w-3xl">
          Explore our wide range of delicious food options. From breakfast to desserts, we have something for everyone.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search for food items..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          {totalCartItems > 0 && (
            <Button className="bg-red-600 hover:bg-red-700">
              Cart: {totalCartItems} items (₹{totalCartValue})
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="flex overflow-x-auto py-2 mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="px-4 py-2">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No food items found. Try a different search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      {item.isVeg ? (
                        <Badge className="bg-green-500 hover:bg-green-600">Veg</Badge>
                      ) : (
                        <Badge className="bg-red-500 hover:bg-red-600">Non-Veg</Badge>
                      )}
                      {item.isPopular && (
                        <Badge className="bg-amber-500 hover:bg-amber-600">Popular</Badge>
                      )}
                      {!item.isAvailable && (
                        <Badge className="bg-gray-500">Out of Stock</Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-red-600 font-medium">₹ {item.price}/-</p>
                    <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {cart[item.id] ? (
                      <div className="flex items-center justify-between w-full">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => removeFromCart(item.id)}
                          className="h-9 w-9"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium">{cart[item.id]}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => addToCart(item)}
                          className="h-9 w-9"
                          disabled={!item.isAvailable}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="bg-red-600 hover:bg-red-700 text-white w-full"
                        onClick={() => addToCart(item)}
                        disabled={!item.isAvailable}
                      >
                        {item.isAvailable ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}