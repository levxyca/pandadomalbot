const axios = require('axios');

const CHATTERS_ENDPOINT = `https://tmi.twitch.tv/group/user/${process.env.CHANNEL}/chatters`;

/**
 * Obtém os usuários atuamente no chat.
 *
 * @returns {Object} um objeto contendo a quantidade de usuários no chat e,
 * a separação dos mesmos por tipo, ex: broadcaster, vips, moderators,
 * viewers, etc.
 */
async function chatters() {
  const response = await axios.get(CHATTERS_ENDPOINT);
  if (response.status === 200) {
    return {
      counter: response.data.chatter_count,
      users: response.data.chatters,
    };
  }
  throw new Error(
    `Falha ao obter os usuários do chat, HTTP status: ${response.status}.`,
  );
}

module.exports = { chatters };
