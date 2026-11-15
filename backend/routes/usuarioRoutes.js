const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

const usuarioModel = require('../models/usuarioModel');
const { verificarToken } = require('../middlewares/authMiddleware');

// Consultar perfil del usuario autenticado
router.get('/perfil', verificarToken, async (req, res) => {
    try {
        const usuario = await usuarioModel.buscarPorId(
            req.usuario.id_usuario
        );

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        return res.status(200).json(usuario);

    } catch (error) {
        console.error('Error al consultar perfil:', error.message);

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
});

// Actualizar perfil del usuario autenticado
router.put('/perfil', verificarToken, usuarioController.actualizarPerfil);

module.exports = router;