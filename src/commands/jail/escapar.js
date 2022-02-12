const { client } = require('../../core/twitch_client');
const { EscapeActions } = require('../../models/jail');
const { jail } = require('../../queues/jail');
const { people } = require('../../queues/people');
const { sample } = require('../../utilities/collections');

const POINTS_TO_ESCAPE = process.env.POINTS_ESCAPAR_DA_PRISAO.split(',');

module.exports = {
  keyword: 'escapar',
  async execute({ channel, context }) {
    await jail(async (j) => {
      const escape = j.escape(context.username);

      let message;
      switch (escape) {
        case EscapeActions.NOT_WASTED_YET:
          message = 'Você não foi pego por mim, ainda...';
          break;
        case EscapeActions.ALREADY_TRIED_TO_ESCAPE:
          message = `PunOko ${context.username}, você já tentou escapar.`;
          break;
        case EscapeActions.SUCCESS_TO_ESCAPE: {
          const points = Number(sample(POINTS_TO_ESCAPE));

          await people(context.username, (p) => {
            p.points += points;
            return p;
          });

          message = `Wowwwww, ${context.username} conseguiu escapar das minhas mãos e achou ${points} em cima da mesa.`;
          break;
        }
        case EscapeActions.FAIL_TO_ESCAPE:
          message = `${context.username} não conseguiu escapar das minhas mãos.`;
          break;
        default:
          throw new Error(
            `Valor inesperado retornado por Jail#escape: ${escape}.`,
          );
      }
      await client.say(channel, `${message}`);
    });
  },
};
