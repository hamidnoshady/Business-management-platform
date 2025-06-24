'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../../lib/api';
import toast from 'react-hot-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/layout/ui/table";
import { Button } from '../../../../components/layout/ui/button';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: string;
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        // Note: This endpoint might not exist yet.
        const data = await apiFetch('CMS', 'pages');
        setPages(data);
      } catch (error: any) {
        toast.error('خطا در دریافت لیست صفحات: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPages();
  }, []);

  if (isLoading) return <div>در حال بارگذاری...</div>;

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">لیست صفحات</h1>
            <Button>افزودن صفحه</Button>
        </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان</TableHead>
              <TableHead>اسلاگ</TableHead>
              <TableHead>وضعیت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.length > 0 ? pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell>{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>{page.status}</TableCell>
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={3} className="text-center">صفحه‌ای یافت نشد.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
