// src/services/usuarioAdmin.service.js
const UsuarioAdminModel = require('../models/usuarioAdmin.models');

const UsuarioAdminService = {
  getAll: () => UsuarioAdminModel.findAll(),

  create: (data) => UsuarioAdminModel.create(data),

  update: (id, data) => UsuarioAdminModel.update(id, data),

  remove: (id) => UsuarioAdminModel.remove(id),
};

module.exports = UsuarioAdminService;
