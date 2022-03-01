const { client } = require('../core/twitch_client');
const { people } = require('../queues/people');

const PODIUM = 3; // Quantos usuários no podium.

/**
 * Obtém os usuários ordenados pela pontuação.
 *
 * @returns {Array} lista de usuários.
 */
async function ranked() {
  const rankedUsers = await people();
  rankedUsers.sort((personA, personB) => {
    if (personA.points > personB.points) return -1;
    if (personB.points < personA.points) return 1;
    return 0;
  });
  return rankedUsers;
}

module.exports = {
  keyword: 'rank',
  execute: async ({ channel, context, argument }) => {
    const users = await ranked();
    const username = argument ? argument.split()[0]?.replace('@', '') : null;

    let message;
    if (username) {
      const prefix =
        context.username === username
          ? `@${username}, você`
          : `O usuário @${username}`;

      let position;
      const found = users.find((user, index) => {
        position = index + 1;
        return user.name === username;
      });

      if (found) {
        message = `${prefix} está na posição ${position}/${users.length} com ${found.points} pontos.`;
      } else {
        message = `${prefix} ainda não possui nenhum ponto. :(`;
      }
    } else {
      message = 'O ranking atual 🥇 ';
      users.slice(0, PODIUM).forEach((user, index) => {
        message += `${index + 1}º @${user.name} com ${user.points} pontos. `;
      });
    }

    await client.say(channel, message);
  },
};
