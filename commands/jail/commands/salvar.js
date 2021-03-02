const { readDataJSON, writeDataJSON } = require('../../../utils/data');
const { JAIL_STATE } = require('../state');
const { giveMoneyAndPointsTo } = require('../../../utils/points');

exports.default = (client, target, context, message) => {
  if (message.trim() === '!salvar') {
    const state = readDataJSON('jail', JAIL_STATE);

    if (state.prisoners.length === 0) {
      client.say(target, `/me Não tem ninguem em minhas mãos.`);
      return;
    }

    if (state.prisoners.includes(context.username)) {
      client.say(
        target,
        `/me ${context.username}, você não pode se salvar! Mas pode tentar escapar usando o comando !escapar.`,
      );
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

      // Adicionar um try catch aqui
      // client.say(`/untimeout ${rescued}`);
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
      state.rescuers = [...new Set([...state.rescuers, context.username])];
    }

    writeDataJSON('jail', state);
  }
};
