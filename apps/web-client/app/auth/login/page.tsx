
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useAuthStore } from '../../../../stores/auth.store';
import { Button } from '../../../../components/layout/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/layout/ui/card';
import { Input } from '../../../../components/layout/ui/input';
import { Label } from '../../../../components/layout/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, setUser } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await apiFetch('AUTH', 'auth/login', {
        method: 'POST',
        data: { email, password },
      });
      setToken(data.accessToken);
      const profile = await apiFetch('AUTH', 'auth/profile');
      setUser(profile);
      toast.success('ورود با موفقیت انجام شد!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'ایمیل یا رمز عبور نامعتبر است.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">ورود به حساب کاربری</CardTitle>
          <CardDescription>برای دسترسی به داشبورد، وارد شوید.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'در حال ورود...' : 'ورود'}
            </Button>
            <p className="mt-4 text-xs text-center text-gray-700">
              حساب کاربری ندارید؟{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                ثبت نام کنید
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
