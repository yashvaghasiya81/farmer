import { useState } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Avatar } from "@/components/ui/avatar";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const displayProducts = products || [];

  // Sample product data to match the screenshot
  const sampleProducts = [
    { id: 1, name: "Organic Blueberries", price: 4.99, image: "blueberries.jpg" },
    { id: 2, name: "Organic Strawberries", price: 3.99, image: "strawberries.jpg" },
    { id: 3, name: "Organic Raspberries", price: 5.99, image: "raspberries.jpg" },
    { id: 4, name: "Organic Blackberries", price: 6.99, image: "blackberries.jpg" },
    { id: 5, name: "Organic Bananas", price: 1.99, image: "bananas.jpg" },
    { id: 6, name: "Organic Apples", price: 2.99, image: "apples.jpg" },
    { id: 7, name: "Organic Oranges", price: 3.99, image: "oranges.jpg" },
    { id: 8, name: "Organic Lemons", price: 4.99, image: "lemons.jpg" },
    { id: 9, name: "Organic Limes", price: 5.99, image: "limes.jpg" },
    { id: 10, name: "Organic Grapefruits", price: 6.99, image: "grapefruits.jpg" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8">
                <img src="/farm-fresh-icon.png" alt="Farm Fresh Market" className="w-full h-full" />
              </div>
              <span className="text-xl font-bold">Farm Fresh Market</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop">Shop</Link>
            <Link href="/recipes">Recipes</Link>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/our-farms">Our Farms</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-96">
              <Input
                type="search"
                placeholder="Search"
                className="bg-[#f0f9f0] border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {user ? (
              <Avatar className="w-8 h-8">
                <img src={user.avatar || "/default-avatar.png"} alt={user.username} />
              </Avatar>
            ) : (
              <Link href="/auth">
                <Button variant="outline">Sign in</Button>
              </Link>
            )}
          </div>
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
          {sampleProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="cursor-pointer group">
                <div className="aspect-square rounded-lg overflow-hidden bg-[#f0f9f0] mb-2">
                  <img
                    src={`/products/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-green-600">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
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