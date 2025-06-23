import { redirect } from 'next/navigation';

export default function HomePage() {
  // این تابع به صورت خودکار در سمت سرور اجرا شده و کاربر را به صفحه ورود هدایت می‌کند
  redirect('/auth/login');

  // چون هدایت در سمت سرور انجام می‌شود، این کامپوننت هرگز رندر نخواهد شد
  return null;
}
