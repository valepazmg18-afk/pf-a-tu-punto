const jwt = require('jsonwebtoken');

// Verificar que el usuario tenga un token válido
const verificarToken = (req, res, next) => {
    try {
        const encabezado = req.headers.authorization;

        if (!encabezado || !encabezado.startsWith('Bearer ')) {
            return res.status(401).json({
                mensaje: 'No se proporcionó un token de autenticación'
            });
        }

        const token = encabezado.split(' ')[1];

        const datosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = datosUsuario;

        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: 'Token inválido o expirado'
        });
    }
};

// Verificar que el usuario tenga rol de administrador
const verificarAdmin = (req, res, next) => {
    if (!req.usuario || req.usuario.rol !== 'admin') {
        return res.status(403).json({
            mensaje: 'No tienes permisos para realizar esta acción'
        });
    }

    next();
};

module.exports = {
    verificarToken,
    verificarAdmin
};