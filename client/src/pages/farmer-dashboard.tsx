import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2, Package, Clock, Gauge } from "lucide-react";

export default function FarmerDashboard() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/farmer/dashboard"],
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>JF</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">John's Farm</h1>
              <p className="text-gray-600">Dashboard Overview</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,500</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                6 closing today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory</CardTitle>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">
                12 low stock items
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Active Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    product: "Organic Tomatoes",
                    endsIn: "2h 45m",
                    currentBid: "$34.50/kg",
                  },
                  {
                    product: "Fresh Apples",
                    endsIn: "3h 20m",
                    currentBid: "$28.75/kg",
                  },
                ].map((bid) => (
                  <div
                    key={bid.product}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-gray-200 rounded-md" />
                      <div>
                        <p className="font-medium">{bid.product}</p>
                        <p className="text-sm text-gray-600">
                          Ends in {bid.endsIn}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">Current Bid</p>
                      <p className="text-sm text-gray-600">{bid.currentBid}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { day: "Mon", earnings: 120 },
                      { day: "Tue", earnings: 150 },
                      { day: "Wed", earnings: 200 },
                      { day: "Thu", earnings: 180 },
                      { day: "Fri", earnings: 250 },
                      { day: "Sat", earnings: 300 },
                      { day: "Sun", earnings: 280 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="earnings"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
