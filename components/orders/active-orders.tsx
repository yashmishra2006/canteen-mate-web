"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, AlertTriangle } from "lucide-react";

// Sample active orders data
const activeOrdersData = [
  {
    id: "1234XYZ",
    date: "2023-05-15T12:30:00",
    status: "preparing",
    items: [
      {
        id: 1,
        name: "Samosa",
        quantity: 2,
        price: 25,
        image: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg",
      },
      {
        id: 2,
        name: "Masala Chai",
        quantity: 1,
        price: 20,
        image: "https://images.pexels.com/photos/5946630/pexels-photo-5946630.jpeg",
      },
    ],
    total: 70,
    estimatedTime: "15 min",
  },
  {
    id: "5678ABC",
    date: "2023-05-15T13:15:00",
    status: "ready",
    items: [
      {
        id: 3,
        name: "Chicken Biryani",
        quantity: 1,
        price: 150,
        image: "https://images.pexels.com/photos/7390558/pexels-photo-7390558.jpeg",
      },
    ],
    total: 150,
    estimatedTime: "Ready for pickup",
  },
];

export default function ActiveOrders() {
  const [orders, setOrders] = useState(activeOrdersData);

  // Function to cancel an order
  const cancelOrder = (orderId: string) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setOrders(orders.filter((order) => order.id !== orderId));
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "preparing":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-amber-500 text-amber-600">
            <Clock className="h-3 w-3" />
            <span>Preparing</span>
          </Badge>
        );
      case "ready":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-green-500 text-green-600">
            <Check className="h-3 w-3" />
            <span>Ready for pickup</span>
          </Badge>
        );
      case "delayed":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-red-500 text-red-600">
            <AlertTriangle className="h-3 w-3" />
            <span>Delayed</span>
          </Badge>
        );
      default:
        return null;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="mb-4">
          <Clock className="h-12 w-12 mx-auto text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Orders</h3>
        <p className="text-gray-600 mb-6">You don't have any active orders at the moment.</p>
        <Button className="bg-red-600 hover:bg-red-700">
          Order Now
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden border border-gray-200">
          <CardContent className="p-0">
            <div className="bg-red-50 p-4 border-b border-gray-200">
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(order.status)}
                  {order.status !== "ready" && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => cancelOrder(order.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-4">
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
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-700">
                    Estimated Time: <span className="font-medium">{order.estimatedTime}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-lg font-semibold text-red-600">₹{order.total}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}