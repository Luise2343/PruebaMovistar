const express = require('express');
const router = express.Router();

// Importa las bibliotecas necesarias para autenticación y autorización
const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded; // Almacena el usuario decodificado en el objeto de solicitud
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token de autenticación inválido' });
    }
}

// Ruta API externa protegida con autenticación JWT
router.get('/external-resource', authenticateToken, (req, res) => {
    // Accede al usuario decodificado a través de req.user si es necesario
    // Lógica para obtener recursos externos
    res.json({ message: 'Recursos externos obtenidos' });
});

module.exports = router;
