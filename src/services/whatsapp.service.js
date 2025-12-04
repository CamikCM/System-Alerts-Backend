const axios = require('axios');

const WAHA_BASE_URL = process.env.WAHA_BASE_URL; // ej: http://localhost:3000
const WAHA_API_KEY = process.env.WAHA_API_KEY;
const WAHA_SESSION = process.env.WAHA_SESSION || 'default';

/**
 * phone: número en formato internacional SIN +
 *  ej: 5917XXXXXXXX
 */
async function sendWhatsAppText({ phone, text }) {
  if (!WAHA_BASE_URL || !WAHA_API_KEY) {
    throw new Error('Faltan variables de entorno de WAHA');
  }
  if (!phone || !text) {
    throw new Error('phone y text son requeridos');
  }

  const url = `${WAHA_BASE_URL}/api/sendText`;
  const chatId = `${phone}@c.us`;

  const payload = {
    session: WAHA_SESSION,
    chatId,
    text,
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': WAHA_API_KEY,
  };

  const { data } = await axios.post(url, payload, { headers });

  return data;
}

module.exports = { sendWhatsAppText };
