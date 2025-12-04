// src/routes/parcela.route.js
const express = require('express');
const router = express.Router();
const parcelaController = require('../controllers/parcela.controller');

router.get('/', parcelaController.getParcelas);
router.get('/:id', parcelaController.getParcelaById);
router.post('/', parcelaController.createParcela);
router.put('/:id', parcelaController.updateParcela);
router.delete('/:id', parcelaController.deleteParcela);

module.exports = router;
