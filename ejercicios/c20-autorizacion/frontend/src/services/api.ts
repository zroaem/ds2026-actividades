type ApiErrorBody = { error?: string };

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);

  const token = localStorage.getItem("token");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  if (options?.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
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
    const mensaje = cuerpo?.error;
    throw new Error(mensaje ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}