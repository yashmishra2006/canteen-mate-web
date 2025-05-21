import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featuredDishes = [
  {
    id: 1,
    name: "Grilled Masala",
    price: 150,
    image: "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg",
    isVeg: true,
    isPopular: true,
  },
  {
    id: 2,
    name: "Samosa",
    price: 25,
    image: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg",
    isVeg: true,
    isPopular: true,
  },
  {
    id: 3,
    name: "Egg Fried Rice",
    price: 120,
    image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg",
    isVeg: false,
    isPopular: true,
  },
];

export default function FeaturedDishes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {featuredDishes.map((dish) => (
        <Card key={dish.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="relative h-48">
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              {dish.isVeg ? (
                <Badge className="bg-green-500 hover:bg-green-600">Veg</Badge>
              ) : (
                <Badge className="bg-red-500 hover:bg-red-600">Non-Veg</Badge>
              )}
              {dish.isPopular && (
                <Badge className="bg-amber-500 hover:bg-amber-600">Popular</Badge>
              )}
            </div>
          </div>
          <CardContent className="pt-4">
            <h3 className="text-lg font-semibold">{dish.name}</h3>
            <p className="text-red-600 font-medium">Rs. {dish.price}/-</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="bg-red-600 hover:bg-red-700 text-white w-full">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}