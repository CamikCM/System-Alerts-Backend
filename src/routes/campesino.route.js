// src/routes/campesino.route.js
const express = require('express');
const router = express.Router();
const campesinoController = require('../controllers/campesino.controller');

router.get('/', campesinoController.getCampesinos);
router.get('/:id', campesinoController.getCampesinoById);
router.post('/', campesinoController.createCampesino);
router.put('/:id', campesinoController.updateCampesino);
router.delete('/:id', campesinoController.deleteCampesino);

module.exports = router;
