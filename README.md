# Proyecto Final - API REST de Productos

API REST para gestión de productos con autenticación JWT y Firebase Firestore.

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar Cloud Firestore
3. Copiar las credenciales del proyecto
4. Completar el archivo `.env` con los datos de Firebase

### 3. Variables de entorno (.env)

```
PORT=3000
JWT_SECRET=tu_clave_secreta
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
```

### 4. Iniciar servidor

```bash
npm start
```

## Endpoints

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/login` | Login y obtención de token JWT |

**Body:**
```json
{
  "email": "admin@techlab.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Productos (requieren token Bearer)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:id` | Obtener producto por ID |
| POST | `/api/products/create` | Crear nuevo producto |
| PUT | `/api/products/:id` | Actualizar producto |
| DELETE | `/api/products/:id` | Eliminar producto |

**Headers para productos:**
```
Authorization: Bearer <token>
```

**Body (POST /api/products/create):**
```json
{
  "title": "Producto Ejemplo",
  "description": "Descripción del producto",
  "category": "electrónica",
  "price": 100,
  "stock": 10
}
```

## Códigos de error

| Código | Descripción |
|--------|-------------|
| 400 | Campos obligatorios faltantes o tipos inválidos |
| 401 | Credenciales inválidas / Token no proporcionado |
| 403 | Token inválido o expirado |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

## Arquitectura

```
src/
├── app.js              # Configuración de Express
├── config/             # Configuración de Firebase
├── controllers/        # Manejo de req/res
├── middlewares/         # Middleware de autenticación JWT
├── models/             # Acceso a Firestore
├── routes/             # Definición de rutas
└── services/           # Lógica de negocio
```
