// src/models/usuarioAdmin.models.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const UsuarioAdminModel = {
  findAll: async () => {
    const { rows } = await db.query(
      `SELECT id, nombre, email, rol, activo, fecha_creacion
       FROM usuarios_admin
       ORDER BY id`
    );
    return rows;
  },

  findByEmail: async (email) => {
    const { rows } = await db.query(
      'SELECT * FROM usuarios_admin WHERE email = $1',
      [email]
    );
    return rows[0];
  },

  create: async ({ nombre, email, password, rol }) => {
    const password_hash = await bcrypt.hash(password, 10);
    const { rows } = await db.query(
      `INSERT INTO usuarios_admin (nombre, email, password_hash, rol)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nombre, email, rol, activo, fecha_creacion`,
      [nombre, email, password_hash, rol || 'ADMIN']
    );
    return rows[0];
  },

  update: async (id, { nombre, email, rol, activo }) => {
    const { rows } = await db.query(
      `UPDATE usuarios_admin
       SET nombre = $1,
           email = $2,
           rol = $3,
           activo = $4
       WHERE id = $5
       RETURNING id, nombre, email, rol, activo, fecha_creacion`,
      [nombre, email, rol, activo, id]
    );
    return rows[0];
  },

  updatePassword: async (id, newPassword) => {
    const password_hash = await bcrypt.hash(newPassword, 10);
    await db.query(
      `UPDATE usuarios_admin
       SET password_hash = $1
       WHERE id = $2`,
      [password_hash, id]
    );
  },

  remove: async (id) => {
    await db.query('DELETE FROM usuarios_admin WHERE id = $1', [id]);
  },
};

module.exports = UsuarioAdminModel;
