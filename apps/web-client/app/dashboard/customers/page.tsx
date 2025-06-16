
'use client';
import { useEffect, useState } from 'react';
import apiFetch from '@/lib/api';
import toast from 'react-hot-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await apiFetch('CRM', 'customers');
        setCustomers(data);
      } catch (error: any) {
        toast.error('خطا در دریافت لیست مشتریان: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (isLoading) return <div>در حال بارگذاری...</div>;

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">لیست مشتریان</h1>
            <Button>افزودن مشتری</Button>
        </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>نام</TableHead>
              <TableHead>ایمیل</TableHead>
              <TableHead>تلفن</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length > 0 ? customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={3} className="text-center">مشتری یافت نشد.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
