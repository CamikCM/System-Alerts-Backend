// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const apiRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SystemAlert backend Sprint 1 🚜' });
});

const climaRoutes = require('./routes/clima.route');
app.use('/api/clima', climaRoutes);

const alertaRoutes = require('./routes/alerta.route');
app.use('/api/alertas', alertaRoutes);

const whatsappRoutes = require('./routes/whatsapp.route');
app.use('/api/whatsapp', whatsappRoutes);


app.use('/api', apiRoutes);

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ message: 'Error interno del servidor', detalle: err.message });
});

module.exports = app;
