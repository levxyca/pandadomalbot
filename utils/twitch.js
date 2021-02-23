const fetch = require('node-fetch');

/**
 * Obtém os usuários conectados ao chat.
 *
 * @returns {Object} o valor resolvido da função é um objeto
 * como o exemplo:
 * ```
 * {
 *    broadcaster: [ 'rn4n' ],
 *    vips: [],
 *    moderators: [],
 *    staff: [],
 *    admins: [],
 *    global_mods: [],
 *    viewers: [ 'streamelements' ]
 * }
 * ```
 *
 * @throws um erro quando ocorrer alguma falha ao tentar obter os chatters do canal.
 */
const chatters = async () => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://tmi.twitch.tv/group/user/${process.env.CHANNEL_NAME}/chatters`,
    )
      .then((response) => response.json())
      .then((json) => {
        resolve(json.chatters);
      })
      .catch((err) => {
        reject(new Error(`Falha ao obter os chatters do canal. Err: ${err}.`));
      });
  });
};

module.exports = { chatters };
