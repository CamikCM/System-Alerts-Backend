// src/routes/index.js
const express = require('express');
const router = express.Router();

const campesinoRoutes = require('./campesino.route');
const parcelaRoutes = require('./parcela.route');
const usuarioAdminRoutes = require('./usuarioAdmin.route');

// Prefijo /api aquí
router.use('/campesinos', campesinoRoutes);
router.use('/parcelas', parcelaRoutes);
router.use('/usuarios-admin', usuarioAdminRoutes);

module.exports = router;
