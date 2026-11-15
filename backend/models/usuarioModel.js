const pool = require('../config/database');

// Buscar un usuario por su correo electrónico
const buscarPorCorreo = async (correo) => {
    const consulta = `
        SELECT *
        FROM usuarios
        WHERE correo = $1
    `;

    const resultado = await pool.query(consulta, [correo]);

    return resultado.rows[0];
};

// Buscar un usuario por su ID
const buscarPorId = async (id_usuario) => {
    const consulta = `
        SELECT id_usuario, nombre, correo, telefono, rol
        FROM usuarios
        WHERE id_usuario = $1
    `;

    const resultado = await pool.query(consulta, [id_usuario]);

    return resultado.rows[0];
};

// Registrar un nuevo usuario
const crear = async (nombre, correo, password_hash) => {
    const consulta = `
        INSERT INTO usuarios (nombre, correo, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id_usuario, nombre, correo, rol
    `;

    const resultado = await pool.query(consulta, [
        nombre,
        correo,
        password_hash
    ]);

    return resultado.rows[0];
};

// Actualizar perfil de un usuario
const actualizarPerfil = async (id_usuario, nombre, correo, telefono) => {
    const consulta = `
        UPDATE usuarios
        SET nombre = $1,
            correo = $2,
            telefono = $3
        WHERE id_usuario = $4
        RETURNING id_usuario, nombre, correo, telefono, rol
    `;

    const resultado = await pool.query(consulta, [
        nombre,
        correo,
        telefono,
        id_usuario
    ]);

    return resultado.rows[0];
};

module.exports = {
    buscarPorCorreo,
    buscarPorId,
    crear,
    actualizarPerfil
};