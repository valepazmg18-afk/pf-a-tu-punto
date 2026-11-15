const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const productoRoutes = require('./routes/productoRoutes');
const carritoRoutes = require('./routes/carritoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/carrito', carritoRoutes);
app.use("/uploads", express.static("uploads"));

// Ruta para comprobar que la API y PostgreSQL funcionan
app.get('/api/health', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT NOW()');

        res.status(200).json({
            mensaje: 'API A Tu Punto funcionando',
            base_datos: 'Conectada',
            fecha: resultado.rows[0].now
        });
    } catch (error) {
        console.error('Error al consultar PostgreSQL:', error.message);

        res.status(500).json({
            mensaje: 'Error al conectar con la base de datos'
        });
    }
});

// Iniciar servidor solamente cuando se ejecuta directamente
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
}

module.exports = app;