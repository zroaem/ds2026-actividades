import { obtenerToken } from './sesion';

type ApiErrorBody = { error?: string };

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);

  const token = obtenerToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  if (options?.body != null && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers,
  });

  const cuerpo = (await res.json().catch(() => null)) as
    | (T & ApiErrorBody)
    | ApiErrorBody
    | null;

  if (!res.ok) {
    if (res.status === 401 && obtenerToken()) {
      window.dispatchEvent(new Event('sesion-expirada'));
    }

    const mensaje = cuerpo?.error;
    throw new ApiError(mensaje ?? `Error ${res.status}`, res.status);
  }

  return cuerpo as T;
}
