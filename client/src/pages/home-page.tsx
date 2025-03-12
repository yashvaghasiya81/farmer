import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">Farm Fresh</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/marketplace">Home</Link>
            <Link href="/marketplace">Marketplace</Link>
            <Link href="/learn">Learn</Link>
            <Link href="/recipes">Recipes</Link>
            <Link href="/meal-kits">Meal Kits</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/sign-in">
              <Button variant="outline" className="bg-white">Sign in</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-primary text-white">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="/farm-hero.jpg"
            alt="Farm landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Join our natural farming community
          </h1>
          <div className="max-w-xl mx-auto flex gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white/90 border-0"
            />
            <Button className="bg-primary text-white whitespace-nowrap px-8">
              Join now
            </Button>
          </div>
        </div>
      </div>

      {/* Market Options */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Find your local farmer's market
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {marketTypes.map((market) => (
            <Link key={market.title} href={market.href}>
              <div className="group cursor-pointer">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={market.image}
                    alt={market.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg mb-1">{market.title}</h3>
                <p className="text-sm text-gray-600">{market.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const marketTypes = [
  {
    title: "Farmers Markets",
    description: "Fresh, seasonal, and local",
    image: "/markets/farmers-market.jpg",
    href: "/markets/farmers",
  },
  {
    title: "U-Pick Farms",
    description: "Pick your own fruits and veggies",
    image: "/markets/u-pick.jpg",
    href: "/markets/u-pick",
  },
  {
    title: "CSAs",
    description: "Weekly boxes of fresh produce",
    image: "/markets/csa.jpg",
    href: "/markets/csa",
  },
  {
    title: "Co-ops",
    description: "Community-owned grocery stores",
    image: "/markets/coop.jpg",
    href: "/markets/coops",
  },
  {
    title: "Roadside Stands",
    description: "Fresh produce from local farmers",
    image: "/markets/roadside.jpg",
    href: "/markets/roadside",
  },
];