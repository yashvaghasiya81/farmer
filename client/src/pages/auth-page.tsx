import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { z } from "zod"; // Add this import

type FormData = {
  username: string;
  password: string;
  isFarmer: boolean;
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();

  const form = useForm<FormData>({
    resolver: zodResolver(
      insertUserSchema.extend({
        isFarmer: isLogin ? z.boolean().optional() : z.boolean(),
      }),
    ),
  });

  if (user) {
    setLocation("/");
    return null;
  }

  const onSubmit = (data: FormData) => {
    if (isLogin) {
      loginMutation.mutate({
        username: data.username,
        password: data.password,
      });
    } else {
      registerMutation.mutate({
        username: data.username,
        password: data.password,
        isFarmer: data.isFarmer,
      });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{isLogin ? "Welcome Back" : "Join Our Natural Farming Community"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...form.register("username")}
                  placeholder="Enter your username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <RadioGroup defaultValue="buyer" onValueChange={(value) => form.setValue("isFarmer", value === "farmer")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="farmer" id="farmer" />
                      <Label htmlFor="farmer">I am a farmer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buyer" id="buyer" />
                      <Label htmlFor="buyer">I am a buyer</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={loginMutation.isPending || registerMutation.isPending}
              >
                {(loginMutation.isPending || registerMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLogin ? "Sign In" : "Register Now"}
              </Button>

              <p className="text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:block bg-gray-100 p-8">
        <div className="h-full flex items-center justify-center">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Connect with local farmers and buyers
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join our community to get access to fresh, locally-sourced produce directly from farmers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}