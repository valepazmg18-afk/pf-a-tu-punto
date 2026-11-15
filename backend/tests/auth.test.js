const request = require('supertest');
const bcrypt = require('bcrypt');

jest.mock('../models/usuarioModel');
jest.mock('bcrypt');

const usuarioModel = require('../models/usuarioModel');
const app = require('../index');

describe('Pruebas de autenticación', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Prueba 1: registrar un usuario correctamente
    test('POST /api/auth/register debe responder 201', async () => {
        usuarioModel.buscarPorCorreo.mockResolvedValue(null);
        bcrypt.hash.mockResolvedValue('password_hash_prueba');

        usuarioModel.crear.mockResolvedValue({
            id_usuario: 2,
            nombre: 'Usuario Prueba',
            correo: 'nuevo@atupunto.cl',
            rol: 'cliente'
        });

        const respuesta = await request(app)
            .post('/api/auth/register')
            .send({
                nombre: 'Usuario Prueba',
                correo: 'nuevo@atupunto.cl',
                password: 'Prueba123'
            });

        expect(respuesta.status).toBe(201);
        expect(respuesta.body.mensaje).toBe(
            'Usuario registrado correctamente'
        );
        expect(bcrypt.hash).toHaveBeenCalled();
    });

    // Prueba 2: registrar sin completar los campos
    test('POST /api/auth/register sin datos debe responder 400', async () => {
        const respuesta = await request(app)
            .post('/api/auth/register')
            .send({
                nombre: 'Usuario Prueba'
            });

        expect(respuesta.status).toBe(400);
        expect(respuesta.body.mensaje).toBe(
            'Todos los campos son obligatorios'
        );
    });

    // Prueba 3: registrar un correo que ya existe
    test('POST /api/auth/register con correo existente debe responder 400', async () => {
        usuarioModel.buscarPorCorreo.mockResolvedValue({
            id_usuario: 1,
            correo: 'prueba@atupunto.cl'
        });

        const respuesta = await request(app)
            .post('/api/auth/register')
            .send({
                nombre: 'Usuario Prueba',
                correo: 'prueba@atupunto.cl',
                password: 'Prueba123'
            });

        expect(respuesta.status).toBe(400);
        expect(respuesta.body.mensaje).toBe(
            'El correo ya está registrado'
        );
    });

    // Prueba 4: iniciar sesión correctamente
    test('POST /api/auth/login debe responder 200', async () => {
        usuarioModel.buscarPorCorreo.mockResolvedValue({
            id_usuario: 1,
            nombre: 'Usuario Prueba',
            correo: 'prueba@atupunto.cl',
            password_hash: 'password_hash_prueba',
            rol: 'cliente'
        });

        bcrypt.compare.mockResolvedValue(true);

        const respuesta = await request(app)
            .post('/api/auth/login')
            .send({
                correo: 'prueba@atupunto.cl',
                password: 'Prueba123'
            });

        expect(respuesta.status).toBe(200);
        expect(respuesta.body.token).toBeDefined();
        expect(respuesta.body.usuario.rol).toBe('cliente');
    });

    // Prueba 5: iniciar sesión con contraseña incorrecta
    test('POST /api/auth/login con contraseña incorrecta debe responder 401', async () => {
        usuarioModel.buscarPorCorreo.mockResolvedValue({
            id_usuario: 1,
            nombre: 'Usuario Prueba',
            correo: 'prueba@atupunto.cl',
            password_hash: 'password_hash_prueba',
            rol: 'cliente'
        });

        bcrypt.compare.mockResolvedValue(false);

        const respuesta = await request(app)
            .post('/api/auth/login')
            .send({
                correo: 'prueba@atupunto.cl',
                password: 'Incorrecta123'
            });

        expect(respuesta.status).toBe(401);
        expect(respuesta.body.mensaje).toBe(
            'Credenciales incorrectas'
        );
    });

});
