const { giveMoneyAndPointsTo } = require('../../../utils/points');
const { readJailState, writeJailState } = require('../state');

const POINTS_TO_ESCAPE = [0, 50, 100, 150, 200];

exports.default = (client, target, context, message) => {
  if (message.trim() === '!escapar') {
    const state = readJailState();

    if (state.prisoners.length === 0) {
      client.say(target, `/me Não tem ninguem em minhas mãos.`);
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
    writeJailState(state);
  }
};
