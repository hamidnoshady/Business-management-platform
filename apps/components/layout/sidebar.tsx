
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, ShoppingCart, FileText, Settings } from 'lucide-react';
import { cn } from '@/lib/utils'; // یک تابع کمکی از Shadcn برای ترکیب کلاس‌های CSS

export function Sidebar() {
  const pathname = usePathname();
  const navItems = [
    { href: '/dashboard', label: 'داشبورد', icon: Home },
    { href: '/dashboard/customers', label: 'مشتریان', icon: Users },
    { href: '/dashboard/products', label: 'محصولات', icon: ShoppingCart },
    { href: '/dashboard/orders', label: 'سفارشات', icon: FileText },
    { href: '/dashboard/pages', label: 'صفحات سایت', icon: FileText },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-l bg-gray-50 p-4">
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-bold mb-8">مدیریت پلتفرم</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-200",
                pathname === item.href && "bg-gray-900 text-white hover:bg-gray-800"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

