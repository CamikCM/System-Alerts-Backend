const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsapp.controller');

router.post('/enviar', whatsappController.enviarMensajeWhatsApp);

module.exports = router;
