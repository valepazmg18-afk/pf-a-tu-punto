
const request = require('supertest');
const jwt = require('jsonwebtoken');

jest.mock('../models/usuarioModel');

const usuarioModel = require('../models/usuarioModel');
const app = require('../index');

const crearToken = () => {
    return jwt.sign(
        {
            id_usuario: 1,
            rol: 'cliente'
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );
};

describe('Pruebas de rutas de usuarios', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Prueba 1: consultar el perfil correctamente
    test('GET /api/usuarios/perfil debe responder 200', async () => {
        usuarioModel.buscarPorId.mockResolvedValue({
            id_usuario: 1,
            nombre: 'Usuario Prueba',
            correo: 'prueba@atupunto.cl',
            rol: 'cliente'
        });

        const token = crearToken();

        const respuesta = await request(app)
            .get('/api/usuarios/perfil')
            .set('Authorization', `Bearer ${token}`);

        expect(respuesta.status).toBe(200);
        expect(respuesta.body.correo).toBe('prueba@atupunto.cl');
    });

    // Prueba 2: consultar el perfil sin token
    test('GET /api/usuarios/perfil sin token debe responder 401', async () => {
        const respuesta = await request(app)
            .get('/api/usuarios/perfil');

        expect(respuesta.status).toBe(401);
    });

    // Prueba 3: actualizar el perfil correctamente
    test('PUT /api/usuarios/perfil debe responder 200', async () => {
        usuarioModel.actualizarPerfil.mockResolvedValue({
            id_usuario: 1,
            nombre: 'Usuario Actualizado',
            correo: 'actualizado@atupunto.cl',
            telefono: '912345678',
            rol: 'cliente'
        });

        const token = crearToken();

        const respuesta = await request(app)
            .put('/api/usuarios/perfil')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: 'Usuario Actualizado',
                correo: 'actualizado@atupunto.cl',
                telefono: '912345678'
            });

        expect(respuesta.status).toBe(200);
        expect(respuesta.body.mensaje).toBe(
            'Perfil actualizado correctamente'
        );
    });

    // Prueba 4: actualizar sin los campos obligatorios
    test('PUT /api/usuarios/perfil sin nombre ni correo debe responder 400', async () => {
        const token = crearToken();

        const respuesta = await request(app)
            .put('/api/usuarios/perfil')
            .set('Authorization', `Bearer ${token}`)
            .send({
                telefono: '912345678'
            });

        expect(respuesta.status).toBe(400);
        expect(respuesta.body.mensaje).toBe(
            'El nombre y el correo son obligatorios'
        );
    });

    // Prueba 5: actualizar con un correo ya registrado
    test('PUT /api/usuarios/perfil con correo duplicado debe responder 400', async () => {
        usuarioModel.actualizarPerfil.mockRejectedValue({
            code: '23505'
        });

        const token = crearToken();

        const respuesta = await request(app)
            .put('/api/usuarios/perfil')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: 'Usuario Actualizado',
                correo: 'existente@atupunto.cl'
            });

        expect(respuesta.status).toBe(400);
        expect(respuesta.body.mensaje).toBe(
            'El correo electrónico ya está registrado'
        );
    });

});
