const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alerta.controller');

router.post('/clima', alertaController.generarAlertaClima);

module.exports = router;
