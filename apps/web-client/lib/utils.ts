// ================================================================
// file: apps/web-client/lib/utils.ts
// توضیحات: فایل کمکی ضروری برای Shadcn/UI
// ================================================================
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
