const { readDataJSON } = require('../../../utils/data');
const { JAIL_STATE } = require('../state');

exports.default = (client, target, _, message) => {
  if (message.trim() === '!preso' || message.trim() === '!presos') {
    let reply;
    const { prisoners } = readDataJSON('jail', JAIL_STATE);

    if (prisoners.length === 0) {
      reply = '/me Não tem ninguem em minhas mãos.';
    } else {
      const users = prisoners.join(', ');
      reply = `/me Usuários que estão em minhas mãos: ${users}.`;
    }

    client.say(target, `/me ${reply}`);
  }
};
