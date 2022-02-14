const { levxycas } = require('./_constants');
const { client } = require('../../core/twitch_client');
const { sample } = require('../../utilities/collections');

module.exports = {
  keyword: 'lev',
  async execute({ context, channel }) {
    const selected = sample(levxycas);

    if (!selected) return;

    await client.say(
      channel,
      `Saindo do forninho uma variação de levxyca especialmente para você @${context.username}...
      trililililim... A sua levxyca especial é: ${selected}`,
    );
  },
};
