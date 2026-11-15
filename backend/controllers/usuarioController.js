const usuarioModel = require('../models/usuarioModel');

// Actualizar perfil del usuario autenticado
const actualizarPerfil = async (req, res) => {
    try {
        const { nombre, correo, telefono } = req.body;

        if (!nombre || !correo) {
            return res.status(400).json({
                mensaje: 'El nombre y el correo son obligatorios'
            });
        }

        const usuarioActualizado = await usuarioModel.actualizarPerfil(
            req.usuario.id_usuario,
            nombre,
            correo,
            telefono || null
        );

        if (!usuarioActualizado) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        return res.status(200).json({
            mensaje: 'Perfil actualizado correctamente',
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.error('Error al actualizar perfil:', error.message);

        if (error.code === '23505') {
            return res.status(400).json({
                mensaje: 'El correo electrónico ya está registrado'
            });
        }

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

module.exports = {
    actualizarPerfil
};