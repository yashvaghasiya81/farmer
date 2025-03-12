import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { ShoppingCart, User } from "lucide-react";

export function MainNav() {
  const { user, logoutMutation } = useAuth();
  
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-xl font-bold">FarmChain</span>
              </a>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/marketplace">
                <a className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                  Marketplace
                </a>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={user.isFarmer ? "/farmer/dashboard" : "/consumer/dashboard"}>
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => logoutMutation.mutate()}
                  className="ml-4"
                >
                  Log out
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/auth">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
