import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Student",
    content: "CanteenMate has made my campus life so much easier! I can order food between classes and pick it up without waiting in long lines.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Faculty Member",
    content: "The quality and variety of food available is impressive. I appreciate the healthy options and the ability to customize my orders.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Administrative Staff",
    content: "I use CanteenMate almost daily and love how it saves me time. The app is easy to use and the food is always delicious!",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="bg-gray-50 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="pt-6">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
            <div className="flex items-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}