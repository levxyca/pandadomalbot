const { levxycas } = require('./_constants');
const { client } = require('../../core/twitch_client');
const { people } = require('../../queues/people');

/** Normaliza o texto. */
function clean(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

module.exports = {
  keyword: 'apostalev',
  aliases: ['apostaLev'],
  async execute({ argument, context, channel }) {
    if (!argument) return;

    const choice = argument.split(' ')[0];
    const selected = levxycas[Math.floor(Math.random() * levxycas.length)];

    if (clean(choice) === clean(selected)) {
      await client.say(
        channel,
        `Ei ${context.username}, você acertou a variação de levxyca especial, por isso vou te dar 150 pontos!`,
      );
      await people(context.username, { points: '+150' });
    } else {
      await client.say(
        channel,
        `Ei ${context.username}, você não acertou a variação de levxyca especial, a escolha da vez era ${selected}.`,
      );
    }
  },
};
