// src/services/clima.service.js
const axios = require('axios');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// 🔹 Clima actual
async function obtenerClimaActual({ lat, lon }) {
  if (!OPENWEATHER_API_KEY) {
    throw new Error('Falta OPENWEATHER_API_KEY en .env');
  }

  const url = 'https://api.openweathermap.org/data/2.5/weather';

  const { data } = await axios.get(url, {
    params: {
      lat,
      lon,
      appid: OPENWEATHER_API_KEY,
      units: 'metric',
      lang: 'es',
    },
  });

  return data;
}

// 🔹 Pronóstico 5 días / 3 horas
async function obtenerPronostico3Horas({ lat, lon }) {
  if (!OPENWEATHER_API_KEY) {
    throw new Error('Falta OPENWEATHER_API_KEY en .env');
  }

  const url = 'https://api.openweathermap.org/data/2.5/forecast';

  const { data } = await axios.get(url, {
    params: {
      lat,
      lon,
      appid: OPENWEATHER_API_KEY,
      units: 'metric',
      lang: 'es',
    },
  });

  return data;
}

// 🔹 Filtra solo mañana en horas clave
function extraerPronosticoHorariosClave(forecastData) {
  const ahora = new Date();
  const manana = new Date(ahora);
  manana.setDate(ahora.getDate() + 1);

  const yyyy = manana.getFullYear();
  const mm = String(manana.getMonth() + 1).padStart(2, '0');
  const dd = String(manana.getDate()).padStart(2, '0');
  const fechaManana = `${yyyy}-${mm}-${dd}`; // p.ej. "2025-11-28"

  const horasClave = ['06:00:00', '12:00:00', '18:00:00', '21:00:00'];

  const seleccion = forecastData.list.filter((item) => {
    const [fecha, hora] = item.dt_txt.split(' ');
    return fecha === fechaManana && horasClave.includes(hora);
  });

  return seleccion.map((item) => ({
    fechaHora: item.dt_txt,
    hora: item.dt_txt.slice(11, 16), // "06:00"
    temp: item.main.temp,
    desc: item.weather?.[0]?.description || '',
    lluvia: (item.rain && (item.rain['3h'] || 0)) || 0,
  }));
}

// 🔹 Exportar todo
module.exports = {
  obtenerClimaActual,
  obtenerPronostico3Horas,
  extraerPronosticoHorariosClave,
};
