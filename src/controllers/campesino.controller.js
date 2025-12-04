// src/controllers/campesino.controller.js
const CampesinoService = require('../services/campesino.service');

exports.getCampesinos = async (req, res, next) => {
  try {
    const data = await CampesinoService.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getCampesinoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await CampesinoService.getById(id);
    if (!item) {
      return res.status(404).json({ message: 'Campesino no encontrado' });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.createCampesino = async (req, res, next) => {
  try {
    const { nombre, telefono, comunidad_id } = req.body;
    const nuevo = await CampesinoService.create({
      nombre,
      telefono,
      comunidad_id,
    });
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

exports.updateCampesino = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, comunidad_id } = req.body;
    const actualizado = await CampesinoService.update(id, {
      nombre,
      telefono,
      comunidad_id,
    });
    if (!actualizado) {
      return res.status(404).json({ message: 'Campesino no encontrado' });
    }
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
};

exports.deleteCampesino = async (req, res, next) => {
  try {
    const { id } = req.params;
    await CampesinoService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
