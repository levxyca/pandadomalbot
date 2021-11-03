const { readDataJSON } = require('../utils/data');

exports.default = (client, target, context, message) => {
  const pontos = readDataJSON('pontos');

  if (message.split(' ')[0] === '!pontos') {
    let msg = '';
    let user = message.split(' ')[1];

    if (user) {
      user = user.replace('@', '');
      user = user.toLowerCase();

      if (pontos[user]) {
        msg = `/me ${user} possui ${pontos[user]} pontos.`;
      } else {
        msg = `/me ${user} possui 0 pontos`;
      }
    } else if (pontos[context.username]) {
      msg = `/me ${context.username} você possui ${
        pontos[context.username]
      } pontos.`;
    } else {
      msg = `/me Poxa, ${context.username}! Você ainda não possui pontos.`;
    }

    client.say(target, msg);
  }
};
