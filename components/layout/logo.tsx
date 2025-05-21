import Link from "next/link";
import { Utensils } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="text-red-600 mr-2">
        <Utensils className="h-8 w-8" />
      </div>
      <span className="font-bold text-xl text-gray-900">Canteen<span className="text-red-600">Mate</span></span>
    </Link>
  );
}