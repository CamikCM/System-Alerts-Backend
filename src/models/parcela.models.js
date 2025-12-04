// src/models/parcela.models.js
const db = require('../config/db');

const ParcelaModel = {
  findAll: async () => {
    const { rows } = await db.query(
      `SELECT p.id,
              p.nombre,
              p.ubicacion,
              p.cultivo_principal,
              p.area_ha,
              p.campesino_id,
              c.nombre AS campesino_nombre
       FROM parcelas p
       JOIN campesinos c ON p.campesino_id = c.id
       ORDER BY p.id`
    );
    return rows;
  },

  findById: async (id) => {
    const { rows } = await db.query(
      `SELECT p.id,
              p.nombre,
              p.ubicacion,
              p.cultivo_principal,
              p.area_ha,
              p.campesino_id,
              c.nombre AS campesino_nombre
       FROM parcelas p
       JOIN campesinos c ON p.campesino_id = c.id
       WHERE p.id = $1`,
      [id]
    );
    return rows[0];
  },

  create: async ({
    nombre,
    ubicacion,
    cultivo_principal,
    area_ha,
    campesino_id,
  }) => {
    const { rows } = await db.query(
      `INSERT INTO parcelas
        (nombre, ubicacion, cultivo_principal, area_ha, campesino_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nombre, ubicacion, cultivo_principal, area_ha, campesino_id]
    );
    return rows[0];
  },

  update: async (
    id,
    { nombre, ubicacion, cultivo_principal, area_ha, campesino_id }
  ) => {
    const { rows } = await db.query(
      `UPDATE parcelas
       SET nombre = $1,
           ubicacion = $2,
           cultivo_principal = $3,
           area_ha = $4,
           campesino_id = $5
       WHERE id = $6
       RETURNING *`,
      [nombre, ubicacion, cultivo_principal, area_ha, campesino_id, id]
    );
    return rows[0];
  },

  remove: async (id) => {
    await db.query('DELETE FROM parcelas WHERE id = $1', [id]);
  },
};

module.exports = ParcelaModel;
