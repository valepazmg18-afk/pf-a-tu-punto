# Contrato de API REST – A Tu Punto

## 1. Descripción general

La API REST de A Tu Punto permitirá la comunicación entre el frontend y el backend de la aplicación. Gestionará la autenticación de usuarios, administración de productos, información del perfil y operaciones del carrito de compras.

**Tecnologías:** Node.js, Express y PostgreSQL.

**Formato de intercambio:** JSON.

**URL base:** `http://localhost:3000/api`

## 2. Autenticación

### Registrar usuario

- **Método:** POST
- **Endpoint:** `/auth/register`
- **Acceso:** Público.

**Solicitud:**
```json
{
  "nombre": "Elena González",
  "correo": "elena.gonzalez@gmail.com",
  "password": "Password123"
}
```

**Respuesta (201 Created):**
```json
{
  "mensaje": "Usuario registrado correctamente"
}
```

### Iniciar sesión

- **Método:** POST
- **Endpoint:** `/auth/login`
- **Acceso:** Público.

**Solicitud:**
```json
{
  "correo": "elena.gonzalez@gmail.com",
  "password": "Password123"
}
```

**Respuesta (200 OK):**
```json
{
  "mensaje": "Inicio de sesión exitoso",
  "token": "jwt_token",
  "usuario": {
    "id_usuario": 1,
    "nombre": "Elena González",
    "correo": "elena.gonzalez@gmail.com",
    "rol": "cliente"
  }
}
```

## 3. Productos

### Listar productos

- **Método:** GET
- **Endpoint:** `/productos`
- **Acceso:** Público.

**Respuesta (200 OK):**
```json
[
  {
    "id_producto": 1,
    "nombre": "Manta a crochet",
    "descripcion": "Manta tejida a mano",
    "precio": 45000,
    "stock": 5,
    "imagen_url": "imagen.jpg",
    "medidas": "120 x 150 cm"
  }
]
```

### Obtener detalle de un producto

- **Método:** GET
- **Endpoint:** `/productos/:id`
- **Acceso:** Público.

**Respuesta (200 OK):**
```json
{
  "id_producto": 1,
  "nombre": "Manta a crochet",
  "precio": 45000,
  "descripcion": "Manta tejida a mano",
  "stock": 5
}
```

### Crear producto

- **Método:** POST
- **Endpoint:** `/productos`
- **Acceso:** Privado (administrador).

**Solicitud:**
```json
{
  "nombre": "Manta a crochet",
  "id_categoria": 1,
  "descripcion": "Manta tejida a mano",
  "precio": 45000,
  "stock": 5,
  "imagen_url": "imagen.jpg",
  "medidas": "120 x 150 cm"
}
```

### Editar producto

- **Método:** PUT
- **Endpoint:** `/productos/:id`
- **Acceso:** Privado (administrador).

### Eliminar producto

- **Método:** DELETE
- **Endpoint:** `/productos/:id`
- **Acceso:** Privado (administrador).

## 4. Perfil de usuario

### Obtener perfil

- **Método:** GET
- **Endpoint:** `/usuarios/perfil`
- **Acceso:** Privado (usuario autenticado).

**Respuesta (200 OK):**
```json
{
  "id_usuario": 1,
  "nombre": "Elena González",
  "correo": "elena.gonzalez@gmail.com",
  "telefono": "+56912345678"
}
```

### Actualizar perfil

- **Método:** PUT
- **Endpoint:** `/usuarios/perfil`
- **Acceso:** Privado (usuario autenticado).

**Solicitud:**
```json
{
  "nombre": "Elena González",
  "correo": "elena.gonzalez@gmail.com",
  "telefono": "+56912345678"
}
```

## 5. Carrito de compras

### Obtener carrito

- **Método:** GET
- **Endpoint:** `/carrito`
- **Acceso:** Privado (usuario autenticado).

### Agregar producto al carrito

- **Método:** POST
- **Endpoint:** `/carrito/detalles`
- **Acceso:** Privado (usuario autenticado).

**Solicitud:**
```json
{
  "id_producto": 1,
  "cantidad": 1
}
```

### Actualizar cantidad de un producto

- **Método:** PUT
- **Endpoint:** `/carrito/detalles/:id`
- **Acceso:** Privado (usuario autenticado).

**Solicitud:**
```json
{
  "cantidad": 2
}
```

### Eliminar producto del carrito

- **Método:** DELETE
- **Endpoint:** `/carrito/detalles/:id`
- **Acceso:** Privado (usuario autenticado).

## 6. Códigos de respuesta HTTP

| Código | Descripción |
|---|---|
| 200 | Solicitud procesada correctamente. |
| 201 | Recurso creado correctamente. |
| 400 | Solicitud incorrecta. |
| 401 | Usuario no autenticado. |
| 403 | Acceso denegado por permisos. |
| 404 | Recurso no encontrado. |
| 500 | Error interno del servidor. |

## 7. Consideraciones de seguridad

- Las contraseñas se almacenarán protegidas mediante hash.
- La autenticación utilizará tokens JWT.
- Las rutas privadas requerirán un token válido.
- Las operaciones de creación, edición y eliminación de productos estarán restringidas al administrador.
- El rol de administrador no podrá seleccionarse desde el formulario público de registro.
