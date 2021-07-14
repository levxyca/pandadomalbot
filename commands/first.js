const { giveMoneyAndPointsTo } = require('../utils/points');

exports.default = (client, target, context, message, dados) => {
  if (message.trim() === '!first') {
    if (dados.first == null) {
      // eslint-disable-next-line no-param-reassign
      dados.first = context.username;
      client.say(
        target,
        `/me Parabéns ${
          context.username
        }! Você foi a pessoa first da livexyca de hoje levxycAnimada Por isso, irei lhe presentear com ${giveMoneyAndPointsTo(
          context.username,
          100,
        )} pontos e pandacoins🐼.`,
      );
    } else {
      client.say(
        target,
        `/me Infelizmente ${context.username} não foi a pessoa first de hoje 🥺`,
      );
    }
  }
};
