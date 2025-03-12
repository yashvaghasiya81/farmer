import { MainLayout } from "@/components/layout/main-layout";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { QrCode, ShoppingCart, Star } from "lucide-react";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { data: product, isLoading } = useQuery({
    queryKey: ["/api/products", params.id],
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg aspect-square" />

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">Blockchain Verified</Badge>
              <h1 className="text-3xl font-bold">Organic Red Apples</h1>
              <p className="text-2xl font-bold mt-2">$24.99 / kg</p>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>GV</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Green Valley Farms</p>
                <p className="text-sm text-gray-600">Verified Seller since 2025</p>
              </div>
            </div>

            <p className="text-gray-600">
              Fresh, organically grown apples from our sustainable farms. Each batch is
              carefully selected and blockchain-verified for authenticity and quality
              assurance.
            </p>

            <div className="flex items-center space-x-4">
              <Button className="flex-1">Add to Cart</Button>
              <Button variant="outline" className="flex-1">Bid Now</Button>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center space-x-2">
                <QrCode className="h-5 w-5" />
                <CardTitle className="text-lg">Scan QR to Verify</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Verify product authenticity on blockchain
                </CardDescription>
              </CardContent>
            </Card>

            {/* Reviews */}
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {[
                  {
                    name: "John Doe",
                    date: "Jan 15, 2025",
                    rating: 5,
                    comment: "Excellent quality apples, and I love being able to verify their origin!",
                  },
                  {
                    name: "Sarah Smith",
                    date: "Jan 12, 2025",
                    rating: 4,
                    comment: "Fresh and crispy. The blockchain verification gives extra peace of mind.",
                  },
                ].map((review) => (
                  <Card key={review.name}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarFallback>
                              {review.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <p className="text-sm text-gray-600">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array(review.rating)
                            .fill(null)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 text-yellow-400 fill-current"
                              />
                            ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
