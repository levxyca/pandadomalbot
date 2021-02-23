const { giveMoneyAndPointsTo } = require('../../../utils/points');
const { readJailState, writeJailState } = require('../state');

exports.default = (client, target, context, message) => {
  if (message.trim() === '!salvar') {
    const state = readJailState();

    if (state.prisoners.length === 0) {
      client.say(target, `/me Não tem ninguem em minhas mãos.`);
      return;
    }

    if (state.fugitives.includes(context.username)) {
      client.say(target, `/me ${context.username}, você já tentou se salvar.`);
      return;
    }

    if (state.rescuers.includes(context.username)) {
      client.say(
        target,
        `/me ${context.username}, você não pode mais resgatar ninguém das mãos do panda do mal.`,
      );
      return;
    }

    if (Math.random() < 0.5) {
      giveMoneyAndPointsTo(context.username);

      const rescued =
        state.prisoners[Math.floor(Math.random() * state.prisoners.length)];

      state.prisoners = state.prisoners.filter((u) => u !== rescued);
      client.say(
        target,
        `/me ${context.username} resgatou ${rescued} das mãos do panda do mal.`,
      );
    } else {
      client.say(
        target,
        `/me ${context.username} não conseguiu resgatar ninguém das mãos do panda do mal.`,
      );
    }

    if (state.prisoners.length === 0) {
      state.rescuers = [];
      state.fugitives = [];
    } else {
      state.rescuers = [...state.rescuers, context.username];
    }

    writeJailState(state);
  }
};
