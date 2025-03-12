import { useState } from "react";
import { Link } from "wouter";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";

export default function MarketplacePage() {
  const [priceRange, setPriceRange] = useState([0, 100]);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const displayProducts = products || [];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Filters */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Category</h3>
              <div className="space-y-2">
                {["Vegetables", "Fruits", "Dairy"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category} />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Price Range</h3>
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Location</h3>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Organic Certification</h3>
              <div className="space-y-2">
                {["USDA Organic", "EU Organic"].map((cert) => (
                  <div key={cert} className="flex items-center space-x-2">
                    <Checkbox id={cert} />
                    <Label htmlFor={cert}>{cert}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-span-3">
            <div className="mb-6">
              <Input
                type="search"
                placeholder="Search Fresh Products..."
                className="max-w-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 rounded-md mb-4" />
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        Seller: {product.seller}
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="font-bold">
                          ${product.price}/{product.unit}
                        </span>
                        <Button>Buy Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-2">
              <Button variant="outline">Previous</Button>
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}