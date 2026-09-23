# Mini API RESTful – Registro y Consulta de Inversiones con Roles

API en **Node.js + Express** para gestionar inversiones simuladas de asesores financieros, con autenticación JWT y control de acceso por roles (`admin` / `analyst`).

## Stack

- Node.js + Express 5
- jsonwebtoken (JWT)
- bcryptjs (hash de contraseñas)
- Datos en memoria (sin base de datos)

## Estructura

```
backend/
├── src/
│   ├── controllers/       # Lógica de request/response
│   │   ├── authController.js
│   │   └── investmentController.js
│   ├── services/          # Lógica de negocio
│   │   ├── authService.js
│   │   └── investmentService.js
│   ├── middlewares/
│   │   ├── authMiddleware.js   # Valida el JWT
│   │   └── roleMiddleware.js   # Valida el rol (admin/analyst)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── investmentRoutes.js
│   ├── data/               # "Base de datos" en memoria
│   │   ├── users.js
│   │   └── investments.js
│   ├── utils/jwt.js
│   ├── app.js               # Configuración de Express
│   └── server.js            # Punto de entrada
├── postman_collection.json
└── .env.example
```

## Instalación y ejecución local

Requisitos: Node.js 18+

```bash
cd backend
npm install
cp .env.example .env
npm run dev     # con nodemon (recarga automática)
# o
npm start       # sin nodemon
```

El servidor queda disponible en `http://localhost:4000`.

## Usuarios de prueba (hardcoded)

| Usuario   | Password      | Rol      |
|-----------|---------------|----------|
| `admin`   | `admin123`    | admin    |
| `analyst` | `analyst123`  | analyst  |

## Endpoints

### `POST /login`
Autentica al usuario y retorna un JWT.

```bash
curl -X POST http://localhost:4000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Respuesta:
```json
{
  "token": "eyJhbGciOi...",
  "user": { "id": 1, "username": "admin", "role": "admin" }
}
```

### `GET /inversiones` (protegido — cualquier rol autenticado)
Lista todas las inversiones.

```bash
curl http://localhost:4000/inversiones \
  -H "Authorization: Bearer <TOKEN>"
```

### `POST /inversiones` (protegido — solo `admin`)
Agrega una inversión.

```bash
curl -X POST http://localhost:4000/inversiones \
  -H "Authorization: Bearer <TOKEN_ADMIN>" \
  -H "Content-Type: application/json" \
  -d '{
    "cliente": "Juan Pérez",
    "activo": "Tesla Inc. (TSLA)",
    "monto": 2000,
    "tipo": "Acción",
    "fecha": "2025-09-01",
    "rentabilidad": 7.5
  }'
```

Si el usuario tiene rol `analyst`, la respuesta será `403 Forbidden`.

### `DELETE /inversiones/:id` (protegido — solo `admin`)
Elimina una inversión por id.

```bash
curl -X DELETE http://localhost:4000/inversiones/1 \
  -H "Authorization: Bearer <TOKEN_ADMIN>"
```

## Modelo de inversión

```json
{
  "id": 1,
  "cliente": "Juan Pérez",
  "activo": "Apple Inc. (AAPL)",
  "monto": 5000,
  "tipo": "Acción",
  "fecha": "2025-01-15",
  "rentabilidad": 12.4
}
```

## Probar con Postman

1. Importa el archivo [`postman_collection.json`](./postman_collection.json) en Postman.
2. Ejecuta la request **Login - admin** (o **Login - analyst**).
3. Copia el `token` de la respuesta y pégalo en la variable de colección `token` (o en cada request, en el header `Authorization: Bearer <token>`).
4. Prueba `GET/POST/DELETE Inversiones`.

## Notas de diseño

- Las contraseñas nunca se guardan en texto plano: se almacenan con hash `bcrypt`.
- El middleware `authMiddleware` valida la firma y expiración del JWT; `roleMiddleware` valida el rol contra los roles permitidos en cada ruta.
- Los datos viven en memoria (`src/data`) y se reinician cada vez que el servidor se reinicia, tal como permite el enunciado.
