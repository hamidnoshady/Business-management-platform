
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiFetch from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tenantName, setTenantName] = useState('');
    const [tenantSubdomain, setTenantSubdomain] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setToken, setUser } = useAuthStore();
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await apiFetch('AUTH', 'auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password, tenantName, tenantSubdomain }),
            });
            setToken(data.accessToken);
            const profile = await apiFetch('AUTH', 'auth/profile');
            setUser(profile);
            toast.success('ثبت‌نام با موفقیت انجام شد!');
            router.push('/dashboard');
        } catch (error: any) {
            toast.error(error.message || 'خطا در ثبت‌نام.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">ایجاد حساب کاربری جدید</CardTitle>
              <CardDescription>اطلاعات کسب‌وکار و کاربر ادمین را وارد کنید.</CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tenantName">نام کسب‌وکار</Label>
                  <Input id="tenantName" value={tenantName} onChange={(e) => setTenantName(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tenantSubdomain">زیر دامنه (فقط حروف انگلیسی)</Label>
                  <Input id="tenantSubdomain" value={tenantSubdomain} onChange={(e) => setTenantSubdomain(e.target.value.toLowerCase())} required />
                </div>
                 <hr/>
                <div className="grid gap-2">
                  <Label htmlFor="email">ایمیل ادمین</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">رمز عبور (حداقل ۸ کاراکتر)</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'در حال ثبت‌نام...' : 'ثبت‌نام و ایجاد کسب‌وکار'}
                </Button>
                <p className="mt-4 text-xs text-center text-gray-700">
                  قبلاً ثبت‌نام کرده‌اید؟{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    وارد شوید
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
    );
}
