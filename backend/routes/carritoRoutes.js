const express = require('express');
const router = express.Router();

const carritoController = require('../controllers/carritoController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Consultar el carrito del usuario autenticado
router.get('/', verificarToken, carritoController.obtenerCarrito);

// Agregar un producto al carrito
router.post('/detalles', verificarToken, carritoController.agregarProducto);

// Actualizar cantidad de un producto
router.put('/detalles/:id', verificarToken, carritoController.actualizarCantidad);

// Eliminar un producto del carrito
router.delete('/detalles/:id', verificarToken, carritoController.eliminarProducto);

module.exports = router;