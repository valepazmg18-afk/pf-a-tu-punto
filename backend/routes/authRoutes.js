const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { verificarToken } = require('../middlewares/authMiddleware');

console.log("Controlador cargado desde:", require.resolve("../controllers/authController"));
console.log("Funciones del controlador:", Object.keys(authController));

// Registro de usuarios
router.post('/register', authController.registrar);

// Inicio de sesión
router.post('/login', authController.iniciarSesion);

console.log('verificarToken:', typeof verificarToken);
console.log('actualizarPerfil:', typeof authController.actualizarPerfil);

// Actualizar perfil de usuario
router.put('/perfil', verificarToken, authController.actualizarPerfil);

module.exports = router;