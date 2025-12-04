const {
  evaluarYEnviarAlerta,
  enviarPronosticoDiaSiguiente,
} = require('../services/alerta.service');

exports.generarAlertaClima = async (req, res, next) => {
  try {
    const { lat, lon, telefono } = req.body;

    if (!lat || !lon || !telefono) {
      return res
        .status(400)
        .json({ error: 'lat, lon y telefono son requeridos' });
    }

    const actual = await evaluarYEnviarAlerta({ lat, lon, telefono });
    const pronostico = await enviarPronosticoDiaSiguiente({
      lat,
      lon,
      telefono,
    });

    res.json({
      ok: true,
      alertaActual: actual,
      pronosticoManana: pronostico,
    });
  } catch (err) {
    next(err);
  }
};
