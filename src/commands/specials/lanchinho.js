const { client } = require('../../core/twitch_client');

module.exports = {
  keyword: 'lanchinho',
  async execute({ context, channel }) {
    if (context.username.toLowerCase() === 'presidentebolinho') {
      await client.say(channel, `É o momento perfeito para comer um bolinho.`);
    }
  },
};
