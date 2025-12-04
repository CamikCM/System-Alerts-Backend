// src/models/campesino.models.js
const db = require('../config/db');

const CampesinoModel = {
  findAll: async () => {
    const { rows } = await db.query(
      `SELECT c.id,
              c.nombre,
              c.telefono,
              c.comunidad_id,
              co.nombre AS comunidad_nombre
       FROM campesinos c
       LEFT JOIN comunidades co ON c.comunidad_id = co.id
       ORDER BY c.id`
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await db.query(
      `SELECT c.id,
              c.nombre,
              c.telefono,
              c.comunidad_id,
              co.nombre AS comunidad_nombre
       FROM campesinos c
       LEFT JOIN comunidades co ON c.comunidad_id = co.id
       WHERE c.id = $1`,
      [id]
    );
    return rows[0];
  },

  create: async ({ nombre, telefono, comunidad_id }) => {
    const { rows } = await db.query(
      `INSERT INTO campesinos (nombre, telefono, comunidad_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, telefono, comunidad_id || null]
    );
    return rows[0];
  },

  update: async (id, { nombre, telefono, comunidad_id }) => {
    const { rows } = await db.query(
      `UPDATE campesinos
       SET nombre = $1,
           telefono = $2,
           comunidad_id = $3
       WHERE id = $4
       RETURNING *`,
      [nombre, telefono, comunidad_id || null, id]
    );
    return rows[0];
  },

  remove: async (id) => {
    await db.query('DELETE FROM campesinos WHERE id = $1', [id]);
  },
};

module.exports = CampesinoModel;
