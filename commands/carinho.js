const { giveMoneyAndPointsTo } = require('../utils/points');
const { readDataJSON, writeDataJSON } = require('../utils/data');
const { dateToString, isToday } = require('../utils/datetime');

const MAX = parseInt(process.env.MAXIMO_DE_CARINHOS_DIARIOS, 10);
const POINTS = parseInt(process.env.PONTOS_POR_CARINHO_PERFEITO, 10);

const canUseCommand = (username) => {
  const state = readDataJSON('carinhos');

  state.users = state.users ?? {};

  if (!state.last_date || !isToday(state.last_date)) {
    state.last_date = dateToString(new Date());
    state.users = {};
    state.users[username] = 1;
    writeDataJSON('carinhos', state);
    return true;
  }

  if (!(username in state.users)) {
    state.users[username] = 1;
    writeDataJSON('carinhos', state);
    return true;
  }

  const usage = state.users[username];
  if (usage < MAX) {
    state.users[username] = usage + 1;
    writeDataJSON('carinhos', state);
    return true;
  }

  return false;
};

exports.default = (client, target, context, message) => {
  if (message.trim() === '!carinho') {
    const perfect = Math.floor(Math.random() * 100) + 1;

    let reply;
    if (canUseCommand(context.username)) {
      if (perfect === 100) {
        reply = `/me ${
          context.username
        } está fazendo o melhor carinho que eu já recebi! nhawwww Obrigada por sua gentileza, eu estou muito feliz agora graças a você e por isso vou te dar ${giveMoneyAndPointsTo(
          context.username,
          POINTS,
        )} pandacoins🐼.`;
      } else {
        reply = `/me Obrigado pelo seu carinho ${context.username}! 🐼 Apesar de não ser o carinho perfeito foi um carinho muito bom! Seu nível de carinho foi ${perfect}%.`;
      }
    } else {
      reply = `/me ${context.username}, você só pode fazer carinho no panda ${MAX} vezes por dia.`;
    }

    client.say(target, `/me ${reply}`);
  }
};
