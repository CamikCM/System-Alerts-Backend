// src/controllers/usuarioAdmin.controller.js
const UsuarioAdminService = require('../services/usuarioAdmin.service');

exports.getUsuariosAdmin = async (req, res, next) => {
  try {
    const data = await UsuarioAdminService.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.createUsuarioAdmin = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const nuevo = await UsuarioAdminService.create({
      nombre,
      email,
      password,
      rol,
    });
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

exports.updateUsuarioAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, email, rol, activo } = req.body;
    const actualizado = await UsuarioAdminService.update(id, {
      nombre,
      email,
      rol,
      activo,
    });
    if (!actualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
};

exports.deleteUsuarioAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    await UsuarioAdminService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
