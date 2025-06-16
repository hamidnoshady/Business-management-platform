
import { useAuthStore } from '@/stores/auth.store';

const API_URLS = {
  AUTH: 'http://localhost:3001',
  CRM: 'http://localhost:3002',
  SALES: 'http://localhost:3003',
  CMS: 'http://localhost:3004',
};

async function apiFetch(service: keyof typeof API_URLS, path: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token;
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URLS[service]}/${path}`, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || 'یک خطای ناشناخته رخ داد');
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') return null;
  
  return response.json();
}
export default apiFetch;

