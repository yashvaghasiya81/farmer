import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import { User, Leaf, Apple, Carrot } from "lucide-react";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Buy Fresh, Buy Direct</span>
            
              <span className="block text-primary">from Farmers</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Support local farmers and get the freshest produce delivered to your doorstep.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Button asChild size="lg">
                <Link href="/marketplace">Start Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Shop by Category
            </h2>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.name} href={`/marketplace?category=${category.id}`}>
                <a className="group">
                  <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="aspect-w-3 aspect-h-2">
                      <div className="p-8 flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition-colors">
                        {category.icon}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        {category.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Featured Farmers
            </h2>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {farmers.map((farmer) => (
              <div key={farmer.name} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {farmer.name}
                      </h3>
                      <p className="text-sm text-gray-500">{farmer.specialty}</p>
                    </div>
                  </div>
                  <Button className="mt-6 w-full" variant="outline" asChild>
                    <Link href={`/farmer/${farmer.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

const categories = [
  {
    id: "fruits",
    name: "Fruits",
    description: "Fresh seasonal fruits",
    icon: <Apple className="h-12 w-12" />,
  },
  {
    id: "vegetables",
    name: "Vegetables",
    description: "Farm-fresh vegetables",
    icon: <Carrot className="h-12 w-12" />,
  },
  {
    id: "dairy",
    name: "Dairy",
    description: "Fresh dairy products",
    icon: <Leaf className="h-12 w-12" />,
  },
  {
    id: "organic",
    name: "Organic Products",
    description: "100% organic verified",
    icon: <Leaf className="h-12 w-12" />,
  },
];

const farmers = [
  {
    id: 1,
    name: "John Smith",
    specialty: "Organic Vegetables",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    specialty: "Fresh Fruits",
  },
  {
    id: 3,
    name: "Mike Wilson",
    specialty: "Dairy Products",
  },
];
