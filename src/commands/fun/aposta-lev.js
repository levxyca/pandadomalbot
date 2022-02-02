const { levxycas } = require('./_constants');
const { client } = require('../../core/twitch_client');
const { people } = require('../../queues/people');
const { isToday } = require('../../utilities/date-time');

const POINTS = process.env.POINTS_APOSTA_LEV || 150;

/** Normaliza o texto. */
function clean(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Verifica se o usuário já utilizou o comando hoje.
 *
 * @param {String} username nome de usuário.
 * @returns {Boolean} true, indicando que o usuário já utilizou o comando hoje.
 * Do contrário false é retornado.
 */
async function haveUsedTheCommandToday(username) {
  const person = await people(username);
  if (person) {
    const date = person.lastUseOfApostaLev || undefined;
    if (date && isToday(new Date(Number(date)))) {
      return true;
    }
  }
  return false;
}

module.exports = {
  keyword: 'apostalev',
  aliases: ['apostaLev'],
  async execute({ argument, context, channel }) {
    if (!argument) {
      /* TODO: responder o usuário explicando como utilizar comando? */
      return;
    }

    if (await haveUsedTheCommandToday(context.username)) {
      await client.say(
        channel,
        `Ei ${context.username}, você só pode tentar apostar uma vez por dia.`,
      );
      return;
    }

    const choice = argument.split(' ')[0];
    const selected = levxycas[Math.floor(Math.random() * levxycas.length)];

    if (clean(choice) === clean(selected)) {
      await client.say(
        channel,
        `Ei ${context.username}, você acertou a variação de levxyca especial: ${selected}.
        Por isso vou te dar ${POINTS} pontos!`,
      );
      await people(context.username, {
        points: `+${POINTS}`,
        lastUseOfApostaLev: new Date().getTime(),
      });
    } else {
      await client.say(
        channel,
        `Ei ${context.username}, você não acertou a variação de levxyca especial, a escolha da vez era ${selected}.`,
      );
      await people(context.username, {
        lastUseOfApostaLev: new Date().getTime(),
      });
    }
  },
};
