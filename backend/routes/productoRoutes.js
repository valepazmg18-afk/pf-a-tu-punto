
const express = require("express");
const router = express.Router();

const productoController = require("../controllers/productoController");
const { verificarToken, verificarAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Obtener productos
router.get("/", productoController.obtenerProductos);

// Obtener un producto por ID
router.get("/:id", productoController.obtenerProducto);

// Crear producto (solo administrador)
router.post(
  "/",
  verificarToken,
  verificarAdmin,
  upload.single("imagen"),
  productoController.crearProducto
);

// Actualizar producto (solo administrador)
router.put(
  "/:id",
  verificarToken,
  verificarAdmin,
  upload.single("imagen"),
  productoController.actualizarProducto
);

// Eliminar producto (solo administrador)
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin,
  productoController.eliminarProducto
);

module.exports = router;
