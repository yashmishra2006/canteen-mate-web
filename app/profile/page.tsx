"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please login to view your profile",
        });
        router.push("/login");
        return;
      }
      setUser(user);
    };

    getUser();
  }, [router, toast]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "You have been signed out successfully",
    });
    
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return null;
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
            <p className="mt-1">{user.user_metadata.full_name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Account Created</label>
            <p className="mt-1">{new Date(user.created_at).toLocaleDateString()}</p>
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