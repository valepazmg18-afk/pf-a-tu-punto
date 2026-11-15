# A Tu Punto

**Marketplace de tejidos hechos a mano y a pedido.**

## Aplicación desplegada

La aplicación frontend se encuentra disponible en Render:

**[Ver A Tu Punto](https://pf-a-tu-punto-hito2.onrender.com)**

## Descripción del proyecto

A Tu Punto es una plataforma web orientada a la comercialización de tejidos artesanales, donde los usuarios pueden explorar productos, revisar sus características y realizar compras.

La plataforma contempla un catálogo de productos administrado por un usuario con rol de administrador, además de funcionalidades de registro, inicio de sesión, perfil de usuario y carrito de compras.

El proyecto se desarrolla por etapas, integrando una aplicación frontend construida con React y una API REST desarrollada con Node.js y Express, conectada a una base de datos PostgreSQL.

## Tecnologías

### Frontend

- React
- Vite
- JavaScript
- React Router DOM
- Context API
- CSS
- Bootstrap
- Lucide React
- EmailJS

### Backend

- Node.js
- Express
- PostgreSQL
- pg
- JSON Web Token (JWT)
- bcrypt
- CORS
- Multer
- dotenv
- Jest
- Supertest

## Funcionalidades principales

- Registro de usuarios.
- Inicio de sesión y autenticación mediante JWT.
- Autorización de usuarios según su rol.
- Visualización del catálogo de productos.
- Consulta del detalle de cada producto.
- Administración del catálogo de productos.
- Creación, edición y eliminación lógica de productos.
- Carga, actualización y eliminación de imágenes.
- Gestión de stock, colores y tallas.
- Visualización y edición del perfil.
- Carrito de compras asociado al usuario autenticado.
- Modificación de cantidades y eliminación de productos del carrito.
- Persistencia de usuarios, productos y carritos mediante PostgreSQL.
- Formulario de contacto para solicitudes personalizadas mediante EmailJS.

## Estructura del proyecto

```text
pf-a-tu-punto/
├── HITO1/
│   ├── api/
│   ├── base-datos/
│   ├── dependencias/
│   ├── diseno-interfaz/
│   └── navegacion/
│
├── HITO2/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── css/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── services/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── uploads/
│   ├── index.js
│   ├── package.json
│   └── script.sql
│
└── README.md
```

## Hito 1 – Diseño y prototipo

Este hito contempla los siguientes entregables:

1. Diseño de interfaz gráfica.
2. Diagrama de navegación entre vistas.
3. Listado de dependencias.
4. Diseño de tablas y relaciones de la base de datos.
5. Contrato de datos de la API REST.

La etapa de diseño y documentación fue desarrollada y entregada previamente.

## Hito 2 – Desarrollo del frontend

En esta etapa se implementó la aplicación frontend utilizando React y Vite.

Los principales aspectos desarrollados son:

1. Configuración del proyecto y sus dependencias.
2. Navegación entre páginas mediante React Router DOM.
3. Creación de componentes reutilizables.
4. Implementación de Hooks de React.
5. Gestión de estados globales mediante Context API.
6. Desarrollo de las páginas principales del marketplace.
7. Implementación de funcionalidades de catálogo, perfil y carrito.
8. Administración de productos.
9. Preparación de servicios para el consumo de la API REST.
10. Despliegue de la aplicación frontend en Render.

### Organización de componentes y contextos

**Componentes:**
- Navbar.
- Footer.
- ProductCard.
- Toast.
- ProtectedRoute.

**Contextos:**
- AuthContext: gestión del estado de autenticación del usuario.
- ProductContext: gestión global de productos.
- CartContext: gestión global del carrito de compras.

**Páginas:**
- Inicio.
- Inicio de sesión.
- Registro.
- Galería de productos.
- Detalle del producto.
- Perfil de usuario.
- Carrito de compras.
- Panel de administración.
- Gestión de productos.

## Hito 3 – Desarrollo del backend

En esta etapa se desarrolló una API REST utilizando Node.js y Express, conectada a PostgreSQL.

Los principales aspectos implementados son:

1. Creación de un proyecto npm independiente para el backend.
2. Configuración de la conexión a PostgreSQL mediante el paquete pg.
3. Implementación de modelos para la gestión de usuarios, productos y carritos.
4. Creación de rutas y controladores para las operaciones de la API REST.
5. Implementación del registro e inicio de sesión de usuarios.
6. Autenticación mediante JSON Web Token (JWT).
7. Encriptación de contraseñas mediante bcrypt.
8. Autorización de operaciones según el rol del usuario.
9. Implementación de CORS.
10. Creación de middlewares para validar tokens y permisos.
11. Implementación de carga y gestión de imágenes mediante Multer.
12. Integración del frontend con el backend.
13. Pruebas de rutas mediante Thunder Client.
14. Pruebas automatizadas mediante Jest y Supertest.

### Pruebas automatizadas

Se implementaron cuatro suites de pruebas:

- `auth.test.js`: registro e inicio de sesión.
- `usuarios.test.js`: consulta y actualización del perfil.
- `productos.test.js`: consulta y creación de productos.
- `carrito.test.js`: consulta, incorporación, actualización y eliminación de productos del carrito.

**Resultado de la última ejecución:**

- 4 suites aprobadas.
- 20 pruebas aprobadas.
- 0 pruebas fallidas.

## Instalación y ejecución local

### Requisitos previos

- Node.js y npm.
- PostgreSQL.
- Git.

### 1. Clonar el repositorio

```bash
git clone https://github.com/valepazmg18-afk/pf-a-tu-punto.git
```

### 2. Configurar la base de datos

Crear la base de datos PostgreSQL `a_tu_punto` y ejecutar el script SQL disponible en `backend/script.sql`.

### 3. Configurar el backend

Ingresar a la carpeta:

```bash
cd pf-a-tu-punto/backend
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` con las variables de conexión a PostgreSQL y configuración JWT requeridas por `config/database.js` y el middleware de autenticación.

### 4. Ejecutar el backend

```bash
npm run dev
```

El backend utiliza el puerto 3000 por defecto.

### 5. Configurar el frontend

Abrir otra terminal e ingresar a:

```bash
cd pf-a-tu-punto/HITO2
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el frontend:

```bash
npm run dev
```

Abrir en el navegador la dirección local indicada por Vite.

### Compilación para producción

Para generar la versión de producción del frontend:

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist`.

### Ejecución de pruebas del backend

Desde la carpeta `backend` ejecutar:

```bash
npm test
```

## Estado actual del proyecto

El proyecto cuenta con las etapas de diseño, desarrollo frontend y desarrollo backend implementadas.

La aplicación frontend se encuentra desplegada en Render. La integración entre frontend y backend fue probada en entorno local, verificando las funcionalidades principales de autenticación, administración de productos y carrito de compras.

El backend se encuentra desplegado en Render, cuenta con pruebas automatizadas y conexión a una base de datos PostgreSQL.

**Nota:** La URL pública indicada corresponde al frontend. Aunque el backend y la base de datos PostgreSQL ya se encuentran desplegados en Render, la conexión entre el frontend y la API en producción está pendiente de configuración. Por este motivo, los productos y las funcionalidades que dependen de su consulta al backend podrían no visualizarse o funcionar correctamente en el entorno desplegado.

## Despliegue

**Plataforma frontend:** Render

**URL pública:** https://pf-a-tu-punto-hito2.onrender.com

**Plataforma backend:** Render

**Base de datos:** PostgreSQL (Render)

## Desarrollado por

**Valentina Muñoz**