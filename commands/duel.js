const { readDataJSON, writeDataJSON } = require('../utils/data');
const { JAIL_STATE } = require('./jail/state');

exports.default = (client, target, context, message) => {
  const carteira = readDataJSON('carteira');
  const state = readDataJSON('jail', JAIL_STATE);
  const splittedMessage = String(message).split(' ');
  let pandacoins = 0;

  function verificaPontos() {
    if (!(context.username in carteira)) {
      client.say(
        target,
        `Sinto muito ${context.username} mas você não tem pandacoins🐼 suficientes para essa luta.`,
      );
    }
    if (!(splittedMessage[1] in carteira)) {
      client.say(
        target,
        `Sinto muito ${splittedMessage[1]} mas você não tem pandacoins🐼 suficientes para essa luta.`,
      );
    }
    if (context.username in carteira && splittedMessage[1] in carteira) {
      if (
        carteira[context.username] >= pandacoins &&
        carteira[splittedMessage[1]] >= pandacoins
      ) {
        const winner = Math.floor(Math.random() * 1000);
        if (splittedMessage[1] === state.protected) {
          carteira[context.username] -= pandacoins;
          carteira[splittedMessage[1]] += pandacoins;
          client.say(
            target,
            `${context.username} mexeu com ${state.protected} então mexeu comigo! 🐼 Hoje você ${state.protected} é o protegido, então aproveite sua vitória com ${pandacoins} pandacoins🐼 enquanto ${context.username} perde seus ${pandacoins} pandacoins🐼 da carteira.`,
          );
        }
        if (winner > 0 && winner < 499) {
          carteira[context.username] += pandacoins;
          carteira[splittedMessage[1]] -= pandacoins;
          writeDataJSON('carteira', carteira);
          client.say(
            target,
            `Woooooooooooow! ${context.username} acaba de explodir ${splittedMessage[1]} em pedacinhos! ${context.username} ganha ${pandacoins} pandacoins🐼 e ${splittedMessage[1]} perde.`,
          );
        }
        if (winner > 500 && winner < 1000) {
          carteira[context.username] -= pandacoins;
          carteira[splittedMessage[1]] += pandacoins;
          writeDataJSON('carteira', carteira);
          client.say(
            target,
            `Woooooooooooow! ${splittedMessage[1]} acaba de explodir ${context.username} em pedacinhos! ${splittedMessage[1]} ganha ${pandacoins} pandacoins🐼 e ${context.username} perde.`,
          );
        }
      } else {
        client.say(
          target,
          `Sinto muito mas um de vocês não tem pandacoins🐼 suficientes para essa luta.`,
        );
      }
    }
  }

  if (splittedMessage[0] === '!duel') {
    if (splittedMessage.length === 1) {
      client.say(
        target,
        `${context.username} você quer duelar contra quem mesmo?! Estou perdido 🤔`,
      );
      return;
    }
    if (splittedMessage[1][0] === '@') {
      splittedMessage[1] = splittedMessage[1].substring(1);
    }

    if (splittedMessage[2] !== undefined) {
      // eslint-disable-next-line radix
      pandacoins = parseInt(splittedMessage[2]);
      // verificaPontos();
      client.say(
        target,
        `Perdão ${context.username}, eu ainda estou aprendendo a como deixar vocês apostarem no duelo!`,
      );
    } else {
      const winner = Math.floor(Math.random() * 1000);
      if (winner > 0 && winner < 499) {
        client.say(
          target,
          `Woooooooooooow! ${context.username} acaba de explodir ${splittedMessage[1]} em pedacinhos!`,
        );
      } else if (winner > 500 && winner < 1000) {
        client.say(
          target,
          `Woooooooooooow! ${splittedMessage[1]} acaba de explodir ${context.username} em pedacinhos!`,
        );
      }
    }
  }
};
