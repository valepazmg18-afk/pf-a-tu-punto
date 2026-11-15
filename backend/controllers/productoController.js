const productoModel = require("../models/productoModel");

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await productoModel.obtenerTodos();
    return res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Obtener un producto por ID
const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res
        .status(400)
        .json({ mensaje: "El ID del producto no es válido" });
    }

    const producto = await productoModel.buscarPorId(id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    return res.status(200).json(producto);
  } catch (error) {
    console.error("Error al obtener producto:", error.message);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Crear un producto
const crearProducto = async (req, res) => {
  try {
    const { nombre, id_categoria, precio, stock } = req.body;

    if (
      !nombre ||
      !id_categoria ||
      precio === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    if (
      !Number.isInteger(Number(id_categoria)) ||
      Number(id_categoria) <= 0 ||
      !Number.isFinite(Number(precio)) ||
      Number(precio) < 0 ||
      !Number.isInteger(Number(stock)) ||
      Number(stock) < 0
    ) {
      return res
        .status(400)
        .json({ mensaje: "Los datos del producto no son válidos" });
    }

    const datosProducto = {
      ...req.body,
      precio: Number(precio),
      stock: Number(stock),
      imagen_url: req.file
        ? `/uploads/productos/${req.file.filename}`
        : req.body.imagen_url || null,
    };

    const nuevoProducto = await productoModel.crear(datosProducto);

    return res.status(201).json({
      mensaje: "Producto creado correctamente",
      producto: nuevoProducto,
    });
  } catch (error) {
    console.error("Error al crear producto:", error.message);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, id_categoria, precio, stock } = req.body;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res
        .status(400)
        .json({ mensaje: "El ID del producto no es válido" });
    }

    if (
      !nombre ||
      !id_categoria ||
      precio === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    if (
      !Number.isInteger(Number(id_categoria)) ||
      Number(id_categoria) <= 0 ||
      !Number.isFinite(Number(precio)) ||
      Number(precio) < 0 ||
      !Number.isInteger(Number(stock)) ||
      Number(stock) < 0
    ) {
      return res
        .status(400)
        .json({ mensaje: "Los datos del producto no son válidos" });
    }

    const datosProducto = {
      ...req.body,
      precio: Number(precio),
      stock: Number(stock),
      imagen_url:
        req.body.eliminar_imagen === "true"
          ? null
          : req.file
            ? `/uploads/productos/${req.file.filename}`
            : req.body.imagen_url || undefined,
      eliminar_imagen: req.body.eliminar_imagen === "true",
    };

    const productoActualizado = await productoModel.actualizar(
      id,
      datosProducto,
    );

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    return res.status(200).json({
      mensaje: "Producto actualizado correctamente",
      producto: productoActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error.message);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Desactivar un producto
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res
        .status(400)
        .json({ mensaje: "El ID del producto no es válido" });
    }

    const productoEliminado = await productoModel.eliminar(id);

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    return res.status(200).json({
      mensaje: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error.message);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
