const { lerPontos } = require('../utils');

exports.default = (client, target, context, message) => {
  const messageSplited = message.split(' ');
  const pontos = lerPontos();
  if (messageSplited[0] === '!gold') {
    if (messageSplited.length === 2 && pontos[messageSplited[1]]) {
      console.log('oi');
      client.say(
        target,
        `${context.username} ${messageSplited[1]} tem ${
          pontos[messageSplited[1]]
        } pontos`,
      );
    } else if (messageSplited.length === 2 && !pontos[messageSplited[1]]) {
      client.say(
        target,
        `${context.username} ${messageSplited[1]} não tem nenhum ponto :(`,
      );
    } else if (pontos[context.username]) {
      client.say(
        target,
        `${context.username} você tem ${pontos[context.username]} pontos.`,
      );
    } else {
      client.say(target, `${context.username} você não tem nenhum ponto :(`);
    }
  }
};
