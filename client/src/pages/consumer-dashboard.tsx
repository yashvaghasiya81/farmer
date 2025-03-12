import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ConsumerDashboard() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/consumer/dashboard"],
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Sarah!</h1>
              <p className="text-gray-600">Last login: Jan 15, 2025</p>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Recommended for you</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              name: "Organic Green Tea",
              price: "$24.99",
              image: "product-1.jpg",
            },
            {
              name: "Bamboo Water Bottle",
              price: "$34.99",
              image: "product-2.jpg",
            },
            {
              name: "Eco-friendly Tote",
              price: "$19.99",
              image: "product-3.jpg",
            },
          ].map((product) => (
            <Card key={product.name}>
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-md mb-4" />
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-lg font-bold mt-2">{product.price}</p>
                <Button className="w-full mt-4">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    id: "#12345",
                    product: "Organic Green Tea",
                    date: "Jan 14, 2025",
                    status: "Shipped",
                    amount: "$24.99",
                  },
                  {
                    id: "#12344",
                    product: "Bamboo Water Bottle",
                    date: "Jan 12, 2025",
                    status: "Delivered",
                    amount: "$34.99",
                  },
                  {
                    id: "#12343",
                    product: "Eco-friendly Tote",
                    date: "Jan 10, 2025",
                    status: "Delivered",
                    amount: "$19.99",
                  },
                ].map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Delivered" ? "secondary" : "default"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
