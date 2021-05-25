const { readDataJSON } = require('../../../utils/data');
const { JAIL_STATE } = require('../state');

exports.default = (client, target, _, message) => {
  if (message.trim() === '!protegido') {
    let reply;
    const state = readDataJSON('jail', JAIL_STATE);

    if (!state.protected) {
      reply = '/me Não estou protegendo ninguém no momento.';
    } else {
      reply = `${state.protected} está sob minha proteção, nem adianta tentar!`;
    }

    client.say(target, `/me ${reply}`);
  }
};
