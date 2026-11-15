const request = require('supertest');
const jwt = require('jsonwebtoken');

jest.mock('../models/productoModel');

const productoModel = require('../models/productoModel');
const app = require('../index');

// Generar tokens para las pruebas
const crearToken = (rol) => {
    return jwt.sign(
        {
            id_usuario: 1,
            rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );
};

describe('Pruebas de rutas de productos', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Prueba 1: consultar productos
    test('GET /api/productos debe responder 200', async () => {
        productoModel.obtenerTodos.mockResolvedValue([]);

        const respuesta = await request(app)
            .get('/api/productos');

        expect(respuesta.status).toBe(200);
        expect(respuesta.body).toEqual([]);
    });

    // Prueba 2: consultar un producto inexistente
    test('GET /api/productos/:id debe responder 404', async () => {
        productoModel.buscarPorId.mockResolvedValue(undefined);

        const respuesta = await request(app)
            .get('/api/productos/999');

        expect(respuesta.status).toBe(404);
        expect(respuesta.body.mensaje).toBe('Producto no encontrado');
    });

    // Prueba 3: intentar crear un producto sin token
    test('POST /api/productos sin token debe responder 401', async () => {
        const respuesta = await request(app)
            .post('/api/productos')
            .send({
                nombre: 'Manta de prueba',
                id_categoria: 1,
                precio: 25000,
                stock: 5
            });

        expect(respuesta.status).toBe(401);
    });

    // Prueba 4: intentar crear un producto como cliente
    test('POST /api/productos como cliente debe responder 403', async () => {
        const token = crearToken('cliente');

        const respuesta = await request(app)
            .post('/api/productos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: 'Manta de prueba',
                id_categoria: 1,
                precio: 25000,
                stock: 5
            });

        expect(respuesta.status).toBe(403);
    });

    // Prueba 5: crear un producto como administrador
    test('POST /api/productos como administrador debe responder 201', async () => {
        const token = crearToken('admin');

        productoModel.crear.mockResolvedValue({
            id_producto: 10,
            nombre: 'Manta de prueba',
            id_categoria: 1,
            precio: '25000.00',
            stock: 5
        });

        const respuesta = await request(app)
            .post('/api/productos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: 'Manta de prueba',
                id_categoria: 1,
                precio: 25000,
                stock: 5
            });

        expect(respuesta.status).toBe(201);
        expect(respuesta.body.mensaje).toBe('Producto creado correctamente');
    });

});