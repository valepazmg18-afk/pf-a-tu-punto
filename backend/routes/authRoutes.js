const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Registro de usuarios
router.post('/register', authController.registrar);

// Inicio de sesión
router.post('/login', authController.iniciarSesion);

module.exports = router;