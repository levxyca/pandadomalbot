const { narios } = require('./_constants');
const { client } = require('../../core/twitch_client');
const { sample } = require('../../utilities/collections');

module.exports = {
  keyword: 'nario',
  async execute({ context, channel }) {
    const selected = sample(narios);

    if (!selected) return;

    await client.say(
      channel,
      `Gerando uma variação de Nario especial para você @${context.username}... Bip... Bop... Aqui está, o seu Nario especial é: ${selected}`,
    );
  },
};
