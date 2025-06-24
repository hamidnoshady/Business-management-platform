
'use client';
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { setToken } = useAuthStore();

  useEffect(() => {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const { state } = JSON.parse(authStorage);
      if (state.token) {
        setToken(state.token);
      }
    }
  }, [setToken]);

  return (
    <html lang="fa" dir="rtl">
      <body className="dark">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
