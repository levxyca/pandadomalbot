const { giveMoneyAndPointsTo } = require('../../../utils/points');
const { readDataJSON, writeDataJSON } = require('../../../utils/data');
const { JAIL_STATE } = require('../state');

const POINTS_TO_ESCAPE = [0, 50, 100, 150, 200];

exports.default = (client, target, context, message) => {
  if (message.trim() === '!escapar') {
    const state = readDataJSON('jail', JAIL_STATE);

    if (state.prisoners.length === 0) {
      client.say(target, `/me Você não foi pego por mim.`);
      return;
    }

    if (state.fugitives.includes(context.username)) {
      client.say(target, `/me ${context.username}, você já tentou escapar.`);
      return;
    }

    if (Math.random() <= 0.1) {
      const points = giveMoneyAndPointsTo(context.username, POINTS_TO_ESCAPE);
      state.prisoners = state.prisoners.filter((u) => u !== context.username);

      client.say(
        target,
        `/me ${context.username} conseguiu escapar das minhas mãos e achou ${points} em cima da mesa.`,
      );
    } else {
      state.fugitives.push(context.username);
      client.say(
        target,
        `/me ${context.username} não conseguiu escapar das minhas mãos.`,
      );
    }
    writeDataJSON('jail', state);
  }
};
