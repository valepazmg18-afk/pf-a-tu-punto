const pool = require('../config/database');

// Obtener el carrito activo de un usuario
const obtenerCarrito = async (id_usuario) => {
    const consulta = `
        SELECT id_carrito
        FROM carritos
        WHERE id_usuario = $1
        AND estado = 'activo'
        ORDER BY id_carrito DESC
        LIMIT 1
    `;

    const resultado = await pool.query(consulta, [id_usuario]);

    if (resultado.rows.length === 0) {
        return null;
    }

    const id_carrito = resultado.rows[0].id_carrito;

    const consultaDetalles = `
        SELECT
            cd.id_detalle,
            cd.id_producto,
            p.nombre,
            p.imagen_url,
            cd.cantidad,
            cd.precio_unitario,
            cd.cantidad * cd.precio_unitario AS subtotal
        FROM carrito_detalles cd
        INNER JOIN productos p
            ON cd.id_producto = p.id_producto
        WHERE cd.id_carrito = $1
        ORDER BY cd.id_detalle
    `;

    const detalles = await pool.query(consultaDetalles, [id_carrito]);

    return {
        id_carrito,
        detalles: detalles.rows
    };
};

// Obtener o crear un carrito activo
const obtenerOCrearCarrito = async (id_usuario) => {
    let carrito = await pool.query(
        `SELECT id_carrito
         FROM carritos
         WHERE id_usuario = $1
         AND estado = 'activo'
         ORDER BY id_carrito DESC
         LIMIT 1`,
        [id_usuario]
    );

    if (carrito.rows.length === 0) {
        carrito = await pool.query(
            `INSERT INTO carritos (id_usuario)
             VALUES ($1)
             RETURNING id_carrito`,
            [id_usuario]
        );
    }

    return carrito.rows[0].id_carrito;
};

// Agregar un producto al carrito
const agregarProducto = async (id_usuario, id_producto, cantidad) => {
    const id_carrito = await obtenerOCrearCarrito(id_usuario);

    const consulta = `
        INSERT INTO carrito_detalles (
            id_carrito,
            id_producto,
            cantidad,
            precio_unitario
        )
        SELECT $1, id_producto, $3, precio
        FROM productos
        WHERE id_producto = $2
        AND activo = TRUE
        ON CONFLICT (id_carrito, id_producto)
        DO UPDATE SET
            cantidad = carrito_detalles.cantidad + EXCLUDED.cantidad
        RETURNING *
    `;

    const resultado = await pool.query(consulta, [
        id_carrito,
        id_producto,
        cantidad
    ]);

    return resultado.rows[0];
};

// Actualizar cantidad de un producto
const actualizarCantidad = async (id_usuario, id_detalle, cantidad) => {
    const consulta = `
        UPDATE carrito_detalles cd
        SET cantidad = $1
        FROM carritos c
        WHERE cd.id_carrito = c.id_carrito
        AND cd.id_detalle = $2
        AND c.id_usuario = $3
        AND c.estado = 'activo'
        RETURNING cd.*
    `;

    const resultado = await pool.query(consulta, [
        cantidad,
        id_detalle,
        id_usuario
    ]);

    return resultado.rows[0];
};

// Eliminar un producto del carrito
const eliminarProducto = async (id_usuario, id_detalle) => {
    const consulta = `
        DELETE FROM carrito_detalles cd
        USING carritos c
        WHERE cd.id_carrito = c.id_carrito
        AND cd.id_detalle = $1
        AND c.id_usuario = $2
        AND c.estado = 'activo'
        RETURNING cd.id_detalle
    `;

    const resultado = await pool.query(consulta, [
        id_detalle,
        id_usuario
    ]);

    return resultado.rows[0];
};

module.exports = {
    obtenerCarrito,
    obtenerOCrearCarrito,
    agregarProducto,
    actualizarCantidad,
    eliminarProducto
};