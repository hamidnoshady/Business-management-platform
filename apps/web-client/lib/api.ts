import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../../stores/auth.store';

/**
 * یک instance از axios برای هر سرویس ایجاد می‌کنیم.
 * این کار به ما اجازه می‌دهد baseURL مجزا برای هرکدام داشته باشیم
 * و مدیریت Interceptor ها (مثلا برای افزودن توکن) ساده‌تر شود.
 */

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
});

export const crmApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CRM_API_URL,
});

export const salesApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SALES_API_URL,
});

/**
 * Interceptor برای درخواست‌ها
 * این تابع قبل از ارسال هر درخواست به API های CRM و Sales اجرا می‌شود.
 * توکن JWT را از Zustand (auth.store.ts) می‌خواند و به هدر Authorization اضافه می‌کند.
 */
const injectToken = (config: any) => {
    // دسترسی به توکن از طریق Zustand store
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

crmApi.interceptors.request.use(injectToken);
salesApi.interceptors.request.use(injectToken);

// شما می‌توانید Interceptor های دیگری برای مدیریت خطاها (response interceptors) نیز اضافه کنید.
// برای مثال، اگر خطای 401 (Unauthorized) دریافت شد، کاربر را به صفحه لاگین هدایت کنید.

type ServiceName = 'AUTH' | 'CRM' | 'SALES';

const apis = {
  AUTH: authApi,
  CRM: crmApi,
  SALES: salesApi,
};

export const apiFetch = async (service: ServiceName, url: string, options: AxiosRequestConfig = {}) => {
  const api = apis[service];
  if (!api) {
    throw new Error(`Invalid service name: ${service}`);
  }
  try {
    const response = await api({
      url,
      ...options,
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'An error occurred during the API request.');
    }
    throw new Error(error.message || 'An unknown error occurred.');
  }
};
