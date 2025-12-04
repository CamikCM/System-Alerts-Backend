// src/routes/usuarioAdmin.route.js
const express = require('express');
const router = express.Router();
const usuarioAdminController = require('../controllers/usuarioAdmin.controller');

router.get('/', usuarioAdminController.getUsuariosAdmin);
router.post('/', usuarioAdminController.createUsuarioAdmin);
router.put('/:id', usuarioAdminController.updateUsuarioAdmin);
router.delete('/:id', usuarioAdminController.deleteUsuarioAdmin);

module.exports = router;
