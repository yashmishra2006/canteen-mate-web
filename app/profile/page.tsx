"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.isLoggedIn) {
          setUser(parsedUser);
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please login to view your profile",
      });
      router.push("/login");
    }
  }, [router, toast]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    
    toast({
      title: "Success",
      description: "You have been signed out successfully",
    });
    
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Profile</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="mt-1">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Full Name</label>
            <p className="mt-1">{user.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Account Status</label>
            <p className="mt-1">Active</p>
          </div>
          <div className="pt-4">
            <Button 
              variant="destructive" 
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}