const { giveMoneyAndPointsTo } = require('../../../utils/points');
const { readDataJSON, writeDataJSON } = require('../../../utils/data');
const { dateToString, isToday } = require('../../../utils/datetime');

const DEFAULT_MAX = parseInt(process.env.MAXIMO_DE_CARINHOS_DIARIOS, 10);
const POINTS = parseInt(process.env.PONTOS_POR_CARINHO_PERFEITO, 10);

const canUseCommand = (username) => {
  const state = readDataJSON('carinhos');
  const MAX = readDataJSON('estoque-carinhos');

  let subtract = MAX.users[username];

  state.users = state.users ?? {};

  if (!state.last_date || !isToday(state.last_date)) {
    state.last_date = dateToString(new Date());
    state.users = {};
    state.users[username] = 1;
    writeDataJSON('carinhos', state);
    if (username in MAX.users) {
      MAX.users[username] = subtract + 1;
      writeDataJSON('estoque-carinhos', MAX);
      subtract = MAX.users[username];
      MAX.users[username] = subtract - 1;
      writeDataJSON('estoque-carinhos', MAX);
    }
    return true;
  }

  if (!(username in state.users)) {
    state.users[username] = 1;
    writeDataJSON('carinhos', state);
    if (username in MAX.users) {
      MAX.users[username] = subtract - 1;
      writeDataJSON('estoque-carinhos', MAX);
    }
    return true;
  }

  const usage = state.users[username];

  if (username in MAX.users) {
    if (subtract > 0) {
      state.users[username] = usage + 1;
      MAX.users[username] = subtract - 1;
      writeDataJSON('estoque-carinhos', MAX);
      writeDataJSON('carinhos', state);
      return true;
    }
  } else if (usage < DEFAULT_MAX) {
    state.users[username] = usage + 1;
    writeDataJSON('carinhos', state);
    return true;
  }

  return false;
};

exports.default = (client, target, context, message) => {
  const muralcarinhos = readDataJSON('muralcarinhos');

  if (message.trim() === '!carinho') {
    const perfect = Math.floor(Math.random() * 100) + 1;

    let reply;
    if (canUseCommand(context.username)) {
      if (perfect === 100) {
        if (context.username in muralcarinhos.users) {
          const qtdPerfeitos = muralcarinhos.users[context.username];
          muralcarinhos.users[context.username] = qtdPerfeitos + 1;
          writeDataJSON('muralcarinhos', muralcarinhos);
        } else {
          muralcarinhos.users[context.username] = 1;
          writeDataJSON('muralcarinhos', muralcarinhos);
        }
        reply = `${
          context.username
        } está fazendo o melhor carinho que eu já recebi! nhawwww Obrigada por sua gentileza, eu estou muito feliz agora graças a você e por isso vou te dar ${giveMoneyAndPointsTo(
          context.username,
          POINTS,
        )} pontos e pandacoins🐼.`;
      } else if (perfect >= 90 && perfect < 100) {
        reply = `Obrigado pelo seu carinho ${
          context.username
        }! 🐼 Apesar de não ser perfeito foi um carinho realmente bom! Por isso, irei lhe presentear com ${giveMoneyAndPointsTo(
          context.username,
          50,
        )} pontos e pandacoins🐼. Seu nível de carinho foi ${perfect}%.`;
      } else if (perfect >= 80 && perfect < 90) {
        reply = `Obrigado pelo seu carinho ${
          context.username
        }! 🐼 Apesar de não ser perfeito foi um carinho deveras agradável! Por isso, irei lhe presentear com ${giveMoneyAndPointsTo(
          context.username,
          25,
        )} pontos e pandacoins🐼. Seu nível de carinho foi ${perfect}%.`;
      } else if (perfect >= 70 && perfect < 80) {
        reply = `Obrigado pelo seu carinho ${
          context.username
        }! 🐼 Apesar de não ser perfeito foi um carinho agradável! Por isso, irei lhe presentear com ${giveMoneyAndPointsTo(
          context.username,
          15,
        )} pontos e pandacoins🐼. Seu nível de carinho foi ${perfect}%.`;
      } else if (perfect >= 60 && perfect < 70) {
        reply = `Obrigado pelo seu carinho ${
          context.username
        }! 🐼 Apesar de não ser perfeito foi um carinho razoável! Por isso, irei lhe presentear com ${giveMoneyAndPointsTo(
          context.username,
          5,
        )} pontos e pandacoins🐼. Seu nível de carinho foi ${perfect}%.`;
      } else {
        reply = `Obrigado pelo seu carinho ${context.username}! 🐼 Apesar de não ser o carinho perfeito foi um carinho muito bom! Seu nível de carinho foi ${perfect}%.`;
      }
    } else {
      reply = `${context.username}, você já esgotou os seus carinhos.`;
    }

    client.say(target, `/me ${reply}`);
  }
};
