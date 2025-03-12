import { useState } from "react";
import { Link } from "wouter";
import { MainLayout } from "@/components/layout/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const displayProducts = products || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center">
              <span className="text-xl font-bold">Farm Fresh Market</span>
            </div>
          </Link>
          <div className="w-96">
            <Input
              type="search"
              placeholder="Search"
              className="bg-[#f0f9f0] border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-8" /> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Tags */}
        <div className="flex gap-2 mb-8">
          {["Organic", "Vegan", "Gluten-Free", "Non-GMO", "Local"].map((tag) => (
            <Button
              key={tag}
              variant="outline"
              className="rounded-full bg-[#f0f9f0] border-none hover:bg-[#e0f0e0]"
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Input
            type="search"
            placeholder="Search Fresh Products..."
            className="max-w-full bg-[#f0f9f0] border-none"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {displayProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="cursor-pointer group">
                <div className="aspect-square rounded-lg overflow-hidden bg-[#f0f9f0] mb-2">
                  {/* Product image would go here */}
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-green-600">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-2">
          <Button variant="outline" className="px-3 py-1 min-w-[32px]">
            &lt;
          </Button>
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              className="px-3 py-1 min-w-[32px]"
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" className="px-3 py-1 min-w-[32px]">
            &gt;
          </Button>
        </div>
      </main>
    </div>
  );
}