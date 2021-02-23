const { readJailState } = require('../state');

exports.default = (client, target, _, message) => {
  if (message.trim() === '!preso' || message.trim() === '!presos') {
    let reply;
    const { prisoners } = readJailState();

    if (prisoners.length === 0) {
      reply = 'Não tem ninguem em minhas mãos.';
    } else {
      const users = prisoners.join(', ');
      reply = `Usuários que estão em minhas mãos: ${users}.`;
    }

    client.say(target, `/me ${reply}`);
  }
};
