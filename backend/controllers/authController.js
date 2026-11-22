const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuarioModel");

// Registrar un usuario
const registrar = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    // Validar los datos recibidos
    if (!nombre || !correo || !password) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios",
      });
    }

    // Comprobar si el correo ya está registrado
    const usuarioExistente = await usuarioModel.buscarPorCorreo(correo);

    if (usuarioExistente) {
      return res.status(400).json({
        mensaje: "El correo ya está registrado",
      });
    }

    // Encriptar la contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // Crear el usuario
    const nuevoUsuario = await usuarioModel.crear(
      nombre,
      correo,
      password_hash,
    );

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};

// Iniciar sesión
const iniciarSesion = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({
        mensaje: "Correo y contraseña son obligatorios",
      });
    }

    // Buscar usuario por correo
    const usuario = await usuarioModel.buscarPorCorreo(correo);

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas",
      });
    }

    // Comparar contraseña con el hash almacenado
    const passwordValida = await bcrypt.compare(
      password,
      usuario.password_hash,
    );

    if (!passwordValida) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas",
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};

// Actualizar perfil de usuario
const actualizarPerfil = async (req, res) => {
  try {
    const { nombre, correo, telefono } = req.body;
    const id_usuario = req.usuario.id_usuario;

    if (!nombre || !correo) {
      return res.status(400).json({
        mensaje: "Nombre y correo son obligatorios",
      });
    }

    // Verificar si el correo ya pertenece a otro usuario
    const usuarioExistente = await usuarioModel.buscarPorCorreo(correo);

    if (usuarioExistente && usuarioExistente.id_usuario !== id_usuario) {
      return res.status(400).json({
        mensaje: "El correo ya está registrado por otro usuario",
      });
    }

    const usuarioActualizado = await usuarioModel.actualizarPerfil(
      id_usuario,
      nombre,
      correo,
      telefono,
    );

    return res.status(200).json({
      mensaje: "Perfil actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar perfil:", error.message);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};

module.exports = {
  registrar,
  iniciarSesion,
  actualizarPerfil,
};
