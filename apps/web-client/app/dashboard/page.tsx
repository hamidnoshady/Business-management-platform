
'use client';
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/layout/ui/card";
import { Users, ShoppingCart } from "lucide-react";

export default function DashboardPage() {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">مشتریان جدید</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">+25</div>
                  <p className="text-xs text-muted-foreground">در ماه گذشته</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">فروش کل</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">۱,۲۵۰,۰۰۰ تومان</div>
                  <p className="text-xs text-muted-foreground">نسبت به ماه گذشته %۲۰+</p>
              </CardContent>
          </Card>
      </div>
    );
}
