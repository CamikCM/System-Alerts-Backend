// src/services/parcela.service.js
const ParcelaModel = require('../models/parcela.models');

const ParcelaService = {
  getAll: () => ParcelaModel.findAll(),

  getById: (id) => ParcelaModel.findById(id),

  create: (data) => {
    // Validaciones negocio (ej: area_ha > 0) podrían ir aquí
    return ParcelaModel.create(data);
  },

  update: (id, data) => ParcelaModel.update(id, data),

  remove: (id) => ParcelaModel.remove(id),
};

module.exports = ParcelaService;
