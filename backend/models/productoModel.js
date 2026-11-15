const pool = require("../config/database");

// Obtener todos los productos activos
const obtenerTodos = async () => {
  const consulta = `
        SELECT
            id_producto,
            nombre,
            descripcion,
            precio,
            stock,
            imagen_url,
            imagen_eliminada,
            medidas
        FROM productos
        WHERE activo = TRUE
        ORDER BY id_producto
    `;

  const resultado = await pool.query(consulta);

  return resultado.rows;
};

// Buscar un producto por su ID
const buscarPorId = async (id_producto) => {
  const consulta = `
        SELECT
            id_producto,
            nombre,
            descripcion,
            precio,
            stock,
            imagen_url,
            imagen_eliminada,
            medidas
        FROM productos
        WHERE id_producto = $1
        AND activo = TRUE
    `;

  const resultado = await pool.query(consulta, [id_producto]);

  return resultado.rows[0];
};

// Crear un producto
const crear = async (producto) => {
  const {
    nombre,
    id_categoria,
    descripcion,
    precio,
    stock,
    imagen_url,
    medidas,
    imagen_eliminada,
  } = producto;

  const consulta = `
        INSERT INTO productos (
            nombre,
            id_categoria,
            descripcion,
            precio,
            stock,
            imagen_url,
            medidas
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, FALSE)
        RETURNING *
    `;

  const resultado = await pool.query(consulta, [
    nombre,
    id_categoria,
    descripcion,
    precio,
    stock,
    imagen_url,
    medidas,
  ]);

  return resultado.rows[0];
};

// Actualizar un producto

const actualizar = async (id_producto, producto) => {
  const {
    nombre,
    id_categoria,
    descripcion,
    precio,
    stock,
    imagen_url,
    medidas,
  } = producto;

  const consulta = `
    UPDATE productos
    SET nombre = $1,
        id_categoria = $2,
        descripcion = $3,
        precio = $4,
        stock = $5,
        imagen_url = CASE
            WHEN $9 = TRUE THEN NULL
            ELSE COALESCE($6, imagen_url)
        END,
        imagen_eliminada = CASE
            WHEN $9 = TRUE THEN TRUE
            WHEN $6 IS NOT NULL THEN FALSE
            ELSE imagen_eliminada
        END,
        medidas = $7
    WHERE id_producto = $8
    AND activo = TRUE
    RETURNING *
`;

  const resultado = await pool.query(consulta, [
    nombre,
    id_categoria,
    descripcion,
    precio,
    stock,
    imagen_url ?? null,
    medidas,
    id_producto,
    producto.eliminar_imagen === true,
  ]);

  return resultado.rows[0];
};

// Desactivar un producto (eliminación lógica)
const eliminar = async (id_producto) => {
  const consulta = `
        UPDATE productos
        SET activo = FALSE
        WHERE id_producto = $1
        AND activo = TRUE
        RETURNING id_producto
    `;

  const resultado = await pool.query(consulta, [id_producto]);

  return resultado.rows[0];
};

module.exports = {
  obtenerTodos,
  buscarPorId,
  crear,
  actualizar,
  eliminar,
};
