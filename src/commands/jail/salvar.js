const { client } = require('../../core/twitch_client');
const { RescueActions } = require('../../models/jail');
const { jail } = require('../../queues/jail');
const { people } = require('../../queues/people');

const POINTS = Number(process.env.POINTS_SALVAR_DA_PRISAO);

module.exports = {
  keyword: 'salvar',
  async execute({ context, channel }) {
    await jail(async (j) => {
      const rescue = j.rescue(context.username);

      let message;
      switch (rescue) {
        case RescueActions.IS_EMPTY:
          message = 'Não tem ninguem em minhas mãos';
          break;
        case RescueActions.IS_WASTED:
          message = `${context.username}, você não pode se salvar! Mas pode tentar escapar usando o comando !escapar`;
          break;
        case RescueActions.ALREADY_TRIED_TO_RESCUE:
          message = `${context.username}, você não pode mais resgatar ninguém das mãos do panda do mal`;
          break;
        case RescueActions.SUCCESS_TO_RESCUE:
          await people(context.username, (p) => {
            p.points += POINTS;
            return p;
          });
          message = `${context.username} resgatou ${j.lastRescuedUser} das mãos do panda do mal e recebeu ${POINTS} pontos`;
          break;
        case RescueActions.FAIL_TO_RESCUE:
          message = `${context.username} não conseguiu resgatar ninguém das mãos do panda do mal.`;
          break;
        default:
          throw new Error(
            `Valor inesperado retornado por Jail#rescue: ${rescue}.`,
          );
      }
      await client.say(channel, `${message}.`);
    });
  },
};
