const { sendWhatsAppText } = require('../services/whatsapp.service');

exports.enviarMensajeWhatsApp = async (req, res, next) => {
  try {
    const { telefono, mensaje } = req.body;

    if (!telefono) {
      return res.status(400).json({ error: 'telefono es requerido' });
    }

    const phone = telefono.replace('+', ''); // quitar + si viene así

    const resp = await sendWhatsAppText({
      phone,
      text: mensaje || 'Mensaje de prueba desde el sistema de alertas',
    });

    res.json({
      ok: true,
      detalle: resp,
    });
  } catch (err) {
    next(err);
  }
};
