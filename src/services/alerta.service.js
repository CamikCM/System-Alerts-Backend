const {
  obtenerClimaActual,
  obtenerPronostico3Horas,
  extraerPronosticoHorariosClave,
} = require('./clima.service');
const { sendWhatsAppText } = require('./whatsapp.service');

// Lo que ya tenías para alerta inmediata:
async function evaluarYEnviarAlerta({ lat, lon, telefono }) {
  const clima = await obtenerClimaActual({ lat, lon });

  const tieneLluvia =
    clima.rain && (clima.rain['1h'] > 5 || clima.rain['3h'] > 15);

  if (!tieneLluvia) {
    return { alerta: false, motivo: 'Sin lluvia intensa', clima };
  }

  const descripcion = clima.weather?.[0]?.description || 'lluvia intensa';
  const texto = `ALERTA AHORA: Se pronostica ${descripcion} en tu zona. Protege tus cultivos.`;

  const phone = telefono.replace('+', '');

  const respWA = await sendWhatsAppText({ phone, text: texto });

  return {
    alerta: true,
    clima,
    mensaje: texto,
    envio: respWA,
  };
}

// NUEVO: pronóstico de mañana en horas clave
async function enviarPronosticoDiaSiguiente({ lat, lon, telefono }) {
  const forecast = await obtenerPronostico3Horas({ lat, lon });
  const horarios = extraerPronosticoHorariosClave(forecast);

  if (!horarios.length) {
    return { enviado: false, motivo: 'Sin datos de pronóstico para mañana' };
  }

  const ciudad = forecast.city?.name || 'tu zona';

  const lineas = horarios.map((h) => {
    const lluviaTxt = h.lluvia ? `, lluvia ${h.lluvia.toFixed(1)} mm` : '';
    return `${h.hora}h: ${h.temp.toFixed(1)}°C, ${h.desc}${lluviaTxt}`;
  });

  const texto = [
    `PRONÓSTICO PARA MAÑANA (${ciudad}):`,
    ...lineas,
    '',
    'Revisa tus cultivos según estas condiciones.',
  ].join('\n');

  const phone = telefono.replace('+', '');
  const respWA = await sendWhatsAppText({ phone, text: texto });

  return {
    enviado: true,
    texto,
    horarios,
    envio: respWA,
  };
}

module.exports = {
  evaluarYEnviarAlerta,
  enviarPronosticoDiaSiguiente,
};
