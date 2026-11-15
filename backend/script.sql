
-- =========================================
-- BASE DE DATOS: A TU PUNTO
-- =========================================

-- 1. Tabla USUARIOS
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    rol VARCHAR(20) NOT NULL DEFAULT 'cliente'
        CHECK (rol IN ('cliente', 'admin'))
);

-- 2. Tabla CATEGORIAS
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);


-- 3. Tabla PRODUCTOS
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    id_categoria INTEGER NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(12, 2) NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    imagen_url TEXT,
    medidas VARCHAR(100),
    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categorias(id_categoria)
);

-- 4. Tabla TALLAS
CREATE TABLE tallas (
    id_talla SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);


-- 5. Tabla PRODUCTOS_TALLAS
CREATE TABLE productos_tallas (
    id_producto_talla SERIAL PRIMARY KEY,
    id_producto INTEGER NOT NULL,
    id_talla INTEGER NOT NULL,

    CONSTRAINT fk_productos_tallas_producto
        FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto),

    CONSTRAINT fk_productos_tallas_talla
        FOREIGN KEY (id_talla)
        REFERENCES tallas(id_talla),

    CONSTRAINT unique_producto_talla
        UNIQUE (id_producto, id_talla)
);


-- 6. Tabla CARRITOS
CREATE TABLE carritos (
    id_carrito SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo'
        CHECK (estado IN ('activo', 'finalizado', 'abandonado')),

    CONSTRAINT fk_carrito_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);

-- 7. Tabla CARRITO_DETALLES
CREATE TABLE carrito_detalles (
    id_detalle SERIAL PRIMARY KEY,
    id_carrito INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(12, 2) NOT NULL
        CHECK (precio_unitario >= 0),

    CONSTRAINT fk_detalle_carrito
        FOREIGN KEY (id_carrito)
        REFERENCES carritos(id_carrito),

    CONSTRAINT fk_detalle_producto
        FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto),

    CONSTRAINT unique_carrito_producto
        UNIQUE (id_carrito, id_producto)
);

