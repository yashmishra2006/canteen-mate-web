"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  ShoppingBag
} from "lucide-react";

// Sample order history data
const orderHistoryData = [
  {
    id: "9012DEF",
    date: "2023-05-14T12:45:00",
    status: "completed",
    items: [
      {
        id: 4,
        name: "Masala Dosa",
        quantity: 1,
        price: 80,
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
      },
      {
        id: 5,
        name: "Cold Coffee",
        quantity: 2,
        price: 60,
        image: "https://images.pexels.com/photos/4271412/pexels-photo-4271412.jpeg",
      },
    ],
    total: 200,
  },
  {
    id: "3456GHI",
    date: "2023-05-12T18:30:00",
    status: "completed",
    items: [
      {
        id: 6,
        name: "Paneer Butter Masala",
        quantity: 1,
        price: 130,
        image: "https://images.pexels.com/photos/3590401/pexels-photo-3590401.jpeg",
      },
      {
        id: 7,
        name: "Gulab Jamun",
        quantity: 2,
        price: 40,
        image: "https://images.pexels.com/photos/7449105/pexels-photo-7449105.jpeg",
      },
    ],
    total: 210,
  },
];

export default function OrderHistory() {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  // Toggle order expansion
  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prevExpanded) =>
      prevExpanded.includes(orderId)
        ? prevExpanded.filter((id) => id !== orderId)
        : [...prevExpanded, orderId]
    );
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (orderHistoryData.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="mb-4">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Order History</h3>
        <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
        <Button className="bg-red-600 hover:bg-red-700">
          Order Now
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orderHistoryData.map((order) => {
        const isExpanded = expandedOrders.includes(order.id);
        return (
          <Card key={order.id} className="overflow-hidden border border-gray-200">
            <CardContent className="p-0">
              <div 
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrderExpansion(order.id)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Order #{order.id}</p>
                    <Badge className="bg-green-500">Completed</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-red-600">₹{order.total}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOrderExpansion(order.id);
                    }}
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
              
              {isExpanded && (
                <>
                  <div className="border-t border-gray-200 p-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center py-3 gap-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <div className="flex justify-end">
                      <Button className="bg-red-600 hover:bg-red-700 flex items-center">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reorder
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}