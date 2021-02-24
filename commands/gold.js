const { readDataJSON } = require('../utils/data');

exports.default = (client, target, context, message) => {
  const messageSplited = message.split(' ');
  const carteira = readDataJSON('carteira');
  if (messageSplited[0] === '!gold') {
    if (messageSplited.length === 2 && carteira[messageSplited[1]]) {
      client.say(
        target,
        `${context.username} ${messageSplited[1]} tem ${
          carteira[messageSplited[1]]
        } na carteira`,
      );
    } else if (messageSplited.length === 2 && !carteira[messageSplited[1]]) {
      client.say(
        target,
        `${context.username} ${messageSplited[1]} não tem nada na carteira :(`,
      );
    } else if (carteira[context.username]) {
      client.say(
        target,
        `${context.username} você tem ${
          carteira[context.username]
        } na carteira.`,
      );
    } else {
      client.say(
        target,
        `${context.username} você não tem nada na carteira :(`,
      );
    }
  }
};
