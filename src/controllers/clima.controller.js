const { obtenerClimaActual } = require('../services/clima.service');

exports.getClimaActual = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'lat y lon son requeridos' });
    }

    const clima = await obtenerClimaActual({ lat, lon });

    res.json(clima);
  } catch (err) {
    next(err);
  }
};
