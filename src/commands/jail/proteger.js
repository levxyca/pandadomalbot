const { client } = require('../../core/twitch_client');
const { jail } = require('../../queues/jail');

module.exports = {
  keyword: 'proteger',
  async execute({ channel, context }) {
    if ('broadcaster' in context.badges) {
      // TODO: requer a função para obter um usuário aleatório do chat.
      const username = 'xptoddasdasd';

      await jail(async (j) => {
        j.protect(username);
        await client.say(channel, `${username} agora está sob minha proteção!`);
      });
    }
  },
};
