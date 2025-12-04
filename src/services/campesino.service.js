// src/services/campesino.service.js
const CampesinoModel = require('../models/campesino.models');

const CampesinoService = {
  getAll: () => CampesinoModel.findAll(),

  getById: (id) => CampesinoModel.findById(id),

  create: (data) => {
    // Aquí podrías validar reglas de negocio si tu docente lo pide
    return CampesinoModel.create(data);
  },

  update: (id, data) => CampesinoModel.update(id, data),

  remove: (id) => CampesinoModel.remove(id),
};

module.exports = CampesinoService;
