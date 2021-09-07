const { readDataJSON } = require('../utils/data');
const { JAIL_STATE } = require('./jail/state');

exports.default = (client, target, context, message) => {
  const state = readDataJSON('jail', JAIL_STATE);
  const splittedMessage = String(message).split(' ');

  const { username } = context;

  if (splittedMessage[0] === '!ban') {
    if (splittedMessage.length === 1) {
      client.say(
        target,
        `/me ${username} é para dar ban em quem mesmo?! Estou perdido 🤔`,
      );
      return;
    }

    if (splittedMessage[1][0] === '@') {
      splittedMessage[1] = splittedMessage[1].substring(1);
    }
    let randomBan = Math.floor(Math.random() * 10000);
    if (splittedMessage[1] === state.protected) {
      client.say(target, `/timeout ${username} 60`);
      client.say(
        target,
        `/me ${username} mexeu com ${state.protected} então mexeu comigo! 🐼`,
      );
    } else if (
      String(username).toLowerCase().includes('dev') &&
      String(splittedMessage[1]).toLowerCase().includes('codes')
    ) {
      randomBan = Math.floor(Math.random() * 1000);
      if (randomBan > 0 && randomBan < 499) {
        client.say(target, `/timeout @${splittedMessage[1]} 60`);
        client.say(
          target,
          `/me @${splittedMessage[1]} perdeu a batalha de familias entra a familia dev e familia codes!`,
        );
        client.say(target, `/me FAMILIA DEV GANHOU A RINHA DE FAMILIAS!`);
      } else if (randomBan > 500 && randomBan < 1000) {
        client.say(target, `/timeout ${username} 60`);
        client.say(
          target,
          `/me ${username} perdeu a batalha de familias entra a familia dev e familia codes!`,
        );
        client.say(target, `/me FAMILIA CODES GANHOU A RINHA DE FAMILIAS!`);
      }
    } else if (
      String(username).toLowerCase().includes('codes') &&
      String(splittedMessage[1]).toLowerCase().includes('dev')
    ) {
      randomBan = Math.floor(Math.random() * 1000);
      if (randomBan > 0 && randomBan < 499) {
        client.say(target, `/timeout @${splittedMessage[1]} 60`);
        client.say(
          target,
          `/me @${splittedMessage[1]} perdeu a batalha de familias entra a familia dev e familia codes!`,
        );
        client.say(target, `/me FAMILIA CODES GANHOU A RINHA DE FAMILIAS!`);
      } else if (randomBan > 500 && randomBan < 1000) {
        client.say(target, `/timeout ${username} 60`);
        client.say(
          target,
          `/me ${username} perdeu a batalha de familias entra a familia dev e familia codes!`,
        );
        client.say(target, `/me FAMILIA DEV GANHOU A RINHA DE FAMILIAS!`);
      }
    } else if (splittedMessage.length >= 2) {
      if (randomBan > 100 && randomBan < 1000) {
        client.say(target, `/timeout @${splittedMessage[1]} 10`);
        client.say(
          target,
          `/me @${splittedMessage[1]} foi pego pelo panda do mal. Não confundir com ser preso pelo panda do mal Kappa`,
        );
      } else if (randomBan > 1000 && randomBan < 7000) {
        client.say(target, `/timeout ${username} 10`);
        client.say(
          target,
          `/me ${username} foi pego pelo panda do mal. Não confundir com ser preso pelo panda do mal Kappa`,
        );
      } else {
        client.say(target, `/me Todos escaparam do panda do mal. Grrrr`);
      }
    }
  }
};
