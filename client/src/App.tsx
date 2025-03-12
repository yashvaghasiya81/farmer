import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import MarketplacePage from "@/pages/marketplace-page";
import ProductPage from "@/pages/product-page";
import FarmerDashboard from "@/pages/farmer-dashboard";
import ConsumerDashboard from "@/pages/consumer-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/marketplace" component={MarketplacePage} />
      <Route path="/product/:id" component={ProductPage} />
      <ProtectedRoute path="/farmer/dashboard" component={FarmerDashboard} />
      <ProtectedRoute path="/consumer/dashboard" component={ConsumerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
