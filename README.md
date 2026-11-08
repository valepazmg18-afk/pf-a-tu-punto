# A Tu Punto

**Marketplace de tejidos hechos a mano y a pedido.**

## Aplicación desplegada

La aplicación se encuentra disponible en Render:

**[Ver A Tu Punto](https://pf-a-tu-punto-hito2.onrender.com)**

## Descripción del proyecto

A Tu Punto es una plataforma web orientada a la comercialización de tejidos artesanales, donde los usuarios podrán explorar productos, revisar sus características y realizar compras.

La plataforma contempla un catálogo de productos administrado por un usuario con rol de administrador, además de funcionalidades de registro, inicio de sesión, perfil de usuario y carrito de compras.

El proyecto se desarrolla por etapas, comenzando con el diseño y documentación, seguido de la implementación del frontend y su posterior integración con una API REST.

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

### Backend (arquitectura definida para la integración)

- Node.js
- Express
- PostgreSQL
- API REST
- JSON Web Token (JWT)

## Funcionalidades principales

- Registro de usuarios.
- Inicio de sesión.
- Visualización del catálogo de productos.
- Consulta del detalle de cada producto.
- Administración del catálogo de productos.
- Agregar, editar y eliminar productos.
- Gestión de stock y tallas.
- Visualización y edición del perfil.
- Carrito de compras.
- Modificación de cantidades y eliminación de productos del carrito.
- Persistencia de productos, usuario y carrito mediante localStorage.
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
9. Preparación de servicios para la futura integración con la API REST.
10. Despliegue de la aplicación en Render.

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

## Instalación y ejecución local

Para ejecutar el proyecto en un entorno local:

1. Clonar el repositorio:

```bash
git clone https://github.com/valepazmg18-afk/pf-a-tu-punto.git
```

2. Ingresar a la carpeta del Hito 2:

```bash
cd pf-a-tu-punto/HITO2
```

3. Instalar las dependencias:

```bash
npm install
```

4. Ejecutar el proyecto:

```bash
npm run dev
```

5. Abrir en el navegador la dirección local indicada por Vite.

### Compilación para producción

Para generar la versión de producción:

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist`.

## Estado actual del proyecto

El proyecto cuenta con el diseño y documentación correspondientes al Hito 1 y el frontend funcional desarrollado durante el Hito 2.

La aplicación se encuentra desplegada en Render y permite probar sus principales funcionalidades.

**Consideraciones sobre la implementación actual:**

- El inicio de sesión utiliza una simulación local.
- Los productos y el carrito se gestionan mediante Context API y localStorage.
- El servicio de autenticación está preparado para una futura conexión con el backend.
- La integración real con la API REST y la autenticación mediante JWT quedan pendientes de implementación.

## Despliegue

**Plataforma:** Render

**URL pública:** https://pf-a-tu-punto-hito2.onrender.com

## Desarrollado por

**Valentina Muñoz**