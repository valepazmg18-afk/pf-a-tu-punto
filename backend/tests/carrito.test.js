const request = require('supertest');
const jwt = require('jsonwebtoken');

jest.mock('../models/carritoModel');

const carritoModel = require('../models/carritoModel');
const app = require('../index');

// Generar un token para las pruebas
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

describe('Pruebas de rutas del carrito', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Prueba 1: consultar el carrito
    test('GET /api/carrito debe responder 200', async () => {
        carritoModel.obtenerCarrito.mockResolvedValue({
            id_carrito: 1,
            detalles: []
        });

        const token = crearToken();

        const respuesta = await request(app)
            .get('/api/carrito')
            .set('Authorization', `Bearer ${token}`);

        expect(respuesta.status).toBe(200);
        expect(respuesta.body.id_carrito).toBe(1);
    });

    // Prueba 2: agregar un producto
    test('POST /api/carrito/detalles debe responder 201', async () => {
        carritoModel.agregarProducto.mockResolvedValue({
            id_detalle: 1,
            id_producto: 4,
            cantidad: 2,
            precio_unitario: '15000.00'
        });

        const token = crearToken();

        const respuesta = await request(app)
            .post('/api/carrito/detalles')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_producto: 4,
                cantidad: 2
            });

        expect(respuesta.status).toBe(201);
        expect(respuesta.body.mensaje).toBe(
            'Producto agregado al carrito correctamente'
        );
    });

    // Prueba 3: actualizar la cantidad
    test('PUT /api/carrito/detalles/:id debe responder 200', async () => {
        carritoModel.actualizarCantidad.mockResolvedValue({
            id_detalle: 1,
            cantidad: 3
        });

        const token = crearToken();

        const respuesta = await request(app)
            .put('/api/carrito/detalles/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                cantidad: 3
            });

        expect(respuesta.status).toBe(200);
        expect(respuesta.body.mensaje).toBe(
            'Cantidad actualizada correctamente'
        );
    });

    // Prueba 4: eliminar un producto
    test('DELETE /api/carrito/detalles/:id debe responder 200', async () => {
        carritoModel.eliminarProducto.mockResolvedValue({
            id_detalle: 1
        });

        const token = crearToken();

        const respuesta = await request(app)
            .delete('/api/carrito/detalles/1')
            .set('Authorization', `Bearer ${token}`);

        expect(respuesta.status).toBe(200);
        expect(respuesta.body.mensaje).toBe(
            'Producto eliminado del carrito correctamente'
        );
    });

    // Prueba 5: consultar el carrito sin token
    test('GET /api/carrito sin token debe responder 401', async () => {
        const respuesta = await request(app)
            .get('/api/carrito');

        expect(respuesta.status).toBe(401);
    });

});