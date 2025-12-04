// src/models/comunidad.models.js
const db = require('../config/db');

const ComunidadModel = {
  findAll: async () => {
    const { rows } = await db.query(
      'SELECT id, nombre, municipio, descripcion FROM comunidades ORDER BY id'
    );
    return rows;
  },

  create: async ({ nombre, municipio, descripcion }) => {
    const { rows } = await db.query(
      `INSERT INTO comunidades (nombre, municipio, descripcion)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, municipio, descripcion]
    );
    return rows[0];
  },
};

module.exports = ComunidadModel;
