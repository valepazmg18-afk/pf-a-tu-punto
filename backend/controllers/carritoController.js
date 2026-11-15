const carritoModel = require('../models/carritoModel');

// Consultar el carrito del usuario autenticado
const obtenerCarrito = async (req, res) => {
    try {
        const carrito = await carritoModel.obtenerCarrito(
            req.usuario.id_usuario
        );

        return res.status(200).json(
            carrito || { id_carrito: null, detalles: [] }
        );

    } catch (error) {
        console.error('Error al obtener carrito:', error.message);

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

// Agregar un producto al carrito
const agregarProducto = async (req, res) => {
    try {
        const { id_producto, cantidad } = req.body;

        if (
            !Number.isInteger(Number(id_producto)) ||
            Number(id_producto) <= 0 ||
            !Number.isInteger(Number(cantidad)) ||
            Number(cantidad) <= 0
        ) {
            return res.status(400).json({
                mensaje: 'El producto y la cantidad deben ser válidos'
            });
        }

        const detalle = await carritoModel.agregarProducto(
            req.usuario.id_usuario,
            Number(id_producto),
            Number(cantidad)
        );

        if (!detalle) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado o inactivo'
            });
        }

        return res.status(201).json({
            mensaje: 'Producto agregado al carrito correctamente',
            detalle
        });

    } catch (error) {
        console.error('Error al agregar producto:', error.message);

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

// Actualizar cantidad de un producto
const actualizarCantidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;

        if (
            !Number.isInteger(Number(id)) ||
            Number(id) <= 0 ||
            !Number.isInteger(Number(cantidad)) ||
            Number(cantidad) <= 0
        ) {
            return res.status(400).json({
                mensaje: 'El ID y la cantidad deben ser válidos'
            });
        }

        const detalle = await carritoModel.actualizarCantidad(
            req.usuario.id_usuario,
            Number(id),
            Number(cantidad)
        );

        if (!detalle) {
            return res.status(404).json({
                mensaje: 'Producto del carrito no encontrado'
            });
        }

        return res.status(200).json({
            mensaje: 'Cantidad actualizada correctamente',
            detalle
        });

    } catch (error) {
        console.error('Error al actualizar cantidad:', error.message);

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

// Eliminar un producto del carrito
const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                mensaje: 'El ID del detalle no es válido'
            });
        }

        const detalle = await carritoModel.eliminarProducto(
            req.usuario.id_usuario,
            Number(id)
        );

        if (!detalle) {
            return res.status(404).json({
                mensaje: 'Producto del carrito no encontrado'
            });
        }

        return res.status(200).json({
            mensaje: 'Producto eliminado del carrito correctamente'
        });

    } catch (error) {
        console.error('Error al eliminar producto:', error.message);

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

module.exports = {
    obtenerCarrito,
    agregarProducto,
    actualizarCantidad,
    eliminarProducto
};