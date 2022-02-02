const { levxycas } = require('./_constants');
const { client } = require('../../core/twitch_client');

module.exports = {
  keyword: 'lev',
  async execute({ context, channel }) {
    const selected = levxycas[Math.floor(Math.random() * levxycas.length)];

    await client.say(
      channel,
      `Saindo do forninho uma variação de levxyca especialmente para você @${context.username}...
      trililililim... A sua levxyca especial é: ${selected}`,
    );
  },
};
