const { readJailState } = require('../state');

exports.default = (client, target, context, message) => {
  if (message.trim() === '!protegido') {
    let reply;
    const state = readJailState();

    if (!state.protected) {
      reply = 'Não estou protegendo ninguém no momento.';
    } else {
      reply = `${state.protected} está sob minha proteção, nem adianta tentar!`;
    }

    client.say(target, `/me ${reply}`);
  }
};
