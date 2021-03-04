exports.default = (client, target, context, message) => {
  const { readDataJSON } = require('../utils/data');
  const carteira = readDataJSON('carteira');

  if (message.split(' ')[0] === '!carteira') {
    let msg = '';
    let user = message.split(' ')[1];

    if (user) {
      user = user.replace('@', '');
      user = user.toLowerCase();

      if (carteira[user]) {
        msg = `/me ${user} possui ${carteira[user]} pandacoins🐼.`;
      } else {
        msg = `/me ${user} possui 0 panda coins`;
      }
    } else if (carteira[context.username]) {
      msg = `/me ${context.username} você possui ${
        carteira[context.username]
      } pandacoins🐼.`;
    } else {
      msg = `/me Poxa, ${context.username}! Você ainda não possui pandacoins🐼.`;
    }

    client.say(target, msg);
  }
};
