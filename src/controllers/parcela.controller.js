// src/controllers/parcela.controller.js
const ParcelaService = require('../services/parcela.service');

exports.getParcelas = async (req, res, next) => {
  try {
    const data = await ParcelaService.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getParcelaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await ParcelaService.getById(id);
    if (!item) {
      return res.status(404).json({ message: 'Parcela no encontrada' });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.createParcela = async (req, res, next) => {
  try {
    const {
      nombre,
      ubicacion,
      cultivo_principal,
      area_ha,
      campesino_id,
    } = req.body;

    const nueva = await ParcelaService.create({
      nombre,
      ubicacion,
      cultivo_principal,
      area_ha,
      campesino_id,
    });

    res.status(201).json(nueva);
  } catch (err) {
    next(err);
  }
};

exports.updateParcela = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      ubicacion,
      cultivo_principal,
      area_ha,
      campesino_id,
    } = req.body;

    const actualizada = await ParcelaService.update(id, {
      nombre,
      ubicacion,
      cultivo_principal,
      area_ha,
      campesino_id,
    });

    if (!actualizada) {
      return res.status(404).json({ message: 'Parcela no encontrada' });
    }

    res.json(actualizada);
  } catch (err) {
    next(err);
  }
};

exports.deleteParcela = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ParcelaService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
