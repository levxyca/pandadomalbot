const { readDataJSON } = require('../../../utils/data');

exports.default = (client, target, context, message) => {
  if (message.trim() === '!carinhoadicional') {
    const estoque = readDataJSON('estoque-carinhos');
    if (
      context.username in estoque.users &&
      estoque.users[context.username] > 0
    ) {
      client.say(
        target,
        `/me ${context.username} você ainda pode dar ${
          estoque.users[context.username]
        } carinho(s) ohIPanda`,
      );
    } else {
      client.say(
        target,
        `/me ${context.username} infelizmente você não possui nenhum carinho adicional PandaFurious`,
      );
    }
  }
};
