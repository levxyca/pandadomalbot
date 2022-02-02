const { levxycas } = require('./_constants');
const { client } = require('../../core/twitch_client');
const { people } = require('../../queues/people');
const { isToday } = require('../../utilities/date-time');

const COMMAND_KEY = 'apostalev';
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
function haveUsedTheCommandToday(person) {
  const lastUsage = person.usage[COMMAND_KEY]?.lastuse || undefined;
  return (
    lastUsage !== undefined &&
    isToday(new Date(person.usage[COMMAND_KEY].lastuse))
  );
}

module.exports = {
  keyword: COMMAND_KEY,
  aliases: ['apostaLev'],
  async execute({ argument, context, channel }) {
    if (!argument) {
      /* TODO: responder o usuário explicando como utilizar comando? */
      return;
    }

    const choice = argument.split(' ')[0];
    const selected = levxycas[Math.floor(Math.random() * levxycas.length)];

    await people(context.username, (person) => {
      if (haveUsedTheCommandToday(person)) {
        client.say(
          channel,
          `Ei ${context.username}, você só pode tentar apostar uma vez por dia.`,
        );
      } else if (clean(choice) === clean(selected)) {
        client.say(
          channel,
          `Ei ${context.username}, você acertou a variação de levxyca especial: ${selected}.
            Por isso vou te dar ${POINTS} pontos!`,
        );
        person.points += Number(POINTS);
      } else {
        client.say(
          channel,
          `Ei ${context.username}, você não acertou a variação de levxyca especial, a escolha da vez era ${selected}.`,
        );
      }

      person.incrementCommandUsage('apostalev');
      return person;
    });
  },
};
