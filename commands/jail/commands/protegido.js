const { readDataJSON } = require('../../../utils/data');
const { JAIL_STATE } = require('../state');

exports.default = (client, target, _, message) => {
  if ((message.trim() === '!protegido', JAIL_STATE)) {
    let reply;
    const state = readDataJSON('jail');

    if (!state.protected) {
      reply = 'Não estou protegendo ninguém no momento.';
    } else {
      reply = `${state.protected} está sob minha proteção, nem adianta tentar!`;
    }

    client.say(target, `/me ${reply}`);
  }
};
