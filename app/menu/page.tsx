"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Minus } from "lucide-react";

// Food categories and items
const categories = [
  { id: "all", name: "All Items" },
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
  { id: "snacks", name: "Snacks" },
  { id: "beverages", name: "Beverages" },
  { id: "desserts", name: "Desserts" },
];

const menuItems = [
  {
    id: 1,
    name: "Masala Dosa",
    price: 80,
    category: "breakfast",
    image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
    description: "Crispy rice pancake served with potato filling, sambar and chutney",
    isVeg: true,
    isPopular: true,
  },
  {
    id: 2,
    name: "Samosa",
    price: 25,
    category: "snacks",
    image: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg",
    description: "Crispy pastry filled with spiced potatoes and peas",
    isVeg: true,
    isPopular: true,
  },
  {
    id: 3,
    name: "Chicken Biryani",
    price: 150,
    category: "lunch",
    image: "https://images.pexels.com/photos/7390558/pexels-photo-7390558.jpeg",
    description: "Fragrant basmati rice cooked with tender chicken and aromatic spices",
    isVeg: false,
    isPopular: true,
  },
  {
    id: 4,
    name: "Paneer Butter Masala",
    price: 130,
    category: "lunch",
    image: "https://images.pexels.com/photos/3590401/pexels-photo-3590401.jpeg",
    description: "Cottage cheese cubes in rich tomato and butter gravy",
    isVeg: true,
    isPopular: false,
  },
  {
    id: 5,
    name: "Masala Chai",
    price: 20,
    category: "beverages",
    image: "https://images.pexels.com/photos/5946630/pexels-photo-5946630.jpeg",
    description: "Traditional Indian spiced tea with milk",
    isVeg: true,
    isPopular: false,
  },
  {
    id: 6,
    name: "Gulab Jamun",
    price: 40,
    category: "desserts",
    image: "https://images.pexels.com/photos/7449105/pexels-photo-7449105.jpeg",
    description: "Sweet milk solids balls soaked in sugar syrup",
    isVeg: true,
    isPopular: false,
  },
  {
    id: 7,
    name: "Cold Coffee",
    price: 60,
    category: "beverages",
    image: "https://images.pexels.com/photos/4271412/pexels-photo-4271412.jpeg",
    description: "Refreshing cold coffee blended with ice and milk",
    isVeg: true,
    isPopular: false,
  },
  {
    id: 8,
    name: "Veg Pulao",
    price: 100,
    category: "lunch",
    image: "https://images.pexels.com/photos/5410422/pexels-photo-5410422.jpeg",
    description: "Fragrant rice cooked with mixed vegetables and spices",
    isVeg: true,
    isPopular: false,
  },
  {
    id: 9,
    name: "Egg Fried Rice",
    price: 120,
    category: "lunch",
    image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg",
    description: "Chinese style rice stir-fried with eggs and vegetables",
    isVeg: false,
    isPopular: true,
  },
];

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  // Filter menu items based on active tab and search query
  const filteredItems = menuItems.filter(
    (item) =>
      (activeTab === "all" || item.category === activeTab) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add item to cart
  const addToCart = (itemId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1,
    }));
  };

  // Remove item from cart
  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };

  // Calculate total items in cart
  const totalCartItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

  // Calculate total cart value
  const totalCartValue = Object.entries(cart).reduce((sum, [itemId, count]) => {
    const item = menuItems.find((item) => item.id === parseInt(itemId));
    return sum + (item ? item.price * count : 0);
  }, 0);

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
                          onClick={() => addToCart(item.id)}
                          className="h-9 w-9"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="bg-red-600 hover:bg-red-700 text-white w-full"
                        onClick={() => addToCart(item.id)}
                      >
                        Add to Cart
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