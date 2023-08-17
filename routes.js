const express = require('express');
const pool = require('./db');
const router = express.Router();

// Obtener todos los clientes
router.get('/clientes', async (req, res) => {
    try {
        const clientes = await pool.query('SELECT * FROM clientes');
        res.json(clientes.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
});

// Crear un nuevo cliente
router.post('/clientes', async (req, res) => {
    try {
        const { nombre, email } = req.body;
        const nuevoCliente = await pool.query('INSERT INTO clientes (nombre, email) VALUES ($1, $2) RETURNING *', [nombre, email]);
        res.json(nuevoCliente.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear un cliente' });
    }
});

// Obtener direcciones de un cliente específico
router.get('/clientes/:id/direcciones', async (req, res) => {
    try {
        const clienteId = req.params.id;
        const direcciones = await pool.query('SELECT * FROM direcciones WHERE cliente_id = $1', [clienteId]);
        res.json(direcciones.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las direcciones' });
    }
});

// Crear una nueva dirección para un cliente
router.post('/clientes/:id/direcciones', async (req, res) => {
    try {
        const clienteId = req.params.id;
        const { direccion } = req.body;
        const nuevaDireccion = await pool.query('INSERT INTO direcciones (cliente_id, direccion) VALUES ($1, $2) RETURNING *', [clienteId, direccion]);
        res.json(nuevaDireccion.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear una dirección' });
    }
});

// Obtener documentos de un cliente específico
router.get('/clientes/:id/documentos', async (req, res) => {
    try {
        const clienteId = req.params.id;
        const documentos = await pool.query('SELECT * FROM documentos WHERE cliente_id = $1', [clienteId]);
        res.json(documentos.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
});

// Crear un nuevo documento para un cliente
router.post('/clientes/:id/documentos', async (req, res) => {
    try {
        const clienteId = req.params.id;
        const { tipo, numero } = req.body;
        const nuevoDocumento = await pool.query('INSERT INTO documentos (cliente_id, tipo, numero) VALUES ($1, $2, $3) RETURNING *', [clienteId, tipo, numero]);
        res.json(nuevoDocumento.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear un documento' });
    }
});

// Implementa más rutas para actualizar, eliminar y gestionar documentos

module.exports = router;


