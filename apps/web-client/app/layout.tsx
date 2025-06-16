
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "پلتفرم مدیریت کسب‌وکار",
  description: "راهکاری یکپارچه برای مدیریت کسب‌وکار شما",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="dark">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
