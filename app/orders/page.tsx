"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, ChevronRight } from "lucide-react";
import OrderHistory from "@/components/orders/order-history";
import ActiveOrders from "@/components/orders/active-orders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-600 max-w-3xl">
          Track your current orders and view your order history. You can also reorder your favorite meals.
        </p>
      </div>

      <Tabs defaultValue="active" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="active" className="px-4 py-2">
            Active Orders
          </TabsTrigger>
          <TabsTrigger value="history" className="px-4 py-2">
            Order History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <ActiveOrders />
        </TabsContent>

        <TabsContent value="history">
          <OrderHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}