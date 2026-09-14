# Backend - Librería API

API REST de la librería (Express + Prisma + PostgreSQL).

## Notas - Ejercicio C19

- Se integró el frontend con el backend vía `apiFetch` (base `VITE_API_URL`, header `Authorization: Bearer <token>`).
- Login real: `POST /api/auth/login` guarda el token en `localStorage` y redirige a `/catalogo`.
- Alta de libros real desde el frontend: `POST /api/libros`, protegida con rol `ADMIN`.
- CORS habilitado para el origin del frontend (`FRONTEND_URL` en `.env`).
- Rutas inexistentes devuelven `404` en JSON (middleware `notFound`).

Aparte: se agregaron CRUDs completos de Categoria y Usuario a modo de práctica, no porque los pidiera el ejercicio.