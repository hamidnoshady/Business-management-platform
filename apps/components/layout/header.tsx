
'use client';
import { useAuthStore } from '../../stores/auth.store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success('شما با موفقیت خارج شدید.');
    router.push('/login');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        {/* میتواند شامل جستجو یا موارد دیگر باشد */}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          خروج
        </Button>
      </div>
    </header>
  );
}
