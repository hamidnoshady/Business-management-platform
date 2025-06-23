
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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">ورود</h1>
            <p className="text-balance text-muted-foreground">
              برای دسترسی به حساب کاربری خود، اطلاعات زیر را وارد کنید
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">رمز عبور</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    رمز عبور خود را فراموش کرده‌اید؟
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'در حال ورود...' : 'ورود'}
              </Button>
              <Button variant="outline" className="w-full">
                ورود با گوگل
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            حساب کاربری ندارید؟{' '}
            <Link href="/auth/register" className="underline">
              ثبت نام
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block"></div>
    </div>
  );
}
