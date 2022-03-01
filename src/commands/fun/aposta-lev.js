const { levxycas } = require('./_constants');
const { client } = require('../../core/twitch_client');
const { people } = require('../../queues/people');
const { sample } = require('../../utilities/collections');

const COMMAND_KEY = 'apostalev';
const POINTS = process.env.POINTS_APOSTA_LEV || 150;

/** Normaliza o texto. */
function clean(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

module.exports = {
  keyword: COMMAND_KEY,
  async execute({ argument, context, channel }) {
    if (!argument) {
      /* TODO: responder o usuário explicando como utilizar comando? */
      return;
    }

    const choice = argument.split(' ')[0];
    const selected = sample(levxycas);

    if (!selected) return;

    await people(context.username, (person) => {
      if (person.haveUsedTheCommandToday(COMMAND_KEY)) {
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

      person.incrementCommandUsage(COMMAND_KEY);
      person.setLastCommandUsageForToday(COMMAND_KEY);
      return person;
    });
  },
};
