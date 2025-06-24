'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../../lib/api';
import toast from 'react-hot-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/layout/ui/table";
import { Button } from '../../../../components/layout/ui/button';

interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiFetch('SALES', 'orders');
        setOrders(data);
      } catch (error: any) {
        toast.error('خطا در دریافت لیست سفارشات: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) return <div>در حال بارگذاری...</div>;

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">لیست سفارشات</h1>
            <Button>افزودن سفارش</Button>
        </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>نام مشتری</TableHead>
              <TableHead>تاریخ سفارش</TableHead>
              <TableHead>مبلغ کل</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString('fa-IR')}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={3} className="text-center">سفارشی یافت نشد.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
